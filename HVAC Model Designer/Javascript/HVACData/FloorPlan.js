/**
 * Created by personal on 10/21/16.
 */

//This function loads the options (if any) and creates the current floor
class FloorPlan {
    constructor({building = null} = {}) {
        this.wallList = [];
        this.buildingPlan = building;
        if (this.buildingPlan != null) this.buildingPlan.addFloor(this);
    }

//This function gets the current building plan
    getBuilding() {
        return this.buildingPlan;
    }

//This function gets the list of walls
    getWallList() {
        return this.wallList;
    }

//This function pushes the newly-made wall onto the wall list
    addWall(wall) {
        this.wallList.push(wall);
    }

//This function removes the currently selected wall from the wall list
    removeWall(wall) {
        this.wallList.splice(this.wallList.indexOf(wall), 1);
    }

//This function clears all walls from the wall list
    clearWalls() {
        this.wallList = [];
    }

//This function pushes all created walls stored in the wall list onto storage
    getHashmap() {
        var wallMaps = [];
        for (var i in this.wallList) {
            var wall = this.wallList[i];
            wallMaps.push(wall.getHashmap());
        }
        return {walls: wallMaps};
    }
}