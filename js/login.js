let users = [];
let loggedInUser =[];
let guestLoggedIn = false;

async function register() {
  let form = document.getElementById('SignUpForm');
  let mailInput = document.getElementById("registerMailInput");
  let userName = document.getElementById("registerUserName");
  let registerPassword = document.getElementById("registerPassword");
  let registerBtn = document.querySelector(".registerButton");
  event.preventDefault();
  users.push({
    email: mailInput.value,
    name: userName.value,
    password: registerPassword.value,
  });
  console.log(users);
  await setItem("users", JSON.stringify(users));
  form.reset();
  initUsers();
}

async function initUsers() {
  await loadUsers();
}

async function loadUsers(){
  try {
      users = JSON.parse(await getItem('users'));
      console.log('Geladene User: ', users)
  } catch(e){
      console.error('Loading error:', e);
  }
}

async function checkLogin() {
  event.preventDefault();
  guestLoggedIn = false;
  localStorage.setItem('guest',JSON.stringify(guestLoggedIn));
  let userMail = document.getElementById('emailLoginField').value;
  let userPassword = document.getElementById('passwordLoginField').value;
  await loadUsers();
  let user = users.find(user => user.email === userMail);
  console.log(userMail, userPassword, users)
  if (user && user.password === userPassword) {
    console.log('Usermail und Passwort stimmt')
    window.location.href = "summary.html";
    greetUserInSummary();
  } else {
    console.log('Usermail und Passwort stimmt nicht!')
  }
}

//finding current logged in User functions:

function findUserNameByEmail(email) {
  const user = users.find(user => user.email === email);
  return user ? user.name : null;
}

async function greetUserInSummary() {
  let currentMail = document.getElementById('emailLoginField').value;
  loggedInUser.push(findUserNameByEmail(currentMail));
  localStorage.setItem("userName", JSON.stringify(loggedInUser));
}

//sign Up Logic:

function openSignUpWindow() {
  let signUpContainer = document.getElementById("loginContentContainer");
  signUpContainer.innerHTML = "";
  signUpContainer.innerHTML += renderSignUpWindow();
}

function backToLogin() {
  let loginContainer = document.getElementById("loginContentContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML = renderLogin();
}

function openWithGuestLogin() {
  guestLoggedIn = true;
  localStorage.setItem('guest',JSON.stringify(guestLoggedIn));
  window.location.href = "summary.html";
}

function registeredLogin() {
  window.location.href = "index.html";
}

