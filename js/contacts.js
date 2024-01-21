let contacts = [];

async function init() {
    await includeHTML();
    await fetchContacts();
}

async function fetchContacts() {
    //Import contacts data from file- need to be changed to Server afterwards
    //const contacts = await fetch('./contacts.json');
    const contacts = await getItem('contacts');
    const parsedArray = JSON.parse(contacts);
    console.log(parsedArray); //gets 'contacts' array from remote Storage
    return parsedArray;
}