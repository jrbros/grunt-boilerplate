function toggleMenu() {
    var body = document.getElementById('Site');
    var buttonMenu = document.getElementById('ButtonMenu');
    var nav = document.getElementById('Nav');

    nav.onclick = function() {
        body.className = '';
    };

    buttonMenu.onclick = function() {
        body.className = 'Menu--isOpen';
    };
}

toggleMenu();






