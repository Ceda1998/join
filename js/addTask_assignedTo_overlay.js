let isArrowAssignedToEditRotated = false;


/**
 * The assignedTo-dropdown gets toggled in the edit-form
 */
function toggleAssignedToDropDownEdit() {
    let assignedToDropDown = getField('assignedToDropDownEdit');
    let contactsSelectedContainer = getField('contactsSelectedContainerEdit');
    let arrowAssignedTo = getField('arrowAssignedToEdit');
    contactsSelectedContainer.classList.toggle('d-none');
    assignedToDropDown.classList.toggle('d-none');
    isArrowAssignedToEditRotated = !isArrowAssignedToEditRotated;
    arrowAssignedTo.style.transform = isArrowAssignedToEditRotated ? 'rotate(180deg)' : '';
    ifElseArrowEdit();
}


/**
 * If-else-statement according to the direction of the arrow in the edit-form
 */
function ifElseArrowEdit() {
    if (isArrowAssignedToEditRotated == true) {
        renderContactsAssignedToEdit();
    } else {
        renderInitialsSelectedEdit();
    }
}


/**
 * This is the function to show the initials of the contacts in the edit-form
 */
function renderInitialsSelectedEdit() {
    let contactsSelectedContainer = getField('contactsSelectedContainerEdit');
    contactsSelectedContainer.innerHTML = '';
    for (let i = 0; i < selectedContactsAssignedTo.length; i++) {
        let initials = selectedContactsAssignedTo[i]['initials'];
        contactsSelectedContainer.innerHTML += /*html*/`
            <div class="initial-at" id="initials-at${i}"><span>${initials}</span></div>
        `;
        renderBackgroundColorInitialsSelected(i);
    }
}


/**
 * If the arrow of assignedTo is rotated the contacts are shown in the edit-form
 */
function renderContactsAssignedToEdit() {
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapperEdit');
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let fullname = contact['fullname'];
        assignedToDropDownWrapper.innerHTML += assignedToContactsTemplateEdit(contact, i);
        renderBackgroundColorInitialsEdit(i);
        renderContactsCheckedEdit(fullname, i);
    }
}


/**
 * This is the template to show the contacts in the dropdown in the edit-form
 * @param {Object} contact - This is the array of a specific contact
 * @param {Number} i - This is the index of the contact 
 * @returns The html-template gets returned
 */
function assignedToContactsTemplateEdit(contact, i) {
    return /*html*/`
        <div class="drop-down-contacts-container" id="dropDownContactsContainerEdit${i}">
            <div class="initial-name-container">
                <div class="initial-at" id="initialAtEdit${i}"><span>${contact['initials']}</span></div>
                <span class="name-at" id="personEdit${i}">${contact['fullname']}</span>
            </div>
            <img class="check-button-contacts-at" id="buttonEdit${i}" onclick="selectPersonEdit(${i})" src="./assets/img/check-button.png">
            <img class="checked-button-contacts-at d-none" id="checkedButtonEdit${i}" onclick="removePersonEdit(${i})" src="./assets/img/checked-button.png">
        </div>
    `;
}


/**
 * This function selects the person you click on and puts it in the selectedContactsAssignedTo-array in the edit-form
 * @param {Number} num - This is the index of the contact you selected
 */
function selectPersonEdit(num) {
    let selectedPerson = contacts[`${num}`];
    selectedContactsAssignedTo.push(selectedPerson);
    checkButtonContactsCheckedEdit(num);
}


/**
 * This function removes the person you click on and removes the contact from the selectedContactsAssignedTo-array in the edit-form
 * @param {Number} num - This is the index of the contact you selected
 */
function removePersonEdit(num) {
    let selectedPerson = contacts[`${num}`]['fullname'];
    for (let i=0; i < selectedContactsAssignedTo.length; i++) {
        let contact = selectedContactsAssignedTo[i];
        let name = contact['fullname'];
        if (name === selectedPerson) {
            selectedContactsAssignedTo.splice(i, 1);
        }
    }
    checkButtonContactsCheckedEdit(num);
}


/**
 * When you click a contact, the background in the assignedTo-dropdown changes in the edit-form
 * @param {Number} num - This is the index of the contact you clicked 
 */
function checkButtonContactsCheckedEdit(num) {
    let button = getField(`buttonEdit${num}`);
    let checkedButton = getField(`checkedButtonEdit${num}`);
    let dropDownContactsContainer = getField(`dropDownContactsContainerEdit${num}`);
    let person = getField(`personEdit${num}`);
    dropDownContactsContainer.classList.toggle('background-selected-contact');
    person.classList.toggle('white');
    button.classList.toggle('d-none');
    checkedButton.classList.toggle('d-none');
}


/**
 * This sets the background color of the initials according to the intitals in the edit-form
 * @param {Number} i - This is the current index
 */
function renderBackgroundColorInitialsEdit(i) {
    let initialsSelectedContact = contacts[i]['initials'];
    let firstLetter = initialsSelectedContact.charAt(0).toLowerCase();
    let initialsField = getField(`initialAtEdit${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/**
 * This function sets the look of the selected contacts by comparing the names in the edit-form
 * @param {String} fullname - This is the fullname of the contact-array
 * @param {Number} i - This is the index of the current contact 
 */
function renderContactsCheckedEdit(fullname, i) {
    for (let j = 0; j < selectedContactsAssignedTo.length; j++) {
        let contactSelected = selectedContactsAssignedTo[j];
        let name = contactSelected['fullname'];
        if (fullname === name) {
            let button = getField(`buttonEdit${i}`);
            let checkedButton = getField(`checkedButtonEdit${i}`);
            let person = getField(`personEdit${i}`);
            let dropDownContactsContainer = getField(`dropDownContactsContainerEdit${i}`);
            person.classList.add('white');
            button.classList.add('d-none');
            checkedButton.classList.remove('d-none');
            dropDownContactsContainer.classList.add('background-selected-contact');
        }
    }
}


/**
 * This function is when you search for a contact in the edit-form
 */
function filterNamesEdit() {
    let search = getField('assignedToInputEdit').value.toLowerCase();
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapperEdit');
    if (search == '') {
        if (isArrowAssignedToEditRotated == true) {
            toggleAssignedToDropDownEdit();
        }
        }
    else {
        if (isArrowAssignedToEditRotated == false) {
            toggleAssignedToDropDownEdit();
        }
        activeSearchInputEdit(search, assignedToDropDownWrapper);
    }
}


/**
 * This function is, when the assignedTo-search-input is active in the edit-form
 * @param {String} search - This is the search word 
 * @param {HTMLElement} assignedToDropDownWrapper - This is the wrapper to show the contacts
 */
function activeSearchInputEdit(search, assignedToDropDownWrapper) {
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let fullname = contact['fullname'];
        if (fullname.toLowerCase().includes(search)) {
            assignedToDropDownWrapper.innerHTML += assignedToContactsTemplateEdit(contact, i);
            renderContactsChecked(fullname, i)
            renderBackgroundColorInitials(i);
        }
    }
}


/**
 * This EventListener is, when you click somewhere outside the assignedTo-container in the edit-form. Then the dropdown gets closed.
 */
document.addEventListener('click', function(event) {
    let assignedToContainer = document.getElementById('aTInputContainerEdit');
    let assignedToDropDownWrapper = document.getElementById('assignedToDropDownWrapperEdit');
    if (isArrowAssignedToEditRotated === true && !assignedToContainer.contains(event.target) && !assignedToDropDownWrapper.contains(event.target)) {
        toggleAssignedToDropDownEdit();
    }
})