/**
 * Created by personal on 10/21/16.
 */

function HVACData() {
    "use strict";
    this.version = "2";
    this.buildingList = [];
}

//This function pushes the current building onto the building list
HVACData.prototype.addBuilding = function(building) {
    "use strict";
    this.buildingList.push(building);
};

//This function returns the current building list
HVACData.prototype.getBuildingList = function() {
    "use strict";
    return this.buildingList;
};

//This function returns the version of the program being used
HVACData.prototype.getVersion = function() {
    "use strict";
    return this.version;
};

//This function sets the version being used
HVACData.prototype.setVersion = function(version) {
    "use strict";
    this.version = version;
};

//This function takes the buildings from a building list and stores them in storage
HVACData.prototype.getHashmap = function() {
    "use strict";
    var buildingMaps = [];
    for (var i in this.buildingList) {
        var building = this.buildingList[i];
        buildingMaps.push(building.getHashmap());
    }
    return {version: this.version, buildings: buildingMaps};
};