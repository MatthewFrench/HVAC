/**
 * Created by personal on 10/21/16.
 */

function FloorPlan(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.wallList = [];
    this.buildingPlan = options['building'];
    this.buildingPlan.addFloor(this);
}

FloorPlan.prototype.getBuilding = function() {
    "use strict";
    return this.buildingPlan;
};

FloorPlan.prototype.getWallList = function() {
    "use strict";
    return this.wallList;
};

FloorPlan.prototype.addWall = function(wall) {
    "use strict";
    this.wallList.push(wall);
};

FloorPlan.prototype.removeWall = function(wall) {
    this.wallList.splice(this.wallList.indexOf(wall), 1);
};

FloorPlan.prototype.clearWalls = function() {
    this.wallList = [];
};

FloorPlan.prototype.getHashmap = function() {
    "use strict";
    var wallMaps = [];
        for (var i in this.wallList) {
            var wall = this.wallList[i];
        wallMaps.push(wall.getHashmap());
    }
    return {walls: wallMaps};
};