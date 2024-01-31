/* Global Data */
let tasks;
let contacts;
let toDo = 0;


// window.onload = async () =>
async function init() {
    await includeHTML(); //Renders external templates and waits for it
    await getTasksFromServer();
    await getContactsFromServer();
    renderBoard();
    changeInitialsCurrentUser();
};

//Actually not in use
async function getTasksFromFile() {
    let resp = await fetch('./assets/json/tasks.json');
    tasks = await resp.json();
}

async function getTasksFromServer() {
    tasks = JSON.parse(await getItem('tasks'));
}

async function getContactsFromServer() {
    contacts = JSON.parse(await getItem('contacts'));
}


/* Rendering the Board itself, divided by each column seperate rendering for search and drag and drop purpose */
function renderBoard(arr) {
    renderToDo(arr);
    renderInProgress(arr);
    renderAwaitFeedback(arr);
    renderDone(arr);
    console.log(tasks);
    console.log(contacts);
}

function fetchAndReloadBoard() {
    getTasksFromServer();
    renderBoard();
}

function renderToDo(arr) {
    let todo_tasks;
    if (arr) {
        todo_tasks = filterTasksByProgress(arr, 'todo');
    } else {
        todo_tasks = filterTasksByProgress(tasks, 'todo');
    }
    let containerid = 'todo';
    if (todo_tasks.length > 0) {
        renderTasks(todo_tasks, containerid);
    } else {
        renderEmptyTodo(containerid);
    }
}

function renderInProgress(arr) {
    let inprogress_tasks;
    if (arr) {
        inprogress_tasks = filterTasksByProgress(arr, 'inprogress');
    } else {
        inprogress_tasks = filterTasksByProgress(tasks, 'inprogress');
    }
    let containerid = 'inprogress';
    if (inprogress_tasks.length > 0) {
        renderTasks(inprogress_tasks, containerid);
    } else {
        renderEmptyTodo(containerid);
    }
}

function renderAwaitFeedback(arr) {
    let awaitfeedback_tasks;
    if (arr) {
        awaitfeedback_tasks = filterTasksByProgress(arr, 'awaitfeedback');
    } else {
        awaitfeedback_tasks = filterTasksByProgress(tasks, 'awaitfeedback');
    }
    let containerid = 'awaitfeedback';
    if (awaitfeedback_tasks.length > 0) {
        renderTasks(awaitfeedback_tasks, containerid);
    } else {
        renderEmptyTodo(containerid);
    }
}

function renderDone(arr) {
    let done_tasks;
    if (arr) {
        done_tasks = filterTasksByProgress(arr, 'done');
    } else {
        done_tasks = filterTasksByProgress(tasks, 'done');
    }
    let containerid = 'done';
    if (done_tasks.length > 0) {
        renderTasks(done_tasks, containerid);
    } else {
        renderEmptyTodo(containerid);
    }
}

function filterTasksByProgress(obj, query) {
    return obj.filter((task) => task['progress'].includes(query));
}

function renderEmptyTodo(id) {
    document.getElementById(id).innerHTML = `<div id="emptyTodo" class="todo-empty">No tasks here</div>`;
}

/* Render HTML */
function renderTasks(tasks, id) {
    let el = document.getElementById(id);
    el.innerHTML = '';
    tasks.forEach((task) => {
        let coworkerIds = task['contactids'];
        const coworkersHTML = collectAndRenderCoworkers(coworkerIds);
        const subtasksQty = task['subtasks'].length;
        const prioHtml = getPriorityHtml(task.priority);
        el.innerHTML += renderTaskHtml(task, subtasksQty, coworkersHTML, prioHtml);
    });
};

function collectAndRenderCoworkers(coworkerIds) {
    return getInitials(coworkerIds).map(coworker => `<div class="todo-coworker">${coworker}</div>`).join('');
}

function getPriorityHtml(priovalue) {
    let url;
    if (priovalue) {
        prioButtons.forEach(el => {
            if (el.name == priovalue) {
                url = el.img;
            }
        });
        return `<img src="${url}"></img>`;
    }
    return '';
}



