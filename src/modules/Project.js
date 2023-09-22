const projectList = [];
export default class Project {
    constructor(title) {
        this.title = title;
    }

    setProjectList(projectTitle) {
        projectList.unshift(projectTitle);
        console.log(projectList);
    }

    removeProjectList(index) {
        projectList.splice(index, 1);
        console.log(projectList);
    }
}