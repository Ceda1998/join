let selectedContactsAssignedTo = [];
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
let subtasks = [];
let currentProgress;


/**
 * This function initializes the addTask page and clears all fields
 */
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


/**
 * If the path is the main addTask page, the close button gets removed
 */
async function checkPath() {
    if (window.location.pathname === "/add_task.html") {
        await removeCloseButton();
    } else {
        await addCloseButton();
    }
}


/**
 * This function loads the contacts from the remote storage
 */
async function fetchContactsAt() {
    let resp = await getItem('contacts');
    contacts = JSON.parse(resp);
}


/**
 * This function loads the tasks from the remote storage
 */
async function fetchTasksAt() {
    let resp = await getItem('tasks');
    tasks = JSON.parse(resp);
}


/**
 * This function renders all fields cleared
 */
function renderAddTask() {
    let inputFields = getAllInputFields();
    setInputClear(inputFields);
}


/**
 * This function gets the input fields
 * @returns {{
 * titleInput: HTMLElement,
 * descriptionInput: HTMLElement,
 * assignedToInput: HTMLElement,
 * dueDateInput: HTMLElement,
 * categoryInput: HTMLElement,
 * subtaskInput: HTMLElement
 * }}
 */
function getAllInputFields() {
    let titleInput = getField('titleInput');
    let descriptionInput = getField('descriptionInput');
    let assignedToInput = getField('assignedToInput');
    let dueDateInput = getField('dateInput');
    let categoryInput = getField('categoryInput');
    let subtaskInput = getField('subtaskInput');
    return {titleInput, descriptionInput, assignedToInput, dueDateInput, categoryInput, subtaskInput};
}


/**
 * This function gets a specific html element
 * @param {string} fieldName - This is the id of the specific html element you want to get
 * @returns {HTMLElement} Returns the specific html element
 */
function getField(fieldName) {
    let fieldElement = document.getElementById(`${fieldName}`);
    return fieldElement;
}


/**
 * This function clears all input fields and arrays
 * @param {HTMLElement} inputFields - The specific html element you want to clear
 */
function setInputClear(inputFields) {
    inputFields.titleInput.value = '';
    inputFields.descriptionInput.value = '';
    inputFields.assignedToInput.value = '';
    selectedContactsAssignedTo = [];
    inputFields.dueDateInput.value = '';
    inputFields.categoryInput.value = '';
    inputFields.subtaskInput.value = '';
    subtasks = [];
    currentProgress = '';
    renderInitialsSelected();
    clearPrioButtons();
    setPrioMedium();
    renderSubtasks();
    setArrowRotated();
}


/**
 * This sets the arrow of the assignedTo input and the category input to the start position
 */
function setArrowRotated() {
    if (isArrowAssignedToRotated == true) {
        toggleAssignedToDropDown();
    }
    if (isArrowCategoryRotated == true) {
        toggleCategoryDropDown();
    }  
}


/**
 * The close button gets removed
 */
async function removeCloseButton() {
    getField('closeButtonPopUpAt').classList.add('d-none');
}


/**
 * The close button gets added
 */
async function addCloseButton() {
    getField('closeButtonPopUpAt').classList.remove('d-none');
}


/**
 * This function makes a blue border if a input field gets the focus
 * @param {string} selectedField - The id of the specific html element you want the focus on
 */
function addFocus(selectedField) {
    document.getElementById(selectedField).classList.add('focus');
}


/**
 * This function removes the blue border if the input field doesn't have the focus
 * @param {string} selectedField - The id of the specific html element you don't want the focus
 */
function removeFocus(selectedField) {
    document.getElementById(selectedField).classList.remove('focus');
}


/**
 * This function makes a blue border to a input field container if it gets the focus
 * @param {string} selectedField - The id of the specific container
 */
function addFocusToContainer(selectedField) {
    document.getElementById(selectedField).classList.add('focus-container');
}


/**
 * This function removes the blue border if the input field container doesn't have the focus
 * @param {string} selectedField - The id of the specific contianer
 */
function removeFocusToContainer(selectedField) {
    document.getElementById(selectedField).classList.remove('focus-container');
}


/**
 * After clicking on the title-input it gets checked if there is text in the inputfield
 * @param {string} inputName - The id of the title input field
 * @param {string} requiredContainerName - The id of the title input field container
 */
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


