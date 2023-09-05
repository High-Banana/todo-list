import loadInputField, {removeInputField} from "./Form";

export default function updateDom() {
    const addProjectButton = document.querySelector(".add-project-button");
    
    addProjectButton.addEventListener("click", () => {
        addProjectButton.style.display = "none";
        loadInputField();
    });

    const cancelButton = document.querySelector(".cancelButton");
    
    cancelButton.addEventListener("click", () => {
        addProjectButton.style.display = "flex";
        removeInputField();
    })

}