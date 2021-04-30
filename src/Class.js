class Todo {
    constructor(name) {
        this.name = name;
    }
}

Todo.prototype.title;
Todo.prototype.description;
Todo.prototype.dueDate;
Todo.prototype.priority;
Todo.prototype.complete

class User {
    constructor(name) {
        this.name = name;
    }
}

class Projects {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
}

export  {Todo, User, Projects}
