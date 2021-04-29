const displayController = () => {
  const displayWelcome = (target) => {
      let welcome = document.createElement("h1");
      welcome.innerHTML = `Welcome ${localStorage.getItem("userName")}`;
      target.appendChild(welcome);
  }
  
  const displayForm = (btn, target, scale) => {
      btn.addEventListener("click", () => {
          if (target.classList.contains('hidden')) {
              target.classList.remove('hidden');
              setTimeout(function () {
                target.classList.remove('visuallyhidden');
              }, 20);
              if (scale == "true") {
                target.classList.add("scale");
              }
            } else {
              target.classList.add('visuallyhidden');    
              target.addEventListener('transitionend', function(e) {
                target.classList.add('hidden');
                target.classList.remove("scale");
              }, {
                capture: false,
                once: true,
                passive: false
              });
            }
          }, false);
  }

  const hideLabel = (input, label) => {
      input.addEventListener("input", () => {
          (input.value != "") ? label.classList.add("hideLabel") : label.classList.remove("hideLabel");
      })
  }

  const showProjects = (array, target, title) => {
    for (let i = array.length - 1; i < array.length; i++) {
      let li = document.createElement("li");
      li.classList.add("projects");
      li.setAttribute("data-selected", "false");
      let div = document.createElement("div");
      div.classList.add("projectBG");
      let p = document.createElement("p");
      p.innerHTML = title;
      div.appendChild(p);
      let button = document.createElement("button");
      button.innerHTML = "x";
      button.classList.add("remove");
      li.appendChild(div);
      li.appendChild(button);
      div.classList.add("hoverBG");
      target.appendChild(li);
      div.addEventListener("click", () => {
        for (let i = 0; i < array.length; i++) {
          document.querySelectorAll("li")[i].classList.remove("selectedBG");
        }
        li.classList.add("selectedBG");
        
      })
    }
  }

  const removeProject = (target) => {
    for (let i = 0; i < target.length; i++) {
        target[i].removeEventListener("click", removeProjectEvent);
    }
    
    for (let i = 0; i < target.length; i++) {
        target[i].addEventListener("click", removeProjectEvent);
    }
}

function removeProjectEvent()  {
    this.parentElement.remove();
}

  const highlightSelected = (target, current, array) => {
    for (let i = array.length - 1; i < array.length; i++) {
      
    }
  }

  const showTasks = (main, content, task) => {
    content.remove();
    content = document.createElement("div");
    content.setAttribute("id", "content");
    let header = document.createElement("h3");
    header.innerHTML = "Tasks";
    header.setAttribute("id", "tasks");
    content.appendChild(header);
    main.appendChild(content);
    for (let i = 0; i < task.length; i++) {
      let div = document.createElement("div");
      div.classList.add("itemsContainer");

      let taskCheckboxDiv = document.createElement("div");
      let taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckboxDiv.appendChild(taskCheckbox);
      taskCheckboxDiv.classList.add("item");
      div.appendChild(taskCheckboxDiv);

        let taskNameDiv = document.createElement("div");
        let taskName = document.createElement("p");
        taskName.innerHTML = task[i].title;
        taskNameDiv.appendChild(taskName);
        taskNameDiv.classList.add("item");
        div.appendChild(taskNameDiv);
      
      let taskDescriptionDiv = document.createElement("div");
      let taskDescription = document.createElement("p");
      taskDescription.innerHTML = task[i].description;
      taskDescriptionDiv.appendChild(taskDescription);
      taskDescriptionDiv.classList.add("item");
      div.appendChild(taskDescriptionDiv);

        let taskDateDiv= document.createElement("div");
        let taskDate = document.createElement("p");
        taskDate.innerHTML = task[i].dueDate;
        taskDateDiv.appendChild(taskDate);
        taskDateDiv.classList.add("item");
        div.appendChild(taskDateDiv);

      let taskPriorityDiv = document.createElement("div");
      let taskPriority = document.createElement("p");
      taskPriority.innerHTML = task[i].priority;
      taskPriorityDiv.appendChild(taskPriority);
      taskPriorityDiv.classList.add("item");
      div.appendChild(taskPriorityDiv); 

      let taskRemoveDiv = document.createElement("div");
      let taskRemove = document.createElement("button");
      taskRemove.innerHTML = "🗑️";

      taskRemove.addEventListener("click", () => {
        removeItems(task, taskName, div);
         
      })

      taskRemoveDiv.appendChild(taskRemove);
      taskRemoveDiv.classList.add("item");
      div.appendChild(taskRemoveDiv);
      console.log(div);

      
      content.appendChild(div);
      
    }
  }
  function removeItems(task, taskName, div) {
    for (let i = 0; i < task.length; i++) {
      if(task[i].title == taskName.innerHTML) {
        task.splice(i, 1);
      }
    }
    div.remove();
  }
  

  return {displayWelcome, displayForm, hideLabel, showProjects, removeProject, showTasks};
}

export default displayController