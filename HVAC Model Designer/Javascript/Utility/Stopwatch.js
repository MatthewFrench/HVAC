/**
 * Created by matt on 10/7/16.
 */

function Stopwatch() {
    this.reset();
}

Stopwatch.prototype.reset = function() {
    this.startMilliseconds = Date.now();
};

Stopwatch.prototype.getMilliseconds = function() {
    var currentMilliseconds = Date.now();
    return currentMilliseconds - this.startMilliseconds;
};

Stopwatch.prototype.getSeconds = function() {
    var currentMilliseconds = Date.now();
    return (currentMilliseconds - this.startMilliseconds) / 1000.0;
};

Stopwatch.prototype.getMinutes = function() {
    var currentMilliseconds = Date.now();
    return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0;
};

Stopwatch.prototype.getHours = function() {
    var currentMilliseconds = Date.now();
    return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0 / 60.0;
};