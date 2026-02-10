(function () {
    // Toggle options: cat and snow as simple on/off plain text buttons
    function updateToggles() {
        document.querySelectorAll('.toggle-option').forEach(btn => {
            const toggle = btn.dataset.toggle;
            let pref;

            if (toggle === 'cat') {
                pref = localStorage.getItem('catEnabled');
            } else if (toggle === 'snow') {
                pref = localStorage.getItem('snowEnabled');
            }

            if (pref === 'off') {
                btn.classList.remove('enabled');
            } else {
                btn.classList.add('enabled');
            }
        });
    }

    // Handle clicks - toggle on/off
    document.querySelectorAll('.toggle-option').forEach(btn => {
        btn.addEventListener('click', function () {
            const toggle = this.dataset.toggle;
            const isEnabled = this.classList.contains('enabled');

            if (toggle === 'cat') {
                if (isEnabled) {
                    localStorage.setItem('catEnabled', 'off');
                    this.classList.remove('enabled');
                    const oneko = document.getElementById('oneko');
                    if (oneko) oneko.style.display = 'none';
                } else {
                    localStorage.setItem('catEnabled', 'on');
                    this.classList.add('enabled');
                    const oneko = document.getElementById('oneko');
                    if (oneko) {
                        oneko.style.display = '';
                    } else {
                        location.reload();
                    }
                }
            } else if (toggle === 'snow') {
                if (isEnabled) {
                    localStorage.setItem('snowEnabled', 'off');
                    this.classList.remove('enabled');
                    const snowCanvas = document.querySelector('canvas');
                    if (snowCanvas) snowCanvas.style.display = 'none';
                } else {
                    localStorage.setItem('snowEnabled', 'on');
                    this.classList.add('enabled');
                    const snowCanvas = document.querySelector('canvas');
                    if (snowCanvas) {
                        snowCanvas.style.display = '';
                    } else {
                        location.reload();
                    }
                }
            }
        });
    });

    updateToggles();
})();
