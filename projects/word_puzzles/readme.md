# Game of Words: Word Puzzles

## Overview
Game of Words: Word Puzzles is a simple and fun word guessing game where players try to guess a hidden word by suggesting letters. Players have a limited number of attempts to guess the word correctly.

## Project Structure
```
word_puzzles/
├── index.html
├── style.css
└── script.js
└── readme.md
└── test.js

```

## Features
- Randomly selects a word from a predefined list.
- Players can input a letter to guess.
- Displays the current state of the word with guessed letters revealed.
- Tracks the number of attempts left.
- Allows players to restart the game after winning or losing.

## Technologies Used
- HTML
- CSS
- JavaScript

## How to Play
1. Open the `index.html` file in your web browser.
2. A hidden word will be displayed with underscores representing each letter.
3. Enter a letter in the input box and click the "Guess" button.
4. If the letter is in the word, it will be revealed in the word display. If not, the number of attempts will decrease.
5. The game ends when you either guess the word or run out of attempts.
6. You can restart the game by clicking the "Restart Game" button.

## Installation
To set up the game locally, follow these steps:

1. **Clone the repository** (or download the files):
   ```bash
   git clone https://github.com/yourusername/word-puzzle-game.git
   cd word-puzzle-game
