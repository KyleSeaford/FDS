// Load the smoke data from the pi and display it on the dashboard
$(document).ready(function(){
    setInterval(function(){
        const a =  window.location.origin + '/zone1smokedata';
        $.getJSON(a, function(data) {
            // Access the first object in the array and its 'smoke' property
            $('#smoke').text('Smoke Particles: ' + data[0].smoke);
        })
    }, 1000); // update every second 

})