/**
 * The min-date is set for today and the max-date is set in a year
 * @param {string} inputName - The id of the date input field
 */
function minMaxDate(inputName) {
    let today = new Date();
    document.getElementById(inputName).min = today.toISOString().split('T')[0];

    let oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);
    document.getElementById(inputName).max = oneYearLater.toISOString().split('T')[0];
}


/**
 * After clicking on the dueDate input, it gets checked, if there is text in the input field
 * @param {string} inputName - The id of the date input field
 * @param {string} containerName - The id of the date input container
 */
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


/**
 * The font color gets changed, when there is a date in the field
 * @param {string} inputName - The id of the date input field
 */
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


/**
 * Function to set Prio Medium to start
 */
function setPrioMedium() {
    try {
        setPrio(2, 'prioButton', 'prioColor', 'prioWhite', 'prio');
    } catch {
        setPrio(2, 'prioButtonEdit', 'prioColorEdit', 'prioWhiteEdit', 'prioEdit');
    }
}


/**
 * Function to set the Prio
 * @param {number} num - The number of the specific prio
 * @param {string} buttonName - A part of the id to get the button
 * @param {string} prioColor - A part of the id to get the image in color
 * @param {string} prioWhite - A part of the id to get the image in white
 * @param {string} prio - A part of the id to geht the prio name
 */
function setPrio(num, buttonName, prioColor, prioWhite, prio) {
    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        let isButtonToggled = prioButtons[i]['toggled'];
        if (i + 1 == num || isButtonToggled === true) {
            togglePrio(i, buttonName, prioColor, prioWhite, prio);
        }        
    }
}


/**
 * This function toggles the desired prio button
 * @param {number} i - i+1 is the index of the specific prio button
 * @param {string} buttonName - A part of the id to get the button
 * @param {string} prioColor - A part of the id to get the image in color
 * @param {string} prioWhite - A part of the id to get the image in white
 * @param {string} prio - A part of the id to geht the prio name
 */
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


/**
 * Function to clear the prio buttons when the clear button gets clicked
 */
function clearPrioButtons() {
    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        let isButtonToggled = prioButtons[i]['toggled']
        if (isButtonToggled === true) {
            togglePrio(i, 'prioButton', 'prioColor', 'prioWhite', 'prio');
        }
    }
}


/**
 * The category drop-down gets toggled
 */
function toggleCategoryDropDown() {
    let categoryDropDown = getField('categoryDropDown');
    let arrowCategory = getField('arrowCategory');
    categoryDropDown.classList.toggle('d-none');
    isArrowCategoryRotated = !isArrowCategoryRotated;
    arrowCategory.style.transform = isArrowCategoryRotated ? 'rotate(180deg)' : '';
}


/**
 * The selected category is written in the input field
 * @param {number} num - The number of the selected category
 */
function selectCategory(num) {
    let input = getField('categoryInput');
    let selectedCategory = getField(`category${num}`).innerHTML;
    input.value = selectedCategory;
    toggleCategoryDropDown();
}


/**
 * An EventListener, when you click outside the category container, the drop-down gets closed
 */
document.addEventListener('click', function(event) {
    let categoryContainer = document.getElementById('categoryInputContainer');
    let categoryDropDown = document.getElementById('categoryDropDown');

    if (isArrowCategoryRotated === true && !categoryContainer.contains(event.target) && !categoryDropDown.contains(event.target)) {
        toggleCategoryDropDown();
    }
})


/**
 * This function clears all the input fields
 */
function clearTask() {
    renderAddTask();
}


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
 * @param {string} description - The description value
 * @returns {string} - The description value or an empty value
 */
function controlIfDescriptionEmtpy(description) {
    if (description == '') {
        description = '';
    }
    return description;
}


/**
 * This function sets the new taskId
 * @returns {number} - The new taskId
 */
function gettingContactId() {
    return tasks.length + 1;
}


/**
 * This function gets the prio name
 * @returns {string} - The name of the prio 'urgent', 'medium', 'low' or empty
 */
function getPriority() {
    for (let i = 0; i < prioButtons.length; i++){
        let isButtonToggled = prioButtons[i]['toggled']
        if (isButtonToggled === true) {
                return prioButtons[i]['name'];
        }
    }
}


/**
 * This function gets the current progress
 * @returns {string} - The name of the current progress 'todo', 'inprogress' or 'awaitfeedback'
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