class Project {
    constructor(title) {
        this.title = title;
        this.projectList = [];
    }

    setProjectList(value) {
        this.projectList.push(value);
    }
}

export default function addProject() {
    const addButton = document.querySelector(".addButton");
    const inputElement = document.getElementById("project-title-input");

    addButton.addEventListener("click", () => {
        const project = new Project(inputElement.value)
        project.setProjectList(project);
        console.log(project);
    })
}