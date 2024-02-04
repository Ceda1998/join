/* Remove or Add pop-up-container */

function openPopUpContainer() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.remove('d-none');
}


function closePopUpContainer() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.add('d-none');
}


/* Remove or add d-none */

function removeDNone(name) {
    let field = document.getElementById(name)
    field.classList.remove('d-none');
}


function addDNone(name) {
    let field = document.getElementById(name)
    field.classList.add('d-none');
}


/* Pop-up to add a new Task */
    
function openPopUpAt() {
    openPopUpContainer();
    removeDNone('popUpAtField');
}


function closePopUpAt() {
    closePopUpContainer();
    addDNone('popUpAtField');
    clearTask();
    fetchAndReloadBoard();
}


/* The pop-up when you click on a specific task on the board */

async function openTaskBig(id) {
    await getTasksFromServer();
    openPopUpContainer();
    removeDNone('popUpTaskBig');
    let index = getIndexById(id);
    console.log(index);
    let currentTask = tasks[index];
    let popUp = document.getElementById('popUpTaskBig');
    popUp.innerHTML = '';
    renderAlInformationsTaskBig(popUp, currentTask, index);
}


/* Function to get the index by the taskid */

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


/* Render all informations for the task-pop-up */

function renderAlInformationsTaskBig(popUp, currentTask, index) {
    popUp.innerHTML += renderPopUpCardTask(currentTask, index);
    renderColorsCategoryPu(currentTask);
    renderDescriptionPu(currentTask);
    renderDueDatePu(currentTask);
    renderPrioPu(currentTask);
    renderassignedToPu(currentTask);
    renderSubtasksPu(currentTask, index);
}


/* HTML-Template for the task */

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
        <span class="pu-big-assigned-to">Assigned to:</span>
        <div class="pu-big-contacts" id="puBigContacts"></div>
        <span class="pu-big-subtasks">Subtasks</span> 
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


/* Background-Color of the specific category */

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


/* The description part, when there is a description and when not */

function renderDescriptionPu(currentTask) {
    let description = document.getElementById(`puBigDescription`);
    if (currentTask['description'] !== '') {
        description.innerHTML = currentTask['description'];
    } else {
        description.innerHTML = '';
    }
    
}


/* The date gets shown in the correct format */

function renderDueDatePu(currentTask) {
    let dueDateBig = document.getElementById(`dueDatePuBig`);
    const dateParts = currentTask['duedate'].split('-');
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const formattedDate = `${jsDate.getDate().toString().padStart(2, '0')}/${(jsDate.getMonth() + 1).toString().padStart(2, '0')}/${jsDate.getFullYear()}`;
    dueDateBig.innerHTML = formattedDate;
}


/* The priority is shown or not */

function renderPrioPu(currentTask, index) {
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


/* The selected contacts are shown */

function renderassignedToPu(currentTask) {
    let puBigContacts = document.getElementById(`puBigContacts`);
    puBigContacts.innerHTML = '';
    for (let i = 0; i < currentTask['contactids'].length; i++) {
        const contactid = currentTask['contactids'][i];
        const indexContact = getContactPu(contactid);
        ifElseContact(indexContact, puBigContacts, i);
    } 
}


/* Function to get all selected contacts from the array */

function getContactPu(contactid) {
    for (let j = 0; j < contacts.length; j++) {
        const contactidContacts = contacts[j]['contactid'];
        if (contactidContacts === contactid.toString()) {
            return j;
        }
    }
    return null;
}


/* The if-else part, when there are contacts or no contacts */

function ifElseContact(indexContact, puBigContacts, i) {
    if (indexContact !== null) {
        const contact = contacts[indexContact];
        selectedContactsAssignedTo.push(contact);
        const initials = contact['initials'];
        console.log(selectedContactsAssignedTo);
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


function renderBackgroundColorOverlay(initials, i) {
    let firstLetter = initials.charAt(0).toLowerCase();
    let initialsField = getField(`initialsBig${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/* Function to render the subtasks */

function renderSubtasksPu(currentTask, index) {
    let subtasksBigContainer = document.getElementById(`puBigSubtasksContainer`);
    console.log("Index " + index);
    subtasksBigContainer.innerHTML = '';
    if (currentTask['subtasks'] != '') {
        getSubtasksPu(currentTask, subtasksBigContainer, index);
    } else {
        subtasksBigContainer.innerHTML = '';
    }
}


/* For-Loop to get all subtasks */

function getSubtasksPu(currentTask, subtasksBigContainer, index) {
    for (let i = 0; i < currentTask['subtasks'].length; i++) {
        let currentSubtask = currentTask['subtasks'][i];
        subtasksBigContainer.innerHTML += /*html*/`
            <div class="pu-big-subtask-container">
                <img id="subtaskImg${i}" src="./assets/img/check-button.png" onclick="renderFinishedSubtaskPu(${i}, ${index})">
                <span>${currentSubtask['name']}</span>
            </div>
        `;
        renderCheckedSubtaskPu(i, currentSubtask);
    }
}


/* The value of the isToggled-variable gets changed and the image gets toggled too */

function renderFinishedSubtaskPu(i, index) {
    let currentTask = tasks[index];
    let currentSubtask = currentTask['subtasks'][i];
    currentSubtask['isToggled'] = !currentSubtask['isToggled'];
    console.log(currentSubtask['isToggled']);
    renderCheckImage(currentSubtask, i);
}


/* When the task gets opend the buttons get renderd  */

function renderCheckedSubtaskPu(i, currentSubtask) {
    renderCheckImage(currentSubtask, i);
}


/* Function to toggle the image */

function renderCheckImage(currentSubtask, i) {
    let currentSubtaskImg = document.getElementById(`subtaskImg${i}`);
    if (currentSubtask['isToggled']) {
        currentSubtaskImg.src = './assets/img/checked-button-black.png';
    } else {
        currentSubtaskImg.src = './assets/img/check-button.png';
    }
}


/* This function deletes the task */

async function deleteTask(index) {
    console.log(tasks[index]);
    tasks.splice(index, 1);
    console.log("current");
    console.log(tasks);
    await closeTaskBig();
}


/* The task gets closed */

async function closeTaskBig() {
    await setItem('tasks', tasks);
    closePopUpContainer();
    addDNone('popUpTaskBig');
    fetchAndReloadBoard();
}