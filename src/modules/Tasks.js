const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
export default class Task {
    constructor(title, description, date, priority, tab) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.tab = tab;
    }

    setTaskList(taskTitle, taskDescription, taskDate, taskPriority, taskTab, taskProject) {
        taskList.unshift({
            "title": taskTitle,
            "description": taskDescription,
            "date": taskDate,
            "priority": taskPriority,
            "tab": taskTab,
            "project": taskProject
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    removeTaskList(index) {
        taskList.splice(index, 1);
        const getItem = JSON.parse(localStorage.getItem("tasks"));
        getItem.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(getItem));
    }

    updateTaskList(title, description, date, priority, taskTab, taskProject, index) {
        taskList[index].title = title;
        taskList[index].description = description;
        taskList[index].date = date;
        taskList[index].priority = priority;
        taskList[index].tab = taskTab;
        taskList[index].project = taskProject;
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
}