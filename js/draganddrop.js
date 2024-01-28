let from;
let to;

/* Drag and Drop Logic */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    let data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));

    const taskid = data;
    const newprogress = ev.currentTarget.id;
    // ev.currentTarget.id is the id of the progress container
    // data is id of the task    
    updateTask(taskid, newprogress);
}