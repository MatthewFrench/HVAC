/**
 * Created by Matt on 9/2/16.
 */
window.onload = main;

var myApp;
function main() {
    myApp = new HVACApplication();

    animationFrameTimer();
    document.body.onresize = windowResized;
}

function animationFrameTimer() {
    "use strict";
    window.requestAnimationFrame(animationFrameTimer);

    myApp.logic();
}

function windowResized() {
    "use strict";
    myApp.windowResized();
}