/**
 * Created by personal on 12/9/16.
 */


window.onload = main;

var unitTests;
function main() {
    unitTests = new UnitTests();
    window.setTimeout(CreateFunction(unitTests, unitTests.run),500);
}

function UnitTests() {
    this.titleDiv = CreateElement({type: 'div', class: 'UnitTest_TitleDiv', text: 'Unit Tests'});
    document.body.appendChild(this.titleDiv);

    this.testHolderDiv = CreateElement({type: 'div', class: 'UnitTest_TestHolderDiv'});
    document.body.appendChild(this.testHolderDiv);

    this.unitTests = [];
    for (var i = 0; i < 50; i ++) {
        var test = new UnitTestObject('Javascript/UnitTests/Tests/AdvancedMath/IntersectionTest.js');
        this.testHolderDiv.appendChild(test.getDiv());
        this.unitTests.push(test);
    }

    this.testsToRun = this.unitTests.slice();
}
UnitTests.prototype.runNextTest = function() {
    console.log("Running next unit test");
    var test = this.testsToRun[0];

    test.run(CreateFunction(this, function(outcome) {
        console.log("Callback called");
        //Callback
        this.testsToRun.splice(0, 1);
        if (this.testsToRun.length > 0) setTimeout(CreateFunction(this, this.runNextTest));
    }));
};

UnitTests.prototype.run = function() {
    console.log("Starting run function");
    console.log("This: " + this);
    console.log("Run next text: " + this.runNextTest);
    setTimeout(CreateFunction(this, this.runNextTest));

    AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
        console.log("Scrolling");
        window.scrollBy(0, 1);
    }, function () {

    });
    console.log("Finished run function");
};

function UnitTestObject(testURL) {
    this.div = CreateElement({type: 'div', class: 'UnitTestObject_Div', text: 'Unit Test Object'});
    this.testURL = testURL;
}
UnitTestObject.prototype.run = function(callback) {
    console.log("Running test");
    var worker = new Worker(this.testURL);

    // Setup an event listener that will handle messages received from the worker.
    worker.addEventListener('message', function(e) {
        console.log("Test was successful");
        var outcome = e;
        callback(e);
    }, false);
};
UnitTestObject.prototype.getDiv = function() {
    return this.div;
};