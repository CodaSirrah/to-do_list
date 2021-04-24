class Todo {
    constructor(name) {
        this.name = name;
    }
}

Todo.prototype.title = "TEST";
Todo.prototype.description;
Todo.prototype.dueDate;
Todo.prototype.priority;

class User {
    constructor(name) {
        this.name = name;
    }
}

export  {Todo, User}
