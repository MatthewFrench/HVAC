/**
 * Created by personal on 10/21/16.
 */

function FloorPlan(options) {
    "use strict";
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

FloorPlan.prototype.getHashmap = function() {
    "use strict";
    var wallMaps = [];
    for (var wall in this.wallList) {
        wallMaps.push(wall.getHashmap());
    }
    return {walls: wallMaps};
};