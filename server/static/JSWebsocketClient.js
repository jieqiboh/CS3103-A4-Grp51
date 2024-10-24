// JS Websocket Client Sample
// Author: Bhojan Anand, NUS SoC

let audioContext;
let socket = new WebSocket("ws://localhost:8000/mic");

// Capture microphone input
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    let mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
        console.log('Audio data type:', event.data.type);  // Likely "audio/webm" or "audio/ogg"
        socket.send(event.data);  // Send the audio data to the server
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