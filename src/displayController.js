const displayController = () => {
  const displayWelcome = (target) => {
    const welcome = document.createElement('h1');
    welcome.setAttribute('id', 'welcome');
    welcome.innerHTML = `Welcome ${localStorage.getItem('userName')}`;
    target.appendChild(welcome);
  };
  const displayForm = (btn, target, scale) => {
    btn.addEventListener('click', () => {
      if (target.classList.contains('hidden')) {
        target.classList.remove('hidden');
        setTimeout(() => {
          target.classList.remove('visuallyhidden');
        }, 20);
        if (scale === 'true') {
          target.classList.add('scale');
        }
      } else {
        target.classList.add('visuallyhidden');
        target.addEventListener('transitionend', () => {
          target.classList.add('hidden');
          target.classList.remove('scale');
        }, {
          capture: false,
          once: true,
          passive: false,
        });
      }
    }, false);
  };

  const hideLabel = (input, label) => {
    input.addEventListener('input', () => {
      // eslint-disable-next-line no-unused-expressions
      (input.value !== '') ? label.classList.add('hideLabel') : label.classList.remove('hideLabel');
    });
  };

  const newProject = (array, target, title) => {
    for (let i = array.length - 1; i < array.length; i += 1) {
      const li = document.createElement('li');
      li.classList.add('projects');
      li.setAttribute('data-selected', 'false');
      const div = document.createElement('div');
      div.classList.add('projectBG');
      const p = document.createElement('p');
      p.innerHTML = title;
      p.classList.add('projectTitle');
      div.appendChild(p);
      const button = document.createElement('img');
      button.setAttribute('src', 'iconfinder_delete_3325111.png');
      button.classList.add('remove');
      li.appendChild(div);
      li.appendChild(button);
      div.classList.add('hoverBG');
      target.appendChild(li);
      div.addEventListener('click', () => {
        for (let j = 0; j < array.length; j += 1) {
          document.querySelectorAll('li')[j].classList.remove('selectedBG');
        }
        li.classList.add('selectedBG');
      });
    }
  };

  const showProjects = (array, target) => {
    for (let i = 0; i < array.length; i += 1) {
      const li = document.createElement('li');
      li.classList.add('projects');
      li.setAttribute('data-selected', 'false');
      const div = document.createElement('div');
      div.classList.add('projectBG');
      const p = document.createElement('p');
      p.innerHTML = array[i].title;
      p.classList.add('projectTitle');
      div.appendChild(p);
      const button = document.createElement('img');
      button.setAttribute('src', 'iconfinder_delete_3325111.png');
      button.classList.add('remove');
      li.appendChild(div);
      li.appendChild(button);
      div.classList.add('hoverBG');
      target.appendChild(li);
      div.addEventListener('click', () => {
        for (let j = 0; j < array.length; j += 1) {
          document.querySelectorAll('li')[j].classList.remove('selectedBG');
        }
        li.classList.add('selectedBG');
      });
    }
  };
  const removeProject = (target) => {
    target.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'remove') {
        e.target.parentElement.remove();
      }
    });
  };

  const createTableHeaders = (main) => {
    document.querySelector('#content').remove();
    const content = document.createElement('div');
    content.setAttribute('id', 'content');
    const header = document.createElement('h3');
    header.innerHTML = 'Tasks';
    header.setAttribute('id', 'tasks');
    content.appendChild(header);
    main.appendChild(content);
    const headers = document.createElement('div');
    headers.classList.add('headersContainer');
    const headerTitle = document.createElement('h5');
    headerTitle.innerHTML = 'Title';
    headerTitle.classList.add('header');
    headerTitle.setAttribute('id', 'hTitle');
    const headerDescription = document.createElement('h5');
    headerDescription.innerHTML = 'Description';
    headerDescription.classList.add('header');
    headerDescription.setAttribute('id', 'hDescription');
    const headerDueDate = document.createElement('h5');
    headerDueDate.innerHTML = 'Due-date';
    headerDueDate.classList.add('hCenter');
    headerDueDate.classList.add('header');
    headerDueDate.setAttribute('id', 'hDueDate');
    const headerPriority = document.createElement('h5');
    headerPriority.innerHTML = 'Priority';
    headerPriority.classList.add('hCenter');
    headerPriority.classList.add('header');
    headerPriority.setAttribute('id', 'hPriority');
    headers.appendChild(headerTitle);
    headers.appendChild(headerDescription);
    headers.appendChild(headerDueDate);
    headers.appendChild(headerPriority);
    content.appendChild(headers);
  };

  const showNoTasks = (main) => {
    createTableHeaders(main);
  };

  const showTasks = (main, task) => {
    createTableHeaders(main);

    // create each Dom Item
    for (let i = 0; i < task.length; i += 1) {
      const div = document.createElement('div');
      div.classList.add('itemsContainer');

      const taskCheckbox = document.createElement('input');
      taskCheckbox.setAttribute('type', 'checkbox');
      taskCheckbox.setAttribute('data-num', i);
      taskCheckbox.classList.add('item');

      const taskName = document.createElement('p');
      taskName.style.fontWeight = '900';
      taskName.innerHTML = task[i].title;
      taskName.classList.add('item');
      const taskDescription = document.createElement('p');
      taskDescription.innerHTML = task[i].description;
      taskDescription.classList.add('item');
      const taskDate = document.createElement('p');
      taskDate.innerHTML = task[i].dueDate;
      taskDate.classList.add('item');
      const taskPriority = document.createElement('p');
      taskPriority.innerHTML = task[i].priority;
      taskPriority.classList.add('italic');
      taskPriority.classList.add('item');
      const taskRemove = document.createElement('img');
      taskRemove.setAttribute('src', 'iconfinder_trash_4115238.png');
      taskRemove.setAttribute('data-num', i);
      taskRemove.classList.add('imgBin');
      taskRemove.classList.add('item');

      if (task[i].complete === true) {
        taskName.classList.add('strikeThrough');
        taskDescription.classList.add('strikeThrough');
        taskDate.classList.add('strikeThrough');
        taskPriority.classList.add('strikeThrough');
        div.classList.add('done');
        taskCheckbox.checked = true;
      }

      // append all items
      div.appendChild(taskCheckbox);
      div.appendChild(taskName);
      div.appendChild(taskDescription);
      div.appendChild(taskDate);
      div.appendChild(taskPriority);
      div.appendChild(taskRemove);
      // eslint-disable-next-line no-undef
      content.appendChild(div);
    }
  };

  return {
    displayWelcome,
    displayForm,
    hideLabel,
    newProject,
    showProjects,
    removeProject,
    showTasks,
    showNoTasks,
  };
};

export default displayController;
