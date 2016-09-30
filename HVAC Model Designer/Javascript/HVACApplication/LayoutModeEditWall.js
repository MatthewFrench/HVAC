/**
 * Created by Matt on 9/19/16.
 */

//Initializes high-level variables.
HVACApplication.prototype.initEditWallModeVariables = function () {
    "use strict";

    this.highlightedWall = null;
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditWallModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedEditWallModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.highlightedWall = null;
    var closest = 15;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (dist < closest) {
            closest = dist;
            this.highlightedWall = wall;
        }
    }

    //TO DO: Need to implement editing walls which includes what is highlighted
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedEditWallModeLayout = function () {
    "use strict";

};

//Redraws the display on the canvas.
HVACApplication.prototype.drawEditWallModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, wall == this.highlightedWall);
    }

    ctx.restore();
}