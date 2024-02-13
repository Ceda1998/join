let from;
let to;

/* Drag and Drop Logic */
/**
 * This is run when an object is dragged over a draggalble area and highlight thiis one.
 * @param {Object} Event Browser Event
 * @param {String} ID This represents the id from the container where an object has ben dragged to 
 */
function allowDrop(ev, id) {
    ev.preventDefault();
    document.getElementById(id).classList.add('dragover-active');
}

/**
 * This removes the highlight from the Container with the given id
 * @param {String} ID This represents the id from a container
 * Used for remove the highlight from the container when an object has been dropped successfully 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragover-active');
}

/**
 * This enables the drag method on a HTML Element and initiates the drag operation
 * setData sets the data to be transferred (format, data represented by id)
 * @param {Object} Event The Event Object
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}


/**
 * This drops the element to the given container and removes the highlight class
 * @param {Object} Event Event Object associated with the Drop Object (coordinates, data etc.)
 * @param {String} ID ID of the container where the object need to be dropped in 
 */
function drop(ev, id) {
    ev.preventDefault();
    removeHighlight(id);
    let data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
    const taskid = data;
    const newprogress = ev.currentTarget.id;
    updateTask(taskid, newprogress);
}