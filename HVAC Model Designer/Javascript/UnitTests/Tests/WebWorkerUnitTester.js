/**
 * Created by personal on 12/9/16.
 */
// Setup an event listener that will handle messages sent to the worker.
self.addEventListener('message', function(e) {
    if (e.data == "name") self.postMessage({type: 'name', data: name});
    if (e.data == "run") {
        //importScripts("/HVAC Model Designer/Javascript/Utility/Outside%20Libraries/three.min.js");
        importScripts("/HVAC Model Designer/Javascript/Utility/AnimationTimer.js");
        importScripts("/HVAC Model Designer/Javascript/Utility/Stopwatch.js");

        importScripts("/HVAC Model Designer/Javascript/HVACData/BuildingPlan.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/CornerPoint.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/FloorPlan.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/HVACData.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/HVACDataLoader.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/Point2D.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/Wall.js");
        importScripts("/HVAC Model Designer/Javascript/HVACData/Line2D.js");

        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Interface/FloorPicker.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Popovers/DoorPopover.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Popovers/LocationPopover.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Interface/StartOverPopover.js");
        importScripts("/HVAC Model Designer/Javascript/Utility/AdvancedMath.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Interface/WallDraw.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Interface/ViewMode/ViewMode3DController.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeCreate.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeDrag.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeEditCorner.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeEditPoint.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeView.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/LayoutModeDelete.js");
        importScripts("/HVAC Model Designer/Javascript/HVACApplication/Interface/Interface.js");
        //importScripts("/HVAC Model Designer/Javascript/Utility/WebGLCanvas.js");
        importScripts("/HVAC Model Designer/Javascript/Utility/Utility.js");

        run();
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
function end() {
    if (succeeded == false) {
        fail();
    } else success();
}