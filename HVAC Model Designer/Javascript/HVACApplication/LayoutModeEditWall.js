/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initEditWallModeVariables = function () {
    "use strict";

    this.highlightedWall = null;
};

HVACApplication.prototype.mousePressedEditWallModeLayout = function () {
    "use strict";
};

HVACApplication.prototype.mouseMovedEditWallModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.highlightedWall = null;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (dist < 15) {
            this.highlightedWall = wall;
        }
    }
};

HVACApplication.prototype.mouseReleasedEditWallModeLayout = function () {
    "use strict";

};

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
        wall.draw(ctx, false);
    }

    if (this.highlightedWall != null) {
        this.highlightedWall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT
            && this.currentEditMode == EDIT_MODE_WALL);
    }

    ctx.restore();
}