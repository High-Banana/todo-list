const projectList = JSON.parse(localStorage.getItem("projects")) || [];
export default class Project {
    constructor(title) {
        this.title = title;
        this.task = [];
    }

    setProjectList(projectTitle) {
        projectList.unshift({
            "title": projectTitle
        });
        localStorage.setItem("projects", JSON.stringify(projectList));
    }

    removeProjectList(index) {
        projectList.splice(index, 1);
        const getProject = JSON.parse(localStorage.getItem("projects"));
        getProject.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projectList));
    }
}