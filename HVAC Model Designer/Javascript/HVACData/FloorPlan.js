/**
 * Created by personal on 10/21/16.
 */

//This function loads the options (if any) and creates the current floor
function FloorPlan(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.wallList = [];
    this.buildingPlan = options['building'];
    this.buildingPlan.addFloor(this);
}

//This function gets the current building plan
FloorPlan.prototype.getBuilding = function() {
    "use strict";
    return this.buildingPlan;
};

//This function gets the list of walls
FloorPlan.prototype.getWallList = function() {
    "use strict";
    return this.wallList;
};

//This function pushes the newly-made wall onto the wall list
FloorPlan.prototype.addWall = function(wall) {
    "use strict";
    this.wallList.push(wall);
};

//This function removes the currently selected wall from the wall list
FloorPlan.prototype.removeWall = function(wall) {
    this.wallList.splice(this.wallList.indexOf(wall), 1);
};

//This function clears all walls from the wall list
FloorPlan.prototype.clearWalls = function() {
    this.wallList = [];
};

//This function pushes all created walls stored in the wall list onto storage
FloorPlan.prototype.getHashmap = function() {
    "use strict";
    var wallMaps = [];
        for (var i in this.wallList) {
            var wall = this.wallList[i];
        wallMaps.push(wall.getHashmap());
    }
    return {walls: wallMaps};
};