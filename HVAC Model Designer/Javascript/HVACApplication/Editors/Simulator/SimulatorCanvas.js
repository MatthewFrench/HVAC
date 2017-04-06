/**
 * Created by matt on 4/5/17.
 */
/**
 * Created by matt on 2/21/17.
 */

class SimulationPoint {
    constructor({x=0, y=0} = {}) {
        this.leftPoint = null;
        this.rightPoint = null;
        this.bottomPoint = null;
        this.topPoint = null;
        this.x = x;
        this.y = y;
        this.isInside = true;
        this.temperature = 0.0;
    }
}

var scaleFactor = 1.1;
//Allows the handling of Scrolling in View Mode
var handleScroll = function(evt) {
    var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
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

class SimulatorCanvas {
    constructor({hvacApplication} = {}) {
        this.hvacApplication = hvacApplication;
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
        this.mouseIsOnCanvas = true;

        // *** Rotating Variables
        this.mouseAngle = 0;

        window.addEventListener("resize", CreateFunction(this, this.resizeCanvas));

        this.canvas.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);

        this.canvas.addEventListener('keydown', CreateFunction(this, this.onKeydown), false );
        this.canvas.addEventListener('keyup', CreateFunction(this, this.onKeyup), false );

        this.pointDensity = 40.0; //One point every 100 pixels
    }

    initializeSimulationPoints() {
        this.simulationPoints = [];
        if (this.hvacApplication.getCurrentWallList().length == 0) return;
        //Loop through area with by required density and place points
        var minX = this.hvacApplication.getCurrentWallList()[0].getPoint1X();
        var maxX = this.hvacApplication.getCurrentWallList()[0].getPoint1X();
        var minY = this.hvacApplication.getCurrentWallList()[0].getPoint1Y();
        var maxY = this.hvacApplication.getCurrentWallList()[0].getPoint1Y();
        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];

            minX = Math.min(minX, wall.getPoint1X(), wall.getPoint2X());
            maxX = Math.max(maxX, wall.getPoint1X(), wall.getPoint2X());

            minY = Math.min(minY, wall.getPoint1Y(), wall.getPoint2Y());
            maxY = Math.max(maxY, wall.getPoint1Y(), wall.getPoint2Y());
        }
        //Add a 100 pixel bounding box around the simulation
        var padding = 500;
        minX = minX - padding;
        minY = minY - padding;
        maxX = maxX + padding;
        maxY = maxY + padding;
        //Now Create the points with density
        for (var x = minX; x <= maxX; x += this.pointDensity*2) {
            for (var y = minY; y <= maxY; y += this.pointDensity*2) {
                var simulationPoint = new SimulationPoint({x: x, y: y});
                simulationPoint.temperature = 60.0;
                this.setPointConnections(simulationPoint);
                this.simulationPoints.push(simulationPoint);
            }
        }
        //Now mark inside and outside points
        this.setInsideOutsidePoints();

        this.setOutsideTemperature();
        this.setInsideTemperature();

        //Set wall transfer rate and air transfer rate
        this.wallTransferRate = 0.005; // 5 times slower than air
        this.airTransferRate = 0.001;
    }

    increaseDensity() {
        this.pointDensity -= 5.0;
        if (this.pointDensity <= 0.0) this.pointDensity = 1.0;
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    decreaseDensity() {
        if (this.pointDensity == 1.0) this.pointDensity = 0.0;
        this.pointDensity += 5.0;
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    setOutsideTemperature() {
        this.outsideTemperature = 100.0;
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside == false) point.temperature = this.outsideTemperature;
        }
    }

    setInsideTemperature() {
        this.insideTemperature = 60.0;
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside) point.temperature = this.insideTemperature;
        }
    }

    setInsideOutsidePoints() {
        if (this.simulationPoints.length == 0) return;
        //Point 0 is always outside. Set that as the first outside and use
        //flood fill to set the rest outside. Anything left is inside.
        var processList = [];
        var processedList = [];
        processList.push(this.simulationPoints[0]);

        while (processList.length > 0) {
            var point = processList.shift();

            point.isInside = false;

            if (point.leftPoint != null) {
                if (!this.isWallBetweenPoints(point, point.leftPoint) && processedList.indexOf(point.leftPoint) == -1 && processList.indexOf(point.leftPoint) == -1) {
                    processList.push(point.leftPoint);
                }
            }
            if (point.rightPoint != null) {
                if (!this.isWallBetweenPoints(point, point.rightPoint) && processedList.indexOf(point.rightPoint) == -1 && processList.indexOf(point.rightPoint) == -1) {
                    processList.push(point.rightPoint);
                }
            }
            if (point.topPoint != null) {
                if (!this.isWallBetweenPoints(point, point.topPoint) && processedList.indexOf(point.topPoint) == -1 && processList.indexOf(point.topPoint) == -1) {
                    processList.push(point.topPoint);
                }
            }
            if (point.bottomPoint != null) {
                if (!this.isWallBetweenPoints(point, point.bottomPoint) && processedList.indexOf(point.bottomPoint) == -1 && processList.indexOf(point.bottomPoint) == -1) {
                    processList.push(point.bottomPoint);
                }
            }

            processedList.push(point);
        }
    }

    isWallBetweenPoints(point1, point2) {
        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];

            var intersectionPoint = getLineIntersectionPoint(
                point1.x, point1.y,
                point2.x, point2.y,
                wall.getPoint1X(), wall.getPoint1Y(),
                wall.getPoint2X(), wall.getPoint2Y()
            );

            //Determine what new lines we have to make from the intersection point
            if (intersectionPoint != null) {
                return true;
            }
        }
        return false;
    }

    setPointConnections(simulationPoint) {
        if (this.simulationPoints.length == 0) return;
        //Set closest neighbor
        var minXLeftPoint = null;
        var minXRightPoint = null;
        var minYTopPoint = null;
        var minYBottomPoint = null;
        var minXLeft = 1000.0;
        var minXRight = 1000.0;
        var minYTop = 1000.0;
        var minYBottom = 1000.0;
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var checkPoint = this.simulationPoints[i];
            if (checkPoint == simulationPoint) continue;
            var xOffLeft = simulationPoint.x - checkPoint.x;
            var xOffRight = checkPoint.x - simulationPoint.x;
            var xOffTop = simulationPoint.y - checkPoint.y;
            var xOffBottom = checkPoint.y - simulationPoint.y;
            if (xOffLeft < minXLeft && xOffLeft > 0 && checkPoint.y == simulationPoint.y) {
                minXLeft = xOffLeft;
                minXLeftPoint = checkPoint;
            }
            if (xOffRight < minXRight && xOffRight > 0 && checkPoint.y == simulationPoint.y) {
                minXRight = xOffRight;
                minXRightPoint = checkPoint;
            }
            if (xOffTop < minYTop && xOffTop > 0 && checkPoint.x == simulationPoint.x) {
                minYTop = xOffTop;
                minYTopPoint = checkPoint;
            }
            if (xOffBottom < minYBottom && xOffBottom > 0 && checkPoint.x == simulationPoint.x) {
                minYBottom = xOffBottom;
                minYBottomPoint = checkPoint;
            }
        }
        if (minXLeftPoint != null) {
            simulationPoint.leftPoint = minXLeftPoint;
            minXLeftPoint.rightPoint = simulationPoint;
        }
        if (minXRightPoint != null) {
            simulationPoint.rightPoint = minXRightPoint;
            minXRightPoint.leftPoint = simulationPoint;
        }
        if (minYTopPoint != null) {
            simulationPoint.topPoint = minYTopPoint;
            minYTopPoint.bottomPoint = simulationPoint;
        }
        if (minYBottomPoint != null) {
            simulationPoint.bottomPoint = minYBottomPoint;
            minYBottomPoint.topPoint = simulationPoint;
        }
    }

    clearSimulationPoints() {
        this.simulationPoints = [];
    }

    drawSimulationPoints() {
        var ctx = this.canvas.getContext("2d");

        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var temp = simulationPoint.temperature;

            var maxTemp = this.outsideTemperature;
            var minTemp = this.insideTemperature;
            var halfTemp = (maxTemp - minTemp)/2.0 + minTemp;

            if (temp < halfTemp) {
                var tempPercent = (temp - minTemp) / (halfTemp - minTemp);
                var redgreen = (255 * tempPercent);
                var blue = (255-(255 * tempPercent));
                ctx.fillStyle = "rgba("+Math.round(redgreen)+","+Math.round(redgreen)+","+Math.round(blue)+",0.5)";
            } else {
                var tempPercent = (temp - halfTemp) / (maxTemp - halfTemp);
                var red = (255 * tempPercent);
                var yellow = (255-(255 * tempPercent));
                ctx.fillStyle = "rgba("+Math.round(yellow+red)+","+Math.round(yellow)+",0,0.5)";
            }

            ctx.beginPath();
            ctx.arc(simulationPoint.x,simulationPoint.y,this.pointDensity/2.0,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        ctx.strokeStyle = "rgba(0,0,255,0.5)";
        ctx.beginPath();
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var half = 0;//this.pointDensity/2.0;
            if (simulationPoint.leftPoint != null) {
                ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                ctx.lineTo(simulationPoint.leftPoint.x - half, simulationPoint.leftPoint.y - half);
            }
            if (simulationPoint.rightPoint != null) {
                ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                ctx.lineTo(simulationPoint.rightPoint.x - half, simulationPoint.rightPoint.y - half);
            }
            if (simulationPoint.topPoint != null) {
                ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                ctx.lineTo(simulationPoint.topPoint.x - half, simulationPoint.topPoint.y - half);
            }
            if (simulationPoint.bottomPoint != null) {
                ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                ctx.lineTo(simulationPoint.bottomPoint.x - half, simulationPoint.bottomPoint.y - half);
            }
        }
        ctx.stroke();

        var fontSize = (this.pointDensity / 40.0) * 10 + 5;
        ctx.font = Math.round(fontSize) + "px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            ctx.fillText("" + Math.round(simulationPoint.temperature), simulationPoint.x, simulationPoint.y);
        }
    }

    runSimulation() {
        //Loop through outside points first
        //On any outside point that connects to an inside point
        //Run the heat transfer
        //Add points that had heat transfer to a point list
        //loop through point list and repeat until done
        //For inside to inside points, check if wall between for heat modification

        var pointsToProcess = [];

        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside == false) {
                if (point.leftPoint != null && point.leftPoint.isInside == true) {
                    this.transferTemperatureBetweenPoints(point, point.leftPoint);
                    pointsToProcess.push(point.leftPoint);
                }
                if (point.rightPoint != null && point.rightPoint.isInside == true) {
                    this.transferTemperatureBetweenPoints(point, point.rightPoint);
                    pointsToProcess.push(point.rightPoint);
                }
                if (point.topPoint != null && point.topPoint.isInside == true) {
                    this.transferTemperatureBetweenPoints(point, point.topPoint);
                    pointsToProcess.push(point.topPoint);
                }
                if (point.bottomPoint != null && point.bottomPoint.isInside == true) {
                    this.transferTemperatureBetweenPoints(point, point.bottomPoint);
                    pointsToProcess.push(point.bottomPoint);
                }
            }
        }

        var processedPoints = [];

        //Loop through pointsToProcess
        while (pointsToProcess.length > 0) {
            var point = pointsToProcess.shift();
            if (point.leftPoint != null && point.leftPoint.isInside == true) {
                this.transferTemperatureBetweenPoints(point, point.leftPoint);
                if (processedPoints.indexOf(point.leftPoint) == -1 &&
                    pointsToProcess.indexOf(point.leftPoint) == -1) {
                    pointsToProcess.push(point.leftPoint);
                }
            }
            if (point.rightPoint != null && point.rightPoint.isInside == true) {
                this.transferTemperatureBetweenPoints(point, point.rightPoint);
                if (processedPoints.indexOf(point.rightPoint) == -1 &&
                    pointsToProcess.indexOf(point.rightPoint) == -1) {
                    pointsToProcess.push(point.rightPoint);
                }
            }
            if (point.topPoint != null && point.topPoint.isInside == true) {
                this.transferTemperatureBetweenPoints(point, point.topPoint);
                if (processedPoints.indexOf(point.topPoint) == -1 &&
                    pointsToProcess.indexOf(point.topPoint) == -1) {
                    pointsToProcess.push(point.topPoint);
                }
            }
            if (point.bottomPoint != null && point.bottomPoint.isInside == true) {
                this.transferTemperatureBetweenPoints(point, point.bottomPoint);
                if (processedPoints.indexOf(point.bottomPoint) == -1 &&
                    pointsToProcess.indexOf(point.bottomPoint) == -1) {
                    pointsToProcess.push(point.bottomPoint);
                }
            }
            processedPoints.push(point);
        }
    }
    transferTemperatureBetweenPoints(fromPoint, toPoint) {
        //Density affects transfer rate, try to undo that
        var densityUndo = Math.pow(4, (40.0 / this.pointDensity));

        if (fromPoint.isInside == false) {
            //Only transfer and assume that there is already a wall between
            var temperatureDifference = fromPoint.temperature - toPoint.temperature;
            var tempAdd = temperatureDifference * (this.wallTransferRate * densityUndo);
            toPoint.temperature += tempAdd;

        } else {
            //Determine if there is a wall between
            var transferRate = this.airTransferRate;
            if (this.isWallBetweenPoints(fromPoint, toPoint)) {
                transferRate = this.wallTransferRate;
            }
            var temperatureDifference = fromPoint.temperature - toPoint.temperature;
            var tempAdd = temperatureDifference * (transferRate * densityUndo);

            toPoint.temperature += tempAdd;
            fromPoint.temperature -= tempAdd;
        }
    }

    logic() {
        this.runSimulation();

        var ctx = this.beginDraw(this.canvas, this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.drawSimulationPoints();

        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];

            wall.draw(ctx, false);
        }

        this.endDraw(ctx);
    }

    show() {
        this.initializeSimulationPoints();
    }

    hide() {
        this.clearSimulationPoints();
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
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    setRotatedCanvasMouse() {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;
        var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
            new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}),
            this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.rotatedCanvasMouseX = p.getX();
        this.rotatedCanvasMouseY = p.getY();
    }

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
    }

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

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    }

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
    }

    layoutCanvasMouseOut(event) {
        this.mouseIsOnCanvas = false;
        this.layoutCanvasMouseReleased(event);
    }

    layoutCanvasMouseOver(event) {
        this.mouseIsOnCanvas = true;
    }

    onKeydown(event) {
        if (event.shiftKey) {
            this.shiftPressed = true;
        }
    }

    onKeyup(event) {
        if (!event.shiftKey) {
            this.shiftPressed = false;
        }
    }

    getCanvas() {
        return this.canvas;
    }
}