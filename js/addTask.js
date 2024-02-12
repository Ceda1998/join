let contactsAssigendTo = []; /* contacts fetched from the remote storage */
let selectedContactsAssignedTo = []; /* gets added to the tasks.json */
let selectedContactsAssignedToIds= [];
let isArrowAssignedToRotated = false;
let prioButtons = [
    {
        "name": "urgent",
        "img": "./assets/img/img-urgent.png",
        "toggled": false
    },

    {
        "name": "medium",
        "img": "./assets/img/img-medium.png",
        "toggled": false
    },

    {
        "name": "low",
        "img": "./assets/img/img-low.png",
        "toggled": false
    },
    ];
const TOTAL_BUTTONS = 3;
let isArrowCategoryRotated = false;
let subtasks = []; /* gets added to the tasks.json */
let tasksAssignedTo = []; /* tasks fetched from the remote storage */
let currentProgress;


/* When the side is loaded all Fields get initalized and cleared*/

async function initAddTask() {
    await includeHTML();
    await checkPath();
    await fetchContactsAt();
    await fetchTasksAt();
    renderAddTask();
    try {
        changeInitialsCurrentUser();
    } catch(e) {
    }
}


/* If the path is the main addTask page, then the close-button gets removed */

async function checkPath() {
    if (window.location.pathname === "/add_task.html") {
        await removeCloseButton();
    } else {
        await addCloseButton();
    }
}


/* Load Contacts from JSON later Remote Storage */

async function fetchContactsAt() {
    let resp = await getItem('contacts');
    contactsAssigendTo = JSON.parse(resp);
}


/* Load tasks from JSON later Remote Storage */

async function fetchTasksAt() {
    let resp = await getItem('tasks');
    tasksAssignedTo = JSON.parse(resp);
}


/* Render all the Fields from Add Task */

function renderAddTask() {
    let inputFields = getAllInputFields();
    setInputClear(inputFields);
}


/* Function to initialize the fields */

function getAllInputFields() {
    let titleInput = getField('titleInput');
    let descriptionInput = getField('descriptionInput');
    let assignedToInput = getField('assignedToInput');
    let dueDateInput = getField('dateInput');
    let categoryInput = getField('categoryInput');
    let subtaskInput = getField('subtaskInput');
    return {titleInput, descriptionInput, assignedToInput, dueDateInput, categoryInput, subtaskInput};
}


/* Function to initialize specific field */

function getField(fieldName) {
    let fieldElement = document.getElementById(`${fieldName}`);
    return fieldElement;
}


/* Function to clear the fields */

function setInputClear(inputFields) {
    inputFields.titleInput.value = '';
    inputFields.descriptionInput.value = '';
    inputFields.assignedToInput.value = '';
    selectedContactsAssignedTo = [];
    inputFields.dueDateInput.value = '';
    inputFields.categoryInput.value = '';
    inputFields.subtaskInput.value = '';
    subtasks = [];
    progress = '';
    renderInitialsSelected();
    clearPrioButtons();
    setPrioMedium();
    renderSubtasks();
    setArrowRotated();
}


/* Function to setArrowRotated start position */

function setArrowRotated() {
    if (isArrowAssignedToRotated == true) {
        toggleAssignedToDropDown();
    }
    if (isArrowCategoryRotated == true) {
        toggleCategoryDropDown();
    }  
}


/* Removes the close button */

async function removeCloseButton() {
    getField('closeButtonPopUpAt').classList.add('d-none');
}


/* Adds the close button */

async function addCloseButton() {
    getField('closeButtonPopUpAt').classList.remove('d-none');
}


/* When a field gets the focus, it gets a blue border */

function addFocus(selectedField) {
    document.getElementById(selectedField).classList.add('focus');
}


/* After clicking away from a field, the blue border gets removed */

function removeFocus(selectedField) {
    document.getElementById(selectedField).classList.remove('focus');
}


/* Add focus to container from input */

function addFocusToContainer(selectedField) {
    document.getElementById(selectedField).classList.add('focus-container');
}


/* Remove focus from container from input */

function removeFocusToContainer(selectedField) {
    document.getElementById(selectedField).classList.remove('focus-container');
}


/* After clicking on the title-input it gets checked if there is text in the inputfield */

function checkValueTitle(inputName, requiredContainerName) {
    let titleInput = getField(inputName)
    let titleRequiredContainer = getField(requiredContainerName);
    if (titleInput.value == '') {
        titleRequiredContainer.classList.remove('d-none');
        titleInput.classList.add('title-no-input');
        removeFocus(inputName);
    } else {
        titleRequiredContainer.classList.add('d-none');
        titleInput.classList.remove('title-no-input');
        addFocus(inputName);
    }
}


/* The min-date is set for today and the max-date is set in a year */

function minMaxDate(inputName) {
    let today = new Date();
    document.getElementById(inputName).min = today.toISOString().split('T')[0];

    let oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);
    document.getElementById(inputName).max = oneYearLater.toISOString().split('T')[0];
}


/* After clicking on the due-date-input it gets checked if there is text in the inputfield */

