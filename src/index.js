import {Todo, User, Projects} from "./Class"
import displayController from "./displayController";

//selectors
const main = document.querySelector("#main");
const taskBtn = document.querySelector("#taskButton");
const taskForm = document.querySelector("#formContainer");
const taskSubmit = document.querySelector("#taskSubmit");
const projectBtn = document.querySelector("#projectBtn");
const projectForm = document.querySelector("#projectForm");
const projectSubmit = document.querySelector("#projectSubmit");
const projectArray = [];
let classMould;
let projectName;
let projectNumber = 0;
const allProjects = document.getElementsByClassName("hoverBG");
const allProjectDeletes = document.getElementsByClassName("remove");

const logic = () => {
    const newTask = (array, input, task) => {
                task.title = input[2].value;
                task.description = input[3].value;
                task.dueDate = input[4].value;
                if (input[5].checked == true) {
                task.priority = "low";
                } else if (input[6].checked == true) {
                    task.priority = "medium";
                } else {
                    task.priority = "high";
                }
                array.push(task);
                console.log(projectArray);
                console.log(array);
    }

    const pushProject = (proj) => {
         projectArray.push(new Projects(proj));
         displayController().showProjects(projectArray, document.querySelector("ul"), document.querySelectorAll("input")[0].value);
        //  projectForm.classList.add('visuallyhidden');    
        //  projectForm.addEventListener('transitionend', function(e) {
        //    projectForm.classList.add('hidden');
        //  }, { once: true
        //  });
    }   

    const newProject = (array, input) => {
        let project = {};
        project = input[0].value;
        for (let i = 0; i < array.length; i++) {
            if (array[i].title == project)
            return alert("Please enter a unique project name");
        }
        return logic().pushProject(project);
    }

    const removeProject = (target) => {
        console.log(projectArray);
        for (let i = 0; i < target.length; i++) {
            target[i].removeEventListener("click", removeProjectEvent);
            target[i].addEventListener("click", removeProjectEvent);
        }
        displayController().removeProject(target);
    }

    function removeProjectEvent()  {
        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].title == this.parentElement.childNodes[0].childNodes[0].innerHTML) {
                projectArray.splice(i, 1);
            }   
            if (projectName == projectArray[projectNumber].title) {
                displayController().showTasks(main, content, projectArray[projectNumber].tasks)
            }
        }
    }

    const currentProject = (target) => {
        for (let i = target.length - 1; i < target.length; i++) {
            target[i].addEventListener("click", currentProjectEvent);
        }
    }

    function currentProjectEvent() {
        projectName = (this.childNodes[0].innerHTML);
        for (let i = 0; i < projectArray.length; i++) {
            if (projectName == projectArray[i].title)  {
                console.log(projectArray[i]);
                projectNumber = i;
                return displayController().showTasks(main, content, projectArray[projectNumber].tasks)
            }
        }
    }   

    const defaultProjects = (array, project) => {
        array.push(project);
    }

    return {newTask, removeProject, newProject, pushProject, currentProject, defaultProjects};
}

//Fetch a username on first visit and store/display it.
if(!localStorage.getItem("userName")) {
    const user = new User(prompt("Enter your name:"));
    localStorage.setItem("userName", user.name);
    displayController().displayWelcome(main);
} else {;
    displayController().displayWelcome(main);
}

if (!localStorage.getItem("projectArray")) {
    const localProjectArray = new Projects("Tidy Room")
}

displayController().displayForm(taskBtn, taskForm, "true");
displayController().displayForm(projectBtn, projectForm);
displayController().hideLabel(document.getElementById("title"), document.getElementById("titleLabel"));
displayController().hideLabel(document.getElementById("description"), document.getElementById("descriptionLabel"));
displayController().hideLabel(document.getElementById("projectInput"), document.getElementById("projectLabel"));

// Add tasks to Task Array
taskSubmit.addEventListener("click", (e) => {
    if (document.querySelector("#taskForm").checkValidity()) {
        e.preventDefault();
        logic().newTask(projectArray[projectNumber].tasks, document.querySelectorAll("input"), classMould = new Todo("task"));
        displayController().showTasks(main, content, projectArray[projectNumber].tasks);
    }
})

projectSubmit.addEventListener("click", (e) => {
    if (document.querySelector("#projectForm").checkValidity()) {
        e.preventDefault();
        // Add new project to projectArray and display elements to DOM
        logic().newProject(projectArray, document.querySelectorAll("input"));

        // adds event that Listens and saves current Project Selected
        logic().currentProject(allProjects);

        // adds event that listens and removes project from projectArray and removes elements from DOM
        logic().removeProject(allProjectDeletes);
    }
})


