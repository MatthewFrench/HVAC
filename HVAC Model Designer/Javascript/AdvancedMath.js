/**
 * Created by Matt on 9/10/16.
 */

var PIXELS_IN_FOOT = 20.0;
var GUIDE_LINE_LENGTH = 50 * PIXELS_IN_FOOT;
var SNAP_TO_AMOUNT_PIXELS = 8;

//Determines if the coordinate point falls within the area of the circle.
function pointInCircle( x,  y,  cx,  cy,  radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}

//Returns the nearest point on a line from a specific coordinate point.
function nearestPointOnLine( ax,  ay,  bx,  by,  px,  py) {
    var clampToSegment = true;

    var apx = px - ax;
    var apy = py - ay;
    var abx = bx - ax;
    var aby = by - ay;

    var ab2 = abx * abx + aby * aby;
    var ap_ab = apx * abx + apy * aby;
    var t = ap_ab / ab2;
    if (clampToSegment) {
        if (t < 0) {
            t = 0;
        } else if (t > 1) {
            t = 1;
        }
    }
    return new Point2D(ax + abx * t, ay + aby * t);
}

//Returns the angle of a line.
function getAngleOfLineBetweenPoints(x1, y1, x2, y2)
{
    var xDiff = x2 - x1;
    var yDiff = y2 - y1;
    return Math.atan2(yDiff, xDiff);
}

//Makes endpoint 1 become perpendicular.
function getPerpendicularInfiniteLinePoint1(x1, y1, x2, y2) {
    "use strict";

    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

    var lineLength = GUIDE_LINE_LENGTH / 2.0;

    var newX1 = x1 + lineLength * Math.cos(nearestAngle);
    var newY1 = y1 + lineLength * Math.sin(nearestAngle);

    var newX2 = x1 - lineLength * Math.cos(nearestAngle);
    var newY2 = y1 - lineLength * Math.sin(nearestAngle);

    return new Line2D(newX1, newY1, newX2, newY2);
}

//Makes endpoint 2 become perpendicular.
function getPerpendicularInfiniteLinePoint2(x1, y1, x2, y2) {
    "use strict";

    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

    var lineLength = GUIDE_LINE_LENGTH / 2.0;

    var newX1 = x2 + lineLength * Math.cos(nearestAngle);
    var newY1 = y2 + lineLength * Math.sin(nearestAngle);

    var newX2 = x2 - lineLength * Math.cos(nearestAngle);
    var newY2 = y2 - lineLength * Math.sin(nearestAngle);

    return new Line2D(newX1, newY1, newX2, newY2);
}

//Creates a longer line for when increasing the line length.
function getLongerLine(x1, y1, x2, y2) {
    "use strict";
    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2);

    var lineLength = Math.hypot(x1 - x2, y1 - y2) / 2.0 + (GUIDE_LINE_LENGTH)/2.0;

    var centerX = (x1 - x2) / 2 + x2;
    var centerY = (y1 - y2) / 2 + y2;

    var newX1 = centerX + lineLength * Math.cos(nearestAngle);
    var newY1 = centerY + lineLength * Math.sin(nearestAngle);

    var newX2 = centerX - lineLength * Math.cos(nearestAngle);
    var newY2 = centerY - lineLength * Math.sin(nearestAngle);

    return new Line2D(newX1, newY1, newX2, newY2);
}

//Converts calculated pixel values of first point into closest 1/10 of an inch.
function snapWallToDecimalFromPoint1(snapWall) {
    "use strict";

    var lengthInFeet = Math.hypot(snapWall.x1 - snapWall.x2, snapWall.y1 - snapWall.y2) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = (lengthInFeet - feet) * 12;

    inches = Math.round(inches * 10) / 10.0;

    var lineLength = (feet + inches / 12.0) * PIXELS_IN_FOOT;
    var nearestAngle = getAngleOfLineBetweenPoints(snapWall.x1, snapWall.y1, snapWall.x2, snapWall.y2);

    var newX = snapWall.x1 + lineLength * Math.cos(nearestAngle);
    var newY = snapWall.y1 + lineLength * Math.sin(nearestAngle);

    snapWall.x2 = newX;
    snapWall.y2 = newY;
}

