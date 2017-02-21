/**
 * Created by personal on 10/21/16.
 */

class HVACData {
    constructor() {
        this.version = "2";
        this.buildingList = [];
    }

//This function pushes the current building onto the building list
    addBuilding(building) {
        this.buildingList.push(building);
    }

//This function returns the current building list
    getBuildingList() {
        return this.buildingList;
    };

//This function returns the version of the program being used
    getVersion() {
        return this.version;
    }

//This function sets the version being used
    setVersion(version) {
        this.version = version;
    }

//This function takes the buildings from a building list and stores them in storage
    getHashmap() {
        var buildingMaps = [];
        for (var i in this.buildingList) {
            var building = this.buildingList[i];
            buildingMaps.push(building.getHashmap());
        }
        return {version: this.version, buildings: buildingMaps};
    }
}