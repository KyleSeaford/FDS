// Load the camera data from the pi and display it on the dashboard

// dosn't seem to change the image, it just keeps it as the spacefiller image idk why!!!


$(document).ready(function(){
    const a =  window.location.origin + '/zone1cameradata';
    $.getJSON(a, function(data) {
        // Construct the URL to the image file
        const imgSrc = data[0].camera;
        // Create an img tag
        const img = $('<img>').attr('src', imgSrc);
        // Replace the contents of the #camimg div with the img tag
        $('#camimg').empty().append(img);
    })
    setInterval(function(){
        const a =  window.location.origin + '/zone1cameradata';
        $.getJSON(a, function(data) {
            // Construct the URL to the image file
            const imgSrc = data[0].camera;
            // Create an img tag
            const img = $('<img>').attr('src', imgSrc);
            // Replace the contents of the #camimg div with the img tag
            $('#camimg').empty().append(img);
        })
    }, 30000); // update every 30 seconds
})