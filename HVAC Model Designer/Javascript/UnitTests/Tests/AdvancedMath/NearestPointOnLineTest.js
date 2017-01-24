/**
 * Created by personal on 12/9/16.
 */

function run() {
    var pointX = 0;
    var pointY = 0;

    var lineX1 = 1;
    var lineY1 = 1;
    var lineX2 = 10;
    var lineY2 = 10;

    var point = nearestPointOnLine(lineX1, lineY1, lineX2, lineY2, pointX, pointY);

    assertEqual(point.x, lineX1);
    assertEqual(point.y, lineY1);

    end();
}