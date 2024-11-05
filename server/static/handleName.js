// Handle name submission and WebSocket connection
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    const nameInput = document.getElementById('name');
    
    if (submitButton && nameInput) {
        // We're on the index page
        submitButton.addEventListener('click', function() {
            const name = nameInput.value.trim();
            if (name) {
                window.location.href = `/chat/${encodeURIComponent(name)}`;
            } else {
                alert('Please enter your name');
            }
        });
    } else {
        // We're on the chat page
        const userName = document.getElementById('userName');
        const name = window.location.pathname.split('/').pop();
        if (userName) {
            userName.textContent = decodeURIComponent(name);
        }
    }
});