$(document).ready(function(){
    var rainData = [];
    var rainChart;
    var updateInterval = 2000; // Update every 2 seconds

    // Get the canvas element for the chart
    var ctx = document.getElementById('rainChart').getContext('2d');

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    // Function to initialize or update the chart
    function initOrUpdateChart() {
        if (rainChart) {
            clearCanvas();
            rainChart.destroy();
        }
        rainChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Unit1',
                    data: rainData,
                    fill: false,
                    borderColor: '#4567B7',
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Rain Data for zone1'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'rain percentage (per 100%)'
                        }
                    }
                }
            }
        });
    }

    // Function to update the chart with new data
    function updateChart() {
        rainChart.data.labels = Array.from(Array(rainData.length).keys());
        rainChart.data.datasets[0].data = rainData;
        rainChart.update();
    }

    // Initialize the chart
    initOrUpdateChart();

    // Update the rain data and display
    function fetchData() {
        const url = window.location.origin + '/zone1raindata';
        $.getJSON(url, function(data) {
            if (data && data[0] && data[0].rain !== undefined) {
                $('#rain').text('rain: ' + data[0].rain);
                rainData.push(data[0].rain);
                if (rainData.length > 10) {
                    rainData.shift();
                }
                updateChart();
            } else {
                console.error('No valid data received:', data);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch data:', textStatus, errorThrown);
        });
    }

    // Fetch data initially and then at regular intervals
    fetchData();
    setInterval(fetchData, updateInterval);
});
