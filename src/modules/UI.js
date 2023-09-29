import { loadProjectForm, loadTaskForm, loadEditForm } from "./Form";
import Project from "./Project";
import Task from "./Tasks";
import { createProjectList, createTaskList, getProjectInputField } from "./CreateList";
import { isToday, isFuture } from "date-fns";

export default function updateDom() {
  const main = document.querySelector("main");
  const headerDiv = document.querySelector(".header");
  const headerTitle = document.querySelector(".header-title");
  const projectContainer = document.querySelector(".project-container");
  const taskListContainer = document.querySelector(".task-list-container");
  const projectListContainer = document.querySelector(".project-list-container");
  const addProjectButton = document.querySelector(".add-project-button");
  const addTaskButton = document.querySelector(".add-task-button");
  let projectFormDisplayed = false;
  let taskFormDisplayed = false;
  let editFormDisplayed = false;

  // Project manage
  function checkEmptyInput() {
    const projectInputField = document.getElementById("project-title-input");
    projectInputField.classList.add("invalid");
    displayErrorMessage().emptyMessage();
    setTimeout(hideErrorMessage, 3000);
    projectInputField.addEventListener("input", () => {
      if (projectInputField.value === "") {
        projectInputField.classList.add("invalid");
      } else if (projectInputField.value !== "") {
        projectInputField.classList.remove("invalid");
      }
    });
  }

  function checkLengthyInput() {
    displayErrorMessage().lengthyMessage();
    setTimeout(hideErrorMessage, 3000);
    getProjectInputField().addEventListener("input", () => {
      if (getProjectInputField().value.length <= 12) {
        getProjectInputField().classList.remove("invalid");
      } else if (getProjectInputField().value.length > 12) {
        getProjectInputField().classList.add("invalid");
      }
    });
    getProjectInputField().classList.add("invalid");
  }

  function displayErrorMessage() {
    const titleErrorMessage = document.createElement("div");
    titleErrorMessage.classList.add("error-message");

    function emptyMessage() {
      titleErrorMessage.textContent = "Project title cannot be empty";
      main.appendChild(titleErrorMessage);
    }

    function lengthyMessage() {
      titleErrorMessage.textContent = "Project title cannot be longer than 12 characters";
      main.appendChild(titleErrorMessage);
    }

    return { emptyMessage, lengthyMessage };
  }

  function hideErrorMessage() {
    const titleErrorMessage = document.querySelector(".error-message");
    main.removeChild(titleErrorMessage);
  }

  function displayProjectForm() {
    addProjectButton.classList.add("hide");
    loadProjectForm();
    projectFormDisplayed = true;
  }

  function displayProjectList() {
    const inputField = document.getElementById("project-title-input");
    if (inputField.value === "") {
      checkEmptyInput();
      return;
    }

    if (inputField.value.length > 12) {
      checkLengthyInput();
      return;
    }
    const project = new Project(inputField.value);
    project.setProjectList(project.title);

    createProjectList();
    removeForm();
  }

  // Task manage
  function displayTaskForm() {
    loadTaskForm();
    taskFormDisplayed = true;
  }

  function getTaskInputFieldElement() {
    const titleField = document.getElementById("task-title-field");
    const descriptionField = document.getElementById("task-description-field");
    const dateField = document.getElementById("task-date-field");
    const priorityField = document.getElementById("task-priority-field");
    const taskProjectField = document.getElementById("task-project-field");

    return {
      titleField,
      descriptionField,
      dateField,
      priorityField,
      taskProjectField,
    };
  }

  function getTaskListElement(event) {
    const taskTitle = getParentNode(event.target, 4).querySelector(".task-title");
    const secondTaskName = getParentNode(event.target, 4).querySelector(".hidden-task-info .task-title");
    const taskDescription = getParentNode(event.target, 4).querySelector(".task-description");
    const taskDate = getParentNode(event.target, 4).querySelector(".task-date");
    const taskPriority = getParentNode(event.target, 4).querySelector(".task-priority");

    return {
      taskTitle,
      secondTaskName,
      taskDescription,
      taskDate,
      taskPriority,
    };
  }

  function setupEditForm(event) {
    const editTitleField = getTaskInputFieldElement().titleField;
    console.log(editTitleField);
    editTitleField.value = getParentNode(event.target, 4).querySelector(".task-title").textContent;

    const editDescriptionField = getTaskInputFieldElement().descriptionField;
    editDescriptionField.value = getParentNode(event.target, 4).querySelector(".task-description").textContent;

    const editDateField = getTaskInputFieldElement().dateField;
    editDateField.value = getParentNode(event.target, 4).querySelector(".task-date").textContent;

    const editPriorityField = getTaskInputFieldElement().priorityField;
    editPriorityField.value = getParentNode(event.target, 4).querySelector(".task-priority").textContent;

    editFormDisplayed = true;
    event.stopPropagation();
  }

  function editButtonHandler(event) {
    loadEditForm();
    updateButtonHandler(event);
    cancelButtonHandler();
    setupEditForm(event);
    event.stopPropagation();
  }

  function priorityButtonHandler(event) {
    event.stopPropagation();
  }

  function deleteButtonHandler(event) {
    let taskList;
    if (event.target.classList.contains("fa-trash")) {
      taskList = getParentNode(event.target, 5);
      removeTaskList();
    } else if (event.target.classList.contains("task-delete-button")) {
      taskList = getParentNode(event.target, 4);
      removeTaskList();
    }

    let projectList;
    if (event.target.classList.contains("fa-times")) {
      projectList = getParentNode(event.target, 5);
      removeProject();
    } else if (event.target.classList.contains("delete-project-button")) {
      projectList = getParentNode(event.target, 4);
      removeProject();
    }

    function removeTaskList() {
      const taskListArray = document.querySelectorAll(".task-list-container > .task-list");
      const index = [].indexOf.call(taskListArray, taskList);

      const task = new Task();
      task.removeTaskList(index);

      taskListContainer.removeChild(taskList);
    }

    function removeProject() {
      const projectListArray = document.querySelectorAll(".project-list-container > .project-list");
      const index = [].indexOf.call(projectListArray, projectList);

      const project = new Project();
      project.removeProjectList(index);

      projectListContainer.removeChild(projectList);
    }

    event.stopPropagation();
  }

  function removeForm() {
    if (projectFormDisplayed) {
      const projectForm = document.querySelector(".project-form");

      projectFormDisplayed = false;
      projectForm.removeEventListener("keydown", addButtonHandler);

      addProjectButton.classList.remove("hide");
      projectContainer.removeChild(projectForm);
    }

    if (taskFormDisplayed || editFormDisplayed) {
      const main = document.querySelector("main");
      const popupField = document.querySelector(".popup-field");
      taskFormDisplayed = false;
      editFormDisplayed = false;

      main.removeChild(popupField);
    }
  }

  function checkInvalidTaskInput() {
    const formElement = document.querySelectorAll(".form-element");
    const taskTitleInput = getTaskInputFieldElement().titleField;
    const taskDescriptionInput = getTaskInputFieldElement().descriptionField;
    const taskDateInput = getTaskInputFieldElement().dateField;

    const titleErrorMessage = document.createElement("span");
    const descriptionErrorMessage = document.createElement("span");
    const dateErrorMessage = document.createElement("span");

    if (taskTitleInput.value === "") {
      formElement.forEach((element) => {
        if (element.classList.contains("title")) {
          if (element.querySelector(".invalid-message")) {
            return;
          } else {
            titleErrorMessage.textContent = "Task title is required";
            titleErrorMessage.classList.add("invalid-message");
            taskTitleInput.after(titleErrorMessage);
            taskTitleInput.classList.add("invalid");
          }
        }
      });
      taskTitleInput.addEventListener("input", () => {
        if (taskTitleInput.value === "") {
          taskTitleInput.classList.add("invalid");
          formElement.forEach((element) => {
            if (element.classList.contains("title")) {
              if (element.querySelector(".invalid-message")) {
                return;
              } else {
                taskTitleInput.after(titleErrorMessage);
              }
            }
          });
        } else {
          if (taskTitleInput.classList.contains("invalid")) {
            taskTitleInput.removeAttribute("class");
            formElement.forEach((element) => {
              if (element.classList.contains("title")) {
                element.removeChild(titleErrorMessage);
              }
            });
          }
        }
      });
    }

    if (taskDescriptionInput.value === "") {
      formElement.forEach((element) => {
        if (element.classList.contains("description")) {
          if (element.querySelector(".invalid-message")) {
            return;
          } else {
            descriptionErrorMessage.textContent = "Task description is required";
            descriptionErrorMessage.classList.add("invalid-message");
            taskDescriptionInput.after(descriptionErrorMessage);
            taskDescriptionInput.classList.add("invalid");
          }
        }
      });
      taskDescriptionInput.addEventListener("input", () => {
        if (taskDescriptionInput.value === "") {
          taskDescriptionInput.classList.add("invalid");
          formElement.forEach((element) => {
            if (element.classList.contains("description")) {
              if (element.querySelector(".invalid-message")) {
                return;
              } else {
                taskDescriptionInput.after(descriptionErrorMessage);
              }
            }
          });
        } else {
          if (taskDescriptionInput.classList.contains("invalid")) {
            taskDescriptionInput.removeAttribute("class");
            formElement.forEach((element) => {
              if (element.classList.contains("description")) {
                element.removeChild(descriptionErrorMessage);
              }
            });
          }
        }
      });
    }

    if (taskDateInput.value === "") {
      formElement.forEach((element) => {
        if (element.classList.contains("date")) {
          if (element.querySelector(".invalid-message")) {
            return;
          } else {
            dateErrorMessage.textContent = "Due date is required";
            dateErrorMessage.classList.add("invalid-message");
            taskDateInput.after(dateErrorMessage);
            taskDateInput.classList.add("invalid");
          }
        }
      });
      taskDateInput.addEventListener("input", () => {
        if (taskDateInput.value === "") {
          taskDateInput.classList.add("invalid");
          formElement.forEach((element) => {
            if (element.classList.contains("date")) {
              if (element.querySelector(".invalid-message")) {
                return;
              } else {
                taskDateInput.after(dateErrorMessage);
              }
            }
          });
        } else {
          if (taskDateInput.classList.contains("invalid")) {
            taskDateInput.removeAttribute("class");
            formElement.forEach((element) => {
              if (element.classList.contains("date")) {
                element.removeChild(dateErrorMessage);
              }
            });
          }
        }
      });
    }
  }

  function displayTaskList() {
    const taskTitleInput = getTaskInputFieldElement().titleField;
    const taskDescriptionInput = getTaskInputFieldElement().descriptionField;
    const taskDateInput = getTaskInputFieldElement().dateField;
    const taskPriorityInput = getTaskInputFieldElement().priorityField;
    const taskProjectInput = getTaskInputFieldElement().taskProjectField;

    if (
      getTaskInputFieldElement().titleField.value === "" ||
      getTaskInputFieldElement().descriptionField.value === "" ||
      getTaskInputFieldElement().dateField.value === ""
    ) {
      checkInvalidTaskInput();
      return;
    } else {
      const year = taskDateInput.value.split("-")[0];
      const month = parseFloat(taskDateInput.value.split("-")[1]) - 1;
      const day = taskDateInput.value.split("-")[2];
      const today = isToday(new Date(year, month, day));
      const future = isFuture(new Date(year, month, day));
      let taskTab;
      if (today) {
        taskTab = "today";
      } else if (future) {
        taskTab = "upcoming";
      } else {
        taskTab = "inbox";
      }
      const task = new Task(
        taskTitleInput.value,
        taskDescriptionInput.value,
        taskDateInput.value,
        taskPriorityInput.value,
        taskTab
      );
      task.setTaskList(task.title, task.description, task.date, task.priority, task.tab, taskProjectInput.value);
      createTaskList();
      removeForm();
    }
  }

  function displayHiddenTaskInfo(element, event) {
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
    event.stopPropagation();
  }

  function addButtonHandler() {
    const addButton = document.querySelectorAll(".addButton");
    const projectForm = document.querySelector(".project-form");
    addButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("project")) displayProjectList();
        if (event.target.classList.contains("task")) displayTaskList();
      });

      if (projectFormDisplayed) {
        projectForm.addEventListener("keydown", (event) => {
          if (event.key === "Enter") displayProjectList();
        });
      }

      if (taskFormDisplayed) {
        main.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            displayTaskList();
          }
        });
      }
    });
  }

  function cancelButtonHandler() {
    const cancelButton = document.querySelectorAll(".cancelButton");
    const projectForm = document.querySelector(".project-form");
    cancelButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        removeForm();
      });

      if (projectFormDisplayed) {
        projectForm.addEventListener("keydown", (event) => {
          if (event.key === "Escape") removeForm();
        });
      }

      if (taskFormDisplayed) {
        main.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            removeForm();
          }
        });
      }
    });
  }

  function updateButtonHandler(event) {
    const updateButton = document.querySelector(".updateButton");
    const taskTitleField = getTaskInputFieldElement().titleField;
    const taskDescriptionField = getTaskInputFieldElement().descriptionField;
    const taskDateField = getTaskInputFieldElement().dateField;
    const taskPriorityField = getTaskInputFieldElement().priorityField;
    const taskProjectField = getTaskInputFieldElement().taskProjectField;

    const taskTitle = getTaskListElement(event).taskTitle;
    const secondTaskName = getTaskListElement(event).secondTaskName;
    const taskDescription = getTaskListElement(event).taskDescription;
    const taskDate = getTaskListElement(event).taskDate;
    const taskPriority = getTaskListElement(event).taskPriority;

    const taskArray = Array.from(document.querySelectorAll(".task-list-container .task-list"));
    const index = taskArray.indexOf(getParentNode(event.target, 4));

    const taskPriorityButton = getParentNode(event.target, 2).querySelector(".task-priority-button");

    updateButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (taskTitleField.value === "" || taskDescriptionField.value === "" || taskDateField.value === "") {
        checkInvalidTaskInput();
        return;
      }

      taskTitle.textContent = taskTitleField.value;
      secondTaskName.textContent = taskTitleField.value;
      taskDescription.textContent = taskDescriptionField.value;
      taskDate.textContent = taskDateField.value;
      taskPriority.textContent = taskPriorityField.value;

      if (taskPriorityField.value === "Low") {
        taskPriorityButton.style.color = "green";
      } else if (taskPriorityField.value === "Medium") {
        taskPriorityButton.style.color = "orange";
      } else {
        taskPriorityButton.style.color = "red";
      }

      const year = taskDate.textContent.split("-")[0];
      const month = parseFloat(taskDate.textContent.split("-")[1]) - 1;
      const day = taskDate.textContent.split("-")[2];
      const today = isToday(new Date(year, month, day));
      const future = isFuture(new Date(year, month, day));
      let taskTab;
      if (today) {
        taskTab = "today";
      } else if (future) {
        taskTab = "upcoming";
      } else {
        taskTab = "inbox";
      }
      const task = new Task();
      task.updateTaskList(
        taskTitle.textContent,
        taskDescription.textContent,
        taskDate.textContent,
        taskPriority.textContent,
        taskTab,
        taskProjectField.value,
        index
      );
      removeForm();
    });
  }

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

  addProjectButton.addEventListener("click", () => {
    displayProjectForm();
    addButtonHandler();
    cancelButtonHandler();
  });

  addTaskButton.addEventListener("click", () => {
    displayTaskForm();
    addButtonHandler();
    cancelButtonHandler();
  });

  const taskListObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((element) => {
          if (element.querySelector(".task-title")) {
            const visibleTaskElement = element.querySelector(".visible-task-info");
            visibleTaskElement.addEventListener("click", (event) => displayHiddenTaskInfo(element, event));
            const editButton = element.querySelector(".task-edit-button");
            editButton.addEventListener("click", (event) => editButtonHandler(event));
            const priorityButton = element.querySelector(".task-priority-button");
            priorityButton.addEventListener("click", (event) => priorityButtonHandler(event));
            const deleteButton = element.querySelector(".task-delete-button");
            deleteButton.addEventListener("click", (event) => deleteButtonHandler(event));
          }
        });
      }
    });
  });
  taskListObserver.observe(taskListContainer, {
    childList: true,
  });

  if (taskListContainer.querySelector(".task-list")) {
    const taskList = document.querySelectorAll(".task-list");
    taskList.forEach((taskListElement) => {
      const visibleTaskElement = taskListElement.querySelector(".visible-task-info");
      visibleTaskElement.addEventListener("click", (event) => displayHiddenTaskInfo(taskListElement, event));
      const editButton = taskListElement.querySelector(".task-edit-button");
      editButton.addEventListener("click", (event) => editButtonHandler(event));
      const priorityButton = taskListElement.querySelector(".task-priority-button");
      priorityButton.addEventListener("click", (event) => priorityButtonHandler(event));
      const deleteButton = taskListElement.querySelector(".task-delete-button");
      deleteButton.addEventListener("click", (event) => deleteButtonHandler(event));
    });
  }

  const projectListObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((element) => {
          if (element.querySelector(".project-name")) {
            const deleteButton = element.querySelector(".delete-project-button");
            deleteButton.addEventListener("click", (event) => deleteButtonHandler(event));
          }
          element.addEventListener("click", () => projectTabHandler(element));
        });
      }
    });
  });
  projectListObserver.observe(projectListContainer, {
    childList: true,
  });

  if (projectContainer.querySelector(".project-list")) {
    const projectList = document.querySelectorAll(".project-list");
    projectList.forEach((projectListElement) => {
      const deleteButton = projectListElement.querySelector(".delete-project-button");
      deleteButton.addEventListener("click", (event) => {
        deleteButtonHandler(event);
      });
    });
  }

  const inboxButton = document.querySelector(".inbox-button");
  inboxButton.addEventListener("click", () => {
    createTaskList();
    headerTitle.textContent = "Inbox";
    if (!document.querySelector(".add-task-button")) {
      headerDiv.appendChild(addTaskButton);
    }
  });

  const todayButton = document.querySelector(".today-button");
  todayButton.addEventListener("click", () => {
    const fillerMessage = document.createElement("p");
    fillerMessage.textContent = "No tasks for today";
    headerTitle.textContent = "Today";
    createTaskList();
    taskListContainer.appendChild(fillerMessage);

    if (document.querySelector(".add-task-button")) {
      headerDiv.removeChild(addTaskButton);
    }

    const storedTask = JSON.parse(localStorage.getItem("tasks"));
    const taskArray = Array.from(document.querySelectorAll(".task-list-container .task-list"));
    for (let i = 0; i < storedTask.length; i++) {
      if (storedTask[i].tab !== "today") {
        const notTodayTaskList = taskArray[i];
        if (notTodayTaskList) {
          notTodayTaskList.style.display = "none";
        }
      }
      if (taskListContainer.querySelector(".task-list") && taskListContainer.contains(fillerMessage)) {
        taskListContainer.removeChild(fillerMessage);
      }
    }
  });

  const upcomingButton = document.querySelector(".upcoming-button");
  upcomingButton.addEventListener("click", () => {
    const fillerMessage = document.createElement("p");
    fillerMessage.textContent = "No upcoming tasks";
    headerTitle.textContent = "Upcoming";
    createTaskList();
    taskListContainer.appendChild(fillerMessage);

    if (document.querySelector(".add-task-button")) {
      headerDiv.removeChild(addTaskButton);
    }

    const storedTask = JSON.parse(localStorage.getItem("tasks"));
    const taskArray = Array.from(document.querySelectorAll(".task-list-container .task-list"));
    for (let i = 0; i < storedTask.length; i++) {
      if (storedTask[i].tab !== "upcoming") {
        const notUpcomingTaskList = taskArray[i];
        if (notUpcomingTaskList) {
          notUpcomingTaskList.style.display = "none";
        }
      }
      if (taskListContainer.querySelector(".task-list") && taskListContainer.contains(fillerMessage)) {
        taskListContainer.removeChild(fillerMessage);
      }
    }
  });

  function projectTabHandler(element) {
    headerTitle.textContent = element.textContent;
    createTaskList();

    if (document.querySelector(".add-task-button")) {
      headerDiv.removeChild(addTaskButton);
    }

    const storedTask = JSON.parse(localStorage.getItem("tasks"));
    const taskArray = Array.from(document.querySelectorAll(".task-list-container .task-list"));
    for (let i = 0; i < storedTask.length; i++) {
      if (storedTask[i].project !== element.textContent) {
        const filteredArray = taskArray[i];
        if (filteredArray) {
          filteredArray.style.display = "none";
        }
      }
    }
  }

  if (projectListContainer.querySelector(".project-list")) {
    const projectList = document.querySelectorAll(".project-list");
    projectList.forEach((element) => {
      element.addEventListener("click", () => projectTabHandler(element));
    });
  }
}
