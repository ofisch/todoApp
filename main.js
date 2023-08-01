window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listElement = document.querySelector("#tasks");

  let elementsToSave = [];
  const elements = JSON.parse(localStorage.getItem("elements"));

  // tulostetaan localStoragessa olevat elementit
  const renderElements = () => {
    listElement.innerHTML = "";
    elementsToSave = [];
    if (elements != null) {
      console.log("noni tulostetaas");
      for (i of elements) {
        // task-elementin rakentaminen
        const task = document.createElement("div");
        task.classList.add("task");

        const taskContent = document.createElement("div");
        taskContent.classList.add("content");

        task.appendChild(taskContent);

        const taskInput = document.createElement("input");
        taskInput.classList.add("text");
        taskInput.type = "text";
        taskInput.value = i;
        taskInput.setAttribute("readonly", "readonly");

        taskContent.appendChild(taskInput);

        const taskActions = document.createElement("div");
        taskActions.classList.add("actions");

        const taskEdit = document.createElement("button");
        taskEdit.classList.add("edit");
        taskEdit.innerHTML = "Muokkaa";

        const taskDelete = document.createElement("button");
        taskDelete.classList.add("delete");
        taskDelete.innerHTML = "Poista";

        taskActions.appendChild(taskEdit);
        taskActions.appendChild(taskDelete);

        task.appendChild(taskActions);

        listElement.appendChild(task);

        elementsToSave.push(i);

        taskDelete.addEventListener("click", () => {
          for (i of elements) {
            if (i == task.firstChild.firstChild.value) {
              console.log(
                "poistettava arvo: ",
                task.firstChild.firstChild.value
              );
              elements.splice(elements.indexOf(i), 1);
              // päivitetään localStorage
              localStorage.setItem("elements", JSON.stringify(elements));
              location.reload();
            }
          }
        });
      }
      console.log("elementsToSave: ", elementsToSave);
    }
  };

  renderElements();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task) {
      alert("täytä tekstikenttä");
      return;
    }

    // elementin tallentamineen elements-taulukkoon
    elementsToSave.push(task);
    console.log("uusin elementti joka tallennetaan: ", elementsToSave);
    // eka localStorage tyhjäks
    localStorage.clear();
    // päivitetyn elements-taulukon tallentaminen localStorageen
    localStorage.setItem("elements", JSON.stringify(elementsToSave));

    input.value = "";

    /*
        // tulostetaan elementit uudestaan (päivitettynä)
        renderElements();
        */

    location.reload();

    /*
        taskElementEdit.addEventListener('click', () => {
            if (taskElementEdit.innerText.toLowerCase() == 'muokkaa') {
                taskElementInput.removeAttribute('readonly');
            taskElementInput.focus();
            taskElementEdit.innerText = "Tallenna";
            } else {
                taskElementInput.setAttribute("readonly", "readonly");
                taskElementEdit.innerText = "Muokkaa";
            }
        })

        taskElementDelete.addEventListener('click', () => {
            // poistetaan elementtiListasta
            listElement.removeChild(taskElement);
            // poistetaan taulukosta
            for (i of elements) {
                if (i == taskElement.firstChild.firstChild.value) {
                    console.log('poistettava arvo: ', taskElement.firstChild.firstChild.value);
                    elements.splice(elements.indexOf(i), 1);
                    // päivitetään localStorage
                    localStorage.setItem('elements', JSON.stringify(elements));
                }
            }        
        })
        */
  });
});
