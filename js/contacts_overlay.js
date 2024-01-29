function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
}

function newContact() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Add contact';
    document.getElementById('overlay-sub-headline').innerHTML = 'Tasks are better with a team';
    document.getElementById('overlay-content').innerHTML = renderNewContactFields();
}

function editContact(id) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Edit contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';
    document.getElementById('overlay-content').innerHTML = renderEditContactFields(id);
}

function deleteContact(id) {
    contacts.forEach((contact, index) => {
        if (contact.contactid == id) {
            openDeleteOverlay(index);
        }
    });
}

function finalDeleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);
    renderContactList();
}

function openDeleteOverlay(index) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-headline').innerHTML = 'Delete contact';
    document.getElementById('overlay-sub-headline').innerHTML = '';

    renderContact(index);
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