export default function loadInputField() {
    const projectForm = document.querySelector(".project-form");
    projectForm.style.display = "flex";
}

export function removeInputField() {
    const projectForm = document.querySelector(".project-form");
    projectForm.style.display = "none";
}