$(document).ready(function () {
    setInterval(function () {
        $.getJSON('http://127.0.0.1:5000/ram_usage', function (data) {
            $('#ram-usage').text('RAM Usage: ' + data.ram_usage + '%');
        });
    }, 1000); // Update every second
});
