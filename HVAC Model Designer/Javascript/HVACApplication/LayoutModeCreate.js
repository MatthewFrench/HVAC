/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.mousePressedCreateModeLayout = function () {
    "use strict";
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;
    if (this.currentCreateWall == null) {
        this.currentCreateWall = new WallObject(canvasMouseX, canvasMouseY, canvasMouseX, canvasMouseY);
        this.wallList.push(this.currentCreateWall);
        var point = snapPointToWalls(this.currentCreateWall.x1,
            this.currentCreateWall.y1, this.wallList, [this.currentCreateWall]);
        this.currentCreateWall.x1 = point.x;
        this.currentCreateWall.y1 = point.y;
    }
};

HVACApplication.prototype.mouseMovedCreateModeLayout = function () {
    "use strict";
    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    if (this.currentCreateWall != null) {
        this.currentCreateWall.x2 = canvasMouseX;
        this.currentCreateWall.y2 = canvasMouseY;

        snapWallToDecimalFromPoint1(this.currentCreateWall);

        var point = snapPointToWalls(this.currentCreateWall.x2,
            this.currentCreateWall.y2, this.wallList, [this.currentCreateWall]);
        this.currentCreateWall.x2 = point.x;
        this.currentCreateWall.y2 = point.y;

        if (this.shiftPressed) {
            var line = getLinePoint2SnappedToNearestIncrement(this.currentCreateWall.x1, this.currentCreateWall.y1,
                this.currentCreateWall.x2, this.currentCreateWall.y2, 45);
            this.currentCreateWall.x2 = line.x2;
            this.currentCreateWall.y2 = line.y2;
        }
    }
};

HVACApplication.prototype.mouseReleasedCreateModeLayout = function () {
    "use strict";
    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

    if (this.currentCreateWall != null) {
        this.currentCreateWall.x2 = canvasMouseX;
        this.currentCreateWall.y2 = canvasMouseY;

        snapWallToDecimalFromPoint1(this.currentCreateWall);

        var point = snapPointToWalls(this.currentCreateWall.x2,
            this.currentCreateWall.y2, this.wallList, [this.currentCreateWall]);
        this.currentCreateWall.x2 = point.x;
        this.currentCreateWall.y2 = point.y;

        if (this.shiftPressed) {
            var line = getLinePoint2SnappedToNearestIncrement(this.currentCreateWall.x1, this.currentCreateWall.y1,
                this.currentCreateWall.x2, this.currentCreateWall.y2, 45);
            this.currentCreateWall.x2 = line.x2;
            this.currentCreateWall.y2 = line.y2;
        }

        if (this.currentCreateWall.x1 == this.currentCreateWall.x2 &&
            this.currentCreateWall.y1 == this.currentCreateWall.y2) {
            this.wallList.splice(this.wallList.indexOf(this.currentCreateWall), 1);
        }

        this.currentCreateWall = null;
    }
};

HVACApplication.prototype.drawCreateModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    var closePointArray = [];
    closePointArray.push(new Point2D(this.currentMouseX, this.currentMouseY));
    if (this.currentCreateWall != null) {
        if (this.selectedWallPoint == WALL_POINT_ONE) {
            closePointArray.push(new Point2D(this.currentCreateWall.x1, this.currentCreateWall.y1));
        }
        if (this.selectedWallPoint == WALL_POINT_TWO) {
            closePointArray.push(new Point2D(this.currentCreateWall.x2, this.currentCreateWall.y2));
        }
    }

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.drawPerpendicular(ctx, closePointArray);
    }

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, false);
    }

    //Draw create mode starting point
    if (this.currentCreateWall == null) {
        var x = this.currentMouseX - this.dragPositionX;
        var y = this.currentMouseY - this.dragPositionY;
        var point = snapPointToWalls(x, y, this.wallList, []);
        ctx.fillStyle = "rgb(150,200,255)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    if (this.currentCreateWall != null) {
        this.currentCreateWall.drawLength(ctx);
    }

    ctx.restore();
};