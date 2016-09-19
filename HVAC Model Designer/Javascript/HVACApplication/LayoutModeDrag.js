/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.mousePressedDragModeLayout = function () {
    "use strict";
};

HVACApplication.prototype.mouseMovedDragModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    if (this.mouseDown) {
        this.dragPositionX -= movedX;
        this.dragPositionY -= movedY;
    }

};

HVACApplication.prototype.mouseReleasedDragModeLayout = function () {
    "use strict";


    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall != null) {
            this.currentCreateWall.x2 = canvasMouseX;
            this.currentCreateWall.y2 = canvasMouseY;

            snapWallToDecimalFromPoint1(this.currentCreateWall);

            var point = snapPointToWalls(this.currentCreateWall.x2,
                this.currentCreateWall.y2, this.wallList, [this.currentCreateWall]);
            this.currentCreateWall.x2 = point.x;
            this.currentCreateWall.y2 = point.y;

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestIncrement(this.currentCreateWall.x1, this.currentCreateWall.y1,
                    this.currentCreateWall.x2, this.currentCreateWall.y2, 45);
                this.currentCreateWall.x2 = line.x2;
                this.currentCreateWall.y2 = line.y2;
            }

            if (this.currentCreateWall.x1 == this.currentCreateWall.x2 &&
                this.currentCreateWall.y1 == this.currentCreateWall.y2) {
                this.wallList.splice(this.wallList.indexOf(this.currentCreateWall), 1);
            }

            this.currentCreateWall = null;
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            this.selectedWall = null;
        }
    }
};

HVACApplication.prototype.drawDragModeLayout = function () {
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

    ctx.restore();
}