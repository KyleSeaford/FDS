// Function to handle the settings button click
document.getElementById("settingsButton").addEventListener("click", function () {
    // Prompt the user to enter the number of zones
    var numberOfZones = prompt("How many zones are there?", "1");

    // Parse the number of zones as an integer
    numberOfZones = parseInt(numberOfZones);

    // Validate if the input is a number and greater than 0
    if (!isNaN(numberOfZones) && numberOfZones > 0 && numberOfZones <= 15) {
        // Save the number of zones to localStorage
        localStorage.setItem('numberOfZones', numberOfZones);

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
                <button class="unitButton" onclick="configureUnits(${i})">Configure Units</button>
                <div id="unitInfo_${i}" class="unitInfo"></div>
            `;
            tabContentContainer.appendChild(zoneContentDiv);
        }

        // Trigger click event for the first zone button (Zone 1)
        document.querySelector(".tablink").click(); // Trigger click event for the first zone button (Zone 1)

    } else {
        alert("Please enter a valid number of zones: 1 to 15.");
    }
});

// Function to handle configuring units
function configureUnits(zoneNumber) {
    // Prompt the user to enter the number of units for the specific zone
    var numberOfUnits = prompt(`Please enter the number of units for Zone ${zoneNumber}:`, "1");

    // Parse the number of units as an integer
    numberOfUnits = parseInt(numberOfUnits);

    // Validate if the input is a number and greater than 0
    if (!isNaN(numberOfUnits) && numberOfUnits > 0 && numberOfUnits <= 5) {
        // Display the number of units in the zone content
        var unitInfoDiv = document.getElementById(`unitInfo_${zoneNumber}`);
        unitInfoDiv.innerHTML = `<h3>Number of Units: ${numberOfUnits}</h3>`;

        // Save the number of units to localStorage or any other operations you want to perform
    } else {
        alert("Please enter a valid number of units: 1 to 5.");
    }
}
// Function to create zone buttons and content on page load
window.addEventListener('load', function () {
    // Check if numberOfZones is saved in localStorage
    var savedNumberOfZones = localStorage.getItem('numberOfZones');

    if (savedNumberOfZones !== null) {
        // Retrieve the number of zones from localStorage
        var numberOfZones = parseInt(savedNumberOfZones);

        // Add zone buttons and corresponding content based on the saved number of zones
        var tablinkContainer = document.querySelector(".tablink-container");
        var tabContentContainer = document.querySelector(".tabcontent-container");

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
                <button class="unitButton" onclick="configureUnits(${i})">Configure Units</button>
                <div id="unitInfo_${i}" class="unitInfo"></div>
            `;
            tabContentContainer.appendChild(zoneContentDiv);
        }

        // Trigger click event for the first zone button (Zone 1)
        document.querySelector(".tablink").click();
    }
});