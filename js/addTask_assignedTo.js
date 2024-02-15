/**
 * This function adds the focus to the assignedTo container
 * @param {String} nameContainer - This is the id of the specific container
 */
function inputAssignedToFocus(nameContainer) {
    addFocusToContainer(nameContainer);
}


/**
 * This function removes the focus to the assignedTo container
 * @param {String} nameContainer - This is the id of the specific container
 */
function inputAssignedToBlur(nameContainer) {
    removeFocusToContainer(nameContainer);
}


/**
 * This function selects the person you click on and puts it in the selectedContactsAssignedTo-array
 * @param {Number} num - This is the index of the contact you selected
 */
function selectPerson(num) {
    let selectedPerson = contacts[`${num}`];
    selectedContactsAssignedTo.push(selectedPerson);
    checkButtonContactsChecked(num);
}


/**
 * This function removes the person you click on and removes the contact from the selectedContactsAssignedTo-array
 * @param {Number} num - This is the index of the contact you selected
 */
function removePerson(num) {
    let selectedPerson = contacts[`${num}`]['fullname'];
    for (let i=0; i < selectedContactsAssignedTo.length; i++) {
        let contact = selectedContactsAssignedTo[i];
        let name = contact['fullname'];
        if (name === selectedPerson) {
            selectedContactsAssignedTo.splice(i, 1);
        }
    }
    checkButtonContactsChecked(num);
}


/**
 * When you click a contact, the background in the assignedTo-dropdown changes
 * @param {Number} num - This is the index of the contact you clicked 
 */
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


/**
 * The assignedTo-dropdown gets toggled
 */
function toggleAssignedToDropDown() {
    let assignedToDropDown = getField('assignedToDropDown');
    let contactsSelectedContainer = getField('contactsSelectedContainer');
    let arrowAssignedTo = getField('arrowAssignedTo');
    contactsSelectedContainer.classList.toggle('d-none');
    assignedToDropDown.classList.toggle('d-none');
    isArrowAssignedToRotated = !isArrowAssignedToRotated;
    arrowAssignedTo.style.transform = isArrowAssignedToRotated ? 'rotate(180deg)' : '';
    ifElseArrow();
}


/**
 * If-else-statement according to the direction of the arrow
 */
function ifElseArrow() {
    if (isArrowAssignedToRotated == true) {
        renderContactsAssignedTo();
    } else {
        renderInitialsSelected();
    }
}


/**
 * If the arrow of assignedTo is rotated the contacts are shown
 */
function renderContactsAssignedTo() {
    let assignedToDropDownWrapper = getField('assignedToDropDownWrapper');
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let fullname = contact['fullname'];
        assignedToDropDownWrapper.innerHTML += assignedToContactsTemplate(contact, i);
        renderContactsChecked(fullname, i);
        renderBackgroundColorInitials(i);
    }
}


/**
 * This is the function to show the initials of the contacts
 */
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


/**
 * This is the template to show the contacts in the dropdown
 * @param {Object} contact - This is the array of a specific contact
 * @param {Number} i - This is the index of the contact 
 * @returns The html-template gets returned
 */
function assignedToContactsTemplate(contact, i) {
    console.log(contact);
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


/**
 * This function sets the look of the selected contacts by comparing the names
 * @param {String} fullname - This is the fullname of the contact-array
 * @param {Number} i - This is the index of the current contact 
 */
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


/**
 * This sets the background color of the initials of the selected contacts according to the initials
 * @param {Number} i - This is the index of the contact
 */
function renderBackgroundColorInitialsSelected(i) {
    let initialsSelectedContact = selectedContactsAssignedTo[i]['initials'];
    let firstLetter = initialsSelectedContact.charAt(0).toLowerCase();
    let initialsField = getField(`initials-at${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/**
 * This sets the background color of the initials according to the intitals
 * @param {Number} i - This is the current index
 */
function renderBackgroundColorInitials(i) {
    let initialsSelectedContact = contacts[i]['initials'];
    let firstLetter = initialsSelectedContact.charAt(0).toLowerCase();
    let initialsField = getField(`initialAt${i}`);
    initialsField.classList.add(`${firstLetter}`);
}


/**
 * This function is when you search for a contact
 */
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


/**
 * This function is, when the assignedTo-search-input is active
 * @param {String} search - This is the search word 
 * @param {HTMLElement} assignedToDropDownWrapper - This is the wrapper to show the contacts
 */
function activeSearchInput(search, assignedToDropDownWrapper) {
    assignedToDropDownWrapper.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let fullname = contact['fullname'];
        if (fullname.toLowerCase().includes(search)) {
            assignedToDropDownWrapper.innerHTML += assignedToContactsTemplate(contact, i);
            renderContactsChecked(fullname, i);
            renderBackgroundColorInitials(i);
        }
    }
}


/**
 * This EventListener is, when you click somewhere outside the assignedTo-container. Then the dropdown gets closed.
 */
document.addEventListener('click', function(event) {
    let assignedToContainer = document.getElementById('aTInputContainer');
    let assignedToDropDownWrapper = document.getElementById('assignedToDropDownWrapper');
    if (isArrowAssignedToRotated === true && !assignedToContainer.contains(event.target) && !assignedToDropDownWrapper.contains(event.target)) {
        toggleAssignedToDropDown();
    }
})