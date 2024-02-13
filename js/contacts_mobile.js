let menuOpen = false;

/**
 * This hides the Contacts Detail Container on Mobile so the contact List is visible (for Back Arrow)
 */
function hideMobileDetailView() {
    if (isMobile()) {
        document.getElementById('contactListContainer').classList.remove('d-none');
        document.getElementById('contactsDetailContainer').classList.remove('d-flex');
    }
}

/**
 * This hides the Contact List on Mobile ad shows the Details Page
 */
function handleMobileView() {
    if (isMobile()) {
        document.getElementById('contactListContainer').classList.add('d-none');
        document.getElementById('contactsDetailContainer').classList.add('d-flex');
    }
}

/**
 * This show the mobile Menu when clicked on the dots icon
 * @param {Object} event 
 */
function renderContactDetailMenu(event) {
    event.stopPropagation();
    document.getElementById('mobileMenuDots').classList.add('d-none');
    document.getElementById('mobileMenu').classList.remove('d-none');
    menuOpen = true;
}

/**
 * This closes the small Menu on the Contact Detail Page rendered only on Mobile, when clicked outside
 */
function closeMenu() {
    if (menuOpen) {
        document.getElementById('mobileMenuDots').classList.remove('d-none');
        document.getElementById('mobileMenu').classList.add('d-none');
        menuOpen = false;
    }
}

