/**
 * Created by personal on 12/9/16.
 */

function run() {

    var x1 = -10;
    var y1 = 0;
    var x2 = 10;
    var y2 = 0;

    var oldRotation = getAngleOfLineBetweenPoints(x1, y1, x2, y2);


    var line = getPerpendicularInfiniteLinePoint1(x1, y1, x2, y2);
    var newRotation = getAngleOfLineBetweenPoints(line.getPoint1X(), line.getPoint1Y(), line.getPoint2X(), line.getPoint2Y());

    assertEqual(oldRotation + Math.PI/2, newRotation);

    var line = getPerpendicularInfiniteLinePoint2(x1, y1, x2, y2);
    var newRotation = getAngleOfLineBetweenPoints(line.getPoint1X(), line.getPoint1Y(), line.getPoint2X(), line.getPoint2Y());

    assertEqual(oldRotation + Math.PI/2, newRotation);

    end();
}