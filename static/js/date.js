// Initialize the current date to the current date on the server
$(document).ready(function(){
    setInterval(function(){
        $.getJSON('/current_date', function(data) {
            $('#current_date').text('Current Date: ' + data.current_date);
        });
    }, 1000); // Update every second
});
