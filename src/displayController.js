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

  const showProjects = (array, target, title, currentProject, currentProjectNumber) => {
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
      button.addEventListener("click", () => {
        for (i = 0; i < array.length; i++) {
          if (array[i].title == p.innerHTML) {
            array.splice(i, 1);
          }
        }
        li.remove();
        console.log(array);
      })
      div.addEventListener("click", () => {  
        currentProject = div;
        for (i = 0; i < array.length; i++) {
          if (array[i].title == currentProject.childNodes[0].innerHTML)
          currentProjectNumber = i;
          console.log(currentProjectNumber);
        }
        console.log(currentProject); 
        for (i = 0; i <= array.length; i++) {
          document.querySelectorAll("div")[i].parentElement.classList.remove("selectedBG");
        }
        div.parentElement.classList.add("selectedBG");
      })
      target.appendChild(li);
    }
  }

  const showTasks = (main, content, task) => {
    content.remove();
    content = document.createElement("div");
    content.setAttribute("id", "content");
    main.appendChild(content);
    for (let i = 0; i < task.length; i++) {
      let div = document.createElement("div");
      div.classList.add("itemsContainer");

      let taskCheckboxDiv = document.createElement("div");
      let taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckboxDiv.appendChild(taskCheckbox);
      div.appendChild(taskCheckboxDiv);

      let taskNameDiv = document.createElement("div");
      let taskName = document.createElement("p");
      taskName.innerHTML = task[i].title;
      taskNameDiv.appendChild(taskName);
      div.appendChild(taskNameDiv);
      
      let taskDescriptionDiv = document.createElement("div");
      let taskDescription = document.createElement("p");
      taskDescription.innerHTML = task[i].description;
      taskDescriptionDiv.appendChild(taskDescription);
      div.appendChild(taskDescriptionDiv);

      let taskDateDiv= document.createElement("div");
      let taskDate = document.createElement("p");
      taskDate.innerHTML = task[i].dueDate;
      taskDateDiv.appendChild(taskDate);
      div.appendChild(taskDateDiv);

      let taskPriorityDiv = document.createElement("div");
      let taskPriority = document.createElement("p");
      taskPriority.innerHTML = task[i].priority;
      taskCheckboxDiv.appendChild(taskPriority);
      div.appendChild(taskCheckboxDiv);

      let taskRemoveDiv = document.createElement("div");
      let taskRemove = document.createElement("button");
      taskRemove.innerHTML = "🗑️";
      taskRemoveDiv.appendChild(taskRemove);
      div.appendChild(taskRemoveDiv);
      content.appendChild(div);
    }
  }

  // const removeProject = (target, array) => {
  //   for (let i = array.length; i < target.length; i++) {
  //     target[i].addEventListener("click", () => {
  //       if (array[i] == undefined && array[i - 1 == undefined]) {
  //         target[i + 1].parentElement.remove();
  //       }
  //       else if (array[i] == undefined && array[i + 1] == undefined){
  //         target[i - 1].parentElement.remove();
  //       }
  //       else {
  //         target[i].parentElement.remove();
  //       }
  //     })
  //   } 
  // }

  return {displayWelcome, displayForm, hideLabel, showProjects, showTasks};
}

export default displayController