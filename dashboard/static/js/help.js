document.getElementById('helpButton').addEventListener('click', function() {
    var userResponse = confirm('To SetUP FDS, click on the settings button to enter the number of zones. Then, click on the zone buttons to configure each zone. \n\nIf you are experiencing issues or have any questions, Please visit our GitHub page. \n\nWould you like to visit our GitHub page?');
    if (userResponse) {
        window.location.href = 'https://github.com/KyleSeaford/FDS';
    }
});