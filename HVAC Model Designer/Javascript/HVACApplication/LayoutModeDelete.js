/**
 * Created by Matt on 9/23/2016.
 */

//Initializes high-level variables.
HVACApplication.prototype.initDeleteModeVariables = function () {
    "use strict";
    this.highlightedDeleteWall = null;
};

HVACApplication.prototype.showDeleteModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedDeleteModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedDeleteModeLayout = function () {
    "use strict";

    this.highlightedDeleteWall = null;
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
        var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
        if (dist < 15) {
            this.highlightedDeleteWall = wall;
        }
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedDeleteModeLayout = function () {
    "use strict";

    if (this.highlightedDeleteWall != null) {
        this.getCurrentFloorPlan().removeWall(this.highlightedDeleteWall);
        this.highlightedDeleteWall = null;
    }
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawDeleteModeLayout = function () {
    "use strict";
    var ctx = this.beginDraw();

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, wall == this.highlightedDeleteWall);
    }

    this.endDraw(ctx);
};