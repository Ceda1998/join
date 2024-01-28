const currentTime = new Date();
let currentHour = currentTime.getHours();
let pageStatus = true;
currentStatusTasks = [];

async function getTaskData() {
    currentStatusTasks = JSON.parse(await getItem('tasks'));
    console.log("aktuelle Tasks", currentStatusTasks);
}

 async function initSummary() {
    await includeHTML();
    let renderContainer = document.getElementById('summaryContent_container');
    renderContainer.innerHTML += renderSummaryPageHtml();
    changeGreetingMessage();
    changeCurrentTodos();
    changeTaskInProgress();
    changeTaskDone();
    changeUrgentTasks()
    changeAwaitingFeedbackTasks();
    changeTaskInBoard();
    initUsers();
    getCurrentLoggedInUser();
}

function changeGreetingMessage() {
    let changeMessage = document.getElementById('greetUserHeadline');
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
    let greetUser = document.getElementById('greetUserName');
    let userData = JSON.parse(localStorage.getItem('userName'));
    greetUser.innerHTML = `${userData}`
}

// change Summary Data

 async function changeCurrentTodos() {
    await getTaskData();
    let todoCount = currentStatusTasks.filter(task => task.progress === 'todo').length;
    let currentToDo = document.getElementById('currentToDoNumber');
    currentToDo.innerHTML = '';
    currentToDo.innerHTML = todoCount;
}

async function changeTaskInProgress() {
    await getTaskData();
    let taskInProgressCount = currentStatusTasks.filter(task => task.progress === 'inprogress').length;
    let taskInProgress = document.getElementById('TaskInProgress');
    taskInProgress.innerHTML = '';
    taskInProgress.innerHTML = taskInProgressCount;
}

async function changeTaskDone() {
    await getTaskData();
    let taskDoneCount = currentStatusTasks.filter(task => task.progress === 'done').length;
    let tasksDone = document.getElementById('DoneToDos');
    tasksDone.innerHTML = '';
    tasksDone.innerHTML = taskDoneCount;
}

async function changeUrgentTasks() {
    await getTaskData();
    let taskUrgentCount = currentStatusTasks.filter(task => task.priority === 'urgent').length;
    let tasksUrgent = document.getElementById('urgentToDos');
    tasksUrgent.innerHTML = '';
    tasksUrgent.innerHTML = taskUrgentCount;
}

async function changeAwaitingFeedbackTasks() {
    await getTaskData();
    let awaitingFeedbackTasksCount = currentStatusTasks.filter(task => task.progress === 'awaitfeedback').length;
    let tasksAwaitingFeedback = document.getElementById('TaskAwaitingFeedback');
    tasksAwaitingFeedback.innerHTML = '';
    tasksAwaitingFeedback.innerHTML = awaitingFeedbackTasksCount;
}

async function changeTaskInBoard() {
    await getTaskData();
    let allCurrentTasks = currentStatusTasks.length;
    let allCurrentTaskContainer = document.getElementById('TasksInBoard');
    allCurrentTaskContainer.innerHTML = allCurrentTasks;
}

// change Backgroundcolor on mobile template

function changeStatus(status) {
    let getCurrentDiv = document.getElementById('summaryDivBc');
    if (status == true) {
        getCurrentDiv.style.backgroundColor = '#091931';
    } else {
        getCurrentDiv.style.backgroundColor = 'none'
    }
}

function renderSummaryPageHtml() {
 return ` 
 
 <div class="summaryHeader">
     <h1 class="summaryHeadline">Join 360</h1>
     <div class="dividerSummaryHeader"></div> 
     <span class="summarySpan">Key Metrics at Glance</span>
     <div class="dividerSummaryHeaderMobile"></div> 
     </div>
     <div class="toDoContent_container">
     <div class="smallToDo_container">
         <div class="smallToDo_containeer">
             <div class="dflexRow">
                 <img src="./assets/img/ToDoPen.png" alt="toDoPen" class="summaryImg">
                 <div class="dflexColumn">
                     <h1 id="currentToDoNumber" class="summaryToDoTaskHeadlines"></h1>
                     <span class="summarySmallSpan">To-do</span>
                 </div>
             </div>
         </div>
         <div class="smallToDo_containeer">
             <div class="smallToDo_containeer">
                 <div class="dflexRow">
                     <img src="./assets/img/ToDoDone.png" alt="toDoPen" class="summaryImg">
                     <div class="dflexColumn">
                         <h1 id="DoneToDos" class="summaryToDoTaskHeadlines"></h1>
                         <span class="summarySmallSpan">Done</span>
                     </div>
                 </div>
         </div>
     </div>
     </div>
     <div class="bigToDoAndGreetUser_container">
         <div class="bigToDo_container">
             <div class="urgenTaskContent_container">
                 <div class="urgentTask">
                     <img src="./assets/img/TaskUrgent.png" alt="urgentTask" class="summaryImg">
                     <div class="dflexColumn">
                         <h1 id="urgentToDos" class="summaryToDoTaskHeadlines"></h1>
                         <span class="summarySmallSpan">Urgent</span>
                     </div>
                 </div>
                 <div class="dividerUrgentTask"></div>
                 <div class="dflexColumn">
                     <h2 id="deadlineToDoDate" class="deadlineToDateStyle">October 15, 2024</h2>
                     <span class="summarySmallSpan">Upcoming Deadline</span>
                 </div>
             </div>
         </div>
         <div class="greetUserContainer">
         <p id="greetUserHeadline">Good Morning</p>
         <p id="greetUserName">Test</p>
         </div>
     </div>

     <div class="taskOverview_container">
         <div class="smallTask_container">
             <div class="dflexColumn">
                 <h1 id="TasksInBoard" class="summaryToDoTaskHeadlines"></h1>
                 <span class="summarySmallSpan">Tasks in <br>
                     Board</span>
             </div>
         </div>
         <div class="smallTask_container">
             <div class="dflexColumn">
                 <h1 id="TaskInProgress" class="summaryToDoTaskHeadlines"></h1>
                 <span class="summarySmallSpan">Tasks In<br>
                     Progress</span>
             </div>
         </div>
         <div class="smallTask_container">
             <div class="dflexColumn">
                 <h1 id="TaskAwaitingFeedback" class="summaryToDoTaskHeadlines"></h1>
                 <span class="summarySmallSpan">Awaiting<br>
                     Feedback</span>
             </div>
         </div>
     </div>
 </div>
 </div>
</div>`;
}