/**
 * Created by matt on 2/21/17.
 */

class Canvas2D {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas = CreateElement({
            type: 'canvas',
            className: 'Canvas2D',
            onMouseDown: CreateFunction(this, this.layoutCanvasMousePressed),
            onMouseUp: CreateFunction(this, this.layoutCanvasMouseReleased),
            onMouseMove: CreateFunction(this, this.layoutCanvasMouseMoved)
        });

        this.shiftPressed = false;
        this.currentMouseX = 0.0;
        this.currentMouseY = 0.0;
        this.previousMouseX = 0.0;
        this.previousMouseY = 0.0;
        this.mouseMovedX = 0.0;
        this.mouseMovedY = 0.0;
        this.canvasMouseX = 0.0;
        this.canvasMouseY = 0.0;
        this.rotatedCanvasMouseX = 0.0;
        this.rotatedCanvasMouseY = 0.0;
        this.rotatedCanvasMouseMovedX = 0.0;
        this.rotatedCanvasMouseMovedY = 0.0;
        this.mouseDown = false;
        this.intersectHighlightPoints = [];

        this.currentCreateModeWall = null;

        document.body.addEventListener("resize", CreateFunction(this, this.resizeCanvas));
    }

    logic() {
        var ctx = this.beginDraw(this.canvas, this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

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


        var closePointArray = [];
        closePointArray.push(new Point2D({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}));
        /*
         if (this.currentCreateModeWall != null) {
         if (this.selectedWallPoint == WALL_POINT_ONE) {
         closePointArray.push( this.currentCreateModeWall.getCornerPoint1().getPoint() );
         }
         if (this.selectedWallPoint == WALL_POINT_TWO) {
         closePointArray.push(this.currentCreateModeWall.getCornerPoint2().getPoint());
         }
         }
         */

        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }

        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];
            wall.draw(ctx, false);
        }

        //Draw create mode starting point
        var point = snapPointToWalls(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY, this.hvacApplication.getCurrentWallList(), []);
        ctx.fillStyle = "rgb(150,200,255)";
        ctx.beginPath();
        ctx.arc(point.getX(), point.getY(), 5, 0, 2 * Math.PI);
        ctx.fill();


        if (this.currentCreateModeWall != null) {
            var canvasWidth = this.canvas.width;
            var canvasHeight = this.canvas.height;
            this.currentCreateModeWall.drawLength(ctx, new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}),
                0.0, this.hvacApplication.viewScale);
        }

        this.endDraw(ctx);
    }

    //Begin and End draw are duplicate drawing code for all layout modes
    beginDraw(canvas, viewAngle, viewScale) {
        if (this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        }

        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.save();

        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        ctx.rotate(viewAngle); //convertToRadians(this.hvacApplication.viewAngle)

        ctx.scale(viewScale, viewScale);

        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

        return ctx;
    }

    drawSlicePoints(canvas, viewAngle, viewScale, intersectHighlightPoints) {
        //Draw slice intersection points
        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        ctx.save();
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(viewAngle); //convertToRadians(this.hvacApplication.viewAngle)
        ctx.scale(viewScale, viewScale); //convertToRadians(this.hvacApplication.viewAngle)
        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
        for (var i in intersectHighlightPoints) {
            var intersectPoint = intersectHighlightPoints[i];
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4.0;
            ctx.strokeRect(intersectPoint.getX() - 5, intersectPoint.getY() - 5, 10, 10);
        }
        ctx.restore();
    }

    endDraw(ctx) {
        ctx.restore();
    }


    resizeCanvas() {
        console.log("Resizing canvas");
//    "use strict";
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    };


    setRotatedCanvasMouse() {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;
        var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
            new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}), this.hvacApplication.viewAngle, this.hvacApplication.viewScale);
        this.rotatedCanvasMouseX = p.getX();
        this.rotatedCanvasMouseY = p.getY();
    };


    layoutCanvasMousePressed(event) {
        "use strict";
        var mouseX = event.offsetX - this.canvas.clientLeft;
        var mouseY = event.offsetY - this.canvas.clientTop;
        if (event.which == 3) return;
        this.mouseDown = true;
        this.previousMouseX = this.currentMouseX;
        this.currentMouseX = mouseX;
        this.previousMouseY = this.currentMouseY;
        this.currentMouseY = mouseY;

        this.canvasMouseX = this.currentMouseX;
        this.canvasMouseY = this.currentMouseY;

        this.setRotatedCanvasMouse();

        this.mousePressedCreateModeLayout();
        /*
         if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
         this.mousePressedCreateModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
         this.mousePressedDragModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
         if (this.currentEditMode == EDIT_MODE_POINT) {
         this.mousePressedEditPointModeLayout();
         }
         if (this.currentEditMode == EDIT_MODE_CORNER) {
         this.mousePressedEditCornerModeLayout();
         }
         }
         if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
         this.mousePressedViewModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
         this.mousePressedDeleteModeLayout();
         }
         */
    };

    layoutCanvasMouseMoved(event) {
        var mouseX = event.offsetX - this.hvacApplication.applicationDiv.offsetLeft - this.hvacApplication.applicationDiv.clientLeft;
        var mouseY = event.offsetY - this.hvacApplication.applicationDiv.offsetTop - this.hvacApplication.applicationDiv.clientTop;
        this.previousMouseX = this.currentMouseX;
        this.currentMouseX = mouseX;
        this.previousMouseY = this.currentMouseY;
        this.currentMouseY = mouseY;

        this.mouseMovedX = this.previousMouseX - this.currentMouseX;
        this.mouseMovedY = this.previousMouseY - this.currentMouseY;

        this.canvasMouseX = this.currentMouseX;
        this.canvasMouseY = this.currentMouseY;


        var oldRotatedX = this.rotatedCanvasMouseX;
        var oldRotatedY = this.rotatedCanvasMouseY;
        this.setRotatedCanvasMouse();
        this.rotatedCanvasMouseMovedX = oldRotatedX - this.rotatedCanvasMouseX;
        this.rotatedCanvasMouseMovedY = oldRotatedY - this.rotatedCanvasMouseY;

        this.mouseMovedCreateModeLayout();
        /*
         if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
         this.mouseMovedCreateModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
         this.mouseMovedDragModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
         if (this.currentEditMode == EDIT_MODE_POINT) {
         this.mouseMovedEditPointModeLayout();
         }
         if (this.currentEditMode == EDIT_MODE_CORNER) {
         this.mouseMovedEditCornerModeLayout();
         }
         }
         if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
         this.mouseMovedViewModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
         this.mouseMovedDeleteModeLayout();
         }
         */

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    };

    layoutCanvasMouseReleased(event) {
        "use strict";
        var mouseX = event.offsetX - this.canvas.clientLeft;
        var mouseY = event.offsetY - this.canvas.clientTop;
        if (event.which == 3) return;
        this.mouseDown = false;
        this.previousMouseX = this.currentMouseX;
        this.currentMouseX = mouseX;
        this.previousMouseY = this.currentMouseY;
        this.currentMouseY = mouseY;

        this.canvasMouseX = this.currentMouseX;
        this.canvasMouseY = this.currentMouseY;

        this.setRotatedCanvasMouse();

        this.mouseReleasedCreateModeLayout();
        /*
         if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
         this.mouseReleasedCreateModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
         this.mouseReleasedDragModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
         if (this.currentEditMode == EDIT_MODE_POINT) {
         this.mouseReleasedEditPointModeLayout();
         }
         if (this.currentEditMode == EDIT_MODE_CORNER) {
         this.mouseReleasedEditCornerModeLayout();
         }
         }
         if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
         this.mouseReleasedViewModeLayout();
         }
         if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
         this.mouseReleasedDeleteModeLayout();
         }
         */
    };

    // ******** FROM CreateLayoutMode ********** //
    //Action taken for when the mouse is clicked
    mousePressedCreateModeLayout() {
        "use strict";
        if (this.currentCreateModeWall == null) {
            this.currentCreateModeWall = new Wall({
                point1: new CornerPoint({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}),
                point2: new CornerPoint({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}),
                floor: this.hvacApplication.getCurrentFloorPlan()
            });
            var point = snapPointToWalls(this.currentCreateModeWall.getPoint1X(),
                this.currentCreateModeWall.getPoint1Y(), this.hvacApplication.getCurrentWallList(), [this.currentCreateModeWall]);
            this.currentCreateModeWall.getCornerPoint1().setX(point.getX());
            this.currentCreateModeWall.getCornerPoint1().setY(point.getY());
            this.currentCreateModeWall.getCornerPoint2().setX(point.getX());
            this.currentCreateModeWall.getCornerPoint2().setY(point.getY());
        }
    }

