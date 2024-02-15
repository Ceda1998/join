/**
 * This function opens the main pop-up-container
 */
function openPopUpContainer() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.remove('d-none');
}


/**
 * This function closes the main pop-up-container
 */
function closePopUpContainer() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.add('d-none');
}


/**
 * This function removes the d-none of an element
 * @param {String} name - The id of the specific html element
 */
function removeDNone(name) {
    let field = document.getElementById(name)
    field.classList.remove('d-none');
}


/**
 * This function adds the d-none to an element
 * @param {String} name - The id of the specific html element 
 */
function addDNone(name) {
    let field = document.getElementById(name)
    field.classList.add('d-none');
}


/**
 * This function opens the pop-up to add a new task
 * @param {String} progress - This is the current progress 'todo', 'inprogress' or 'awaitfeedback'
 */    
async function openPopUpAt(progress) {
    await getItem('tasks');
    addDNone('popUpTaskBig');
    openPopUpContainer();
    removeDNone('popUpAtField');
    removeDNone('closeButtonPopUpAt');
    subtasks = [];
    currentProgress = progress;
    console.log(currentProgress);
}


/**
 * This function closes the pop-up to add a new task
 */
function closePopUpAt() {
    clearTask();
    currentProgress = '';
    console.log(currentProgress);
    closePopUpContainer();
    addDNone('popUpAtField');
    fetchAndReloadBoard();
}


/**
 * This function opens the pop-up, when you click on a specific task on the board
 * @param {Number} id - This is the taskid of the task you click on
 */
async function openTaskBig(id) {
    await getTasksFromServer();
    openPopUpContainer();
    removeDNone('popUpTaskBig');
    let index = getIndexById(id);
    let currentTask = tasks[index];
    let popUp = document.getElementById('popUpTaskBig');
    popUp.innerHTML = '';
    subtasks = [];
    renderAlInformationsTaskBig(popUp, currentTask, index);
}


/**
 * This function gets the index by the taskid
 * @param {Number} id - This is the taskid of the task you click on
 * @returns The index of the task gets returned or null
 */
function getIndexById(id) {
    const index = tasks.findIndex(function(task) {
        return task.taskid === id;
    })

    if (index != -1) {
        return index;
    } else {
        return null;
    }
}


/**
 * This runction renders the information for the task-pop-up
 * @param {HTMLElement} popUp - This is the html element for a white canvas of the pop-up-task 
 * @param {Object} currentTask - task object
 * @param {Number} index - This is the index of the current task
 */
function renderAlInformationsTaskBig(popUp, currentTask, index) {
    popUp.innerHTML += renderPopUpCardTask(currentTask, index);
    renderColorsCategoryPu(currentTask);
    renderDescriptionPu(currentTask);
    renderDueDatePu(currentTask);
    renderPrioPu(currentTask);
    renderassignedToPu(currentTask);
    renderSubtasksPu(currentTask, index);
}


/**
 * This is the html-template for to fill in the pop-up
 * @param {Object} currentTask - task object
 * @param {Number} index - This is the index of the current task
 * @returns The html-template gets returned
 */
function renderPopUpCardTask(currentTask, index) {
    return /*html*/`
        <div class="category-close-btn-container">
            <div class="category-pu-big" id="categoryPuBig">${currentTask['category']}</div>
            <img class="close-button-pu-big" src="./assets/img/close-img.png" onclick="closeTaskBig()">
        </div>
        <h1 class="pu-big-title">${currentTask['title']}</h1>
        <span class="pu-big-description" id="puBigDescription"></span>
        <table>
            <tr>
                <td>Due date:</td>
                <td id="dueDatePuBig"></td>
            </tr>
            <tr>
                <td>Priority:</td>
                <td id="priorityPuBig"></td>
            </tr>
        </table>
        <span class="pu-big-assigned-to" id="assignedToTaskBig">Assigned to:</span>
        <div class="pu-big-contacts" id="puBigContacts"></div>
        <span class="pu-big-subtasks" id="subtasksTaskBig">Subtasks</span> 
        <div class="pu-big-subtasks-container" id="puBigSubtasksContainer"></div>
        <div class="pu-big-edit-container">
            <div class="pu-big-edit-only" onclick="deleteTask(${index})">
                <img class="pu-big-delete" src="./assets/img/delete-img.png">
                <span>Delete</span>
            </div>
            <div class="pu-big-seperator"></div>
            <div class="pu-big-edit-only" onclick="editTask(${index})">
                <img class="pu-big-edit" src="./assets/img/edit.png">
                <span>Edit</span>
            </div>
        </div>
    `;
}


