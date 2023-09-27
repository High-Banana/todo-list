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
        console.log(projectList);
        localStorage.setItem("projects", JSON.stringify(projectList));
    }

    removeProjectList(index) {
        projectList.splice(index, 1);
        console.log(projectList);
        const getProject = JSON.parse(localStorage.getItem("projects"));
        // getProject.splice(index, 1);
        console.log("get", getProject[0]);
        localStorage.setItem("projects", JSON.stringify(projectList));
    }
}