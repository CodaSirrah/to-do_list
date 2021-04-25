const displayController = () => {
  const displayWelcome = (target, user) => {
      let welcome = document.createElement("h1");
      welcome.innerHTML = `Welcome ${user}`;
      target.appendChild(welcome);
      
  }

  const displayForm = (btn, target) => {
      btn.addEventListener("click", () => {
          if (target.classList.contains('hidden')) {
              target.classList.remove('hidden');
              setTimeout(function () {
                target.classList.remove('visuallyhidden');
              }, 20);
              target.classList.add("scale");
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

  const projectForm = (target, input, label) => {
    if (!(target.children[target.children.length -1] == (document.querySelector("#projectForm")))) {
      let form = document.createElement("form");
      form.setAttribute("id", "projectForm");
      let div = document.createElement("div");
      let label = document.createElement("label");
      label.setAttribute("for", "projTitle");
      label.setAttribute("id", "projLabel");
      label.innerHTML = "Project Name";
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", "projTitle");
      input.setAttribute("id", "projInput");
      input.required = true;
      input.autocomplete = "off";
      input.setAttribute("size", "20");
      let submit = document.createElement("submit");
      submit.innerHTML = "✓";
      submit.setAttribute("id", "projSubmit");
      div.appendChild(label);
      div.appendChild(input);
      div.appendChild(submit);
      form.appendChild(div);
      target.appendChild(form);
      hideLabel(input, label);
    } else {
      removeProjectForm(target);
    }
  }

  const removeProjectForm = target => {
    target.children[target.children.length -1].remove();
  }

  const currentProject = target => {
    for (let i = 0; i < target.length; i++) {
      target[i].addEventListener("click", () => {
        for (let j = 0; j < target.length; j++) {
          target[j].dataset.selected = "false";
          target[j].classList.remove("selected");
        }
        target[i].classList.add("selected");
        return target[i].selected = "true";
      })
    }
  }
  
  const highlightProjects = (action, response) => {
    for (let i = 0; i < action.length; i++) {
      action[i].addEventListener("mouseover", () => {
        response[i].classList.add("hoverBG");
      })
      action[i].addEventListener("mouseleave", () => {
        response[i].classList.remove("hoverBG");
      })
    }
  }

  const highlightNewProject = (action, response) => {
    action.addEventListener("mouseover", () => {
      response.classList.add("hoverBG");
    })
    action.addEventListener("mouseleave", () => {
      response.classList.remove("hoverBG");
    })
  }
  
  const addProject = (target, title) => {
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
    target.appendChild(li);
    displayController().highlightNewProject(div, li);
  }

  return {
      displayWelcome,
      displayForm,
      hideLabel,
      projectForm,
      currentProject,
      highlightProjects,
      addProject,
      highlightNewProject
  };
}

export default displayController