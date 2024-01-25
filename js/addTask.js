let contacts = []; /* contacts which are later from the remote Storage */
let selectedContacts = []; /* gets added to the tasks.json */
let isArrowAssignedToRotated = false;
let isButtonToggled = [false, false, false];
const TOTAL_BUTTONS = 3;
let isArrowCategoryRotated = false;
let subtasks = []; /* gets added to the tasks.json */
let tasks = []; /* tasks which are later added to the remote Storage */


/* When the side is loaded all Fields get initalized and cleared*/

async function initAddTask() {
    await includeHTML();
    let renderContainer = getField('addTaskContent_container');
    renderContainer.innerHTML += renderAddTaskHtml();
    await fetchContacts();
    renderAddTask();
    console.log(contacts);
}


/* Load Contacts from JSON later Remote Storage */

async function fetchContacts() {
    let resp = await fetch('./assets/json/contacts.json');
    contacts = await resp.json();
}

/* Render all the Fields from Add Task */

async function renderAddTask() {
    let inputFields = getAllInputFields();
    setInputClear(inputFields);
}


/* Render HTML Add Task*/

function renderAddTaskHtml() {
    return /*html*/`
    <h1>Add Task</h1>
<div class="add-task-container">

    <div class="container-left">
        <div class="title">
            <label>Title<span class="star">*</span><br>
                <input id="titleInput" class="inputField focus" type="text" placeholder="Enter a title" onkeyup="checkValueTitle()">
            </label>
            <div id="titleRequiredContainer" class="title-required d-none">This field is required</div>
        </div>
        <br>

        <div class="description">
            <label>Description<br>
                <div class="desc-input-container">
                    <textarea id="descriptionInput" class="focus" placeholder="Enter a Description"></textarea>
                </div>
            </label>
        </div>
        <br>

        <div class="assigned-to">
            <label>Assigned to<br>
                <div class="a-t-input-container" id="aTInputContainer">
                    <input class="inputField" placeholder="Select contacts to assign" id="assignedToInput" onfocus="inputAssignedToFocus()" onblur="inputAssignedToBlur()">
                    <img src="./assets/img/arrow-drop-down.png" class="arrow-drop-down" id="arrowAssignedTo" onclick="toggleAssignedToDropDown()">
                </div>
            </label>
            <div id="assignedToDropDown" class="assigned-to-drop-down d-none"></div>
        </div>

    </div>

    <div class="seperator"></div>

    <div class="container-right">
        <div class="due-date">
            <label>Due date<span class="star">*</span><br>
                <div class="d-d-input-container" id="dateInputContainer">
                    <input id="dateInput" type="date" class="inputField focus color-date-input-gray" required onclick="minMaxDate()" onblur="checkValueDueDate()" onchange="colorFontInput()"> 
                    <img src="./assets/img/event.png" class="event d-none">
                </div>
            </label>
            <div id="dateRequiredContainer" class="date-required d-none">This field is required</div>
        </div>
        <br>

        <div class="prio">
            <label>Prio<br>
                <div class="button-prio-container">
                    <div class="button-prio" id="prioButton1" onclick="setPrio(1)"><span class="prio-name" id="prio1">Urgent</span><img src="./assets/img/img-urgent.png" id="prioColor1"><img class="d-none" src="./assets/img/img-urgent-white.png" id="prioWhite1"></div>
                    <div class="button-prio" id="prioButton2" onclick="setPrio(2)"><span class="prio-name" id="prio2">Medium</span><img src="./assets/img/img-medium.png" id="prioColor2"><img class="d-none" src="./assets/img/img-medium-white.png" id="prioWhite2"></div>
                    <div class="button-prio" id="prioButton3" onclick="setPrio(3)"><span class="prio-name" id="prio3">Low</span><img src="./assets/img/img-low.png" id="prioColor3"><img class="d-none" src="./assets/img/img-low-white.png" id="prioWhite3"></div>
                </div>
            </label>
        </div>
        <br>

        <div class="category">
            <label>Category<span class="star">*</span><br>
                <div class="category-container" id="categoryInputContainer">
                <input list="category" value="Select task category" class="inputField" id="categoryInput" readonly>
                <img src="./assets/img/arrow-drop-down.png" class="arrow-drop-down" id="arrowCategory" onclick="toggleCategoryDropDown()">
                </div>
            </label>
            <div id="categoryDropDown" class="category-drop-down d-none">
                <span id="category1" onclick="selectCategory(1)">Technical Task</span>
                <span id="category2" onclick="selectCategory(2)">User Story</span>
            </div>
        </div>
        <br>

        <div class="subtasks">
            <label>Subtasks<br>
                <div class="subtasks-container" id="subtaskContainer">
                <input type="text" placeholder="Add new Subtask" class="inputField focus" id="subtaskInput" onfocus="inputSubtaskFocus()" oninput="inputSubtask()" onblur="inputSubtaskBlur()">
                <img src="./assets/img/plus-black.png" class="plus-img" id="plusImg" onclick="addSubtask()">
                <div class="insert-subtask-tool-container d-none" id="insertSubtaskToolContainer">
                    <img src="./assets/img/close-img.png" class="close-img" onclick="deleteInputSubtask()">
                    <div class="tool-separator"></div>
                    <img src="./assets/img/check-black.png" class="check-black-img" onclick="saveInputSubtask()">
                </div>
                </div>
            </label>
            <div id="addedSubtasksContainer" class="added-subtasks-container">
            </div>
        </div>

    </div>

</div>

<div class="bottom-container">
    <span class="text-required"><span class="star-text-required">*</span>This field is required</span>
    <div class="buttons-container">
        <button class="button-clear button-center" onclick="clearTask()">Clear<img src="./assets/img/close-img.png"></button>
        <button class="button-create button-center">Create Task<img src="./assets/img/check.png"></button>
    </div>
</div>
    `;
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
    selectedContacts = [];
    inputFields.dueDateInput.value = '';
    inputFields.categoryInput.value = 'Select task category';
    inputFields.subtaskInput.value = '';
    subtasks = [];
    clearPrioButtons();
    renderSubtasks();
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

function checkValueTitle() {
    let titleInput = getField('titleInput')
    let titleRequiredContainer = getField('titleRequiredContainer');
    if (titleInput.value == '') {
        titleRequiredContainer.classList.remove('d-none');
        titleInput.classList.add('title-no-input');
        removeFocus('titleInput');
    } else {
        titleRequiredContainer.classList.add('d-none');
        titleInput.classList.remove('title-no-input');
        addFocus('titleInput');
    }
}


/* Add Focus to Assigned to */

function inputAssignedToFocus() {
    addFocusToContainer('aTInputContainer');
}


/* Remove Focus to Assigned to */

function inputAssignedToBlur() {
    removeFocusToContainer('aTInputContainer');
}


/* Selects the person you click on and puts it in the input-field */

function selectPerson(num) {
    let selectedPerson = document.getElementById(`person${num}`).innerHTML;
    assignedToInput.value = selectedPerson;
    toggleAssignedToDropDown();
}


/* The assigned-to-drop-down gets toggled */

function toggleAssignedToDropDown() {
    let assignedToDropDown = getField('assignedToDropDown');
    let arrowAssignedTo = getField('arrowAssignedTo');
    assignedToDropDown.classList.toggle('d-none');
    isArrowAssignedToRotated = !isArrowAssignedToRotated;
    arrowAssignedTo.style.transform = isArrowAssignedToRotated ? 'rotate(180deg)' : '';
    if (isArrowAssignedToRotated == true) {
        renderContactsAssignedTo(assignedToDropDown);
    }
}


/* If the Arrwo is rotated the contacts are loaded and shown*/

function renderContactsAssignedTo(assignedToDropDown) {
    assignedToDropDown.innerHTML = '';
    assignedToDropDown.innerHTML += /*html*/`
        <span id="person1" onclick="selectPerson(1)">Anna</span>
        <span id="person2" onclick="selectPerson(2)">Peter</span>
        <span id="person3" onclick="selectPerson(3)">Hans</span>
    `;
}


/* An EventListener when you click outside the assigned-to-container, the drop-down gets closed */

document.addEventListener('click', function(event) {
    let assignedToContainer = document.getElementById('aTInputContainer');
    let assignedToDropDown = document.getElementById('assignedToDropDown');

    if (isArrowAssignedToRotated === true && !assignedToContainer.contains(event.target) && !assignedToDropDown.contains(event.target)) {
        toggleAssignedToDropDown();
    }
})


/* The min-date is set for today and the max-date is set in a year */

function minMaxDate() {
    let today = new Date();
    document.getElementById('dateInput').min = today.toISOString().split('T')[0];

    let oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);
    document.getElementById('dateInput').max = oneYearLater.toISOString().split('T')[0];
}


