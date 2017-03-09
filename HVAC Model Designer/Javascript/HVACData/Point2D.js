/**
 * Created by personal on 10/21/16.
 *
 * This class handles the properties of a given coordinate point on the canvas.
 */

class Point2D {
/**
 * This function loads the options (if any) and sets the 2D point (X and Y values)
 *
 * @param options: The previous option settings
 * @constructor
 */
    constructor({x = 0.0, y = 0.0, point = null} = {}) {
        this.x = x;
        this.y = y;
        if (point != null) {
            this.x = point.getX();
            this.y = point.getY();
        }
    }
/**
 * This function sets X and Y values based on options.
 *
 * @param options: The previous option settings
 */
    set({x = 0.0, y = 0.0, point = null} = {}) {
        this.x = x;
        this.y = y;
        if (point != null) {
            this.x = point.getX();
            this.y = point.getY();
        }
    }

/**
 * This function gets the X value.
 *
 * @return: X-value of the point.
 */
    getX() {
        return this.x;
    }

/**
 * This function gets the Y value.
 *
 * @return: Y-value of the point.
 */
    getY() {
        return this.y;
    }

/**
 * This function sets the X value.
 *
 * @param x: The X-value being set to the given point.
 */
    setX(x) {
        this.x = x;
    }

/**
 * This function sets the Y value.
 *
 * @param y: The Y-value being set to the given point.
 */
    setY(y) {
        this.y = y;
    }

/**
 * This function tests to see if the given X and Y values are inside of a circle.
 *
 * @param cx: X-value of a coordinate point.
 * @param cy: Y-value of a coordinate point.
 * @param radius: The radius of a circle being checked.
 * @return: Boolean value if given X and Y values are inside of a circle.
 */
    isInCircle(cx, cy, radius) {
        var distancesquared = (this.x - cx) * (this.x - cx) + (this.y - cy) * (this.y - cy);
        return distancesquared <= radius * radius;
    }
}