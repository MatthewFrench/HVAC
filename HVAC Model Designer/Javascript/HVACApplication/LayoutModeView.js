/**
 * Created by Matt on 9/23/2016.
 */

//Initializes high-level variables.
HVACApplication.prototype.initViewModeVariables = function () {
    "use strict";

}

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedViewModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedViewModeLayout = function () {
    "use strict";

    if (this.mouseDown) {
        if (this.mouseMovedX < 0 && this.mouseMovedY < 0)
        {
            this.angle = incrementAngle(this.angle);
        }
        else if (this.mouseMovedX >= 0 && this.mouseMovedY >= 0)
        {
            this.angle = decrementAngle(this.angle);
        }
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

    ctx.rotate(convertToRadians(this.angle));

    ctx.translate(-canvasWidth/2, -canvasHeight/2);

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    ctx.restore();
}