/**
 * Created by personal on 12/9/16.
 */
function run() {
    var line = getLongerLine(0, 0, 5, 5);
    var rotation = getAngleOfLineBetweenPoints(0, 0, 5, 5);

    var lineLength = Math.hypot(5, 5);

    var newRotation = getAngleOfLineBetweenPoints(line.getPoint1X(), line.getPoint1Y(), line.getPoint2X(), line.getPoint2Y());
    var newLength = Math.hypot(line.getPoint2X() - line.getPoint1X(), line.getPoint2Y() - line.getPoint1Y());

    assertEqual(rotation, newRotation);
    assertGreaterThan(newLength, lineLength);

    end();
}