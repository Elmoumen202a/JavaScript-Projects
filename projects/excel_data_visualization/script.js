let jsonData = null; // To store the parsed data from the uploaded Excel file
let chartInstance = null; // To keep track of the current chart instance

// Event listener for the file input to handle file upload
document.getElementById('file-input').addEventListener('change', handleFile, false);

// Event listener for the "Show Result" button to render chart and table
document.getElementById('show-result').addEventListener('click', showResult, false);

// Function to handle the uploaded file and parse it using SheetJS
function handleFile(e) {
    const file = e.target.files[0]; // Get the uploaded file
    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' }); // Parse the Excel file

        // Convert the first sheet of the workbook to JSON format
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    };

    reader.readAsArrayBuffer(file); // Read the file as an array buffer
}

// Function to display the chart and table when the "Show Result" button is clicked
function showResult() {
    if (jsonData) { // Check if data has been loaded
        const chartType = document.getElementById('chart-type').value; // Get selected chart type
        const chartColor = document.getElementById('chart-color').value; // Get selected chart color

        renderChart(jsonData, chartType, chartColor); // Render the chart
        renderTable(jsonData); // Render the table
    } else {
        alert("Please upload an Excel file first."); // Alert if no file has been uploaded
    }
}

// Function to render the chart using Chart.js
function renderChart(data, chartType, chartColor) {
    // Extract labels (first row) and data (second column) from the JSON data
    const labels = data[0].slice(1);
    const values = data.slice(1).map(row => row[1]);

    const ctx = document.getElementById('chart').getContext('2d'); // Get the canvas context

    if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance before creating a new one
    }

    // Create a new chart with the specified type, data, and color
    chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Data from Excel',
                data: values,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Ensure the y-axis starts at zero
                }
            }
        }
    });
}

// Function to render the data table
function renderTable(data) {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing data in the table

    // Iterate over each row of data (skipping the header) and append it to the table
    data.slice(1).forEach(row => {
        const tr = document.createElement('tr'); // Create a new table row
        row.forEach(cell => {
            const td = document.createElement('td'); // Create a new table cell
            td.textContent = cell; // Set the cell's text content
            tr.appendChild(td); // Append the cell to the row
        });
        tableBody.appendChild(tr); // Append the row to the table body
    });
}
