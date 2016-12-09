/**
 * Created by personal on 12/9/16.
 */


window.onload = main;

var unitTests;
function main() {
    unitTests = new UnitTests();
    window.setTimeout(CreateFunction(unitTests, unitTests.run),1000);
    window.requestAnimationFrame(requestFrameLoop);
}
function mainLogicTimer(speed) {
    AnimationTimer.ProcessTimers(speed);
}
var lastFPSTime = 0;
var chosenFPS = 60.0;
var chosenFPSMilliseconds = 1000.0/chosenFPS;
function requestFrameLoop(time) {
    var delta = time - lastFPSTime;
    var speed = delta / chosenFPSMilliseconds;
    mainLogicTimer(speed);
    lastFPSTime = time;
    window.requestAnimationFrame(requestFrameLoop);
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
    var test = this.testsToRun[0];
    this.testsToRun.splice(0, 1);
    if (test != undefined) test.run(CreateFunction(this, function(outcome) {
        //Callback
         if (this.testsToRun.length > 0) setTimeout(CreateFunction(this, this.runNextTest));
    }));
};

UnitTests.prototype.run = function() {
    setTimeout(CreateFunction(this, this.runNextTest));

    var body = document.body,
        html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    var scrollLength = height;
    var scrollTime = 15.0;
    AnimationTimer.StartTimer(this, scrollTime, function (speed, percent) {
        var scroll = scrollLength * percent;

        if (percent < 0.5) scroll = scrollLength * percent * (percent / 0.5);
        window.requestAnimationFrame(function() {window.scrollTo(0, scroll);});
    }, function () {

    });
};

function UnitTestObject(testURL) {
    this.div = CreateElement({type: 'div', class: 'UnitTestObject_Div', elements: [
        CreateElement({type: 'div', class: 'UnitTest_TestHolderLoaderDiv', elements: [
            this.loader = CreateElement({type: 'div', class: 'loader'})
        ]}),
        this.text = CreateElement({type: 'div', text: '', class: 'UnitTestObject_Name'})
    ]});
    this.div.style.border = "solid 4px transparent";
    this.div.style.borderRadius = "8px";
    this.loader.style.visibility = "hidden";


    this.testURL = testURL;
    this.worker = new Worker(this.testURL);
    // Setup an event listener that will handle messages received from the worker.
    this.worker.addEventListener('message', CreateFunction(this, function(e) {
        if (e.data.type == "name") {
            this.text.innerHTML = e.data.data;
        } else if (e.data.type == "outcome") {
            var outcome = e.data.data;
            setTimeout( CreateFunction(this, function() {
                this.div.style.border = "solid 4px transparent";
                this.loader.style.visibility = "hidden";

                if (outcome == true) {
                    this.text.style.color = "green";
                } else {
                    this.text.style.color = "red";
                }

                this.callback(e);
            }), 250);
        }
    }), false);
    this.worker.postMessage("name");
}
UnitTestObject.prototype.run = function(callback) {
    this.callback = callback;
    this.loader.style.visibility = "";
    this.div.style.border = "solid 4px black";

    this.worker.postMessage("run");
};
UnitTestObject.prototype.getDiv = function() {
    return this.div;
};