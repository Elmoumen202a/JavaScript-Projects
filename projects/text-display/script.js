document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const displayText = document.getElementById('displayText');
    const colorInput = document.getElementById('colorInput');
    const sizeInput = document.getElementById('sizeInput');

    // Update text content
    textInput.addEventListener('input', () => {
        displayText.textContent = textInput.value;
    });

    // Update text color
    colorInput.addEventListener('input', () => {
        displayText.style.color = colorInput.value;
    });

    // Update text size
    sizeInput.addEventListener('input', () => {
        displayText.style.fontSize = sizeInput.value + 'px';
    });
});
