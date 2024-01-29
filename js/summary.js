const currentTime = new Date();
let currentHour = currentTime.getHours();
let pageStatus = true;
currentStatusTasks = [];
let finalinitals;

async function getTaskData() {
  currentStatusTasks = JSON.parse(await getItem("tasks"));
  console.log("aktuelle Tasks", currentStatusTasks);
}

async function initSummary() {
  await includeHTML();
  let renderContainer = document.getElementById("summaryContent_container");
  renderContainer.innerHTML += renderSummaryPageHtml();
  changeGreetingMessage();
  changeCurrentTodos();
  changeTaskInProgress();
  changeTaskDone();
  changeUrgentTasks();
  changeAwaitingFeedbackTasks();
  changeTaskInBoard();
  checkIfUserIsLoggedin();
  changeInitialsCurrentUser();
  initUsers();
}

function changeGreetingMessage() {
  let changeMessage = document.getElementById("greetUserHeadline");
  if (currentHour < 12) {
    changeMessage.innerHTML = `Good Morning`;
  } else if (currentHour <= 17) {
    changeMessage.innerHTML = `Good afternoon`;
  } else {
    changeMessage.innerHTML = `Good Evening`;
  }
}

//get current loggedin User from Array stored in local Storage:

function getCurrentLoggedInUser() {
  let greetUser = document.getElementById("greetUserName");
  let userData = JSON.parse(localStorage.getItem("userName"));
  greetUser.innerHTML = `${userData}`;
}

function getInitialsFromUserName() {
  let userData = JSON.parse(localStorage.getItem("userName"));
  let dataInString = userData[0];
  let initials = dataInString.slice(0, 2);
  finalinitals = initials.toUpperCase();
}

function changeInitialsCurrentUser() {
  getInitialsFromUserName();
  let guestUserLoggedIn = JSON.parse(localStorage.getItem("guest"));

  if (guestUserLoggedIn === true) {
    changeHeaderUserIconGuest();
  } else {
    changeHeaderUserIconLoggedIn();
  }
}

function checkIfUserIsLoggedin() {
    let guestUserLoggedIn = JSON.parse(localStorage.getItem("guest"));
    if (guestUserLoggedIn === true) {
        let greetUser = document.getElementById("greetUserName");
        greetUser.innerHTML = '';
    } else {
        getCurrentLoggedInUser();
    }
}

function changeHeaderUserIconGuest() {
  let initialsDiv = document.querySelector(".header-profile-icon");
  let initialsDivMobile = document.getElementById("currentUserinHeader");
  initialsDiv.innerHTML = "GU";
  initialsDivMobile.innerHTML = "GU";
}

function changeHeaderUserIconLoggedIn() {
  let initialsDiv = document.querySelector(".header-profile-icon");
  let initialsDivMobile = document.getElementById("currentUserinHeader");
  initialsDiv.innerHTML = finalinitals;
  initialsDivMobile.innerHTML = finalinitals;
}

// change Summary Data

async function changeCurrentTodos() {
  await getTaskData();
  let todoCount = currentStatusTasks.filter(
    (task) => task.progress === "todo"
  ).length;
  let currentToDo = document.getElementById("currentToDoNumber");
  currentToDo.innerHTML = "";
  currentToDo.innerHTML = todoCount;
}

async function changeTaskInProgress() {
  await getTaskData();
  let taskInProgressCount = currentStatusTasks.filter(
    (task) => task.progress === "inprogress"
  ).length;
  let taskInProgress = document.getElementById("TaskInProgress");
  taskInProgress.innerHTML = "";
  taskInProgress.innerHTML = taskInProgressCount;
}

async function changeTaskDone() {
  await getTaskData();
  let taskDoneCount = currentStatusTasks.filter(
    (task) => task.progress === "done"
  ).length;
  let tasksDone = document.getElementById("DoneToDos");
  tasksDone.innerHTML = "";
  tasksDone.innerHTML = taskDoneCount;
}

async function changeUrgentTasks() {
  await getTaskData();
  let taskUrgentCount = currentStatusTasks.filter(
    (task) => task.priority === "urgent"
  ).length;
  let tasksUrgent = document.getElementById("urgentToDos");
  tasksUrgent.innerHTML = "";
  tasksUrgent.innerHTML = taskUrgentCount;
}

async function changeAwaitingFeedbackTasks() {
  await getTaskData();
  let awaitingFeedbackTasksCount = currentStatusTasks.filter(
    (task) => task.progress === "awaitfeedback"
  ).length;
  let tasksAwaitingFeedback = document.getElementById("TaskAwaitingFeedback");
  tasksAwaitingFeedback.innerHTML = "";
  tasksAwaitingFeedback.innerHTML = awaitingFeedbackTasksCount;
}

async function changeTaskInBoard() {
  await getTaskData();
  let allCurrentTasks = currentStatusTasks.length;
  let allCurrentTaskContainer = document.getElementById("TasksInBoard");
  allCurrentTaskContainer.innerHTML = allCurrentTasks;
}
// change Backgroundcolor on mobile template

function changeStatus(status) {
  let getCurrentDiv = document.getElementById("summaryDivBc");
  if (status == true) {
    getCurrentDiv.style.backgroundColor = "#091931";
  } else {
    getCurrentDiv.style.backgroundColor = "none";
  }
}

