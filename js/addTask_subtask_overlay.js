/* Focus to subtask-container */

function inputSubtaskFocusEdit() {
    addFocusToContainer('subtaskContainerEdit');
}


/* When you write in the subtask-input-field */

function inputSubtaskEdit() {
    let subtask = getField('subtaskInputEdit').value;
    renderInputSubtaskImgEdit(subtask);
}


/* The images in the input field change, when you have text in it*/

function renderInputSubtaskImgEdit(subtask) {
    let insertSubtaskToolContainer = getField('insertSubtaskToolContainerEdit');
    let plusImg = getField('plusImgEdit');
    if (subtask.trim() === '') {
        plusImg.classList.remove('d-none');
        insertSubtaskToolContainer.classList.add('d-none');
    } else {
        plusImg.classList.add('d-none');
        insertSubtaskToolContainer.classList.remove('d-none');
    }
}


/* Remove focus from subtask-container */

function inputSubtaskBlurEdit() {
    removeFocusToContainer('subtaskContainerEdit');
}


/* Delete the subtask-input */

function deleteInputSubtaskEdit() {
    let input = getField('subtaskInputEdit');
    input.value = '';
    renderInputSubtaskImg(input.value);
}


/* Saves the subtask in the input-field, so it can be added, when clicking on the plus-image */

function saveInputSubtaskEdit() {
    let insertSubtaskToolContainer = getField('insertSubtaskToolContainerEdit');
    let plusImg = getField('plusImgEdit');
    plusImg.classList.remove('d-none');
    insertSubtaskToolContainer.classList.add('d-none');
}


/* Adds the subtask in the list under the subtask-input-field, when clicking on the plus-image */

function addSubtaskEdit() {
    let input = getField('subtaskInputEdit');
    let subtask = input.value;
    if (subtasks.length < 2) {
        if (subtask !== '') {
            subtasks.push(subtask);
            renderSubtasksEdit();
            }
    } else {
        alert('Es sind maximal zwei Subtasks erlaubt.')
        inputSubtaskFocusEdit();
    }
    input.value = '';
}


/* This function shows the added subtask under the subtask-input-field */

function renderSubtasksEdit() {
    let subtasksContainer = getField('addedSubtasksContainerEdit');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtasksContainer.innerHTML += returnSubtaskTemplateEdit(i, subtask);
    }
}


/* Subtask Template*/

function returnSubtaskTemplateEdit(i, subtask) {
    return /*html*/`
        <div class="added-subtask-container" id="addedSubtaskContainerEdit${i}" onblur="inputAddedSubtaskBlurEdit(${i})" >
            <span class="point">•</span>
            <input class="added-subtask" id="addedSubtaskEdit${i}" type="text" value='${subtask}' ondblclick="inputAddedSubtaskEdit(${i})" readonly>
            <div class="tool-container" id="toolContainerEdit${i}">
                <div id="toolsNoFocusEdit${i}" class="tools-no-focus">
                    <img src="./assets/img/edit.png" class="edit-img" onclick="inputAddedSubtaskWithClickOnImgEdit(${i})">
                    <div class="tool-separator"></div>
                     <img src="./assets/img/delete-img.png" class="delete-img" onclick="deleteAddedSubtaskEdit(${i})">
                </div>
            </div>
        </div>
    `;
}


/* Doubleclick on subtask, so you can edit the subtask, different tool-images than before */

function inputAddedSubtaskEdit(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainerEdit${i}`);
    let input = getField(`addedSubtaskEdit${i}`);
    input.removeAttribute('readonly');
    addedSubtaskContainer.classList.add('added-subtask-focus');
    renderToolContainerFocusEdit(i);
}


/* Changes the tool-images in the addded subtask, when his focused on */

function renderToolContainerFocusEdit(i) {
    let toolContainer = getField(`toolContainerEdit${i}`);
    toolContainer.innerHTML = '';
    toolContainer.innerHTML = /*html*/`
        <div id="toolsFocusEdit${i}" class="tools-focus">
            <img src="./assets/img/delete-img.png" class="delete-img-focus" onclick="deleteAddedSubtaskEdit(${i})">
            <div class="tool-separator"></div>
            <img src="./assets/img/check-black.png" class="check-img-focus" onclick="saveAddedSubtask(${i})">
        </div>
    `;
}


/* If you click outside the current subtask, the backgroundcolor and images change back */

function inputAddedSubtaskBlurEdit(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainerEdit${i}`);
    let input = getField(`addedSubtaskEdit${i}`);
    input.setAttribute('readonly', 'readonly');
    addedSubtaskContainer.classList.remove('added-subtask-focus');
    if (input.value == '') {
        deleteAddedSubtask(i);
    }
    renderSubtasksEdit();
}

/* It has a pen-image in the added subtask, when you click on that, you can edit the subtask */

function inputAddedSubtaskWithClickOnImgEdit(i) {
    inputAddedSubtaskEdit(i);
    let input = getField(`addedSubtaskEdit${i}`);
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();
}


/* It has a bin-image in the added subtask, when you click on that, you can delete the subtask */

function deleteAddedSubtaskEdit(i) {
    subtasks.splice(i, 1);
    console.log(subtasks);
    renderSubtasksEdit();
    console.log(subtasks);
}


/* When you edit the subtask it has a check-image. If you click on the check image, you save the editted subtask */

function saveAddedSubtaskEdit(i) {
    inputAddedSubtaskBlurEdit(i);
}