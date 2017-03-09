/**
 * Created by personal on 10/21/16.
 *
 * This class handles the corner points of connected walls and tracks the values.
 */

//Checks which points on the walls are connected
var CornerPointTypeEnum = {
    POINTANY: 0,
    POINT1: 1,
    POINT2: 2
};

/**
 * This function loads in the previous options (if any) into the points of the Corner, setting X and Y values.
 *
 * @param options: The previous options in the corner points.
 * @constructor
 */
class CornerPoint {
    constructor({x = 0, y = 0, wall = null, point = null, pointType = CornerPointTypeEnum.POINTANY} = {}) {
        this.point = new Point2D();
        this.setX(x);
        this.setY(y);
        this.wall = wall;
        if (point != null) {
            this.setPoint(point);
        }
        this.pointType = pointType;
    }

/**
 * This function gets the point type.
 *
 * @return: point type of corner.
 */
    getPointType() {
        return this.pointType;
    }

/**
 * This function gets the wall.
 *
 * @returns: wall that makes up corner.
 */
    getWall() {
        return this.wall;
    }

/**
 * This function gets the point on a 2D plane
 *
 * @returns: Point2D of the corner.
 */
    getPoint() {
        return new Point2D({point: this.point});
    }

/**
 * This function sets the point values.
 *
 * @param point: The point of the corner that the walls are connected at.
 */
    setPoint(point) {
        return this.point.set({point: point});
    }

/**
 * This function will get the X point value.
 *
 * @return: X-value of the corner point
 */
    getX() {
        return this.point.getX();
    }

/**
 * This function will get the Y point value.
 *
 * @return: Y-value of the corner point
 */
    getY() {
        return this.point.getY();
    }

/**
 * This function will set the X point value.
 *
 * @param x: The X-value of the corner point.
 */
    setX(x) {
        this.point.setX(x);
    }

/**
 * This function will set the Y point value.
 *
 * @param y: The Y-value of the corner point.
 */
    setY(y) {
        this.point.setY(y);
    }

/**
 * This function will return a Hashmap of points X and Y
 *
 * @returns: The X-value and Y-value of the corner point.
 */
    getHashmap() {
        return {x: this.point.getX(), y: this.point.getY()};
    }
}