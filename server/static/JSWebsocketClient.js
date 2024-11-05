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
    websocket = new WebSocket('ws://192.168.43.75:80/mic/' + name);
    
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

// Initialize Audio Context and Script Processor
async function initAudioProcessor() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: 1,
                sampleRate: 16000,
                echoCancellation: true,
                noiseSuppression: true
            }
        });

        audioContext = new AudioContext({ sampleRate: 16000 });
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        
        scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

        mediaStreamSource.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = (event) => {
            if (!isProcessing || !websocket || websocket.readyState !== WebSocket.OPEN) return;

            const inputBuffer = event.inputBuffer;
            const rawData = inputBuffer.getChannelData(0);

            const pcmData = new Int16Array(rawData.length);
            for (let i = 0; i < rawData.length; i++) {
                pcmData[i] = Math.max(-1, Math.min(1, rawData[i])) * 0x7FFF;
            }

            websocket.send(pcmData.buffer);
        };

        updateStatus('Microphone ready', 'connected');
    } catch (err) {
        console.error('Error accessing microphone:', err);
        updateStatus('Error accessing microphone');
    }
}

// Start recording
function startRecording() {
    if (!audioContext || audioContext.state === 'closed') return;
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    isProcessing = true;
    recordButton.classList.add('recording');
    updateStatus('Recording...', 'recording');
}

// Stop recording
function stopRecording() {
    isProcessing = false;
    recordButton.classList.remove('recording');
    websocket.send("stop".encode())
    updateStatus('Connected', 'connected');
}

// Initialize everything when page loads
window.onload = async () => {
    setupAvatar();
    await initAudioProcessor();
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

    // Stop recording when button is released
    document.getElementById('pushToTalkButton').addEventListener('mouseup', () => {
        console.log("Recording stopped");
        mediaRecorder.stop();
    });
};