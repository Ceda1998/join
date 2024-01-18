let contacts;

async function init() {
    await includeHTML();
    await fetchContacts();
}

async function fetchContacts() {
    //Import contacts data from file- need to be changed to Server afterwards
    let resp = await fetch('./contacts.json');
    contacts = await resp.json();
}