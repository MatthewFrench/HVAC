/**
 * Created by personal on 10/21/16.
 */

function BuildingPlan(options) {
    "use strict";
    this.floorList = [];
    this.hvacData = options['hvacData'];
    this.hvacData.addBuilding(this);
}

BuildingPlan.prototype.addFloor = function(floor) {
    "use strict";
    this.floorList.push(floor);
};

BuildingPlan.prototype.getFloorList = function() {
    "use strict";
    return this.floorList;
}

BuildingPlan.prototype.getHashmap = function() {
    "use strict";
    var floorMaps = [];
    for (var floor in this.floorList) {
        floorMaps.push(floor.getHashmap());
    }
    return {floors: floorMaps};
};