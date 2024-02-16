let currentSubtaskFocusEdit;

/**
 * This function sets the focus on the subtask container in the edit-form
 */
function inputSubtaskFocusEdit() {
    addFocusToContainer('subtaskContainerEdit');
}


/**
 * This function removes the focus on the subtask container in the edit-form
 */
function inputSubtaskBlurEdit() {
    removeFocusToContainer('subtaskContainerEdit');
}


/**
 * This function gets rendered, when you write in the subtask input field in the edit-form
 */
function inputSubtaskEdit() {
    let subtask = getField('subtaskInputEdit').value;
    renderInputSubtaskImgEdit(subtask);
}


/**
 * The images in the input field change, when you have text in the input field in the edit-form
 * @param {String} subtask - This is the value of the subtask input
 */
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


/**
 * This function deletes the value of the subtask input in the edit-form
 */
function deleteInputSubtaskEdit() {
    let input = getField('subtaskInputEdit');
    input.value = '';
    renderInputSubtaskImg(input.value);
}


/**
 * This function adds the subtask in the list under the subtask-input-field,, when clicking on the plus-image in the edit-form
 */
function addSubtaskEdit() {
    let input = getField('subtaskInputEdit');
    let subtask = input.value;
    if (subtask !== '') {
        const currentSubtask = {
            "name": subtask,
            "isToggled": false
        };
        subtasks.push(currentSubtask);
        renderSubtasksEdit();
    }
    input.value = '';
    renderInputSubtaskImgEdit(input.value);
}


/**
 * This function shows the added subtasks under the subtask-input-field in the edit-form
 */
function renderSubtasksEdit() {
    let subtasksContainer = getField('addedSubtasksContainerEdit');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i]['name'];
        subtasksContainer.innerHTML += returnSubtaskTemplateEdit(i);
    }
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i]['name'];
        getField(`addedSubtaskEdit${i}`).value = subtask;
    }
}


/**
 * This is the subtask-template to show the added subtasks in the edit-form
 * @param {Number} i - This is the index of the added subtask
 * @returns The html-template gets returned
 */
function returnSubtaskTemplateEdit(i) {
    return /*html*/`
        <div class="added-subtask-container" id="addedSubtaskContainerEdit${i}" onfocus="inputAddedSubtaskEdit(${i})">
            <span class="point">•</span>
            <input class="added-subtask" id="addedSubtaskEdit${i}" type="text" ondblclick="inputAddedSubtaskEdit(${i})" readonly>
            <div class="tool-container" id="toolContainerEdit${i}">
                <div id="toolsNoFocusEdit${i}" class="tools-no-focus">
                    <img src="./assets/img/edit.png" class="edit-img" onclick="inputAddedSubtaskEdit(${i})">
                    <div class="tool-separator"></div>
                    <img src="./assets/img/delete-img.png" class="delete-img" onclick="deleteAddedSubtaskEdit(${i})">
                </div>
                <div id="toolsFocusEdit${i}" class="tools-focus d-none">
                    <img src="./assets/img/delete-img.png" class="delete-img-focus" onclick="deleteAddedSubtaskEdit(${i})">
                    <div class="tool-separator"></div>
                    <img src="./assets/img/check-black.png" class="check-img-focus" onclick="saveAddedSubtaskEdit(${i})">
                </div>
            </div>
        </div>
    `;
}


/**
 * When you doubleclick on the subtask this function gets rendered or when you click on edit-image in the edit-form
 * @param {Number} i - This is the index of the added subtask
 */
function inputAddedSubtaskEdit(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainerEdit${i}`);
    addedSubtaskContainer.classList.add('added-subtask-focus');
    let input = getField(`addedSubtaskEdit${i}`);
    input.removeAttribute('readonly');
    getToolsEdit(i, 'toolsFocusEdit', 'toolsNoFocusEdit');
    setFocusEdit(i);
}


/**
 * This function changes the tool-images
 * @param {Number} i - This is the index of the added subtask
 * @param {HTMLElement} toolsFocus - HTML element of the focus tools
 * @param {HTMLElement} toolsNoFocus - HTML element of the no focus tools
 */
function getToolsEdit(i, toolsFocus, toolsNoFocus) {
    let currentToolsNoFocus = getField(`${toolsNoFocus}${i}`);
    let currentToolsFocus = getField(`${toolsFocus}${i}`);
    currentToolsNoFocus.classList.add('d-none');
    currentToolsFocus.classList.remove('d-none');
}


/**
 * This function sets the cursor at the end of the subtask, so you can edit it in the edit-form
 * @param {Number} i - This is the index of the added subtask
 */
function setFocusEdit(i) {
    let input = getField(`addedSubtaskEdit${i}`);
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();
    currentSubtaskFocusEdit = i;
}


/**
 * This EventListener renders the subtasks when you click outside an added subtask in the edit-form
 */
document.addEventListener('click', function(event) {
    for (let i = 0; i < subtasks.length; i++) {
        if (currentSubtaskFocusEdit === i) {
            let subtasksContainer = document.getElementById(`addedSubtaskContainerEdit${i}`);
            if (!subtasksContainer.contains(event.target)) {
                inputAddedSubtaskBlurEdit(i);
                currentSubtaskFocusEdit = null;
            }
        }
    }
});


/**
 * If you click outside the current subtask, the background color and images change back to no focus in the edit-form
 * @param {Number} i - This is the index of the added subtask
 */
function inputAddedSubtaskBlurEdit(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainerEdit${i}`);
    let input = getField(`addedSubtaskEdit${i}`);
    input.setAttribute('readonly', 'readonly');
    addedSubtaskContainer.classList.remove('added-subtask-focus');
    if (input.value == '') {
        deleteAddedSubtaskEdit(i);
    } else {
        saveAddedSubtaskEdit(i);
    }
    if (subtasks.length !== 0) {
        getToolsEdit(i, 'toolsNoFocusEdit', 'toolsFocusEdit');
    }  
}


/**
 * Whe you click on the bin image in the added subtask, you delete the subtask in the edit-form
 * @param {Number} i - This is the index of the added subtask
 */
function deleteAddedSubtaskEdit(i) {
    subtasks.splice(i, 1);
    renderSubtasksEdit();
}


/**
 * If you click on the check image, you save the editted subtask in the edit-form
 * @param {Number} i - This is the index of the added subtask
 */
function saveAddedSubtaskEdit(i) {
    subtasks[i]['name'] = getField(`addedSubtaskEdit${i}`).value;
    renderSubtasksEdit();
}