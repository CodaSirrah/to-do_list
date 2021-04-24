import {Todo, User} from "./Class"
import displayController from "./displayController";


//selectors
const main = document.querySelector("#main");
const form = document.querySelector("#formContainer");
const plusBtn = document.querySelector("#plus");
const submit = document.querySelector("#submit");
const projBtn = document.querySelector("#projectBtn");
const itemArray = [];

//Fetch a username on first visit and store/display it.
if(!localStorage.getItem("userName")) {
    const user = new User(prompt("Enter your name:"));
    displayController().displayWelcome(main, user.name);
} else {
    let user = JSON.parse(localStorage.getItem("userName"));
    displayController().displayWelcome(main, user.name);
}

form.classList.add("hidden");
form.classList.add("visuallyhidden");
displayController().displayForm(plusBtn, form);
displayController().hideLabel(document.getElementById("title"), document.getElementById("titleLabel"));
displayController().hideLabel(document.getElementById("description"), document.getElementById("descriptionLabel"));
displayController().hideLabel(document.getElementById("dueDate"), document.getElementById("dueDateLabel"));
displayController().hideLabel(document.getElementById("priority"), document.getElementById("priorityLabel"));

submit.addEventListener("click", () => {
     const toDo = new Todo("toDo");

})