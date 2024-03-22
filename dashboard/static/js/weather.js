$(document).ready(function () {
    $.getJSON('http://127.0.0.1:5000/weather', function (data) {
        $('#conditions').text('Current Conditions: ' + data.conditions);
    });
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/weather', function (data) {
            $('#conditions').text('Current Conditions: ' + data.conditions);
        });
    }, 60000); // Update every 60 seconds
});
