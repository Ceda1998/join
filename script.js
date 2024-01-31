

function openHelpMenu() {
    window.location.href = "help.html";
}

function returnToSummary() {
    window.location.href = "../summary.html";
}

function returnToLogin() {
    window.location.href = "./index.html";
}

function returnToBoard() {
    window.location.href = "../board.html";
}

function returnTasks() {
    window.location.href = "../add_task.html";
}

function returnContacts() {
    window.location.href = "../contacts.html";
}

function toggleLogOutMenu() {
    let logoutMenu = document.getElementById('logoutContent');
    if (logoutMenu.style.display === 'none' || logoutMenu.style.display === '') {
        logoutMenu.style.display = 'block';
    } else {
        logoutMenu.style.display = 'none';
    }
}