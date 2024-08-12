# Excel Data Visualization Project

## Overview

This project allows users to upload an Excel file containing data, select the type of chart they want to visualize the data with, choose a color for the chart, and display both the chart and the data table on a webpage. It is a simple web-based application built using HTML, CSS, JavaScript, and libraries like Chart.js and SheetJS (XLSX).

## Features

- **Upload Excel File**: Users can upload an `.xlsx` or `.xls` file containing the data they want to visualize.
- **Chart Type Selection**: Users can choose from different chart types: Bar, Line, Pie, and Doughnut.
- **Color Picker**: Users can select a color for the chart elements.
- **Dynamic Chart Rendering**: The selected data is visualized on the page in the selected chart type and color.
- **Data Table Display**: The raw data from the Excel file is displayed in a table format below the chart.
- **User-Controlled Rendering**: The chart and table are only rendered when the user clicks the "Show Result" button.

## Project Structure

- `index.html`: The main HTML file that structures the webpage.
- `style.css`: The CSS file that styles the webpage.
- `script.js`: The JavaScript file that handles file input, data processing, chart rendering, and table generation.
- `readme.md`: This file, providing an overview of the project.

## How to Use

1. **Upload an Excel File**: Click the "Choose File" button and select an `.xlsx` or `.xls` file from your computer.
   
2. **Select Chart Type**: Use the "Select Chart Type" dropdown to choose the type of chart you want (Bar, Line, Pie, Doughnut).

3. **Pick a Color**: Use the color picker to choose the color for your chart.

4. **Show Result**: Click the "Show Result" button to display the chart and the corresponding data table.

## Dependencies

This project relies on the following libraries:

- **[Chart.js](https://www.chartjs.org/)**: A JavaScript library for creating beautiful charts.
- **[SheetJS (XLSX)](https://github.com/SheetJS/sheetjs)**: A JavaScript library for parsing and writing spreadsheet data.

These libraries are included via CDN links in the `index.html` file.

## Example Excel File

An example Excel file, `data.xlsx`, is included with the project to help you get started. It contains simple data that you can use to see how the application works.

## Future Improvements

- **Responsive Design**: Improve the layout and design to be more responsive on different screen sizes.
- **Additional Chart Types**: Add more chart types for visualization, such as radar or scatter plots.
- **Data Validation**: Add validation to ensure the uploaded Excel file has the expected format before processing.

## License

This project is open-source and available under the MIT License.
