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