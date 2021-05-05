import { Todo, User, Projects } from './Class';
import displayController from './displayController';

// selectors
const main = document.querySelector('#main');
const taskBtn = document.querySelector('#taskBtn');
const taskForm = document.querySelector('#taskForm');
const taskSubmit = document.querySelector('#taskSubmit');
const projectBtn = document.querySelector('#projectBtn');
const projectForm = document.querySelector('#projectForm');
const projectSubmit = document.querySelector('#projectSubmit');
const projectArray = [];
let projectName = '';
let projectNumber = 0;
const allProjects = document.getElementsByClassName('hoverBG');

const logic = () => {
  const newTask = (array, input, task) => {
    const t = task;
    t.title = input[2].value;
    t.description = input[3].value;
    t.dueDate = input[4].value;
    if (input[5].checked === true) {
      t.priority = 'low';
    } else if (input[6].checked === true) {
      t.priority = 'medium';
    } else {
      t.priority = 'high';
    }
    t.complete = false;
    array.push(t);
    localStorage.setItem('projects', JSON.stringify(projectArray));
    // eslint-disable-next-line no-param-reassign
    input[2].value = '';
    // eslint-disable-next-line no-param-reassign
    input[3].value = '';
    document.querySelector('#titleLabel').classList.remove('hideLabel');
    document.querySelector('#descriptionLabel').classList.remove('hideLabel');
    taskForm.classList.add('visuallyhidden');
    taskForm.addEventListener('transitionend', () => {
      taskForm.classList.add('hidden');
    }, { once: true });
  };

  const generateTask = (array, task, title, description, dueDate, priority, complete) => {
    const t = task;
    t.title = title;
    t.description = description;
    t.dueDate = dueDate;
    t.priority = priority;
    t.complete = complete;
    array.push(t);
  };

  const pushProject = (proj) => {
    projectArray.push(new Projects(proj));
    localStorage.setItem('projects', JSON.stringify(projectArray));
    projectForm.classList.add('visuallyhidden');
    projectForm.addEventListener('transitionend', () => {
      projectForm.classList.add('hidden');
    }, { once: true });
  };

  const newProject = (array, input) => {
    let project = {};
    project = input[0].value;
    let bool = true;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].title === project) {
        bool = false;
      }
        
    }
    if (bool) {
        logic().pushProject(project)
        displayController().newProject(projectArray, document.querySelector("ul"), document.querySelectorAll("input")[0].value);
    } else {
          alert("Please enter a unique project name");
    }
    input[0].value = "";
    document.querySelector("#projectLabel").classList.remove("hideLabel");
  }

    const removeProject = target => {
            target.addEventListener("click", (e) => {
                if (e.target.classList[0] == "remove") {
                    for (let i = 0; i < projectArray.length; i++) {
                        if (e.target.parentElement.childNodes[0].childNodes[0].innerHTML == projectArray[i].title) {
                            if (projectName == projectArray[i].title) displayController().showNoTasks(main);
                            projectArray.splice(i, 1);    
                        }
                    }
                }
                if (projectArray[0] == undefined) {
                    localStorage.removeItem("projects");
                }
                else {
                    localStorage.setItem("projects", JSON.stringify(projectArray));
                } 
            });
            
            displayController().removeProject(target);   
    }

    const currentProject = target => {
        target.addEventListener("click", (e) => {
            if (e.target.classList == "projectTitle") {
                 projectName = e.target.innerHTML;
            } else if (e.target.classList == "projectBG hoverBG") {
                 projectName = e.target.childNodes[0].innerHTML;   
            }
            for (let i = 0; i < projectArray.length; i++) {
                if (projectName == projectArray[i].title) {
                    projectNumber = i;
                    displayController().showTasks(main, projectArray[projectNumber].tasks);
                }
            }
            return projectName;
        });
    }

    const taskManagement = target => {
        function remove(e) {
                if (e.target.classList == "imgBin item") {
                    projectArray[projectNumber].tasks.splice(e.target.dataset.num, 1);
                    displayController().showTasks(main, projectArray[projectNumber].tasks);
                    localStorage.setItem("projects", JSON.stringify(projectArray));
                }
        }
        function checkComplete(e) {
                if (e.target.tagName == "INPUT" && e.target.classList == "item") {
                    if (projectArray[projectNumber].tasks[e.target.dataset.num].complete == false) {
                        projectArray[projectNumber].tasks[e.target.dataset.num].complete = true;
                    }
                    else projectArray[projectNumber].tasks[e.target.dataset.num].complete = false;
                    displayController().showTasks(main, projectArray[projectNumber].tasks);
                    localStorage.setItem("projects", JSON.stringify(projectArray));
                }
        }
        target.addEventListener("click", (e) => {
            remove(e);
            checkComplete(e);
        })
    }  

    const defaultProjectsandTasks = () => {
        if (localStorage.getItem("projects")) {
            let storedProjects = JSON.parse(localStorage.getItem("projects"));
            for (let i = 0; i < storedProjects.length; i++) {
                projectArray.push(storedProjects[i]);
            }
            displayController().showProjects(projectArray, document.querySelector("ul"));
            allProjects[0].parentElement.classList.add("selectedBG");
        }
        else {
            pushProject("Object Orientated Programming");
            pushProject("Fitness");
            pushProject("Chess");
            generateTask(projectArray[0].tasks, new Todo("task"), "Practical Object-Oriented Design", "Purchase and read up on Practical Object-Oriented Design: An Agile Primer Using Ruby.", "2021-06-04", "low", false);
            generateTask(projectArray[0].tasks, new Todo("task"), "OOP Most common Principals", "Read the article on Betterprogramming summarising the common concepts found in OOP.", "2021-05-04", "medium", true);
            generateTask(projectArray[1].tasks, new Todo("task"), "Running", "Increment distance of each run biweekly by .5km until 10km per run", "2021-12-07", "high", false);
            generateTask(projectArray[2].tasks, new Todo("task"), "Maroczy Bind", "Learn how to react to accelerated dragon players who create a light color complex.", "2021-05-15", "low", false);
            generateTask(projectArray[2].tasks, new Todo("task"), "Rapid", "Push to 1400 in rapid.", "2021-04-30", "medium", true);
            generateTask(projectArray[2].tasks, new Todo("task"), "Blitz", "Push to 1200 in blitz.", "2021-05-30", "high", false);
            displayController().showProjects(projectArray, document.querySelector("ul"));
            allProjects[0].parentElement.classList.add("selectedBG");
            localStorage.setItem("projects", JSON.stringify(projectArray));
        }
    }

    return {newTask, taskManagement, removeProject, newProject, pushProject, currentProject, defaultProjectsandTasks};
}

