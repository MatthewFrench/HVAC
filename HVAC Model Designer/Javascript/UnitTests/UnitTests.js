/**
 * Created by personal on 12/9/16.
 */


window.onload = main;

var unitTests;
function main() {
    window.requestAnimationFrame(
        function () {
            unitTests = new UnitTests();
        });
    window.requestAnimationFrame(requestFrameLoop);
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
    window.requestAnimationFrame(requestFrameLoop);
}

function UnitTests() {
    this.titleDiv = CreateElement({type: 'div', class: 'UnitTest_TitleDiv', text: 'Unit Tests'});
    document.body.appendChild(this.titleDiv);

    this.testHolderDiv = CreateElement({type: 'div', class: 'UnitTest_TestHolderDiv'});
    document.body.appendChild(this.testHolderDiv);

    //Create progress bar
    this.progressBar = CreateElement({
        type: 'div', class: 'meter', elements: [
            this.progressBarSpan = CreateElement({type: 'span'})
        ]
    });
    this.progressBarSpan.style.width = "0%";
    this.progressBar.style.position = "absolute";
    this.progressBar.style.top = "calc(50vh - 20px);";
    this.progressBar.style.width = "calc(100% - 20px)";
    this.progressBar.style.marginTop = "5px";
    this.progressBar.style.left = "0px";
    document.body.appendChild(this.progressBar);

    this.progressBar.style.opacity = "0.0";
    AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
        this.progressBar.style.opacity = percent * percent + "";
    }, function () {
        this.progressBar.style.opacity = "1.0";


        var progressBarSpan = this.progressBarSpan;
        var progressBar = this.progressBar;

        this.unitTests = [];
        this.unitTestList = getUnitTestList();
        var names = 0;
        for (var i = 0; i < this.unitTestList.length; i++) {
            (function(i){
                var test = new UnitTestObject(this.unitTestList[i]);

                names++;

                var p =(names / this.unitTestList.length * 100.0);
                window.requestAnimationFrame( function() {
                    progressBarSpan.style.width = p + "%";
                });
                if (names == this.unitTestList.length) {
                    AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
                        progressBar.style.opacity = (1.0 - percent * percent) + "";
                    }, function () {
                        progressBar.style.opacity = "0.0";
                        //Run
                        this.testsToRun = this.unitTests.slice();
                        this.succeededNumber = 0;
                        this.failNumber = 0;
                        window.requestAnimationFrame(CreateFunction(this, this.run));
                    });
                }

                (function (test) {
                    window.requestAnimationFrame(CreateFunction(this, function () {
                        this.testHolderDiv.appendChild(test.getDiv());
                    }));
                }).call(this, test);
                this.unitTests.push(test);

                //});
            }.call(this, i));
        }
    });

    //

    //window.setTimeout(CreateFunction(unitTests, unitTests.run),1000);
}
UnitTests.prototype.runNextTest = function () {
    if (this.testsToRun.length > 0) {
        var test = this.testsToRun[0];
        this.testsToRun.splice(0, 1);
        if (test != undefined) test.run(CreateFunction(this, function (outcome) {
            AnimationTimer.StartTimer(this, 0.5, function (speed, percent) {
                var amount = 180.0 / 60.0;
                window.scrollBy(0, speed * amount);
            }, function () {

            });

            if (outcome == true) this.succeededNumber++;
            if (outcome == false) this.failNumber++;
            window.requestAnimationFrame(CreateFunction(this, this.runNextTest));
        }));
    } else {
        //Finished so show finish thing

        AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
            var amount = 100.0 / 60.0;
            window.scrollBy(0, speed * amount);
        }, function () {

        });


        this.testHolderDiv.appendChild(
            CreateElement({
                type: 'div',
                class: 'UnitTest_ResultDiv',
                text: "Tests Succeeded: " + this.succeededNumber + ", Failed: " + this.failNumber
            })
        );
    }
};

UnitTests.prototype.run = function () {
    setTimeout(CreateFunction(this, this.runNextTest), 1000);

    var height = window.innerHeight*3/4/1.8;
    var scrolled = 0;
    AnimationTimer.StartTimer(this, 5.0, function (speed, percent) {
        var amount = height / 5.0 / 60.0;
        scrolled += speed * amount;
        window.requestAnimationFrame(function() {window.scrollBy(0, speed * amount);});
    }, function () {
    });

    /*
    var body = document.body,
        html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var scrollLength = height;
    var scrollTime = 26.0 * this.unitTests.length / 50; //this.unitTests
    var slowStart = 0.25;


     AnimationTimer.StartTimer(this, scrollTime, function (speed, percent) {
     var scroll = scrollLength * percent;

     if (percent < slowStart) scroll = scrollLength * percent * (percent / slowStart);
     window.requestAnimationFrame(function() {window.scrollTo(0, scroll);});
     }, function () {

     });*/
};

function UnitTestObject(testData) {
    this.testData = testData;
    this.testURL = testData['url'];
    this.name = testData['name'];
    this.isWebWorker = testData['webworker'];
    this.div = CreateElement({
        type: 'div', class: 'UnitTestObject_Div', elements: [
            CreateElement({
                type: 'div', class: 'UnitTest_TestHolderLoaderDiv', elements: [
                    this.loader = CreateElement({type: 'div', class: 'loader'})
                ]
            }),
            this.text = CreateElement({type: 'div', text: '', class: 'UnitTestObject_Name', text: this.name})
        ]
    });
    this.div.style.opacity = "0.0";
    this.div.style.border = "solid 4px transparent";
    this.div.style.borderRadius = "8px";
    this.loader.style.visibility = "hidden";


    if (this.isWebWorker) {

        this.worker = new Worker("Javascript/UnitTests/Tests/WebWorkerUnitTester.js");
        // Setup an event listener that will handle messages received from the worker.
        this.worker.addEventListener('message', CreateFunction(this, function (e) {
            if (e.data.type == "outcome") {
                var outcome = e.data.data;
                this.setFinished(outcome);
            }
        }), false);

    }

}
UnitTestObject.prototype.run = function (callback) {
    AnimationTimer.StartTimer(this, 0.5, function (speed, percent) {
        this.div.style.opacity = percent * percent + "";
    }, function () {
        this.div.style.opacity = "1.0";
    });
    this.callback = callback;
    this.loader.style.visibility = "";
    this.div.style.border = "solid 4px black";

    if (this.isWebWorker) {
        this.worker.postMessage({command: "run", url: this.testURL});
    } else {
        var element = document.createElement("script");
        element.src = this.testURL;
        document.getElementsByTagName("head")[0].appendChild(element );

        element.onload = CreateFunction(this, function(){
            succeeded = true;
            testResult = false;

            run();

            this.setFinished(testResult);
        });
    }
};
UnitTestObject.prototype.setFinished = function(outcome) {
    window.requestAnimationFrame(CreateFunction(this, function () {
        this.div.style.border = "solid 4px transparent";
        this.loader.style.visibility = "hidden";

        if (outcome == true) {
            this.text.style.color = "green";
        } else {
            this.text.style.color = "red";
        }

        this.callback(outcome);
    }));
};
UnitTestObject.prototype.getDiv = function () {
    return this.div;
};