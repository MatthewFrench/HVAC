/**
 * Created by personal on 12/9/16.
 */
function run() {
    var simulationDiv = UnitTests.setUpSimulationDiv();

    var app = new HVACApplication();
    assert(app != null);

    //Set app into test data so it doesn't get removed
    var data = UnitTests.getTestData();
    data.app = app;

    //Add app to simulation div to show it on screen
    simulationDiv.appendChild(app.getApplicationDiv());

    //Simulate draw loop
    var logicLoop;
    var ranLogic = false;
    logicLoop = function(t) {
        app.logic();
        ranLogic = true;
        window.requestAnimationFrame(logicLoop);
    };
    logicLoop();

    //Set events
    var windowResized = function() {
        app.windowResized();
    };

    simulationDiv.onresize = windowResized;
    simulationDiv.onkeydown = function(event) {
        "use strict";
        app.onKeydown(event);
    };
    simulationDiv.onkeyup = function(event) {
        "use strict";
        app.onKeyup(event);
    };

    app.windowResized();

    setTimeout(function(){
        assertEqual(ranLogic, true);
        end();
    }, 2000);
}