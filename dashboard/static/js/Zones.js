// Function to handle the settings button click
document.getElementById("settingsButton").addEventListener("click", function () {
    // Prompt the user to enter the number of zones
    var numberOfZones = prompt("How many zones are there?", "1");

    // Parse the number of zones as an integer
    numberOfZones = parseInt(numberOfZones);

    // Validate if the input is a number and greater than 0
    if (!isNaN(numberOfZones) && numberOfZones > 0 && numberOfZones <= 13) {
        // Save the number of zones to localStorage
        localStorage.setItem('numberOfZones', numberOfZones);

        // Remove existing zone buttons and content
        var tablinkContainer = document.querySelector(".tablink-container");
        tablinkContainer.innerHTML = '';

        var tabContentContainer = document.querySelector(".tabcontent-container");
        tabContentContainer.innerHTML = '';

        // Add zone buttons and corresponding content based on the input
        console.log("Adding zone buttons and content based on saved number of zones (top)", numberOfZones);
        for (var i = 1; i <= numberOfZones; i++) {
            // Create zone button
            var zoneButton = document.createElement("button");
            zoneButton.textContent = "Zone " + i;
            zoneButton.className = "tablink";
            zoneButton.setAttribute("onclick", "openPage('Zone_" + i + "', this, '#0d95b4')");
            if (i == 1)
                zoneButton.id = "defaultOpen"; // Added to set the first zone as the default open tab
            tablinkContainer.appendChild(zoneButton);

            // Retrieve existing zone data from localStorage or create new if it doesn't exist
            var zoneData = JSON.parse(localStorage.getItem(`zone${i}`)) || {
                numberOfUnits: 0,
                descriptions: []
            };

            // Create zone content div
            var zoneContentDiv = document.createElement("div");
            zoneContentDiv.id = "Zone_" + i;
            zoneContentDiv.className = "tabcontent";
            zoneContentDiv.innerHTML = `
                <div id="unitInfo_${i}" class="unitInfo">
                    
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

                <div class="container">
                    <div class="box">
                        <canvas id="temperatureChart"></canvas>
                    </div>

                    <div class="box">
                        <canvas id="smokeChart"></canvas>
                    </div>

                    <div class="box">
                        <canvas id="rainChart"></canvas>
                    </div>
                    
                    <div class="box" id="">Image SlideShow</div>
                </div>
            `;
            tabContentContainer.appendChild(zoneContentDiv);

            // Populate unit table with descriptions
            populateUnitTableWithColorBoxes(i, zoneData.descriptions);

            // Save zone data to localStorage
            localStorage.setItem(`zone${i}`, JSON.stringify(zoneData));
        }

        // Get the element with id="defaultOpen" and click on it
        console.log("Triggering default open tab (top)");
        document.getElementById("defaultOpen").click();
    } else {
        alert("Please enter a valid number of zones: 1 to 13.");
    }
});

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

