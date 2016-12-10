/**
 * Created by personal on 12/9/16.
 */
// Setup an event listener that will handle messages sent to the worker.
self.addEventListener('message', function(e) {
    if (e.data == "name") self.postMessage({type: 'name', data: name});
    if (e.data == "run") {
        loadScript("/HVAC Model Designer/Javascript/Utility/Outside%20Libraries/three.min.js");
        loadScript("/HVAC Model Designer/Javascript/Utility/AnimationTimer.js");
        loadScript("/HVAC Model Designer/Javascript/Utility/Stopwatch.js");

        loadScript("/HVAC Model Designer/Javascript/HVACData/BuildingPlan.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/CornerPoint.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/FloorPlan.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/HVACData.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/HVACDataLoader.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/Point2D.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/Wall.js");
        loadScript("/HVAC Model Designer/Javascript/HVACData/Line2D.js");

        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Interface/FloorPicker.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Popovers/DoorPopover.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Popovers/LocationPopover.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Interface/StartOverPopover.js");
        loadScript("/HVAC Model Designer/Javascript/Utility/AdvancedMath.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Interface/WallDraw.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Interface/ViewMode/ViewMode3DController.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeCreate.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeDrag.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeEditCorner.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeEditPoint.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeView.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeDelete.js");
        loadScript("/HVAC Model Designer/Javascript/HVACApplication/Interface/Interface.js");
        loadScript("/HVAC Model Designer/Javascript/Utility/Utility.js");
        try {
            run();
        }
        catch(err) {
            console.log("Run error: " + err);
            succeeded = false;
            end();
        }
    }
}, false);
function success() {
    self.postMessage({type: 'outcome', data: true});
}
function fail() {
    self.postMessage({type: 'outcome', data: false});
}
var succeeded = true;
function assert(thing) {
    if (thing == false) succeeded = false;
}
function assertEqual(thing, thing2) {
    if (thing != thing2) {
        succeeded = false;
        console.log("Assert Not Equal: " + thing + " vs " + thing2);
    }
}
function end() {
    if (succeeded == false) {
        fail();
    } else success();
    close();
}
function loadScript(script) {
    var loaded = false;
    while(loaded == false) {
        loaded = true;
        try {
            importScripts(script);
        } catch(err) {
            loaded = false;
        }
    }
}