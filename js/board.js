window.onload = async () => {
    await includeHTML(); //Renders external templates and waits for it
    let elem = document.getElementById('emptyTodo');
    elem.innerHTML = 'There are plenty... go on and write some js';
    //Run functions which manipulate elements from rendered templates 
};