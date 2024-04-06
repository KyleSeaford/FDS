// Function to handle configuring units
function configureUnits(zoneNumber) {
    // Prompt the user to enter the number of units for the specific zone
    var numberOfUnits = prompt(`Please enter the number of units for Zone ${zoneNumber}:`, localStorage.getItem(`unitsForZone${zoneNumber}`) || "1");

    // Parse the number of units as an integer
    numberOfUnits = parseInt(numberOfUnits);

    // Retrieve existing zone data or create new if it doesn't exist
    var zoneData = JSON.parse(localStorage.getItem(`zone${zoneNumber}`)) || {
        numberOfUnits: 0,
        descriptions: [],
        urls: [] // Add an array to store URLs
    };

    // Validate if the input is a number and greater than or equal to 0
    if (!isNaN(numberOfUnits) && numberOfUnits >= 0 && numberOfUnits <= 5) {
        // Display the number of units in the zone content
        var unitInfoDiv = document.getElementById(`unitInfo_${zoneNumber}`);
        unitInfoDiv.innerHTML = `<h1>Zone ${zoneNumber} | Number of Units: ${numberOfUnits}</h1>`; // Changed 'i' to 'zoneNumber'

        // Update zone data with the new number of units
        zoneData.numberOfUnits = numberOfUnits;

        // If the number of units is set to 0, clear descriptions and URLs
        if (numberOfUnits === 0) {
            zoneData.descriptions = [];
            zoneData.urls = [];
        } else if (numberOfUnits < zoneData.descriptions.length) {
            // If the new number of units is less than the existing number,
            // truncate the descriptions and URLs arrays accordingly
            zoneData.descriptions = zoneData.descriptions.slice(0, numberOfUnits);
            zoneData.urls = zoneData.urls.slice(0, numberOfUnits);
        }

        // Predefined list of colors
        var colors = ['Yellow', 'Red', 'Blue', 'Green', 'Orange', 'Purple', 'Pink', 'Brown', 'Cyan', 'Magenta', 'Lime', 'Teal', 'Indigo', 'Silver', 'Gold'];

        // Update unit table with descriptions and prompt for URLs
        var descriptions = zoneData.descriptions;
        var urls = zoneData.urls;
        for (var i = descriptions.length; i < numberOfUnits; i++) {
            // Assign color from the predefined list
            var color = colors[i % colors.length];
            descriptions.push(color);

            // Prompt the user for the URL of each unit
            var unitURL = prompt(`Please enter the URL for Unit ${i + 1} in Zone ${zoneNumber}:`, localStorage.getItem(`urlForUnit${zoneNumber}_${i + 1}`) || "");
            urls.push(unitURL);
            // Save URL to localStorage
            localStorage.setItem(`urlForUnit${zoneNumber}_${i + 1}`, unitURL);
        }

        // Save updated zone data to localStorage
        localStorage.setItem(`zone${zoneNumber}`, JSON.stringify(zoneData));
        localStorage.setItem(`unitsForZone${zoneNumber}`, numberOfUnits);
        localStorage.setItem(`descriptionsForZone${zoneNumber}`, JSON.stringify(descriptions));
        localStorage.setItem(`urlsForZone${zoneNumber}`, JSON.stringify(urls));

        // Populate unit table with color boxes
        populateUnitTableWithColorBoxes(zoneNumber, descriptions);

    } else {
        alert("Please enter a valid number of units: 0 to 5.");
    }
}

// Function to populate unit table with color boxes
function populateUnitTableWithColorBoxes(zoneNumber, descriptions) {
    var unitTableBody = document.getElementById(`unitTableBody_${zoneNumber}`);
    unitTableBody.innerHTML = ''; // Clear existing rows

    if (descriptions) {
        for (var j = 0; j < descriptions.length; j++) {
            var newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>Unit ${j + 1}</td>
                <td><div class="color-box" style="background-color: ${descriptions[j]};"></div></td>
            `;
            unitTableBody.appendChild(newRow);
        }
    }
}

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
            zoneButton.setAttribute("onclick", "openPage('Zone_" + i + "', this, '#3d8b40')");
            tablinkContainer.appendChild(zoneButton);

            // Retrieve existing zone data from localStorage or create new if it doesn't exist
            var zoneData = JSON.parse(localStorage.getItem(`zone${i}`)) || {
                numberOfUnits: 0,
                descriptions: [],
                urls: [] // Add an array to store URLs
            };

            // Create zone content div
            var zoneContentDiv = document.createElement("div");
            zoneContentDiv.id = "Zone_" + i;
            zoneContentDiv.className = "tabcontent";
            zoneContentDiv.innerHTML = `
                <div id="unitInfo_${i}" class="unitInfo">
                    <h1>Zone ${i} | Number of Units: ${zoneData.numberOfUnits || 0}</h1>
                </div>

                <div class="unit-container">
                    <div class="unit-content">
                        <button class="unitButton" onclick="configureUnits(${i})">Configure Units</button>
                        <table class="unit-table" id="unitTable_${i}">
                            <thead>
                                <tr>
                                    <th>Unit #</th>
                                    <th>Colour</th>
                                </tr>
                            </thead>
                            <tbody id="unitTableBody_${i}">
                                <!-- Unit rows will be added dynamically -->
                            </tbody>
                        </table>
                    </div>
                </div>  
            `;
            tabContentContainer.appendChild(zoneContentDiv);

            // Populate unit table with color boxes
            populateUnitTableWithColorBoxes(i, zoneData.descriptions);

            // Save zone data to localStorage
            localStorage.setItem(`zone${i}`, JSON.stringify(zoneData));
        }
    } else {
        alert("Please enter a valid number of zones: 1 to 15.");
    }
});

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
            zoneButton.setAttribute("onclick", "openPage('Zone_" + i + "', this, '#3d8b40')");
            tablinkContainer.appendChild(zoneButton);

            // Retrieve the number of units for this zone from localStorage
            var numberOfUnits = parseInt(localStorage.getItem(`unitsForZone${i}`)) || 0;

            // Create zone content div
            var zoneContentDiv = document.createElement("div");
            zoneContentDiv.id = "Zone_" + i;
            zoneContentDiv.className = "tabcontent";
            zoneContentDiv.innerHTML = `
                <div id="unitInfo_${i}" class="unitInfo">
                    <h1>Zone ${i} | Number of Units: ${numberOfUnits}</h1>
                </div>

                <div class="unit-container">
                    <div class="unit-content">
                        <button class="unitButton" onclick="configureUnits(${i})">Configure Units</button>
                        <table class="unit-table" id="unitTable_${i}">
                            <thead>
                                <tr>
                                    <th>Unit #</th>
                                    <th>Colour</th>
                                </tr>
                            </thead>
                            <tbody id="unitTableBody_${i}">
                                <!-- Unit rows will be added dynamically -->
                            </tbody>
                        </table>
                    </div>
                </div>  
            `;
            tabContentContainer.appendChild(zoneContentDiv);

            // Populate unit table with color boxes
            var descriptions = JSON.parse(localStorage.getItem(`descriptionsForZone${i}`));
            populateUnitTableWithColorBoxes(i, descriptions);

            // Save the number of units to localStorage with default as 0
            localStorage.setItem(`unitsForZone${i}`, numberOfUnits);
        }

        // Trigger click event for the first zone button (Zone 1)
        var firstZoneButton = document.querySelector(".tablink");
        if (firstZoneButton) {
            firstZoneButton.click();
        }
    }
});
