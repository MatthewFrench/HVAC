/**
 * Created by personal on 12/9/16.
 */
var self = this;
// Setup an event listener that will handle messages sent to the worker.
if (self.document === undefined) self.addEventListener('message', function(e) {
    if (e.data['command'] == "run") {
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

        loadScript("/HVAC Model Designer/"+e.data['url']);
        try {
            run();
        }
        catch(err) {
            console.log("Run error: " + err);
            console.log( err.stack )
            succeeded = false;
            end();
        }
    }
}, false);
function success() {
    if (self.document === undefined) self.postMessage({type: 'outcome', data: true});
    testResult = true;
}
function fail() {
    if (self.document === undefined) self.postMessage({type: 'outcome', data: false});
    testResult = false;
}
var succeeded = true;
var testResult = false;
function assert(thing) {
    if (thing == false) succeeded = false;
}
function assertEqual(thing, thing2) {
    if (thing != thing2) {
        succeeded = false;
        console.log("Assert Not Equal: " + thing + " vs " + thing2);
    }
}
function assertNotEqual(thing, thing2) {
    if (thing == thing2) {
        succeeded = false;
        console.log("Assert Equal: " + thing + " vs " + thing2);
    }
}
function assertGreaterThan(thing, thing2) {
    if (thing <= thing2) {
        succeeded = false;
        console.log("Assert Not Greater: " + thing + " vs " + thing2);
    }
}
function end() {
    if (succeeded == false) {
        fail();
    } else success();
    if (self.document === undefined) close();
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