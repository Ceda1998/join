let contacts = [];
let letterFilters = [];

async function init() {
    await includeHTML();
    await fetchContacts();
    renderContactList();
}

async function fetchContacts() {
    //Import contacts data from file- need to be changed to Server afterwards
    //const contacts = await fetch('./assets/json/contacts.json');
    let res = await getItem('contacts');
    contacts = JSON.parse(res);
}

function renderContactList() {
    defineFirstLetters();
    sortLettersByAlphabet();
    renderLetterArea(); //it renders also contacts inside foreach
}

function sortLettersByAlphabet() {
    letterFilters.sort();
}

function renderLetterArea() {
    //Render Letter Area
    letterFilters.forEach(letter => {
        renderLetterHtml(letter);
        renderContacts(letter);
    });
}

function renderLetterHtml(letter) {
    document.getElementById('contacts-list').innerHTML += `
    <div class="ctc-sort-letter" id="letter-${letter}">${letter}</div>
    `;
}

function renderContacts(letter) {
    contacts.forEach(contact => {
        if (contact.firstname.charAt(0).toUpperCase() == letter) {
            renderContactHtml(contact);
        }
    });
}

function renderContactHtml(contact) {
    document.getElementById('contacts-list').innerHTML += `
        <div class="ctc-small-list">
            <div class="contact">
                <div class="ctc-logo">${contact.initials}</div>
                <div class="ctc-details">
                    <span class="ctc-fullname">${contact.fullname}</span>
                    <span class="ctc-email">${contact.email}</span>
                </div>
            </div>
        </div>
    `;
}

function defineFirstLetters() {
    contacts.forEach(contact => {
        const firstLetter = (contact.firstname.charAt(0).toUpperCase());
        if (!letterFilters.includes(firstLetter)) {
            letterFilters.push(firstLetter);
        }
    });
}


function renderContactDetail() {
    document.getElementById('contact-detail').innerHTML = `
            <div class="contacts-main-header">
                <div class="cmh-left">
                    <div class="ctc-logo cmh-logo-big">AM</div>
                </div>
                <div class="cmh-right">
                    <div class="cmh-fullname">Anton Mayer</div>
                    <div class="edit-contact">
                        <span class="edit-item"><img src="../assets/img/edit.png">Edit</span>
                        <span class="edit-item"><img src="../assets/img/delete-img.png">Delete</span>
                    </div>
                </div>
            </div>
            <div class="contacts-main-content">
                <span class="contacts-info">Contact Information</span>
                <span class="field-headline">Email</span>
                <div>
                    <a href="mailto:anton@gmail.com" class="ctc-email ctc-email-act">anton@gmail.com</a>
                </div>
                <span class="field-headline">Phone</span>
                <div>
                    <a href="tel:+49 1111 111 11 1" class="ctc-phone">+49 1111 111 11 1</a>
                </div>
            </div>
    `;
}