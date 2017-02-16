/**
 * Created by personal on 10/21/16.
 */

//This function is a constructor needed for a static class
function HVACDataLoader(){
    "use strict";

}

//This functions loads up (and stores) the HVAC Data from the application based on version
HVACDataLoader.getHVACData = function() {
    "use strict";
    var hvacDataMap = JSON.parse(window.localStorage.getItem("HVACData"));
    if (hvacDataMap != null) {
        if ("Version" in hvacDataMap) hvacDataMap["version"] = hvacDataMap["Version"];

        switch (hvacDataMap["version"]) {
            case "1": {
                //Format
                //  Hashmap
                //      "Version" => number
                //      "Walls" => array
                //          [Hashmap]
                //              "x1" => number
                //              "y1" => number
                //              "x2" => number
                //              "y2" => number
                var hvacData = new HVACData();
                var building = new BuildingPlan({hvacData: hvacData});
                var floor = new FloorPlan({building: building});
                var wallDataArray = hvacDataMap["Walls"];
                for (var wallIndex = 0; i < wallDataArray.length; i++) {
                    var wallMap = wallDataArray[wallIndex];
                    var x1 = wallMap["x1"];
                    var y1 = wallMap["y1"];
                    var x2 = wallMap["x2"];
                    var y2 = wallMap["y2"];
                    if (x1 == undefined || y1 == undefined || x2 == undefined || y2 == undefined) continue;
                    var wall = new Wall({
                        point1: new CornerPoint({x: x1, y: y1}),
                        point2: new CornerPoint({x: x2, y: y2}),
                        floor: floor
                    });
                }
                return hvacData;
            } break;
            case "2": {
                //Format
                //  Hashmap
                //      "version" => number
                //      "buildings" => array map
                //          "floors" => array map
                //              "walls" => array map
                //                  "point1" => map
                //                      "x" => number
                //                      "y" => number
                //                  "point2" => map
                //                      "x" => number
                //                      "y" => number
                var hvacData = new HVACData();
                for (var buildingIndex in hvacDataMap['buildings']) {
                    var buildingMap = hvacDataMap['buildings'][buildingIndex];
                    var building = new BuildingPlan({hvacData: hvacData});
                    for (var floorIndex in buildingMap['floors']) {
                        var floorMap = buildingMap['floors'][floorIndex];
                        var floor = new FloorPlan({building: building});
                        for (var wallIndex in floorMap['walls']) {
                            var wallMap = floorMap['walls'][wallIndex];
                            var x1 = wallMap["point1"]['x'];
                            var y1 = wallMap["point1"]['y'];
                            var x2 = wallMap["point2"]['x'];
                            var y2 = wallMap["point2"]['y'];
                            if (x1 == undefined || y1 == undefined || x2 == undefined || y2 == undefined) continue;
                            var wall = new Wall({
                                point1: new CornerPoint({x: x1, y: y1}),
                                point2: new CornerPoint({x: x2, y: y2}),
                                floor: floor
                            });
                        }
                    }
                }
                return hvacData;
            } break;
            default: {
                var newHVACData = new HVACData();
                var building = new BuildingPlan({hvacData: newHVACData});
                var floor = new FloorPlan({building: building});
                return newHVACData;
            }
        }
    } else {
        var newHVACData = new HVACData();
        var building = new BuildingPlan({hvacData: newHVACData});
        var floor = new FloorPlan({building: building});
        return newHVACData;
    }
};