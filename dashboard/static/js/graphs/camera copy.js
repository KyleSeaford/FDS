// Load the camera data from the pi and display it on the dashboard
$(document).ready(function(){
    setInterval(function(){
        const a =  window.location.origin + '/zone1cameradata';
        $.getJSON(a, function(data) {
            // Construct the URL to the image file
            const imgSrc = 'http://192.168.127.106:5000/' + data[0].camera;
            // Create an img tag
            const img = $('<img>').attr('src', imgSrc);
            // Replace the contents of the #camimg div with the img tag
            $('#camimg').empty().append(img);
        })
    }, 1000); // update every minute 
})