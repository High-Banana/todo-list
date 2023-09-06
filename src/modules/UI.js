import { loadForm } from "./Form";
import Project from "./project";

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");
    const projectContainer = document.querySelector(".project-container");
    const projectList = document.querySelector(".project-list");
    let formDisplayed = false;

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        loadForm();
        formDisplayed = true;
    }

    function createProjectList() {
        const inputField = document.getElementById("project-title-input");
        if (inputField.value === "") return;

        const projectName = document.createElement("button");
        projectName.textContent = getProjectTitle();
        
        projectList.appendChild(projectName);
        projectContainer.appendChild(projectList);

        function getProjectTitle() {
            const project = new Project(inputField.value);
            project.setProjectList(project.title);
            return project.title;
        }
    }

    function removeForm() {
        const projectForm = document.querySelector(".project-form");
        const inputField = document.getElementById("project-title-input");

        formDisplayed = false;
        inputField.value = "";

        addProjectButton.style.display = "flex";
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