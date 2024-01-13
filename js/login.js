function openSignUpWindow() {
    let signUpContainer = document.getElementById('loginContentContainer');
    signUpContainer.innerHTML = '';
    signUpContainer.innerHTML += renderSignUpWindow();
}

function backToLogin() {
    let loginContainer = document.getElementById('loginContentContainer');
    loginContainer.innerHTML = '';
    loginContainer.innerHTML = renderLogin();
}

function openWithGuestLogin() {
  window.location.href = 'summary.html';
}

function renderSignUpWindow() {
    return `
    <div id="signUpWindow">
      <h1 class="loginHeadline">Sign up</h1>
      <hr class="dividerSolid">
      <img src="./assets/img/arrow-left-line.png" id="signUpArrowLeft" onclick="backToLogin()">
      <form action="#" id="SignUpForm">
        <div class="inputIcon_container">
          <input type="text" required class="loginInputField" placeholder="Name"/>
          <img src="./assets/img/person.png" alt="mailicon" class="loginIcons">
        </div>
        <div class="inputIcon_container">
        <input type="email" required class="loginInputField" placeholder="Email" />
        <img src="./assets/img/mail.png" alt="passwordIcon" class="loginIcons">
      </div>
      <div class="inputIcon_container">
        <input type="password" required class="loginInputField" placeholder="Password" />
        <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
      </div>
      <div class="inputIcon_container">
        <input type="password" required class="loginInputField" placeholder="Confirm Password" />
        <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
      </div>
      <div class="SignUpPrivacy_container">
            <input type="checkbox" id="privacyCheckbox"><label for="privacy" class="privacyLabel">I accept the&nbsp</label><a class="blueLinks" href="#">Privacy policy</a>
          </div>
        <div class="loginButtons_container">
          <button id="loginButton">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
    `;
}

function renderLogin() {
    return `
    <div id="loginWindow">
        <h1 class="loginHeadline">Log in</h1>
        <hr class="dividerSolid">
        <form action="#" id="loginForm">
          <div class="inputIcon_container">
            <input type="email" required class="loginInputField" placeholder="Email"/>
            <img src="./assets/img/mail.png" alt="mailicon" class="loginIcons">
          </div>
          <div class="inputIcon_container">
          <input type="password" required class="loginInputField" placeholder="Password" />
          <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
        </div>
          <div class="rememberMe_container">
            <input type="checkbox" id="rememberMe"><label for="rememberMe" class="rememberMeLabel">Remember me</label>
          </div>
          <div class="loginButtons_container">
            <button id="loginButton">Log in</button>
            <button id="guestLoginButton">Guest Log in</button>
          </div>
        </form>
      </div>
    </div>
    `;
}