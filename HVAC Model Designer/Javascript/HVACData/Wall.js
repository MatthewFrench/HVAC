/**
 * Created by personal on 10/21/16.
 */

function Wall(options) {
    "use strict";
    this.cornerPoint1 = new CornerPoint({point: options['point1'], wall: this});
    this.cornerPoint2 = new CornerPoint({point: options['point2'], wall: this});
    this.floorPlan = options['floor'];
    this.floorPlan.addWall(this.wall);
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