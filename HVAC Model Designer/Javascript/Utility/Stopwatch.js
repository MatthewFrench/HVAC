/**
 * Created by matt on 10/7/16.
 *
 * This class keeps track of the time that passes.
 */
class Stopwatch {
/**
 * This function creates new Stopwatch class
 *
 * @constructor
 */
    constructor() {
        this.reset();
    }

/**
 * This function resets the milliseconds to the current time.
 */
    reset() {
        this.startMilliseconds = window.performance.now();
    }

/**
 * This function gets milliseconds.
 *
 * @return: Length of time passed in milliseconds.
 */
    getMilliseconds() {
        let currentMilliseconds = window.performance.now();
        return currentMilliseconds - this.startMilliseconds;
    }

/**
 * This function gets seconds.
 *
 * @return: Length of time passed in seconds.
 */
    getSeconds() {
        let currentMilliseconds = window.performance.now();
        return (currentMilliseconds - this.startMilliseconds) / 1000.0;
    }

/**
 * This function gets minutes.
 *
 * @return: Length of time passed in minutes.
 */
    getMinutes() {
        let currentMilliseconds = window.performance.now();
        return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0;
    }
    
/**
 * This function gets hours.
 *
 * @return: Length of time passed in hours.
 */
    getHours() {
        let currentMilliseconds = window.performance.now();
        return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0 / 60.0;
    }
}
