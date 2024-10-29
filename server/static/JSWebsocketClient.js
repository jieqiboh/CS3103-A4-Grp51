// JS Websocket Client Sample
// Author: Bhojan Anand, NUS SoC

let audioContext;
let socket = new WebSocket("ws://localhost:8000/mic");

// Update status badge styles
function updateStatus(message, type) {
    const statusBadge = document.getElementById('status');
    statusBadge.textContent = message;
    
    // Remove all status classes
    statusBadge.classList.remove('connected', 'recording');
    
    // Add appropriate class
    if (type) {
        statusBadge.classList.add(type);
    }
}

// Initialize WebSocket connection
function initWebSocket() {
    const name = window.location.pathname.split('/').pop();

    websocket = new WebSocket('ws://192.168.1.9/mic/' + name);
    
    websocket.onopen = () => {
        updateStatus('Connected', 'connected');
        recordButton.disabled = false;
    };
    
    // Start recording when button is pressed
    document.getElementById('pushToTalkButton').addEventListener('mousedown', () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        console.log("Recording started");
        mediaRecorder.start();
    });

    // Stop recording when button is released
    document.getElementById('pushToTalkButton').addEventListener('mouseup', () => {
        console.log("Recording stopped");
        mediaRecorder.stop();
    });
});