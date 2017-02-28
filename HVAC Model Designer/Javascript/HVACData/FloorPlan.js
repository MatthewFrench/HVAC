/**
 * Created by personal on 10/21/16.
 *
 * This class handles each floor of the current building project.
 */

/**
 * This function loads the options (if any) and creates the current floor.
 *
 * @param options: The previous settings and layout.
 * @constructor
 */
function FloorPlan(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.wallList = [];
    this.buildingPlan = options['building'];
    if (this.buildingPlan != undefined) this.buildingPlan.addFloor(this);
    this.floorName = "";
}

/**
 * This function gets the current building plan.
 *
 * @returns: The current building plan
 */
FloorPlan.prototype.getBuilding = function() {
    "use strict";
    return this.buildingPlan;
};

/**
 * This function gets the list of walls.
 *
 * @returns: the list of walls in this floor.
 */
FloorPlan.prototype.getWallList = function() {
    "use strict";
    return this.wallList;
};

/**
 * This function pushes the newly-made wall onto the wall list.
 *
 * @param wall: The newly created wall that is being added to the list of walls of the current floor.
 */
FloorPlan.prototype.addWall = function(wall) {
    "use strict";
    this.wallList.push(wall);
};

/**
 * This function removes the currently selected wall from the wall list.
 *
 * @param wall: The selected wall that is being removed from the list of walls of the current floor.
 */
FloorPlan.prototype.removeWall = function(wall) {
    this.wallList.splice(this.wallList.indexOf(wall), 1);
};

/**
 * This function clears all walls from the wall list.
 */
FloorPlan.prototype.clearWalls = function() {
    this.wallList = [];
};

/**
 * This function pushes all created walls stored in the wall list onto storage.
 *
 * @returns: list of walls in the current floor.
 */
FloorPlan.prototype.getHashmap = function() {
    "use strict";
    var wallMaps = [];
        for (var i in this.wallList) {
            var wall = this.wallList[i];
        wallMaps.push(wall.getHashmap());
    }
    return {walls: wallMaps};
};