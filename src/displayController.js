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

    const newProject = btn => {
    }
    return {
        displayWelcome,
        displayForm,
        hideLabel
    };
}

export default displayController