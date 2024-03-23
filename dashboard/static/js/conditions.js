$(document).ready(function () {
    $.getJSON('http://127.0.0.1:5000/conditions', function (data) {
        $('#conditions').text('Current Conditions: ' + data.conditions);
    });
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/conditions', function (data) {
            $('#conditions').text('Current Conditions: ' + data.conditions);
        });
    }, 172800); // Update every 2.88 minutes, optimal amount of time to update due to api limit
});
