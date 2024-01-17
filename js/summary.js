const currentTime = new Date();
let currentHour = currentTime.getHours();
let currentToDos = {};

 async function initSummary() {
    await includeHTML();
    let renderContainer = document.getElementById('summaryContent_container');
    renderContainer.innerHTML += renderSummaryPageHtml();
    changeGreetingMessage();
}

function changeGreetingMessage() {
    let changeMessage = document.getElementById('greetUserHeadline');
   if (currentHour < 12) {
        changeMessage.innerHTML = `Good Morning`
   } else if (currentHour <= 17) {
    changeMessage.innerHTML = `Good afternoon`
   } else {
    changeMessage.innerHTML = `Good Evening`
   }

}


function renderSummaryPageHtml() {
 return ` 
 
 <div class="summaryHeader">
     <h1 class="summaryHeadline">Join 360</h1>
     <div class="dividerSummaryHeader"></div> 
     <span class="summarySpan">Key Metrics at Glance</span>
     </div>
     <div class="toDoContent_container">
     <div class="smallToDo_container">
         <div class="smallToDo_containeer">
             <div class="dflexRow">
                 <img src="./assets/img/ToDoPen.png" alt="toDoPen" class="summaryImg">
                 <div class="dflexColumn">
                     <h1 id="currentToDoNumber" class="summaryToDoTaskHeadlines">1</h1>
                     <span class="summarySmallSpan">To-do</span>
                 </div>
             </div>
         </div>
         <div class="smallToDo_containeer">
             <div class="smallToDo_containeer">
                 <div class="dflexRow">
                     <img src="./assets/img/ToDoDone.png" alt="toDoPen" class="summaryImg">
                     <div class="dflexColumn">
                         <h1 id="DoneToDos" class="summaryToDoTaskHeadlines">1</h1>
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
                         <h1 id="DoneToDos" class="summaryToDoTaskHeadlines">1</h1>
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
         <p id="greetUserHeadline">Good Morning</p>
     </div>

     <div class="taskOverview_container">
         <div class="smallTask_container">
             <div class="dflexColumn">
                 <h1 id="TasksInBoard" class="summaryToDoTaskHeadlines">1</h1>
                 <span class="summarySmallSpan">Tasks in <br>
                     Board</span>
             </div>
         </div>
         <div class="smallTask_container">
             <div class="dflexColumn">
                 <h1 id="TaskInProgress" class="summaryToDoTaskHeadlines">1</h1>
                 <span class="summarySmallSpan">Tasks In<br>
                     Progress</span>
             </div>
         </div>
         <div class="smallTask_container">
             <div class="dflexColumn">
                 <h1 id="TaskAwaitingFeedback" class="summaryToDoTaskHeadlines">1</h1>
                 <span class="summarySmallSpan">Awaiting<br>
                     Feedback</span>
             </div>
         </div>
     </div>
 </div>
 </div>
</div>`;
}