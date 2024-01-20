let array = [];

async function postMail() {
    /* let value = document.getElementById('mailValue');
    let userName = document.getElementById('name');
    console.log(value);
    console.log(userName); */
    let obj = {
        'name': 'Testname',
        'mail': 'Email@Address.com'
    }
   
    array.push(obj);
    //console.log(array);
    await setItem('user', JSON.stringify('array'));
    let item = await getItem('array');
    console.log(item);
}

async function loadUsers() {
    
    let ParsedArray = JSON.parse(await getItem('array'));
    console.log(ParsedArray['0']['mail'])
   
}