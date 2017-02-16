/**
 * Created by matt on 10/7/16.
 */

//This function is a constructor for the Stopwatch class
class Stopwatch {
    constructor() {
        this.reset();
    }

    //This function resets the milliseconds to the current time.
    reset() {
        this.startMilliseconds = Date.now();
    }

    //This function gets milliseconds
    getMilliseconds() {
        let currentMilliseconds = Date.now();
        return currentMilliseconds - this.startMilliseconds;
    }

    //This function gets seconds
    getSeconds() {
        let currentMilliseconds = Date.now();
        return (currentMilliseconds - this.startMilliseconds) / 1000.0;
    }

    //This function gets minutes
    getMinutes() {
        let currentMilliseconds = Date.now();
        return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0;
    }
    
    //This function gets hours
    getHours() {
        let currentMilliseconds = Date.now();
        return (currentMilliseconds - this.startMilliseconds) / 1000.0 / 60.0 / 60.0;
    }
}