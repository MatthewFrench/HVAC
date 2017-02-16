/**
 * Created by matt on 9/30/16.
 * This JS file is an animation timer that is used to animate anything that is dynamically moved
 */
/*
 animationRunTimeSeconds - Length of the animation in seconds.
 frameUpdateCallback - Callback function that takes speed, passed milliseconds and finished decimal from 0.0 to 1.0
 */
class AnimationTimer {
    constructor(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback) {
        //Constructor
        this.self = self;
        this.animationRunTimeMilliseconds = animationRunTimeSeconds * 1000.0;
        this.frameUpdateCallback = frameUpdateCallback;
        this.finishedCallback = finishedCallback;
        this.finished = false;
        this.stopwatch = new Stopwatch();
    }

    process(speed) {
        if (this.finished == false) {
            this.frameUpdateCallback.call(this.self, speed, this.stopwatch.getMilliseconds() / this.animationRunTimeMilliseconds);
            if (this.stopwatch.getMilliseconds() >= this.animationRunTimeMilliseconds) {
                this.finished = true;
                this.finishedCallback.call(this.self);
            }
        }
    }

    isFinished() {
        return this.finished;
    }
    //Static functions and variables
    static get TimerList() {
        if (this.constructor.timerList == undefined) this.constructor.timerList = [];
        return this.constructor.timerList;
    }

    static StartTimer(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback) {
        var self = self;
        var animationTimer = new AnimationTimer(self, animationRunTimeSeconds, frameUpdateCallback, finishedCallback);
        AnimationTimer.TimerList.push(animationTimer);
        //Run once at 0 just so anything that needs drawn or placed will be
        animationTimer.process(0.0);
    }

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