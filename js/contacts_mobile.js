let menuOpen = false;

function hideMobileDetailView() {
    document.getElementById('contactListContainer').classList.remove('d-none');
    document.getElementById('contactsDetailContainer').classList.remove('d-flex');
}

/* Attention this need to be adjusted if media queries change! */
function handleMobileView() {
    if (getWindowWidth() < 800) {
        document.getElementById('contactListContainer').classList.add('d-none');
        document.getElementById('contactsDetailContainer').classList.add('d-flex');
    }
}

function renderContactDetailMenu(event) {
    event.stopPropagation();
    document.getElementById('mobileMenuDots').classList.add('d-none');
    document.getElementById('mobileMenu').classList.remove('d-none');
    menuOpen = true;
}

function closeMenu() {
    if (menuOpen) {
        document.getElementById('mobileMenuDots').classList.remove('d-none');
        document.getElementById('mobileMenu').classList.add('d-none');
        menuOpen = false;
    }
}

