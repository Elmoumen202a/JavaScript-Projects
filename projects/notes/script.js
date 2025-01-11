// Select elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const dateInput = document.getElementById('date-input');
const notesContainer = document.getElementById('notes-container');

// Event listener for adding notes
noteForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the values
  const noteText = noteInput.value.trim();
  const noteDate = dateInput.value;

  if (noteText && noteDate) {
    // Create note element
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    noteElement.innerHTML = `
      <p>${noteText} <br><small>${noteDate}</small></p>
      <button class="delete-btn">Delete</button>
    `;

    // Append to container
    notesContainer.appendChild(noteElement);

    // Clear the form
    noteInput.value = '';
    dateInput.value = '';

    // Add delete functionality
    noteElement.querySelector('.delete-btn').addEventListener('click', function () {
      noteElement.remove();
    });
  }
});
