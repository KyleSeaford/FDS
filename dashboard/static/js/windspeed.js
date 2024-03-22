$(document).ready(function () {
    $.getJSON('http://127.0.0.1:5000/windspeed', function (data) {
        $('#windspeed').text('Current windspeed: ' + data.windspeed);
    });
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/windspeed', function (data) {
            $('#windspeed').text('Current windspeed: ' + data.windspeed);
        });
    }, 10000); // Update every 10 seconds
});
