/**
 * Created by matt on 10/7/16.
 *
 * This class keeps track of the time that passes.
 */

/**
 * This function creates new Stopwatch class
 *
 * @constructor
 */
function Stopwatch() {
    this.reset();
}

/**
 * This function resets the milliseconds to the current time.
 */
Stopwatch.prototype.reset = function() {
    this.startMilliseconds = Date.now();
};

/**
 * This function gets milliseconds.
 *
 * @return: Length of time passed in milliseconds.
 */
Stopwatch.prototype.getMilliseconds = function() {
    var currentMilliseconds = Date.now();
    return currentMilliseconds - this.startMilliseconds;
};

/**
 * This function gets seconds.
 *
 * @return: Length of time passed in seconds.
 */
Stopwatch.prototype.getSeconds = function() {
    var currentMilliseconds = Date.now();
    return (currentMilliseconds - this.startMilliseconds) / 1000.0;
};

/**
 * This function gets minutes.
 *
 * @return: Length of time passed in minutes.
 */
Stopwatch.prototype.getMinutes = function() {
    var currentMilliseconds = Date.now();
    return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0;
};

/**
 * This function gets hours.
 *
 * @return: Length of time passed in hours.
 */
Stopwatch.prototype.getHours = function() {
    var currentMilliseconds = Date.now();
    return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0 / 60.0;
};