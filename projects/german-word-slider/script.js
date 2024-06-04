const words = [
    { word: "Hund", definition: "Ein Haustier, das oft als bester Freund des Menschen bezeichnet wird." },
    { word: "Katze", definition: "Ein kleines, domestiziertes Fleischfresser-Säugetier, das oft als Haustier gehalten wird." },
    { word: "Haus", definition: "Ein Gebäude, das als Wohnort für Menschen dient." },
    { word: "Baum", definition: "Eine mehrjährige Pflanze mit einem holzigen Stamm, die in der Regel eine gewisse Höhe erreicht." },
    { word: "Auto", definition: "Ein Fahrzeug mit vier Rädern, das von einem Motor angetrieben wird und zum Transport von Menschen verwendet wird." }
];

let currentIndex = 0;

function showSlide(index) {
    const wordElement = document.getElementById('word');
    const definitionElement = document.getElementById('definition');
    wordElement.innerText = words[index].word;
    definitionElement.innerText = words[index].definition;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % words.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    showSlide(currentIndex);
}

// Initial display
showSlide(currentIndex);
