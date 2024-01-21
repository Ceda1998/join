/* Global Data */
let tasks;
let toDo = 0;


window.onload = async () => {
    await includeHTML(); //Renders external templates and waits for it

    //Import tasks data from file- need to be changed to Server afterwards
    let resp = await fetch('./tasks.json');
    tasks = await resp.json();

    renderBoard();
};


/* Rendering the Board itself, divided by each column seperate rendering for search and drag and drop purpose */
function renderBoard() {
    renderToDo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

function renderToDo() {
    let todo_tasks = filterTasksByProgress(tasks, 'todo');
    let containerid = 'todoTasks';
    if (todo_tasks) {
        renderTasks(todo_tasks, containerid);
        console.log(toDo);
    } else {
        renderEmptyTodo();
    }
}

function renderInProgress() {
    let inprogress_tasks = filterTasksByProgress(tasks, 'inprogress');
    let containerid = 'inProgressTasks';
    if (inprogress_tasks) {
        renderTasks(inprogress_tasks, containerid);
    } else {
        renderEmptyTodo();
    }
}

function renderAwaitFeedback() {
    let awaitfeedback_tasks = filterTasksByProgress(tasks, 'awaitfeedback');
    let containerid = 'awaitFeedbackTasks';
    if (awaitfeedback_tasks) {
        renderTasks(awaitfeedback_tasks, containerid);
    } else {
        renderEmptyTodo();
    }
}

function renderDone() {
    let done_tasks = filterTasksByProgress(tasks, 'done');
    let containerid = 'doneTasks';
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
        
        const coworkersHTML = task['coworkerIds'].map(coworker => `<div class="todo-coworker">${coworker}</div>`).join('');
        const subtasksQty = task['subtaskIds'].length;

        el.innerHTML += `
        <div id="${task['id']}" class="todo" draggable="true" ondragstart="drag(event)">
            <span class="category">${task['category']}</span>
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
                    <img src="./assets/img/prio-media.png">
                </div>
            </div>
        </div>
        `;        
    });
};