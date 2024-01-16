/* Global Data */
let tasks;


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
    } else {
        renderEmptyTodo();
    }
}

function renderInProgress() {
    let inprogress_tasks = filterTasksByProgress(tasks, 'inprogress');
    let container = document.getElementById('inProgressTasks');
}

function renderAwaitFeedback() {
    let awaitfeedback_tasks = filterTasksByProgress(tasks, 'awaitfeedback');
    let container = document.getElementById('awaitFeedbackTasks');
}

function renderDone() {
    let done_tasks = filterTasksByProgress(tasks, 'done');
    let container = document.getElementById('doneTasks');
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

        console.log(task);
        
        const coworkersHTML = task['coworkerIds'].map(coworker => `<div class="todo-coworker">${coworker}</div>`).join('');
        const subtasksQty = task['subtaskIds'].length;

        el.innerHTML += `
        <div id="someid" class="todo" draggable="true" ondragstart="drag(event)">
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