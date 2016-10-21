/**
 * Created by personal on 10/21/16.
 */

function Line2D(options) {
    "use strict";
    if ("x1" in options) {
        var x1 = options["x1"];
        var y1 = options["y1"];
        var x2 = options["x2"];
        var y2 = options["y2"];
        this.point1 = new Point2D({x: x1, y: y1});
        this.point2 = new Point2D({x: x2, y: y2});
    } else if ("point1" in options) {
        var point1 = options["point1"];
        var point2 = options["point2"];
        this.point1 = new Point2D({point: point1});
        this.point2 = new Point2D({point: point2});
    } else if ("line" in options) {
        var copyLine = options["line"];
        var point1 = copyLine.getPoint1();
        var point2 = copyLine.getPoint2();
        this.point1 = new Point2D({point: point1});
        this.point2 = new Point2D({point: point2});
    }
}

Line2D.prototype.getX1 = function() {
    "use strict";
    return this.point1.getX();
};
Line2D.prototype.getX2 = function() {
    "use strict";
    return this.point2.getX();
};
Line2D.prototype.getY1 = function() {
    "use strict";
    return this.point1.getY();
};
Line2D.prototype.getY2 = function() {
    "use strict";
    return this.point2.getY();
};
Line2D.prototype.setX1 = function(x) {
    "use strict";
    return this.point1.setX(x);
};
Line2D.prototype.setX2 = function(x) {
    "use strict";
    return this.point2.setX(x);
};
Line2D.prototype.setY1 = function(y) {
    "use strict";
    return this.point1.setY(y);
};
Line2D.prototype.setY2 = function(y) {
    "use strict";
    return this.point2.setY(y);
};
Line2D.prototype.getPoint1 = function() {
    "use strict";
    return this.point1;
};
Line2D.prototype.getPoint2 = function() {
    "use strict";
    return this.point2;
};
Line2D.prototype.setPoint1 = function(point1) {
    "use strict";
    this.point1.setX(point1.getX());
};
Line2D.prototype.setPoint2 = function(point2) {
    "use strict";
    this.point2.setX(point2.getX());
};
Line2D.prototype.set = function(options) {
    "use strict";
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
};