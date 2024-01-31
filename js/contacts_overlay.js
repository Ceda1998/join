function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
}

/* Helper function to retrieve array index by contactid */
function getIndexById(id) {
    let pos;
    contacts.forEach((contact, index) => {
        if (contact.contactid == id) {
            pos = index;
        }
    });
    return pos;
}

function showMessage(text) {
    let container = document.getElementById('messageBox');
    container.innerHTML = `${text}`;
    container.classList.remove('d-none');
    setTimeout(() => {
        container.classList.add('d-none');
    }, 2500);
}

/* ADD new Contact Section */

function newContact() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Add contact';
    document.getElementById('overlay-sub-headline').innerHTML = 'Tasks are better with a team';
    renderNewContactFields();
}

function renderNewContactFields() {
    document.getElementById('overlay-content').innerHTML = 
    `
        <div class="edit-contact-form">
            <div class="align-center">
                <div class="cmh-logo-big cmh-logo-big-overlay" style="background-color:#d1d1d1"><img src="./assets/img/person-white.png"></div>
            </div>            
                <form class="flex-col w-60 overlay-form" onsubmit="return addContact(event)">
                    <input minlength="2" id="addFirstName" class="inputField input-fullname" placeholder="Name" required/>
                    <input type="email" id="addEmail" class="inputField input-email" placeholder="Email" required/>
                    <input id="addPhone" class="inputField input-phone" placeholder="Phone" required/>
                    <div class="align-center gap-24 button-container">
                        <button class="button-light cancel-btn" onclick="closeOverlay()">Cancel</button>
                        <button type="submit" class="button-dark align-center">Create contact<img src="./assets/img/check.png"></igm></button>
                    </div>
                </form>                                   
        </div>
    `;
}

function addContact(event) {
    event.preventDefault();
    const firstname = document.getElementById('addFirstName').value;
    const email = document.getElementById('addEmail').value;
    const phone = document.getElementById('addPhone').value;
    if (firstname && email && phone) {
        buildContact(firstname, email, phone);
    }
}

function buildContact(firstname, email, phone) {
    const lastname = 'Mustermann';
    let initials = createInitials(firstname, lastname);
    let id = createNewId();
    let fullname = firstname + ' ' + lastname;
    setandSaveContact(id, email, firstname, lastname, fullname, initials, phone);
}

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

function saveandShowContact(id) {
    setItem('contacts', contacts);
    renderContactList();
    showContactDetail(id);
    closeOverlay();
    showMessage('Contact successfully created');
}

function createInitials(firstname, lastname) {
    let firstletter = firstname.charAt(0).toUpperCase();
    let secondletter = lastname.charAt(0).toUpperCase();
    let initials = firstletter + secondletter;
    return initials;
}

function createNewId() {
    let arr = [];
    contacts.forEach(contact => {
        arr.push(Number(contact.contactid));
    });
    arr.sort(function(a,b){ return a - b });
    let newid = arr[arr.length - 1] + 1;
    return newid;
}

/* EDIT Contact Section 👇️ */

function editContact(id) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Edit contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';
    renderEditContactFields(id);
}

function renderEditContactFields(id) {
    let index = getIndexById(id);
    const contact = contacts[index];
    const color = getBackgroundColor(id);
    renderEditContactHtmlForm(contact, color);
}

function renderEditContactHtmlForm(contact, color) {
    document.getElementById('overlay-content').innerHTML = `
        <div class="edit-contact-form">
            <div class="align-center">
                <div class="cmh-logo-big cmh-logo-big-overlay" style="background-color:${color}">${contact.initials}</div>
            </div>
            <form class="flex-col w-60 overlay-form" onsubmit="return saveEditedContact(${contact.contactid}, event)">
                <input id="editFirstName" class="inputField input-fullname" value="${contact.firstname}" required/>
                <input id="editEmail" type="email" class="inputField input-email" value="${contact.email}" required/>
                <input id="editPhone" class="inputField input-phone" value="${contact.phone}" required/>
                <div class="align-center gap-24 button-container">
                    <button class="button-light" onclick="deleteContact('${contact.contactid}')">Delete</button>
                    <button type="submit" class="button-dark align-center">Save<img src="./assets/img/check.png"></img></button>
                </div>
            </form>
        </div>
    `;
}

function saveEditedContact(id, event) {
    event.preventDefault();
    let index = getIndexById(id);
    const firstname = document.getElementById('editFirstName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    generateSaveAndReload(index, id, firstname, email, phone);
}

function generateSaveAndReload(index, id, firstname, email, phone) {
    regenerateInitials(index, firstname);
    regenerateFullname(index, firstname);
    saveContact(index, firstname, email, phone);
    setItem('contacts', contacts);
    renderContactList();
    showContactDetail(id);
    closeOverlay();
    showMessage('Contact successfully edited');
}

function regenerateInitials(index, firstname) {
    if (index && firstname) {
        let firstletter = firstname.charAt(0).toUpperCase();
        let secondletter = contacts[index].lastname.charAt(0).toUpperCase();
        let initials = firstletter + secondletter;
        contacts[index].initials = initials;
    }
}

function regenerateFullname(index, firstname) {
    if (index && firstname) {
        contacts[index].fullname = firstname + ' ' + contacts[index].lastname;
    }
}

function saveContact(index, firstname, email, phone) {
    if (index) {
        contacts[index].firstname = firstname;
        contacts[index].email = email;
        contacts[index].phone = phone;
    }
}


/* DELETE Contact Section */

function deleteContact(id) {
    let index = getIndexById(id);
    openDeleteOverlay(index);
}

function openDeleteOverlay(index) {
    renderContact(index);
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Delete contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';
}

function renderContact(index) {
    let contact = contacts[index];
    document.getElementById('overlay-content').innerHTML = `${returnDeleteHtml(contact, index)}`;
}

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

function finalDeleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);
    renderContactList();
    clearUserDetail();
    closeOverlay();
    showMessage('Contact successfully deleted');
}

function clearUserDetail() {
    document.getElementById('contact-detail').innerHTML = '';
}