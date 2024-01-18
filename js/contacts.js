let contacts = {};

async function init() {
    await includeHTML();
    console.log('included');
    fetchContacts();
    console.log(contacts);
}

async function fetchContacts() {
    //Import contacts data from file- need to be changed to Server afterwards
    let resp = await fetch('./contacts.json');
    contacts = await resp.json();
}