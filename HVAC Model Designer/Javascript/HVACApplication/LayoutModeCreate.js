/**
 * Created by Matt on 9/19/16.
 */

//Makes the current Create Mode equal to null.
HVACApplication.prototype.initCreateModeVariables = function () {
    "use strict";
    this.currentCreateModeWall = null;
};

//This function shows the Create Mode Layout
HVACApplication.prototype.showCreateModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is clicked
HVACApplication.prototype.mousePressedCreateModeLayout = function () {
    "use strict";
    if (this.currentCreateModeWall == null) {
        this.currentCreateModeWall = new Wall({
            point1: new CornerPoint({x: this.rotatedCanvasMouseX, y:this.rotatedCanvasMouseY}),
            point2: new CornerPoint({x: this.rotatedCanvasMouseX, y:this.rotatedCanvasMouseY}),
            floor: this.getCurrentFloorPlan()});
        var point = snapPointToWalls(this.currentCreateModeWall.getPoint1X(),
            this.currentCreateModeWall.getPoint1Y(), this.getCurrentWallList(), [this.currentCreateModeWall]);
        this.currentCreateModeWall.getCornerPoint1().setX(point.getX());
        this.currentCreateModeWall.getCornerPoint1().setY(point.getY());
        this.currentCreateModeWall.getCornerPoint2().setX(point.getX());
        this.currentCreateModeWall.getCornerPoint2().setY(point.getY());
    }
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedCreateModeLayout = function () {
    "use strict";


    if (this.currentCreateModeWall != null) {
        this.currentCreateModeWall.setPoint2X(this.rotatedCanvasMouseX);
        this.currentCreateModeWall.setPoint2Y(this.rotatedCanvasMouseY);

        //snapWallToDecimalFromPoint1(this.currentCreateModeWall);

        var point = snapPointToWalls(this.currentCreateModeWall.getPoint2X(),
            this.currentCreateModeWall.getPoint2Y(), this.getCurrentWallList(), [this.currentCreateModeWall]);
        this.currentCreateModeWall.setPoint2X( point.getX() );
        this.currentCreateModeWall.setPoint2Y( point.getY() );

        if (this.shiftPressed) {
            var line = getLinePoint2SnappedToNearestRotation(this.currentCreateModeWall.getPoint1X(), this.currentCreateModeWall.getPoint1Y(),
                this.currentCreateModeWall.getPoint2X(), this.currentCreateModeWall.getPoint2Y(), 45);
            this.currentCreateModeWall.setPoint2X( line.getPoint2X() );
            this.currentCreateModeWall.setPoint2Y( line.getPoint2Y() );
        }
    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedCreateModeLayout = function () {
    "use strict";

    if (this.currentCreateModeWall != null) {
        this.currentCreateModeWall.setPoint2X( this.rotatedCanvasMouseX );
        this.currentCreateModeWall.setPoint2Y( this.rotatedCanvasMouseY );

        //snapWallToDecimalFromPoint1(this.currentCreateModeWall);

        var point = snapPointToWalls(this.currentCreateModeWall.getPoint2X(),
            this.currentCreateModeWall.getPoint2Y(), this.getCurrentWallList(), [this.currentCreateModeWall]);
        this.currentCreateModeWall.setPoint2X( point.getX() );
        this.currentCreateModeWall.setPoint2Y( point.getY() );

        if (this.shiftPressed) {
            var line = getLinePoint2SnappedToNearestRotation(this.currentCreateModeWall.getPoint1X(), this.currentCreateModeWall.getPoint1Y(),
                this.currentCreateModeWall.getPoint2X(), this.currentCreateModeWall.getPoint2Y(), 45);
            this.currentCreateModeWall.setPoint2X( line.getPoint2X() );
            this.currentCreateModeWall.setPoint2Y( line.getPoint2Y() );
        }

        if (this.currentCreateModeWall.getPoint1X() == this.currentCreateModeWall.getPoint2X() &&
            this.currentCreateModeWall.getPoint1Y() == this.currentCreateModeWall.getPoint2Y()) {
            this.getCurrentWallList().splice(this.getCurrentWallList().indexOf(this.currentCreateModeWall), 1);
        }

        this.currentCreateModeWall = null;

        wallSlicer.call(this, this.getCurrentWallList(), this.intersectHighlightPoints);
    }
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawCreateModeLayout = function () {
    "use strict";
    var ctx = this.beginDraw();

    //Draw above and below floors
    var floorList = this.getCurrentBuilding().getFloorList();
    var currentFloor = this.getCurrentFloorPlan();
    var currentFloorIndex = floorList.indexOf(currentFloor);

    //Gets the walls of the Floor beneath the current one and displays on canvas
    if (currentFloorIndex > 0) {
        var underneathFloor = floorList[currentFloorIndex - 1];
        for (var j = 0; j < underneathFloor.getWallList().length; j++) {
            var wall = underneathFloor.getWallList()[j];
            wall.drawDotted(ctx, true);
        }
    }

    //Gets the walls of the Floor beneath the current one and displays on canvas
    if (currentFloorIndex < floorList.length - 1) {
        var aboveFloor = floorList[currentFloorIndex + 1];
        for (var j = 0; j < aboveFloor.getWallList().length; j++) {
            var wall = aboveFloor.getWallList()[j];
            wall.drawDotted(ctx, false);
        }
    }

    var closePointArray = [];
    closePointArray.push(new Point2D({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}));
    if (this.currentCreateModeWall != null) {
        if (this.selectedWallPoint == WALL_POINT_ONE) {
            closePointArray.push( this.currentCreateModeWall.getCornerPoint1().getPoint() );
        }
        if (this.selectedWallPoint == WALL_POINT_TWO) {
            closePointArray.push(this.currentCreateModeWall.getCornerPoint2().getPoint());
        }
    }

    if (this.showMouse) {
        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }
    }

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    //Draw create mode starting point
    if (this.currentCreateModeWall == null && this.showMouse) {
        var point = snapPointToWalls(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY, this.getCurrentWallList(), []);
        ctx.fillStyle = "rgb(150,200,255)";
        ctx.beginPath();
        ctx.arc(point.getX(), point.getY(), 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    if (this.currentCreateModeWall != null) {
        var canvasWidth = this.layoutCanvas.width;
        var canvasHeight = this.layoutCanvas.height;
        this.currentCreateModeWall.drawLength(ctx, new Point2D({x: canvasWidth/2, y: canvasHeight/2}),
            this.viewAngle, this.viewScale);
    }

    this.endDraw(ctx);
};