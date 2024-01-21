let array = [];

async function postMail() {
    let value = document.getElementById('mailValue');
    let userName = document.getElementById('name');
    console.log(value);
    console.log(userName);
    let obj = {
        'name': value,
        'mail': userName
    }

    array.push(obj);
    await setItem('user', JSON.stringify('array'));
    let item = await getItem('array');
    console.log(item);
}

async function loadUsers() {
    let ParsedArray = JSON.parse(await getItem('array'));
    console.log(ParsedArray['0']['mail']);

}

async function loadContacts(key, pos) {
    const contact = await getItem(key);
    const parsedArray = JSON.parse(contact);
    return parsedArray;
}