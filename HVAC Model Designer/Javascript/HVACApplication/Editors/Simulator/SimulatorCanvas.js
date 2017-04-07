/**
 * Created by matt on 4/5/17.
 */
/**
 * Created by matt on 2/21/17.
 */

class SimulationPoint {
    constructor({x=0, y=0} = {}) {
        this.leftPoint = null;
        this.numberWallsLeft = 0;
        this.rightPoint = null;
        this.numberWallsRight = 0;
        this.bottomPoint = null;
        this.numberWallsBottom = 0;
        this.topPoint = null;
        this.numberWallsTop = 0;
        this.x = x;
        this.y = y;
        this.isInside = true;
        this.temperature = 0.0;
        //Variable for calculations
        this.processed = false;
        this.indexX = 0;
        this.indexY = 0;
        this.addTemperature = 0.0;
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

        this.dragX = 0.0;
        this.dragY = 0.0;

        // *** Rotating Variables
        this.mouseAngle = 0;

        window.addEventListener("resize", CreateFunction(this, this.resizeCanvas));

        this.canvas.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);

        this.canvas.addEventListener('keydown', CreateFunction(this, this.onKeydown), false );
        this.canvas.addEventListener('keyup', CreateFunction(this, this.onKeyup), false );

        this.pointDensity = 40.0; //One point every 100 pixels
        //Set wall transfer rate and air transfer rate
        var speedModifier = 5.0;
        this.wallTransferRate = 0.0005 * speedModifier; // 100 times slower than air
        this.airTransferRate = 0.05 * speedModifier;

        this.setDensityUndo();

