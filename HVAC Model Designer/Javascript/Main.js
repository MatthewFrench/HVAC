/**
 * Created by Matt on 9/2/16.
 *
 * This entire JS file finds out what the size of the window is and resizes if needed. It also autosaves the data
 * into internet browser cache for future usages.
 */
window.onload = main;

var myApp;

var lastFPSTime = 0;
var chosenFPS = 60.0;
var chosenFPSMilliseconds = 1000.0/chosenFPS;

/**
 * Initializes the overall program and resizes the interface based on the internet browser window.
 *
 * @constructor
 */
function main() {
    myApp = new HVACApplication();

    document.body.appendChild(myApp.getApplicationDiv());

    window.onunload = windowExit;

    setTimeout(autoSave, 40.0 * 1000.0);

    window.requestAnimationFrame(function() {
        requestFrameLoop();
    });
}


/**
 * Automatically saves the program after a certain period of time.
 */
function autoSave() {
    "use strict";
    myApp.saveData();
    setTimeout(autoSave, 10.0 * 1000.0);
}

/**
 * Updates the AnimationTimers by processing them for a certain period of time.
 *
 * @param speed: Length of the animation in seconds.
 */
function mainLogicTimer(speed) {
    AnimationTimer.ProcessTimers(speed);
    myApp.logic();
}

/**
 * Creates a frame loop that will allow visual updates of the program.
 *
 * @param time: Time interval between frame updates.
 */
function requestFrameLoop(time) {
    var delta = time - lastFPSTime;
    var speed = delta / chosenFPSMilliseconds;
    mainLogicTimer(speed);
    lastFPSTime = time;
    window.requestAnimationFrame(requestFrameLoop);
}
/**
 * If the internet browser window exits, need to save the data of the program to local storage then end program.
 *
 * @param e: Event of the internet browser window closing.
 */
function windowExit(e) {
    myApp.saveData();
}