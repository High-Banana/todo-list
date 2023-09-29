if (localStorage.getItem("tasks")) createTaskList();
if (localStorage.getItem("projects")) createProjectList();

export function createTaskList() {
  const storedTask = JSON.parse(localStorage.getItem("tasks"));
  const taskContainer = document.querySelector(".task-list-container");
  taskContainer.textContent = "";

  for (let i = 0; i < storedTask.length; i++) {
    // Visible div
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    const visibleTaskInfo = document.createElement("div");
    visibleTaskInfo.classList.add("visible-task-info");

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const taskTitle = document.createElement("span");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = storedTask[i].title;

    const taskListController = document.createElement("div");
    taskListController.classList.add("task-list-controller");

    const taskEditButton = document.createElement("button");
    taskEditButton.classList.add("task-edit-button");
    taskEditButton.innerHTML = "<i class= 'fa-solid fa-pencil'></i>";

    const taskPriorityButton = document.createElement("button");
    taskPriorityButton.innerHTML = "<i class='fa-solid fa-flag'></i>";
    taskPriorityButton.classList.add("task-priority-button");

    if (storedTask[i].priority === "Low") {
      taskPriorityButton.style.color = "green";
    } else if (storedTask[i].priority === "Medium") {
      taskPriorityButton.style.color = "orange";
    } else if (storedTask[i].priority === "High") {
      taskPriorityButton.style.color = "red";
    }

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.classList.add("task-delete-button");
    taskDeleteButton.innerHTML = "<i class= 'fa-solid fa-trash'></i>";

    // Hidden div
    const hiddenTask = document.createElement("div");
    hiddenTask.classList.add("hidden-task");

    const hiddenTaskInfo = document.createElement("div");
    hiddenTaskInfo.classList.add("hidden-task-info");

    const leftColumn = document.createElement("div");
    leftColumn.classList.add("task-left-column");

    const rightColumn = document.createElement("div");
    rightColumn.classList.add("task-right-column");

    function createTitleDiv() {
      const taskTitleDiv = document.createElement("div");
      taskTitleDiv.classList.add("task-title-info");
      const title = document.createElement("span");
      title.style.fontWeight = "bold";
      title.textContent = "Title: ";
      const content = document.createElement("span");
      content.classList.add("task-title");
      content.textContent = storedTask[i].title;
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
      const content = document.createElement("span");
      content.classList.add("task-date");
      content.textContent = storedTask[i].date;
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
      const content = document.createElement("span");
      content.classList.add("task-description");
      content.textContent = storedTask[i].description;
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
      const content = document.createElement("span");
      content.classList.add("task-priority");
      content.textContent = storedTask[i].priority;
      taskPriorityDiv.appendChild(title);
      taskPriorityDiv.appendChild(content);
      return taskPriorityDiv;
    }

    taskLeft.appendChild(taskTitle);
    taskListController.append(taskEditButton, taskPriorityButton, taskDeleteButton);
    visibleTaskInfo.append(taskLeft, taskListController);

    hiddenTask.appendChild(hiddenTaskInfo);
    hiddenTaskInfo.append(leftColumn, rightColumn);
    leftColumn.append(createTitleDiv(), createDateDiv());
    rightColumn.append(createDescriptionDiv(), createPriorityDiv());

    taskList.append(visibleTaskInfo, hiddenTask);
    taskContainer.appendChild(taskList);
  }
}

export function createProjectList() {
  const storedProject = JSON.parse(localStorage.getItem("projects"));
  const projectListContainer = document.querySelector(".project-list-container");
  projectListContainer.textContent = "";

  for (let i = 0; i < storedProject.length; i++) {
    const projectList = document.createElement("div");
    projectList.classList.add("project-list");

    const projectName = document.createElement("button");
    projectName.classList.add("project-name");

    const leftSide = document.createElement("div");
    leftSide.classList.add("project-left-side");

    const iconSpan = document.createElement("span");
    iconSpan.innerHTML = "<i class = 'fa-solid fa-tasks'></i>";

    const text = document.createElement("p");
    text.textContent = storedProject[i].title;

    const rightSide = document.createElement("div");
    rightSide.classList.add("project-right-side");
    rightSide.innerHTML = "<button class = 'delete-project-button'><i class = 'fa-solid fa-times'></i></button>";

    leftSide.appendChild(iconSpan);
    leftSide.appendChild(text);

    projectName.appendChild(leftSide);
    projectName.appendChild(rightSide);

    projectList.appendChild(projectName);
    projectListContainer.appendChild(projectList);
  }
}

export function getProjectInputField() {
  return document.getElementById("project-title-input");
}
