/**
 * Created by Matt on 9/19/16.
 */

//Wall connections object
var WallConnection = function(cornerPoint, connectedWall) {
    "use strict";

    this.cornerPoint = cornerPoint;
    this.connectedWall = connectedWall;
    var lengthOfWall = Math.hypot(connectedWall.getPoint2X() - connectedWall.getPoint1X(), connectedWall.getPoint2Y() - connectedWall.getPoint1Y());
    this.percentageOnWallLine = Math.hypot(cornerPoint.getX() - connectedWall.getPoint1X(), cornerPoint.getY() - connectedWall.getPoint1Y()) / lengthOfWall;
};
WallConnection.prototype.reattach = function() {
    var newX = (this.connectedWall.getPoint2X() - this.connectedWall.getPoint1X()) * this.percentageOnWallLine + this.connectedWall.getPoint1X();
    var newY = (this.connectedWall.getPoint2Y() - this.connectedWall.getPoint1Y()) * this.percentageOnWallLine + this.connectedWall.getPoint1Y();
    this.cornerPoint.setX(newX);
    this.cornerPoint.setY(newY);
};

//Initializes high-level variables.
HVACApplication.prototype.initEditCornerModeVariables = function () {
    "use strict";
    this.currentEditCornerSelectedCornerPoints = [];
    this.highlightedCorners = [];
};

