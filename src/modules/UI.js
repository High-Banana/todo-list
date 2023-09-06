import { loadForm } from "./Form";
import Project, { getProject } from "./project";

export default function updateDom() {
    // window.addEventListener("load", loadForm);
    const addProjectButton = document.querySelector(".add-project-button");
    let formDisplayed = false;

    function displayProjectForm() {
        addProjectButton.style.display = "none";
        loadForm();
        formDisplayed = true;
    }
    addProjectButton.addEventListener("click", () => {
        displayProjectForm();
        if (formDisplayed) {
            const cancelButton = document.querySelector(".cancelButton");
            cancelButton.addEventListener("click", removeForm);
        }
    });

    function removeForm() {
        const projectContainer = document.querySelector(".project-container");
        const projectForm = document.querySelector(".project-form");
        projectContainer.removeChild(projectForm);
        addProjectButton.style.display = "flex";
    }

    // function displayProjectList() {
    //     const projectContainer = document.querySelector(".project-container");
    //     if(getProject() === undefined) return;
    //     const projectList = document.createElement("button");
    //     projectList.classList.add("project-list");
    //     projectList.innerHTML = `
    //             <i class="fa fa-tasks"></i>
    //                 ${getProject()}
    //             <button class="project-delete-button">
    //                 <i class="fa-solid fa-times"</i>
    //             </button>`;
    //     projectContainer.appendChild(projectList);
    // }

    // function removeForm() {
    //     addProjectButton.style.display = "flex";
    //     const projectForm = document.querySelector(".project-form");
    //     projectForm.style.display = "none";
    //     formDisplayed = false;
    //     const inputField = document.getElementById("project-title-input");
    //     inputField.textContent = "";
    // }

    // function addButtonHandler() {
    //     const addButton = document.querySelector(".addButton");
    //     addButton.addEventListener("click", () => {
    //         if (formDisplayed) {
    //             displayProjectList();
    //             removeForm();
    //         }
    //     });
    //     document.addEventListener("keydown", (event) => {
    //         if (event.key === "Enter" && formDisplayed) {
    //             displayProjectList();
    //             removeForm();
    //         };
    //     });
    // }

    // function cancelButtonHandler() {
    //     const cancelButton = document.querySelector(".cancelButton");
    //     cancelButton.addEventListener("click", removeForm);
    //     document.addEventListener("keydown", (event) => {
    //         if (event.key === "Escape") {
    //             removeForm()
    //         };
    //     });
    // }
}