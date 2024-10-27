// Initialize variables
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let mediaRecorder = null;
let websocket = null;
const statusDiv = document.getElementById('status');
const recordButton = document.getElementById('recordButton');

function setupAvatar() {
    const name = decodeURIComponent(window.location.pathname.split('/').pop());
    const avatarText = document.querySelector('.avatar-text');
    if (avatarText) {
        avatarText.setAttribute('data-letter', name.charAt(0).toUpperCase());
    }
}

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

    websocket = new WebSocket('ws://localhost:8000/mic/' + name);
    
    websocket.onopen = () => {
        updateStatus('Connected', 'connected');
        recordButton.disabled = false;
    };
    
    websocket.onclose = () => {
        updateStatus('Disconnected');
        recordButton.disabled = true;
    };
    
    websocket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        updateStatus('Connection error');
    };
}

// Initialize MediaStream and MediaRecorder
async function initRecorder() {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: 1,
                sampleRate: 16000,
                sampleSize: 16,
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        // Initialize MediaRecorder for the audio stream
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.mimeType = 'audio/wav';
        
        mediaRecorder.ondataavailable = (event) => {
            if (websocket && websocket.readyState === WebSocket.OPEN) {
                websocket.send(event.data);
            }
        };

        statusDiv.textContent = 'Microphone ready';
    } catch (err) {
        console.error('Error accessing microphone:', err);
        statusDiv.textContent = 'Error accessing microphone';
    }
}

// Start recording
function startRecording() {
    if (!mediaRecorder) return;

    mediaRecorder.start();  // Start the MediaRecorder
    recordButton.classList.add('recording');
    statusDiv.textContent = 'Recording...';
}

// Stop recording
function stopRecording() {
    if (!mediaRecorder) return;

    mediaRecorder.stop();  // Stop the MediaRecorder
    recordButton.classList.remove('recording');
    statusDiv.textContent = 'Stopped';
}

// Initialize everything when page loads
window.onload = async () => {
    setupAvatar();
    await initRecorder();
    initWebSocket();

    // Event listeners for recording control
    recordButton.addEventListener('mousedown', startRecording);
    recordButton.addEventListener('mouseup', stopRecording);
    recordButton.addEventListener('mouseleave', stopRecording);

    // Handle touch events for mobile devices
    recordButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startRecording();
    });
    recordButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopRecording();
    });
};

// Clean up when page is closed
window.onbeforeunload = () => {
    if (websocket) {
        websocket.close();
    }
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }
};