HVACApplication.prototype.showEditCornerModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditCornerModeLayout = function () {
    "use strict";
    //Select all points near the mouse and track all walls of those points

    console.log("Mouse pressed");

    this.currentEditCornerSelectedCornerPoints = [];
    var searchArea = 15;
    var closestCornerPoint = null;

    //Select closest points at location
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        if (pointInCircle(this.canvasMouseX, this.canvasMouseY, wall.getPoint1X(), wall.getPoint1Y(), searchArea)) {
            searchArea = Math.hypot(wall.getPoint1X() - this.canvasMouseX, wall.getPoint1Y() - this.canvasMouseY);
            closestCornerPoint = wall.getCornerPoint1();
        }
        if (pointInCircle(this.canvasMouseX, this.canvasMouseY, wall.getPoint2X(), wall.getPoint2Y(), searchArea)) {
            searchArea = Math.hypot(wall.getPoint2X() - this.canvasMouseX, wall.getPoint2Y() - this.canvasMouseY);
            closestCornerPoint = wall.getCornerPoint2();
        }
    }

    //Store all wall connections
    this.wallConnections = [];
    console.log("Wall connection: " + this.wallConnections);
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var firstWall = this.getCurrentWallList()[i];
        for (var j = i+1; j < this.getCurrentWallList().length; j++) {
            var secondWall = this.getCurrentWallList()[j];
            if (firstWall == secondWall) continue;

            //If second wall is connected to first wall but not on an end point, add it
            //If first will is connected to second wall but not on an end point, add it

            //Second wall point 1 to first wall
            //Second wall point 2 to first wall
            //First wall point 1 to second wall
            //First wall point 2 to second wall
            var secondWallPoint1Connection = null;
            var secondWallPoint2Connection = null;
            var firstWallPoint1Connection = null;
            var firstWallPoint2Connection = null;

            var firstWallPoint1 = firstWall.getCornerPoint1();
            var firstWallPoint2 = firstWall.getCornerPoint2();
            var secondWallPoint1 = secondWall.getCornerPoint1();
            var secondWallPoint2 = secondWall.getCornerPoint2();

            var checkConnection = function(checkWallPoint, targetWallPoint1, targetWallPoint2) {
                var pointOnLine = nearestPointOnLine(targetWallPoint1.getX(), targetWallPoint1.getY(),
                    targetWallPoint2.getX(), targetWallPoint2.getY(), checkWallPoint.getX(), checkWallPoint.getY());
                var distBetweenConnection = Math.hypot(pointOnLine.getX() - checkWallPoint.getX(), pointOnLine.getY() - checkWallPoint.getY());
                if (distBetweenConnection <= 1.0) { //If within 1 pixel, be connected to wall
                    //Check if an end point
                    if (Math.hypot(checkWallPoint.getX() - targetWallPoint1.getX(), checkWallPoint.getY() - targetWallPoint1.getY()) <= 1.0 ||
                        Math.hypot(checkWallPoint.getX() - targetWallPoint2.getX(), checkWallPoint.getY() - targetWallPoint2.getY()) <= 1.0) {
                        //End point do nothing
                    } else {
                        //Not an end point, add
                        var connection = new WallConnection(checkWallPoint, targetWallPoint1.getWall());
                        return connection;
                    }
                }
                return null;
            };

            //Second wall point 1 to first wall
            secondWallPoint1Connection = checkConnection(secondWallPoint1, firstWallPoint1, firstWallPoint2);
            secondWallPoint2Connection = checkConnection(secondWallPoint2, firstWallPoint1, firstWallPoint2);
            firstWallPoint1Connection = checkConnection(firstWallPoint1, secondWallPoint1, secondWallPoint2);
            firstWallPoint2Connection = checkConnection(firstWallPoint2, secondWallPoint1, secondWallPoint2);
            if (secondWallPoint1Connection != null) {
                this.wallConnections.push(secondWallPoint1Connection);
            } else if (secondWallPoint2Connection != null) {
                this.wallConnections.push(secondWallPoint2Connection);
            } else if (firstWallPoint1Connection != null) {
                this.wallConnections.push(firstWallPoint1Connection);
            } else if (firstWallPoint2Connection != null) {
                this.wallConnections.push(firstWallPoint2Connection);
            }
        }
    }


    console.log("Wall connection length: " + this.wallConnections.length);


    console.log("closestCornerPoint: " + closestCornerPoint);

    //Search for points near pixel of closest point
    if (closestCornerPoint != null) {
        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            var dist = Math.hypot(wall.getPoint1X() - closestCornerPoint.getX(), wall.getPoint1Y() - closestCornerPoint.getY());
            if (dist <= 1) {
                this.currentEditCornerSelectedCornerPoints.push(wall.getCornerPoint1());
            }
            dist = Math.hypot(wall.getPoint2X() - closestCornerPoint.getX(), wall.getPoint2Y() - closestCornerPoint.getY());
            if (dist <= 1) {
                this.currentEditCornerSelectedCornerPoints.push(wall.getCornerPoint2());
            }
        }
    }
    console.log("this.currentEditCornerSelectedCornerPoints 0: " + this.currentEditCornerSelectedCornerPoints.length);

    //Add any walls that the selected points may be connected to
    var currentEditCornerSelectedCornerPointsClone = this.currentEditCornerSelectedCornerPoints.slice(0);
    for (var i = 0; i < currentEditCornerSelectedCornerPointsClone.length; i++) {
        var cornerPoint = currentEditCornerSelectedCornerPointsClone[i];
        var wall = cornerPoint.getWall();

        for (var k = 0; k < this.getCurrentWallList().length; k++) {
            var checkWall = this.getCurrentWallList()[k];
            if (checkWall != wall) {
                var containsWall = false;
                for (var j = 0; j < currentEditCornerSelectedCornerPointsClone.length; j++) {
                    var checkCorner = currentEditCornerSelectedCornerPointsClone[j];
                    if (checkCorner.getWall() == checkWall) containsWall = true;

                }
                if (containsWall) continue;

                var pointOnLine = nearestPointOnLine(checkWall.getPoint1X(), checkWall.getPoint1Y(), checkWall.getPoint2X(), checkWall.getPoint2Y(), cornerPoint.getX(), cornerPoint.getY());
                if (Math.hypot(cornerPoint.getX() - pointOnLine.getX(), cornerPoint.getY() - pointOnLine.getY()) <= 1.0) {
                    //Check if points are added, if not add them to corner points
                    var wallCorner1 = checkWall.getCornerPoint1();
                    var wallCorner2 = checkWall.getCornerPoint2();
                    var addWallCorner1 = true;
                    var addWallCorner2 = true;
                    for (var j = 0; j < currentEditCornerSelectedCornerPointsClone.length; j++) {
                        var checkCorner = currentEditCornerSelectedCornerPointsClones[j];
                        if (checkCorner.getWall() == wallCorner1.getWall() && checkCorner.getPointType() == wallCorner1.getPointType()) addWallCorner1 = false;
                        if (checkCorner.getWall() == wallCorner2.getWall() && checkCorner.getPointType() == wallCorner2.getPointType()) addWallCorner2 = false;
                    }
                    if (addWallCorner1) this.currentEditCornerSelectedCornerPoints.push(wallCorner1);
                    if (addWallCorner2) this.currentEditCornerSelectedCornerPoints.push(wallCorner2);
                }

            }
        }
    }
