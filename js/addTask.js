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


function saveInputSubtask() {
    let insertSubtaskToolContainer = document.getElementById('insertSubtaskToolContainer');
    let plusImg = document.getElementById('plusImg');
    plusImg.classList.remove('d-none');
    insertSubtaskToolContainer.classList.add('d-none');
}


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


function renderSubtasks() {
    let subtasksContainer = document.getElementById('addedSubtasksContainer');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtasksContainer.innerHTML += /*html*/`
            <div class="added-subtask-container" id="addedSubtaskContainer${i}">
                <span class="point">•</span>
                <input class="added-subtask" id="addedSubtask${i}" type="text" value='${subtask}' ondblclick="inputAddedSubtask(${i})" onblur="inputAddedSubtaskBlur(${i})" readonly>
                <div class="tool-container">
                    <div id="toolsNoFocus">
                        <img src="./assets/img/edit.png" class="edit-img" onclick="inputAddedSubtaskWithCursor(${i})">
                        <div class="tool-separator"></div>
                        <img src="./assets/img/delete-img.png" class="delete-img" onclick="deleteAddedSubtask(${i})">
                    </div>
                    <div id="toolsFocus" class="d-none">
                        <img src="./assets/img/delete-img.png" class="delete-img-focus" onclick="deleteAddedSubtask(${i})">
                        <div class="tool-separator"></div>
                        <img src="./assets/img/check-black.png" class="check-img-focus" onclick="saveAddedSubtask(${i})">
                    </div>
                </div>
            </div>
        `;
    }
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


function inputAddedSubtask(i) {
    let addedSubtaskContainer = document.getElementById(`addedSubtaskContainer${i}`);
    let input = document.getElementById(`addedSubtask${i}`);
    input.removeAttribute('readonly');
    addedSubtaskContainer.classList.add('added-subtask-focus');
    let toolsNoFocus = document.getElementById('toolsNoFocus');
    let toolsFocus = document.getElementById('toolsFocus');
    toolsNoFocus.classList.add('d-none');
    toolsFocus.classList.remove('d-none');
}


function inputAddedSubtaskBlur(i) {
    let addedSubtaskContainer = document.getElementById(`addedSubtaskContainer${i}`);
    let input = document.getElementById(`addedSubtask${i}`);
    input.setAttribute('readonly', 'readonly');
    addedSubtaskContainer.classList.remove('added-subtask-focus');
    let toolsNoFocus = document.getElementById('toolsNoFocus');
    let toolsFocus = document.getElementById('toolsFocus');
    toolsNoFocus.classList.remove('d-none');
    toolsFocus.classList.add('d-none');
}


function inputAddedSubtaskWithCursor(i) {
    inputAddedSubtask(i);
    let input = document.getElementById(`addedSubtask${i}`);
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();
}


function deleteAddedSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}


function saveAddedSubtask(i) {
    inputAddedSubtaskBlur(i);
}

function createTask() {
    
}