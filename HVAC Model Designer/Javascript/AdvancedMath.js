/**
 * Created by Matt on 9/10/16.
 */
/**
 * Returns true if the point is in the defined circle.
 */
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
    console.log("Angle of line: " + angleOfLine);
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

var Point2D = function (x, y) {
    "use strict";

    this.x = x;
    this.y = y;
};

var Line2D = function(x1, y1, x2, y2) {
    "use strict";
    console.log("Creating line");
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    console.log("Created new line");
};