document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("study-form");
    const studyLogs = document.getElementById("study-logs");

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const date = document.getElementById("date").value;
        const category = document.getElementById("category").value;
        const hours = document.getElementById("hours").value;

        // Create a study log element
        const log = document.createElement("div");
        log.className = "study-log not-done";
        log.innerHTML = `
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Hours:</strong> ${hours}</p>
            <p>Status: <span class="status">Not Done</span></p>
        `;

        // Add click event to toggle status
        log.addEventListener("click", () => {
            if (log.classList.contains("not-done")) {
                log.classList.remove("not-done");
                log.classList.add("done");
                log.querySelector(".status").textContent = "Done";
            } else {
                log.classList.remove("done");
                log.classList.add("not-done");
                log.querySelector(".status").textContent = "Not Done";
            }
        });

        // Append the log to the dashboard
        studyLogs.appendChild(log);

        // Reset the form
        form.reset();
    });
});
