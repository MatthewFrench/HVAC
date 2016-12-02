/**
 * Created by personal on 10/21/16.
 */


/**This function loads in the previous options, if any.*/
function BuildingPlan(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.floorList = [];
    this.hvacData = options['hvacData'];
    this.hvacData.addBuilding(this);
}

/**This function pushes the current floor to the list of floors*/
BuildingPlan.prototype.addFloor = function(floor) {
    "use strict";
    this.floorList.push(floor);
};

/**This function obtain the list of floors*/
BuildingPlan.prototype.getFloorList = function() {
    "use strict";
    return this.floorList;
};

/**This function removes the current floor to the list of floors*/
BuildingPlan.prototype.removeFloor = function(floor) {
    this.floorList.splice(this.floorList.indexOf(floor), 1);
};

/**This function pushes the current list of floors to a storage*/
BuildingPlan.prototype.getHashmap = function() {
    "use strict";
    var floorMaps = [];
        for (var i in this.floorList) {
            var floor = this.floorList[i];
        floorMaps.push(floor.getHashmap());
    }
    return {floors: floorMaps};
};