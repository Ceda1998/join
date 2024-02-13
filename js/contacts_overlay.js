let tasks;

/**
 * Fetches tasks from Server and adds to tasks Array
 */
(async () => {
    tasks = JSON.parse(await getItem('tasks'));
})();

/**
 * Helper function which loops over all contacts and assigned ids and removes a the contactid when its not present anymore
 * This need to be run once a user has been deleted!
 */
function clearContactIdsFromTasks() {
    let allContactIds = Array.from(new Set(contacts.map(ct => ct.contactid)));
    tasks.forEach(task => {
        task.contactids = task.contactids.filter(id => allContactIds.includes(id));
    })
    setItem('tasks', tasks);
}

/**
 * This closes the Overlay with id overlay
 */
function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
}

/**
 * Gets the index from a Contact Object by the contactid
 * @param {String} id The contactid of a Contact 
 * @returns {Number} The Position of the Contact Object in the contacts Array
 */
function getIndexById(id) {
    let pos;
    contacts.forEach((contact, index) => {
        if (contact.contactid == id) {
            pos = index;
        }
    });
    return pos;
}

/**
 * This shows a message badge to the user
 * @param {String} text Receives the text which is dislpayed to the User
 */
function showMessage(text) {
    let container = document.getElementById('messageBox');
    container.innerHTML = `${text}`;
    container.classList.remove('d-none');
    setTimeout(() => {
        container.classList.add('d-none');
    }, 2500);
}

/**
 * This opens the Overlay and calling function to render the form
 */
function newContact() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Add contact';
    document.getElementById('overlay-sub-headline').innerHTML = 'Tasks are better with a team';
    renderNewContactFields();
}

/**
 * This renders the HTML form for a new Contact
 */
function renderNewContactFields() {
    document.getElementById('overlay-content').innerHTML =
        `
        <div class="edit-contact-form">
            <div class="align-center">
                <div class="cmh-logo-big cmh-logo-big-overlay" style="background-color:#d1d1d1"><img src="./assets/img/person-white.png"></div>
            </div>     
                <form class="flex-col w-60 overlay-form" onsubmit="return validateSaveNameInput(event)">
                    <input minlength="2" id="addName" class="inputField input-fullname" placeholder="Firstname Lastname" title="Please enter your Full Name separated by a space (only 2 Values)" required/>
                    <input type="email" id="addEmail" class="inputField input-email" placeholder="Email" required/>
                    <input type="phone" id="addPhone" class="inputField input-phone" placeholder="Phone" required/>
                    <div id="alertMessage" class="validation-message"></div>
                    <div class="align-center gap-24 button-container">
                        <button class="button-light cancel-btn" onclick="closeOverlay()">Cancel</button>
                        <button type="submit" class="button-dark align-center">Create contact<img src="./assets/img/check.png"></igm></button>
                    </div>                             
                </form>                        
        </div>
    `;
}

/**
 * This is used for the Form Validation on the Add/Edit Input Form
 * @param {String} msg This is the message to be displayed
 * @param {String} field This is the id of the inputField from the error (To highlight it)
 */
function validationAlertMessage(msg, field) {
    const msgbox = document.getElementById('alertMessage');
    const emailfield = document.getElementById(`${field}`);
    emailfield.classList.add('highlight');
    msgbox.innerHTML = msg;
    setTimeout(() => {
        msgbox.innerHTML = '';
        emailfield.classList.remove('highlight');
    }, 2500);
}

/**
 * This validates the Input of the input form (add/edit Contact)
 * @param {Object} event Form Event
 * @returns {Boolean} Return false when regex fails and stops the event to save the contact
 */
function validateSaveNameInput(event) {
    let input = document.getElementById('addName').value.trim();
    var regex = /^[a-zA-ZäöüÄÖÜß]+\s+[a-zA-ZäöüÄÖÜß]+$/;
    if (!regex.test(input)) {
        validationAlertMessage('Please input only 2 values seperated by a space.', 'addName');
        return false;
    }
    addContact(event);
}

/**
 * Once HTML Validation and JS Validation are fine this defines the Contact Object fields
 * @param {Object} Event Form 
 */
function addContact(event) {
    event.preventDefault();
    const fullname = document.getElementById('addName').value;
    const firstname = fullname.split(' ')[0];
    const lastname = fullname.split(' ')[1];
    const email = document.getElementById('addEmail').value;
    const phone = document.getElementById('addPhone').value;
    if (firstname && email && phone) {
        buildContact(firstname, lastname, fullname, email, phone);
    }
}

/**
 * This calculates a new contactId and gets the Initials from the firstname and lastname.
 * After it submits all data to saveContact method 
 * @param {String} firstname 
 * @param {String} lastname 
 * @param {String} fullname 
 * @param {String} email 
 * @param {String} phone 
 */
