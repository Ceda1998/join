function redirectTo(url) {
  window.location.href = url;
}

function toggleLogOutMenu() {
  let logoutMenu = document.getElementById("logoutContent");
  if (logoutMenu.style.display === "none" || logoutMenu.style.display === "") {
    logoutMenu.style.display = "block";
  } else {
    logoutMenu.style.display = "none";
  }
}
