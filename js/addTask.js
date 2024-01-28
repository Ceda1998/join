let contactsAssigendTo = []; /* contacts fetched from the remote storage */
let selectedContactsAssignedTo = []; /* gets added to the tasks.json */
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


/* When the side is loaded all Fields get initalized and cleared*/

async function initAddTask() {
    await includeHTML();
    let renderContainer = getField('addTaskContent_container');
    renderContainer.innerHTML += renderAddTaskHtml();
    await fetchContactsAt();
    await fetchTasksAt();
    await renderAddTask();
    console.log(contactsAssigendTo);
}


/* Load Contacts from JSON later Remote Storage */

async function fetchContactsAt() {
    let resp = await fetch('./assets/json/contacts.json');
    contactsAssigendTo = await resp.json();
}


/* Load tasks from JSON later Remote Storage */

async function fetchTasksAt() {
    let resp = await fetch('./assets/json/tasks.json');
    tasksAssignedTo = await resp.json();
}


/* Render all the Fields from Add Task */

async function renderAddTask() {
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
    renderInitialsSelected();
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


/* Selects the person you click on and puts it in the selectedContactsAssignedTo-Array */

function selectPerson(num) {
    let selectedPerson = contactsAssigendTo[`${num}`];
    selectedContactsAssignedTo.push(selectedPerson);
    checkButtonContactsChecked(num);
}


/* Removes the person you click on and removes it from the selectedContactsAssignedTo-Array*/

function removePerson(num) {
    let selectedPerson = contactsAssigendTo[`${num}`]['fullname'];
    for (let i=0; i < selectedContactsAssignedTo.length; i++) {
        let contact = selectedContactsAssignedTo[i];
        let name = contact['fullname'];
        if (name === selectedPerson) {
            selectedContactsAssignedTo.splice(contact, 1);
        }
    }
    checkButtonContactsChecked(num);
}

/* What happens when a contact gets selected */

function checkButtonContactsChecked(num) {
    let button = getField(`button${num}`);
    let checkedButton = getField(`checkedButton${num}`);
    let dropDownContactsContainer = getField(`dropDownContactsContainer${num}`);
    let person = getField(`person${num}`);
    dropDownContactsContainer.classList.toggle('background-selected-contact');
    person.classList.toggle('white');
    button.classList.toggle('d-none');
    checkedButton.classList.toggle('d-none');
}


/* The assigned-to-drop-down gets toggled */

function toggleAssignedToDropDown() {
    let assignedToDropDown = getField('assignedToDropDown');
    let contactsSelectedContainer = getField('contactsSelectedContainer');
    let arrowAssignedTo = getField('arrowAssignedTo');
    contactsSelectedContainer.classList.toggle('d-none');
    assignedToDropDown.classList.toggle('d-none');
    isArrowAssignedToRotated = !isArrowAssignedToRotated;
    arrowAssignedTo.style.transform = isArrowAssignedToRotated ? 'rotate(180deg)' : '';
    ifElseArrow();
}


/* If-else-statement according to the direction of the arrow */

function ifElseArrow() {
    if (isArrowAssignedToRotated == true) {
        renderContactsAssignedTo();
    } else {
        renderInitialsSelected();
    }
}


/* If the arrow is rotated the contacts are loaded and shown*/

function renderContactsAssignedTo() {
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapper');
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contactsAssigendTo.length; i++) {
        let contact = contactsAssigendTo[i];
        let fullname = contact['fullname'];
        assignedToDropDownWrapper.innerHTML += assignedToContactsTemplate(contact, i);
        /* renderBackgroundColorInitials(); */
        renderContactsChecked(fullname, i);
        renderBackgroundColorInitials(i);
    }
}


/* If the direction of the arrow is down, all the slected contacts are shown by the initials */

function renderInitialsSelected() {
    let contactsSelectedContainer = getField('contactsSelectedContainer');
    contactsSelectedContainer.innerHTML = '';
    for (let i = 0; i < selectedContactsAssignedTo.length; i++) {
        let initials = selectedContactsAssignedTo[i]['initials'];
        contactsSelectedContainer.innerHTML += /*html*/`
            <div class="initial-at" id="initials-at${i}"><span>${initials}</span></div>
        `;
        renderBackgroundColorInitialsSelected(i);
    }
}


/* Template to the renderContactsAssignedTo-function */

