let array = [];

async function postMail() {
    let value = document.getElementById('mailValue');
    let userName = document.getElementById('name');
    console.log(value);
    console.log(userName);
    let obj = {
        'name': userName.value,
        'mail': value.value
    }
   
    array.push(obj);
    console.log(array);
    await setItem('user', JSON.stringify('array'));
    let item = await getItem('array');
    console.log(item)
}

async function loadUsers() {
    await postMail();
    ParsedArray = JSON.parse(await getItem('array'));
    console.log(ParsedArray['name'])
   
}