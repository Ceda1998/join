let menuOpen = false;

function hideMobileDetailView() {
    document.getElementById('contactListContainer').classList.remove('d-none');
    document.getElementById('contactsDetailContainer').classList.remove('d-flex');
}

/* Attention this need to be adjusted if media queries change! */
function handleMobileView() {
    if (isMobile()) {
        document.getElementById('contactListContainer').classList.add('d-none');
        document.getElementById('contactsDetailContainer').classList.add('d-flex');
    }
}