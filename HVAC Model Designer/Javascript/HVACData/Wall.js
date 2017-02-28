/**
 * Created by personal on 10/21/16.
 *
 * This class handles the properties of the wall object.
 */

/**
 * This function loads options (if any) and creates corners and floor plans from it.
 *
 * @param options: Previous option settings
 * @constructor
 */
function Wall(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.cornerPoint1 = new CornerPoint({point: options['point1'], pointType: CornerPointTypeEnum.POINT1, wall: this});
    this.cornerPoint2 = new CornerPoint({point: options['point2'], pointType: CornerPointTypeEnum.POINT2, wall: this});
    this.floorPlan = options['floor'];
    if (this.floorPlan != undefined) this.floorPlan.addWall(this);
}

/**
 * This function gets the first corner's point values.
 *
 * @return: the first corner's point of the given wall.
 */
Wall.prototype.getCornerPoint1 = function() {
    "use strict";
    return this.cornerPoint1;
};

/**
 * This function gets the second corner's point values.
 *
 * @return: the second corner's point of the given wall.
 */
Wall.prototype.getCornerPoint2 = function() {
    "use strict";
    return this.cornerPoint2;
};

/**
 * This function gets the floor plan.
 *
 * @return: The floor plan that the wall is located in.
 */
Wall.prototype.getFloorPlan = function() {
    "use strict";
    return this.floorPlan;
};

/**
 * This function gets a line.
 *
 * @return: The line of the given wall object.
 */
Wall.prototype.getLine = function() {
    "use strict";
    return new Line2D({point1: this.cornerPoint1.getPoint(), point2: this.cornerPoint2.getPoint()});
};

/**
 * This function sets the values of a line.
 *
 * @param line: The Line2D object that is being set for the given wall.
 */
Wall.prototype.setLine = function(line) {
    "use strict";
    this.cornerPoint1.setPoint(line.getPoint1());
    this.cornerPoint2.setPoint(line.getPoint2());
};

/**
 * This function takes the two corners and puts them into storage.
 *
 * @return: The two endpoints of the given wall.
 */
Wall.prototype.getHashmap = function() {
    "use strict";
    return {point1: this.cornerPoint1.getHashmap(), point2: this.cornerPoint2.getHashmap()};
};

/**
 * This function gets the first point's X value.
 *
 * @return: X-value of the first point of the given wall.
 */
Wall.prototype.getPoint1X = function() {
    return this.cornerPoint1.getX();
};

/**
 * This function gets the second point's X value.
 *
 * @return: X-value of the second point of the given wall.
 */
Wall.prototype.getPoint2X = function() {
    return this.cornerPoint2.getX();
};

/**
 * This function gets the first point's Y value.
 *
 * @return: Y-value of the first point of the given wall.
 */
Wall.prototype.getPoint1Y = function() {
    return this.cornerPoint1.getY();
};

/**
 * This function gets the second point's Y value.
 *
 * @return: Y-value of the second point of the given wall.
 */
Wall.prototype.getPoint2Y = function() {
    return this.cornerPoint2.getY();
};

/**
 * This function sets the first point's X value.
 *
 * @param x: X-value that is being set to the first point's X-value of the wall.
 */
Wall.prototype.setPoint1X = function(x) {
    this.cornerPoint1.setX(x);
};

/**
 * This function sets the second point's X value.
 *
 * @param x: X-value that is being set to the second point's X-value of the wall.
 */
Wall.prototype.setPoint2X = function(x) {
    this.cornerPoint2.setX(x);
};

/**
 * This function sets the first point's Y value.
 *
 * @param y: Y-value that is being set to the first point's Y-value of the wall.
 */
Wall.prototype.setPoint1Y = function(y) {
    this.cornerPoint1.setY(y);
};

/**
 * This function sets the second point's Y value.
 *
 * @param y: Y-value that is being set to the second point's Y-value of the wall.
 */
Wall.prototype.setPoint2Y = function(y) {
    this.cornerPoint2.setY(y);
};