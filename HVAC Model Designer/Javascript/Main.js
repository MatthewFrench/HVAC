/**
 * Created by Matt on 9/2/16.
 */
window.onload = main;

var myApp;
function main() {
    myApp = new HVACApplication();

    animationFrameTimer();
    document.body.onresize = windowResized;

    document.body.onkeydown = function(event) {
        "use strict";
        myApp.onKeydown(event);
    }
    document.body.onkeyup = function(event) {
        "use strict";
        myApp.onKeyup(event);
    }
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