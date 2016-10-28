/**
 * Created by Matt on 9/23/2016.
 */

//Initializes high-level variables.
HVACApplication.prototype.initViewModeVariables = function () {
    "use strict";

};

HVACApplication.prototype.showViewModeLayout = function () {

};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedViewModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedViewModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    if (this.mouseDown) {
        if (movedX < 0 && movedY < 0)
        {
            this.angle = incrementAngle(this.angle);
        }
        else if (movedX >= 0 && movedY >= 0)
        {
            this.angle = decrementAngle(this.angle);
        }
    }

};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedViewModeLayout = function () {
    "use strict";

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;
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

    ctx.rotate(convertToRadians(this.angle));

    ctx.translate(-canvasWidth/2, -canvasHeight/2);

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, false);
    }

    ctx.restore();
}