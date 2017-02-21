/**
 * Created by matt on 2/6/17.
 */

class CreateView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'CreateView_mainDiv'});
    }

    show () {}
    hide () {}

    logic() {
        var ctx = this.hvacApplication.beginDraw();

        //Draw above and below floors
        var floorList = this.hvacApplication.getCurrentBuilding().getFloorList();
        var currentFloor = this.hvacApplication.getCurrentFloorPlan();
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

/*
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
        */

        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }

        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.draw(ctx, false);
        }

        //Draw create mode starting point
            var point = snapPointToWalls(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY, this.getCurrentWallList(), []);
            ctx.fillStyle = "rgb(150,200,255)";
            ctx.beginPath();
            ctx.arc(point.getX(), point.getY(), 5, 0, 2 * Math.PI);
            ctx.fill();

            var canvasWidth = this.layoutCanvas.width;
            var canvasHeight = this.layoutCanvas.height;
            this.currentCreateModeWall.drawLength(ctx, new Point2D({x: canvasWidth/2, y: canvasHeight/2}),
                this.viewAngle, this.viewScale);


        this.hvacApplication.endDraw(ctx);
    }

    getDiv() {
        return this.mainDiv;
    }
}