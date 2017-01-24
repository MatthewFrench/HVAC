/**
 * Created by personal on 12/9/16.
 */
function run() {
    setTimeout(requestFrameLoop);

    var between = false;
    var finish = false;

    var finishFunction = function() {
        assert(between);
        assert(finish);
        end();
    };

    AnimationTimer.StartTimer(this, 0.5, function (speed, percent) {
        between = true;
    }, function () {
        finish = true;

        finishFunction();
    });

    setTimeout(finishFunction, 1000);
}

function mainLogicTimer(speed) {
    AnimationTimer.ProcessTimers(speed);
}
var lastFPSTime = 0;
var chosenFPS = 60.0;
var chosenFPSMilliseconds = 1000.0 / chosenFPS;
function requestFrameLoop(time) {
    var delta = time - lastFPSTime;
    var speed = delta / chosenFPSMilliseconds;
    mainLogicTimer(speed);
    lastFPSTime = time;
    setTimeout(requestFrameLoop);
}