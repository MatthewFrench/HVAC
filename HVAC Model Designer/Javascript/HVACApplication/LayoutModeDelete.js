/**
 * Created by Matt on 9/23/2016.
 */

//Initializes high-level variables.
HVACApplication.prototype.initDeleteModeVariables = function () {
    "use strict";
    this.highlightedDeleteWall = null;
}

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedDeleteModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedDeleteModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.highlightedDeleteWall = null;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (dist < 15) {
            this.highlightedDeleteWall = wall;
        }
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedDeleteModeLayout = function () {
    "use strict";


    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    if (this.highlightedDeleteWall != null) {
        this.wallList.splice(this.wallList.indexOf(this.highlightedDeleteWall), 1);
        this.highlightedDeleteWall = null;
    }
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawDeleteModeLayout = function () {
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

    if (this.highlightedDeleteWall != null) {
        this.highlightedDeleteWall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL);
    }

    ctx.restore();
}