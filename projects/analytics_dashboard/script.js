document.addEventListener('DOMContentLoaded', () => {
    
    // Select HTML elements by their IDs
    const totalUsers = document.getElementById('total-users');
    const activeUsers = document.getElementById('active-users');
    const revenue = document.getElementById('revenue');

    // Set the text content of the selected elements to display some dummy data
    // Display total number of users
    totalUsers.innerText = '1500';  
    // Display number of active users
    activeUsers.innerText = '300';  
    // Display total revenue
    revenue.innerText = '$10,000';  

    // Get the 2D drawing context of the canvas element where the chart will be rendered
    const ctx = document.getElementById('user-chart').getContext('2d');

    
    // Create a new chart using Chart.js library
    new Chart(ctx, {
        type: 'line',  // Specify the type of chart: line chart
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],  // X-axis labels
            datasets: [{
                label: 'User Growth',  // The label for the dataset (appears in the chart legend)
                data: [120, 200, 300, 500, 800, 1500],  // Data points for the chart (Y-axis)
                borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                borderWidth: 2,  // Thickness of the line
                fill: false  // Disable the filling of the area under the line
            }]
        },
        options: {
            responsive: true,  // Make the chart responsive to window resizing
            scales: {
                x: {  // X-axis configuration
                    beginAtZero: true  // Ensure the x-axis starts at zero
                },
                y: {  // Y-axis configuration
                    beginAtZero: true  // Ensure the y-axis starts at zero
                }
            }
        }
    });
});
