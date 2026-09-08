(function () {
    const button = document.querySelector('[data-toggle="cat"]');
    if (!button) return;

    function updateButton(enabled) {
        button.classList.toggle('enabled', enabled);
        button.setAttribute('aria-pressed', String(enabled));
    }

    updateButton(localStorage.getItem('catEnabled') !== 'off');

    button.addEventListener('click', () => {
        const enabled = !button.classList.contains('enabled');
        localStorage.setItem('catEnabled', enabled ? 'on' : 'off');
        updateButton(enabled);

        const cat = document.getElementById('oneko');
        if (cat) {
            cat.style.display = enabled ? '' : 'none';
        } else if (enabled) {
            location.reload();
        }
    });
})();
