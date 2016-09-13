/**
 * Created by Matt on 9/10/16.
 */

var PIXELS_IN_FOOT = 20.0;

function pointInCircle( x,  y,  cx,  cy,  radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}

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

function getAngleOfLineBetweenPoints(x1, y1, x2, y2)
{
    var xDiff = x2 - x1;
    var yDiff = y2 - y1;
    return Math.atan2(yDiff, xDiff);
}

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

function getPerpendicularInfiniteLinePoint1(x1, y1, x2, y2) {
    "use strict";

    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

    var lineLength = 2000.0;

    var newX1 = x1 + lineLength * Math.cos(nearestAngle);
    var newY1 = y1 + lineLength * Math.sin(nearestAngle);

    var newX2 = x1 - lineLength * Math.cos(nearestAngle);
    var newY2 = y1 - lineLength * Math.sin(nearestAngle);

    return new Line2D(newX1, newY1, newX2, newY2);
}

function getPerpendicularInfiniteLinePoint2(x1, y1, x2, y2) {
    "use strict";

    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

    var lineLength = 2000.0;

    var newX1 = x2 + lineLength * Math.cos(nearestAngle);
    var newY1 = y2 + lineLength * Math.sin(nearestAngle);

    var newX2 = x2 - lineLength * Math.cos(nearestAngle);
    var newY2 = y2 - lineLength * Math.sin(nearestAngle);

    return new Line2D(newX1, newY1, newX2, newY2);
}

HVACApplication.prototype.snapWallToDecimalFromPoint1 = function(snapWall) {
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

HVACApplication.prototype.snapWallToDecimalFromPoint2 = function(snapWall) {
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

var Point2D = function (x, y) {
    "use strict";

    this.x = x;
    this.y = y;
};

var Line2D = function(x1, y1, x2, y2) {
    "use strict";
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
};