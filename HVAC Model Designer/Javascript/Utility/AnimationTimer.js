/**
 * Created by matt on 9/30/16.
 * This JS file is an animation timer that is used to animate anything that is dynamically moved
 */

class AnimationTimer {
/**
 * Creates and initializes the AnimationTimer and other variables.
 *
 * @param self: This own AnimationTimer.
 * @param animationRunTimeSeconds: Length of the animation in seconds.
 * @param frameUpdateCallback: Callback function that takes speed, passed milliseconds and finished decimal from 0.0 to 1.0
 * @param finishedCallback: Callback function that wraps up the frame updating.
 * @constructor
 */
    constructor(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback) {
        this.self = self;
        this.animationRunTimeMilliseconds = animationRunTimeSeconds * 1000.0;
        this.frameUpdateCallback = frameUpdateCallback;
        this.finishedCallback = finishedCallback;
        this.finished = false;
        this.stopwatch = new Stopwatch();
    }
/**
 * This function initiates the updating of the frame.
 *
 * @param speed: Length of the animation in seconds.
 */
    process(speed) {
        if (this.finished == false) {
            this.frameUpdateCallback.call(this.self, speed, this.stopwatch.getMilliseconds() / this.animationRunTimeMilliseconds);
            if (this.stopwatch.getMilliseconds() >= this.animationRunTimeMilliseconds) {
                this.finished = true;
                this.finishedCallback.call(this.self);
            }
        }
    }
/**
 * Checks to see if the process to update the AnimationTimer has been complete.
 *
 * @return: Boolean of if the process has finished.
 */
    isFinished() {
        return this.finished;
    }
    //Static functions and variables
    static get TimerList() {
        if (this.constructor.timerList == undefined) this.constructor.timerList = [];
        return this.constructor.timerList;
    }
/**
 * Creates new AnimationTimer to be the starting timer for updating frames.
 *
 * @param self: This own AnimationTimer
 * @param animationRunTimeSeconds: Length of the animation in seconds.
 * @param frameUpdateCallback: Callback function that takes speed, passed milliseconds and finished decimal from 0.0 to 1.0
 * @param finishedCallback: Callback function that wraps up the frame updating.
 */
    static StartTimer(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback) {
        var self = self;
        var animationTimer = new AnimationTimer(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback);
        AnimationTimer.TimerList.push(animationTimer);
        //Run once at 0 just so anything that needs drawn or placed will be
        animationTimer.process(0.0);
    }
/**
 * Creates new AnimationTimer that is used to delay the starting timer.
 *
 * @param self: This own AnimationTimer
 * @param animationDelay: Amount of time to delay animation in seconds.
 * @param animationRunTimeSeconds: Length of the animation in seconds.
 * @param frameUpdateCallback: Callback function that takes speed, passed milliseconds and finished decimal from 0.0 to 1.0
 * @param finishedCallback: Callback function that wraps up the frame updating.
 */
    static StartTimerDelayed(self, animationDelay, animationRunTimeSeconds, frameUpdateCallback, finishedCallback) {
        var self = self;

        var delayTimer = new AnimationTimer(self, animationDelay, function () {
        }, function () {
            var animationTimer = new AnimationTimer(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback);
            AnimationTimer.TimerList.push(animationTimer);
            //Run once at 0 just so anything that needs drawn or placed will be
            animationTimer.process(0.0);
        });
        AnimationTimer.TimerList.push(delayTimer);
    }
/**
 * Goes through each timer in the list and processes them.
 *
 * @param speed: Length of the animation in seconds.
 */
    static ProcessTimers(speed) {
        var completedOne = false;
        for (var i = 0; i < AnimationTimer.TimerList.length; i++) {
            var animationTimer = AnimationTimer.TimerList[i];
            animationTimer.process(speed);
            if (animationTimer.isFinished()) {
                AnimationTimer.TimerList.splice(i, 1);
                i--;
                completedOne = true;
            }
        }
        if (completedOne) AnimationTimer.ProcessTimers(0.0);
    }
}