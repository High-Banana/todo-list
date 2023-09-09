const projectList = [];
export default class Project {
    constructor(title) {
        this.title = title;
    }

    setProjectList(projectTitle) {
        projectList.push(projectTitle);
    }
}