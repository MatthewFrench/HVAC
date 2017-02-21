/**
 * Created by Matt on 9/2/16.
 * This entire JS file finds out what the size of the window is and resizes if needed. It also autosaves the data
 * into internet browser cache for future usages.
 */
window.onload = main;

var myApp;

var lastFPSTime = 0;
var chosenFPS = 60.0;
var chosenFPSMilliseconds = 1000.0/chosenFPS;

function main() {
    myApp = new HVACApplication();

    document.body.appendChild(myApp.getApplicationDiv());

    /*
    document.body.onresize = windowResized;

    document.body.onkeydown = function(event) {
        "use strict";
        myApp.onKeydown(event);
    }
    document.body.onkeyup = function(event) {
        "use strict";
        myApp.onKeyup(event);
    }
    */

    window.onunload = windowExit;

    setTimeout(autoSave, 40.0 * 1000.0);

    window.requestAnimationFrame(function() {
        //windowResized();
        requestFrameLoop();
    });
}

function autoSave() {
    "use strict";
    myApp.saveData();
    setTimeout(autoSave, 10.0 * 1000.0);
}

function mainLogicTimer(speed) {
    AnimationTimer.ProcessTimers(speed);
    myApp.logic();
}
function requestFrameLoop(time) {
    var delta = time - lastFPSTime;
    var speed = delta / chosenFPSMilliseconds;
    //while (speed > 1.9) {
    //    speed -= 1.0;
    //    mainLogicTimer(1.0);
    //}
    mainLogicTimer(speed);
    lastFPSTime = time;
    window.requestAnimationFrame(requestFrameLoop);
}
/*
function windowResized() {
    "use strict";
    myApp.windowResized();
}
*/
function windowExit(e) {
    myApp.saveData();
}