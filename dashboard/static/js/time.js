// Initialize the current time to the current time on the server
$(document).ready(function(){
    setInterval(function(){
        $.getJSON('http://127.0.0.1:5000/current_time', function(data) {
            $('#current_time').text('Current Time: ' + data.current_time);
        })
    }, 1000); // update evrey second 

})
