import { loadProjectForm, loadTaskForm } from "./Form";
import Project from "./project";
import Task from "./Tasks";

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");
    const projectContainer = document.querySelector(".project-container");
    const projectList = document.querySelector(".project-list");
    const addTaskButton = document.querySelector(".add-task-button");
    let projectFormDisplayed = false;
    let taskFormDisplayed = false;

    if (taskFormDisplayed) {
        console.log("ok");
    }

    function getInputField() {
        const inputField = document.getElementById("project-title-input");
        return inputField;
    }

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        loadProjectForm();
        projectFormDisplayed = true;
    }

    function checkEmptyInput() {
        getInputField().classList.add("invalid");
        displayEmptyErrorMessage();
        setTimeout(hideErrorMessage, 3000);
        getInputField().addEventListener("input", () => {
            if (getInputField().value === "") {
                getInputField().classList.add("invalid");
            } else if (getInputField().value !== "") {
                getInputField().classList.remove("invalid");
            }
        })
    }

    function checkLengthyInput() {
        displayLengthErrorMessage();
        setTimeout(hideErrorMessage, 3000);
        getInputField().addEventListener("input", () => {
            if (getInputField().value.length <= 12) {
                getInputField().classList.remove("invalid");
            } else if (getInputField().value.length > 12) {
                getInputField().classList.add("invalid");
            }
        })
        getInputField().classList.add("invalid");
    }

    function createProjectList() {
        if (getInputField().value === "") {
            checkEmptyInput();
            return;
        };

        if (getInputField().value.length > 12) {
            checkLengthyInput();
            return;
        }

        function getProjectTitle() {
            const project = new Project(getInputField().value);
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

            getInputField().value = "";
            projectFormDisplayed = false;
            projectForm.removeEventListener("keydown", addButtonHandler);

            addProjectButton.style.display = "flex";
            projectContainer.removeChild(projectForm);
        }

        if (taskFormDisplayed) {
            const popupField = document.querySelector(".popup-field");
            const main = document.querySelector("main");
            taskFormDisplayed = false;

            main.removeChild(popupField);
        }
    }

    function createTaskList() {
        const taskContainer = document.querySelector(".task-list-container");
        const taskList = document.createElement("div");
        taskList.classList.add("task-list");
        const taskTitleInput = document.getElementById("task-title");
        const taskDescriptionInput = document.getElementById("task-description");
        const taskDateInput = document.getElementById("task-date");
        const taskPriorityInput = document.getElementById("task-priority");

        function getTaskDetails(){
            const task = new Task(taskTitleInput.value, taskDescriptionInput.value, taskDateInput.value, taskPriorityInput.value);
            task.setTaskList(task.title, task.description, task.date, task.priority);  
            removeForm();
            return task;
        }
        getTaskDetails();

        const taskName = document.createElement("p");
        taskName.textContent = getTaskDetails().title;

        const taskDescription = document.createElement("p");
        taskDescription.textContent = getTaskDetails().description;

        const taskDate = document.createElement("p");
        if(getTaskDetails().date === "") {
            taskDate.textContent = "No due date";
        }else {
            taskDate.textContent = getTaskDetails().date;
        }

        const taskPriority = document.createElement("p");
        taskPriority.textContent = getTaskDetails().priority;

        const visibleTaskInfo = document.createElement("div");
        visibleTaskInfo.classList.add("visible-task-info");

        const hiddenTaskInfo = document.createElement("div");
        hiddenTaskInfo.classList.add("hidden-task-info");

        const leftColumn = document.createElement("div");
        const rightColumn = document.createElement("div");

        const divOne = document.createElement("div");
        divOne.innerHTML = `<b>Title:</b> ${taskName.textContent}`;

        const divTwo = document.createElement("div");
        divTwo.innerHTML = `<b>Date:</b> ${taskDate.textContent}`;

        const divThree = document.createElement("div");
        divThree.innerHTML = `<b>Description:</b> ${taskDescription.textContent}`;

        const divFour = document.createElement("div");
        divFour.innerHTML = `<b>Prority:</b> ${taskPriority.textContent}`;


        leftColumn.appendChild(divOne);
        leftColumn.appendChild(divTwo);

        rightColumn.appendChild(divThree);
        rightColumn.appendChild(divFour);

        visibleTaskInfo.appendChild(taskName);
        visibleTaskInfo.appendChild(taskDate);

        hiddenTaskInfo.appendChild(leftColumn);
        hiddenTaskInfo.appendChild(rightColumn);

        taskList.appendChild(visibleTaskInfo);
        taskList.appendChild(hiddenTaskInfo);
        taskContainer.appendChild(taskList);
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

    function displayEmptyErrorMessage() {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Project title cannot be empty";
        errorMessage.classList.add("error-message");
        document.body.appendChild(errorMessage);
    }

    function displayLengthErrorMessage() {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Project title should not be more than 12 letters";
        errorMessage.classList.add("error-message");
        document.body.appendChild(errorMessage);
    }

    function hideErrorMessage() {
        const errorMessage = document.querySelector(".error-message");
        document.body.removeChild(errorMessage);
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