/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initEditPointModeVariables = function () {
    "use strict";
    this.currentEditPointSelectedWall = null;
    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
};

HVACApplication.prototype.mousePressedEditPointModeLayout = function () {
    "use strict";
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    var closest = 25;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, closest)) {
            closest = Math.hypot(canvasMouseX - wall.x1, canvasMouseY - wall.y1);
            this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
            this.currentEditPointSelectedWall = wall;
        }
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, closest)) {
            closest = Math.hypot(canvasMouseX - wall.x2, canvasMouseY - wall.y2);
            this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
            this.currentEditPointSelectedWall = wall;
        }
    }
};

HVACApplication.prototype.mouseMovedEditPointModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;


    if (this.currentEditPointSelectedWall != null) {
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
            this.currentEditPointSelectedWall.x1 = canvasMouseX;
            this.currentEditPointSelectedWall.y1 = canvasMouseY;

            snapWallToDecimalFromPoint2(this.currentEditPointSelectedWall);

            //Auto snap
            var point = snapPointToWalls(this.currentEditPointSelectedWall.x1,
                this.currentEditPointSelectedWall.y1, this.wallList, [this.currentEditPointSelectedWall]);
            this.currentEditPointSelectedWall.x1 = point.x;
            this.currentEditPointSelectedWall.y1 = point.y;

            if (this.shiftPressed) {
                var line = getLinePoint1SnappedToNearestIncrement(this.currentEditPointSelectedWall.x1, this.currentEditPointSelectedWall.y1,
                    this.currentEditPointSelectedWall.x2, this.currentEditPointSelectedWall.y2, 45);
                this.currentEditPointSelectedWall.x1 = line.x1;
                this.currentEditPointSelectedWall.y1 = line.y1;
            }

        }
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_TWO) {
            this.currentEditPointSelectedWall.x2 = canvasMouseX;
            this.currentEditPointSelectedWall.y2 = canvasMouseY;

            snapWallToDecimalFromPoint1(this.currentEditPointSelectedWall);

            //Auto snap
            var point = snapPointToWalls(this.currentEditPointSelectedWall.x2,
                this.currentEditPointSelectedWall.y2, this.wallList, [this.currentEditPointSelectedWall]);
            this.currentEditPointSelectedWall.x2 = point.x;
            this.currentEditPointSelectedWall.y2 = point.y;

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestIncrement(this.currentEditPointSelectedWall.x1, this.currentEditPointSelectedWall.y1,
                    this.currentEditPointSelectedWall.x2, this.currentEditPointSelectedWall.y2, 45);
                this.currentEditPointSelectedWall.x2 = line.x2;
                this.currentEditPointSelectedWall.y2 = line.y2;
            }

        }
    } else {
        if (this.mouseDown) {
            this.dragPositionX -= movedX;
            this.dragPositionY -= movedY;
        }
    }
};

HVACApplication.prototype.mouseReleasedEditPointModeLayout = function () {
    "use strict";
    if (this.currentEditMode == EDIT_MODE_POINT) {
        this.currentEditPointSelectedWall = null;
    }
};

HVACApplication.prototype.drawEditPointModeLayout = function () {
    "use strict";

    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    var closePointArray = [];
    closePointArray.push(new Point2D(this.currentMouseX, this.currentMouseY));
    if (this.currentEditPointSelectedWall != null) {
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
            closePointArray.push(new Point2D(this.currentEditPointSelectedWall.x1, this.currentEditPointSelectedWall.y1));
        }
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_TWO) {
            closePointArray.push(new Point2D(this.currentEditPointSelectedWall.x2, this.currentEditPointSelectedWall.y2));
        }
    }

    if (this.currentEditPointSelectedWall != null) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }
    }

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT);
    }

    if (this.currentEditPointSelectedWall != null) {
        this.currentEditPointSelectedWall.drawLength(ctx);
    }

    ctx.restore();
}