import { loadForm, showForm } from "./Form";
import Project from "./project";

export default function updateDom() {
    window.addEventListener("load", loadForm);
    const addProjectButton = document.querySelector(".add-project-button");
    let formDisplayed = false;

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        showForm();
        formDisplayed = true;
    }

    function getProject() {
        const inputField = document.getElementById("project-title-input");
        const project = new Project(inputField.value);
        project.setProjectList(project.title);
        return project;
    }

    function createProjectList() {
        const projectContainer = document.querySelector(".project-container");
        const projectList = document.createElement("button");
        projectList.textContent = getProject().title;
        projectContainer.appendChild(projectList);
    }

    function removeForm() {
        addProjectButton.style.display = "flex";
        const projectForm = document.querySelector(".project-form");
        projectForm.style.display = "none";
        formDisplayed = false;
        const inputField = document.getElementById("project-title-input");
        inputField.textContent = "";
    }

    function addButtonHandler() {
        const addButton = document.querySelector(".addButton");
        addButton.addEventListener("click", () => {
            if (formDisplayed) {
                createProjectList();
                removeForm();
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && formDisplayed) {
                createProjectList();
                removeForm();
            };
        });
    }

    function cancelButtonHandler() {
        const cancelButton = document.querySelector(".cancelButton");
        cancelButton.addEventListener("click", removeForm);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                removeForm()
            };
        });
    }

    addProjectButton.addEventListener("click", () => {
        displayProjectForm();
        addButtonHandler();
        cancelButtonHandler();
    });
}