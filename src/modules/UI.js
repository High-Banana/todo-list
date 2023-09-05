import { callbackify } from "util";
import addProject from "./project";

function createInputField() {
    const projectContainer = document.querySelector(".project-container");
    const addProjectButton = document.querySelector(".add-project-button");

    const projectForm = document.createElement("div");
    projectForm.classList.add("project-form");

    const input = document.createElement("input");
    input.placeholder = "Project Title"

    const projectFormButtons = document.createElement("div");
    projectFormButtons.classList.add("project-form-button");

    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.textContent = "Add";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancelButton");
    cancelButton.textContent = "Cancel";

    projectFormButtons.appendChild(addButton);
    projectFormButtons.appendChild(cancelButton);

    addProjectButton.style.display = "none";
    projectForm.appendChild(input);
    projectForm.appendChild(projectFormButtons);
    projectContainer.appendChild(projectForm);
}

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");

    addProjectButton.addEventListener("click", () => {
        createInputField();
        addProject();
    });
}