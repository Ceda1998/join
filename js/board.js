/* Global Data */
let tasks;
let contacts;
let toDo = 0;



window.onload = async () => {
    await includeHTML(); //Renders external templates and waits for it
   
    //let resp = await fetch('./assets/json/tasks.json');
    //tasks = await resp.json();

    await getTasksFromServer();

    //Fetch contacts from remote
    await fetchContacts();
    renderBoard();
};

async function getTasksFromServer() {
    tasks = JSON.parse(await getItem('tasks'));
}

async function fetchContacts() {
    let res = await getItem('contacts');
    contacts = JSON.parse(res);
}


/* Rendering the Board itself, divided by each column seperate rendering for search and drag and drop purpose */
function renderBoard() {
    renderToDo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

function renderToDo() {
    let todo_tasks = filterTasksByProgress(tasks, 'todo');
    let containerid = 'todo';
    if (todo_tasks) {
        renderTasks(todo_tasks, containerid);
    } else {
        renderEmptyTodo();
    }
}

function renderInProgress() {
    let inprogress_tasks = filterTasksByProgress(tasks, 'inprogress');
    let containerid = 'inprogress';
    if (inprogress_tasks) {
        renderTasks(inprogress_tasks, containerid);
    } else {
        renderEmptyTodo();
    }
}

function renderAwaitFeedback() {
    let awaitfeedback_tasks = filterTasksByProgress(tasks, 'awaitfeedback');
    let containerid = 'awaitfeedback';
    if (awaitfeedback_tasks) {
        renderTasks(awaitfeedback_tasks, containerid);
    } else {
        renderEmptyTodo();
    }
}

function renderDone() {
    let done_tasks = filterTasksByProgress(tasks, 'done');
    let containerid = 'done';
    if (done_tasks) {
        renderTasks(done_tasks, containerid);
    } else {
        renderEmptyTodo();
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
        let coworkerIds = task['contactids'];;        
        const coworkersHTML = getInitials(coworkerIds).map(coworker => `<div class="todo-coworker">${coworker}</div>`).join('');
        const subtasksQty = task['subtasks'].length;

        const prioUrl = getPriorityImg(task.priority);

        el.innerHTML += renderTaskHtml(task, subtasksQty, coworkersHTML, prioUrl);     
    });
};

function getPriorityImg(priovalue) {
    let url;
    prioButtons.forEach(el => {
        if (el.name == priovalue) {
            url = el.img;
        }
    });
    return url;
}

function renderTaskHtml(task, subtasksQty, coworkersHTML, prioUrl) {
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
                <img src="${prioUrl}">
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
    getTasksFromServer();
    renderBoard();
}


function openPopUpAt() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.remove('d-none');
}


function closePopUpAt() {
    let popUp = document.getElementById('popUpAtContainer');
    popUp.classList.add('d-none');
}