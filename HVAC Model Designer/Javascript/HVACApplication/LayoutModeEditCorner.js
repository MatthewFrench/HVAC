/**
 * Created by Matt on 9/19/16.
 */

var WallPointEnum = {
    POINT1: 1,
    POINT2: 2
};
var CornerPoint = function (wall, wallPoint) {
    this.wall = wall;
    this.wallPoint = wallPoint;
};
CornerPoint.prototype.getX = function() {
    "use strict";
    if (this.wallPoint == WallPointEnum.POINT1) {
        return this.wall.x1;
    }
    if (this.wallPoint == WallPointEnum.POINT2) {
        return this.wall.x2;
    }
    return null;
};
CornerPoint.prototype.getY = function() {
    "use strict";
    if (this.wallPoint == WallPointEnum.POINT1) {
        return this.wall.y1;
    }
    if (this.wallPoint == WallPointEnum.POINT2) {
        return this.wall.y2;
    }
    return null;
};
CornerPoint.prototype.setX = function(x) {
    "use strict";
    if (this.wallPoint == WallPointEnum.POINT1) {
        this.wall.x1 = x;
    }
    if (this.wallPoint == WallPointEnum.POINT2) {
        this.wall.x2 = x;
    }
};
CornerPoint.prototype.setY = function(y) {
    "use strict";
    if (this.wallPoint == WallPointEnum.POINT1) {
        this.wall.y1 = y;
    }
    if (this.wallPoint == WallPointEnum.POINT2) {
        this.wall.y2 = y;
    }
};

//Initializes high-level variables.
HVACApplication.prototype.initEditCornerModeVariables = function () {
    "use strict";
    this.currentEditCornerSelectedCornerPoints = [];
    //this.highlightedCorner = null;
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditCornerModeLayout = function () {
    "use strict";
    //Select all points near the mouse and track all walls of those points
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.currentEditCornerSelectedCornerPoints = [];
    var searchArea = 15;

    //Select all points at location
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, searchArea)) {
            this.currentEditCornerSelectedCornerPoints.push(new CornerPoint(wall, WallPointEnum.POINT1));
        }
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, searchArea)) {
            this.currentEditCornerSelectedCornerPoints.push(new CornerPoint(wall, WallPointEnum.POINT2));
        }
    }
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedEditCornerModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    /*
    this.highlightedCorner = null;
    var closest = 15;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (dist < closest) {
            closest = dist;
            this.highlightedCorner = wall;
        }
    }*/

    for (var i = 0; i < this.currentEditCornerSelectedCornerPoints.length; i++) {
        var cornerPoint = this.currentEditCornerSelectedCornerPoints[i];
        cornerPoint.setX(cornerPoint.getX() - movedX);
        cornerPoint.setY(cornerPoint.getY() - movedY);
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedEditCornerModeLayout = function () {
    "use strict";
    this.currentEditCornerSelectedCornerPoints = [];
};

//Redraws the display on the canvas.
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
        wall.draw(ctx, false/*wall == this.highlightedCorner*/);
    }

    ctx.restore();
}