/* After clicking on the due-date-input it gets checked if there is text in the inputfield */

function checkValueDueDate() {
    let dueDateInput = getField('dateInput');
    let dateRequiredContainer = getField('dateRequiredContainer');
    if (dueDateInput.value !== '') {
        dateRequiredContainer.classList.add('d-none');
        dueDateInput.classList.remove('date-no-input');
        addFocus(dueDateInput);
    } else {
        dateRequiredContainer.classList.remove('d-none');
        dueDateInput.classList.add('date-no-input');
        removeFocus(dueDateInput);
    }
}


/* The font color gets changed, when there is a date in the field */

function colorFontInput() {
    let dateInput = getField('dateInput');
    if (dateInput.value !== '') {
        dateInput.classList.add('color-date-input-black');
        dateInput.classList.remove('color-date-input-gray');
    } else {
        dateInput.classList.add('color-date-input-gray');
        dateInput.classList.remove('color-date-input-black');
    }
}


/* Function to set the Prio */

function setPrio(num) {
    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        if (i + 1 == num || isButtonToggled[i] === true) {
            togglePrio(i);
        }        
    }
}


/* Function to toggle the desired prio-button */

function togglePrio(i) {
    isButtonToggled[i] = !isButtonToggled[i];
    const selectedButton = getField(`prioButton${i+1}`);
    const selectedImgPrioColor = getField(`prioColor${i+1}`);
    const selectedImgPrioWhite = getField(`prioWhite${i+1}`);
    const selectedPrio = getField(`prio${i+1}`);
    const selectedPrioName = selectedPrio.innerHTML.toLowerCase();

    selectedButton.classList.toggle(`${selectedPrioName}`);
    selectedButton.classList.toggle('prioTextWhite');
    selectedImgPrioColor.classList.toggle('d-none');
    selectedImgPrioWhite.classList.toggle('d-none');
}


