/* Global Data */
let tasks;
let contacts;
let toDo = 0;
let filterActive = false;


/**
 * Inits when board body onload
 * Renders HTML templates
 * Fetches tasks from server
 * renders the Board with the fetched Tasks
 */
async function init() {
    await includeHTML();
    await getTasksFromServer();
    await getContactsFromServer();
    renderBoard();
};

/**
 * This casn be used if we want to work with lcoal data
 */
async function getTasksFromFile() {
    let resp = await fetch('./assets/json/tasks.json');
    tasks = await resp.json();
}

/**
 * Fetches tasks Array from Server and assigns to tasks
 */
async function getTasksFromServer() {
    tasks = JSON.parse(await getItem('tasks'));
}

/**
 * Fetches contacts Array from Server and assigns to contacts
 */
async function getContactsFromServer() {
    contacts = JSON.parse(await getItem('contacts'));
}


/**
 * Calls a function for each column where tasks need to be displayed
 * @param {Array} arr Not reuired. Filtered tasks for Search. 
 */
function renderBoard(arr) {
    renderToDo(arr);
    renderInProgress(arr);
    renderAwaitFeedback(arr);
    renderDone(arr);
}

/**
 * This checks if search is active and filter is set- if yes tasks need to be filtered before rendering the Array
 */
function fetchAndReloadBoard() {
    if (filterActive) {
        filterTasks();
    } else {
        renderBoard();
    }
}

/**
 * This function filters the task array by the Search input and calls renderBoard with a new Array based on the filter criteria
 */
function filterTasks() {
    filterActive = true;
    let inval = document.getElementById('filterTasks').value;
    if (inval == '') {
        filterActive = false;
    }
    filteredtasks = tasks.filter((task) => {
        if (task.title.toLowerCase().includes(inval.toLowerCase()) || task.description.toLowerCase().includes(inval.toLowerCase())) {
            return true;
        } return false;
    });
    renderBoard(filteredtasks);
}

/**
 * This renders the Todo tasks column
 * @param {Array} arr When filter is active then arr is set 
 */
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

/**
 * This renders the In Progress tasks column
 * @param {Array} arr When filter is active then arr is set 
 */
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

/**
 * This renders the Await Feedback tasks column
 * @param {Array} arr When filter is active then arr is set 
 */
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

/**
 * This renders the Done tasks column
 * @param {Array} arr When filter is active then arr is set 
 */
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

/**
 * This filter a given task Array and filters them by the given query and returns a new Array
 * @param {Array} tasks array (can be filtered)  
 * @param {String} query like todo which defines the progress of a task Object
 * @returns {Array} filtered Array by the query
 */
function filterTasksByProgress(arr, query) {
    return arr.filter((task) => task['progress'].includes(query));
}

/**
 * Renders empty todo
 * @param {String} id If of the Html element
 */
function renderEmptyTodo(id) {
    document.getElementById(id).innerHTML = `<div id="emptyTodo" class="todo-empty">No tasks here</div>`;
}

/**
 * This renders the tasks HTML related to the container
 * @param {Array} tasks Array
 * @param {String} id Container Id where tasks will be rendered
 */
function renderTasks(tasks, id) {
    let el = document.getElementById(id);
    el.innerHTML = '';
    tasks.forEach((task) => {
        let coworkerIds = task['contactids'];
        const coworkersHTML = collectAndRenderCoworkers(coworkerIds);
        const subtasksQty = task['subtasks'].length;
        const toggled = calculateSubtasksToggled(task.subtasks);
        const prioHtml = getPriorityHtml(task.priority);
        el.innerHTML += renderTaskHtml(task, subtasksQty, toggled, coworkersHTML, prioHtml);
    });
};

/**
 * This checks how many subtasks are toggled within the subtasks Array inside Task Object
 * @param {Array} arr Array Subtasks from Task Object
 * @returns {Number} qty of toggled tasks
 */
function calculateSubtasksToggled(arr) {
    let subtasksToggled = [];
    arr.forEach(st => {
        if (st.isToggled == true) {
            subtasksToggled.push(st);
        }
    });
    return subtasksToggled.length;
}

/**
 * Gets the initals from a contactid, maps the HTML of each Initial and joins them together. 
 * At last it returns complete HTML of all HTML Initials
 * @param {Arry} coworkerIds Gets an Arry with contactid`s from a specific task Object
 * @returns {HTML} 
 */
function collectAndRenderCoworkers(coworkerIds) {
    return getInitials(coworkerIds).map(coworker => `<div class="todo-coworker">${coworker}</div>`).join('');
}

/**
 * This checks for priovalue and returns the img element with the correspondig URL based on the prioValue
 * @param {String} priovalue Priority Value of the Task 
 * @returns {HTML} Html if prioValue otherwise empty ''
 */
function getPriorityHtml(priovalue) {
    let url;
    if (priovalue) {
        prioButtons.forEach(el => {
            if (el.name == priovalue) {
                url = el.img;
            }
        });
        return `<img src="${url}">`;
    }
    return '';
}

/**
 * Renders the task description inside a task card
 * @param {Obejct} task Task Object 
 * @returns {HTML} when description set, otherwise ''
 */
function renderDescription(task) {
    if (task.description) {
        return `<pre class="todo-description">${task['description']}</pre>`;
    } else {
        return `<pre class="todo-description"></pre>`;
    };
}

/**
 * This renders the subtasks bar inside a Task Card
 * @param {Boolean} toggled Value if subtask is toggled
 * @param {Number} subtasksQty qty of subtasks inside task 
 * @returns {HTML} if subtasks otherwise ''
 */
function renderSubtaskBar(toggled, subtasksQty) {
    if (subtasksQty) {
        return `
            <div class="board-subtasks">
                <div class="subtasks-bar-outer">
                    <div class="subtasks-bar-inner" style="width:${(toggled/subtasksQty)*100}%"></div>
                </div>
                <span class="subtasks-text">${subtasksQty} Subtasks. ${toggled}/${subtasksQty} Done ✔</span>
            </div>
        `;
    } else {
        return '';
    }
}

/**
 * This sets the category color by its value
 * @param {String} cat Category Value. Default is '#0038FF'
 * @returns {String} Color in Hex
 */
function getCategoryColor(cat){
    if (cat && cat == 'Technical Task') {
        return '#1FD7C1';
    } else if (cat) {
        return '#0038FF';
    }
}

/**
 * Builds the complete Task card HTML
 * @param {Object} task Object with task data
 * @param {Number} subtasksQty Number of subtasks
 * @param {Number} toggled Number of subtasks toggled
 * @param {HTML} coworkersHTML Coworkers Initials Html
 * @param {HTML} prioHtml Priority HTML Image Element
 * @returns {HTML} with complete HTML task
 */
function renderTaskHtml(task, subtasksQty, toggled, coworkersHTML, prioHtml) {
    return `
    <div id="${task['taskid']}" class="todo" draggable="true" ondragstart="drag(event)" onclick="openTaskBig(${task['taskid']})">
        <span class="category-board" style="background-color:${getCategoryColor(task.category)}">${task['category']}</span>
        <div class="todo-details">    
            <span class="todo-header">${task['title']}</span>
            ${renderDescription(task)}
            ${renderSubtaskBar(toggled, subtasksQty)}
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

/**
 * This function returns the initials of all coworker ids assigned to a task
 * @param {Number} coworkerIds all the coworkerIds which are assigned to a task 
 * @returns {Array} Initials of the coWorker Ids
 */
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