function checkValueDueDate(inputName, containerName) {
    let dueDateInput = getField(inputName);
    let dateRequiredContainer = getField(containerName);
    if (dueDateInput.value === '') {
        dateRequiredContainer.classList.remove('d-none');
        dueDateInput.classList.add('date-no-input');
        removeFocus(inputName);
    } else {
        dateRequiredContainer.classList.add('d-none');
        dueDateInput.classList.remove('date-no-input');
        addFocus(inputName);
    }
}


/* The font color gets changed, when there is a date in the field */

function colorFontInput(inputName) {
    let dateInput = getField(inputName);
    if (dateInput.value !== '') {
        dateInput.classList.add('color-date-input-black');
        dateInput.classList.remove('color-date-input-gray');
    } else {
        dateInput.classList.add('color-date-input-gray');
        dateInput.classList.remove('color-date-input-black');
    }
}


/* Function to set Prio Medium to start */

function setPrioMedium() {
    try {
        setPrio(2, 'prioButton', 'prioColor', 'prioWhite', 'prio');
    } catch {
        setPrio(2, 'prioButtonEdit', 'prioColorEdit', 'prioWhiteEdit', 'prioEdit');
    }
}


/* Function to set the Prio */

function setPrio(num, buttonName, prioColor, prioWhite, prio) {
    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        let isButtonToggled = prioButtons[i]['toggled'];
        if (i + 1 == num || isButtonToggled === true) {
            togglePrio(i, buttonName, prioColor, prioWhite, prio);
        }        
    }
}


/* Function to toggle the desired prio-button */

function togglePrio(i, buttonName, prioColor, prioWhite, prio) {
    prioButtons[i]['toggled'] = !prioButtons[i]['toggled'];
    const selectedButton = getField(`${buttonName}${i+1}`);
    const selectedImgPrioColor = getField(`${prioColor}${i+1}`);
    const selectedImgPrioWhite = getField(`${prioWhite}${i+1}`);
    const selectedPrio = getField(`${prio}${i+1}`);
    const selectedPrioName = selectedPrio.innerHTML.toLowerCase();

    selectedButton.classList.toggle(`${selectedPrioName}`);
    selectedButton.classList.toggle('prioTextWhite');
    selectedImgPrioColor.classList.toggle('d-none');
    selectedImgPrioWhite.classList.toggle('d-none');
}


/* Function to clear the prio-buttons when the clear-button gets clicked */

function clearPrioButtons() {
    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        let isButtonToggled = prioButtons[i]['toggled']
        if (isButtonToggled === true) {
            togglePrio(i, 'prioButton', 'prioColor', 'prioWhite', 'prio');
        }
    }
}


/* The category-drop-down gets toggled*/

function toggleCategoryDropDown() {
    let categoryDropDown = getField('categoryDropDown');
    let arrowCategory = getField('arrowCategory');
    categoryDropDown.classList.toggle('d-none');
    isArrowCategoryRotated = !isArrowCategoryRotated;
    arrowCategory.style.transform = isArrowCategoryRotated ? 'rotate(180deg)' : '';
}


/* The category is written in the input-field */

function selectCategory(num) {
    let input = getField('categoryInput');
    let selectedCategory = getField(`category${num}`).innerHTML;
    input.value = selectedCategory;
    toggleCategoryDropDown();
}


/* An EventListener when you click outside the category-container, the drop-down gets closed*/

document.addEventListener('click', function(event) {
    let categoryContainer = document.getElementById('categoryInputContainer');
    let categoryDropDown = document.getElementById('categoryDropDown');

    if (isArrowCategoryRotated === true && !categoryContainer.contains(event.target) && !categoryDropDown.contains(event.target)) {
        toggleCategoryDropDown();
    }
})


/* Clears all input-fields */

function clearTask() {
    renderAddTask();
}


/* This function creates a Task and saves it into the remote storage */

async function createTask() {
    const inputFields = collectInputFields();
    renderContactIds();
    controlIfDescriptionEmtpy(inputFields.description);
    let task = createTaskInstance(inputFields);
    tasksAssignedTo.push(task);
    await setItem('tasks', tasksAssignedTo);
    clearTask();
    goToBoard();
}


/* Function to collect the input fields */

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


/* Function to create a task-instance for pushing to the tasks-array */

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


/* Function to control empty fields */

function controlIfDescriptionEmtpy(description) {
    if (description == '') {
        description = '';
    }
    return description;
}


/* Function for getting the contactId */

function gettingContactId() {
    return tasksAssignedTo.length + 1;
}


/* Function for getting the prio name */

function getPriority() {
    for (let i = 0; i < prioButtons.length; i++){
        let isButtonToggled = prioButtons[i]['toggled']
        if (isButtonToggled === true) {
                return prioButtons[i]['name'];
        }
    }
}


/* Function to get the progress */

function getProgress() {
    if (currentProgress === '') {
        return 'todo';
    } else {
        return currentProgress;
    }
}


/* Function to get the selected contacts as an array or a empty array*/

function renderContactIds() {
    if (selectedContactsAssignedTo.length > 0) {
        selectedContactsAssignedToIds = selectedContactsAssignedTo.map(contact => parseInt(contact['contactid']));
    } else {
        selectedContactsAssignedToIds = [];
    }
}


/* After the task is created, the board is shown */

function goToBoard() {
    window.location.href = './board.html';
}