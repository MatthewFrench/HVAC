/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initEditCornerModeVariables = function () {
    "use strict";
    this.currentEditCornerSelectedPoints = [];
    this.currentEditCornerSelectedWalls = [];
    this.highlightedCorner = null;
};

HVACApplication.prototype.mousePressedEditCornerModeLayout = function () {
    "use strict";
    //Select all points near the mouse and track all walls of those points
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.currentEditCornerSelectedPoints = [];
    this.currentEditCornerSelectedWalls = [];
    var searchArea = 15;

    //Need to keep track of points of walls

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, searchArea)) {
            //this.currentEditPointSelectedWall = wall;
        }
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, searchArea)) {
            //this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
            //this.currentEditPointSelectedWall = wall;
        }
    }
};

HVACApplication.prototype.mouseMovedEditCornerModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.highlightedCorner = null;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (dist < 15) {
            this.highlightedCorner = wall;
        }
    }
};

HVACApplication.prototype.mouseReleasedEditCornerModeLayout = function () {
    "use strict";

};

HVACApplication.prototype.drawEditCornerModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, false);
    }

    if (this.highlightedCorner != null) {
        this.highlightedCorner.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT
            && this.currentEditMode == EDIT_MODE_CORNER);
    }

    ctx.restore();
}