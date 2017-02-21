/**
 * Created by personal on 10/21/16.
 */

var CornerPointTypeEnum = {
    POINTANY: 0,
    POINT1: 1,
    POINT2: 2
};

//This function loads in the previous options (if any) into the points of the Corner, setting X and Y values
class CornerPoint {
    constructor({x = 0, y = 0, wall = null, point = null, pointType = CornerPointTypeEnum.POINTANY} = {}) {
        this.point = new Point2D();
        this.setX(x);
        this.setY(y);
        this.wall = wall;
        if (point != null) {
            this.setPoint(point);
        }
        this.pointType = pointType;
    }

//This function gets the point type
    getPointType() {
        return this.pointType;
    }

//This function gets the wall
    getWall() {
        return this.wall;
    }

//This function gets the point on a 2D plane
    getPoint() {
        return new Point2D({point: this.point});
    }

//This function sets the point values
    setPoint(point) {
        return this.point.set({point: point});
    }

//This function will get the X point value
    getX() {
        return this.point.getX();
    }

//This function will get the Y point value
    getY() {
        return this.point.getY();
    }

//This function will set the X point value
    setX(x) {
        this.point.setX(x);
    }

//This function will set the Y point value
    setY(y) {
        this.point.setY(y);
    }

//This function will return a Hashmap of points X and Y
    getHashmap() {
        return {x: this.point.getX(), y: this.point.getY()};
    }
}