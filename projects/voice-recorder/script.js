// Get references to HTML elements
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playButton = document.getElementById('playButton');
const audioElement = document.getElementById('audioElement');

let recorder;
let audioStream;

// Event listener for the record button
recordButton.addEventListener('click', startRecording);

// Event listener for the stop button
stopButton.addEventListener('click', stopRecording);

// Event listener for the play button
playButton.addEventListener('click', playRecording);

// Function to start recording
function startRecording() {
    // Disable record button, enable stop button, disable play button
    recordButton.disabled = true;
    stopButton.disabled = false;
    playButton.disabled = true;

    // Access user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Save audio stream
            audioStream = stream;
            // Create MediaRecorder instance
            recorder = new MediaRecorder(stream);
            // Start recording
            recorder.start();

            let chunks = [];
            // Event listener for when data is available
            recorder.ondataavailable = function(e) {
                // Store data chunks
                chunks.push(e.data);
            }

            // Event listener for when recording is stopped
            recorder.onstop = function() {
                // Create blob from data chunks
                let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                chunks = [];
                // Create object URL for the recorded audio
                let audioURL = URL.createObjectURL(blob);
                // Set the audio element's src to the recorded audio
                audioElement.src = audioURL;
                // Enable play button
                playButton.disabled = false;
            }
        })
        .catch(function(err) {
            // Log error if getUserMedia fails
            console.error('Error recording audio: ', err);
        });
}

// Function to stop recording
function stopRecording() {
    // Enable record button, disable stop button, enable play button
    recordButton.disabled = false;
    stopButton.disabled = true;
    playButton.disabled = false;

    // Stop recording
    recorder.stop();
    // Stop the audio stream
    audioStream.getTracks().forEach(track => track.stop());
}

// Function to play the recorded audio
function playRecording() {
    // Start playing the audio
    audioElement.play();
}