//Converts calculated pixel values of second point into closest 1/10 of an inch.
function snapWallToDecimalFromPoint2(snapWall) {
    "use strict";

    var lengthInFeet = Math.hypot(snapWall.x1 - snapWall.x2, snapWall.y1 - snapWall.y2) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = (lengthInFeet - feet) * 12;

    inches = Math.round(inches * 10) / 10.0;

    var lineLength = (feet + inches / 12.0) * PIXELS_IN_FOOT;
    var nearestAngle = getAngleOfLineBetweenPoints(snapWall.x1, snapWall.y1, snapWall.x2, snapWall.y2);

    var newX = snapWall.x2 - lineLength * Math.cos(nearestAngle);
    var newY = snapWall.y2 - lineLength * Math.sin(nearestAngle);

    snapWall.x1 = newX;
    snapWall.y1 = newY;
}

//Gets the first point to snap closest to.
function getLinePoint1SnappedToNearestIncrement(x1, y1, x2, y2, increment) {
    "use strict";
    increment = increment * Math.PI / 180;
    var angleOfLine = getAngleOfLineBetweenPoints(x2, y2, x1, y1);
    var nearestAngle = Math.round(angleOfLine / increment) * increment;
    var lineLength = Math.hypot(x1 - x2, y1 - y2);

    var newX = x2 + lineLength * Math.cos(nearestAngle);
    var newY = y2 + lineLength * Math.sin(nearestAngle);

    return new Line2D(newX, newY, x2, y2);
}

//Gets the second point to snap closest to.
function getLinePoint2SnappedToNearestIncrement(x1, y1, x2, y2, increment) {
    "use strict";
    increment = increment * Math.PI / 180;
    var angleOfLine = getAngleOfLineBetweenPoints(x1, y1, x2, y2);
    var nearestAngle = Math.round(angleOfLine / increment) * increment;
    var lineLength = Math.hypot(x1 - x2, y1 - y2);

    var newX = x1 + lineLength * Math.cos(nearestAngle);
    var newY = y1 + lineLength * Math.sin(nearestAngle);

    return new Line2D(x1, y1, newX, newY);
}

//Returns the list of intersecting points on a line.
function getLineIntersectionPoint(point1X1, point1Y1, point1X2, point1Y2,
                                  point2X1, point2Y1, point2X2, point2Y2)
{
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = point1X2 - point1X1;     s1_y = point1Y2 - point1Y1;
    s2_x = point2X2 - point2X1;     s2_y = point2Y2 - point2Y1;

    var s, t;
    s = (-s1_y * (point1X1 - point2X1) + s1_x * (point1Y1 - point2Y1)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (point1Y1 - point2Y1) - s2_y * (point1X1 - point2X1)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return new Point2D(point1X1 + (t * s1_x), point1Y1 + (t * s1_y));
    }

    return null; // No collision
}

//Returns the list of intersecting points on a wall.
function getWallIntersectionPoints(wallList, excludeWallList) {
    "use strict";
    var pointArray = [];

    for (var i = 0; i < wallList.length; i++) {
        var wall1 = wallList[i];
        if (excludeWallList.includes(wall1)) continue;
        for (var j = 0; j < wallList.length; j++) {
            var wall2 = wallList[j];
            if (excludeWallList.includes(wall2) || wall2 == wall1) continue;

            //Get intersection point and add it to point array
            var point = getLineIntersectionPoint(wall1.x1, wall1.y1, wall1.x2, wall1.y2,
                wall2.x1, wall2.y1, wall2.x2, wall2.y2);
            if (point != null) {
                pointArray.push(point);
            }
        }
    }

    return pointArray;
}

//Gets the list for perpendicular intersecting points.
function getWallPerpendicularIntersectionPoints(wallList, excludeWallList) {
    "use strict";

    var perpendicularLineArray = [];
    for (var i = 0; i < wallList.length; i++) {
        var wall1 = wallList[i];
        if (excludeWallList.includes(wall1)) continue;
        //Add perpendicular lines
        perpendicularLineArray.push(getPerpendicularInfiniteLinePoint1(wall1.x1, wall1.y1, wall1.x2, wall1.y2));
        perpendicularLineArray.push(getPerpendicularInfiniteLinePoint2(wall1.x1, wall1.y1, wall1.x2, wall1.y2));
        perpendicularLineArray.push(getLongerLine(wall1.x1, wall1.y1, wall1.x2, wall1.y2));
    }


    var pointArray = [];

    for (var i = 0; i < perpendicularLineArray.length; i++) {
        var line = perpendicularLineArray[i];
        for (var j = 0; j < perpendicularLineArray.length; j++) {
            var line2 = perpendicularLineArray[j];
            if (line == line2) continue;

            //Get intersection point and add it to point array
            var point = getLineIntersectionPoint(line.x1, line.y1, line.x2, line.y2,
                line2.x1, line2.y1, line2.x2, line2.y2);
            if (point != null) {
                pointArray.push(point);
            }
        }
    }

    return pointArray;
}

