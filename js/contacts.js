let contacts = [];
let letterFilters = [];
let activeContact;

/**
 * This runs on body onload
 * Renders External HTML templates
 * Fetch Contacts from Server and stores in contacts Array
 * Renders Contacts List based on contacts Array
 */
async function init() {
  await includeHTML();
  await fetchContacts();
  renderContactList();
}

/**
 * Fetch contacts from Server and loads into contacts Array
 */
async function fetchContacts() {
  //const contacts = await fetch('./assets/json/contacts.json');
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Clears the innerHTML of a HTML Element 
 * @param {String} Id Represents the Id of the HTML Object
 */
function clearId(id) {
  document.getElementById(id).innerHTML = '';
}

/**
 * This renders complete HTML to list all the contacts
 */
function renderContactList() {
  clearId('contacts-list');
  defineFirstLetters();
  sortLettersByAlphabet();
  renderLetterAndContacts();
}

/**
 * This sorts the letters from Array letterFilters alphabetically
 */
function sortLettersByAlphabet() {
  letterFilters.sort();
}

/**
 * This loops through the sorted letter filters and inside each it renders the contacts which belongs into it
 */
function renderLetterAndContacts() {
  letterFilters.forEach((letter) => {
    renderLetterHtml(letter);
    renderContacts(letter);
  });
}

/**
 * This adds the innerHTML of a given letter
 * @param {String} Letter This represents the sorting letter needed to divide the contacts in the list 
 */
function renderLetterHtml(letter) {
  document.getElementById("contacts-list").innerHTML += `
    <div class="ctc-sort-letter" id="letter-${letter}">${letter}</div>
    `;
}

/**
 * This filters the contacts starting with the given letter and submit them to renderContactHtml(contact)
 * @param {String} Letter Letter to filter the contacts Array by First Name 
 */
function renderContacts(letter) {
  contacts.forEach((contact) => {
    if (contact.firstname.charAt(0).toUpperCase() == letter) {
      renderContactHtml(contact);
    }
  });
}

/**
 * This helper function updates the letterFilters Array and loops through contacts
 * and adds the first Char from Firstname, as well removing duplicates
 */
function defineFirstLetters() {
  letterFilters = [];
  contacts.forEach((contact) => {
    const firstLetter = contact.firstname.charAt(0).toUpperCase();
    if (!letterFilters.includes(firstLetter)) {
      letterFilters.push(firstLetter);
    }
  });
}

/**
 * This is used when onclick Event fired on a contact
 * @param {String} Id contactid of the Contact where has been clicked
 * Handles some styling as well
 */
function showContactDetail(id) {
  const contact = contacts.find((ct) => ct.contactid == id);
  const color = getBackgroundColor(id);
  highlightContact(id);
  renderContactDetail(contact, color);
  handleMobileView();
}

/**
 * This highlights the contact when is active and has been clicked (not on Mobile)
 * @param {String} Id The element Id
 * @returns 
 */
function highlightContact(id) {
  if (activeContact && isMobile()) {
    removeHighlight(activeContact);
    return;
  } else if (activeContact) {
    removeHighlight(activeContact);
  }
  let elem = document.getElementById(`contact-${id}`);
  elem.classList.add('contact-active');
  activeContact = id;
}

/**
 * This function removes the highlight from an element
 * @param {String} Id Element Id 
 */
function removeHighlight(id) {
  if (id) {
    let elem = document.getElementById(`contact-${id}`);
    if (elem) {
      elem.classList.remove('contact-active');
    }
  }
}

/**
 * This fetches the background Color of an Element with given Id
 * @param {String} Id Id of the Element
 * @returns {String} Return backGroundColor of the Element
 */
function getBackgroundColor(id) {
  let bgColor;
  if (id) {
    let elem = document
      .getElementById(`contact-${id}`)
      .querySelector(".ctc-logo");
    bgColor = window.getComputedStyle(elem).backgroundColor;
  }
  return bgColor;
}

/**
 * This renders the Html of a contact Object
 * @param {Object} Contact Receives a contact object from the contacts array 
 */
function renderContactHtml(contact) {
  document.getElementById("contacts-list").innerHTML += `
        
            <div class="contact" id="contact-${contact.contactid}" onclick="showContactDetail(${contact.contactid})">
                <div class="ctc-logo">${contact.initials}</div>
                <div class="ctc-details">
                    <span class="ctc-fullname">${contact.fullname}</span>
                    <span class="ctc-email">${contact.email}</span>
                </div>
            </div>
        
    `;
}

/**
 * This renders the Html of a Contact in Detail View
 * @param {Object} contact Object of the contacts Array
 * @param {String} color backgroundColor from the Element (Actually set random by selectors in CSS)
 */
function renderContactDetail(contact, color) {
  document.getElementById("contact-detail").innerHTML = `
            <div class="contacts-main-header cmh-mobile">
                <div class="cmh-left">
                    <div class="cmh-logo-big cmh-logo-big-mobile" style="background-color:${color}">${contact.initials}</div>
                </div>
                <div class="cmh-right">
                    <div class="cmh-fullname">${contact.fullname}</div>
                    <div class="edit-contact">
                        <span class="edit-item" onclick="editContact(${contact.contactid})"><img src="../assets/img/edit.png">Edit</span>
                        <span class="edit-item" onclick="deleteContact(${contact.contactid})"><img src="../assets/img/delete-img.png">Delete</span>
                    </div>
                </div>
            </div>
            <div class="contacts-main-content">
                <span class="contacts-info">Contact Information</span>
                <span class="field-headline">Email</span>
                <div>
                    <a href="mailto:${contact.email}" class="ctc-email ctc-email-act">${contact.email}</a>
                </div>
                <span class="field-headline">Phone</span>
                <div>
                    <a href="tel:${contact.phone}" class="ctc-phone">${contact.phone}</a>
                </div>
                <div class="mobile-menu">
                  <div id="mobileMenuDots" class="newcontact-btn-mobile" onclick="renderContactDetailMenu(event)"><img src="./assets/img/more.png"></div>
                  <div id="mobileMenu" class="edit-contact-mobile-menu d-none">
                      <div class="edit-contact-mobile" onclick="editContact(${contact.contactid})"><img class="pencil" src="./assets/img/edit.png">Edit</div>
                      <div class="delete-contact-mobile" onclick="deleteContact(${contact.contactid})"><img src="./assets/img/delete-img.png">Delete</div>
                  </div>
              </div>
            </div>
    `;
}