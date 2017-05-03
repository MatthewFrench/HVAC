/**
 * Created by matt on 2/21/17.
 */

var WALL_POINT_ONE = 1, WALL_POINT_TWO = 2;
var scaleFactor = 1.1; //Scale for how much the canvas zooms in/out

//Allows for zooming in/out of the canvas by scrolling
var handleScroll = function (evt) {
    var delta;
    if (evt.wheelDelta) {
        delta = evt.wheelDelta / 40;
    }
    else if (evt.detail) {
        delta = -evt.detail;
    }
    else {
        delta = 0;
    }

    if (delta) {
        var factor = Math.pow(scaleFactor, delta);
        this.hvacApplication.viewScale = factor * this.hvacApplication.viewScale;

        if (this.hvacApplication.viewScale > 2) {
            this.hvacApplication.viewScale = 2;
        }
        else if (this.hvacApplication.viewScale < 0.25) {
            this.hvacApplication.viewScale = 0.25;
        }
    }
    evt.preventDefault();
};

/**
 * Creates the variables for Wall Connecting for Corner Editing.
 */
class WallConnection {

    /**
     * Initializes the WallConnection class and its properties.
     *
     * @param cornerPoint: Coordinate point that connects two walls.
     * @param connectedWall: The wall that is connected to the cornerPoint.
     * @constructor
     */
    constructor(cornerPoint, connectedWall) {
        this.cornerPoint = cornerPoint;
        this.connectedWall = connectedWall;
        var lengthOfWall = Math.hypot(connectedWall.getPoint2X() - connectedWall.getPoint1X(),
                connectedWall.getPoint2Y() - connectedWall.getPoint1Y());
        this.percentageOnWallLine = Math.hypot(cornerPoint.getX() - connectedWall.getPoint1X(),
                cornerPoint.getY() - connectedWall.getPoint1Y()) / lengthOfWall;
    }

    /**
     * This function reattaches two walls that were previously split.
     */
    reattach() {
        var newX = (this.connectedWall.getPoint2X() - this.connectedWall.getPoint1X())
            * this.percentageOnWallLine + this.connectedWall.getPoint1X();
        var newY = (this.connectedWall.getPoint2Y() - this.connectedWall.getPoint1Y())
            * this.percentageOnWallLine + this.connectedWall.getPoint1Y();
        this.cornerPoint.setX(newX);
        this.cornerPoint.setY(newY);
    }
}

/**
 * The part of the interface that holds all of the 2D drawing effects and floor designs.
 */
class Canvas2D {

