/**
 * Created by Matt on 9/23/2016.
 *
 * This class deals with user interaction with the canvas when the Delete Mode is selected.
 */

/**
 * Creates and initializes the Delete variable.
 */
HVACApplication.prototype.initDeleteModeVariables = function () {
    "use strict";
    this.highlightedDeleteWall = null;
};

/**
 * This function shows the Delete Mode Layout.
 */
HVACApplication.prototype.showDeleteModeLayout = function () {
    "use strict";
};

/**
 * Action taken for when the mouse is pressed down. Currently has no effect on anything by itself.
 */
HVACApplication.prototype.mousePressedDeleteModeLayout = function () {
    "use strict";
};

/**
 * When the mouse is moving, if it is within a certain distance of a wall, the wall gets highlighted.
 */
HVACApplication.prototype.mouseMovedDeleteModeLayout = function () {
    "use strict";
    this.highlightedDeleteWall = null;
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(),
            wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY
        );
        var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
        if (dist < 15) {
            this.highlightedDeleteWall = wall;
        }
    }
};

/**
 * When the mouse is released, if there is a wall that is highlighted, remove it.
 */
HVACApplication.prototype.mouseReleasedDeleteModeLayout = function () {
    "use strict";
    if (this.highlightedDeleteWall != null) {
        this.getCurrentFloorPlan().removeWall(this.highlightedDeleteWall);
        this.highlightedDeleteWall = null;
    }
};

/**
 * Redraws the display on the canvas.
 */
HVACApplication.prototype.drawDeleteModeLayout = function () {
    "use strict";
    var ctx = this.beginDraw();

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, wall == this.highlightedDeleteWall);
    }
    this.endDraw(ctx);
};