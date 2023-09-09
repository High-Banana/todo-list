export function loadForm() {
    const projectList = document.querySelector(".project-list");
    return projectList.before(createForm());
}

function createForm() {

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