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

var Point2D = function (x, y) {
    "use strict";

    this.x = x;
    this.y = y;
};