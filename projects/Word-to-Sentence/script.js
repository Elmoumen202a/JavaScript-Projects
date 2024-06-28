function translateWord() {
    // Get the value entered in the input field and convert it to lowercase
    const word = document.getElementById('wordInput').value.toLowerCase();
    
    // Get the paragraph element where the translated sentence will be displayed
    const sentenceOutput = document.getElementById('sentenceOutput');

    // Example translation dictionary (you can replace this with actual translation logic or API calls)
    const translations = {
        cat: 'Die Katze sitzt auf der Mauer.',
        dog: 'Der Hund spielt im Garten.',
        house: 'Das Haus ist groß und schön.',
        car: 'Das Auto fährt schnell.'
    };

    // Get the translated sentence for the input word, or a default message if the word is not found
    let sentence = translations[word] || 'Translation not found.';

    // If the sentence was found in the translations dictionary
    if (sentence !== 'Translation not found.') {
        // Create a regular expression to find the translated word in the sentence, case-insensitive
        const translatedWord = translations[word].split(' ')[1]; // Assuming the translated word is the first word in the sentence
        const regexEnglish = new RegExp(`\\b${word}\\b`, 'gi');
        const regexGerman = new RegExp(`\\b${translatedWord}\\b`, 'gi');

        // Replace the input word in the sentence with the word wrapped in a span with the highlight class for English
        sentence = sentence.replace(regexGerman, `<span class="highlight-german">${translatedWord}</span>`);
    }

    // Set the inner HTML of the sentence output paragraph to the translated sentence
    sentenceOutput.innerHTML = `English: <span class="highlight-english">${word}</span><br>German: ${sentence}`;
}
