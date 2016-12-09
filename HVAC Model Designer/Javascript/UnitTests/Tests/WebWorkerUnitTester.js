/**
 * Created by personal on 12/9/16.
 */

importScripts("../WebWorkerUnitTester.js");

// Setup an event listener that will handle messages sent to the worker.
self.addEventListener('message', function(e) {
    if (e.data == "name") self.postMessage({type: 'name', data: name});
    if (e.data == "run") run()
}, false);
function success() {
    self.postMessage({type: 'outcome', data: true});
}
function fail() {
    self.postMessage({type: 'outcome', data: false});
}
var succeeded = true;
function assert(thing) {
    if (thing == false) succeeded = false;
}
function end() {
    if (succeeded == false) {
        fail();
    } else success();
}