        this.simulationStopwatch = new Stopwatch();
    }

    setDensityUndo() {
        //this.densityUndo = new Decimal(40.0).div(this.pointDensity).pow(0.5);
        //this.densityUndo = new Decimal(40.0).div(this.pointDensity);
        //1.0 - ((1.0 - wallTransfer) / density Undo)
        //this.wallTransferRateSqrt = new Decimal(1.0 - ((1.0 - this.wallTransferRate.toNumber()) / this.densityUndo.toNumber()));
        //this.wallTransferRate.pow(new Decimal(1.0).div(this.densityUndo));
        //this.airTransferRateSqrt = new Decimal(1.0 - ((1.0 - this.airTransferRate.toNumber()) / this.densityUndo.toNumber()));
        //this.airTransferRate.pow(new Decimal(1.0).div(this.densityUndo));
        //console.log("----------------");
        //console.log("Density Undo: " + this.densityUndo);
        //console.log("Wall Transfer: " + this.wallTransferRate + " vs " + this.wallTransferRateSqrt);
        //console.log("Air Transfer: " + this.airTransferRate + " vs " + this.airTransferRateSqrt);
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
        var padding = this.pointDensity;
        minX = minX - padding;
        minY = minY - padding;
        maxX = maxX + padding*2;
        maxY = maxY + padding*2;
        //Now Create the points with density
        var indexX = 0;
        var indexY = 0;
        var indexArray = {};
        for (var x = minX; x <= maxX; x += this.pointDensity*2) {
            indexArray[indexX] = {};
            for (var y = minY; y <= maxY; y += this.pointDensity*2) {
                var simulationPoint = new SimulationPoint({x: x, y: y});
                indexArray[indexX][indexY] = simulationPoint;
                simulationPoint.processed = false;
                simulationPoint.indexX = indexX;
                simulationPoint.indexY = indexY;
                simulationPoint.temperature = 60.0;
                this.simulationPoints.push(simulationPoint);
                indexY += 1;
            }
            indexX += 1;
            indexY = 0;
        }
        this.setPointConnections(indexArray);
        this.setPointWalls();
        //Now mark inside and outside points
        this.setInsideOutsidePoints();

        this.setOutsideTemperature();
        this.setInsideTemperature();

        this.simulationStopwatch.reset();
    }

    increaseDensity() {
        if (this.pointDensity <= 5.0) {
            this.pointDensity -= 1.0;
            if (this.pointDensity == 0.0) this.pointDensity = 1.0;
        } else {
            this.pointDensity = this.pointDensity - 5.0;
        }
        this.setDensityUndo();
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    decreaseDensity() {
        if (this.pointDensity < 5.0) {
            this.pointDensity += 1.0;
        } else {
            this.pointDensity = this.pointDensity + 5.0;
        }
        this.setDensityUndo();
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    setPointWalls() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.leftPoint != null) {
                point.numberWallsLeft = this.numberOfWallsBetweenPoints(point, point.leftPoint);
            }
            if (point.rightPoint != null) {
                point.numberWallsRight = this.numberOfWallsBetweenPoints(point, point.rightPoint);
            }
            if (point.topPoint != null) {
                point.numberWallsTop = this.numberOfWallsBetweenPoints(point, point.topPoint);
            }
            if (point.bottomPoint != null) {
                point.numberWallsBottom = this.numberOfWallsBetweenPoints(point, point.bottomPoint);
            }
        }
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
        processList.push(this.simulationPoints[0]);
        this.simulationPoints[0].processed = true;

        while (processList.length > 0) {
            var point = processList.shift();

            point.isInside = false;

            if (point.leftPoint != null) {
                if (point.numberWallsLeft == 0 && point.leftPoint.processed == false) {
                    processList.push(point.leftPoint);
                    point.leftPoint.processed = true;
                }
            }
            if (point.rightPoint != null) {
                if (point.numberWallsRight == 0 && point.rightPoint.processed == false) {
                    processList.push(point.rightPoint);
                    point.rightPoint.processed = true;
                }
            }
            if (point.topPoint != null) {
                if (point.numberWallsTop == 0 && point.topPoint.processed == false) {
                    processList.push(point.topPoint);
                    point.topPoint.processed = true;
                }
            }
            if (point.bottomPoint != null) {
                if (point.numberWallsBottom == 0 && point.bottomPoint.processed == false) {
                    processList.push(point.bottomPoint);
                    point.bottomPoint.processed = true;
                }
            }
        }

        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            simulationPoint.processed = false;
        }
    }

    numberOfWallsBetweenPoints(point1, point2) {
        var wallCount = 0;
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
                wallCount+= 1;
            }
        }
        return wallCount;
    }

    setPointConnections(indexArray) {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];

            if (indexArray[simulationPoint.indexX - 1] != undefined) {
                if (indexArray[simulationPoint.indexX - 1][simulationPoint.indexY] != undefined) {
                    simulationPoint.leftPoint = indexArray[simulationPoint.indexX - 1][simulationPoint.indexY];
                }
            }
            if (indexArray[simulationPoint.indexX + 1] != undefined) {
                if (indexArray[simulationPoint.indexX + 1][simulationPoint.indexY] != undefined) {
                    simulationPoint.rightPoint = indexArray[simulationPoint.indexX + 1][simulationPoint.indexY];
                }
            }
            if (indexArray[simulationPoint.indexX][simulationPoint.indexY - 1] != undefined) {
                simulationPoint.topPoint = indexArray[simulationPoint.indexX][simulationPoint.indexY - 1];
            }
            if (indexArray[simulationPoint.indexX][simulationPoint.indexY + 1] != undefined) {
                simulationPoint.bottomPoint = indexArray[simulationPoint.indexX][simulationPoint.indexY + 1];
            }
        }
    }

    clearSimulationPoints() {
        this.simulationPoints = [];
    }

    drawSimulationPoints() {
        var ctx = this.canvas.getContext("2d");

        if (this.pointDensity > 5.0) {
            ctx.strokeStyle = "black";//rgba(50,50,255,1.0)
            ctx.lineWidth = "4";
            ctx.beginPath();
            for (var i = 0; i < this.simulationPoints.length; i++) {
                var simulationPoint = this.simulationPoints[i];
                var half = 0;//this.pointDensity/2.0;
                if (simulationPoint.leftPoint != null && simulationPoint.numberWallsLeft == 0) {
                    ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                    ctx.lineTo(simulationPoint.leftPoint.x - half, simulationPoint.leftPoint.y - half);
                }
                if (simulationPoint.rightPoint != null && simulationPoint.numberWallsRight == 0) {
                    ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                    ctx.lineTo(simulationPoint.rightPoint.x - half, simulationPoint.rightPoint.y - half);
                }
                if (simulationPoint.topPoint != null && simulationPoint.numberWallsTop == 0) {
                    ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                    ctx.lineTo(simulationPoint.topPoint.x - half, simulationPoint.topPoint.y - half);
                }
                if (simulationPoint.bottomPoint != null && simulationPoint.numberWallsBottom == 0) {
                    ctx.moveTo(simulationPoint.x - half, simulationPoint.y - half);
                    ctx.lineTo(simulationPoint.bottomPoint.x - half, simulationPoint.bottomPoint.y - half);
                }
            }
            ctx.stroke();
        }

        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        var fontSize = this.pointDensity/40.0*10+5;
        ctx.font = Math.round(fontSize) + "px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var temp = simulationPoint.temperature;

            var maxTemp = this.outsideTemperature;
            var minTemp = this.insideTemperature;
            var halfTemp = (maxTemp - minTemp) / 2.0 + minTemp;

            if (temp<halfTemp) {
                var tempPercent = (temp-minTemp)/(halfTemp - minTemp);
                var redgreen = (255 * tempPercent);
                var blue = (255-(255 * tempPercent));
                ctx.fillStyle = "rgba("+Math.round(redgreen)+","+Math.round(redgreen)+","+Math.round(blue)+",1.0)";
            } else {
                var tempPercent = (temp-halfTemp)/(maxTemp-halfTemp);
                var red = (255 * tempPercent);
                var yellow = (255-(255 * tempPercent));
                ctx.fillStyle = "rgba("+Math.round(yellow+red)+","+Math.round(yellow)+",0,1.0)";
            }

            if (this.pointDensity > 5) {
                ctx.beginPath();
                ctx.arc(simulationPoint.x, simulationPoint.y, this.pointDensity * 2.0 / 3.0, 0, 2 * Math.PI);
                ctx.fill();
            } else if (this.pointDensity > 1) {
                ctx.beginPath();
                ctx.arc(simulationPoint.x, simulationPoint.y, this.pointDensity, 0, 2 * Math.PI);
                ctx.fill();
            } else {
                ctx.fillRect(simulationPoint.x - this.pointDensity - 0.5, simulationPoint.y - this.pointDensity - 0.5, this.pointDensity*2 + 1, this.pointDensity*2 + 1);
            }

            if (this.pointDensity > 2.0) {
                ctx.lineWidth = "1";
                ctx.stroke();
            }

            if (this.pointDensity > 5.0) {
                ctx.fillText("" + Math.round(simulationPoint.temperature), simulationPoint.x, simulationPoint.y-this.pointDensity+1.0);
            }
        }
    }

    runSimulation() {
        this.simulateHeatTransfer();
        this.simulateHeatPoints();
    }

    simulateHeatPoints() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            point.processed = false;
            point.temperature += point.addTemperature;
            point.addTemperature = 0.0;
        }
    }

    simulateHeatTransfer() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            point.processed = true;
            if (point.leftPoint != null && point.leftPoint.processed == false) {
                this.transferTemperatureBetweenPoints(point, point.leftPoint, point.numberWallsLeft);
            }
            if (point.rightPoint != null && point.rightPoint.processed == false) {
                this.transferTemperatureBetweenPoints(point, point.rightPoint, point.numberWallsRight);
            }
            if (point.topPoint != null && point.topPoint.processed == false) {
                this.transferTemperatureBetweenPoints(point, point.topPoint, point.numberWallsTop);
            }
            if (point.bottomPoint != null && point.bottomPoint.isInside == false) {
                this.transferTemperatureBetweenPoints(point, point.bottomPoint, point.numberWallsBottom);
            }
        }
    }


    transferTemperatureBetweenPoints(fromPoint, toPoint, numberOfWallsBetween) {
            var transferRate = this.airTransferRate;
            if (numberOfWallsBetween > 0) {
                transferRate = Math.pow(this.wallTransferRate, numberOfWallsBetween);
            }
            var temperatureDifference = fromPoint.temperature - toPoint.temperature;
            var tempAdd = temperatureDifference * transferRate;

            if (toPoint.isInside == true) toPoint.addTemperature += tempAdd;
            if (fromPoint.isInside == true) fromPoint.addTemperature -= tempAdd;
    }

    logic() {
        var millisecondsSinceLastSimulation = this.simulationStopwatch.getMilliseconds();
        this.simulationStopwatch.reset();
        //Run simulation at 60fps and catch up if missing some simulation
        var runPerLoop = 40.0 / this.pointDensity;
        for (var i = 0; i < Math.round(millisecondsSinceLastSimulation / (1000.0/60.0)); i += 1) {
            for (var j = 0; j < runPerLoop; j++) {
                this.runSimulation();
                if (this.simulationStopwatch.getMilliseconds() >= 14) {
                    j = runPerLoop;
                    i = Math.round(millisecondsSinceLastSimulation / (1000.0/60.0));
                }
            }
        }
        this.simulationStopwatch.reset();

        var ctx = this.beginDraw(this.canvas, this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.drawSimulationPoints();

        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];

            wall.draw(ctx, false);
        }

        this.endDraw(ctx);

        ctx.fillStyle = "white";
        ctx.font = "25px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Space Between: " + this.pointDensity + "px", 5, 30);
    }

    show() {
        this.initializeSimulationPoints();
        this.simulationStopwatch.reset();
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
        ctx.translate(-this.dragX, -this.dragY);

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

        // ***** Dragging Code
            if (this.mouseDown) {
                this.dragX += this.rotatedCanvasMouseMovedX;
                this.dragY += this.rotatedCanvasMouseMovedY;
            }

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