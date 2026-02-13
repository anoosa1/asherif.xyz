function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Create clock element if it doesn't exist
    let clock = document.getElementById('clock');
    if (!clock) {
        clock = document.createElement('div');
        clock.id = 'clock';
        const footer = document.querySelector('footer');
        if (footer) {
            footer.appendChild(clock);
        } else {
            document.body.appendChild(clock);
        }
    }

    clock.textContent = timeString;
}

// Update immediately and then every second
updateClock();
setInterval(updateClock, 1000);
