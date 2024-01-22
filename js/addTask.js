let isButtonToggled = [false, false, false];
let isArrowRotated = false;
let subtasks = [];

/* JSON-ARRAY */

let task = [
    {
        'title': 'Hallo',
        'description': 'Wie geht es?',
        'assignedTo': 'Anna',
        'dueDate': '01/01/2024',
        'prio': 'urgent',
        'category': 'User Story',
        'subtasks': 'Do this'
    }
]


function checkValueTitle() {
    let titleInput = document.getElementById('titleInput');
    let titleRequiredContainer = document.getElementById('titleRequiredContainer');
    if (titleInput.value == '') {
        titleRequiredContainer.classList.remove('d-none');
        titleInput.classList.add('title-no-input');
        titleInput.classList.remove('focus')
    } else {
        titleRequiredContainer.classList.add('d-none');
        titleInput.classList.remove('title-no-input');
        titleInput.classList.add('focus');
    }
}


function inputAssignedToFocus() {
    let aTInputContainer = document.getElementById('aTInputContainer');
    aTInputContainer.classList.add('focus-container');
}


function inputAssignedToBlur() {
    let aTInputContainer = document.getElementById('aTInputContainer');
    aTInputContainer.classList.remove('focus-container');
}


function minMaxDate() {
    let today = new Date();
    document.getElementById('dateInput').min = today.toISOString().split('T')[0];

    let oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);
    document.getElementById('dateInput').max = oneYearLater.toISOString().split('T')[0];
}


function checkValueDueDate() {
    let dateInput = document.getElementById('dateInput');
    let dateRequiredContainer = document.getElementById('dateRequiredContainer');
    if (dateInput.value !== '') {
        dateRequiredContainer.classList.add('d-none');
        dateInput.classList.remove('date-no-input');
        dateInput.classList.add('focus');
    } else {
        dateRequiredContainer.classList.remove('d-none');
        dateInput.classList.add('date-no-input');
        dateInput.classList.remove('focus')
    }
}


function setPrio(num) {
    const TOTAL_BUTTONS = 3;

    for (let i = 0; i < TOTAL_BUTTONS; i++) {
        if (i + 1 == num || isButtonToggled[i] === true) {
            isButtonToggled[i] = !isButtonToggled[i]
            const selectedButton = document.getElementById(`prioButton${i+1}`);
            const selectedImgPrioColor = document.getElementById(`prioColor${i+1}`);
            const selectedImgPrioWhite = document.getElementById(`prioWhite${i+1}`);
            const selectedPrio = document.getElementById(`prio${i+1}`).innerHTML.toLowerCase();
        
            selectedButton.classList.toggle(`${selectedPrio}`);
            selectedButton.classList.toggle('prioTextWhite');
            selectedImgPrioColor.classList.toggle('d-none');
            selectedImgPrioWhite.classList.toggle('d-none');
        }        
    }
}


function toggleCategoryDropDown() {
    let categoryDropDown = document.getElementById('categoryDropDown');
    let arrowCategory = document.getElementById('arrowCategory');
    categoryDropDown.classList.toggle('d-none');
    isArrowRotated = !isArrowRotated;
    arrowCategory.style.transform = isArrowRotated ? 'rotate(180deg)' : '';
}


function selectCategory(num) {
    let input = document.getElementById('categoryInput');
    let selectedCategory = document.getElementById(`category${num}`).innerHTML;
    input.value = selectedCategory;
    toggleCategoryDropDown();
}


function inputSubtaskFocus() {
    let subtaskContainer = document.getElementById('subtaskContainer');
    subtaskContainer.classList.add('focus-container');
}


function inputSubtask() {
    let subtask = document.getElementById('subtaskInput').value;
    renderInputSubtaskImg(subtask);
}


function renderInputSubtaskImg(subtask) {
    let insertSubtaskToolContainer = document.getElementById('insertSubtaskToolContainer');
    let plusImg = document.getElementById('plusImg');
    if (subtask.trim() === '') {
        plusImg.classList.remove('d-none');
        insertSubtaskToolContainer.classList.add('d-none');
    } else {
        plusImg.classList.add('d-none');
        insertSubtaskToolContainer.classList.remove('d-none');
    }
}


function inputSubtaskBlur() {
    let subtaskContainer = document.getElementById('subtaskContainer');
    subtaskContainer.classList.remove('focus-container');
}


function deleteInputSubtask() {
    let input = document.getElementById('subtaskInput');
    input.value = '';
    renderInputSubtaskImg(input.value);
}


/* Saves the subtask in the input-field, so it can be added, when clicking on the plus-image */

function saveInputSubtask() {
    let insertSubtaskToolContainer = document.getElementById('insertSubtaskToolContainer');
    let plusImg = document.getElementById('plusImg');
    plusImg.classList.remove('d-none');
    insertSubtaskToolContainer.classList.add('d-none');
}


/* Adds the subtask in the list under the subtask-input-field, when clicking on the plus-image */

function addSubtask() {
    let input = document.getElementById('subtaskInput');
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
    let subtasksContainer = document.getElementById('addedSubtasksContainer');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtasksContainer.innerHTML += /*html*/`
            <div class="added-subtask-container" id="addedSubtaskContainer${i}">
                <span class="point">•</span>
                <input class="added-subtask" id="addedSubtask${i}" type="text" value='${subtask}' ondblclick="inputAddedSubtask(${i})" onblur="inputAddedSubtaskBlur(${i})" readonly>
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
}


/* Changes the tool-images in the addded subtask, when his focused on */

function renderToolContainerFocus(i) {
    let toolContainer = document.getElementById(`toolContainer${i}`);
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
    let addedSubtaskContainer = document.getElementById(`addedSubtaskContainer${i}`);
    let input = document.getElementById(`addedSubtask${i}`);
    input.removeAttribute('readonly');
    addedSubtaskContainer.classList.add('added-subtask-focus');
    renderToolContainerFocus(i);
}


/* If you click outside the current subtask, the backgroundcolor and images change back */

function inputAddedSubtaskBlur(i) {
    let addedSubtaskContainer = document.getElementById(`addedSubtaskContainer${i}`);
    let input = document.getElementById(`addedSubtask${i}`);
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
    let input = document.getElementById(`addedSubtask${i}`);
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


function toggleAssignedToDropDown() {
    let assignedToDropDown = document.getElementById('assignedToDropDown');
    let arrowAssignedTo = document.getElementById('arrowAssignedTo');
    assignedToDropDown.classList.toggle('d-none');
    isArrowRotated = !isArrowRotated;
    arrowAssignedTo.style.transform = isArrowRotated ? 'rotate(180deg)' : '';
}


function selectPerson(num) {
    let input = document.getElementById('assignedToInput');
    let selectedPerson = document.getElementById(`person${num}`).innerHTML;
    input.value = selectedPerson;
    toggleAssignedToDropDown();
}


function clearTask() {
    let title = document.getElementById('titleInput');
    let description = document.getElementById('descriptionInput');
    let assignedTo = document.getElementById('assignedToInput');
    let dueDate = document.getElementById('dateInput');
    let category = document.getElementById('categoryInput');
    let subtaskInput = document.getElementById('subtaskInput');

    title.value = '';
    description.value = '';
    assignedTo.value = '';
    dueDate.value = '';
    category.value = 'Select task category';
    subtaskInput.value = '';
}


function createTask() {
    
}