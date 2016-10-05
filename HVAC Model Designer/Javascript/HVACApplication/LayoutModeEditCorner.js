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

//Wall connections object
var WallConnection = function(cornerPoint, connectedWall) {
    "use strict";

    this.cornerPoint = cornerPoint;
    this.connectedWall = connectedWall;
    var lengthOfWall = Math.hypot(connectedWall.x2 - connectedWall.x1, connectedWall.y2 - connectedWall.y1);
    this.percentageOnWallLine = Math.hypot(cornerPoint.getX() - connectedWall.x1, cornerPoint.getY() - connectedWall.y1) / lengthOfWall;
}

//Initializes high-level variables.
HVACApplication.prototype.initEditCornerModeVariables = function () {
    "use strict";
    this.currentEditCornerSelectedCornerPoints = [];
    this.highlightedCorners = [];
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditCornerModeLayout = function () {
    "use strict";
    //Select all points near the mouse and track all walls of those points
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    this.currentEditCornerSelectedCornerPoints = [];
    var searchArea = 15;
    var closestCornerPoint = null;

    //Select closest points at location
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, searchArea)) {
            searchArea = Math.hypot(wall.x1 - canvasMouseX, wall.y1 - canvasMouseY);
            closestCornerPoint = new CornerPoint(wall, WallPointEnum.POINT1);
        }
        if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, searchArea)) {
            searchArea = Math.hypot(wall.x2 - canvasMouseX, wall.y2 - canvasMouseY);
            closestCornerPoint = new CornerPoint(wall, WallPointEnum.POINT2);
        }
    }
    //Search for points near pixel of closest point
    if (closestCornerPoint != null) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            var dist = Math.hypot(wall.x1 - closestCornerPoint.getX(), wall.y1 - closestCornerPoint.getY());
            if (dist <= 1) {
                this.currentEditCornerSelectedCornerPoints.push(new CornerPoint(wall, WallPointEnum.POINT1));
            }
            dist = Math.hypot(wall.x2 - closestCornerPoint.getX(), wall.y2 - closestCornerPoint.getY());
            if (dist <= 1) {
                this.currentEditCornerSelectedCornerPoints.push(new CornerPoint(wall, WallPointEnum.POINT2));
            }
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


    this.highlightedCorners = [];
    var closest = 15;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, canvasMouseX, canvasMouseY);
        var dist = Math.hypot(point.x - canvasMouseX, point.y - canvasMouseY);
        if (dist < closest) {
            //closest = dist;
            //this.highlightedCorner = wall;
            this.highlightedCorners.push(wall);
        }
    }

    //Get wall connections list
    //Set point
    //Fix connections without moving that point

    //Wall connections list
    var wallConnectionsList = [];
    

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

        var highlight = false;
        if (this.currentEditCornerSelectedCornerPoints.length == 0) {
            highlight = this.highlightedCorners.indexOf(wall) != -1;
       } else {
           for (var j = 0; j < this.currentEditCornerSelectedCornerPoints.length; j++) {
               var corner = this.currentEditCornerSelectedCornerPoints[j];
               if (corner.wall == wall) highlight = true;
           }
        }

        wall.draw(ctx, highlight);
    }

    ctx.restore();
}