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

    window.onunload = windowExit;

    setTimeout(autoSave, 40.0 * 1000.0);

    window.requestAnimationFrame(function() {
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
    mainLogicTimer(speed);
    lastFPSTime = time;
    window.requestAnimationFrame(requestFrameLoop);
}
function windowExit(e) {
    myApp.saveData();
}