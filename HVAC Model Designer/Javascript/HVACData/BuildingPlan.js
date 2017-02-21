/**
 * Created by personal on 10/21/16.
 */


/**This function loads in the previous options, if any.*/
class BuildingPlan {
    constructor({hvacData = null} = {}) {
        this.floorList = [];
        this.hvacData = hvacData;
        if (hvacData != null) this.hvacData.addBuilding(this);
    }

    /**This function pushes the current floor to the list of floors*/
    addFloor(floor) {
        this.floorList.push(floor);
    }

    /**This function obtain the list of floors*/
    getFloorList() {
        return this.floorList;
    }

    /**This function removes the current floor to the list of floors*/
    removeFloor(floor) {
        this.floorList.splice(this.floorList.indexOf(floor), 1);
    }

    /**This function pushes the current list of floors to a storage*/
    getHashmap() {
        var floorMaps = [];
        for (var i in this.floorList) {
            var floor = this.floorList[i];
            floorMaps.push(floor.getHashmap());
        }
        return {floors: floorMaps};
    }
}