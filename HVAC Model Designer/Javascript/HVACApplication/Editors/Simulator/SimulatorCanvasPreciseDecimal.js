/**
 * Created by matt on 4/6/17.
 */

/**
 * Created by matt on 4/5/17.
 */



/**
 * The floats were replaced with a special very precise decimal library, this is a lot
 * slower in simulation but is a lot more accurate.
 */



class SimulationPoint {
    constructor({x=0, y=0} = {}) {
        this.leftPoint = null;
        this.rightPoint = null;
        this.bottomPoint = null;
        this.topPoint = null;
        this.x = new Decimal(x);
        this.y = new Decimal(y);
        this.isInside = true;
        this.temperature = new Decimal(0.0);
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

        this.pointDensity = new Decimal(40.0); //One point every 100 pixels
        //Set wall transfer rate and air transfer rate
        this.wallTransferRate = new Decimal(0.005); // 5 times slower than air
        this.airTransferRate = new Decimal(0.001);

        this.setDensityUndo();
    }

    setDensityUndo() {
        this.densityUndo = new Decimal(40.0 / this.pointDensity);
        this.wallTransferRateSqrt = this.wallTransferRate.pow(new Decimal(1.0).div(this.densityUndo));
        this.airTransferRateSqrt = this.airTransferRate.pow(new Decimal(1.0).div(this.densityUndo));
        console.log("----------------");
        console.log("New Density Undo: " + this.densityUndo);
        console.log("Original Wall transfer: " + this.wallTransferRate);
        console.log("Wall transfer: " + this.wallTransferRateSqrt);
        console.log("Original Air transfer: " + this.airTransferRate);
        console.log("Air transfer: " + this.airTransferRateSqrt);
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
        var padding = Number(this.pointDensity);
        minX = minX - padding;
        minY = minY - padding;
        maxX = maxX + padding*2;
        maxY = maxY + padding*2;
        //Now Create the points with density
        for (var x = minX; x <= maxX; x += Number(this.pointDensity*2)) {
            for (var y = minY; y <= maxY; y += Number(this.pointDensity*2)) {
                var simulationPoint = new SimulationPoint({x: x, y: y});
                simulationPoint.temperature = new Decimal(60.0);
                this.setPointConnections(simulationPoint);
                this.simulationPoints.push(simulationPoint);
            }
        }
        //Now mark inside and outside points
        this.setInsideOutsidePoints();

        this.setOutsideTemperature();
        this.setInsideTemperature();
    }

    increaseDensity() {
        this.pointDensity = this.pointDensity.minus(5.0);
        if (this.pointDensity.lte(0.0)) this.pointDensity = new Decimal(1.0);
        this.setDensityUndo();
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    decreaseDensity() {
        if (this.pointDensity.eq(1.0)) this.pointDensity = new Decimal(0.0);
        this.pointDensity = this.pointDensity.plus(5.0);
        this.setDensityUndo();
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    setOutsideTemperature() {
        this.outsideTemperature = new Decimal(100.0);
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside == false) point.temperature = new Decimal(this.outsideTemperature);
        }
    }

