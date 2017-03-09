/**
 * Created by personal on 10/21/16.
 *
 * This class handles the properties of a given line (wall) on the canvas.
 */

class Line2D {
/**
 * This function loads up options (if any) and creates points for a 2D line.
 *
 * @param options: The previous settings and layout.
 * @constructor
 */
    constructor({x1 = 0, y1 = 0, x2 = 0, y2 = 0, point1 = null, point2 = null, line = null} = {}) {
        if (line != null) {
            var copyLine = line;
            var point1 = copyLine.getPoint1();
            var point2 = copyLine.getPoint2();
            this.point1 = new Point2D({point: point1});
            this.point2 = new Point2D({point: point2});
        } else if (point1 != null) {
            this.point1 = new Point2D({point: point1});
            this.point2 = new Point2D({point: point2});
        } else {
            this.point1 = new Point2D({x: x1, y: y1});
            this.point2 = new Point2D({x: x2, y: y2});
        }
    }

/**
 * This function gets the first X point.
 *
 * @return: The X-value of the first point of a line.
 */
    getPoint1X() {

        return this.point1.getX();
    }

/**
 * This function gets the second X point.
 *
 * @return: The X-value of the second point of a line.
 */
    getPoint2X() {

        return this.point2.getX();
    }

/**
 * This function gets the first Y point.
 *
 * @return: The Y-value of the first point of a line.
 */
    getPoint1Y() {

        return this.point1.getY();
    }

/**
 * This function gets the second X point.
 *
 * @return: The X-value of the second point of a line.
 */
    getPoint2Y() {

        return this.point2.getY();
    }

/**
 * This function sets the first X point
 *
 * @param x: The X-value that is being set on the first point of the line.
 */
    setPoint1X(x) {

        return this.point1.setX(x);
    }
/**
 * This function sets the second X point
 *
 * @param x: The X-value that is being set on the second point of the line.
 */
    setPoint2X(x) {

        return this.point2.setX(x);
    }

/**
 * This function sets the first Y point
 *
 * @param y: The Y-value that is being set on the first point of the line.
 */
    setPoint1Y(y) {

        return this.point1.setY(y);
    }

/**
 * This function sets the second Y point
 *
 * @param y: The Y-value that is being set on the second point of the line.
 */
    setPoint2Y(y) {

        return this.point2.setY(y);
    }

/**
 * This function returns the first point (X and Y values)
 *
 * @return: The first coordinate point of the line.
 */
    getPoint1() {

        return this.point1;
    }

/**
 * This function returns the second point (X and Y values)
 *
 * @return: The second coordinate point of the line.
 */
    getPoint2() {

        return this.point2;
    }

//This function sets the X value of first point
    setPoint1(point1) {

        this.point1.setX(point1.getX());
    }

//This function sets the X value of second point
    setPoint2(point2) {

        this.point2.setX(point2.getX());
    }

/**
 * This functions finds out if the points and line are in the options.
 * If it finds them, it loads them into points and sets those points based on the options.
 *
 * @param options: Previous option settings
 */
    set(options) {

        if ("point1" in options) {
            var copyPoint = options["point1"];
            this.point1.set({x: copyPoint.getX(), y: copyPoint.getY()});
        }
        if ("point2" in options) {
            var copyPoint = options["point2"];
            this.point2.set({x: copyPoint.getX(), y: copyPoint.getY()});
        }
        if ("line" in options) {
            var copyLine = options["line"];
            this.point1.set({x: copyLine.getPoint1().getX(), y: copyLine.getPoint1().getY()});
            this.point1.set({x: copyLine.getPoint2().getX(), y: copyLine.getPoint2().getY()});
        }
    }

/**
 * This function gets the angle of the line between two points.
 *
 * @return: The angle of the line between two points.
 */
    getAngleOfLineBetweenPoints() {
        var xDiff = this.point2.getX() - this.point1.getX();
        var yDiff = this.point2.getY() - this.point1.getY();
        return Math.atan2(yDiff, xDiff);
    }

/**
 * This function gets the nearest point based on a given point.
 *
 * @param px: X-value of the given point
 * @param py: Y-value of the given point
 * @return: The nearest point to the coordinate point being passed in.
 */
    getNearestPointFromPoint(px, py) {
        var clampToSegment = true;

        var apx = px - this.point1.getX();
        var apy = py - this.point1.getY();
        var abx = this.point2.getX() - this.point1.getX();
        var aby = this.point2.getY() - this.point1.getY();

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
        return new Point2D({x: this.point1.getX() + abx * t, y: this.point1.getY() + aby * t});
    }

/**
 * This function obtains a perpendicular line to the given point 1
 *
 * @return: The new line at a perpendicular angle.
 */
    getPerpendicularLineFromPoint1() {

        var x1 = this.point1.getX();
        var y1 = this.point1.getY();
        var x2 = this.point2.getX();
        var y2 = this.point2.getY();

        var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

        var lineLength = GUIDE_LINE_LENGTH / 2.0;

        var newX1 = x1 + lineLength * Math.cos(nearestAngle);
        var newY1 = y1 + lineLength * Math.sin(nearestAngle);

        var newX2 = x1 - lineLength * Math.cos(nearestAngle);
        var newY2 = y1 - lineLength * Math.sin(nearestAngle);

        return new Line2D({x1: newX1, y1: newY1, x2: newX2, y2: newY2});
    }

/**
 * This function obtains a perpendicular line to the given point 2
 *
 * @return: The new line at a perpendicular angle.
 */
    getPerpendicularInfiniteLinePoint2() {
        var x1 = this.point1.getX();
        var y1 = this.point1.getY();
        var x2 = this.point2.getX();
        var y2 = this.point2.getY();

        var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

        var lineLength = GUIDE_LINE_LENGTH / 2.0;

        var newX1 = x2 + lineLength * Math.cos(nearestAngle);
        var newY1 = y2 + lineLength * Math.sin(nearestAngle);

        var newX2 = x2 - lineLength * Math.cos(nearestAngle);
        var newY2 = y2 - lineLength * Math.sin(nearestAngle);

        return new Line2D({x1: newX1, y1: newY1, x2: newX2, y2: newY2});
    }

/**
 * This function obtains a longer line for accurate drawing
 *
 * @return: A longer more accurate line.
 */
    getLongerLine() {
        var x1 = this.point1.getX();
        var y1 = this.point1.getY();
        var x2 = this.point2.getX();
        var y2 = this.point2.getY();

        var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2);

