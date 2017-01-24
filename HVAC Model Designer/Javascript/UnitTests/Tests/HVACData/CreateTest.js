/**
 * Created by personal on 12/9/16.
 */
function run() {

    var newHVACData = new HVACData();
    var building = new BuildingPlan({hvacData: newHVACData});
    var floor = new FloorPlan({building: building});

    assertEqual(newHVACData.buildingList.length, 1);
    assertEqual(building.floorList.length, 1);
    assertEqual(floor.wallList.length, 0);

    end();
}