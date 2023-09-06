export function loadForm() {
    const projectContainer = document.querySelector(".project-container");
    return projectContainer.appendChild(createForm());
}

function createForm() {

    const projectForm = document.createElement("div");
    projectForm.classList.add("project-form");

    const input = document.createElement("input");
    input.setAttribute("id", "project-title-input");
    input.placeholder = "Project Title";

    const projectFormButton = document.createElement("div");
    projectFormButton.classList.add("project-form-button");

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("addButton");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancelButton");

    projectFormButton.appendChild(addButton);
    projectFormButton.appendChild(cancelButton);

    projectForm.appendChild(input);
    projectForm.appendChild(projectFormButton);

    return projectForm;
}