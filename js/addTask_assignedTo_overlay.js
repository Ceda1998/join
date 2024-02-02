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


/* If the arrow is rotated the contacts are loaded and shown*/

function renderContactsAssignedToEdit() {
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapperEdit');
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contactsAssigendTo.length; i++) {
        let contact = contactsAssigendTo[i];
        let fullname = contact['fullname'];
        assignedToDropDownWrapper.innerHTML += assignedToContactsTemplateEdit(contact, i);
        renderBackgroundColorInitials(i);
        renderContactsCheckedEdit(fullname, i);
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


function renderContactsCheckedEdit(fullname, i) {
    getContactIndexEdit();
}


function getContactIndexEdit() {

}