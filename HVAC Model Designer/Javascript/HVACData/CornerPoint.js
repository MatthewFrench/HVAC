/**
 * Created by personal on 10/21/16.
 */

function CornerPoint(options) {
    "use strict";
    this.point = new Point2D();
    if ("x" in options) {
        this.setX( options["x"] );
    }
    if ("y" in options) {
        this.setY( options["y"] );
    }
    if ("wall" in options) {
        this.wall = options["wall"];
    }
    if ("point" in options) {
        this.point = this.setPoint(options['point']);
    }
}
CornerPoint.prototype.getWall = function() {
    "use strict";
    return this.wall;
};

CornerPoint.prototype.getPoint = function() {
    "use strict";
    return new Point2D({point: this.point});
};

CornerPoint.prototype.setPoint = function(point) {
    "use strict";
    return this.point.set({point: point});
};

CornerPoint.prototype.getX = function() {
    "use strict";
    return this.point.getX();
};

CornerPoint.prototype.getY = function() {
    "use strict";
    return this.point.getY();
};

CornerPoint.prototype.setX = function(x) {
    "use strict";
    this.point.setX(x);
};

CornerPoint.prototype.setY = function(y) {
    "use strict";
    this.point.setY(y);
};

CornerPoint.prototype.getHashmap = function() {
    "use strict";
    return {x: this.x, y: this.y};
};