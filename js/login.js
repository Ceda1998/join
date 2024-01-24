let users = [];

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
  let userMail = document.getElementById('emailLoginField').value;
  let userPassword = document.getElementById('passwordLoginField').value;
  await loadUsers();
  let user = users.find(user => user.email === userMail);
  console.log(userMail, userPassword, users)
  if (user && user.password === userPassword) {
    console.log('Usermail und Passwort stimmt')
    window.location.href = "summary.html";
  } else {
    console.log('Usermail und Passwort stimmt nicht!')
  }
}

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
  window.location.href = "summary.html";
}

function registeredLogin() {
  window.location.href = "index.html";
}

// renderfunctions:

function renderSignUpWindow() {
  return `
    <div id="signUpWindow">
      <h1 class="loginHeadline">Sign up</h1>
      <hr class="dividerSolid">
      <img src="./assets/img/arrow-left-line.png" id="signUpArrowLeft" onclick="backToLogin()">
      <form action="#" id="SignUpForm">
        <div class="inputIcon_container">
          <input type="text" required class="loginInputField" placeholder="Name" id="registerUserName"/>
          <img src="./assets/img/person.png" alt="mailicon" class="loginIcons">
        </div>
        <div class="inputIcon_container">
        <input type="email" required class="loginInputField" placeholder="Email" id="registerMailInput"/>
        <img src="./assets/img/mail.png" alt="passwordIcon" class="loginIcons">
      </div>
      <div class="inputIcon_container">
        <input type="password" required class="loginInputField" placeholder="Password" id="registerPassword"/>
        <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
      </div>
      <div class="inputIcon_container">
        <input type="password" required class="loginInputField" placeholder="Confirm Password" id="confirmPassword"/>
        <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
      </div>
      <div class="SignUpPrivacy_container">
            <input type="checkbox" id="privacyCheckbox"><label for="privacy" class="privacyLabel">I accept the&nbsp</label><a class="blueLinks" href="#">Privacy policy</a>
          </div>
        <div class="loginButtons_container">
          <button id="loginButton" class="registerButton" onclick="register(event)">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
    `;
}

function renderLogin() {
  return `
    <div class="login_container" id="loginContentContainer">
    <div id="loginWindow">
      <h1 class="loginHeadline">Log in</h1>
      <hr class="dividerSolid">
      <form action="#" id="loginForm">
        <div class="inputIcon_container">
          <input type="email" required class="loginInputField" placeholder="Email" id="emailLoginField"/>
          <img src="./assets/img/mail.png" alt="mailicon" class="loginIcons">
        </div>
        <div class="inputIcon_container">
        <input type="password" required class="loginInputField" placeholder="Password" id="passwordLoginField" />
        <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
      </div>
        <div class="rememberMe_container">
          <input type="checkbox" id="rememberMe"><label for="rememberMe" class="rememberMeLabel">Remember me</label>
        </div>
        <div class="loginButtons_container">
          <button id="loginButton" onclick="checkLogin()">Log in</button>
          <button type="button" id="guestLoginButton" onclick="openWithGuestLogin()">Guest Log in</button>
        </div>
      </form>
    </div>
  </div>
    `;
}
