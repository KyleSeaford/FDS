$(document).ready(function () {
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/weather', function (data) {
            $('#conditions').text('Current Conditions: ' + data.conditions);
        });
    }, 1000); // Update every second
});
