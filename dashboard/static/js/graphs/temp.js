// Load the temperature data from the pi and display it on the dashboard
$(document).ready(function(){
    setInterval(function(){
        const a =  window.location.origin + '/zone1tempdata';
        $.getJSON(a, function(data) {
            // Access the first object in the array and its 'temp' property
            $('#temp').text('Temperature: ' + data[0].temp);
        })
    }, 1000); // update every second 

})