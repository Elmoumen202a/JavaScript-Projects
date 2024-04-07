document.getElementById('saveButton').addEventListener('click', function() {
    const textToWrite = document.getElementById('textInput').value;

    // Creating a new PDF document
    const pdf = new jsPDF();

    // Adding text to PDF
    pdf.text(textToWrite, 10, 10);

    // Convert the PDF to a blob
    const blob = pdf.output('blob');

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'generated.pdf';

    // Trigger the download
    downloadLink.click();
});
