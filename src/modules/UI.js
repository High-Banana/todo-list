import loadForm, {removeForm, showForm} from "./Form";

export default function updateDom() {
    window.addEventListener("load", loadForm);
    const addProjectButton = document.querySelector(".add-project-button");
    
    addProjectButton.addEventListener("click", () => {
        addProjectButton.style.display = "none";
        showForm();
        const cancelButton = document.querySelector(".cancelButton");
    
        cancelButton.addEventListener("click", () => {
            addProjectButton.style.display = "flex";
            removeForm();
        })
    });


}