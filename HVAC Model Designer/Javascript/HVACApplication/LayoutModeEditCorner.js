/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initEditCornerModeVariables = function () {
    "use strict";
    this.currentEditCornerSelectedPoints = [];
    this.currentEditCornerSelectedWalls = [];
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
        wall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT);
    }

    ctx.restore();
}