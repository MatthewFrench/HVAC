/**
 * Created by personal on 10/21/16.
 */

function BuildingPlan(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
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
        for (var i in this.floorList) {
            var floor = this.floorList[i];
        floorMaps.push(floor.getHashmap());
    }
    return {floors: floorMaps};
};