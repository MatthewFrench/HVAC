/**
 * Created by personal on 10/21/16.
 */

//This function loads options (if any) and creates corners and floor plans from it.
class Wall {
    constructor({point1 = null, point2 = null, floor = null} = {}) {
        this.cornerPoint1 = new CornerPoint({
            point: point1,
            pointType: CornerPointTypeEnum.POINT1,
            wall: this
        });
        this.cornerPoint2 = new CornerPoint({
            point: point2,
            pointType: CornerPointTypeEnum.POINT2,
            wall: this
        });
        this.floorPlan = floor;
        if (this.floorPlan != null) this.floorPlan.addWall(this);
    }

//This function gets the first corner's point values
    getCornerPoint1() {
        return this.cornerPoint1;
    }

//This function gets the second corner's point values
    getCornerPoint2() {
        return this.cornerPoint2;
    }

//This function gets the floor plan
    getFloorPlan() {
        return this.floorPlan;
    }

//This function gets a line
    getLine() {
        return new Line2D({point1: this.cornerPoint1.getPoint(), point2: this.cornerPoint2.getPoint()});
    }

//This function sets the values of a line
    setLine(line) {
        this.cornerPoint1.setPoint(line.getPoint1());
        this.cornerPoint2.setPoint(line.getPoint2());
    }

//This function takes the two corners and puts them into storage
    getHashmap() {
        return {point1: this.cornerPoint1.getHashmap(), point2: this.cornerPoint2.getHashmap()};
    }

//This function gets the first point's X value
    getPoint1X() {
        return this.cornerPoint1.getX();
    }

//This function gets the second point's X Value
    getPoint2X() {
        return this.cornerPoint2.getX();
    }

//This function gets the first point's Y value
    getPoint1Y() {
        return this.cornerPoint1.getY();
    }

//This function gets the second point's Y value
    getPoint2Y() {
        return this.cornerPoint2.getY();
    }

//This function sets the first point's X value
    setPoint1X(x) {
        this.cornerPoint1.setX(x);
    }

//This function sets the second point's X value
    setPoint2X(x) {
        this.cornerPoint2.setX(x);
    }

//This function sets the first point's Y value
    setPoint1Y(y) {
        this.cornerPoint1.setY(y);
    }

//This function sets the second point's Y value
    setPoint2Y(y) {
        this.cornerPoint2.setY(y);
    }
}