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
    console.log(selectedContactsAssignedTo);
}


/* If-else-statement according to the direction of the arrow */

function ifElseArrowEdit() {
    if (isArrowAssignedToEditRotated == true) {
        renderContactsAssignedToEdit();
    } else {
        renderInitialsSelected();
    }
}


/* If the arrow is rotated the contacts are loaded and shown*/

function renderContactsAssignedToEdit() {
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapperEdit');
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contactsAssigendTo.length; i++) {
        let contact = contactsAssigendTo[i];
        let fullname = contact['fullname'];
        assignedToDropDownWrapper.innerHTML += assignedToContactsTemplateEdit(contact, i);
        renderBackgroundColorInitials(i);
        renderContactsChecked(fullname, i);
    }
}


/* Template to the renderContactsAssignedTo-function */

function assignedToContactsTemplateEdit(contact, i) {
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
        activeSearchInput(search, assignedToDropDownWrapper);
    }
}


/* Active search assigned-to-seach-input */

function activeSearchInputEdit(search, assignedToDropDownWrapper) {
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contactsAssigendTo.length; i++) {
        let contact = contactsAssigendTo[i];
        let fullname = contact['fullname'];
        if (fullname.toLowerCase().includes(search)) {
            assignedToDropDownWrapper.innerHTML += assignedToContactsTemplateEdit(contact, i);
            renderContactsChecked(fullname, i)
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