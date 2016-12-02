/**
 * Created by personal on 10/21/16.
 */

//This function loads options (if any) and creates corners and floor plans from it.
function Wall(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.cornerPoint1 = new CornerPoint({point: options['point1'], pointType: CornerPointTypeEnum.POINT1, wall: this});
    this.cornerPoint2 = new CornerPoint({point: options['point2'], pointType: CornerPointTypeEnum.POINT2, wall: this});
    this.floorPlan = options['floor'];
    this.floorPlan.addWall(this);
}

//This function gets the first corner's point values
Wall.prototype.getCornerPoint1 = function() {
    "use strict";
    return this.cornerPoint1;
};

//This function gets the second corner's point values
Wall.prototype.getCornerPoint2 = function() {
    "use strict";
    return this.cornerPoint2;
};

//This function gets the floor plan
Wall.prototype.getFloorPlan = function() {
    "use strict";
    return this.floorPlan;
};

//This function gets a line
Wall.prototype.getLine = function() {
    "use strict";
    return new Line2D({point1: this.cornerPoint1.getPoint(), point2: this.cornerPoint2.getPoint()});
};

//This function sets the values of a line
Wall.prototype.setLine = function(line) {
    "use strict";
    this.cornerPoint1.setPoint(line.getPoint1());
    this.cornerPoint2.setPoint(line.getPoint2());
};

//This function takes the two corners and puts them into storage
Wall.prototype.getHashmap = function() {
    "use strict";
    return {point1: this.cornerPoint1.getHashmap(), point2: this.cornerPoint2.getHashmap()};
};

//This function gets the first point's X value
Wall.prototype.getPoint1X = function() {
    return this.cornerPoint1.getX();
};

//This function gets the second point's X Value
Wall.prototype.getPoint2X = function() {
    return this.cornerPoint2.getX();
};

//This function gets the first point's Y value
Wall.prototype.getPoint1Y = function() {
    return this.cornerPoint1.getY();
};

//This function gets the second point's Y value
Wall.prototype.getPoint2Y = function() {
    return this.cornerPoint2.getY();
};

//This function sets the first point's X value
Wall.prototype.setPoint1X = function(x) {
    this.cornerPoint1.setX(x);
};

//This function sets the second point's X value
Wall.prototype.setPoint2X = function(x) {
    this.cornerPoint2.setX(x);
};

//This function sets the first point's Y value
Wall.prototype.setPoint1Y = function(y) {
    this.cornerPoint1.setY(y);
};

//This function sets the second point's Y value
Wall.prototype.setPoint2Y = function(y) {
    this.cornerPoint2.setY(y);
};