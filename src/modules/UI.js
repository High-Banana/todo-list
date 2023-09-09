import { loadForm } from "./Form";
import Project from "./project";

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");
    const projectContainer = document.querySelector(".project-container");
    const projectList = document.querySelector(".project-list");
    let formDisplayed = false;

    function getInputField() {
        const inputField = document.getElementById("project-title-input");
        return inputField;
    }

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        loadForm();
        formDisplayed = true;
    }

    function checkEmptyInput() {
        getInputField().classList.add("invalid");
        displayEmptyErrorMessage();
        setTimeout(hideErrorMessage, 3000);
        getInputField().addEventListener("input", () => {
            if (getInputField().value === "") {
                getInputField().classList.add("invalid");
            } else if (getInputField().value !== "") {
                getInputField().classList.remove("invalid");
            }
        })
    }

    function checkLengthyInput() {
        displayLengthErrorMessage();
        setTimeout(hideErrorMessage, 3000);
        getInputField().addEventListener("input", () => {
            if (getInputField().value.length <= 12) {
                getInputField().classList.remove("invalid");
            } else if (getInputField().value.length > 12) {
                getInputField().classList.add("invalid");
            }
        })
        getInputField().classList.add("invalid");
    }

    function createProjectList() {
        if (getInputField().value === "") {
            checkEmptyInput();
            return;
        };

        if (getInputField().value.length > 12) {
            checkLengthyInput();
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
            const project = new Project(getInputField().value);
            project.setProjectList(project.title);
            removeForm();
            return project.title;
        }
    }

    function removeForm() {
        const projectForm = document.querySelector(".project-form");

        getInputField().value = "";
        formDisplayed = false;
        projectForm.removeEventListener("keydown", addButtonHandler);

        addProjectButton.style.display = "flex";
        projectContainer.removeChild(projectForm);
    }

    function addButtonHandler() {
        const addButton = document.querySelector(".addButton");
        const projectForm = document.querySelector(".project-form");
        addButton.addEventListener("click", () => {
            if (formDisplayed) createProjectList();
        });
        projectForm.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && formDisplayed) {
                createProjectList();
            };
        });
    }

    function cancelButtonHandler() {
        const cancelButton = document.querySelector(".cancelButton");
        const projectForm = document.querySelector(".project-form");
        cancelButton.addEventListener("click", removeForm);
        projectForm.addEventListener("keydown", (event) => {
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
        document.body.removeChild(errorMessage);
    }
}