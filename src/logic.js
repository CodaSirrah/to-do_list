import {Todo, User, Projects} from "./Class"

const logic = () => {
    const newTask = (array, input, task, currentProject) => {
                task.title = input[2].value;
                task.description = input[3].value;
                task.dueDate = input[4].value;
                task.project = currentProject;
                if (input[5].checked == true) {
                task.priority = "low";
                } else if (input[6].checked == true) {
                    task.priority = "medium";
                } else {
                    task.priority = "high";
                }
                array.push(task);
    }

    const newProject = (array, input) => {
        let project = input[0].value;
        array.push(project);
    }

    const removeProject = target => {
        for (let i = 0;  i < target.length; i++) {
            target[i].addEventListener("click", () => {
                target[i].parentElement.remove();
            })
        }
    }

    const currentProject = (array, currentProject) => {
                currentProject = array;
                console.log("test");
           
    
         
    }

    const defaultProjects = (array, project) => {
        array.push(project);
    }

    return {newTask, removeProject, newProject, currentProject, defaultProjects};
}

export default logic