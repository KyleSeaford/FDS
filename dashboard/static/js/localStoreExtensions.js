const getStorageKeyNumberOfZones = () => {
    return "numberOfZones";
}

const getStorageKeyUnitColor = (zoneNumber, unitNumber) => {
    return `UnitColor_${zoneNumber}_${unitNumber}`;
}

const getStorageKeyUnitAddress = (zoneNumber, unitNumber) => {
    return `UnitAddress_${zoneNumber}_${unitNumber}`;
}

const getNumberOfZones = () => {
    return localStorage.getItem(getStorageKeyNumberOfZones());
}

const getNumberOfUnits = (zoneNumber) => {
    var zoneData = JSON.parse(localStorage.getItem(`zone${zoneNumber}`))
    return zoneData.numberOfUnits;
}

const getUnitColor = (zoneNumber, unitNumber) => {
    return localStorage.getItem(getStorageKeyUnitColor(zoneNumber, unitNumber));
}

const setUnitColor = (zoneNumber, unitNumber, color) => {
    localStorage.setItem(getStorageKeyUnitColor(zoneNumber, unitNumber), color);            
}

const removeUnitColor = (zoneNumber, unitNumber) => {
    localStorage.removeItem(getStorageKeyUnitColor(zoneNumber, unitNumber));
}

const getUnitAddress = (zoneNumber, unitNumber) => {
    return localStorage.getItem(getStorageKeyUnitAddress(zoneNumber, unitNumber));
}

const setUnitAddress = (zoneNumber, unitNumber, address) => {
    localStorage.setItem(getStorageKeyUnitAddress(zoneNumber, unitNumber), address); 
}

const removeUnitAddress = (zoneNumber, unitNumber) => {
    localStorage.removeItem(getStorageKeyUnitAddress(zoneNumber, unitNumber));
}

const removeUnits = (zoneNumber, newNumberOfUnits) => {
    console.log("removeUnits - Removing units from zone ", zoneNumber);

    const currentNumberOfUnits = getNumberOfUnits(zoneNumber);
    console.log(`removeUnits - Zone ${zoneNumber} currently has ${currentNumberOfUnits}`);

    if (newNumberOfUnits < currentNumberOfUnits) {
        for(let i = newNumberOfUnits; i < currentNumberOfUnits; i++){
            console.log("removeUnits - Removing unit ", i);
            removeUnitColor(zoneNumber, i);
            removeUnitAddress(zoneNumber, i);
        }
    }
}