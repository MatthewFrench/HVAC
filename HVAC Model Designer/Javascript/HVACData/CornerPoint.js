/**
 * Created by personal on 10/21/16.
 */

function CornerPoint(options) {
    "use strict";
    if ("wall" in options) {
        this.wall = options["wall"];
    }
    if ("point" in options) {
        this.point = options["point"];
    }
}
CornerPoint.prototype.getWall = function() {
    "use strict";
    return this.wall;
};

CornerPoint.prototype.getPoint = function() {
    "use strict";
    return this.point;
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