const projectList = [];
export default class Project {
    constructor(title) {
        this.title = title;
    }

    setProjectList(projectTitle) {
        projectList.push(projectTitle);
        console.log(projectList);
        return projectList;
    }
}

export function getProject() {
    const inputField = document.getElementById("project-title-input");
    if(inputField.value === "") return;
    const project = new Project(inputField.value);
    project.setProjectList(project.title);
    return project.title;
}
