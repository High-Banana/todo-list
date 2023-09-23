const taskList = [];

export default class Task {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    setTaskList(taskTitle, taskDescription, taskDate, taskPriority) {
        taskList.unshift({
            "title": taskTitle,
            "description": taskDescription,
            "due-date": taskDate,
            "priority": taskPriority
        });
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    removeTaskList(index) {
        taskList.splice(index, 1);
        const getItem = JSON.parse(localStorage.getItem("tasks"));
        getItem.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(getItem));
    }

    updateTaskList(title, description, date, priority, index) {
        taskList[index].title = title;
        taskList[index].description = description;
        taskList[index].date = date;
        taskList[index].priority = priority;
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
}