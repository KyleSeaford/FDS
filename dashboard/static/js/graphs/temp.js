$(document).ready(function(){
    graphTemps();
});

// Start all temperature graphs
function graphTemps() {
    for (let zoneNumber = 1; zoneNumber <= getNumberOfZones(); zoneNumber++){
        graphTemp(zoneNumber);
    }
}

// Start temperature graph
function graphTemp(zoneNumber) {
    console.log("Graphing temp for zone", zoneNumber);

    var temperatureData = [];
    var temperatureChart;
    var updateInterval = 2000; // Update every 5 seconds
    // Get the canvas element for the chart
    var ctx = document.getElementById(`temperatureChart${zoneNumber}`).getContext('2d');

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

        let datasets = [];
        for (let unitNumber =0; unitNumber < getNumberOfUnits(zoneNumber); unitNumber++){
            datasets.push({
                label: `Unit ${unitNumber + 1}`,
                data: temperatureData,
                fill: false,
                borderColor: getUnitColor(zoneNumber, unitNumber),
                tension: 0.1
            })
        }

        temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: datasets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Temperature Data for zone${zoneNumber}`
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
        console.log("Fetching data for zone", zoneNumber);
        if (temperatureData.length === 0) {
            // gets 10 readings from the pi
            console.log("Fetching 10 readings for zone", zoneNumber);
            const url = window.location.origin + '/zone1temp10data';
            $.getJSON(url, function(data) {
                console.log("data=", data);
                for (let i = 0; i < data.length; i++) {
                    let unitdata = data[i];
                    console.log("unitdata=",unitdata);

                    for (let j = 0; j < unitdata.temp.length; j++) {
                        let t = unitdata.temp[j][1];
                        console.log("j=",i,j,t);
                        temperatureData.push(t);
                    }
                }
                updateChart();
            });

        }
        else{
            // gets on reading from the pi
            console.log("Fetching 1 reading for zone", zoneNumber);
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
    }

    // Fetch data initially and then at regular intervals
    fetchData();
    setInterval(fetchData, updateInterval);
}

