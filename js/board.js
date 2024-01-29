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
    <div id="${task['taskid']}" class="todo" draggable="true" ondragstart="drag(event)">
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
        initials.push(contact.initials);
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

function openPopUpAt() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.remove('d-none');
}

function closePopUpAt() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.add('d-none');
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