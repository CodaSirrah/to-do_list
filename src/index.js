import {Todo, User, Projects} from "./Class"
import displayController from "./displayController";

//selectors
const main = document.querySelector("#main");
const taskBtn = document.querySelector("#taskBtn");
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
                task.complete = false;
                array.push(task);
                localStorage.setItem("projects", JSON.stringify(projectArray));
                input[2].value = "";
                input[3].value = "";
                document.querySelector("#titleLabel").classList.remove("hideLabel");
                document.querySelector("#descriptionLabel").classList.remove("hideLabel");
                taskForm.classList.add('visuallyhidden');    
                taskForm.addEventListener('transitionend', function(e) {
                taskForm.classList.add('hidden');
                }, { once: true
                });
    }

    const generateTask = (array, task, title, description, dueDate, priority, complete) => {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.complete = complete;
        array.push(task);
    }

    const pushProject = (proj) => {
         projectArray.push(new Projects(proj));
         localStorage.setItem("projects", JSON.stringify(projectArray));
         projectForm.classList.add('visuallyhidden');    
         projectForm.addEventListener('transitionend', function(e) {
           projectForm.classList.add('hidden');
         }, { once: true
         });
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
        for (let i = 0; i < target.length; i++) {
            target[i].removeEventListener("click", removeProjectEvent);
            target[i].addEventListener("click", removeProjectEvent);
        }
        displayController().removeProject(target);
        
    }

    function removeProjectEvent()  {
        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].title == this.parentElement.childNodes[0].childNodes[0].innerHTML && projectNumber == i) {
                projectArray.splice(i, 1);
                console.log(i + 1);
                console.log(projectNumber);
                displayController().showNoTasks(main)
        } else if (projectArray[i].title == this.parentElement.childNodes[0].childNodes[0].innerHTML) {
            projectArray.splice(i, 1);
            console.log(i + 1);
            console.log(projectNumber);
            }
        }
        (projectArray[0] == undefined) ? localStorage.removeItem("projects"): localStorage.setItem("projects", JSON.stringify(projectArray));
    }

    const removeTask = (target, array) => {
        for (let i = 0; i < array.length; i++) {
            target[i].childNodes[5].removeEventListener("click", removeTaskEvent);
            target[i].childNodes[5].addEventListener("click", removeTaskEvent);
        }
    }
    function removeTaskEvent() {
        projectArray[projectNumber].tasks.splice(this.childNodes[0].dataset.num, 1);
        tasksCRUD();
    }

    const taskComplete = (target, array) => {
        for (let i = 0; i < array.length; i++) {
            target[i].childNodes[0].childNodes[0].removeEventListener("click", taskCompleteEvent);
            target[i].childNodes[0].childNodes[0].addEventListener("click", taskCompleteEvent);
        }
    }

    function taskCompleteEvent() {
        if (projectArray[projectNumber].tasks[this.dataset.num].complete == false) {
            projectArray[projectNumber].tasks[this.dataset.num].complete = true;
        }
        else projectArray[projectNumber].tasks[this.dataset.num].complete = false;
        tasksCRUD();
    }

    const currentProject = (target, ival) => {
        for (let i = ival; i < target.length; i++) {
            target[i].addEventListener("click", currentProjectEvent);
        }
    }

    function currentProjectEvent() {
        projectName = (this.childNodes[0].innerHTML);
        for (let i = 0; i < projectArray.length; i++) {
            if (projectName == projectArray[i].title)  {
                projectNumber = i;
               tasksCRUD();
            }
        }
    }   

    const tasksCRUD = () => {
        displayController().showTasks(main, projectArray[projectNumber].tasks)
        logic().removeTask(document.getElementsByClassName("itemsContainer"), projectArray[projectNumber].tasks);
        logic().taskComplete(document.getElementsByClassName("itemsContainer"), projectArray[projectNumber].tasks);
        localStorage.setItem("projects", JSON.stringify(projectArray));
    }

    const defaultProjectsandTasks = () => {
        if (localStorage.getItem("projects")) {
            let x = JSON.parse(localStorage.getItem("projects"));
            for (let i = 0; i < x.length; i++) {
                projectArray.push(x[i]);
            }
            displayController().showProjects(projectArray, document.querySelector("ul"));
            logic().currentProject(allProjects, 0);
            logic().removeProject(allProjectDeletes);
            tasksCRUD();
            allProjects[0].parentElement.classList.add("selectedBG");
        }
        else {
            pushProject("Object Orientated Programming");
            pushProject("Fitness");
            pushProject("Chess");
            generateTask(projectArray[0].tasks, classMould = new Todo("task"), "Practical Object-Oriented Design", "Purchase and read up on Practical Object-Oriented Design: An Agile Primer Using Ruby.", "2021-06-04", "low", false);
            generateTask(projectArray[0].tasks, classMould = new Todo("task"), "OOP Most common Principals", "Read the article on Betterprogramming summarising the common concepts found in OOP.", "2021-05-04", "medium", true);
            generateTask(projectArray[1].tasks, classMould = new Todo("task"), "Running", "Increment distance of each run biweekly by .5km until 10km per run", "2021-12-07", "high", false);
            generateTask(projectArray[2].tasks, classMould = new Todo("task"), "Maroczy Bind", "Learn how to react to accelerated dragon players who create a light color complex.", "2021-05-15", "low", false);
            generateTask(projectArray[2].tasks, classMould = new Todo("task"), "Rapid", "Push to 1400 in rapid.", "2021-04-30", "medium", true);
            generateTask(projectArray[2].tasks, classMould = new Todo("task"), "Blitz", "Push to 1200 in blitz.", "2021-05-30", "high", false);
            displayController().showProjects(projectArray, document.querySelector("ul"));
            currentProject(allProjects, 0);
            removeProject(allProjectDeletes);
            allProjects[0].parentElement.classList.add("selectedBG");
            tasksCRUD();
            localStorage.setItem("projects", JSON.stringify(projectArray));

        }
    }

    return {newTask, removeTask, taskComplete, removeProject, newProject, pushProject, currentProject, defaultProjectsandTasks, tasksCRUD};
}

