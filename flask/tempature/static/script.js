var ctx = document.getElementById('temperatureChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            }
        },
        elements: {
            point: {
                radius: 0 // Hide data points
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Real-Time Temperature Graph'
            },
            legend: {
                display: false // Hide legend
            },
            tooltip: {
                enabled: false // Hide tooltip
            }
        }
    }
});

// Update temperature data every second
setInterval(function() {
    fetch('/unit1/temp')
        .then(response => response.json())
        .then(data => {
            var time = data.currentTime;
            var temp = data.unit1Temp;
            chart.data.labels.push(time);
            chart.data.datasets[0].data.push(temp);
            chart.update();
        });
}, 1000);
