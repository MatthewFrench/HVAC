/**
 * Created by Matt on 9/19/16.
 */

//Initializes high-level variables.
HVACApplication.prototype.initCreateModeVariables = function () {
    "use strict";
    this.currentCreateModeWall = null;

    this.highlightWalls = [];
};

HVACApplication.prototype.showCreateModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedCreateModeLayout = function () {
    "use strict";
    if (this.currentCreateModeWall == null) {
        this.currentCreateModeWall = new Wall({
            point1: new CornerPoint({x: this.canvasMouseX, y:this.canvasMouseY}),
            point2: new CornerPoint({x: this.canvasMouseX, y:this.canvasMouseY}),
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
        this.currentCreateModeWall.setPoint2X(this.canvasMouseX);
        this.currentCreateModeWall.setPoint2Y(this.canvasMouseY);

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
        this.currentCreateModeWall.setPoint2X( this.canvasMouseX );
        this.currentCreateModeWall.setPoint2Y( this.canvasMouseY );

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

        wallSlicer.call(this, this.getCurrentWallList(), this.highlightWalls);
    }
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawCreateModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    var closePointArray = [];
    closePointArray.push(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}));
    if (this.currentCreateModeWall != null) {
        if (this.selectedWallPoint == WALL_POINT_ONE) {
            closePointArray.push( this.currentCreateModeWall.getCornerPoint1().getPoint() );
        }
        if (this.selectedWallPoint == WALL_POINT_TWO) {
            closePointArray.push(this.currentCreateModeWall.getCornerPoint2().getPoint());
        }
    }

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.drawPerpendicular(ctx, closePointArray);
    }

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, this.highlightWalls.indexOf(wall) != -1);
    }

    //Draw create mode starting point
    if (this.currentCreateModeWall == null) {
        var point = snapPointToWalls(this.canvasMouseX, this.canvasMouseY, this.getCurrentWallList(), []);
        ctx.fillStyle = "rgb(150,200,255)";
        ctx.beginPath();
        ctx.arc(point.getX(), point.getY(), 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    if (this.currentCreateModeWall != null) {
        this.currentCreateModeWall.drawLength(ctx);
    }

    ctx.restore();
};