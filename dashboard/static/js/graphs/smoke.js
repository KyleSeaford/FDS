$(document).ready(function(){
    var smokeData = [];
    var smokeChart;
    var updateInterval = 2000; // Update every 5 seconds

    // Get the canvas element for the chart
    var ctx = document.getElementById('smokeChart').getContext('2d');

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // Function to initialize or update the chart
    function initOrUpdateChart() {
        if (smokeChart) {
            clearCanvas();
            smokeChart.destroy();
        }
        smokeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unit1',
                    data: smokeData,
                    fill: false,
                    borderColor: '#4567B7',
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Smoke Data for zone1'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'smoke particles (per 100)'
                        }
                    }
                }
            }
        });
    }

    // Function to update the chart with new data
    function updateChart() {
        smokeChart.data.labels = Array.from(Array(smokeData.length).keys());
        smokeChart.data.datasets[0].data = smokeData;
        smokeChart.update();
    }

    // Initialize the chart
    initOrUpdateChart();

    // Update the smoke data and display
    function fetchData() {
        const url = window.location.origin + '/zone1smokedata';
        $.getJSON(url, function(data) {
            $('#smoke').text('smoke: ' + data[0].smoke);
            smokeData.push(data[0].smoke);
            if (smokeData.length > 10) {
                smokeData.shift();
            }
            updateChart();
        });
    }

    // Fetch data initially and then at regular intervals
    fetchData();
    setInterval(fetchData, updateInterval);
});
