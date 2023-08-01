window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const listElement = document.querySelector('#tasks');

    const elements = JSON.parse(localStorage.getItem('elements'));


    // tulostetaan localStoragessa olevat elementit
    for (i of elements) {

        // task-elementin rakentaminen
        const task = document.createElement('div');
        task.classList.add('task');

        const taskContent = document.createElement('div');
        taskContent.classList.add('content');

        task.appendChild(taskContent);

        const taskInput = document.createElement('input');
        taskInput.classList.add('text');
        taskInput.type = 'text';
        taskInput.value = i;
        taskInput.setAttribute('readonly', 'readonly');

        taskContent.appendChild(taskInput);
        
        const taskActions = document.createElement('div');
        taskActions.classList.add('actions');

        const taskEdit = document.createElement('button');
        taskEdit.classList.add('edit');
        taskEdit.innerHTML = 'Muokkaa';

        const taskDelete = document.createElement('button');
        taskDelete.classList.add('delete');
        taskDelete.innerHTML = 'Poista';

        taskActions.appendChild(taskEdit);
        taskActions.appendChild(taskDelete);

        task.appendChild(taskActions);

        listElement.appendChild(task);

    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("täytä tekstikenttä");
            return;
        } 

        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const taskElementContent = document.createElement('div');
        taskElementContent.classList.add('content');

        taskElement.appendChild(taskElementContent);

        const taskElementInput = document.createElement('input');
        taskElementInput.classList.add('text');
        taskElementInput.type = 'text';
        taskElementInput.value = task;
        taskElementInput.setAttribute('readonly', 'readonly');

        taskElementContent.appendChild(taskElementInput);
        console.log('taskElementInput: ', taskElementInput.value);


        // elementin tallentamineen elements-taulukkoon 
        elements.push(taskElementInput.value);
        // elements-taulukon tallentaminen localStorageen
        localStorage.setItem('elements', JSON.stringify(elements));


        const taskElementActions = document.createElement('div');
        taskElementActions.classList.add('actions');

        const taskElementEdit = document.createElement('button');
        taskElementEdit.classList.add('edit');
        taskElementEdit.innerHTML = 'Muokkaa';

        const taskElementDelete = document.createElement('button');
        taskElementDelete.classList.add('delete');
        taskElementDelete.innerHTML = 'Poista';

        taskElementActions.appendChild(taskElementEdit);
        taskElementActions.appendChild(taskElementDelete);

        taskElement.appendChild(taskElementActions);

        listElement.appendChild(taskElement);

        input.value = '';

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

    })
})