    setInsideTemperature() {
        this.insideTemperature = new Decimal(60.0);
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside) point.temperature = new Decimal(this.insideTemperature);
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
                Number(point1.x), Number(point1.y),
                Number(point2.x), Number(point2.y),
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
        var minXLeft = new Decimal(1000.0);
        var minXRight = new Decimal(1000.0);
        var minYTop = new Decimal(1000.0);
        var minYBottom = new Decimal(1000.0);
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var checkPoint = this.simulationPoints[i];
            if (checkPoint == simulationPoint) continue;
            var xOffLeft = simulationPoint.x.minus(checkPoint.x);
            var xOffRight = checkPoint.x.minus(simulationPoint.x);
            var xOffTop = simulationPoint.y.minus(checkPoint.y);
            var xOffBottom = checkPoint.y.minus(simulationPoint.y);
            if (xOffLeft.lt(minXLeft) && xOffLeft.gt(0) && checkPoint.y.eq(simulationPoint.y)) {
                minXLeft = xOffLeft;
                minXLeftPoint = checkPoint;
            }
            if (xOffRight.lt(minXRight) && xOffRight.gt(0) && checkPoint.y.eq(simulationPoint.y)) {
                minXRight = xOffRight;
                minXRightPoint = checkPoint;
            }
            if (xOffTop.lt(minYTop) && xOffTop.gt(0) && checkPoint.x.eq(simulationPoint.x)) {
                minYTop = xOffTop;
                minYTopPoint = checkPoint;
            }
            if (xOffBottom.lt(minYBottom) && xOffBottom.gt(0) && checkPoint.x.eq(simulationPoint.x)) {
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

        ctx.strokeStyle = "rgba(0,0,255,0.5)";
        ctx.beginPath();
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var half = 0;//this.pointDensity/2.0;
            if (simulationPoint.leftPoint != null) {
                ctx.moveTo(Number(simulationPoint.x) - half, Number(simulationPoint.y) - half);
                ctx.lineTo(Number(simulationPoint.leftPoint.x) - half, Number(simulationPoint.leftPoint.y) - half);
            }
            if (simulationPoint.rightPoint != null) {
                ctx.moveTo(Number(simulationPoint.x) - half, Number(simulationPoint.y) - half);
                ctx.lineTo(Number(simulationPoint.rightPoint.x) - half, Number(simulationPoint.rightPoint.y) - half);
            }
            if (simulationPoint.topPoint != null) {
                ctx.moveTo(Number(simulationPoint.x) - half, Number(simulationPoint.y) - half);
                ctx.lineTo(Number(simulationPoint.topPoint.x) - half, Number(simulationPoint.topPoint.y) - half);
            }
            if (simulationPoint.bottomPoint != null) {
                ctx.moveTo(Number(simulationPoint.x) - half, Number(simulationPoint.y) - half);
                ctx.lineTo(Number(simulationPoint.bottomPoint.x) - half, Number(simulationPoint.bottomPoint.y) - half);
            }
        }
        ctx.stroke();

        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        var fontSize = Number(this.pointDensity.div(40.0).times(10).plus(5));
        ctx.font = Math.round(fontSize) + "px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var temp = simulationPoint.temperature;

            var maxTemp = this.outsideTemperature;
            var minTemp = this.insideTemperature;
            var halfTemp = maxTemp.minus(minTemp).div(2.0).plus(minTemp);

            if (temp.lt(halfTemp)) {
                var tempPercent = temp.minus(minTemp).div(halfTemp.minus(minTemp));
                var redgreen = (255 * Number(tempPercent));
                var blue = (255-(255 * Number(tempPercent)));
                ctx.fillStyle = "rgba("+Math.round(redgreen)+","+Math.round(redgreen)+","+Math.round(blue)+",1.0)";
            } else {
                var tempPercent = temp.minus(halfTemp).div(maxTemp.minus(halfTemp));
                var red = (255 * Number(tempPercent));
                var yellow = (255-(255 * Number(tempPercent)));
                ctx.fillStyle = "rgba("+Math.round(yellow+red)+","+Math.round(yellow)+",0,1.0)";
            }

            ctx.beginPath();
            ctx.arc(Number(simulationPoint.x),Number(simulationPoint.y),Number(this.pointDensity.div(2.0)),0,2*Math.PI);
            ctx.fill();
            ctx.stroke();

            if (this.pointDensity.gt(1.0)) {
                ctx.fillText("" + Math.round(Number(simulationPoint.temperature)), Number(simulationPoint.x), Number(simulationPoint.y.minus(this.pointDensity)));
            }
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
        //console.log("Number going into pow: " + Number(new Decimal(40.0).div(this.pointDensity)));
        //var densityUndo = new Decimal(4.0).pow(Number(new Decimal(40.0).div(this.pointDensity)));

        if (fromPoint.isInside == false) {
            //Only transfer and assume that there is already a wall between
            var temperatureDifference = fromPoint.temperature.minus(toPoint.temperature);
            var tempAdd = temperatureDifference.times(this.wallTransferRateSqrt);

            toPoint.temperature = tempAdd.plus(toPoint.temperature);

        } else {
            //Determine if there is a wall between
            var transferRate = this.airTransferRateSqrt;
            if (this.isWallBetweenPoints(fromPoint, toPoint)) {
                transferRate = this.wallTransferRateSqrt;
            }
            var temperatureDifference = fromPoint.temperature.minus(toPoint.temperature);
            var tempAdd = temperatureDifference.times(transferRate);

            //var oldCombo = toPoint.temperature.plus(fromPoint.temperature);

            toPoint.temperature = toPoint.temperature.plus(tempAdd);
            fromPoint.temperature = fromPoint.temperature.minus(tempAdd);
            /*
             var newCombo = toPoint.temperature.plus(fromPoint.temperature);

             if (newCombo.eq(oldCombo) == false) {
             console.log("Temperature combo: " + oldCombo + " vs " + newCombo);
             console.log("To temp: " + toPoint.temperature);
             console.log("From temp: " + fromPoint.temperature);
             console.log("Temperature difference: " + temperatureDifference);
             console.log("Temp Add: " + tempAdd);
             console.log(" ------------ ");
             }
             */
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