/* Drag and Drop Logic */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    // implement logic to check if there are opther cards- else render placeholder No tasks to do
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    targetId = document.getElementById(ev.target.id);
    placeholder = targetId.querySelector('.todo-empty');
    placeholder.classList.add('d-none');

    ev.target.appendChild(document.getElementById(data));
}