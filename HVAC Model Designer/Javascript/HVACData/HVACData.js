/**
 * Created by personal on 10/21/16.
 */

function HVACData() {
    "use strict";
    this.version = "2";
    this.buildingList = [];
}

HVACData.prototype.addBuilding = function(building) {
    "use strict";
    this.buildingList.push(building);
};

HVACData.prototype.getBuildingList = function() {
    "use strict";
    return this.buildingList;
}

HVACData.prototype.getVersion = function() {
    "use strict";
    return this.version;
};

HVACData.prototype.setVersion = function(version) {
    "use strict";
    this.version = version;
};

HVACData.prototype.getHashmap = function() {
    "use strict";
    var buildingMaps = [];
    for (var i in this.buildingList) {
        var building = this.buildingList[i];
        buildingMaps.push(building.getHashmap());
    }
    return {version: this.version, buildings: buildingMaps};
};