// Function to handle the settings button click
document.getElementById("settingsButton").addEventListener("click", function () {
    // Prompt the user to enter the number of zones
    var numberOfZones = prompt("How many zones are there?", "1");

    // Parse the number of zones as an integer
    numberOfZones = parseInt(numberOfZones);

    // Validate if the input is a number and greater than 0
    if (!isNaN(numberOfZones) && numberOfZones > 0 && numberOfZones <= 15) {
        // Remove existing zone buttons and content
        var tablinkContainer = document.querySelector(".tablink-container");
        tablinkContainer.innerHTML = '';

        var tabContentContainer = document.querySelector(".tabcontent-container");
        tabContentContainer.innerHTML = '';

        // Add zone buttons and corresponding content based on the input
        for (var i = 1; i <= numberOfZones; i++) {
            // Create zone button
            var zoneButton = document.createElement("button");
            zoneButton.textContent = "Zone " + i;
            zoneButton.className = "tablink";
            zoneButton.setAttribute("onclick", "openPage('Zone_" + i + "', this, '#0d6efd')");
            tablinkContainer.appendChild(zoneButton);

            // Create zone content div
            var zoneContentDiv = document.createElement("div");
            zoneContentDiv.id = "Zone_" + i;
            zoneContentDiv.className = "tabcontent";
            zoneContentDiv.innerHTML = `
                <h1>Zone ${i}</h1>
                <h2>Zone ${i} Information</h2>
            `;
            tabContentContainer.appendChild(zoneContentDiv);
        }
    } else {
        alert("Please enter a valid number of zones: 1 to 15.");
    }
});
