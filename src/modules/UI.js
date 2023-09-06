import { loadForm, showForm } from "./Form";
import Project from "./project";

export default function updateDom() {
    window.addEventListener("load", loadForm);
    const addProjectButton = document.querySelector(".add-project-button");

    addProjectButton.addEventListener("click", () => {
        addProjectButton.style.display = "none";
        showForm();

        function createProject() {
            const inputField = document.getElementById("project-title-input");
            const project = new Project(inputField.value);
            project.setProjectList(project.title);
        }

        function removeForm() {
            addProjectButton.style.display = "flex";
            const projectForm = document.querySelector(".project-form");
            projectForm.style.display = "none";
        }

        // After form has been displayed
        const addBbutton = document.querySelector(".addButton");
        addBbutton.addEventListener("click", createProject);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                createProject()
            };
        });

        const cancelButton = document.querySelector(".cancelButton");
        cancelButton.addEventListener("click", removeForm);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                removeForm()
            };
        });
    });
}