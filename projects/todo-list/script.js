// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="markCompleted(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field
        taskInput.value = '';
    }
}

// Function to mark a task as completed
function markCompleted(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
}

// Function to delete a task
function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
