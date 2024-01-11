function openSignUpWindow() {
    let signUpContainer = document.getElementById('loginContentContainer');
    signUpContainer.innerHTML = '';
    signUpContainer.innerHTML += renderSignUpWindow();
}

function renderSignUpWindow() {
    return `
    <div id="signUpWindow">
      <h1 class="loginHeadline">Sign up</h1>
      <hr class="dividerSolid">
      <img src="./assets/img/arrow-left-line.png" class="signUpArrowLeft">
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
            <input type="checkbox" id="privacyCheckbox"><label for="privacy" class="privacyLabel">I accept the&nbsp</label><a href="#">Privacy policy</a>
          </div>
        <div class="loginButtons_container">
          <button id="loginButton">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
    `;
}