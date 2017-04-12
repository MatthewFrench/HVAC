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

class SimulationVent {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.temperature = 0.0;
        this.radius = 35.0;
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
        this.canvasResolution = 2.0;

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
        this.dragVent = null;

        // *** Rotating Variables
        this.mouseAngle = 0;

        window.addEventListener("resize", CreateFunction(this, this.resizeCanvas));

        this.canvas.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);

        this.canvas.addEventListener('keydown', CreateFunction(this, this.onKeydown), false );
        this.canvas.addEventListener('keyup', CreateFunction(this, this.onKeyup), false );

        this.canvas.oncontextmenu = CreateFunction(this, this.layoutCanvasRightClick);

        this.pointDensity = 40.0;
        //Set wall transfer rate and air transfer rate
        this.wallTransferRate = 0.00075; // slower than air
        this.airTransferRate = 0.1;
        this.outsideAirTransferRate = this.airTransferRate * 0.05;

        this.simulationStopwatch = new Stopwatch();

        this.visible = false;

        this.logicSpeed = 1;

        this.outsideTemperature = 100.0;
        this.insideTemperature = 60.0;
        this.maxColorTemperature = 100.0;
        this.minColorTemperature = 60.0;

        this.simulationVents = [];

        this.backgroundCanvas = CreateElement({type: "canvas"});
    }

    addHotVent() {
        var vent = new SimulationVent();
        vent.temperature = this.outsideTemperature;
        vent.x = this.getCanvasWidth() / 2 + this.dragX;
        vent.y = this.getCanvasHeight() / 2 + this.dragY;
        this.simulationVents.push(vent);
    }

    addColdVent() {
        var vent = new SimulationVent();
        vent.temperature = this.insideTemperature;
        vent.x = this.getCanvasWidth() / 2 + this.dragX;
        vent.y = this.getCanvasHeight() / 2 + this.dragY;
        this.simulationVents.push(vent);
    }

    resetInsideHot() {
        this.insideTemperature = 100.0;
        this.initializeSimulationPoints();
    }

    resetInsideCold() {
        this.insideTemperature = 60.0;
        this.initializeSimulationPoints();
    }

    setOutsideHot() {
        this.outsideTemperature = 100.0;
        this.setOutsideTemperature();
    }

    setOutsideCold() {
        this.outsideTemperature = 60.0;
        this.setOutsideTemperature();
    }

    increaseLogicSpeed() {
        this.logicSpeed *= 2;
    }
    decreaseLogicSpeed() {
        this.logicSpeed /= 2;
        this.logicSpeed = Math.round(this.logicSpeed);
        if (this.logicSpeed < 0) {
            this.logicSpeed = 1;
        }
    }

    getCanvasWidth() {
        //Take resolution into account
        return this.canvas.width / this.canvasResolution;
    }
    getCanvasHeight() {
        //Take resolution into account
        return this.canvas.height / this.canvasResolution;
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
        var padding = this.pointDensity * 2;
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

        this.minimumX = Math.floor(minX) - this.pointDensity;
        this.minimumY = Math.floor(minY) - this.pointDensity;
        this.maximumX = Math.ceil(maxX) + this.pointDensity;
        this.maximumY = Math.ceil(maxY) + this.pointDensity;

        this.backgroundCanvas.width = (this.maximumX - this.minimumX) * this.canvasResolution;
        this.backgroundCanvas.height = (this.maximumY - this.minimumY) * this.canvasResolution;
        this.backgroundCanvas.getContext("2d").scale(this.canvasResolution, this.canvasResolution);

        this.drawBackgroundOutlines();
    }

    increaseDensity() {
        if (this.pointDensity <= 5.0) {
            this.pointDensity -= 1.0;
            if (this.pointDensity == 0.0) this.pointDensity = 1.0;
        } else {
            this.pointDensity = this.pointDensity - 5.0;
        }
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    decreaseDensity() {
        if (this.pointDensity < 5.0) {
            this.pointDensity += 1.0;
        } else {
            this.pointDensity = this.pointDensity + 5.0;
        }
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
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside == false) point.temperature = this.outsideTemperature;
        }
    }

    setInsideTemperature() {
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

    runSimulation() {
        this.heatOutsidePoints();
        this.runVents();

        this.simulateHeatTransfer();
        this.simulateHeatPoints();
    }

    runVents() {
        for (var i = 0; i < this.simulationVents.length; i++) {
            var vent = this.simulationVents[i];

            //Heat all air pockets in the radius
            for (var pointIndex = 0; pointIndex < this.simulationPoints.length; pointIndex++) {
                var point = this.simulationPoints[pointIndex];
                if (Math.hypot(point.x - vent.x, point.y - vent.y) <= vent.radius + this.pointDensity) {
                    this.transferTemperatureToPoint(vent.temperature, point, this.airTransferRate);
                }
            }
        }
    }



    heatOutsidePoints() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];

            if (point.isInside == false) {
                this.transferTemperatureToPoint(this.outsideTemperature, point, this.outsideAirTransferRate);
            }
        }
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
            if (point.bottomPoint != null && point.bottomPoint.processed == false) {
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

                toPoint.addTemperature += tempAdd;
                fromPoint.addTemperature -= tempAdd;
    }

    transferTemperatureToPoint(temperature, toPoint, transferRate) {
        var temperatureDifference = temperature - toPoint.temperature;
        var tempAdd = temperatureDifference * transferRate;

        toPoint.addTemperature += tempAdd;
    }

    simulationLogic() {
        for (var i = 0; i < this.logicSpeed; i++) {
            this.runSimulation();
        }
        if (this.visible) setTimeout(CreateFunction(this, this.simulationLogic), 1);
    }

    logic() {
        var ctx = this.beginDraw(this.canvas, this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;

        this.drawSimulationPoints();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;

        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
            var wall = this.hvacApplication.getCurrentWallList()[i];

            wall.draw(ctx, false);
        }

        this.drawSimulationVents();

        this.endDraw(ctx);

                ctx.fillStyle = "white";
                ctx.font = "25px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";

        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;

            ctx.fillText("Density", 5, 5);
            ctx.fillText("Space Between: " + this.pointDensity + "px", 5, 34);
            ctx.fillText("Logic Loops: " + this.logicSpeed, 65, 64);
            ctx.fillText("Outside", 5, 94);
            ctx.fillText("Inside", 5, 124);
            ctx.fillText("Add Vent", 5, 154);
    }
    drawBackgroundOutlines() {
        var ctx = this.backgroundCanvas.getContext("2d");

        ctx.clearRect(0, 0, this.backgroundCanvas.width / this.canvasResolution, this.backgroundCanvas.height / this.canvasResolution);

        var offsetX = this.minimumX;
        var offsetY = this.minimumY;

        if (this.pointDensity > 5.0) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            ctx.beginPath();
            for (var i = 0; i < this.simulationPoints.length; i++) {
                var simulationPoint = this.simulationPoints[i];
                if (simulationPoint.leftPoint != null && simulationPoint.numberWallsLeft == 0) {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.lineTo(simulationPoint.leftPoint.x - offsetX, simulationPoint.leftPoint.y - offsetY);
                }
                if (simulationPoint.rightPoint != null && simulationPoint.numberWallsRight == 0) {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.lineTo(simulationPoint.rightPoint.x - offsetX, simulationPoint.rightPoint.y - offsetY);
                }
                if (simulationPoint.topPoint != null && simulationPoint.numberWallsTop == 0) {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.lineTo(simulationPoint.topPoint.x - offsetX, simulationPoint.topPoint.y - offsetY);
                }
                if (simulationPoint.bottomPoint != null && simulationPoint.numberWallsBottom == 0) {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.lineTo(simulationPoint.bottomPoint.x - offsetX, simulationPoint.bottomPoint.y - offsetY);
                }
            }
            ctx.stroke();
        }



        if (this.pointDensity > 1) {
            ctx.shadowColor = "black";
            ctx.shadowBlur = 30;
            ctx.strokeStyle = "rgba(0,0,0,0.25)";

            ctx.beginPath();
            var size = this.pointDensity;
            var circumference = 2 * Math.PI;
            if (this.pointDensity > 5) {
                size = this.pointDensity * 2.0 / 3.0;
            }
            for (var i = 0; i < this.simulationPoints.length; i++) {
                var simulationPoint = this.simulationPoints[i];

                if (this.pointDensity > 5) {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY, size, 0, circumference);
                } else {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY, size, 0, circumference);
                }
            }
            ctx.fill();
            if (this.pointDensity > 2.0) {
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    drawSimulationPoints() {
        var ctx = this.canvas.getContext("2d");

        //Draw background
        if (this.pointDensity > 1) {
            this.canvas.getContext("2d").drawImage(this.backgroundCanvas,
                0, 0,
                this.backgroundCanvas.width, this.backgroundCanvas.height
                , this.minimumX, this.minimumY,
                this.backgroundCanvas.width / this.canvasResolution, this.backgroundCanvas.height / this.canvasResolution);
        }

        var offsetX = 0;
        var offsetY = 0;

        var fontSize = this.pointDensity/40.0*10+5;
        ctx.font = Math.round(fontSize) + "px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "";
        ctx.shadowBlur = 0;

        var maxTemp = this.maxColorTemperature;
        var minTemp = this.minColorTemperature;
        var halfTemp = (maxTemp - minTemp) / 2.0 + minTemp;

        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var temp = simulationPoint.temperature;

            var r = 0, g = 0, b = 0;

            if (temp<halfTemp) {
                var tempPercent = (temp-minTemp)/(halfTemp - minTemp);
                var redgreen = (255 * tempPercent);
                var blue = (255-(255 * tempPercent));
                r = Math.round(redgreen);
                g = Math.round(redgreen);
                b = Math.round(blue);
            } else {
                var tempPercent = (temp-halfTemp)/(maxTemp-halfTemp);
                var red = (255 * tempPercent);
                var yellow = (255-(255 * tempPercent));
                r = Math.round(yellow+red);
                g = Math.round(yellow);
                b = 0;
            }

            ctx.beginPath();
            ctx.fillStyle = "rgba("+r+","+g+","+b+",1.0)";
            if (this.pointDensity > 5) {
                ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY, this.pointDensity * 2.0 / 3.0, 0, 2 * Math.PI);
            } else if (this.pointDensity > 1) {
                ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY, this.pointDensity, 0, 2 * Math.PI);
            } else {
                ctx.rect(Math.round(simulationPoint.x - this.pointDensity - offsetX),
                    Math.round(simulationPoint.y - this.pointDensity - offsetY),
                    3, 3);
            }
            ctx.fill();

            if (this.pointDensity > 5.0) {
                ctx.shadowColor = "black";
                ctx.shadowBlur = 10;

                ctx.fillText("" + Math.round(simulationPoint.temperature),
                    simulationPoint.x - offsetX, simulationPoint.y - this.pointDensity + 1.0 - offsetY);

                ctx.shadowColor = "";
                ctx.shadowBlur = 0;
            }
        }
    }

    drawSimulationVents() {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "rgba(0,0,0,0.5)";

        ctx.lineWidth = 2.0;

        for (var i = 0; i < this.simulationVents.length; i++) {
            var vent = this.simulationVents[i];
            var temp = vent.temperature;

            var maxTemp = this.maxColorTemperature;
            var minTemp = this.minColorTemperature;
            var halfTemp = (maxTemp - minTemp) / 2.0 + minTemp;

            if (temp<halfTemp) {
                var tempPercent = (temp-minTemp)/(halfTemp - minTemp);
                var redgreen = (255 * tempPercent);
                var blue = (255-(255 * tempPercent));
                ctx.strokeStyle = "rgba("+Math.round(redgreen)+","+Math.round(redgreen)+","+Math.round(blue)+",1.0)";
            } else {
                var tempPercent = (temp-halfTemp)/(maxTemp-halfTemp);
                var red = (255 * tempPercent);
                var yellow = (255-(255 * tempPercent));
                ctx.strokeStyle = "rgba("+Math.round(yellow+red)+","+Math.round(yellow)+",0,1.0)";
            }

            ctx.beginPath();
            ctx.arc(vent.x, vent.y, vent.radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.beginPath();
            for (var j = 0; j < vent.radius; j+= 10) {
                ctx.arc(vent.x, vent.y, j, 0, 2 * Math.PI);
            }
            ctx.arc(vent.x, vent.y, vent.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    show() {
        this.initializeSimulationPoints();
        this.simulationStopwatch.reset();

        if (this.visible == false) {
            this.visible = true;
            this.simulationLogic();
        }
    }

    hide() {
        this.clearSimulationPoints();

        this.visible = false;
    }

    //Begin and End draw are duplicate drawing code for all layout modes
    beginDraw(canvas, viewAngle, viewScale) {
        if (this.canvas.width * this.canvasResolution != this.canvas.clientWidth || this.canvas.height * this.canvasResolution != this.canvas.clientHeight) {
            this.canvas.width = this.canvas.clientWidth * this.canvasResolution;
            this.canvas.height = this.canvas.clientHeight * this.canvasResolution;
        }

        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.scale(this.canvasResolution, this.canvasResolution);

        ctx.save();

        ctx.translate(canvasWidth / 2 / this.canvasResolution, canvasHeight / 2 / this.canvasResolution);

        ctx.rotate(viewAngle); //convertToRadians(this.hvacApplication.viewAngle)

        ctx.scale(viewScale, viewScale);

        ctx.translate(-canvasWidth / 2 / this.canvasResolution, -canvasHeight / 2 / this.canvasResolution);
        ctx.translate(-this.dragX, -this.dragY);

        return ctx;
    }

    endDraw(ctx) {
        ctx.restore();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth * this.canvasResolution;
        this.canvas.height = this.canvas.clientHeight * this.canvasResolution;
    }

    setRotatedCanvasMouse() {
        var canvasWidth = this.getCanvasWidth();
        var canvasHeight = this.getCanvasHeight();
        var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
            new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}),
            this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.rotatedCanvasMouseX = p.getX();
        this.rotatedCanvasMouseY = p.getY();
    }

    layoutCanvasRightClick(event) {
        for (var i = 0; i < this.simulationVents.length; i++) {
            var vent = this.simulationVents[i];
            if (Math.hypot(vent.x - (this.rotatedCanvasMouseX + this.dragX), vent.y - (this.rotatedCanvasMouseY + this.dragY)) <= vent.radius) {
                this.simulationVents.splice(i, 1);
                break;
            }
        }

        event.preventDefault();
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

        for (var i = 0; i < this.simulationVents.length; i++) {
            var vent = this.simulationVents[i];
            if (Math.hypot(vent.x - (this.rotatedCanvasMouseX + this.dragX), vent.y - (this.rotatedCanvasMouseY + this.dragY)) <= vent.radius) {
                this.dragVent = vent;
            }
        }
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
                if (this.dragVent == null) {
                    this.dragX += this.rotatedCanvasMouseMovedX;
                    this.dragY += this.rotatedCanvasMouseMovedY;
                } else {
                    this.dragVent.x -= this.rotatedCanvasMouseMovedX;
                    this.dragVent.y -= this.rotatedCanvasMouseMovedY;
                }
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

        this.dragVent = null;
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