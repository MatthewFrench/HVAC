/**
 * Created by personal on 10/21/16.
 *
 * This classes keeps track of the different building projects and the current version of the program.
 */

/**
 * This initializes the list of buildings and the current program version.
 *
 * @constructor
 */
function HVACData() {
    "use strict";
    this.version = "2";
    this.buildingList = [];
}

/**
 * This function pushes the current building onto the building list.
 *
 * @param building: The newly created building project.
 */
HVACData.prototype.addBuilding = function(building) {
    "use strict";
    this.buildingList.push(building);
};

/**
 * This function returns the current building list.
 *
 * @returns: The list of building projects.
 */
HVACData.prototype.getBuildingList = function() {
    "use strict";
    return this.buildingList;
};

/**
 * This function returns the version of the program being used.
 *
 * @returns: The version of the program being used.
 */
HVACData.prototype.getVersion = function() {
    "use strict";
    return this.version;
};

/**
 * This function sets the version being used.
 *
 * @param version: The new version number of the program.
 */
HVACData.prototype.setVersion = function(version) {
    "use strict";
    this.version = version;
};

/**
 * //This function takes the buildings from a building list and stores them in storage
 *
 * @returns: The current list of building projects and the current program version number.
 */
HVACData.prototype.getHashmap = function() {
    "use strict";
    var buildingMaps = [];
    for (var i in this.buildingList) {
        var building = this.buildingList[i];
        buildingMaps.push(building.getHashmap());
    }
    return {version: this.version, buildings: buildingMaps};
};