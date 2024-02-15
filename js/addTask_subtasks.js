/**
 * This function sets the focus on the subtask container
 */
function inputSubtaskFocus() {
    addFocusToContainer('subtaskContainer');
}


/**
 * This function removes the focus on the subtask container
 */
function inputSubtaskBlur() {
    removeFocusToContainer('subtaskContainer');
}


/**
 * This function gets rendered, when you write in the subtask input field
 */
function inputSubtask() {
    let subtask = getField('subtaskInput').value;
    renderInputSubtaskImg(subtask);
}


/**
 * The images in the input field change, when you have text in the input field
 * @param {string} subtask - This is the value of the subtask input
 */
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


/**
 * This function deletes the value of the subtask input
 */
function deleteInputSubtask() {
    let input = getField('subtaskInput');
    input.value = '';
    renderInputSubtaskImg(input.value);
}


/**
 * This function adds the subtask in the list under the subtask-input-field,, when clicking on the plus-image
 */
function addSubtask() {
    let input = getField('subtaskInput');
    let subtask = input.value;
    if (subtask.trim() !== '') {
        const currentSubtask = {
            "name": subtask,
            "isToggled": false
        }
        subtasks.push(currentSubtask);
        renderSubtasks();
    }
    input.value = '';
    renderInputSubtaskImg(input.value);
}


/**
 * This function shows the added subtasks under the subtask-input-field
 */
function renderSubtasks() {
    let subtasksContainer = getField('addedSubtasksContainer');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i]['name'];
        subtasksContainer.innerHTML += returnSubtaskTemplate(i);
    }
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i]['name'];
        getField(`addedSubtask${i}`).value = subtask;
    }
}


/**
 * This is the subtask-template to show the added subtasks
 * @param {number} i - This is the index of the added subtask
 * @returns The html-template gets returned
 */
function returnSubtaskTemplate(i) {
    return /*html*/`
        <div class="added-subtask-container" id="addedSubtaskContainer${i}" onfocus="inputAddedSubtaskFocus(${i})">
            <span class="point">•</span>
            <input class="added-subtask" id="addedSubtask${i}" type="text" onblur="inputAddedSubtaskBlur(${i})" ondblclick="inputAddedSubtaskFocus(${i})" readonly>
            <div class="tool-container" id="toolContainer${i}">
                <div id="toolsNoFocus${i}" class="tools-no-focus">
                    <img src="./assets/img/edit.png" class="edit-img" onclick="inputAddedSubtaskFocus(${i})">
                    <div class="tool-separator"></div>
                     <img src="./assets/img/delete-img.png" class="delete-img" onclick="deleteAddedSubtask(${i})">
                </div>
                <div id="toolsFocus${i}" class="tools-focus d-none">
                    <img src="./assets/img/delete-img.png" class="delete-img-focus" onclick="deleteAddedSubtask(${i})">
                    <div class="tool-separator"></div>
                    <img src="./assets/img/check-black.png" class="check-img-focus" onclick="saveAddedSubtask(${i})">
                </div>
            </div>
        </div>
    `;
}


/**
 * When you doubleclick on the subtask this function gets rendered or when you click on edit-image
 * @param {number} i - This is the index of the added subtask
 */
function inputAddedSubtaskFocus(i) {
    let addedSubtaskContainer = getField(`addedSubtaskContainer${i}`);
    addedSubtaskContainer.classList.add('added-subtask-focus');
    let input = getField(`addedSubtask${i}`);
    input.removeAttribute('readonly');
    getToolsFocus(i);
    setFocus(i);
}


/**
 * This function changes the tool-images
 * @param {number} i - This is the index of the added subtask
 */
function getToolsFocus(i) {
    let toolsNoFocus = getField(`toolsNoFocus${i}`);
    let toolsFocus = getField(`toolsFocus${i}`);
    toolsNoFocus.classList.add('d-none');
    toolsFocus.classList.remove('d-none');
}


/**
 * This function sets the cursor at the end of the subtask, so you can edit it
 * @param {number} i - This is the index of the added subtask
 */
function setFocus(i) {
    let input = getField(`addedSubtask${i}`);
    input.setSelectionRange(input.value.length, input.value.length);
    input.focus();
}



/**
 * If you click outside the current subtask, the background color and images change back to no focus
 * @param {number} i - This is the index of the added subtask
 */
function inputAddedSubtaskBlur(i) {
        let addedSubtaskContainer = getField(`addedSubtaskContainer${i}`);
        let input = getField(`addedSubtask${i}`);
        input.setAttribute('readonly', 'readonly');
        addedSubtaskContainer.classList.remove('added-subtask-focus');
        if (input.value == '') {
            deleteAddedSubtask(i);
        }
}


/**
 * Whe you click on the bin image in the added subtask, you delete the subtask
 * @param {number} i - This is the index of the added subtask
 */
function deleteAddedSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}


/**
 * If you click on the check image, you save the editted subtask
 * @param {number} i - This is the index of the added subtask
 */
function saveAddedSubtask(i) {
    console.log(i);
    subtasks[i]['name'] = getField(`addedSubtask${i}`).value;
    renderSubtasks();
}