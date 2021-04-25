const logic = () => {
    const newTask = (btn, array, input, clas) => {
        btn.addEventListener("click", (e) => {
            if (document.querySelector("form").checkValidity()) {
                e.preventDefault();
                clas.title = input[0].value;
                clas.description = input[1].value;
                clas.dueDate = input[2].value;
                if (input[3].checked == true) {
                clas.priority = "low";
                } else if (input[4].checked == true) {
                    clas.priority = "medium";
                } else {
                    clas.priority = "high";
                }
                array.push(clas);
                return console.log(array);
            }
        })
    }

    const removeProject = target => {
        for (let i = 0; i< target.length; i++) {
            target[i].addEventListener("click", () => {
                target[i].parentElement.remove();
            })
        }
    }

    return {newTask, removeProject};
}

export default logic