        var lineLength = Math.hypot(x1 - x2, y1 - y2) / 2.0 + (GUIDE_LINE_LENGTH) / 2.0;

        var centerX = (x1 - x2) / 2 + x2;
        var centerY = (y1 - y2) / 2 + y2;

        var newX1 = centerX + lineLength * Math.cos(nearestAngle);
        var newY1 = centerY + lineLength * Math.sin(nearestAngle);

        var newX2 = centerX - lineLength * Math.cos(nearestAngle);
        var newY2 = centerY - lineLength * Math.sin(nearestAngle);

        return new Line2D({x1: newX1, y1: newY1, x2: newX2, y2: newY2});
    }

/**
 * This function gets the length of the line.
 *
 * @return: The length of the current line.
 */
    getLength() {
        var x1 = this.point1.getX();
        var y1 = this.point1.getY();
        var x2 = this.point2.getX();
        var y2 = this.point2.getY();
        return Math.hypot(x1 - x2, y1 - y2);
    }

/**
 * This function gets the center of a line.
 *
 * @return: The center point of the line.
 */
    getCenterPoint() {
        var x1 = this.point1.getX();
        var y1 = this.point1.getY();
        var x2 = this.point2.getX();
        var y2 = this.point2.getY();
        var centerX = (x1 - x2) / 2 + x2;
        var centerY = (y1 - y2) / 2 + y2;
        return new Point2D({x: centerX, y: centerY});
    }

/**
 * This function gets the current rotation of a line.
 *
 * @return: The degree for how much the line has rotated.
 */
    getRotation() {
        var x1 = this.point1.getX();
        var y1 = this.point1.getY();
        var x2 = this.point2.getX();
        var y2 = this.point2.getY();
        return Math.atan2(x2 - x1, y2 - y1);
    }
}
