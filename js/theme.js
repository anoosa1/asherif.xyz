document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            body.className = theme; // This removes other classes, which is fine if body only has theme classes

            if (theme === 'gruvbox') {
                body.removeAttribute('class'); // Default has no class or empty class
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', theme);
            }
        });
    });
});
