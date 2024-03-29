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

  let users = JSON.parse(await getItem('users'));

  users.push({
    email: mailInput.value,
    name: userName.value,
    password: registerPassword.value,
  });
  await setItem("users", JSON.stringify(users));
  form.reset();
  initUsers();
  successSignUpPopup();
  goBackToLoginAfterSignUp();
}

async function initUsers() {
  await loadUsers();
}

async function loadUsers(){
  try {
      users = JSON.parse(await getItem('users'));
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
  if (user && user.password === userPassword) {
    window.location.href = "summary.html";
    greetUserInSummary();
  } else {
    userNameOrPasswordIncorrect();
  }
}

function userNameOrPasswordIncorrect() {
  let invalidText = document.getElementById('invalidText');
  invalidText.innerHTML = `False Username or Password!`;
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

//password validation in SignUp

function checkPasswords() {
  let userName = document.getElementById('registerUserName').value;
  let userMail = document.getElementById('registerMailInput').value;
  let signUpPassword = document.getElementById('registerPassword').value;
  let signUpConfirmPassword = document.getElementById('confirmPassword').value;
  let signUpButton = document.getElementById('signUpButton');
  let passwordsFalse = document.getElementById('signUpPasswordCheckText');
  if (signUpPassword == signUpConfirmPassword && userName.length > 0 && userMail.length > 0) {
    signUpButton.disabled = false;
    passwordsFalse.innerHTML = '';
  } else {
    passwordsFalse.innerHTML = `Password does not match`;
    signUpButton.disabled = true;
  }
}

// pop up

function successSignUpPopup() {
  let popupContainer = document.getElementById('successRegistration');
  popupContainer.style.display = 'flex';
  setTimeout(function() {
    popupContainer.style.display = 'none';
  }, 2500);
}

function goBackToLoginAfterSignUp() {
  setTimeout(function() {
    window.location.href = "./index.html";
  }, 3000);
}