    /**
     * Initializes the canvas2D class and sets its properties.
     *
     * @param hvacApplication: The overall control that the Canvas2D is a part of.
     * @param allowCreatingWalls: Determines if the current mode allows creating new walls.
     * @param allowEditingPoints: Determines if the current mode allows editing current wall endpoints.
     * @param allowCornerEditing: Determines if the current mode allows editing current corner points between walls.
     * @param allowDeletingWalls: Determines if the current mode allows deleting existing walls.
     * @param allowDragging: Determines if the mouse is able to drag the canvas.
     * @param allowRotating: Determines if the mouse is able to rotate the canvas.
     * @constructor
     */
    constructor({hvacApplication, allowCreatingWalls = false, allowEditingPoints = false, allowCornerEditing = false,
                allowDeletingWalls = false, allowDragging = false, allowRotating = false} = {}) {
        this.hvacApplication = hvacApplication;
        this.allowCreatingWalls = allowCreatingWalls;
        this.allowEditingPoints = allowEditingPoints;
        this.allowCornerEditing = allowCornerEditing;
        this.allowDeletingWalls = allowDeletingWalls;
        this.allowDragging = allowDragging;
        this.allowRotating = allowRotating;
        this.canvas = CreateElement({
            type: 'canvas',
            className: 'Canvas2D',
            onMouseDown: CreateFunction(this, this.layoutCanvasMousePressed),
            onMouseUp: CreateFunction(this, this.layoutCanvasMouseReleased),
            onMouseMove: CreateFunction(this, this.layoutCanvasMouseMoved),
            onMouseOut: CreateFunction(this, this.layoutCanvasMouseOut),
            onMouseOver: CreateFunction(this, this.layoutCanvasMouseOver)
        });
        this.canvas.tabIndex = "1";

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
        this.mouseIsOnCanvas = true;

        //Create Wall Variables
        this.currentCreateWall = null;

        //Edit Point Variables
        this.currentEditPointSelectedWall = null;
        this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
        this.highlightedPoint = null;

        //Edit Corner Variables
        this.currentEditCornerSelectedCornerPoints = [];
        this.highlightedCorners = [];

        //Delete Wall Variables
        this.highlightedDeleteWall = null;

        //Rotating Variables
        this.mouseAngle = 0;

        window.addEventListener("resize", CreateFunction(this, this.resizeCanvas));
        this.canvas.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);
        this.canvas.addEventListener('keydown', CreateFunction(this, this.onKeydown), false );
        this.canvas.addEventListener('keyup', CreateFunction(this, this.onKeyup), false );
    }

    /**
     * Repeated process for refreshing the layout of the canvas.
     */
    logic() {
        if (this.hvacApplication.getCurrentBuilding() == null) return;
        var ctx = this.beginDraw(this.canvas, this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        //Draw above and below floors
        var floorList = this.hvacApplication.getCurrentBuilding().getFloorList();
        var currentFloor = this.hvacApplication.getCurrentFloorPlan();
        var currentFloorIndex = floorList.indexOf(currentFloor);

        //Checks if there exists a floor underneath the current floor. If so, show it on the canvas.
        if (currentFloorIndex > 0) {
            var underneathFloor = floorList[currentFloorIndex - 1];
            for (var j = 0; j < underneathFloor.getWallList().length; j++) {
                var wall = underneathFloor.getWallList()[j];
                wall.drawDotted(ctx, true);
            }
        }

        //Checks if there exists a floor above the current floor. If so, show it on the canvas.
        if (currentFloorIndex < floorList.length - 1) {
            var aboveFloor = floorList[currentFloorIndex + 1];
            for (var j = 0; j < aboveFloor.getWallList().length; j++) {
                var wall = aboveFloor.getWallList()[j];
                wall.drawDotted(ctx, false);
            }
        }

        var closePointArray = [];

        //Checks if in Create Wall mode and mouse is on the canvas to see if the mouse is close to a wall to snap to it
        if (this.allowCreatingWalls && this.mouseIsOnCanvas) {
            closePointArray.push(new Point2D({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}));
        }

        //Checks if in Edit Point mode and mouse is on the canvas to see if the mouse is close to a wall to snap to it
        if (this.allowEditingPoints && this.mouseIsOnCanvas) {
            if (this.currentEditPointSelectedWall != null) {
                if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
                    closePointArray.push(new Point2D({x: this.currentEditPointSelectedWall.getPoint1X(),
                        y: this.currentEditPointSelectedWall.getPoint1Y()}));
                }
                if (this.currentEditPointSelectedWallPoint == WALL_POINT_TWO) {
                    closePointArray.push(new Point2D({x: this.currentEditPointSelectedWall.getPoint2X(),
                        y: this.currentEditPointSelectedWall.getPoint2Y()}));
                }
            }
        }

        /**
         * Iterates through the wall list and draws the perpendicular ones while also checking if the mouse is close to
         * one.
         */
        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }

        /**
         * Iterates through the rest of the walls to draw them and determines if the mouse is close enough to highlight
         * each wall.
         */
        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];

            var highlight = false;
            if (this.allowCornerEditing) {
                if (this.currentEditCornerSelectedCornerPoints.length == 0) {
                    highlight = this.highlightedCorners.indexOf(wall) != -1;
                } else {
                    for (var j = 0; j < this.currentEditCornerSelectedCornerPoints.length; j++) {
                        var corner = this.currentEditCornerSelectedCornerPoints[j];
                        if (corner.getWall() == wall) highlight = true;
                    }
                }
            }
            if (this.allowEditingPoints && wall == this.highlightedPoint) {
                highlight = true;
            }
            if (this.allowDeletingWalls && wall == this.highlightedDeleteWall) {
                highlight = true;
            }

            wall.draw(ctx, highlight);
        }

        //Draw create mode starting point
        if (this.allowCreatingWalls && this.mouseIsOnCanvas) {
            var point = snapPointToWalls(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY,
                this.hvacApplication.getCurrentWallList(), []);

            ctx.fillStyle = "rgb(150,200,255)";
            ctx.beginPath();
            ctx.arc(point.getX(), point.getY(), 5, 0, 2 * Math.PI);
            ctx.fill();
        }

        if (this.allowCreatingWalls && this.currentCreateWall != null) {
            var canvasWidth = this.canvas.width;
            var canvasHeight = this.canvas.height;
            this.currentCreateWall.drawLength(ctx, new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}),
                0.0, this.hvacApplication.viewScale);
        }

        if (this.allowEditingPoints && this.currentEditPointSelectedWall != null) {
            var canvasWidth = this.canvas.width;
            var canvasHeight = this.canvas.height;
            this.currentEditPointSelectedWall.drawLength(ctx, new Point2D({x: canvasWidth/2, y: canvasHeight/2}),
                this.viewAngle, this.viewScale);
        }

        this.endDraw(ctx);
    }

    /**
     * Begin and End draw are duplicate drawing code for all layout modes
     *
     * @param canvas: The current drawing layout of the interface.
     * @param viewAngle: The degree in rotation of the canvas.
     * @param viewScale: The zoom in/out scale of the canvas.
     * @return: The canvas after scale and rotation modification.
     */
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

        ctx.rotate(viewAngle);

        ctx.scale(viewScale, viewScale);

        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

        return ctx;
    }

    /**
     * Redraws the canvas while including recent intersecting points.
     *
     * @param canvas: The current drawing layout of the interface.
     * @param viewAngle: The degree in rotation of the canvas.
     * @param viewScale: The zoom in/out scale of the canvas.
     * @param intersectHighlightPoints: The intersection points that were recently added to the canvas.
     */
    drawSlicePoints(canvas, viewAngle, viewScale, intersectHighlightPoints) {
        //Draw slice intersection points
        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        ctx.save();
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(viewAngle);
        ctx.scale(viewScale, viewScale);
        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
        for (var i in intersectHighlightPoints) {
            var intersectPoint = intersectHighlightPoints[i];
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4.0;
            ctx.strokeRect(intersectPoint.getX() - 5, intersectPoint.getY() - 5, 10, 10);
        }
        ctx.restore();
    }

    /**
     * Restores the interface of the canvas.
     *
     * @param ctx: The context of the canvas2D.
     */
    endDraw(ctx) {
        ctx.restore();
    }

    /**
     * Adjust the dimensions of the canvas.
     */
    resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    /**
     * Resets the mouse position based on the degree of the rotated canvas.
     */
    setRotatedCanvasMouse() {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;
        var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
            new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}),
            this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.rotatedCanvasMouseX = p.getX();
        this.rotatedCanvasMouseY = p.getY();
    }

    /**
     * Handles different events when the mouse is pressed down, depending on the current mode.
     *
     * @param event: The mouse being pressed down.
     */
    layoutCanvasMousePressed(event) {
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

        //Wall Creation Mode
        if (this.allowCreatingWalls && this.currentCreateWall == null) {
            this.currentCreateWall = new Wall({
                point1: new CornerPoint({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}),
                point2: new CornerPoint({x: this.rotatedCanvasMouseX, y: this.rotatedCanvasMouseY}),
                floor: this.hvacApplication.getCurrentFloorPlan()
            });
            var point = snapPointToWalls(this.currentCreateWall.getPoint1X(), this.currentCreateWall.getPoint1Y(),
                this.hvacApplication.getCurrentWallList(), [this.currentCreateWall]);
            this.currentCreateWall.getCornerPoint1().setX(point.getX());
            this.currentCreateWall.getCornerPoint1().setY(point.getY());
            this.currentCreateWall.getCornerPoint2().setX(point.getX());
            this.currentCreateWall.getCornerPoint2().setY(point.getY());
        }

        //Edit Point Mode
        if (this.allowEditingPoints) {
            var closest = 25;
            var wallCloseness = closest;

            //Iterate through all of the walls of the given floor
            for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                var wall = this.hvacApplication.getCurrentWallList()[i];

                //Check if mouse is in radius of one of the endpoints of the wall
                if (pointInCircle(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY,
                        wall.getPoint1X(), wall.getPoint1Y(), closest)) {
                    var newClosest = Math.hypot(this.rotatedCanvasMouseX - wall.getPoint1X(),
                        this.rotatedCanvasMouseY - wall.getPoint1Y());

                    if (Math.round(closest) == Math.round(newClosest)) {
                        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(),
                            wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                        var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX,
                            point.getY() - this.rotatedCanvasMouseY);

                        if (dist < wallCloseness) {
                            wallCloseness = dist;
                            closest = newClosest;
                            this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                            this.currentEditPointSelectedWall = wall;
                        }
                    } else if (newClosest < closest) {
                        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(),
                            wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);

                        var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX,
                            point.getY() - this.rotatedCanvasMouseY);
                        wallCloseness = dist;
                        closest = newClosest;
                        this.currentEditPointSelectedWallPoint = WALL_POINT_ONE;
                        this.currentEditPointSelectedWall = wall;
                    }
                }

                //Check if mouse is in radius of the other endpoint of the wall
                if (pointInCircle(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY,
                        wall.getPoint2X(), wall.getPoint2Y(), closest)) {
                    var newClosest = Math.hypot(this.rotatedCanvasMouseX - wall.getPoint2X(),
                        this.rotatedCanvasMouseY - wall.getPoint2Y());

                    if (Math.round(closest) == Math.round(newClosest)) {
                        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(),
                            wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);

                        var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX,
                            point.getY() - this.rotatedCanvasMouseY);
                        if (dist < wallCloseness) {
                            wallCloseness = dist;
                            closest = newClosest;
                            this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                            this.currentEditPointSelectedWall = wall;
                        }
                    } else if (newClosest < closest) {
                        var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(),
                            wall.getPoint2X(), wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);

                        var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX,
                            point.getY() - this.rotatedCanvasMouseY);
                        wallCloseness = dist;
                        closest = newClosest;
                        this.currentEditPointSelectedWallPoint = WALL_POINT_TWO;
                        this.currentEditPointSelectedWall = wall;
                    }
                }
            }
        }

        //Edit Corner Mode
        if (this.allowCornerEditing) {
            this.currentEditCornerSelectedCornerPoints = [];
            var searchArea = 15;
            var closestCornerPoint = null;

            //Iterates through walls and select closest points at location
            for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                var wall = this.hvacApplication.getCurrentWallList()[i];
                if (pointInCircle(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY,
                        wall.getPoint1X(), wall.getPoint1Y(), searchArea)) {
                    searchArea = Math.hypot(wall.getPoint1X() - this.rotatedCanvasMouseX,
                        wall.getPoint1Y() - this.rotatedCanvasMouseY);

                    closestCornerPoint = wall.getCornerPoint1();
                }
                if (pointInCircle(this.rotatedCanvasMouseX, this.rotatedCanvasMouseY,
                        wall.getPoint2X(), wall.getPoint2Y(), searchArea)) {
                    searchArea = Math.hypot(wall.getPoint2X() - this.rotatedCanvasMouseX,
                        wall.getPoint2Y() - this.rotatedCanvasMouseY);

                    closestCornerPoint = wall.getCornerPoint2();
                }
            }

            //Store all wall connections
            this.wallConnections = [];

            //Iterate through list of walls twice to check if the two walls are connected together
            for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                var firstWall = this.hvacApplication.getCurrentWallList()[i];
                for (var j = i+1; j < this.hvacApplication.getCurrentWallList().length; j++) {
                    var secondWall = this.hvacApplication.getCurrentWallList()[j];
                    if (firstWall == secondWall) continue;

                    var secondWallPoint1Connection = null;
                    var secondWallPoint2Connection = null;
                    var firstWallPoint1Connection = null;
                    var firstWallPoint2Connection = null;

                    var firstWallPoint1 = firstWall.getCornerPoint1();
                    var firstWallPoint2 = firstWall.getCornerPoint2();
                    var secondWallPoint1 = secondWall.getCornerPoint1();
                    var secondWallPoint2 = secondWall.getCornerPoint2();

                    /**
                     * Checks if the the two endpoints on different walls are connected together
                     *
                     * @param checkWallPoint: The coordinate point on the walls that determines if the walls are
                     * connected.
                     * @param targetWallPoint1: The target endpoint of the first wall.
                     * @param targetWallPoint2: The target endpoint of the second wall.
                     * @return: Either a wall connection or null.
                     */
                    var checkConnection = function(checkWallPoint, targetWallPoint1, targetWallPoint2) {
                        var pointOnLine = nearestPointOnLine(targetWallPoint1.getX(), targetWallPoint1.getY(),
                            targetWallPoint2.getX(), targetWallPoint2.getY(), checkWallPoint.getX(),
                            checkWallPoint.getY());
                        var distBetweenConnection = Math.hypot(pointOnLine.getX() - checkWallPoint.getX(),
                            pointOnLine.getY() - checkWallPoint.getY());

                        //If within 1 pixel, be connected to wall
                        if (distBetweenConnection <= 1.0) {

                            //Check if its an endpoint, if not, add it as a corner between two walls
                            if (Math.hypot(checkWallPoint.getX() - targetWallPoint1.getX(),
                                    checkWallPoint.getY() - targetWallPoint1.getY()) <= 1.0 ||
                                Math.hypot(checkWallPoint.getX() - targetWallPoint2.getX(),
                                    checkWallPoint.getY() - targetWallPoint2.getY()) <= 1.0) {
                            } else {
                                var connection = new WallConnection(checkWallPoint, targetWallPoint1.getWall());
                                return connection;
                            }
                        }
                        return null;
                    };

                    /**
                     * Checks if either of the endpoints of the first wall are connected with either of the endpoints
                     * of the second wall.
                     */
                    secondWallPoint1Connection = checkConnection(secondWallPoint1, firstWallPoint1, firstWallPoint2);
                    secondWallPoint2Connection = checkConnection(secondWallPoint2, firstWallPoint1, firstWallPoint2);
                    firstWallPoint1Connection = checkConnection(firstWallPoint1, secondWallPoint1, secondWallPoint2);
                    firstWallPoint2Connection = checkConnection(firstWallPoint2, secondWallPoint1, secondWallPoint2);
                    if (secondWallPoint1Connection != null) {
                        this.wallConnections.push(secondWallPoint1Connection);
                    } else if (secondWallPoint2Connection != null) {
                        this.wallConnections.push(secondWallPoint2Connection);
                    } else if (firstWallPoint1Connection != null) {
                        this.wallConnections.push(firstWallPoint1Connection);
                    } else if (firstWallPoint2Connection != null) {
                        this.wallConnections.push(firstWallPoint2Connection);
                    }
                }
            }

            //Search for points near pixel of closest point
            if (closestCornerPoint != null) {
                for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                    var wall = this.hvacApplication.getCurrentWallList()[i];
                    var dist = Math.hypot(wall.getPoint1X() - closestCornerPoint.getX(),
                        wall.getPoint1Y() - closestCornerPoint.getY());

                    if (dist <= 1) {
                        this.currentEditCornerSelectedCornerPoints.push(wall.getCornerPoint1());
                    }
                    dist = Math.hypot(wall.getPoint2X() - closestCornerPoint.getX(),
                        wall.getPoint2Y() - closestCornerPoint.getY());
                    if (dist <= 1) {
                        this.currentEditCornerSelectedCornerPoints.push(wall.getCornerPoint2());
                    }
                }
            }

            //Add any walls that the selected points may be connected to
            var currentEditCornerSelectedCornerPointsClone = this.currentEditCornerSelectedCornerPoints.slice(0);

            //Iterate through the list of possible corner points
            for (var i = 0; i < currentEditCornerSelectedCornerPointsClone.length; i++) {
                var cornerPoint = currentEditCornerSelectedCornerPointsClone[i];
                var wall = cornerPoint.getWall();

                //Iterate through the list of walls of the current floor
                for (var k = 0; k < this.hvacApplication.getCurrentWallList().length; k++) {
                    var checkWall = this.hvacApplication.getCurrentWallList()[k];

                    //Check to make sure current wall doesn't equal the first wall in the corner
                    if (checkWall != wall) {
                        var containsWall = false;

                        /**
                         * Iterate through the rest of possible corner points and check that the wall is connected to
                         * the first wall
                         */
                        for (var j = 0; j < currentEditCornerSelectedCornerPointsClone.length; j++) {
                            var checkCorner = currentEditCornerSelectedCornerPointsClone[j];
                            if (checkCorner.getWall() == checkWall) containsWall = true;
                        }
                        if (containsWall) continue;

                        var pointOnLine = nearestPointOnLine(checkWall.getPoint1X(),
                            checkWall.getPoint1Y(), checkWall.getPoint2X(), checkWall.getPoint2Y(),
                            cornerPoint.getX(), cornerPoint.getY());

                        if (Math.hypot(cornerPoint.getX() - pointOnLine.getX(),
                                cornerPoint.getY() - pointOnLine.getY()) <= 1.0) {

                            //Check if points are added, if not add them to corner points
                            var wallCorner1 = checkWall.getCornerPoint1();
                            var wallCorner2 = checkWall.getCornerPoint2();
                            var addWallCorner1 = true;
                            var addWallCorner2 = true;
                            for (var j = 0; j < currentEditCornerSelectedCornerPointsClone.length; j++) {
                                var checkCorner = currentEditCornerSelectedCornerPointsClones[j];
                                if (checkCorner.getWall() == wallCorner1.getWall() &&
                                    checkCorner.getPointType() == wallCorner1.getPointType()) addWallCorner1 = false;
                                if (checkCorner.getWall() == wallCorner2.getWall() &&
                                    checkCorner.getPointType() == wallCorner2.getPointType()) addWallCorner2 = false;
                            }
                            if (addWallCorner1) this.currentEditCornerSelectedCornerPoints.push(wallCorner1);
                            if (addWallCorner2) this.currentEditCornerSelectedCornerPoints.push(wallCorner2);
                        }
                    }
                }
            }

            //If no points or corners were selected, grab current whole wall
            if (this.currentEditCornerSelectedCornerPoints.length == 0) {
                var closestWall = null;
                var closest = 15.0;

                //Iterate through the wall list to determine which wall is currently selected
                for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                    var wall = this.hvacApplication.getCurrentWallList()[i];
                    var point = nearestPointOnLine( wall.getPoint1X(),  wall.getPoint1Y(),
                        wall.getPoint2X(), wall.getPoint2Y(),  this.rotatedCanvasMouseX,  this.rotatedCanvasMouseY);

                    var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX,
                        point.getY() - this.rotatedCanvasMouseY);
                    if (dist <= closest) {
                        closestWall = wall;
                        closest = dist;
                    }
                }

                if (closestWall != null) {
                    this.currentEditCornerSelectedCornerPoints.push(closestWall.getCornerPoint1());
                    this.currentEditCornerSelectedCornerPoints.push(closestWall.getCornerPoint2());
                }
            }
        }

        //Rotate View mode
        if (this.allowRotating) {
            var canvasWidth = this.canvas.width;
            var canvasHeight = this.canvas.height;
            this.mouseAngle = Math.atan2(this.canvasMouseX - canvasWidth/2, this.canvasMouseY - canvasHeight/2);
        }
    }

    /**
     * Handles different events when the mouse is moving, depending on the current mode.
     *
     * @param event: The mouse being moved around the screen.
     */
    layoutCanvasMouseMoved(event) {
        //Initially calculating the mouse position of the canvas
        var mouseX = event.offsetX - this.hvacApplication.applicationDiv.offsetLeft
            - this.hvacApplication.applicationDiv.clientLeft;
        var mouseY = event.offsetY - this.hvacApplication.applicationDiv.offsetTop
            - this.hvacApplication.applicationDiv.clientTop;
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

        //Allow Creating Walls
        if (this.allowCreatingWalls && this.currentCreateWall != null) {
            this.currentCreateWall.setPoint2X(this.rotatedCanvasMouseX);
            this.currentCreateWall.setPoint2Y(this.rotatedCanvasMouseY);

            var point = snapPointToWalls(this.currentCreateWall.getPoint2X(), this.currentCreateWall.getPoint2Y(),
                this.hvacApplication.getCurrentWallList(), [this.currentCreateWall]);
            this.currentCreateWall.setPoint2X(point.getX());
            this.currentCreateWall.setPoint2Y(point.getY());

            //While the Shift key is held down, the created walls will be drawn perpendicular
            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestRotation(this.currentCreateWall.getPoint1X(),
                    this.currentCreateWall.getPoint1Y(), this.currentCreateWall.getPoint2X(),
                    this.currentCreateWall.getPoint2Y(), 45);

                this.currentCreateWall.setPoint2X(line.getPoint2X());
                this.currentCreateWall.setPoint2Y(line.getPoint2Y());
            }
        }

        //Allow Editing Points
        if (this.allowEditingPoints) {
            this.highlightedPoint = null;
            var closest = 15;

            //Iterate through the list of walls and determine which wall is closest to the mouse
            for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                var wall = this.hvacApplication.getCurrentWallList()[i];
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(),
                    wall.getPoint2Y(), this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);

                if (Math.round(dist) < Math.round(closest)) {
                    closest = dist;
                    this.highlightedPoint = wall;
                }
            }

            //If an endpoint of a wall is selected, that endpoint will be moving with the mouse and modifying the wall
            if (this.currentEditPointSelectedWall != null) {
                this.highlightedPoint = this.currentEditPointSelectedWall;

                //Checks which endpoint is selected
                if (this.currentEditPointSelectedWallPoint == WALL_POINT_ONE) {
                    this.currentEditPointSelectedWall.setPoint1X( this.rotatedCanvasMouseX );
                    this.currentEditPointSelectedWall.setPoint1Y( this.rotatedCanvasMouseY );

                    //Auto snap
                    var point = snapPointToWalls(this.currentEditPointSelectedWall.getPoint1X(),
                        this.currentEditPointSelectedWall.getPoint1Y(), this.hvacApplication.getCurrentWallList(),
                        [this.currentEditPointSelectedWall]);

                    this.currentEditPointSelectedWall.setPoint1X( point.getX() );
                    this.currentEditPointSelectedWall.setPoint1Y( point.getY() );

                    //While the Shift key is held down, the edited endpoint will draw the wall perpendicular
                    if (this.shiftPressed) {
                        var line = getLinePoint1SnappedToNearestRotation(this.currentEditPointSelectedWall.getPoint1X(),
                            this.currentEditPointSelectedWall.getPoint1Y(), this.currentEditPointSelectedWall.getPoint2X(),
                            this.currentEditPointSelectedWall.getPoint2Y(), 45);

                        this.currentEditPointSelectedWall.setPoint1X( line.getPoint1X() );
                        this.currentEditPointSelectedWall.setPoint1Y( line.getPoint1Y() );
                    }
                }

                if (this.currentEditPointSelectedWallPoint == WALL_POINT_TWO) {
                    this.currentEditPointSelectedWall.setPoint2X( this.rotatedCanvasMouseX );
                    this.currentEditPointSelectedWall.setPoint2Y( this.rotatedCanvasMouseY );

                    //Auto snap
                    var point = snapPointToWalls(this.currentEditPointSelectedWall.getPoint2X(),
                        this.currentEditPointSelectedWall.getPoint2Y(), this.hvacApplication.getCurrentWallList(),
                        [this.currentEditPointSelectedWall]);

                    this.currentEditPointSelectedWall.setPoint2X( point.getX() );
                    this.currentEditPointSelectedWall.setPoint2Y( point.getY() );

                    //While the Shift key is held down, the edited endpoint will draw the wall perpendicular
                    if (this.shiftPressed) {
                        var line = getLinePoint2SnappedToNearestRotation(this.currentEditPointSelectedWall.getPoint1X(),
                            this.currentEditPointSelectedWall.getPoint1Y(), this.currentEditPointSelectedWall.getPoint2X(),
                            this.currentEditPointSelectedWall.getPoint2Y(), 45);

                        this.currentEditPointSelectedWall.setPoint2X( line.getPoint2X() );
                        this.currentEditPointSelectedWall.setPoint2Y( line.getPoint2Y() );
                    }
                }
            } else {
                /**
                 * If no endpoints were selected and the mouse is pressed down, change the location of the mouse based
                 * on the change of the drag of the canvas
                 */
                if (this.mouseDown) {
                    this.dragPositionX -= this.rotatedCanvasMouseMovedX;
                    this.dragPositionY -= this.rotatedCanvasMouseMovedY;
                }
            }
        }

        //Allow Edit Corner
        if (this.allowCornerEditing) {
            this.highlightedCorners = [];
            var closest = 15;

            //Iterate through wall list and check to see if mouse position is closest to certain wall corner
            for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                var wall = this.hvacApplication.getCurrentWallList()[i];
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(),
                    this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);

                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
                if (dist < closest) {
                    this.highlightedCorners.push(wall);
                }
            }

            //If mouse is down, change location of the corner point
            if (this.mouseDown) {
                for (var i = 0; i < this.currentEditCornerSelectedCornerPoints.length; i++) {
                    var cornerPoint = this.currentEditCornerSelectedCornerPoints[i];
                    cornerPoint.setX(cornerPoint.getX() - this.rotatedCanvasMouseMovedX);
                    cornerPoint.setY(cornerPoint.getY() - this.rotatedCanvasMouseMovedY);
                }

                //Re-align walls
                for (var i = 0; i < this.wallConnections.length; i++) {
                    var wallConnection = this.wallConnections[i];
                    var containsWall = false;
                    for (var j in this.currentEditCornerSelectedCornerPoints) {
                        var cornerPoint = this.currentEditCornerSelectedCornerPoints[j];
                        if (wallConnection.cornerPoint.getWall() == cornerPoint.getWall()) containsWall = false;
                    }
                    if (!containsWall) {
                        wallConnection.reattach();
                    }
                }
            }
        }

        //Allow Delete Wall
        if (this.allowDeletingWalls) {
            this.highlightedDeleteWall = null;

            /**
             * Iterate through wall list and if mouse is close enough to a wall, the wall will be highlighted for
             * deletion
             */
            for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                var wall = this.hvacApplication.getCurrentWallList()[i];
                var point = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(),
                    this.rotatedCanvasMouseX, this.rotatedCanvasMouseY);
                var dist = Math.hypot(point.getX() - this.rotatedCanvasMouseX, point.getY() - this.rotatedCanvasMouseY);
                if (dist < 15) {
                    this.highlightedDeleteWall = wall;
                }
            }
        }

        //Allow Dragging of canvas
        if (this.allowDragging) {

            /**
             * Check if the mouse is down, if so, iterate through the wall list to adjust the coordinate points of each
             * wall on the canvas based on how the canvas is dragged
             */
            if (this.mouseDown) {
                for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
                    var wall = this.hvacApplication.getCurrentWallList()[i];
                    wall.setPoint1X(wall.getPoint1X() - this.rotatedCanvasMouseMovedX);
                    wall.setPoint2X(wall.getPoint2X() - this.rotatedCanvasMouseMovedX);
                    wall.setPoint1Y(wall.getPoint1Y() - this.rotatedCanvasMouseMovedY);
                    wall.setPoint2Y(wall.getPoint2Y() - this.rotatedCanvasMouseMovedY);
                }
            }
        }

        //Allow Rotating of canvas
        if (this.allowRotating) {

            /**
             * Check if the mouse is down, if so, calculate the degree of rotation of the canvas and adjust the
             * coordinate points of the mouse and the canvas.
             */
            if (this.mouseDown) {
                var canvasWidth = this.canvas.width;
                var canvasHeight = this.canvas.height;
                var newMouseAngle = Math.atan2(this.canvasMouseX - canvasWidth/2, this.canvasMouseY - canvasHeight/2);
                this.hvacApplication.viewAngle -= (newMouseAngle - this.mouseAngle);
                this.mouseAngle = newMouseAngle;
            }
        }

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    }

    /**
     * Handles different events when the mouse is released, depending on the current mode.
     *
     * @param event: The mouse being released from pressed down.
     */
    layoutCanvasMouseReleased(event) {
        //Calculate the new mouse location
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

        //Allow creating walls
        if (this.allowCreatingWalls && this.currentCreateWall != null) {
            this.currentCreateWall.setPoint2X(this.rotatedCanvasMouseX);
            this.currentCreateWall.setPoint2Y(this.rotatedCanvasMouseY);

            var point = snapPointToWalls(this.currentCreateWall.getPoint2X(),
                this.currentCreateWall.getPoint2Y(), this.hvacApplication.getCurrentWallList(), [this.currentCreateWall]);
            this.currentCreateWall.setPoint2X(point.getX());
            this.currentCreateWall.setPoint2Y(point.getY());

            //Determines if the wall being created is in perpendicular mode when Shift key is pressed down
            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestRotation(this.currentCreateWall.getPoint1X(),
                    this.currentCreateWall.getPoint1Y(), this.currentCreateWall.getPoint2X(),
                    this.currentCreateWall.getPoint2Y(), 45);

                this.currentCreateWall.setPoint2X(line.getPoint2X());
                this.currentCreateWall.setPoint2Y(line.getPoint2Y());
            }

            //Adds newly created wall to the current list of walls
            if (this.currentCreateWall.getPoint1X() == this.currentCreateWall.getPoint2X() &&
                this.currentCreateWall.getPoint1Y() == this.currentCreateWall.getPoint2Y()) {
                this.hvacApplication.getCurrentWallList().splice(
                    this.hvacApplication.getCurrentWallList().indexOf(this.currentCreateWall), 1);
            }

            this.currentCreateWall = null;

            //Checks if the newly created wall sliced into other walls
            wallSlicer.call(this, this.hvacApplication.getCurrentWallList(), this.intersectHighlightPoints);
        }

        //Allow edit walls
        if (this.allowEditingPoints) {
            this.currentEditPointSelectedWall = null

            //Checks if the edited wall sliced into other walls
            wallSlicer.call(this, this.hvacApplication.getCurrentWallList(), this.intersectHighlightPoints);
        }

        //Allow edit wall corners
        if (this.allowCornerEditing) {
            this.currentEditCornerSelectedCornerPoints = [];

            //Checks if the edited wall corner sliced into other walls
            wallSlicer.call(this, this.hvacApplication.getCurrentWallList(), this.intersectHighlightPoints);
        }

        //Allow deletion of walls
        if (this.allowDeletingWalls) {

            //Checks if there was a highlighted wall that was clicked on, if so, delete it from the wall list
            if (this.highlightedDeleteWall != null) {
                this.hvacApplication.getCurrentFloorPlan().removeWall(this.highlightedDeleteWall);
                this.highlightedDeleteWall = null;
            }
        }
    }

    /**
     * Handles the event when the mouse leaves the canvas.
     *
     * @param event: The mouse moved off the canvas.
     */
    layoutCanvasMouseOut(event) {
        this.mouseIsOnCanvas = false;

        //This automatically finishes current actions of the given mode
        this.layoutCanvasMouseReleased(event);
    }

    /**
     * Handles the event when the mouse re-enters the canvas.
     *
     * @param event: The mouse moved onto the canvas.
     */
    layoutCanvasMouseOver(event) {
        this.mouseIsOnCanvas = true;
    }

    /**
     * Handles the event when the Shift key is pressed down.
     *
     * @param event: The Shift key being pressed down.
     */
    onKeydown(event) {
        if (event.shiftKey) {
            this.shiftPressed = true;
        }
    }

    /**
     * Handles the event when the Shift key is released.
     *
     * @param event: The Shift key being released.
     */
    onKeyup(event) {
        if (!event.shiftKey) {
            this.shiftPressed = false;
        }
    }

    /**
     * Retrieves this canvas in the current state.
     *
     * @return: The given canvas on the interface.
     */
    getCanvas() {
        return this.canvas;
    }
}