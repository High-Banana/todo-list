const taskList = [];

export default class Task {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    setTaskList(taskTitle, taskDescription, taskDate, taskPriority) {
        taskList.push({
            "title": taskTitle,
            "description": taskDescription,
            "due-date": taskDate,
            "priority": taskPriority
        });
        console.log(taskList);
    }

    removeTaskList(index) {
        taskList.splice(index, 1);
        console.log(taskList);
    }
}