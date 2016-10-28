/**
 * Created by Matt on 9/19/16.
 */

//Initializes high-level variables.
HVACApplication.prototype.initEditPointModeVariables = function () {
    "use strict";
    this.currentEditPointSelectedWall = null;
    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
    this.highlightedPoint = null;
};

HVACApplication.prototype.showEditPointModeLayout = function () {

};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditPointModeLayout = function () {
    "use strict";

    var closest = 25;
    var wallCloseness = closest;
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        if (pointInCircle(this.canvasMouseX, this.canvasMouseY, wall.getPoint1X(), wall.getPoint1Y(), closest)) {
            var newClosest = Math.hypot(this.canvasMouseX - wall.getPoint1X(), this.canvasMouseY - wall.getPoint1Y());
            if (Math.round(closest) == Math.round(newClosest)) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
                var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
                if (dist < wallCloseness) {
                    wallCloseness = dist;
                    closest = newClosest;
                    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                    this.currentEditPointSelectedWall = wall;
                }
            } else if (newClosest < closest) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
                var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
                wallCloseness = dist;
                closest = newClosest;
                this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                this.currentEditPointSelectedWall = wall;
            }
        }
        if (pointInCircle(this.canvasMouseX, this.canvasMouseY, wall.getPoint2X(), wall.getPoint2Y(), closest)) {
            var newClosest = Math.hypot(this.canvasMouseX - wall.getPoint2X(), this.canvasMouseY - wall.getPoint2Y());
            if (Math.round(closest) == Math.round(newClosest)) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
                var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
                if (dist < wallCloseness) {
                    wallCloseness = dist;
                    closest = newClosest;
                    this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                    this.currentEditPointSelectedWall = wall;
                }
            } else if (newClosest < closest) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
                var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
                wallCloseness = dist;
                closest = newClosest;
                this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                this.currentEditPointSelectedWall = wall;
            }
        }
    }
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedEditPointModeLayout = function () {
    "use strict";

    this.highlightedPoint = null;
    var closest = 15;
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.canvasMouseX, this.canvasMouseY);
        var dist = Math.hypot(point.getX() - this.canvasMouseX, point.getY() - this.canvasMouseY);
        if (Math.round(dist) < Math.round(closest)) {
            closest = dist;
            this.highlightedPoint = wall;
        }
    }

    if (this.currentEditPointSelectedWall != null) {
        this.highlightedPoint = this.currentEditPointSelectedWall;
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
            this.currentEditPointSelectedWall.setPoint1X( this.canvasMouseX );
            this.currentEditPointSelectedWall.setPoint1Y( this.canvasMouseY );

            //snapWallToDecimalFromPoint2(this.currentEditPointSelectedWall);

            //Auto snap
            var point = snapPointToWalls(this.currentEditPointSelectedWall.getPoint1X(),
                this.currentEditPointSelectedWall.getPoint1Y(), this.getCurrentWallList(), [this.currentEditPointSelectedWall]);
            this.currentEditPointSelectedWall.setPoint1X( point.getX() );
            this.currentEditPointSelectedWall.setPoint1Y( point.getY() );

            if (this.shiftPressed) {
                var line = getLinePoint1SnappedToNearestRotation(this.currentEditPointSelectedWall.getPoint1X(), this.currentEditPointSelectedWall.getPoint1Y(),
                    this.currentEditPointSelectedWall.getPoint2X(), this.currentEditPointSelectedWall.getPoint2Y(), 45);
                this.currentEditPointSelectedWall.setPoint1X( line.getPoint1X() );
                this.currentEditPointSelectedWall.setPoint1Y( line.getPoint1Y() );
            }

        }
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_TWO) {
            this.currentEditPointSelectedWall.setPoint2X( this.canvasMouseX );
            this.currentEditPointSelectedWall.setPoint2Y( this.canvasMouseY );

            //snapWallToDecimalFromPoint1(this.currentEditPointSelectedWall);

            //Auto snap
            var point = snapPointToWalls(this.currentEditPointSelectedWall.getPoint2X(),
                this.currentEditPointSelectedWall.getPoint2Y(), this.getCurrentWallList(), [this.currentEditPointSelectedWall]);
            this.currentEditPointSelectedWall.setPoint2X( point.getX() );
            this.currentEditPointSelectedWall.setPoint2Y( point.getY() );

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestRotation(this.currentEditPointSelectedWall.getPoint1X(), this.currentEditPointSelectedWall.getPoint1Y(),
                    this.currentEditPointSelectedWall.getPoint2X(), this.currentEditPointSelectedWall.getPoint2Y(), 45);
                this.currentEditPointSelectedWall.setPoint2X( line.getPoint2X() );
                this.currentEditPointSelectedWall.setPoint2Y( line.getPoint2Y() );
            }

        }
    } else {
        if (this.mouseDown) {
            this.dragPositionX -= this.mouseMovedX;
            this.dragPositionY -= this.mouseMovedY;
        }
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedEditPointModeLayout = function () {
    "use strict";
    if (this.currentEditMode == EDIT_MODE_POINT) {
        this.currentEditPointSelectedWall = null;
    }

    wallSlicer.call(this, this.getCurrentWallList());
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawEditPointModeLayout = function () {
    "use strict";

    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    var closePointArray = [];
    closePointArray.push(new Point2D({x:this.currentMouseX, y:this.currentMouseY}));
    if (this.currentEditPointSelectedWall != null) {
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
            closePointArray.push(new Point2D({x: this.currentEditPointSelectedWall.getPoint1X(), y: this.currentEditPointSelectedWall.getPoint1Y()}));
        }
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_TWO) {
            closePointArray.push(new Point2D({x: this.currentEditPointSelectedWall.getPoint2X(), y: this.currentEditPointSelectedWall.getPoint2Y()}));
        }
    }

    if (this.currentEditPointSelectedWall != null) {
        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }
    }

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, wall == this.highlightedPoint);
    }

    if (this.currentEditPointSelectedWall != null) {
        this.currentEditPointSelectedWall.drawLength(ctx);
    }

    ctx.restore();
}