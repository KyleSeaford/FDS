$(document).ready(function(){
    $.getJSON('http://127.0.0.1:5000/location', function(data) {
        $('#current_location').text('Current Location: ' + data.location);
    });
});
