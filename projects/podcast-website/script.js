// Sample episode data
const episodes = [
    { title: "Episode 1: Introduction", description: "This is the first episode of our podcast.", audioURL: "audio/episode1.mp3" },
    { title: "Episode 2: Guest Interview", description: "In this episode, we interview a special guest.", audioURL: "audio/episode2.mp3" }
];

// Function to display episodes
function displayEpisodes() {
    const episodesSection = document.getElementById("episodes");

    episodes.forEach(episode => {
        const episodeElement = document.createElement("article");
        episodeElement.classList.add("episode");

        const titleElement = document.createElement("h2");
        titleElement.textContent = episode.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = episode.description;

        const audioElement = document.createElement("audio");
        audioElement.controls = true;
        audioElement.src = episode.audioURL;

        episodeElement.appendChild(titleElement);
        episodeElement.appendChild(descriptionElement);
        episodeElement.appendChild(audioElement);

        episodesSection.appendChild(episodeElement);
    });
}

// Call function to display episodes when the page loads
window.onload = displayEpisodes;
