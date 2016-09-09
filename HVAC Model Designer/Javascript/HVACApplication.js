/**
 * Created by Matt on 9/9/16.
 */

//Constructor
var HVACApplication = function () {
    this.createUI();

    //Create webgl canvas
    /*
    canvas = document.createElement('canvas');
    canvas.className = "WebGLCanvas";
    document.body.appendChild(canvas);

    initializeWebGL();
    */
};

HVACApplication.prototype.createUI = function() {
    var myBannerDiv = document.createElement("div");
    myBannerDiv.className = "myBannerDiv";
    document.body.append(myBannerDiv);

    var titleSpan = document.createElement("span");
    titleSpan.className = "TopTitle";
    titleSpan.innerText = "HVAC Model Designer";
    document.body.appendChild(titleSpan);

};