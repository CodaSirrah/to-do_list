const displayController = () => {
  const displayWelcome = (target) => {
      let welcome = document.createElement("h1");
      welcome.setAttribute("id", "welcome");
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

  const showNoTasks = main => {
    document.querySelector("#content").remove();
    let content = document.createElement("div");
    content.setAttribute("id", "content");
    let header = document.createElement("h3");
    header.innerHTML = "Tasks";
    header.setAttribute("id", "tasks");
    content.appendChild(header);
    main.appendChild(content);
  }

  const showTasks = (main, task) => {
    document.querySelector("#content").remove();
    let content = document.createElement("div");
    content.setAttribute("id", "content");
    let header = document.createElement("h3");
    header.innerHTML = "Tasks";
    header.setAttribute("id", "tasks");
    content.appendChild(header);
    main.appendChild(content);

    // create each Dom Item
    for (let i = 0; i < task.length; i++) {
      let div = document.createElement("div");
      div.classList.add("itemsContainer");

      let taskCheckboxDiv = document.createElement("div");
      let taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckbox.setAttribute("data-num", i);

      let taskNameDiv = document.createElement("div");
      let taskName = document.createElement("p");
      taskName.innerHTML = task[i].title;
       
      let taskDescriptionDiv = document.createElement("div");
      let taskDescription = document.createElement("p");
      taskDescription.innerHTML = task[i].description;
      
      let taskDateDiv= document.createElement("div");
      let taskDate = document.createElement("p");
      taskDate.innerHTML = task[i].dueDate;
        
      let taskPriorityDiv = document.createElement("div");
      let taskPriority = document.createElement("p");
      taskPriority.innerHTML = task[i].priority;
      
      let taskRemoveDiv = document.createElement("div");
      let taskRemove = document.createElement("button");
      taskRemove.innerHTML = "🗑️";
      taskRemove.setAttribute("data-num", i);

      if (task[i].complete == true) {
        taskName.classList.add("strikeThrough");
        taskDescription.classList.add("strikeThrough");
        taskDate.classList.add("strikeThrough");
        taskPriority.classList.add("strikeThrough");
        div.classList.add("done");
        taskCheckbox.checked = true;
      }

      // append all items
      taskCheckboxDiv.appendChild(taskCheckbox);
      taskCheckboxDiv.classList.add("item");
      div.appendChild(taskCheckboxDiv);

      taskNameDiv.appendChild(taskName);
      taskNameDiv.classList.add("item");
      div.appendChild(taskNameDiv);

      taskDescriptionDiv.appendChild(taskDescription);
      taskDescriptionDiv.classList.add("item");
      div.appendChild(taskDescriptionDiv);

      taskDateDiv.appendChild(taskDate);
      taskDateDiv.classList.add("item");
      div.appendChild(taskDateDiv);

      taskPriorityDiv.appendChild(taskPriority);
      taskPriorityDiv.classList.add("item");
      div.appendChild(taskPriorityDiv); 
      
      taskRemoveDiv.appendChild(taskRemove);
      taskRemoveDiv.classList.add("item");
      div.appendChild(taskRemoveDiv);

      content.appendChild(div);
    }
  }

  return {displayWelcome, displayForm, hideLabel, showProjects, removeProject, showTasks, showNoTasks};
}

export default displayController