// Get the DOM elements
const textInput = document.getElementById('text-input');
const convertBtn = document.getElementById('convert-btn');

// Function to convert text to audio
function convertTextToAudio() {
    const text = textInput.value;

    if (!text) {
        alert('Please enter some text!');
        return;
    }

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language (adjust as needed)

        // Event listeners for debugging
        utterance.onstart = () => console.log('Speech started');
        utterance.onend = () => console.log('Speech ended');
        utterance.onerror = (e) => console.error('SpeechSynthesis error:', e);

        // Speak the text
        window.speechSynthesis.speak(utterance);

        // Provide user feedback
        alert('Audio is playing now. Check your speakers.');
    } else {
        alert('SpeechSynthesis is not supported in this browser.');
    }
}

// Add event  to the button
convertBtn.addEventListener('click', convertTextToAudio);
