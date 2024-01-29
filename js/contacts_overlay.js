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

function newContact() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Add contact';
    document.getElementById('overlay-sub-headline').innerHTML = 'Tasks are better with a team';
    document.getElementById('overlay-content').innerHTML = renderNewContactFields();
}


/* EDIT Contact Section */

function editContact(id) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Edit contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';
    document.getElementById('overlay-content').innerHTML = renderEditContactFields(id);
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
}

function clearUserDetail() {
    document.getElementById('contact-detail').innerHTML = '';
}