function buildContact(firstname, lastname, fullname, email, phone) {
    let initials = createInitials(firstname, lastname);
    let id = createNewId();
    setandSaveContact(id, email, firstname, lastname, fullname, initials, phone);
}

/**
 * Creates a Contact Object and pushes to contacts Array
 * @param {Number} id 
 * @param {String} email 
 * @param {String} firstname 
 * @param {String} lastname 
 * @param {String} fullname 
 * @param {String} initials 
 * @param {String} phone 
 */
function setandSaveContact(id, email, firstname, lastname, fullname, initials, phone) {
    const contact = {
        "contactid": id,
        "firstname": firstname,
        "lastname": lastname,
        "fullname": fullname,
        "email": email,
        "phone": phone,
        "initials": initials
    }
    contacts.push(contact);
    saveandShowContact(id);    
}

/**
 * This uploads the contacts Array to the Server and renders the new created Contact
 * @param {Number} id the contactid of the Contact Object
 */
function saveandShowContact(id) {
    setItem('contacts', contacts);
    renderContactList();
    showContactDetail(id);
    closeOverlay();
    showMessage('Contact successfully created');
}

/**
 * Helper function to create initials like HP from two Strings (firstname, lastname)
 * @param {String} firstname 
 * @param {String} lastname 
 * @returns {String} String with 2 letters in Uppercase!
 */
function createInitials(firstname, lastname) {
    let firstletter = firstname.charAt(0).toUpperCase();
    let secondletter = lastname.charAt(0).toUpperCase();
    let initials = firstletter + secondletter;
    return initials;
}

/**
 * This creates a new Id for a Contact Object
 * Checks if not existing yet by an Object in contacts Array
 * Checks also if not existing on any Task Assignment
 * @returns {Number} contactid
 */
function createNewId() {
    if (contacts.length === 0) { return 1; }
    let arr = contacts.map(contact => Number(contact.contactid));
    arr.sort((a, b) => a - b);
    let newid = arr[arr.length - 1] + 1;
    do {
        newid++
    } while (!checkIdOnTaskAssignment(newid));
    return newid;
}

/**
 * This checks if an id is assigned on a Task
 * @param {Number} newid 
 * @returns {Boolean}
 */
function checkIdOnTaskAssignment(newid) {
    let arr = getContactIdsfromTasks();
    return !arr.includes(newid);
}

/**
 * fetches all contactIds from all Tasks in one array and removes duplicates
 * @returns {Array} With all Ids assigned into tasks
 */
function getContactIdsfromTasks() {
    let arr = [];
    tasks.forEach(task => {
        task.contactids.forEach(contactid => {
            if (!arr.includes(contactid)) {
                arr.push(contactid);
            }
        });
    });
    return arr;
}

/* EDIT Contact Section 👇️ */
/**
 * Open Overlay to Edit a contact
 * @param {String} id The contactid of the Object to Edit 
 */
function editContact(id) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Edit contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';
    renderEditContactFields(id);
}

/**
 * Gets the Contact Object index by the contact id, gets the backgroundColor and calls method to render the HTML Form
 * @param {String} id contactid of the Contact Object
 */
function renderEditContactFields(id) {
    let index = getIndexById(id);
    const contact = contacts[index];
    const color = getBackgroundColor(id);
    renderEditContactHtmlForm(contact, color);
}

/**
 * Renders the form and fills with the contact Object data
 * @param {Object} contact Object with all values stored
 * @param {String} color Color used for the Initials Image
 */
function renderEditContactHtmlForm(contact, color) {
    document.getElementById('overlay-content').innerHTML = `
        <div class="edit-contact-form">
            <div class="align-center">
                <div class="cmh-logo-big cmh-logo-big-overlay" style="background-color:${color}">${contact.initials}</div>
            </div>
            <form class="flex-col w-60 overlay-form" onsubmit="return validateEditNameInput(event, ${contact.contactid})">
                <input id="editName" class="inputField input-fullname" value="${contact.firstname} ${contact.lastname}" placeholder="Firstname Lastname" required/>
                <input id="editEmail" type="email" class="inputField input-email" value="${contact.email}" placeholder="Email" required/>
                <input id="editPhone" class="inputField input-phone" value="${contact.phone}" placeholder="Phone" required/>
                <div id="alertMessage" class="validation-message"></div>
                <div class="align-center gap-24 button-container">
                    <button class="button-light" onclick="deleteContact('${contact.contactid}')">Delete</button>
                    <button type="submit" class="button-dark align-center">Save<img src="./assets/img/check.png"></img></button>
                </div>
            </form>
        </div>
    `;
}

