import {Todo, User} from "./Class"
import displayController from "./displayController";
import logic from "./logic"

//selectors
const main = document.querySelector("#main");
const form = document.querySelector("#formContainer");
const plusBtn = document.querySelector("#plus");
const submit = document.querySelector("#submit");
const projBtn = document.querySelector("#projectBtn");
const itemArray = [];
let obj;
let projectRdy = false;
let projects = document.querySelectorAll(".projects");

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
displayController().currentProject(projects);
displayController().highlightProjects(document.getElementsByClassName("projectBG"), document.querySelectorAll("li"));
logic().newTask(submit, itemArray, document.querySelectorAll("input"),  obj = new Todo("todo"), document.querySelector("form"));

logic().removeProject(document.querySelectorAll(".remove"));

projBtn.addEventListener("click", () => {
    displayController().projectForm(main, document.getElementById("projInput"), document.getElementById("projLabel"));
    if (projectRdy == false) {
        projectRdy = true;
        document.querySelector("#projSubmit").addEventListener("click", (e) => {
            e.preventDefault();
            displayController().addProject(document.querySelector("ul"), document.querySelector("#projInput".value));
                })
    }
    
    else {
        projectRdy == false;
    }
 
})