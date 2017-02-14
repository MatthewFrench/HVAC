/**
 * Created by Matt on 9/19/16.
 */

//Creates and initializes the Point variables
HVACApplication.prototype.initEditPointModeVariables = function () {
    "use strict";
    this.currentEditPointSelectedWall = null;
    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
    this.highlightedPoint = null;
};

//Shows the Edit Point Layout Mode
HVACApplication.prototype.showEditPointModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedEditPointModeLayout = function () {
    "use strict";

    var closest = 25; //Limit for how close a wall has to be to the mouse
    var wallCloseness = closest;

    //Checks for closest wall to mouse in selecting an endpoint.
    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        if (pointInCircle(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY, wall.getPoint1X(), wall.getPoint1Y(), closest)) {
            var newClosest = Math.hypot(this.rotatedCanvasMouseX - wall.getPoint1X(), this.rotatedCanvasMouseY - wall.getPoint1Y());
            if (Math.round(closest) == Math.round(newClosest)) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
                if (dist < wallCloseness) {
                    wallCloseness = dist;
                    closest = newClosest;
                    this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                    this.currentEditPointSelectedWall = wall;
                }
            } else if (newClosest < closest) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
                wallCloseness = dist;
                closest = newClosest;
                this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                this.currentEditPointSelectedWall = wall;
            }
        }
        if (pointInCircle(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY, wall.getPoint2X(), wall.getPoint2Y(), closest)) {
            var newClosest = Math.hypot(this.rotatedCanvasMouseX - wall.getPoint2X(), this.rotatedCanvasMouseY - wall.getPoint2Y());
            if (Math.round(closest) == Math.round(newClosest)) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
                if (dist < wallCloseness) {
                    wallCloseness = dist;
                    closest = newClosest;
                    this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                    this.currentEditPointSelectedWall = wall;
                }
            } else if (newClosest < closest) {
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
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
        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
        var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
        if (Math.round(dist) < Math.round(closest)) {
            closest = dist;
            this.highlightedPoint = wall;
        }
    }

    if (this.currentEditPointSelectedWall != null) {
        this.highlightedPoint = this.currentEditPointSelectedWall;
        if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
            this.currentEditPointSelectedWall.setPoint1X( this.rotatedCanvasMouseX );
            this.currentEditPointSelectedWall.setPoint1Y( this.rotatedCanvasMouseY );

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
            this.currentEditPointSelectedWall.setPoint2X( this.rotatedCanvasMouseX );
            this.currentEditPointSelectedWall.setPoint2Y( this.rotatedCanvasMouseY );

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
            this.dragPositionX -= this.rotatedCanvasMouseMovedX;
            this.dragPositionY -= this.rotatedCanvasMouseMovedY;
        }
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedEditPointModeLayout = function () {
    "use strict";
    if (this.currentEditMode == EDIT_MODE_POINT) {
        this.currentEditPointSelectedWall = null;
    }

    wallSlicer.call(this, this.getCurrentWallList(), this.intersectHighlightPoints);
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawEditPointModeLayout = function () {
    "use strict";

    var ctx = this.beginDraw();


    //Draw above and below floors
    var floorList = this.getCurrentBuilding().getFloorList();
    var currentFloor = this.getCurrentFloorPlan();
    var currentFloorIndex = floorList.indexOf(currentFloor);

    if (currentFloorIndex > 0) {
        var underneathFloor = floorList[currentFloorIndex - 1];
        for (var j = 0; j < underneathFloor.getWallList().length; j++) {
            var wall = underneathFloor.getWallList()[j];
            wall.drawDotted(ctx, true);
        }
    }
    if (currentFloorIndex < floorList.length - 1) {
        var aboveFloor = floorList[currentFloorIndex + 1];
        for (var j = 0; j < aboveFloor.getWallList().length; j++) {
            var wall = aboveFloor.getWallList()[j];
            wall.drawDotted(ctx, false);
        }
    }

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
        var canvasWidth = this.layoutCanvas.width;
        var canvasHeight = this.layoutCanvas.height;
        this.currentEditPointSelectedWall.drawLength(ctx, new Point2D({x: canvasWidth/2, y: canvasHeight/2}),
            this.viewAngle, this.viewScale);
    }

    this.endDraw(ctx);
};