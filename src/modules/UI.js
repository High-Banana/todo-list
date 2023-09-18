import { loadProjectForm, loadTaskForm, loadEditForm } from "./Form";
import Project from "./Project";
import Task from "./Tasks";

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");
    const projectContainer = document.querySelector(".project-container");
    const projectList = document.querySelector(".project-list");
    const addTaskButton = document.querySelector(".add-task-button");
    let projectFormDisplayed = false;
    let taskFormDisplayed = false;
    let editFormDisplayed = false;
    let taskListCreated = false;

    if (taskFormDisplayed) {
        console.log("ok");
    }

    function getProjectInputField() {
        const inputField = document.getElementById("project-title-input");
        return inputField;
    }

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        loadProjectForm();
        projectFormDisplayed = true;
    }

    function checkEmptyInput() {
        getProjectInputField().classList.add("invalid");
        displayEmptyErrorMessage();
        setTimeout(hideErrorMessage, 3000);
        getProjectInputField().addEventListener("input", () => {
            if (getProjectInputField().value === "") {
                getProjectInputField().classList.add("invalid");
            } else if (getProjectInputField().value !== "") {
                getProjectInputField().classList.remove("invalid");
            }
        })
    }

    function checkLengthyInput() {
        displayLengthErrorMessage();
        setTimeout(hideErrorMessage, 3000);
        getProjectInputField().addEventListener("input", () => {
            if (getProjectInputField().value.length <= 12) {
                getProjectInputField().classList.remove("invalid");
            } else if (getProjectInputField().value.length > 12) {
                getProjectInputField().classList.add("invalid");
            }
        })
        getProjectInputField().classList.add("invalid");
    }

    function createProjectList() {
        if (getProjectInputField().value === "") {
            checkEmptyInput();
            return;
        };

        if (getProjectInputField().value.length > 12) {
            checkLengthyInput();
            return;
        }

        function getProjectTitle() {
            const project = new Project(getProjectInputField().value);
            project.setProjectList(project.title);
            removeForm();
            return project.title;
        }

        const projectName = document.createElement("button");

        const leftSide = document.createElement("div");
        leftSide.classList.add("project-left-side");

        const iconSpan = document.createElement("span");
        iconSpan.innerHTML = "<i class = 'fa-solid fa-tasks'></i>";

        const text = document.createElement("p");
        text.textContent = getProjectTitle();

        const rightSide = document.createElement("div");
        rightSide.classList.add("project-right-side");
        rightSide.innerHTML = "<button><i class = 'fa-solid fa-times'></i></button>"

        leftSide.appendChild(iconSpan);
        leftSide.appendChild(text);

        projectName.appendChild(leftSide);
        projectName.appendChild(rightSide);

        projectList.appendChild(projectName);
        projectContainer.appendChild(projectList);
    }

    function removeForm() {
        if (projectFormDisplayed) {

            const projectForm = document.querySelector(".project-form");

            getProjectInputField().value = "";
            projectFormDisplayed = false;
            projectForm.removeEventListener("keydown", addButtonHandler);

            addProjectButton.style.display = "flex";
            projectContainer.removeChild(projectForm);
        }

        if (taskFormDisplayed || editFormDisplayed) {
            const popupField = document.querySelector(".popup-field");
            const main = document.querySelector("main");
            taskFormDisplayed = false;
            editFormDisplayed = false;

            main.removeChild(popupField);
        }
    }

    function checkInvalidTaskInput() {
        const formElement = document.querySelectorAll(".form-element");
        const taskTitleInput = document.getElementById("task-title");
        const taskDescriptionInput = document.getElementById("task-description");
        const titleErrorMessage = document.createElement("span");
        const descriptionErrorMessage = document.createElement("span");

        if (taskTitleInput.classList.contains("invalid") || taskDescriptionInput.classList.contains("invalid")) return;

        titleErrorMessage.textContent = "Task title is required";
        titleErrorMessage.classList.add("invalid-message");
        taskTitleInput.after(titleErrorMessage);
        taskTitleInput.classList.add("invalid");

        descriptionErrorMessage.textContent = "Task description is required";
        descriptionErrorMessage.classList.add("invalid-message");
        taskDescriptionInput.after(descriptionErrorMessage);
        taskDescriptionInput.classList.add("invalid");

        taskTitleInput.addEventListener("input", () => {
            if (taskTitleInput.value === "") {
                taskTitleInput.classList.add("invalid");
                taskTitleInput.after(titleErrorMessage);
            } else {
                if (taskTitleInput.classList.contains("invalid")) {
                    taskTitleInput.classList.remove("invalid");
                    formElement.forEach((element) => {
                        if (element.classList.contains("title")) {
                            element.removeChild(titleErrorMessage);
                        }
                    })
                }
            }
        })

        taskDescriptionInput.addEventListener("input", () => {
            if (taskDescriptionInput.value === "") {
                taskDescriptionInput.classList.add("invalid");
                taskDescriptionInput.after(descriptionErrorMessage);
            } else {
                if (taskDescriptionInput.classList.contains("invalid")) {
                    taskDescriptionInput.classList.remove("invalid");
                    formElement.forEach((element) => {
                        if (element.classList.contains("description")) {
                            element.removeChild(descriptionErrorMessage);
                        }
                    })
                    // formElement.removeChild(descriptionErrorMessage);
                }
            }
        })
    }

    function createTaskList() {
        const taskContainer = document.querySelector(".task-list-container");
        const taskList = document.createElement("div");
        taskList.classList.add("task-list");
        const taskTitleInput = document.getElementById("task-title");
        const taskDescriptionInput = document.getElementById("task-description");
        const taskDateInput = document.getElementById("task-date");
        const taskPriorityInput = document.getElementById("task-priority");

        if (taskTitleInput.value === "" || taskDescriptionInput.value === "") {
            checkInvalidTaskInput();
            return;
        }

        const task = new Task(taskTitleInput.value, taskDescriptionInput.value, taskDateInput.value, taskPriorityInput.value);
        task.setTaskList(task.title, task.description, task.date, task.priority);

        function getTaskDetails() {
            removeForm();
            return task;
        }

        const taskName = document.createElement("p");
        taskName.classList.add("task-title");
        taskName.textContent = getTaskDetails().title;

        const taskDescription = document.createElement("p");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = getTaskDetails().description;

        const taskDate = document.createElement("p");
        if (getTaskDetails().date === "") {
            taskDate.textContent = "No due date";
        } else {
            taskDate.textContent = getTaskDetails().date;
        }

        const taskPriority = document.createElement("p");
        taskPriority.textContent = getTaskDetails().priority;

        const visibleTaskInfo = document.createElement("div");
        visibleTaskInfo.classList.add("visible-task-info");

        const hiddenTaskInfo = document.createElement("div");
        hiddenTaskInfo.classList.add("hidden-task-info");

        const leftColumn = document.createElement("div");
        leftColumn.classList.add("task-left-column");

        const rightColumn = document.createElement("div");
        rightColumn.classList.add("task-right-column");

        const divOne = document.createElement("div");
        divOne.classList.add("task-title-info");
        const divOneTitle = document.createElement("span");
        divOneTitle.style.fontWeight = "bold";
        divOneTitle.textContent = "Title: ";
        const divOneContent = document.createElement("span");
        divOneContent.classList.add("task-title");
        divOneContent.textContent = taskName.textContent;
        divOne.appendChild(divOneTitle);
        divOne.appendChild(divOneContent);

        const divTwo = document.createElement("div");
        divTwo.classList.add("task-date-info");
        const divTwoTitle = document.createElement("span");
        divTwoTitle.style.fontWeight = "bold";
        divTwoTitle.textContent = "Date: ";
        const divTwoContent = document.createElement("span");
        divTwoContent.classList.add("task-date");
        divTwoContent.textContent = taskDate.textContent;
        divTwo.appendChild(divTwoTitle);
        divTwo.appendChild(divTwoContent);

        const divThree = document.createElement("div");
        divThree.classList.add("task-description-info");
        const divThreeTitle = document.createElement("span");
        divThreeTitle.style.fontWeight = "bold";
        divThreeTitle.textContent = "Description: ";
        const divThreeContent = document.createElement("span");
        divThreeContent.classList.add("task-description");
        divThreeContent.textContent = taskDescription.textContent;
        divThree.appendChild(divThreeTitle);
        divThree.appendChild(divThreeContent);

        const divFour = document.createElement("div");
        divFour.classList.add("task-priority-info");
        const divFourTitle = document.createElement("span");
        divFourTitle.style.fontWeight = "bold";
        divFourTitle.textContent = "Priority: ";
        const divFourContext = document.createElement("span");
        divFourContext.classList.add("task-priority");
        divFourContext.textContent = taskPriority.textContent;
        divFour.appendChild(divFourTitle);
        divFour.appendChild(divFourContext);

        const taskEditButton = document.createElement("button");
        taskEditButton.classList.add("task-edit-button");
        taskEditButton.innerHTML = `<i class= "fa-solid fa-pencil"></i>`;

        const taskPriorityButton = document.createElement("button");
        taskPriorityButton.innerHTML = `<i class="fa-solid fa-flag"></i>`;

        if (getTaskDetails().priority === "Low") {
            taskPriorityButton.style.color = "green";
        } else if (getTaskDetails().priority === "Medium") {
            taskPriorityButton.style.color = "orange";
        } else if (getTaskDetails().priority === "High") {
            taskPriorityButton.style.color = "red";
        }

        const taskDeleteButton = document.createElement("button");
        taskDeleteButton.classList.add("task-delete-button");
        taskDeleteButton.innerHTML = `<i class= "fa-solid fa-trash"></i>`;

        const taskLeft = document.createElement("div");
        taskLeft.classList.add("task-left");
        taskLeft.appendChild(taskName);

        const taskListController = document.createElement("div");
        taskListController.classList.add("task-list-controller");
        taskListController.appendChild(taskEditButton);
        taskListController.appendChild(taskPriorityButton);
        taskListController.appendChild(taskDeleteButton);


        leftColumn.appendChild(divOne);
        leftColumn.appendChild(divTwo);

        rightColumn.appendChild(divThree);
        rightColumn.appendChild(divFour);

        visibleTaskInfo.appendChild(taskLeft);
        visibleTaskInfo.appendChild(taskListController);

        hiddenTaskInfo.appendChild(leftColumn);
        hiddenTaskInfo.appendChild(rightColumn);

        taskList.appendChild(visibleTaskInfo);
        taskList.appendChild(hiddenTaskInfo);
        taskContainer.appendChild(taskList);

        visibleTaskInfo.addEventListener("click", () => {
            displayHiddenTaskInfo(taskList);
        });

        taskListController.removeEventListener("click", displayHiddenTaskInfo);

        taskListCreated = true;
    }

    function displayTaskForm() {
        loadTaskForm();
        taskFormDisplayed = true;
    }

    function addButtonHandler() {
        const addButton = document.querySelectorAll(".addButton");
        const projectForm = document.querySelector(".project-form");
        addButton.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                if (projectFormDisplayed) createProjectList();
                if (taskFormDisplayed) createTaskList();
            });

            if (projectFormDisplayed) {
                projectForm.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" && projectFormDisplayed) {
                        createProjectList();
                    };
                });
            }
        })
    }

    function cancelButtonHandler() {
        const cancelButton = document.querySelectorAll(".cancelButton");
        const projectForm = document.querySelector(".project-form");
        cancelButton.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                removeForm();
            });
            if (projectFormDisplayed) {
                projectForm.addEventListener("keydown", (event) => {
                    if (event.key === "Escape" && projectFormDisplayed) {
                        removeForm();
                    };
                });
            }
        })
    }

    const taskListContainer = document.querySelector(".task-list-container");
    const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((element) => {
                    if (element.querySelector(".task-title")) {
                        const editButton = element.querySelector(".task-edit-button");
                        editButton.addEventListener("click", (event) => {
                            editButtonHandler(event);
                        })
                        const deleteButton = element.querySelector(".task-delete-button");
                        deleteButton.addEventListener("click", (event) => {
                            deleteButtonHandler(event);
                        })
                    }
                })
            }
        })
    })
    observer.observe(taskListContainer, {
        childList: true
    })

    function getParentNode(element, parent) {
        if (element.classList.contains("fa-pencil")) {
            for (let i = 0; i < parent; i++) {
                element = element.parentNode;
            }
            return element;
        } else {
            for (let i = 0; i < parent - 1; i++) {
                element = element.parentNode;
            }
            return element;
        }
    }

    function getTaskInputField() {
        const titleField = document.getElementById("task-title");
        const descriptionField = document.getElementById("task-description");
        const dateField = document.getElementById("task-date");
        const priorityField = document.getElementById("task-priority");

        return { titleField, descriptionField, dateField, priorityField };
    }

    function getTaskElement(event) {
        const taskTitle = getParentNode(event.target, 4).querySelector(".task-title");
        const secondTaskName = getParentNode(event.target, 4).querySelector(".hidden-task-info .task-title");
        const taskDescription = getParentNode(event.target, 4).querySelector(".task-description");
        const taskDate = getParentNode(event.target, 4).querySelector(".task-date");
        const taskPriority = getParentNode(event.target, 4).querySelector(".task-priority");

        return { taskTitle, secondTaskName, taskDescription, taskDate, taskPriority };
    }

    function setEditForm(event) {
        const editTitleField = getTaskInputField().titleField;
        editTitleField.value = getParentNode(event.target, 4).querySelector(".task-title").textContent;

        const editDescriptionField = getTaskInputField().descriptionField;
        editDescriptionField.value = getParentNode(event.target, 4).querySelector(".task-description").textContent;

        const editDateField = getTaskInputField().dateField;
        editDateField.value = getParentNode(event.target, 4).querySelector(".task-date").textContent;

        const editPriorityField = getTaskInputField().priorityField;
        editPriorityField.value = getParentNode(event.target, 4).querySelector(".task-priority").textContent;

        editFormDisplayed = true;
        event.stopPropagation();
    }

    function editButtonHandler(event) {
        loadEditForm();
        addButtonHandler();
        cancelButtonHandler();
        setEditForm(event);

        const updateButton = document.querySelector(".updateButton");
        const taskTitleField = getTaskInputField().titleField;
        const taskDescriptionField = getTaskInputField().descriptionField;
        const taskDateField = getTaskInputField().dateField;
        const taskPriorityField = getTaskInputField().priorityField;

        const taskTitle = getTaskElement(event).taskTitle;
        const taskDescription = getTaskElement(event).taskDescription;
        const taskDate = getTaskElement(event).taskDate;
        const taskPriority = getTaskElement(event).taskPriority;

        const taskArray = Array.from(document.querySelectorAll(".task-list-container .task-list"));
        const index = taskArray.indexOf(getParentNode(event.target, 4));
        console.log(index);
        
        updateButton.addEventListener("click", (event) => {
            event.preventDefault();
            taskTitle.textContent = taskTitleField.value;
            taskDescription.textContent = taskDescriptionField.value;
            taskDate.textContent = taskDateField.value;
            taskPriority.textContent = taskPriorityField.value;

            const task = new Task();
            task.updateTaskList(taskTitle.textContent, taskDescription.textContent, taskDate.textContent, taskPriority.textContent, index);
            removeForm();
        })
    }

    function updateTaskInfo() {
        const listArray = document.querySelectorAll(".task-list-container > .task-list");

        const taskTitleField = getTaskInputField().titleField;
        const taskDescriptionField = getTaskInputField().descriptionField;
        const taskDateField = getTaskInputField().dateField;
        const taskPriorityField = getTaskInputField().priorityField;

        const taskName = getTaskElement().taskName;
        const taskTitle = getTaskElement().taskTitle;
        const taskDescription = getTaskElement().taskDescription;
        const taskDate = getTaskElement().taskDate;
        const taskPriority = getTaskElement().taskPriority;


        taskName.textContent = taskTitleField.value;
        taskTitle.textContent = taskTitleField.value;
        taskDescription.textContent = taskDescriptionField.value;
        taskDate.textContent = taskDateField.value;
        taskPriority.textContent = taskPriorityField.value;

        const task = new Task();
        // const index = [].indexOf.call(listArray, )
        // task.updateTaskList(taskTitleField.value, taskDescriptionField.value, taskDateField.value, taskPriorityField.value);
    }

    function deleteButtonHandler(event) {
        let taskList;
        if (event.target.classList.contains("fa-trash")) {
            taskList = event.target.parentNode.parentNode.parentNode.parentNode;
        } else {
            taskList = event.target.parentNode.parentNode.parentNode;
        }

        const taskListContainer = document.querySelector(".task-list-container");
        const listArray = document.querySelectorAll(".task-list-container > .task-list");
        const index = [].indexOf.call(listArray, taskList);

        const task = new Task();
        task.removeTaskList(index);

        taskListContainer.removeChild(taskList);

        event.stopPropagation();
    }

    function displayEmptyErrorMessage() {
        const titleErrorMessage = document.createElement("p");
        titleErrorMessage.textContent = "Project title cannot be empty";
        titleErrorMessage.classList.add("error-message");
        document.body.appendChild(titleErrorMessage);
    }

    function displayLengthErrorMessage() {
        const titleErrorMessage = document.createElement("p");
        titleErrorMessage.textContent = "Project title should not be more than 12 letters";
        titleErrorMessage.classList.add("error-message");
        document.body.appendChild(titleErrorMessage);
    }

    function hideErrorMessage() {
        const titleErrorMessage = document.querySelector(".error-message");
        document.body.removeChild(titleErrorMessage);
    }

    function displayHiddenTaskInfo(element) {
        const hiddenTaskInfo = element.querySelector(".hidden-task-info");
        hiddenTaskInfo.classList.toggle("show");
    }

    addProjectButton.addEventListener("click", () => {
        displayProjectForm();
        addButtonHandler();
        cancelButtonHandler();
    });

    addTaskButton.addEventListener("click", () => {
        displayTaskForm();
        addButtonHandler();
        cancelButtonHandler();
    })
}