// Function to handle configuring units
function configureUnits(zoneNumber) {
    // Prompt the user to enter the number of units for the specific zone
    var numberOfUnits = prompt(`Please enter the number of units for Zone ${zoneNumber}:`, localStorage.getItem(`unitsForZone${zoneNumber}`) || "1");

    // Parse the number of units as an integer
    numberOfUnits = parseInt(numberOfUnits);

    // Retrieve existing zone data or create new if it doesn't exist
    var zoneData = JSON.parse(localStorage.getItem(`zone${zoneNumber}`)) || {
        numberOfUnits: 0,
        descriptions: []
    };

    // Validate if the input is a number and greater than or equal to 0
    if (!isNaN(numberOfUnits) && numberOfUnits >= 0 && numberOfUnits <= 5) {
        // Display the number of units in the zone content
        var unitInfoDiv = document.getElementById(`unitInfo_${zoneNumber}`);
        // unitInfoDiv.innerHTML = `<h1>Zone ${zoneNumber} | Number of Units: ${numberOfUnits}</h1>`; // Changed 'i' to 'zoneNumber'

        // Update zone data with the new number of units
        zoneData.numberOfUnits = numberOfUnits;

        // If the number of units is set to 0, clear descriptions
        if (numberOfUnits === 0) {
            zoneData.descriptions = [];
        } else if (numberOfUnits < zoneData.descriptions.length) {
            // If the new number of units is less than the existing number,
            // truncate the descriptions array accordingly
            zoneData.descriptions = zoneData.descriptions.slice(0, numberOfUnits);
        }

        // Predefined list of colors for the units (up to 5 units)
        var colors = ['#4567B7', '#6495ED', '#87A7B1', '#ACCBEA', '#C7D5F5'];

        // Update unit table with descriptions
        var descriptions = zoneData.descriptions;
        for (var i = descriptions.length; i < numberOfUnits; i++) {
            // Assign color from the predefined list
            var color = colors[i % colors.length];
            descriptions.push(color);
        }

        // Save updated zone data to localStorage
        localStorage.setItem(`zone${zoneNumber}`, JSON.stringify(zoneData));
        localStorage.setItem(`unitsForZone${zoneNumber}`, numberOfUnits);
        localStorage.setItem(`descriptionsForZone${zoneNumber}`, JSON.stringify(descriptions));

        // Populate unit table with color boxes
        populateUnitTableWithColorBoxes(zoneNumber, descriptions);

    } else {
        alert("Please enter a valid number of units: 0 to 5.");
    }
}

// Function to create zone buttons and content on page load
document.addEventListener('DOMContentLoaded', function () {
    // Check if numberOfZones is saved in localStorage
    var savedNumberOfZones = localStorage.getItem('numberOfZones');

    if (savedNumberOfZones !== null) {
        // Retrieve the number of zones from localStorage
        var numberOfZones = parseInt(savedNumberOfZones);

        // Add zone buttons and corresponding content based on the saved number of zones
        var tablinkContainer = document.querySelector(".tablink-container");
        var tabContentContainer = document.querySelector(".tabcontent-container");

        console.log("Adding zone buttons and content based on saved number of zones (bottom)", numberOfZones);
        for (var i = 1; i <= numberOfZones; i++) {
            // Create zone button
            var zoneButton = document.createElement("button");
            zoneButton.textContent = "Zone " + i;
            zoneButton.className = "tablink";
            zoneButton.setAttribute("onclick", "openPage('Zone_" + i + "', this, '#0d95b4')");
            if (i == 1)
                zoneButton.id = "defaultOpen"; // Added to set the first zone as the default open tab
            tablinkContainer.appendChild(zoneButton);

            // Retrieve the number of units for this zone from localStorage
            var numberOfUnits = parseInt(localStorage.getItem(`unitsForZone${i}`)) || 0;

            // Create zone content div
            var zoneContentDiv = document.createElement("div");
            zoneContentDiv.id = "Zone_" + i;
            zoneContentDiv.className = "tabcontent";
            zoneContentDiv.innerHTML = `
                <div id="unitInfo_${i}" class="unitInfo">
                    
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

                <div class="container">
                    <div class="box">
                        <canvas id="temperatureChart"></canvas>
                    </div>

                    <div class="box">
                        <canvas id="smokeChart"></canvas>
                    </div>

                    <div class="box">
                        <canvas id="rainChart"></canvas>
                    </div>
                    
                    <div class="box" id="">Image SlideShow</div>
                </div>
            `;
            tabContentContainer.appendChild(zoneContentDiv);

            // Populate unit table with color boxes
            var descriptions = JSON.parse(localStorage.getItem(`descriptionsForZone${i}`));
            populateUnitTableWithColorBoxes(i, descriptions);

            // Save the number of units to localStorage with default as 0
            localStorage.setItem(`unitsForZone${i}`, numberOfUnits);
        }

        // Get the element with id="defaultOpen" and click on it
        console.log("Triggering default open tab (bottom)");
        document.getElementById("defaultOpen").click();

        // Trigger click event for the first zone button (Zone 1)
        var firstZoneButton = document.querySelector(".tablink");
        if (firstZoneButton) {
            openPage('Zone_1', firstZoneButton, '#0d95b4', true); // Adjusted to trigger click event
        }

    }
});
