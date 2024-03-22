// Trigger click event for the default open button after dynamically creating zone buttons
document.getElementById("defaultOpen").click();

// Function to handle the settings button click
document.getElementById("settingsButton").addEventListener("click", function () {
    // Prompt the user to enter the number of zones
    var numberOfZones = prompt("How many zones are there?", "1");

    // Parse the number of zones as an integer
    numberOfZones = parseInt(numberOfZones);

    // Validate if the input is a number and greater than 0
    if (!isNaN(numberOfZones) && numberOfZones > 0) {
        // Remove existing zone buttons
        var tablinkContainer = document.querySelector(".tablink-container");
        tablinkContainer.innerHTML = '';

        // Add zone buttons based on the input
        for (var i = 1; i <= numberOfZones; i++) {
            var zoneButton = document.createElement("button");
            zoneButton.textContent = "Zone " + i;
            zoneButton.className = "tablink";
            zoneButton.setAttribute("onclick", "openPage('Zone_" + i + "', this, 'gray')");
            tablinkContainer.appendChild(zoneButton);
        }
    } else {
        alert("Please enter a valid number of zones.");
    }
});