/**
 * The background color of the specific category
 * @param {Object} currentTask - task object
 */
function renderColorsCategoryPu(currentTask) {
    let currentCategory = currentTask['category'];
    let category = document.getElementById(`categoryPuBig`);
    if (currentCategory === "User Story") {
        category.classList.add('user-story');
        category.classList.remove('technical-task');
    } else {
        category.classList.add('technical-task');
        category.classList.remove('user-story');
    }
}


/**
 * Renders the description part, when there is a description and when not
 * @param {Object} currentTask - task object
 */
function renderDescriptionPu(currentTask) {
    let description = document.getElementById(`puBigDescription`);
    if (currentTask['description'] !== '') {
        description.innerHTML = `<pre>${currentTask['description']}</pre>`;
    } else {
        description.innerHTML = '';
    }
    
}


/**
 * The date gets shown in the correct format
 * @param {Object} currentTask - task object
 */
function renderDueDatePu(currentTask) {
    let dueDateBig = document.getElementById(`dueDatePuBig`);
    const dateParts = currentTask['duedate'].split('-');
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const formattedDate = `${jsDate.getDate().toString().padStart(2, '0')}/${(jsDate.getMonth() + 1).toString().padStart(2, '0')}/${jsDate.getFullYear()}`;
    dueDateBig.innerHTML = formattedDate;
}


/**
 * The priority is shown or not
 * @param {Object} currentTask - task object
 */
function renderPrioPu(currentTask) {
    let prioBig = document.getElementById(`priorityPuBig`);
    let priority = currentTask['priority'];
    if (priority !== '') {
        let priorityUppercase = priority.charAt(0).toUpperCase() + priority.slice(1);
        prioBig.innerHTML = /*html*/`
            ${priorityUppercase}<img src="./assets/img/img-${currentTask['priority']}.png">
        `;
    } else {
        prioBig.innerHTML = '';
    }
}


/**
 * The selected contacts are shown
 * @param {Object} currentTask - task object
 */
function renderassignedToPu(currentTask) {
    let puBigContacts = document.getElementById(`puBigContacts`);
    puBigContacts.innerHTML = '';
    let assignedToTitle = document.getElementById('assignedToTaskBig');
    ifElseToShowContacts(puBigContacts, assignedToTitle, currentTask)
}


/**
 * The ifElse-statement to show contacts if existing
 * @param {HTMLElement} puBigContacts - The html-container of the contacts
 * @param {HTMLElement} assignedToTitle - The html element of the assignedTo-title
 * @param {Object} currentTask - task object
 */
function ifElseToShowContacts(puBigContacts, assignedToTitle, currentTask) {
    if (currentTask['contactids'].length !== 0) {
        assignedToTitle.classList.remove('d-none');
        puBigContacts.classList.remove('d-none');
        for (let i = 0; i < currentTask['contactids'].length; i++) {
            const contactid = currentTask['contactids'][i];
            const indexContact = getContactPu(contactid);
            ifElseContact(indexContact, puBigContacts, i);
        } 
    } else {
        assignedToTitle.classList.add('d-none');
        puBigContacts.classList.add('d-none');
    }
}


/**
 * This function gets all selected contacts from the array
 * @param {Number} contactid - The id of the contact 
 * @returns If returns all the selected contacts or null
 */
function getContactPu(contactid) {
    for (let j = 0; j < contacts.length; j++) {
        if (contacts[j].contactid == contactid) {
            return j;
        }
    }
    return null;
}


/**
 * The if-else-part, when there are contacts or no contacts
 * @param {Number} indexContact - The index of the contact
 * @param {HTMLElement} puBigContacts - The html element of the id puBigContacts
 * @param {Number} i - The index of the current contactId
 */
