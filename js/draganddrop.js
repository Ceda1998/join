let from;
let to;

/* Drag and Drop Logic */
function allowDrop(ev, id) {
    ev.preventDefault();
    document.getElementById(id).classList.add('dragover-active');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragover-active');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, id) {
    ev.preventDefault();
    removeHighlight(id);
    let data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
    const taskid = data;
    const newprogress = ev.currentTarget.id;
    updateTask(taskid, newprogress);
}