/**
 * This validates the Input and prevent the form to be submitted, alerts message when regex test fails
 * @param {Obejct} event Form
 * @param {String} id contactid of the Contact Object 
 * @returns {Boolean} when regex test fails
 */
function validateEditNameInput(event, id) {
    event.preventDefault();
    let input = document.getElementById('editName').value;
    var regex = /^[a-zA-ZäöüÄÖÜß]+\s+[a-zA-ZäöüÄÖÜß]+$/;
    if (!regex.test(input)) {
        validationAlertMessage('Please input only 2 values seperated by a space.', 'editName');
        return false;
    }
    saveEditedContact(id);
}

/**
 * This gathers all the data from the form and splits the name to firstname and lastname
 * @param {String} id contactid of the Contact Object to Edit
 * calls generateSaveAndReload()
 */
function saveEditedContact(id) {
    let index = getIndexById(id);
    const fullname = document.getElementById('editName').value;
    const firstname = fullname.split(' ')[0];
    const lastname = fullname.split(' ')[1];
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    generateSaveAndReload(index, id, fullname, firstname, lastname, email, phone);
}

/**
 * This function generates the new Initials, saves Object to Array, send Array to Server, renders the ContactDetails,
 * closes the Overlay and show a Message Badge
 * @param {*} index 
 * @param {*} id 
 * @param {*} fullname 
 * @param {*} firstname 
 * @param {*} lastname 
 * @param {*} email 
 * @param {*} phone 
 */
function generateSaveAndReload(index, id, fullname, firstname, lastname, email, phone) {
    regenerateInitials(index, firstname, lastname);
    saveContact(index, firstname, lastname, fullname, email, phone);
    setItem('contacts', contacts);
    renderContactList();
    showContactDetail(id);
    closeOverlay();
    showMessage('Contact successfully edited');
}

/**
 * This function regnerates Initials for a contact
 * @param {Number} index the index position of the Contact Object in contacts 
 * @param {*} firstname 
 * @param {*} lastname 
 */
function regenerateInitials(index, firstname, lastname) {
    if (index && firstname && lastname) {
        let firstletter = firstname.charAt(0).toUpperCase();
        let secondletter = lastname.charAt(0).toUpperCase();
        let initials = firstletter + secondletter;
        contacts[index].initials = initials;
    }
}

/**
 * This updates the contact object from contacts array
 * @param {Number} index Position of the Object
 * @param {String} firstname 
 * @param {String} lastname 
 * @param {String} fullname 
 * @param {String} email 
 * @param {String} phone 
 */
function saveContact(index, firstname, lastname, fullname, email, phone) {
    if (index) {
        contacts[index].firstname = firstname;
        contacts[index].lastname = lastname;
        contacts[index].fullname = fullname;
        contacts[index].email = email;
        contacts[index].phone = phone;
    }
}

/**
 * This function gathers the id from a Contact Object and call to open Overlay
 * @param {Number} id Index of the object in the contacts array
 */
function deleteContact(id) {
    let index = getIndexById(id);
    openDeleteOverlay(index);
}

/**
 * This opens the Delete User Overlay
 * @param {Number} index Of the Contact Object in the contacts Array
 */
function openDeleteOverlay(index) {
    renderContact(index);
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Delete contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';
}

/**
 * This function gets to contact object and calls returnDeleteHtml() with it
 * @param {Number} index of the Contact Object in the contacst Array
 */
function renderContact(index) {
    let contact = contacts[index];
    document.getElementById('overlay-content').innerHTML = `${returnDeleteHtml(contact, index)}`;
}

/**
 * Returns HTML for the Contact Obejct to be deleted
 * @param {Obejct} contact Object which should be deleted 
 * @param {Number} index Position of the Object int he Contacts Array 
 * @returns {HTML}
 */
function returnDeleteHtml(contact, index) {
    return `
        <div class="inner-box full-height">
            <div class="headline"><b>Are you sure you want to delete this contact?</b></div>
            <div class="flex-col">
                <span><b>Name: </b>${contact.fullname}</span>
                <span><b>E-Mail: </b>${contact.email}</span>
                <span><b>Phone: </b>${contact.phone}</span>
            </div>
            <button class="final-delete-btn button-dark" onclick="finalDeleteContact(${index})">Yes, delete!</button>
        </div>
    `;
}

/**
 * Deletes the object from the Array, update the data on the Server, reloads the Contact List, 
 * clears User Detail Area, CLose Overlay and show Message
 * @param {Number} index Position of the Contact Object in the Array 
 */
function finalDeleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);
    renderContactList();
    clearUserDetail();
    closeOverlay();
    showMessage('Contact successfully deleted');
    clearContactIdsFromTasks();
}

/**
 * Clears the innerHtml of ID contact-detail
 */
function clearUserDetail() {
    document.getElementById('contact-detail').innerHTML = '';
}