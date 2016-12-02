/**
 * Created by personal on 10/21/16.
 */

var CornerPointTypeEnum = {
    POINTANY: 0,
    POINT1: 1,
    POINT2: 2
};

//This function loads in the previous options (if any) into the points of the Corner, setting X and Y values
function CornerPoint(options) {
    "use strict";
    if (options == undefined || options == null) options = [];
    this.point = new Point2D();
    if ("x" in options) {
        if (options['x'] == null || options['x'] == undefined) {
            this.setX(0);
        } else {
            this.setX( options["x"] );
        }
    }
    if ("y" in options) {
        if (options['y'] == null || options['y'] == undefined) {
            this.setY(0);
        } else {
            this.setY( options["y"] );
        }
    }
    if ("wall" in options) {
        this.wall = options["wall"];
    }
    if ("point" in options) {
        if (options['point'] == null || options['point'] == undefined) {
            this.setX(0);
            this.setY(0);
        } else {
            this.setPoint(options['point']);
        }
    }
    this.pointType = CornerPointTypeEnum.POINTANY;
    if ("pointType" in options) {
        this.pointType = options['pointType'];
    }
}

//This function gets the point type
CornerPoint.prototype.getPointType = function() {
    return this.pointType;
};

//This function gets the wall
CornerPoint.prototype.getWall = function() {
    "use strict";
    return this.wall;
};

//This function gets the point on a 2D plane
CornerPoint.prototype.getPoint = function() {
    "use strict";
    return new Point2D({point: this.point});
};

//This function sets the point values
CornerPoint.prototype.setPoint = function(point) {
    "use strict";
    return this.point.set({point: point});
};

//This function will get the X point value
CornerPoint.prototype.getX = function() {
    "use strict";
    return this.point.getX();
};

//This function will get the Y point value
CornerPoint.prototype.getY = function() {
    "use strict";
    return this.point.getY();
};

//This function will set the X point value
CornerPoint.prototype.setX = function(x) {
    "use strict";
    this.point.setX(x);
};

//This function will set the Y point value
CornerPoint.prototype.setY = function(y) {
    "use strict";
    this.point.setY(y);
};

//This function will return a Hashmap of points X and Y
CornerPoint.prototype.getHashmap = function() {
    "use strict";
    return {x: this.point.getX(), y: this.point.getY()};
};