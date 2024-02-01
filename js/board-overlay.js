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
}


/* The pop-up when you click on a specific task on the board */

async function openTaskBig(id) {
    await getTasksFromServer();
    openPopUpContainer();
    removeDNone('popUpTaskBig');
    let index = id-1;
    let currentTask = tasks[index];
    let popUp = document.getElementById('popUpTaskBig');
    popUp.innerHTML = '';
    renderAlInformationsTaskBig(popUp, currentTask, index);
}


/* Render all informations for the task-pop-up */

function renderAlInformationsTaskBig(popUp, currentTask, index) {
    popUp.innerHTML += renderPopUpCardTask(currentTask, index);
    renderColorsCategoryPu(currentTask, index);
    renderDescriptionPu(currentTask, index);
    renderDueDatePu(currentTask, index);
    renderPrioPu(currentTask, index);
    renderassignedToPu(currentTask, index);
    renderSubtasksPu(currentTask, index);
}


/* HTML-Template for the task */

function renderPopUpCardTask(currentTask, index) {
    return /*html*/`
        <div class="category-close-btn-container">
            <div class="category-pu-big" id="categoryPuBig${index}">${currentTask['category']}</div>
            <img class="close-button-pu-big" src="./assets/img/close-img.png" onclick="closeTaskBig()">
        </div>
        <h1 class="pu-big-title">${currentTask['title']}</h1>
        <span class="pu-big-description" id="puBigDescription${index}"></span>
        <table>
            <tr>
                <td>Due date:</td>
                <td id="dueDatePuBig${index}"></td>
            </tr>
            <tr>
                <td>Priority:</td>
                <td id="priorityPuBig${index}"></td>
            </tr>
        </table>
        <span class="pu-big-assigned-to">Assigned to:</span>
        <div class="pu-big-contacts" id="puBigContacts${index}"></div>
        <span class="pu-big-subtasks">Subtasks</span>
        <div class="pu-big-subtasks-container" id="puBigSubtasksContainer${index}"></div>
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

function renderColorsCategoryPu(currentTask, index) {
    let currentCategory = currentTask['category'];
    let category = document.getElementById(`categoryPuBig${index}`);
    if (currentCategory === "User Story") {
        category.classList.add('user-story');
        category.classList.remove('technical-task');
    } else {
        category.classList.add('technical-task');
        category.classList.remove('user-story');
    }
}


/* The description part, when there is a description and when not */

function renderDescriptionPu(currentTask, index) {
    let description = document.getElementById(`puBigDescription${index}`);
    if (currentTask['description'] !== '') {
        description.innerHTML = currentTask['description'];
    } else {
        description.innerHTML = '';
    }
    
}


/* The date gets shown in the correct format */

function renderDueDatePu(currentTask, index) {
    let dueDateBig = document.getElementById(`dueDatePuBig${index}`);
    const dateParts = currentTask['duedate'].split('-');
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const formattedDate = `${jsDate.getDate().toString().padStart(2, '0')}/${(jsDate.getMonth() + 1).toString().padStart(2, '0')}/${jsDate.getFullYear()}`;
    dueDateBig.innerHTML = formattedDate;
}


/* The priority is shown or not */

function renderPrioPu(currentTask, index) {
    let prioBig = document.getElementById(`priorityPuBig${index}`);
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

function renderassignedToPu(currentTask, index) {
    let puBigContacts = document.getElementById(`puBigContacts${index}`);
    puBigContacts.innerHTML = '';
    for (let i = 0; i < currentTask['contactids'].length; i++) {
        const contactid = currentTask['contactids'][i];
        const indexContact = getContactPu(contactid);
        ifElseContact(indexContact, puBigContacts);
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

function ifElseContact(indexContact, puBigContacts) {
    if (indexContact !== null) {
        const contact = contacts[indexContact];
        puBigContacts.innerHTML += /*html*/`
        <div class="pu-big-contact-container">
            <div>${contact['initials']}</div>
            <span>${contact['fullname']}</span>
        </div>
    `;
    } else {
        puBigContacts.innerHTML = '';
    }
}


/* Function to render the subtasks */

function renderSubtasksPu(currentTask, index) {
    let subtasksBigContainer = document.getElementById(`puBigSubtasksContainer${index}`);
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


/* The html so you can edit the task */

function editTask(index) {
    let popUp = document.getElementById('popUpTaskBig');
    let currentTask = tasks[index];
    popUp.innerHTML = '';
    renderAllInformationsEditTask(index, currentTask, popUp);
}


function renderAllInformationsEditTask(index, currentTask, popUp) {
    popUp.innerHTML += renderPopUpCardEdit(index, currentTask);
}


function renderPopUpCardEdit(index, currentTask) {
    return /*html*/`
        <img class="close-button-pu-big" src="./assets/img/close-img.png" onclick="closeTaskBig()">
        <form onsubmit="saveEdittedTask(); return false">
            <div class="container">
                <div class="title">
                    <label>Title<span class="star">*</span><br>
                        <input id="titleInput" class="inputField focus" type="text" placeholder="Enter a title" onkeyup="checkValueTitle()" required>
                    </label>
                    <div id="titleRequiredContainer" class="title-required d-none">This field is required</div>
                </div>
                <br>
            </div>
        </form>
    `;
}
