$(document).ready(function () {
    $.getJSON('http://127.0.0.1:5000/conditions', function (data) {
        $('#conditions').text('Current Conditions: ' + data.conditions);
    });
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/conditions', function (data) {
            $('#conditions').text('Current Conditions: ' + data.conditions);
        });
    }, 30000); // Update every 30 seconds
});