/* Function to clear the prio-buttons when the clear-button gets clicked */

function clearPrioButtons() {
    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        if (isButtonToggled[i] === true) {
            togglePrio(i);
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


/* Focus to subtask-container */

function inputSubtaskFocus() {
    addFocusToContainer('subtaskContainer');
}


/* When you write in the subtask-input-field */

function inputSubtask() {
    let subtask = getField('subtaskInput').value;
    renderInputSubtaskImg(subtask);
}


/* The images in the input field change, when you have text in it*/

function renderInputSubtaskImg(subtask) {
    let insertSubtaskToolContainer = getField('insertSubtaskToolContainer');
    let plusImg = getField('plusImg');
    if (subtask.trim() === '') {
        plusImg.classList.remove('d-none');
        insertSubtaskToolContainer.classList.add('d-none');
    } else {
        plusImg.classList.add('d-none');
        insertSubtaskToolContainer.classList.remove('d-none');
    }
}


/* Remove focus from subtask-container */

function inputSubtaskBlur() {
    removeFocusToContainer('subtaskContainer');
}


/* Delete the subtask-input */

function deleteInputSubtask() {
    let input = getField('subtaskInput');
    input.value = '';
    renderInputSubtaskImg(input.value);
}


/* Saves the subtask in the input-field, so it can be added, when clicking on the plus-image */

function saveInputSubtask() {
    let insertSubtaskToolContainer = getField('insertSubtaskToolContainer');
    let plusImg = getField('plusImg');
    plusImg.classList.remove('d-none');
    insertSubtaskToolContainer.classList.add('d-none');
}


/* Adds the subtask in the list under the subtask-input-field, when clicking on the plus-image */

function addSubtask() {
    let input = getField('subtaskInput');
    let subtask = input.value;
    if (subtask !== '') {
    subtasks.push(subtask);
    renderSubtasks();
    input.value = '';
    } else {
        inputSubtaskFocus();
    }
}


/* This function shows the added subtask under the subtask-input-field */

function renderSubtasks() {
    let subtasksContainer = getField('addedSubtasksContainer');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtasksContainer.innerHTML += returnSubtaskTemplate(i, subtask);
    }
}


/* Subtask Template*/

function returnSubtaskTemplate(i, subtask) {
    return /*html*/`
        <div class="added-subtask-container" id="addedSubtaskContainer${i}" onblur="inputAddedSubtaskBlur(${i})" >
            <span class="point">•</span>
            <input class="added-subtask" id="addedSubtask${i}" type="text" value='${subtask}' ondblclick="inputAddedSubtask(${i})" readonly>
            <div class="tool-container" id="toolContainer${i}">
                <div id="toolsNoFocus${i}" class="tools-no-focus">
                    <img src="./assets/img/edit.png" class="edit-img" onclick="inputAddedSubtaskWithClickOnImg(${i})">
                    <div class="tool-separator"></div>
                     <img src="./assets/img/delete-img.png" class="delete-img" onclick="deleteAddedSubtask(${i})">
                </div>
            </div>
        </div>
    `;
}


/* Changes the tool-images in the addded subtask, when his focused on */

function renderToolContainerFocus(i) {
    let toolContainer = getField(`toolContainer${i}`);
    toolContainer.innerHTML = '';
    toolContainer.innerHTML = /*html*/`
        <div id="toolsFocus${i}" class="tools-focus">
            <img src="./assets/img/delete-img.png" class="delete-img-focus" onclick="deleteAddedSubtask(${i})">
            <div class="tool-separator"></div>
            <img src="./assets/img/check-black.png" class="check-img-focus" onclick="saveAddedSubtask(${i})">
        </div>
    `;
}


/* Doubleclick on subtask, so you can edit the subtask, different tool-images than before */

function inputAddedSubtask(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainer${i}`);
    let input = getField(`addedSubtask${i}`);
    input.removeAttribute('readonly');
    addedSubtaskContainer.classList.add('added-subtask-focus');
    renderToolContainerFocus(i);
}


/* If you click outside the current subtask, the backgroundcolor and images change back */

function inputAddedSubtaskBlur(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainer${i}`);
    let input = getField(`addedSubtask${i}`);
    input.setAttribute('readonly', 'readonly');
    addedSubtaskContainer.classList.remove('added-subtask-focus');
    if (input.value == '') {
        deleteAddedSubtask(i);
    }
    renderSubtasks();
}


/* It has a pen-image in the added subtask, when you click on that, you can edit the subtask */

function inputAddedSubtaskWithClickOnImg(i) {
    inputAddedSubtask(i);
    let input = getField(`addedSubtask${i}`);
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();
}


/* It has a bin-image in the added subtask, when you click on that, you can delete the subtask */

function deleteAddedSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}


/* When you edit the subtask it has a check-image. If you click on the check image, you save the editted subtask */

function saveAddedSubtask(i) {
    inputAddedSubtaskBlur(i);
}


/* Clears all input-fields */

function clearTask() {
    renderAddTask();
}


/* This function creates a Task and saves it into the remote storage */

function createTask() {

    let title = getField('titleInput');
    let description = document.getElementById('descriptionInput');
    let dueDate = document.getElementById('dateInput');
    let category = document.getElementById('categoryInput');

    let task = {
        "taskid": "5",
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "subtasks": subtasks,
        "contactids": selectedContacts,
        "priority": "neutral",
        "progress": "done",
        "date": dueDate
    }
    
}