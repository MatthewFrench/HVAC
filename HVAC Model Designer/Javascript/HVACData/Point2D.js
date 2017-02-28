/**
 * Created by personal on 10/21/16.
 *
 * This class handles the properties of a given coordinate point on the canvas.
 */

/**
 * This function loads the options (if any) and sets the 2D point (X and Y values)
 *
 * @param options: The previous option settings
 * @constructor
 */
function Point2D(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    if ("x" in options) {
        this.x = options["x"];
    } else {
        this.x = 0.0;
    }
    if ("y" in options) {
        this.y = options["y"];
    } else {
        this.y = 0.0;
    }
    if ("point" in options) {
        var copyPoint = options["point"];
        this.x = copyPoint.getX();
        this.y = copyPoint.getY();
    }
}

/**
 * This function sets X and Y values based on options.
 *
 * @param options: The previous option settings
 */
Point2D.prototype.set = function(options) {
    "use strict";
    if ("x" in options) {
        this.x = options["x"];
        this.y = options["y"];
    }
    if ("point" in options) {
        var copyPoint = options["point"];
        this.x = copyPoint.getX();
        this.y = copyPoint.getY();
    }
};

/**
 * This function gets the X value.
 *
 * @return: X-value of the point.
 */
Point2D.prototype.getX = function() {
    "use strict";
    return this.x;
};

/**
 * This function gets the Y value.
 *
 * @return: Y-value of the point.
 */
Point2D.prototype.getY = function() {
    "use strict";
    return this.y;
};

/**
 * This function sets the X value.
 *
 * @param x: The X-value being set to the given point.
 */
Point2D.prototype.setX = function(x) {
    "use strict";
    this.x = x;
};

/**
 * This function sets the Y value.
 *
 * @param y: The Y-value being set to the given point.
 */
Point2D.prototype.setY = function(y) {
    "use strict";
    this.y = y;
};

/**
 * This function tests to see if the given X and Y values are inside of a circle.
 *
 * @param cx: X-value of a coordinate point.
 * @param cy: Y-value of a coordinate point.
 * @param radius: The radius of a circle being checked.
 * @return: Boolean value if given X and Y values are inside of a circle.
 */
Point2D.prototype.isInCircle = function(cx,  cy,  radius) {
    "use strict";
    var distancesquared = (this.x - cx) * (this.x - cx) + (this.y - cy) * (this.y - cy);
    return distancesquared <= radius * radius;
}