/**
 * Created by personal on 10/21/16.
 */

//This function loads the options (if any) and sets the 2D point (X and Y values)
class Point2D {
    constructor({x = 0.0, y = 0.0, point = null} = {}) {
        this.x = x;
        this.y = y;
        if (point != null) {
            this.x = point.getX();
            this.y = point.getY();
        }
    }

//This function sets X and Y values based on options
    set({x = 0.0, y = 0.0, point = null} = {}) {
        this.x = x;
        this.y = y;
        if (point != null) {
            this.x = point.getX();
            this.y = point.getY();
        }
    }

//This function gets the X value
    getX() {
        return this.x;
    }

//This function gets the Y value
    getY() {
        return this.y;
    }

//This function sets the X value
    setX(x) {
        this.x = x;
    }

//This function sets the Y value
    setY(y) {
        this.y = y;
    }

//This function tests to see if the given X and Y values are inside of a circle
    isInCircle(cx, cy, radius) {
        var distancesquared = (this.x - cx) * (this.x - cx) + (this.y - cy) * (this.y - cy);
        return distancesquared <= radius * radius;
    }
}