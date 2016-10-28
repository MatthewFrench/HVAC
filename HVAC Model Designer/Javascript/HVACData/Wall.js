/**
 * Created by personal on 10/21/16.
 */

function Wall(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.cornerPoint1 = new CornerPoint({point: options['point1'], pointType: CornerPointTypeEnum.POINT1, wall: this});
    this.cornerPoint2 = new CornerPoint({point: options['point2'], pointType: CornerPointTypeEnum.POINT2, wall: this});
    this.floorPlan = options['floor'];
    this.floorPlan.addWall(this);
}

Wall.prototype.getCornerPoint1 = function() {
    "use strict";
    return this.cornerPoint1;
};
Wall.prototype.getCornerPoint2 = function() {
    "use strict";
    return this.cornerPoint2;
};
Wall.prototype.getFloorPlan = function() {
    "use strict";
    return this.floorPlan;
};
Wall.prototype.getLine = function() {
    "use strict";
    return new Line2D({point1: this.cornerPoint1.getPoint(), point2: this.cornerPoint2.getPoint()});
};
Wall.prototype.setLine = function(line) {
    "use strict";
    this.cornerPoint1.setPoint(line.getPoint1());
    this.cornerPoint2.setPoint(line.getPoint2());
};

Wall.prototype.getHashmap = function() {
    "use strict";
    return {point1: this.cornerPoint1.getHashmap(), point2: this.cornerPoint2.getHashmap()};
};

Wall.prototype.getPoint1X = function() {
    return this.cornerPoint1.getX();
};
Wall.prototype.getPoint2X = function() {
    return this.cornerPoint2.getX();
};
Wall.prototype.getPoint1Y = function() {
    return this.cornerPoint1.getY();
};
Wall.prototype.getPoint2Y = function() {
    return this.cornerPoint2.getY();
};
Wall.prototype.setPoint1X = function(x) {
    this.cornerPoint1.setX(x);
};
Wall.prototype.setPoint2X = function(x) {
    this.cornerPoint2.setX(x);
};
Wall.prototype.setPoint1Y = function(y) {
    this.cornerPoint1.setY(y);
};
Wall.prototype.setPoint2Y = function(y) {
    this.cornerPoint2.setY(y);
};