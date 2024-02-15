/**
 * This function creates a task and saves the task in the remote storage
 */
async function createTask() {
    const inputFields = collectInputFields();
    renderContactIds();
    controlIfDescriptionEmtpy(inputFields.description);
    let task = createTaskInstance(inputFields);
    tasks.push(task);
    await setItem('tasks', tasks);
    clearTask();
    goToBoard();
}


/**
 * This function collects all the input fields
 * @returns {{
 * title: string,
 * description: string,
 * dueDate: string;
 * category: string;
 * taskId: Array<number>,
 * priority: string,
 * progress: string,
 * }}
 */
function collectInputFields() {
    let title = getField('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let dueDate = document.getElementById('dateInput').value;
    let category = document.getElementById('categoryInput').value;
    let taskId = gettingContactId();
    let priority = getPriority();
    let progress = getProgress();

    return { title, description, dueDate, category, taskId, priority, progress};
}


/**
 * This function creates a task instance for pushing to the tasks-array
 * @param {{
 * title: string,
 * description: string,
 * dueDate: string,
 * category: string,
 * taskId: number,
 * priority: string,
 * progress: string
 * }} param0 - The values to create the task
 * @returns {{
 * taskId: Array<number>,
 * title: string,
 * description: string,
 * category: string,
 * subtasks: Array<{
 *  name: string,
 *  isToggled: boolean
 * }>,
 * selectedContactsAssignedToIds: Array<number>,
 * priority: string,
 * progress: string,
 * dueDate: string
 * }}
 */
function createTaskInstance({ title, description, dueDate, category, taskId, priority, progress}) {
    return {
        "taskid": taskId,
        "title": title,
        "description": description,
        "category": category,
        "subtasks": subtasks,
        "contactids": selectedContactsAssignedToIds,
        "priority": priority,
        "progress": progress,
        "duedate": dueDate
    };
}


/**
 * This function controls if the description field is empty
 * @param {String} description - The description value
 * @returns {String} - The description value or an empty value
 */
function controlIfDescriptionEmtpy(description) {
    if (description == '') {
        description = '';
    }
    return description;
}


/**
 * This function sets the new taskId
 * @returns {Number} - The new taskId
 */
function gettingContactId() {
    return tasks.length + 1;
}


/**
 * This function gets the prio name
 * @returns {String} - The name of the prio 'urgent', 'medium', 'low' or empty
 */
function getPriority() {
        for (let i = 0; i < prioButtons.length; i++){
            let isButtonToggled = prioButtons[i]['toggled']
            if (isButtonToggled === true) {
                    return prioButtons[i]['name'];
            }
        }
        return '';
}


/**
 * This function gets the current progress
 * @returns {String} - The name of the current progress 'todo', 'inprogress' or 'awaitfeedback'
 */
function getProgress() {
    if (currentProgress === '') {
        return 'todo';
    } else {
        return currentProgress;
    }
}


/**
 * This function gets the selected contacts as an array or an empty array
 */
function renderContactIds() {
    if (selectedContactsAssignedTo.length > 0) {
        selectedContactsAssignedToIds = selectedContactsAssignedTo.map(contact => parseInt(contact['contactid']));
    } else {
        selectedContactsAssignedToIds = [];
    }
}


/**
 * After the task is created, the board is shown with all the tasks
 */
function goToBoard() {
    window.location.href = './board.html';
}