function renderTaskHtml(task, subtasksQty, coworkersHTML, prioHtml) {
    return `
    <div id="${task['taskid']}" class="todo" draggable="true" ondragstart="drag(event)" onclick="openTaskBig(${task['taskid']})">
        <span class="category-board">${task['category']}</span>
        <span class="todo-header">${task['title']}</span>
        <p class="todo-description">${task['description']}</p>
        <div class="subtasks">
            <div class="subtasks-bar-outer">
                <div class="subtasks-bar-inner"></div>
            </div>
            <span class="subtasks-text">${subtasksQty} Subtasks Total</span>
        </div>
        <div class="todo-footer">
            <div class="todo-coworkers">${coworkersHTML}</div>
            <div class="priority">                
                ${prioHtml}
            </div>
        </div>
    </div>
    `;
}

/* Helper function to retrieve Initials from contacts array */
function getInitials(coworkerIds) {
    let initials = [];
    coworkerIds.forEach(id => {
        const contact = contacts.find(contact => contact.contactid == id);
        if (contact) {
            initials.push(contact.initials);
        }        
    });
    return initials;
}

async function updateTask(newtaskid, newprogress) {
    tasks.forEach(task => {
        if (task.taskid == newtaskid) {
            task.progress = newprogress;
        }
    });
    await setItem('tasks', tasks);
    fetchAndReloadBoard();
}

function filterTasks() {
    let inval = document.getElementById('filterTasks').value;
    const filteredtasks = tasks.filter((task) => {
        if(task.title.toLowerCase().includes(inval.toLowerCase()) || task.description.toLowerCase().includes(inval.toLowerCase())) {
            return true;
        } return false;
    });
    renderBoard(filteredtasks);
}


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


function openTaskBig(id) {
    openPopUpContainer();
    removeDNone('popUpTaskBig');
    let index = id-1;
    let currentTask = tasks[index];
    let popUp = document.getElementById('popUpTaskBig');
    popUp.innerHTML = '';
    popUp.innerHTML += renderPopUpCardTask(currentTask, index);
    renderColorsCategoryPu(index);
    renderDescriptionPu(currentTask, index);
    renderDueDatePu(currentTask, index);
    renderPrioPu(currentTask, index);
    renderassignedToPu(currentTask, index);
    renderSubtasksPu(currentTask, index);
}


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
            <div class="pu-big-edit-only">
                <img class="pu-big-delete" src="./assets/img/delete-img.png">
                <span>Delete</span>
            </div>
            <div class="pu-big-seperator"></div>
            <div class="pu-big-edit-only">
                <img class="pu-big-edit" src="./assets/img/edit.png">
                <span>Edit</span>
            </div>
        </div>
    `;
}


function renderColorsCategoryPu(index) {
    let category = document.getElementById(`categoryPuBig${index}`);
    if (category.innerHTML === "User Story") {
        category.classList.add('user-story');
    } else {
        category.classList.add('technical-task');
    }
}


function renderDescriptionPu(currentTask, index) {
    let description = document.getElementById(`puBigDescription${index}`);
    if (currentTask['description'] !== '') {
        description.innerHTML = currentTask['description'];
    } else {
        description.innerHTML = '';
    }
    
}


function renderDueDatePu(currentTask, index) {
    let dueDateBig = document.getElementById(`dueDatePuBig${index}`);
    const dateParts = currentTask['duedate'].split('-');
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const formattedDate = `${jsDate.getDate().toString().padStart(2, '0')}/${(jsDate.getMonth() + 1).toString().padStart(2, '0')}/${jsDate.getFullYear()}`;
    dueDateBig.innerHTML = formattedDate;
}


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


function renderassignedToPu(currentTask, index) {
    let puBigContacts = document.getElementById(`puBigContacts${index}`);
    puBigContacts.innerHTML = '';
    for (let i = 0; i < currentTask['contactids'].length; i++) {
        const contactid = currentTask['contactids'][i];
        const indexContact = getContactPu(contactid);
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
}


function getContactPu(contactid) {
    for (let j = 0; j < contacts.length; j++) {
        const contactidContacts = contacts[j]['contactid'];
        if (contactidContacts === contactid.toString()) {
            return j;
        }
    }
    return null;
}


function renderSubtasksPu(currentTask, index) {
    let subtasksBigContainer = document.getElementById(`puBigSubtasksContainer${index}`);
    subtasksBigContainer.innerHTML = '';
    for (let i = 0; i < currentTask['subtasks'].length; i++) {
        const currentSubtask = currentTask['subtasks'][i];
        subtasksBigContainer.innerHTML += /*html*/`
            <div class="pu-big-subtask-container">
                <img src="./assets/img/check-button.png">
                <span>${currentSubtask}</span>
            </div>
        `;
    }
}


function closeTaskBig() {
    closePopUpContainer();
    addDNone('popUpTaskBig');
}