function ifElseContact(indexContact, puBigContacts, i) {
    if (indexContact !== null) {
        const contact = contacts[indexContact];
        selectedContactsAssignedTo.push(contact);
        const initials = contact['initials'];
        puBigContacts.innerHTML += /*html*/`
        <div class="pu-big-contact-container">
            <div id="initialsBig${i}">${contact['initials']}</div>
            <span>${contact['fullname']}</span>
        </div>
    `;
    renderBackgroundColorOverlay(initials, i);
    } else {
        puBigContacts.innerHTML = '';
    }
}


/**
 * This runction renders the background color of the initials
 * @param {String} initials - Those are the initials as a string
 * @param {Number} i - The index of the current contactId
 */
function renderBackgroundColorOverlay(initials, i) {
    let firstLetter = initials.charAt(0).toLowerCase();
    let initialsField = getField(`initialsBig${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/**
 * This is the function to render the subtasks in the overaly
 * @param {Object} currentTask - task object
 * @param {Number} index - This is the index of the current task
 */
function renderSubtasksPu(currentTask, index) {
    let subtasksBigContainer = document.getElementById(`puBigSubtasksContainer`);
    subtasksBigContainer.innerHTML = '';
    let subtasksBigTitle = document.getElementById('subtasksTaskBig');
    if (currentTask['subtasks'] != '') {
        subtasksBigTitle.classList.remove('d-none');
        getSubtasksPu(currentTask, subtasksBigContainer, index);
    } else {
        subtasksBigTitle.classList.add('d-none');
        subtasksBigContainer.innerHTML = '';
    }
}


/**
 * For-loop to get all the subtasks
 * @param {Object} currentTask - task object
 * @param {HTMLElement} subtasksBigContainer - This is html element of the subtasks container
 * @param {Number} index - This is the index of the current task
 */
function getSubtasksPu(currentTask, subtasksBigContainer, index) {
    for (let i = 0; i < currentTask['subtasks'].length; i++) {
        let currentSubtask = currentTask['subtasks'][i];
        subtasks.push(currentSubtask);
        subtasksBigContainer.innerHTML += /*html*/`
            <div class="pu-big-subtask-container">
                <img id="subtaskImg${i}" src="./assets/img/check-button.png" onclick="renderFinishedSubtaskPu(${i}, ${index})">
                <span>${currentSubtask['name']}</span>
            </div>
        `;
        renderCheckedSubtaskPu(i, currentSubtask);
    }
}


/**
 * The value of the isToggled vairaible gets changed and the image in the input gets changed
 * @param {Number} i - The index of the subtask
 * @param {Number} index - The index of the task
 */
function renderFinishedSubtaskPu(i, index) {
    let currentTask = tasks[index];
    let currentSubtask = currentTask['subtasks'][i];
    currentSubtask['isToggled'] = !currentSubtask['isToggled'];
    renderCheckImage(currentSubtask, i);
}


/**
 * This function renders the check-button if the task gets opened
 * @param {Number} i - The index of the subtask
 * @param {Object} currentSubtask - subtask object
 */
function renderCheckedSubtaskPu(i, currentSubtask) {
    renderCheckImage(currentSubtask, i);
}


/**
 * This function toggles the check-image
 * @param {Object} currentSubtask - subtask object
 * @param {Number} i - The index of the subtask
 */
function renderCheckImage(currentSubtask, i) {
    let currentSubtaskImg = document.getElementById(`subtaskImg${i}`);
    if (currentSubtask['isToggled']) {
        currentSubtaskImg.src = './assets/img/checked-button-black.png';
    } else {
        currentSubtaskImg.src = './assets/img/check-button.png';
    }
}


/**
 * This function deletes the task
 * @param {Number} index - The index of the task
 */
async function deleteTask(index) {
    tasks.splice(index, 1);
    await closeTaskBig();
    console.log(tasks);
    init();
}


/**
 * This function closes the task-pop-up
 */
async function closeTaskBig() {
    await setItem('tasks', tasks);
    closePopUpContainer();
    try {
        clearInputFieldsTaskBig();
    } catch(e) {
    }
    addDNone('popUpTaskBig');
    fetchAndReloadBoard();
}


/**
 * This function clears the input fields after closing the task to prepare for the new task, which gets opened
 */
function clearInputFieldsTaskBig() {
    getField('titleInputEdit').value = '';
    getField('descriptionInputEdit').value = '';
    getField('dateInputEdit').value = '';
    selectedContactsAssignedTo = [];
    subtasks = [];
}