//Fetch the users name on first visit and store/display it.
if(!localStorage.getItem("userName")) {
    const user = new User(prompt("Enter your name:"));
    localStorage.setItem("userName", user.name);
    displayController().displayWelcome(main);
} else {
    displayController().displayWelcome(main);
}


//Event handlers for for display forms/labels.
displayController().displayForm(taskBtn, taskForm, "true");
displayController().displayForm(projectBtn, projectForm);
displayController().hideLabel(document.getElementById("title"), document.getElementById("titleLabel"));
displayController().hideLabel(document.getElementById("description"), document.getElementById("descriptionLabel"));
displayController().hideLabel(document.getElementById("projectInput"), document.getElementById("projectLabel"));
logic().defaultProjectsandTasks();

// Add/display tasks to Tasks
taskSubmit.addEventListener("click", (e) => {
    if (document.querySelector("#taskForm").checkValidity()) {
        e.preventDefault();
        logic().newTask(projectArray[projectNumber].tasks, document.querySelectorAll("input"), new Todo("task"));
        displayController().showTasks(main, projectArray[projectNumber].tasks);
    }
})
// Add/display projects to projects
projectSubmit.addEventListener("click", (e) => {
    if (document.querySelector("#projectForm").checkValidity()) {
        e.preventDefault();
        // Add new project to projectArray and display elements to DOM
        logic().newProject(projectArray, document.querySelectorAll("input"));
    }
})


displayController().showTasks(main, projectArray[0].tasks);
projectName = projectArray[0].title;

// Event Handlers for projects and tasks.
logic().currentProject(document.querySelector("#main"));
logic().removeProject(document.querySelector("#main"));
logic().taskManagement(document.querySelector("#main"));