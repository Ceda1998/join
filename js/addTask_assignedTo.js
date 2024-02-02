/* Add Focus to Assigned to */

function inputAssignedToFocus(nameContainer) {
    addFocusToContainer(nameContainer);
}


/* Remove Focus to Assigned to */

function inputAssignedToBlur(nameContainer) {
    removeFocusToContainer(nameContainer);
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

function toggleAssignedToDropDown(assignedToDropDownId, contactsSelectedContainerId, arrowAssignedToId, assigendToDropDownWrapperId) {
    let assignedToDropDown = getField(assignedToDropDownId);
    let contactsSelectedContainer = getField(contactsSelectedContainerId);
    let arrowAssignedTo = getField(arrowAssignedToId);
    contactsSelectedContainer.classList.toggle('d-none');
    assignedToDropDown.classList.toggle('d-none');
    isArrowAssignedToRotated = !isArrowAssignedToRotated;
    arrowAssignedTo.style.transform = isArrowAssignedToRotated ? 'rotate(180deg)' : '';
    ifElseArrow(assigendToDropDownWrapperId);
}


/* If-else-statement according to the direction of the arrow */

function ifElseArrow(assigendToDropDownWrapperId) {
    if (isArrowAssignedToRotated == true) {
        renderContactsAssignedTo(assigendToDropDownWrapperId);
    } else {
        renderInitialsSelected();
    }
}


/* If the arrow is rotated the contacts are loaded and shown*/

function renderContactsAssignedTo(assigendToDropDownWrapperId) {
    let assignedToDropDownWrapper = getField(assigendToDropDownWrapperId);
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contactsAssigendTo.length; i++) {
        let contact = contactsAssigendTo[i];
        let fullname = contact['fullname'];
        assignedToDropDownWrapper.innerHTML += assignedToContactsTemplate(contact, i);
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