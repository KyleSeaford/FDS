// Initialize the current time to the current time on the server
$(document).ready(function(){
    setInterval(function(){
        $.getJSON('/current_time', function(data) {
            $('#current_time').text('Current Time: ' + data.current_time);
        })
    }, 1000); // update evrey second 
})
