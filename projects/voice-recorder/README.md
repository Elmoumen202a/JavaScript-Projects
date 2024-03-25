# Voice Recorder Web Application

This web application allows users to record audio using their device's microphone and play back the recorded audio.

## Project Structure

- **index.html**: Contains the structure of the webpage with buttons for recording, stopping, and playing audio.
- **style.css**: Provides basic styling to make the buttons and audio element look visually appealing.
- **script.js**: Handles the recording, stopping, and playback functionalities using the Web Audio API.
- **README.md**: This file; provides explanations about the project and its code.

## Usage

1. Open `index.html` in a web browser.
2. Click the "Record" button to start recording audio.
3. Click the "Stop" button to stop recording.
4. Click the "Play" button to listen to the recorded audio.

## Code Explanation

- **HTML (index.html)**:
  - Defines the structure of the webpage with buttons for recording, stopping, and playing audio.
- **CSS (style.css)**:
  - Provides basic styling to make the buttons and audio element visually appealing.
- **JavaScript (script.js)**:
  - Initializes event listeners for the record, stop, and play buttons.
  - Uses the Web Audio API to access the user's microphone, record audio, and play back the recorded audio.
  - Utilizes `getUserMedia()` to access the user's microphone.
  - Creates a `MediaRecorder` instance to record audio.
  - Handles events for recording data availability and recording stop.
  - Creates a blob from recorded audio data and sets the audio element's source to the recorded audio.
  - Provides comments throughout the code for better understanding.

## Dependencies

This project does not have any external dependencies.

## Compatibility

This web application is compatible with modern web browsers that support the Web Audio API and getUserMedia().

## Notes

- The recorded audio is saved as an Ogg file with Opus encoding.
- Ensure that the browser has permission to access the microphone to enable recording functionality.

