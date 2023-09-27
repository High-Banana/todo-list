const projectList = JSON.parse(localStorage.getItem("projects")) || [];
export default class Project {
    constructor(title, task) {
        this.title = title;
        this.task = [task];
    }

    setProjectList(projectTitle, projectTask) {
        projectList.unshift({
            "title": projectTitle,
            "tasks": projectTask
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