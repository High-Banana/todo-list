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

        if (inputField.value === "") {
            inputField.classList.add("invalid");
            displayEmptyErrorMessage();
            setTimeout(hideErrorMessage, 3000);
            inputField.addEventListener("input", () => {
                if (inputField.value === "") {
                    inputField.classList.add("invalid");
                } else if (inputField.value !== "") {
                    inputField.classList.remove("invalid");
                }
            })
            return;
        };

        if (inputField.value.length > 12) {
            displayLengthErrorMessage();
            setTimeout(hideErrorMessage, 3000);
            inputField.classList.add("invalid");
            return;
        }

        const projectName = document.createElement("button");

        const leftSide = document.createElement("div");
        leftSide.classList.add("project-left-side");

        const iconSpan = document.createElement("span");
        iconSpan.innerHTML = "<i class = 'fa-solid fa-tasks'></i>";

        const text = document.createElement("p");
        text.textContent = getProjectTitle();

        const rightSide = document.createElement("div");
        rightSide.classList.add("project-right-side");
        rightSide.innerHTML = "<button><i class = 'fa-solid fa-times'></i></button>"

        leftSide.appendChild(iconSpan);
        leftSide.appendChild(text);
        
        projectName.appendChild(leftSide);
        projectName.appendChild(rightSide);

        projectList.appendChild(projectName);
        projectContainer.appendChild(projectList);

        function getProjectTitle() {
            const project = new Project(inputField.value);
            project.setProjectList(project.title);
            removeForm();
            return project.title;
        }
    }

    function removeForm() {
        const projectForm = document.querySelector(".project-form");
        const inputField = document.getElementById("project-title-input");

        inputField.value = "";
        formDisplayed = false;

        addProjectButton.style.display = "flex";
        projectContainer.removeChild(projectForm);
    }

    function addButtonHandler() {
        const addButton = document.querySelector(".addButton");
        addButton.addEventListener("click", () => {
            if (formDisplayed) {
                createProjectList();
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && formDisplayed) {
                createProjectList();
            };
        });
    }

    function cancelButtonHandler() {
        const cancelButton = document.querySelector(".cancelButton");
        cancelButton.addEventListener("click", removeForm);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && formDisplayed) {
                removeForm();
            };
        });
    }

    addProjectButton.addEventListener("click", () => {
        displayProjectForm();
        addButtonHandler();
        cancelButtonHandler();
    });

    function displayEmptyErrorMessage() {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Project title cannot be empty";
        errorMessage.classList.add("error-message");
        document.body.appendChild(errorMessage);
    }

    function displayLengthErrorMessage() {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Project title should not be more than 12 letters";
        errorMessage.classList.add("error-message");
        document.body.appendChild(errorMessage);
    }

    function hideErrorMessage() {
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "none";
    }
}