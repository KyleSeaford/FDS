$(document).ready(function () {
    $.getJSON('http://127.0.0.1:5000/windspeed', function (data) {
        $('#windspeed').text('Current windspeed: ' + data.windspeed);
    });
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/windspeed', function (data) {
            $('#windspeed').text('Current windspeed: ' + data.windspeed);
        });
    }, 172800); // Update every 2.88 minutes, optimal amount of time to update due to api limit
});