//Process for snapping a point to other walls.
function snapPointToWalls(pointX, pointY, wallList, excludeWallList) {
    var snappedToEnd = false;
    var closest = SNAP_TO_AMOUNT_PIXELS;
    //Snap to wall end points
    for (var i = 0; i < wallList.length; i++) {
        var wall = wallList[i];
        if (excludeWallList.includes(wall)) continue;
        if (Math.hypot(pointX - wall.x1, pointY - wall.y1) < closest) {
            pointX = wall.x1;
            pointY = wall.y1;
            snappedToEnd = true;
            closest = Math.hypot(pointX - wall.x1, pointY - wall.y1);
        }
        if (Math.hypot(pointX - wall.x2, pointY - wall.y2) < closest) {
            pointX = wall.x2;
            pointY = wall.y2;
            snappedToEnd = true;
            closest = Math.hypot(pointX - wall.x2, pointY - wall.y2);
        }
    }
    //Snap to wall intersection points
    var points = getWallIntersectionPoints(wallList, excludeWallList);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (Math.hypot(pointX - point.x, pointY - point.y) < closest) {
            pointX = point.x;
            pointY = point.y;
            snappedToEnd = true;
            closest = Math.hypot(pointX - point.x, pointY - point.y);
        }
    }

    //Snap to wall perpendicular intersection points
    var points = getWallPerpendicularIntersectionPoints(wallList, excludeWallList);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (Math.hypot(pointX - point.x, pointY - point.y) < closest) {
            pointX = point.x;
            pointY = point.y;
            snappedToEnd = true;
            closest = Math.hypot(pointX - point.x, pointY - point.y);
        }
    }


    if (!snappedToEnd) {
        var snapWallX = pointX;
        var snapWallY = pointY;
        for (var i = 0; i < wallList.length; i++) {
            var wall = wallList[i];
            if (excludeWallList.includes(wall)) continue;
            var snapPoint = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, pointX, pointY);
            //Snap to any point on the wall
            if (Math.hypot(snapPoint.x - pointX, snapPoint.y - pointY) < closest) {
                closest = Math.hypot(snapPoint.x - pointX, snapPoint.y - pointY);
                snapWallX = snapPoint.x;
                snapWallY = snapPoint.y;
            } else {
                //Snap to wall guide lines

                var pLine = getPerpendicularInfiniteLinePoint1(wall.x1, wall.y1, wall.x2, wall.y2);
                var pLine2 = getPerpendicularInfiniteLinePoint2(wall.x1, wall.y1, wall.x2, wall.y2);
                var pLine3 = getLongerLine(wall.x1, wall.y1, wall.x2, wall.y2);
                var snapPoint1 = nearestPointOnLine(pLine.x1, pLine.y1, pLine.x2, pLine.y2, pointX, pointY);
                var snapPoint2 = nearestPointOnLine(pLine2.x1, pLine2.y1, pLine2.x2, pLine2.y2, pointX, pointY);
                var snapPoint3 = nearestPointOnLine(pLine3.x1, pLine3.y1, pLine3.x2, pLine3.y2, pointX, pointY);
                if (Math.hypot(snapPoint1.x - pointX, snapPoint1.y - pointY) < closest) {
                    snapWallX = snapPoint1.x;
                    snapWallY = snapPoint1.y;
                    closest = Math.hypot(snapPoint1.x - pointX, snapPoint1.y - pointY);
                } else if (Math.hypot(snapPoint2.x - pointX, snapPoint2.y - pointY) < closest) {
                    snapWallX = snapPoint2.x;
                    snapWallY = snapPoint2.y;
                    closest = Math.hypot(snapPoint2.x - pointX, snapPoint2.y - pointY);
                } else if (Math.hypot(snapPoint3.x - pointX, snapPoint3.y - pointY) < closest) {
                    snapWallX = snapPoint3.x;
                    snapWallY = snapPoint3.y;
                    closest = Math.hypot(snapPoint3.x - pointX, snapPoint3.y - pointY);
                }
            }
        }
        pointX = snapWallX;
        pointY = snapWallY;
    }
    return new Point2D(pointX, pointY);
};

//Creating a point object.
var Point2D = function (x, y) {
    "use strict";

    this.x = x;
    this.y = y;
};

//Creating a line object.
var Line2D = function(x1, y1, x2, y2) {
    "use strict";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
};