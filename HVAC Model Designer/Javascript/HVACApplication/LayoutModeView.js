/**
 * Created by Matt on 9/23/2016.
 */

//Initializes high-level variables.
HVACApplication.prototype.initViewModeVariables = function () {
    "use strict";
};

HVACApplication.prototype.showViewModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedViewModeLayout = function () {
    "use strict";
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;
    this.mouseAngle = Math.atan2(this.canvasMouseX - canvasWidth/2, this.canvasMouseY - canvasHeight/2);
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedViewModeLayout = function () {
    "use strict";

    //{ 1, 1 } =
    //{ 1, -1 } =


    if (this.mouseDown) {
        var canvasWidth = this.layoutCanvas.width;
        var canvasHeight = this.layoutCanvas.height;
        var newMouseAngle = Math.atan2(this.canvasMouseX - canvasWidth/2, this.canvasMouseY - canvasHeight/2);
        this.viewAngle -= (newMouseAngle - this.mouseAngle) * 180 / Math.PI;;
        this.mouseAngle = newMouseAngle;
    }

};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedViewModeLayout = function () {
    "use strict";
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawViewModeLayout = function () {
    "use strict";

    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(canvasWidth/2, canvasHeight/2);

    ctx.rotate(convertToRadians(this.viewAngle));

    ctx.translate(-canvasWidth/2, -canvasHeight/2);

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    ctx.restore();
}