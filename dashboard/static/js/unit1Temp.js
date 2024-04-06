// Initialize the current temp from the sensor to server
$(document).ready(function(){
    setInterval(function(){
        $.getJSON('http://127.0.0.1:5000/unit1/temp', function(data) {
            $('#unit1Temp').text('unit1 Temperature: ' + data.unit1Temp);
        });
    }, 1000); // Update every second
});