function assignedToContactsTemplate(contact, i) {
    return /*html*/`
        <div class="drop-down-contacts-container" id="dropDownContactsContainer${i}">
            <div class="initial-name-container">
                <div class="initial-at" id="initialAt${i}"><span>${contact['initials']}</span></div>
                <span class="name-at" id="person${i}">${contact['fullname']}</span>
            </div>
            <img class="check-button-contacts-at" id="button${i}" onclick="selectPerson(${i})" src="./assets/img/check-button.png">
            <img class="checked-button-contacts-at d-none" id="checkedButton${i}" onclick="removePerson(${i})" src="./assets/img/checked-button.png">
        </div>
    `;
}

/* The selected contacts get the look of the checked button */

function renderContactsChecked(fullname, i) {
    for (let j = 0; j < selectedContactsAssignedTo.length; j++) {
        let contactSelected = selectedContactsAssignedTo[j];
        let name = contactSelected['fullname'];
        if (fullname === name) {
            let button = getField(`button${i}`);
            let checkedButton = getField(`checkedButton${i}`);
            let person = getField(`person${i}`);
            let dropDownContactsContainer = getField(`dropDownContactsContainer${i}`);
            person.classList.add('white');
            button.classList.add('d-none');
            checkedButton.classList.remove('d-none');
            dropDownContactsContainer.classList.add('background-selected-contact');
        }
    }
}


/* Sets the Background Color of the initial-name-container according to the initials */

function renderBackgroundColorInitialsSelected(i) {
    let initialsSelectedContact = selectedContactsAssignedTo[i]['initials'];
    let firstLetter = initialsSelectedContact.charAt(0).toLowerCase();
    let initialsField = getField(`initials-at${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/* Sets the Background Color of the initial-name-container according to the initials */

function renderBackgroundColorInitials(i) {
    let initialsSelectedContact = contactsAssigendTo[i]['initials'];
    let firstLetter = initialsSelectedContact.charAt(0).toLowerCase();
    let initialsField = getField(`initialAt${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/* You can search for a name */

function filterNames() {
    let search = getField('assignedToInput').value.toLowerCase();
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapper');
    if (search == '') {
        if (isArrowAssignedToRotated == true) {
            toggleAssignedToDropDown();
        }
        }
    else {
        if (isArrowAssignedToRotated == false) {
            toggleAssignedToDropDown();
        }
        activeSearchInput(search, assignedToDropDownWrapper);
    }
}


/* Active search assigned-to-seach-input */

function activeSearchInput(search, assignedToDropDownWrapper) {
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contactsAssigendTo.length; i++) {
        let contact = contactsAssigendTo[i];
        let fullname = contact['fullname'];
        if (fullname.toLowerCase().includes(search)) {
            assignedToDropDownWrapper.innerHTML += assignedToContactsTemplate(contact, i);
            renderContactsChecked(fullname, i)
        }
    }
}


/* An EventListener when you click outside the assigned-to-container, the drop-down gets closed */

document.addEventListener('click', function(event) {
    let assignedToContainer = document.getElementById('aTInputContainer');
    let assignedToDropDownWrapper = document.getElementById('assignedToDropDownWrapper');
    if (isArrowAssignedToRotated === true && !assignedToContainer.contains(event.target) && !assignedToDropDownWrapper.contains(event.target)) {
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
    if (dueDateInput.value === '') {
        dateRequiredContainer.classList.remove('d-none');
        dueDateInput.classList.add('date-no-input');
        removeFocus('dateInput');
    } else {
        dateRequiredContainer.classList.add('d-none');
        dueDateInput.classList.remove('date-no-input');
        addFocus('dateInput');
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
        let isButtonToggled = prioButtons[i]['toggled'];
        if (i + 1 == num || isButtonToggled === true) {
            togglePrio(i);
        }        
    }
}


/* Function to toggle the desired prio-button */

function togglePrio(i) {
    prioButtons[i]['toggled'] = !prioButtons[i]['toggled'];
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
        let isButtonToggled = prioButtons[i]['toggled']
        if (isButtonToggled === true) {
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
    if (subtasks.length < 2) {
        if (subtask !== '') {
            subtasks.push(subtask);
            renderSubtasks();
            }
    } else {
        alert('Es sind maximal zwei Subtasks erlaubt.')
        inputSubtaskFocus();
    }
    input.value = '';
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
    let taskId = gettingContactId();
    let priority = getPriority();
    console.log(taskId);

    let task = {
        "taskid": taskId,
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "subtasks": subtasks,
        "contactids": selectedContactsAssignedTo['contactid'],
        "priority": priority,
        "progress": "To do",
        "date": dueDate
    }

    tasksAssignedTo.push(task);
    console.log(tasksAssignedTo);
    clearTask();
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