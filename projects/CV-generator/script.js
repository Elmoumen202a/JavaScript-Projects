// Update CV with user inputs
document.getElementById("update-btn").addEventListener("click", () => {
    // Get input values
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;
    const phone = document.getElementById("phone-input").value;
    const education = document.getElementById("education-input").value;
    const experience = document.getElementById("experience-input").value;
    const skills = document.getElementById("skills-input").value;
    const photoInput = document.getElementById("photo-input");

    // Update CV fields
    document.getElementById("name").textContent = name || "Your Name";
    document.getElementById("email").textContent = email || "your.email@example.com";
    document.getElementById("phone").textContent = phone || "123-456-7890";
    document.getElementById("education").textContent = education || "Your Degree - Your University (Year)";
    document.getElementById("experience").textContent = experience || "Your Role - Your Company (Year)";
    document.getElementById("skills").textContent = skills || "Skill 1, Skill 2, Skill 3";

    // Update photo if provided
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const photo = document.getElementById("photo");
            photo.src = e.target.result;
            photo.style.display = "block";
        };
        reader.readAsDataURL(photoInput.files[0]);
    }
});

// Download CV as PDF
document.getElementById("download-btn").addEventListener("click", () => {
    const cvContainer = document.getElementById("cv-container");

    // Using jsPDF for PDF generation
    const jsPDF = window.jspdf.jsPDF;
    const pdf = new jsPDF();

    pdf.html(cvContainer, {
        callback: function (doc) {
            doc.save("My_CV.pdf");
        },
        x: 10,
        y: 10
    });
});
