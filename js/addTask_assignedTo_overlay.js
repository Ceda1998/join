let isArrowAssignedToEditRotated = false;


/* The assigned-to-drop-down gets toggled */

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


/* If-else-statement according to the direction of the arrow */

function ifElseArrowEdit() {
    if (isArrowAssignedToEditRotated == true) {
        renderContactsAssignedToEdit();
    } else {
        renderInitialsSelectedEdit();
    }
}


/* If the direction of the arrow is down, all the slected contacts are shown by the initials */

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


/* If the arrow is rotated the contacts are loaded and shown*/

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


/* Template to the renderContactsAssignedTo-function */

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


/* Selects the person you click on and puts it in the selectedContactsAssignedTo-Array */

function selectPersonEdit(num) {
    let selectedPerson = contacts[`${num}`];
    selectedContactsAssignedTo.push(selectedPerson);
    checkButtonContactsCheckedEdit(num);
}


/* Removes the person you click on and removes it from the selectedContactsAssignedTo-Array*/

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


/* What happens when a contact gets selected */

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


/* Sets the Background Color of the initial-name-container according to the initials */

function renderBackgroundColorInitialsEdit(i) {
    let initialsSelectedContact = contacts[i]['initials'];
    let firstLetter = initialsSelectedContact.charAt(0).toLowerCase();
    let initialsField = getField(`initialAtEdit${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/* The selected contacts get the look of the checked button */

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


/* You can search for a name */

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


/* Active search assigned-to-seach-input */

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


/* An EventListener when you click outside the assigned-to-container, the drop-down gets closed */

document.addEventListener('click', function(event) {
    let assignedToContainer = document.getElementById('aTInputContainerEdit');
    let assignedToDropDownWrapper = document.getElementById('assignedToDropDownWrapperEdit');
    if (isArrowAssignedToEditRotated === true && !assignedToContainer.contains(event.target) && !assignedToDropDownWrapper.contains(event.target)) {
        toggleAssignedToDropDownEdit();
    }
})