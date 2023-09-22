import Task from "./Tasks";
import Project from "./Project";

export function createTaskList() {
    const taskContainer = document.querySelector(".task-list-container");
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescriptionInput = document.getElementById("task-description");
    const taskDateInput = document.getElementById("task-date");
    const taskPriorityInput = document.getElementById("task-priority");

    const task = new Task(taskTitleInput.value, taskDescriptionInput.value, taskDateInput.value, taskPriorityInput.value);

    task.setTaskList(task.title, task.description, task.date, task.priority);

    function setUpTaskElement() {
        const taskName = document.createElement("span");
        taskName.classList.add("task-title");
        taskName.textContent = task.title;

        const taskDescription = document.createElement("span");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = task.description;

        const taskDate = document.createElement("span");
        taskDate.classList.add("task-date");
        taskDate.textContent = task.date;

        const taskPriority = document.createElement("span");
        taskPriority.classList.add("task-priority");
        taskPriority.textContent = task.priority;

        return { taskName, taskDescription, taskDate, taskPriority }
    }

    function createTitleDiv() {
        const taskTitleDiv = document.createElement("div");
        taskTitleDiv.classList.add("task-title-info");
        const title = document.createElement("span");
        title.style.fontWeight = "bold";
        title.textContent = "Title: ";
        const content = setUpTaskElement().taskName;
        taskTitleDiv.appendChild(title);
        taskTitleDiv.appendChild(content);
        return taskTitleDiv;
    }

    function createDateDiv() {
        const taskDateDiv = document.createElement("div");
        taskDateDiv.classList.add("task-date-info");
        const title = document.createElement("span");
        title.style.fontWeight = "bold";
        title.textContent = "Date: ";
        const content = setUpTaskElement().taskDate;
        taskDateDiv.appendChild(title);
        taskDateDiv.appendChild(content);
        return taskDateDiv;
    }

    function createDescriptionDiv() {
        const taskDescriptionDiv = document.createElement("div");
        taskDescriptionDiv.classList.add("task-description-info");
        const title = document.createElement("span");
        title.style.fontWeight = "bold";
        title.textContent = "Description: ";
        const content = setUpTaskElement().taskDescription;
        taskDescriptionDiv.appendChild(title);
        taskDescriptionDiv.appendChild(content);
        return taskDescriptionDiv;
    }

    function createPriorityDiv() {
        const taskPriorityDiv = document.createElement("div");
        taskPriorityDiv.classList.add("task-priority-info");
        const title = document.createElement("span");
        title.style.fontWeight = "bold";
        title.textContent = "Priority: ";
        const content = setUpTaskElement().taskPriority;
        taskPriorityDiv.appendChild(title);
        taskPriorityDiv.appendChild(content);
        return taskPriorityDiv;
    }

    const visibleTaskInfo = document.createElement("div");
    visibleTaskInfo.classList.add("visible-task-info");

    const hiddenTask = document.createElement("div");
    hiddenTask.classList.add("hidden-task");

    const hiddenTaskInfo = document.createElement("div");
    hiddenTaskInfo.classList.add("hidden-task-info");

    const leftColumn = document.createElement("div");
    leftColumn.classList.add("task-left-column");

    const rightColumn = document.createElement("div");
    rightColumn.classList.add("task-right-column");

    const taskEditButton = document.createElement("button");
    taskEditButton.classList.add("task-edit-button");
    taskEditButton.innerHTML = `<i class= "fa-solid fa-pencil"></i>`;

    const taskPriorityButton = document.createElement("button");
    taskPriorityButton.innerHTML = `<i class="fa-solid fa-flag"></i>`;
    taskPriorityButton.classList.add("task-priority-button");

    if (task.priority === "Low") {
        taskPriorityButton.style.color = "green";
    } else if (task.priority === "Medium") {
        taskPriorityButton.style.color = "orange";
    } else if (task.priority === "High") {
        taskPriorityButton.style.color = "red";
    }

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.classList.add("task-delete-button");
    taskDeleteButton.innerHTML = `<i class= "fa-solid fa-trash"></i>`;

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");
    taskLeft.appendChild(setUpTaskElement().taskName);

    const taskListController = document.createElement("div");
    taskListController.classList.add("task-list-controller");
    taskListController.appendChild(taskEditButton);
    taskListController.appendChild(taskPriorityButton);
    taskListController.appendChild(taskDeleteButton);

    leftColumn.appendChild(createTitleDiv());
    leftColumn.appendChild(createDateDiv());

    rightColumn.appendChild(createDescriptionDiv());
    rightColumn.appendChild(createPriorityDiv());

    visibleTaskInfo.appendChild(taskLeft);
    visibleTaskInfo.appendChild(taskListController);

    hiddenTaskInfo.appendChild(leftColumn);
    hiddenTaskInfo.appendChild(rightColumn);

    taskList.appendChild(visibleTaskInfo);
    hiddenTask.appendChild(hiddenTaskInfo);
    taskList.appendChild(hiddenTask);

    if(!taskContainer.querySelector(".task-list")) {
        taskContainer.appendChild(taskList);
    } else {
        taskContainer.insertBefore(taskList, taskContainer.firstChild);
    }

    visibleTaskInfo.addEventListener("click", () => {
        displayHiddenTaskInfo(taskList);
    });

    taskListController.removeEventListener("click", displayHiddenTaskInfo);
}

export function getProjectInputField() {
    const inputField = document.getElementById("project-title-input");
    return inputField;
}

export function createProjectList() {
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
    projectName.classList.add("project-name");

    const leftSide = document.createElement("div");
    leftSide.classList.add("project-left-side");

    const iconSpan = document.createElement("span");
    iconSpan.innerHTML = "<i class = 'fa-solid fa-tasks'></i>";

    const text = document.createElement("p");
    text.textContent = getProjectTitle();

    const rightSide = document.createElement("div");
    rightSide.classList.add("project-right-side");
    rightSide.innerHTML = "<button class = 'delete-project-button'><i class = 'fa-solid fa-times'></i></button>";

    leftSide.appendChild(iconSpan);
    leftSide.appendChild(text);

    projectName.appendChild(leftSide);
    projectName.appendChild(rightSide);

    if (!projectList.querySelector(".project-name")) {
        projectList.appendChild(projectName);
    } else {
        projectList.insertBefore(projectName, projectList.firstChild);
    }

    projectContainer.appendChild(projectList);
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
    const collapseDiv = element.querySelector(".hidden-task");
    if (collapseDiv.clientHeight) {
        collapseDiv.style.maxHeight = 0;
        setTimeout(() => {
            collapseDiv.removeAttribute("style");
        }, 300);
    } else {
        collapseDiv.style.maxHeight = collapseDiv.scrollHeight + "px";
        setTimeout(() => {
            collapseDiv.removeAttribute("style");
        }, 300);
    }
    collapseDiv.classList.toggle("show");
}