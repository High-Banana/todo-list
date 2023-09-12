const projectList = [];
export default class Project {
    constructor(title) {
        this.title = title;
    }

    setProjectList(projectTitle) {
        projectList.shift(projectTitle);
    }
}