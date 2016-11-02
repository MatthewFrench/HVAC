/**
 * Created by Matt on 9/19/16.
 */

//Initializes high-level variables.
HVACApplication.prototype.initDragModeVariables = function () {
    "use strict";
};

HVACApplication.prototype.showDragModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedDragModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedDragModeLayout = function () {
    "use strict";

    if (this.mouseDown) {

        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.setPoint1X(wall.getPoint1X() - this.mouseMovedX);
            wall.setPoint2X(wall.getPoint2X() - this.mouseMovedX);
            wall.setPoint1Y(wall.getPoint1Y() - this.mouseMovedY);
            wall.setPoint2Y(wall.getPoint2Y() - this.mouseMovedY);
        }

    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedDragModeLayout = function () {
    "use strict";

};

//Redraws the display on the canvas.
HVACApplication.prototype.drawDragModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    ctx.restore();
};