const currentTime = new Date();
let currentHour = currentTime.getHours();

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