console.log("this.currentEditCornerSelectedCornerPoints: " + this.currentEditCornerSelectedCornerPoints.length);
    //If no points or corners were selected, grab a wall
    if (this.currentEditCornerSelectedCornerPoints.length == 0) {
        var closestWall = null;
        var closest = 15.0;
        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            var point = nearestPointOnLine( wall.getPoint1X(),  wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(),  this.canvasMouseX,  this.canvasMouseY);
            var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
            if (dist <= closest) {
                closestWall = wall;
                closest = dist;
            }
        }
        if (closestWall != null) {
            this.currentEditCornerSelectedCornerPoints.push(closestWall.getCornerPoint1());
            this.currentEditCornerSelectedCornerPoints.push(closestWall.getCornerPoint2());
        }
    }
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedEditCornerModeLayout = function () {
    "use strict";


    this.highlightedCorners = [];
    var closest = 15;
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
        var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
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
    //var wallConnectionsList = [];

    
    if (this.mouseDown) {


        for (var i = 0; i < this.currentEditCornerSelectedCornerPoints.length; i++) {
            var cornerPoint = this.currentEditCornerSelectedCornerPoints[i];
            cornerPoint.setX(cornerPoint.getX() - this.mouseMovedX);
            cornerPoint.setY(cornerPoint.getY() - this.mouseMovedY);
        }
        console.log("Mouse move wall connections: " + this.wallConnections.length);
        //Re-align walls
        for (var i = 0; i < this.wallConnections.length; i++) {
            var wallConnection = this.wallConnections[i];
            var containsWall = false;
            for (var j in this.currentEditCornerSelectedCornerPoints) {
                var cornerPoint = this.currentEditCornerSelectedCornerPoints[j];
                if (wallConnection.cornerPoint.getWall() == cornerPoint.getWall()) containsWall = false;
                //if (cornerPoint.getWall() == wallConnection.cornerPoint.getWall()) containsWall = true;
                //if (cornerPoint.getWall() == wallConnection.connectedWall) containsWall = true;
            }
            if (!containsWall) {
                wallConnection.reattach();
            }
        }
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedEditCornerModeLayout = function () {
    "use strict";
    this.currentEditCornerSelectedCornerPoints = [];

    wallSlicer.call(this, this.getCurrentWallList());
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

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];

        var highlight = false;
        if (this.currentEditCornerSelectedCornerPoints.length == 0) {
            highlight = this.highlightedCorners.indexOf(wall) != -1;
       } else {
           for (var j = 0; j < this.currentEditCornerSelectedCornerPoints.length; j++) {
               var corner = this.currentEditCornerSelectedCornerPoints[j];
               if (corner.getWall() == wall) highlight = true;
           }
        }
/*
        for (var wallConnection in this.wallConnections) {
            if (this.wallConnections[wallConnection].cornerPoint.getWall() == wall) {
                highlight = true;
            }
        }
*/

        wall.draw(ctx, highlight);
    }

    ctx.restore();
}