// Load the rain data from the pi and display it on the dashboard
$(document).ready(function(){
    setInterval(function(){
        const a =  window.location.origin + '/zone1raindata';
        $.getJSON(a, function(data) {
            // Access the first object in the array and its 'rain' property
            $('#rain').text('Rain Percentage: ' + data[0].rain);
        })
    }, 1000); // update every second 

})