export function loadProjectForm() {
    const projectListContainer = document.querySelector(".project-list-container");
    return projectListContainer.before(createProjectForm());
}

export function loadTaskForm() {
    const main = document.querySelector("main");
    main.appendChild(createTaskForm());
    addTaskProjectSelectOption();
}

export function loadEditForm() {
    const main = document.querySelector("main");
    return main.appendChild(createEditForm());
}

function createProjectForm() {

    const projectForm = document.createElement("div");
    projectForm.classList.add("project-form");

    const input = document.createElement("input");
    input.setAttribute("id", "project-title-input");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("maxlength", "12");
    input.placeholder = "Enter Project Title";

    setTimeout(() => {
        input.focus();
    }, 0)

    const projectFormButton = document.createElement("div");
    projectFormButton.classList.add("project-form-button");

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("addButton", "project");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancelButton");

    projectFormButton.appendChild(addButton);
    projectFormButton.appendChild(cancelButton);

    projectForm.appendChild(input);
    projectForm.appendChild(projectFormButton);

    return projectForm;
}

function createTaskForm() {
    const popupField = document.createElement("div");
    popupField.classList.add("popup-field");
    popupField.innerHTML = `<form class="task-form">
    <fieldset>
        <div class="column-one">
            <div class="form-element title">
                <label for="task-title">Title</label>
                <input id="task-title" autocomplete = "off">
            </div>

            <div class="form-element description">
                <label for="task-description">Description</label>
                <textarea id="task-description"></textarea>
            </div>
        </div>

        <div class="column-two">
            <div class="form-element date">
                <label for="task-date">Due Date</label>
                <input id="task-date" type="date">
            </div>

            <div class="form-element priority">
                <label for="task-priority">Priority</label>
                <select id="task-priority">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
        </div>

    </fieldset>
    <div class="form-button">
        <button class="cancelButton">Cancel</button>
        <button class="addButton task">Add Task</button>
    </div>
</form>`
    return popupField;
}

function createEditForm() {
    const popupField = document.createElement("div");
    popupField.classList.add("popup-field");
    popupField.innerHTML = `<form class="edit-form">
    <fieldset>
        <div class="column-one">
            <div class="form-element title">
                <label for="task-title">Title</label>
                <input id="task-title" autocomplete = "off">
            </div>

            <div class="form-element description">
                <label for="task-description">Description</label>
                <textarea id="task-description"></textarea>
            </div>
        </div>

        <div class="column-two">
            <div class="form-element date">
                <label for="task-date">Due Date</label>
                <input id="task-date" type="date">
            </div>

            <div class="form-element priority">
                <label for="task-priority">Priority</label>
                <select id="task-priority">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
        </div>

    </fieldset>
    <div class="form-button">
        <button class="cancelButton">Cancel</button>
        <button class="updateButton">Update Task</button>
    </div>
</form>`
    return popupField;
}

function addTaskProjectSelectOption() {
    const projectListContainer = document.querySelector(".project-list-container");
    const taskForm = document.querySelector(".task-form > fieldset > .column-two");

    const projectFormElement = document.createElement("div");
    projectFormElement.classList.add("form-element", "project");

    const projectSelectLabel = document.createElement("label");
    projectSelectLabel.setAttribute("for", "task-project");
    projectSelectLabel.textContent = "Project"
    
    const projectSelectField = document.createElement("select");
    projectSelectField.setAttribute("id", "task-project");
    projectSelectField.add(new Option("Inbox"));
    if(projectListContainer.querySelector(".project-list")) {
        const projectList = document.querySelectorAll(".project-list");
        projectList.forEach((element) => {
            const projectName = element.querySelector("p");
            projectSelectField.add(new Option(projectName.textContent));
        })
    }
    
    projectFormElement.append(projectSelectLabel, projectSelectField);
    taskForm.appendChild(projectFormElement);
}