//Fetch a username on first visit and store/display it.
if(!localStorage.getItem("userName")) {
    const user = new User(prompt("Enter your name:"));
    localStorage.setItem("userName", user.name);
    displayController().displayWelcome(main);
} else {;
    displayController().displayWelcome(main);
}

displayController().displayForm(taskBtn, taskForm, "true");
displayController().displayForm(projectBtn, projectForm);
displayController().hideLabel(document.getElementById("title"), document.getElementById("titleLabel"));
displayController().hideLabel(document.getElementById("description"), document.getElementById("descriptionLabel"));
displayController().hideLabel(document.getElementById("projectInput"), document.getElementById("projectLabel"));
logic().defaultProjectsandTasks();

// Add tasks to Task Array
taskSubmit.addEventListener("click", (e) => {
    if (document.querySelector("#taskForm").checkValidity()) {
        e.preventDefault();
        logic().newTask(projectArray[projectNumber].tasks, document.querySelectorAll("input"), classMould = new Todo("task"));
        
        logic().tasksCRUD();
    }
})

projectSubmit.addEventListener("click", (e) => {
    if (document.querySelector("#projectForm").checkValidity()) {
        e.preventDefault();
        // Add new project to projectArray and display elements to DOM
        logic().newProject(projectArray, document.querySelectorAll("input"));
        displayController().newProject(projectArray, document.querySelector("ul"), document.querySelectorAll("input")[0].value);

        // adds event that Listens and saves current Project Selected
        logic().currentProject(allProjects, allProjects.length - 1);

        // adds event that listens and removes project from projectArray and removes elements from DOM
        logic().removeProject(allProjectDeletes);
    }
})