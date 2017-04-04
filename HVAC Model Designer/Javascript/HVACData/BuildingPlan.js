/**
 * Created by personal on 10/21/16.
 *
 * This class handles each overall building project.
 */

/**
 * This function loads in the previous options, if any.
 *
 * @param options: The previous settings and layout.
 * @constructor
 */
class BuildingPlan {
    constructor({hvacData = null} = {}) {
        this.floorList = [];
        this.hvacData = hvacData;
        if (hvacData != null) this.hvacData.addBuilding(this);
    }

    /**
 * This function pushes the current floor to the list of floors.
 *
 * @param floor: The newly created floor being added to the project.
 */
    addFloor(floor) {
        this.floorList.push(floor);
    }

    putFloorAboveFloor(moveFloorIndex, toFloorIndex) {
        console.log("Moving Floor");
        var putAboveFloor = this.floorList[toFloorIndex];
        var movingFloor = this.floorList[moveFloorIndex];
        this.removeFloor(movingFloor);
        this.floorList.splice(this.floorList.indexOf(putAboveFloor)+1, 0, movingFloor);
    }

/**
 * This function obtain the list of floors.
 */
    getFloorList() {
        return this.floorList;
    }
/**
 * This function removes the current floor to the list of floors.
 *
 * @param floor: The selected floor that is being removed from the project.
 */
    removeFloor(floor) {
        this.floorList.splice(this.floorList.indexOf(floor), 1);
    }

/**
 * This function pushes the current list of floors to a storage.
 */
    getHashmap() {
        var floorMaps = [];
        for (var i in this.floorList) {
            var floor = this.floorList[i];
            floorMaps.push(floor.getHashmap());
        }
        return {floors: floorMaps};
    }
}