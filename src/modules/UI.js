import { loadForm } from "./Form";
import Project from "./project";

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");
    let formDisplayed = false;

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        loadForm();
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
        const inputField = document.getElementById("project-title-input");
        const projectForm = document.querySelector(".project-form");
        const projectContainer = document.querySelector(".project-container");

        addProjectButton.style.display = "flex";
        formDisplayed = false;
        inputField.value = "";
        projectContainer.removeChild(projectForm);
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