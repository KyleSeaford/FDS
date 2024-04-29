$(document).ready(function(){
    var temperatureData = [];
    var temperatureChart;
    var updateInterval = 2000; // Update every 5 seconds

    // Get the canvas element for the chart
    var ctx = document.getElementById('temperatureChart').getContext('2d');

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // Function to initialize or update the chart
    function initOrUpdateChart() {
        if (temperatureChart) {
            clearCanvas();
            temperatureChart.destroy();
        }
        temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unit1',
                    data: temperatureData,
                    fill: false,
                    borderColor: 'rgb(110, 247, 5)',
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Temperature Data for zone1'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
    }

    // Function to update the chart with new data
    function updateChart() {
        temperatureChart.data.labels = Array.from(Array(temperatureData.length).keys());
        temperatureChart.data.datasets[0].data = temperatureData;
        temperatureChart.update();
    }

    // Initialize the chart
    initOrUpdateChart();

    // Update the temperature data and display
    function fetchData() {
        const url = window.location.origin + '/zone1tempdata';
        $.getJSON(url, function(data) {
            $('#temp').text('Temperature: ' + data[0].temp);
            temperatureData.push(data[0].temp);
            if (temperatureData.length > 10) {
                temperatureData.shift();
            }
            updateChart();
        });
    }

    // Fetch data initially and then at regular intervals
    fetchData();
    setInterval(fetchData, updateInterval);
});
