/**
 * Created by personal on 10/21/16.
 */

function Point2D(options) {
    "use strict";
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

Point2D.prototype.getX = function() {
    "use strict";
    return this.x;
};

Point2D.prototype.getY = function() {
    "use strict";
    return this.y
};

Point2D.prototype.setX = function(x) {
    "use strict";
    this.x = x;
};

Point2D.prototype.setY = function(y) {
    "use strict";
    this.y = y;
};

Point2D.prototype.isInCircle = function(cx,  cy,  radius) {
    "use strict";
    var distancesquared = (this.x - cx) * (this.x - cx) + (this.y - cy) * (this.y - cy);
    return distancesquared <= radius * radius;
}