//Action taken for when the mouse is moving.
    mouseMovedCreateModeLayout() {
        "use strict";


        if (this.currentCreateModeWall != null) {
            this.currentCreateModeWall.setPoint2X(this.rotatedCanvasMouseX);
            this.currentCreateModeWall.setPoint2Y(this.rotatedCanvasMouseY);

            //snapWallToDecimalFromPoint1(this.currentCreateModeWall);

            var point = snapPointToWalls(this.currentCreateModeWall.getPoint2X(),
                this.currentCreateModeWall.getPoint2Y(), this.hvacApplication.getCurrentWallList(), [this.currentCreateModeWall]);
            this.currentCreateModeWall.setPoint2X(point.getX());
            this.currentCreateModeWall.setPoint2Y(point.getY());

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestRotation(this.currentCreateModeWall.getPoint1X(), this.currentCreateModeWall.getPoint1Y(),
                    this.currentCreateModeWall.getPoint2X(), this.currentCreateModeWall.getPoint2Y(), 45);
                this.currentCreateModeWall.setPoint2X(line.getPoint2X());
                this.currentCreateModeWall.setPoint2Y(line.getPoint2Y());
            }
        }
    }

//Action taken for when the mouse is released.
    mouseReleasedCreateModeLayout() {
        "use strict";

        if (this.currentCreateModeWall != null) {
            this.currentCreateModeWall.setPoint2X(this.rotatedCanvasMouseX);
            this.currentCreateModeWall.setPoint2Y(this.rotatedCanvasMouseY);

            //snapWallToDecimalFromPoint1(this.currentCreateModeWall);

            var point = snapPointToWalls(this.currentCreateModeWall.getPoint2X(),
                this.currentCreateModeWall.getPoint2Y(), this.hvacApplication.getCurrentWallList(), [this.currentCreateModeWall]);
            this.currentCreateModeWall.setPoint2X(point.getX());
            this.currentCreateModeWall.setPoint2Y(point.getY());

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestRotation(this.currentCreateModeWall.getPoint1X(), this.currentCreateModeWall.getPoint1Y(),
                    this.currentCreateModeWall.getPoint2X(), this.currentCreateModeWall.getPoint2Y(), 45);
                this.currentCreateModeWall.setPoint2X(line.getPoint2X());
                this.currentCreateModeWall.setPoint2Y(line.getPoint2Y());
            }

            if (this.currentCreateModeWall.getPoint1X() == this.currentCreateModeWall.getPoint2X() &&
                this.currentCreateModeWall.getPoint1Y() == this.currentCreateModeWall.getPoint2Y()) {
                this.hvacApplication.getCurrentWallList().splice(this.hvacApplication.getCurrentWallList().indexOf(this.currentCreateModeWall), 1);
            }

            this.currentCreateModeWall = null;

            wallSlicer.call(this, this.hvacApplication.getCurrentWallList(), this.intersectHighlightPoints);
        }
    }


    onKeydown(event) {
        "use strict";
        //var key = event.which;
        if (event.shiftKey) {
            this.shiftPressed = true;
        }
    }

    onKeyup(event) {
        "use strict";
        //var key = event.which;
        if (!event.shiftKey) {
            this.shiftPressed = false;
        }
    }

    getCanvas() {
        return this.canvas;
    }
}