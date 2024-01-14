window.onload = async () => {
    await includeHTML(); //Renders external templates
    let elem = document.getElementById('emptyTodo');
    elem.innerHTML = 'There are plenty... go on and write some js';
    console.log(elem);
};