/**
 * Created by personal on 10/21/16.
 */

function HVACDataLoader(){
    "use strict";

}

HVACDataLoader.getHVACData = function() {
    "use strict";
    var hvacDataMap = JSON.parse(window.localStorage.getItem("HVACData"));
    if (hvacDataMap != null) {

        switch (hvacDataMap["Version"]) {
            case 1: {
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
                for (var i = 0; i < wallDataArray.length; i++) {
                    var wall = new Wall({
                        point1: new CornerPoint({x: wallData["x1"], y:wallData["y1"]}),
                        point2: new CornerPoint({x: wallData["x2"], y:wallData["y2"]}),
                        floor: floor
                    });
                }
                return hvacData;
            } break;
            case 2: {
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
                for (var buildingMap in hvac['buildings']) {
                    var building = new BuildingPlan({hvacData: hvacData});
                    for (var floorMap in building['floors']) {
                        var floor = new FloorPlan({building: building});
                        for (var wallMap in floorMap['walls']) {
                            var wall = new Wall({
                                point1: new CornerPoint({x: wallMap["point1"]['x'], y:wallMap["point1"]['y']}),
                                point2: new CornerPoint({x: wallMap["point2"]['x'], y:wallMap["point2"]['y']}),
                                floor: floor
                            });
                        }
                    }
                }
            } break;
        }
    }
};