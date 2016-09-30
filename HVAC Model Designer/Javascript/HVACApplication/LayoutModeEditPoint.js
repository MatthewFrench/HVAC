/**
 * Created by Matt on 9/19/16.
 */

//Initializes high-level variables.
HVACApplication.prototype.initEditPointModeVariables = function () {
    "use strict";
    this.currentEditPointSelectedWall = null;
    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
    this.highlightedPoint = null;
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditPointModeLayout = function () {
    "use strict";
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    var closest = 25;
    var wallCloseness = closest;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, closest)) {
            var newClosest = Math.hypot(canvasMouseX - wall.x1, canvasMouseY - wall.y1);
            if (Math.round(closest) == Math.round(newClosest)) {
                var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
                var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
                if (dist < wallCloseness) {
                    wallCloseness = dist;
                    closest = newClosest;
                    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                    this.currentEditPointSelectedWall = wall;
                }
            } else if (newClosest < closest) {
                var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
                var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
                wallCloseness = dist;
                closest = newClosest;
                this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                this.currentEditPointSelectedWall = wall;
            }
        }
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, closest)) {
            var newClosest = Math.hypot(canvasMouseX - wall.x2, canvasMouseY - wall.y2);
            if (Math.round(closest) == Math.round(newClosest)) {
                var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
                var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
                if (dist < wallCloseness) {
                    wallCloseness = dist;
                    closest = newClosest;
                    this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                    this.currentEditPointSelectedWall = wall;
                }
            } else if (newClosest < closest) {
                var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
                var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
                wallCloseness = dist;
                closest = newClosest;
                this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                this.currentEditPointSelectedWall = wall;
            }
        }
    }
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedEditPointModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.highlightedPoint = null;
    var closest = 15;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (Math.round(dist) < Math.round(closest)) {
            closest = dist;
            this.highlightedPoint = wall;
        }
    }

    if (this.currentEditPointSelectedWall != null) {
        this.highlightedPoint = this.currentEditPointSelectedWall;
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

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedEditPointModeLayout = function () {
    "use strict";
    if (this.currentEditMode == EDIT_MODE_POINT) {
        this.currentEditPointSelectedWall = null;
    }
};

//Redraws the display on the canvas.
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
        wall.draw(ctx, wall == this.highlightedPoint);
    }

    if (this.currentEditPointSelectedWall != null) {
        this.currentEditPointSelectedWall.drawLength(ctx);
    }

    ctx.restore();
}