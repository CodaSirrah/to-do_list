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

  const newProject = (array, target, title) => {
    for (let i = array.length - 1; i < array.length; i++) {
      let li = document.createElement("li");
      li.classList.add("projects");
      li.setAttribute("data-selected", "false");
      let div = document.createElement("div");
      div.classList.add("projectBG");
      let p = document.createElement("p");
      p.innerHTML = title;
      p.classList.add("projectTitle");
      div.appendChild(p);
      let button = document.createElement("img");
      button.setAttribute("src", "iconfinder_delete_3325111.png");
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

  const showProjects = (array, target) => {
    for (let i = 0; i < array.length; i++) {
      let li = document.createElement("li");
      li.classList.add("projects");
      li.setAttribute("data-selected", "false");
      let div = document.createElement("div");
      div.classList.add("projectBG");
      let p = document.createElement("p");
      p.innerHTML = array[i].title;
      p.classList.add("projectTitle");
      div.appendChild(p);
      let button = document.createElement("img");
      button.setAttribute("src", "iconfinder_delete_3325111.png");
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
    
  const removeProject = target => {
    target.addEventListener("click", (e) => {
      if (e.target.classList[0] == "remove")
        e.target.parentElement.remove();
    })
}

  const showNoTasks = main => {
    createHeaders(main);
  }

  const createHeaders = main => {
    document.querySelector("#content").remove();
    let content = document.createElement("div");
    content.setAttribute("id", "content");
    let header = document.createElement("h3");
    header.innerHTML = "Tasks";
    header.setAttribute("id", "tasks");
    content.appendChild(header);
    main.appendChild(content);
    let headers = document.createElement("div");
    headers.classList.add("headersContainer");
    let headerTitle = document.createElement("h5");
    headerTitle.innerHTML = "Title";
    headerTitle.classList.add("header");
    headerTitle.setAttribute("id", "hTitle");
    let headerDescription = document.createElement("h5");
    headerDescription.innerHTML = "Description"
    headerDescription.classList.add("header");
    headerDescription.setAttribute("id", "hDescription");
    let headerDueDate = document.createElement("h5");
    headerDueDate.innerHTML = "Due-date";
    headerDueDate.classList.add("hCenter");
    headerDueDate.classList.add("header");
    headerDueDate.setAttribute("id", "hDueDate");
    let headerPriority = document.createElement("h5");
    headerPriority.innerHTML = "Priority";
    headerPriority.classList.add("hCenter");
    headerPriority.classList.add("header");
    headerPriority.setAttribute("id", "hPriority");
    headers.appendChild(headerTitle);
    headers.appendChild(headerDescription);
    headers.appendChild(headerDueDate);
    headers.appendChild(headerPriority);
    content.appendChild(headers);
  }

  const showTasks = (main, task) => {
    createHeaders(main);

    // create each Dom Item
    for (let i = 0; i < task.length; i++) {
      let div = document.createElement("div");
      div.classList.add("itemsContainer");

      let taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckbox.setAttribute("data-num", i);
      taskCheckbox.classList.add("item");

      let taskName = document.createElement("p");
      taskName.style.fontWeight = "900";
      taskName.innerHTML = task[i].title;
      taskName.classList.add("item");
       
      let taskDescription = document.createElement("p");
      taskDescription.innerHTML = task[i].description;
      taskDescription.classList.add("item");
      
      let taskDate = document.createElement("p");
      taskDate.innerHTML = task[i].dueDate;
      taskDate.classList.add("item");
        
      let taskPriority = document.createElement("p");
      taskPriority.innerHTML = task[i].priority;
      taskPriority.classList.add("italic");
      taskPriority.classList.add("item");
      
      let taskRemove = document.createElement("img");
      taskRemove.setAttribute("src", "iconfinder_trash_4115238.png");
      taskRemove.setAttribute("data-num", i);
      taskRemove.classList.add("imgBin");
      taskRemove.classList.add("item");

      if (task[i].complete == true) {
        taskName.classList.add("strikeThrough");
        taskDescription.classList.add("strikeThrough");
        taskDate.classList.add("strikeThrough");
        taskPriority.classList.add("strikeThrough");
        div.classList.add("done");
        taskCheckbox.checked = true;
      }

      // append all items
      div.appendChild(taskCheckbox);
      div.appendChild(taskName);
      div.appendChild(taskDescription);
      div.appendChild(taskDate);
      div.appendChild(taskPriority); 
      div.appendChild(taskRemove);
      content.appendChild(div);
    }
  }

  return {displayWelcome, displayForm, hideLabel, newProject, showProjects, removeProject, showTasks, showNoTasks};
}

export default displayController