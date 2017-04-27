/**
 * Created by matt on 4/5/17.
 *
 * Handles the calculations and functionality of the canvas2D when the Simulator tab is selected.
 */

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
 * A coordinate point in the Simulation that keeps track of the temperature and any changes that may occur in
 * that location.
 */
class SimulationPoint {

    /**
     * Initializes the coordinate point and its properties.
     *
     * @param x: x-coordinate value for the given Simulation Point.
     * @param y: y-coordinate value for the given Simulation Point.
     * @constructor
     */
    constructor({x = 0, y = 0} = {}) {
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

/**
 * A vent object that is used to simulate vents on the floor. Can simulate either a heat or cold source.
 */
class SimulationVent {

    /**
     * Initializes the vent and its properties.
     *
     * @constructor
     */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.temperature = 0.0;
        this.radius = 35.0;
    }
}

/**
 * Constructs the Canvas for the Simulator Mode and handles all operations and events that occur on the canvas.
 */
class SimulatorCanvas {

    /**
     * Initializes the variables and properties of the Simulator Canvas.
     *
     * @param hvacApplication: The overall control that the Simulator Canvas is a part of.
     * @constructor
     */
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
        var ctx = this.canvas.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

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

        //Rotating Variables
        this.mouseAngle = 0;

        window.addEventListener("resize", CreateFunction(this, this.resizeCanvas));
        this.canvas.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);
        this.canvas.addEventListener('keydown', CreateFunction(this, this.onKeydown), false);
        this.canvas.addEventListener('keyup', CreateFunction(this, this.onKeyup), false);

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
        this.maskCanvas = CreateElement({type: "canvas"});
        this.pixelCanvas = CreateElement({type: "canvas"});
    }

    /**
     * Constructs a new Vent object, modify its properties to be 'hot', then add to list of vents.
     */
    addHotVent() {
        var vent = new SimulationVent();
        vent.temperature = this.outsideTemperature;
        vent.x = this.getCanvasWidth() / 2 + this.dragX;
        vent.y = this.getCanvasHeight() / 2 + this.dragY;
        this.simulationVents.push(vent);
    }

    /**
     * Constructs a new Vent object, modify its properties to be 'cold', then add to list of vents.
     */
    addColdVent() {
        var vent = new SimulationVent();
        vent.temperature = this.insideTemperature;
        vent.x = this.getCanvasWidth() / 2 + this.dragX;
        vent.y = this.getCanvasHeight() / 2 + this.dragY;
        this.simulationVents.push(vent);
    }

    /**
     * Changes the inside temperature to be hot, then refreshes the coordinate points on the canvas.
     */
    resetInsideHot() {
        this.insideTemperature = 100.0;
        this.initializeSimulationPoints();
    }

    /**
     * Changes the inside temperature to be cold, then refreshes the coordinate points on the canvas.
     */
    resetInsideCold() {
        this.insideTemperature = 60.0;
        this.initializeSimulationPoints();
    }

    /**
     * Changes the outside temperature to be hot, then refreshes the coordinate points on the canvas.
     */
    setOutsideHot() {
        this.outsideTemperature = 100.0;
        this.setOutsideTemperature();
    }

    /**
     * Changes the outside temperature to be cold, then refreshes the coordinate points on the canvas.
     */
    setOutsideCold() {
        this.outsideTemperature = 60.0;
        this.setOutsideTemperature();
    }

    /**
     * Increases the operations speed by a factor of 2.
     */
    increaseLogicSpeed() {
        this.logicSpeed *= 2;
    }

    /**
     * Decreases the operations speed by a factor of 2.
     */
    decreaseLogicSpeed() {
        this.logicSpeed /= 2;
        this.logicSpeed = Math.round(this.logicSpeed);
        if (this.logicSpeed <= 0) {
            this.logicSpeed = 1;
        }
    }

    /**
     * Retrieves the width of the canvas.
     *
     * @return: Width of the canvas in pixels
     */
    getCanvasWidth() {
        //Take resolution into account
        return this.canvas.width / this.canvasResolution;
    }

    /**
     * Retrieves the height of the canvas.
     *
     * @return: Height of the canvas in pixels
     */
    getCanvasHeight() {
        //Take resolution into account
        return this.canvas.height / this.canvasResolution;
    }

    /**
     * Loads all the valid Simulation Points onto the canvas based on the given Floor Plan that is being displayed.
     * Contains most of the calculations for where to create the Simulation Points and how they interact.
     */
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
        maxX = maxX + padding * 2;
        maxY = maxY + padding * 2;

        //Now Create the points with density
        var indexX = 0;
        var indexY = 0;
        var indexArray = {};
        this.pointWidth = 0;
        this.pointHeight = 0;
        this.pointLeft = minX;
        this.pointTop = minY;
        this.pointArray = [];

        for (var x = minX; x <= maxX; x += this.pointDensity * 2) {
            var secondArray = [];
            indexArray[indexX] = {};

            for (var y = minY; y <= maxY; y += this.pointDensity * 2) {
                var simulationPoint = new SimulationPoint({x: x, y: y});
                indexArray[indexX][indexY] = simulationPoint;
                simulationPoint.processed = false;
                simulationPoint.indexX = indexX;
                simulationPoint.indexY = indexY;
                simulationPoint.temperature = 60.0;
                this.simulationPoints.push(simulationPoint);
                this.pointWidth = Math.max(this.pointWidth, indexX);
                this.pointHeight = Math.max(this.pointHeight, indexY);
                secondArray.push(simulationPoint);
                indexY += 1;
            }

            this.pointArray.push(secondArray);
            indexX += 1;
            indexY = 0;
        }
        this.pointWidth += 1;
        this.pointHeight += 1;
        this.setPointConnections(indexArray);
        this.setPointWalls();

        //Now mark inside and outside points
        this.setInsideOutsidePoints();

        //Set inside and outside temperatures
        this.setOutsideTemperature();
        this.setInsideTemperature();

        this.simulationStopwatch.reset();

        //Finding the overall dimensions of the Simulation Points and their locations
        this.minimumX = Math.floor(minX) - this.pointDensity;
        this.minimumY = Math.floor(minY) - this.pointDensity;
        this.maximumX = Math.ceil(maxX) + this.pointDensity;
        this.maximumY = Math.ceil(maxY) + this.pointDensity;

        //Setting the background Canvas width and height based on the dimensions of the Simulation Points
        this.backgroundCanvas.width = (this.maximumX - this.minimumX) * this.canvasResolution;
        this.backgroundCanvas.height = (this.maximumY - this.minimumY) * this.canvasResolution;
        this.backgroundCanvas.getContext("2d").scale(this.canvasResolution, this.canvasResolution);

        //Setting the mask Canvas width and height based on the dimensions of the Simulation Points
        this.maskCanvas.width = (this.maximumX - this.minimumX) * this.canvasResolution;
        this.maskCanvas.height = (this.maximumY - this.minimumY) * this.canvasResolution;
        this.maskCanvas.getContext("2d").scale(this.canvasResolution, this.canvasResolution);

        //Draw both backgrounds
        this.drawBackgroundOutlines();
        this.drawMaskCanvas();

        this.pixelDataWidth = this.pointWidth;
        this.pixelDataHeight = this.pointHeight;

        this.pixelCanvas.width = this.pixelDataWidth;
        this.pixelCanvas.height = this.pixelDataHeight;

        this.pixelData = this.pixelCanvas.getContext("2d").createImageData(this.pixelDataWidth, this.pixelDataHeight);
        for (var i = 0; i < this.pixelData.data.length; i += 4) {
            this.pixelData.data[i + 3] = 255;
        }
    }

    /**
     * Increases the amount of Simulation Points display on the canvas within the same boundary.
     */
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

    /**
     * Decreases the amount of Simulation Points display on the canvas within the same boundary.
     */
    decreaseDensity() {
        if (this.pointDensity < 5.0) {
            this.pointDensity += 1.0;
        } else {
            this.pointDensity = this.pointDensity + 5.0;
        }
        this.clearSimulationPoints();
        this.initializeSimulationPoints();
    }

    /**
     * Sets the number of walls for each Simulation Point in the up/down/left/right directions.
     */
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

    /**
     * Interates through every Simulation Point, and if the point is determined to be outside of the walls of the floor,
     * then its temperature is equal to the outside Temperature value.
     */
    setOutsideTemperature() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (!point.isInside) point.temperature = this.outsideTemperature;
        }
    }

    /**
     * Interates through every Simulation Point, and if the point is determined to be inside of the walls of the floor,
     * then its temperature is equal to the inside Temperature value.
     */
    setInsideTemperature() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            if (point.isInside) point.temperature = this.insideTemperature;
        }
    }

    /**
     * Iterates through every Simulation Point, and determines if the point is Inside/Outside based on the number of
     * walls between that Simulation Point and the Simulation Points around it.
     */
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
                if (point.numberWallsLeft == 0 && !point.leftPoint.processed) {
                    processList.push(point.leftPoint);
                    point.leftPoint.processed = true;
                }
            }
            if (point.rightPoint != null) {
                if (point.numberWallsRight == 0 && !point.rightPoint.processed) {
                    processList.push(point.rightPoint);
                    point.rightPoint.processed = true;
                }
            }
            if (point.topPoint != null) {
                if (point.numberWallsTop == 0 && !point.topPoint.processed) {
                    processList.push(point.topPoint);
                    point.topPoint.processed = true;
                }
            }
            if (point.bottomPoint != null) {
                if (point.numberWallsBottom == 0 && !point.bottomPoint.processed) {
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

    /**
     * Determines the number of walls between 2 Simulation Points.
     *
     * @param point1: The first Simulation Point
     * @param point2: The second Simulation Point
     * @return: The number of walls between point1 and point2.
     */
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
                wallCount += 1;
            }
        }
        return wallCount;
    }

    /**
     * Connects the Simulation Points to their neighboring up/down/left/right Simulation Points from the list of the
     * points.
     *
     * @param indexArray: 2D array that contains all of the x-coordinate & y-coordinate points of every Simulation
     * Point.
     */
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

    /**
     * Deletes all of the Simulation Points.
     */
    clearSimulationPoints() {
        this.simulationPoints = [];
    }

    /**
     * Initiates the heat simulation of the given floor on the canvas.
     */
    runSimulation() {
        this.heatOutsidePoints();
        this.runVents();

        this.simulateHeatTransfer();
        this.simulateHeatPoints();
    }

    /**
     * Iterates through each Simulation Point and checks if there is are created vents nearby. If so, will need to
     * modify temperature of the Simulation Point.
     */
    runVents() {
        for (var i = 0; i < this.simulationVents.length; i++) {
            var vent = this.simulationVents[i];

            //Calculate approximate grid position
            var gridX = (vent.x - this.pointLeft) / (this.pointDensity * 2);
            var gridY = (vent.y - this.pointTop) / (this.pointDensity * 2);
            var gridXMin = Math.ceil(Math.max(gridX - vent.radius / this.pointDensity, 0));
            var gridYMin = Math.ceil(Math.max(gridY - vent.radius / this.pointDensity, 0));
            var gridXMax = Math.floor(Math.min(gridX + vent.radius / this.pointDensity, this.pointWidth - 1));
            var gridYMax = Math.floor(Math.min(gridY + vent.radius / this.pointDensity, this.pointHeight - 1));

            for (var x = gridXMin; x <= gridXMax; x++) {
                for (var y = gridYMin; y <= gridYMax; y++) {
                    var point = this.pointArray[x][y];

                    if (((point.x - vent.x) * (point.x - vent.x) + (point.y - vent.y) * (point.y - vent.y)) <=
                        ((vent.radius + this.pointDensity) * (vent.radius + this.pointDensity))) {
                        this.transferTemperatureToPoint(vent.temperature, point, this.airTransferRate);
                    }
                }
            }
        }
    }

    /**
     * Iterates through each Simulation Point and if it is considered outside, make the temperature of the point
     * equal to the outside temperature.
     */
    heatOutsidePoints() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];

            if (!point.isInside) {
                this.transferTemperatureToPoint(this.outsideTemperature, point, this.outsideAirTransferRate);
            }
        }
    }

    /**
     * Iterates through each Simulation Point and adjust the temperature value by given 'addTemperature' property.
     */
    simulateHeatPoints() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            point.processed = false;
            point.temperature += point.addTemperature;
            point.addTemperature = 0.0;
        }
    }

    /**
     * Iterates through each Simulation Point and determines the heat transfer between the up/down/left/right
     * Simulation Points. It also takes into account the number of walls between the points.
     */
    simulateHeatTransfer() {
        for (var i = 0; i < this.simulationPoints.length; i++) {
            var point = this.simulationPoints[i];
            point.processed = true;
            if (point.leftPoint != null && !point.leftPoint.processed) {
                this.transferTemperatureBetweenPoints(point, point.leftPoint, point.numberWallsLeft);
            }
            if (point.rightPoint != null && !point.rightPoint.processed) {
                this.transferTemperatureBetweenPoints(point, point.rightPoint, point.numberWallsRight);
            }
            if (point.topPoint != null && !point.topPoint.processed) {
                this.transferTemperatureBetweenPoints(point, point.topPoint, point.numberWallsTop);
            }
            if (point.bottomPoint != null && !point.bottomPoint.processed) {
                this.transferTemperatureBetweenPoints(point, point.bottomPoint, point.numberWallsBottom);
            }
        }
    }

    /**
     * Calculates the rate of heat transfer between 2 Simulation Points and adjusted the temperature of the points
     * based on that rate.
     *
     * @param fromPoint: The Simulation Point where the source of heat is coming from.
     * @param toPoint: The Simulation Point where the source of heat is going to.
     * @param numberOfWallsBetween: The number of walls in between the 2 given points.
     */
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

    /**
     * Changes the temperature of the given point based on the temperature being transferred and the transfer rate.
     *
     * @param temperature: Temperature being transferred to the given point.
     * @param toPoint: Simulation Point that is being effected.
     * @param transferRate: Rate at which the heat is transferred to the given point.
     */
    transferTemperatureToPoint(temperature, toPoint, transferRate) {
        var temperatureDifference = temperature - toPoint.temperature;
        var tempAdd = temperatureDifference * transferRate;

        toPoint.addTemperature += tempAdd;
    }

    /**
     * Speed at which the simulation is ran at.
     */
    simulationLogic() {
        for (var i = 0; i < this.logicSpeed; i++) {
            this.runSimulation();
        }
        if (this.visible) setTimeout(CreateFunction(this, this.simulationLogic), 1);
    }

    /**
     * Visual operations that display the walls of the floor and Simulation Points.
     */
    logic() {
        var ctx = this.beginDraw(this.canvas, this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.drawSimulationPoints();

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

        ctx.fillText("Density", 5, 5);
        ctx.fillText("Space Between: " + this.pointDensity + "px", 5, 34);
        ctx.fillText("Logic Loops: " + this.logicSpeed, 65, 64);
        ctx.fillText("Outside", 5, 94);
        ctx.fillText("Inside", 5, 124);
        ctx.fillText("Add Vent", 5, 154);
    }

    /**
     * Draws the lines in between the Simulation Points on the canvas.
     */
    drawBackgroundOutlines() {
        var ctx = this.backgroundCanvas.getContext("2d");

        ctx.clearRect(0, 0, this.backgroundCanvas.width / this.canvasResolution,
            this.backgroundCanvas.height / this.canvasResolution);

        if (this.pointDensity == 1) return;

        var offsetX = this.minimumX;
        var offsetY = this.minimumY;

        if (this.pointDensity > 1) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 30 * this.pointDensity / 40.0;

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
                } else {
                    ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                    ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY, size, 0, circumference);
                }
            }
            ctx.fill();

            if (this.pointDensity > 2.0) {
                ctx.stroke();
            }
        }
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;
    }

    /**
     * Redraws the Canvas based on the density of the Simulation Points.
     */
    drawMaskCanvas() {
        var ctx = this.maskCanvas.getContext("2d");

        ctx.clearRect(0, 0, this.maskCanvas.width / this.canvasResolution,
            this.maskCanvas.height / this.canvasResolution);

        var offsetX = this.minimumX;
        var offsetY = this.minimumY;
        ctx.fillStyle = "black";
        ctx.beginPath();

        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];

            if (this.pointDensity > 5) {
                ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY,
                    this.pointDensity * 2.0 / 3.0, 0, 2 * Math.PI);
            }
            else if (this.pointDensity > 1) {
                ctx.moveTo(simulationPoint.x - offsetX, simulationPoint.y - offsetY);
                ctx.arc(simulationPoint.x - offsetX, simulationPoint.y - offsetY, this.pointDensity, 0, 2 * Math.PI);
            }
        }
        ctx.fill();
    }

    /**
     * Draws each Simulation Point on the canvas
     */
    drawSimulationPoints() {
        if (this.simulationPoints.length == 0) return;

        var ctx = this.canvas.getContext("2d");

        var offsetX = 0;
        var offsetY = 0;

        var maxTemp = this.maxColorTemperature;
        var minTemp = this.minColorTemperature;
        var halfTemp = (maxTemp - minTemp) / 2.0 + minTemp;

        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = (25 * this.pointDensity / 40.0) + "px Arial";

        for (var i = 0; i < this.simulationPoints.length; i++) {
            var simulationPoint = this.simulationPoints[i];
            var temp = simulationPoint.temperature;
            var r = 0, g = 0, b = 0;

            if (temp < halfTemp) {
                var tempPercent = (temp - minTemp) / (halfTemp - minTemp);
                var redgreen = (255 * tempPercent);
                var blue = (255 - (255 * tempPercent));
                r = Math.round(redgreen);
                g = Math.round(redgreen);
                b = Math.round(blue);
            } else {
                var tempPercent = (temp - halfTemp) / (maxTemp - halfTemp);
                var red = (255 * tempPercent);
                var yellow = (255 - (255 * tempPercent));
                r = Math.round(yellow + red);
                g = Math.round(yellow);
                b = 0;
            }
            var index = (simulationPoint.indexY * this.pixelDataWidth + simulationPoint.indexX) * 4;
            this.pixelData.data[index] = r;
            this.pixelData.data[index + 1] = g;
            this.pixelData.data[index + 2] = b;

            if (this.pointDensity > 5.0) {
                ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",1.0)";

                ctx.fillText("" + Math.round(simulationPoint.temperature),
                    simulationPoint.x - offsetX, simulationPoint.y - this.pointDensity - offsetY);
            }
        }
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;

        this.pixelCanvas.getContext("2d").putImageData(this.pixelData, 0, 0);

        var maskCtx = this.maskCanvas.getContext("2d");

        if (this.pointDensity > 1) {
            maskCtx.globalCompositeOperation = "source-in";

            maskCtx.drawImage(this.pixelCanvas, 0, 0, this.pixelCanvas.width, this.pixelCanvas.height, 0, 0,
                this.pointWidth * this.pointDensity * 2, this.pointHeight * this.pointDensity * 2);

            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(this.maskCanvas, 0, 0, this.maskCanvas.width, this.maskCanvas.height,
                this.minimumX, this.minimumY, this.maskCanvas.width / this.canvasResolution,
                this.maskCanvas.height / this.canvasResolution);
        } else {
            ctx.drawImage(this.pixelCanvas, 0, 0, this.pixelCanvas.width, this.pixelCanvas.height,
                this.pointLeft - this.pointDensity, this.pointTop - this.pointDensity,
                this.pointWidth * this.pointDensity * 2, this.pointHeight * this.pointDensity * 2);
        }

        if (this.pointDensity > 1) {
            ctx.globalCompositeOperation = "destination-over";

            this.canvas.getContext("2d").drawImage(this.backgroundCanvas, 0, 0, this.maskCanvas.width,
                this.maskCanvas.height, this.minimumX, this.minimumY, this.maskCanvas.width / this.canvasResolution,
                this.maskCanvas.height / this.canvasResolution);
            ctx.globalCompositeOperation = "source-over";
        }
    }

    /**
     * Draws each Simulation Vent on the canvas.
     */
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

            if (temp < halfTemp) {
                var tempPercent = (temp - minTemp) / (halfTemp - minTemp);
                var redgreen = (255 * tempPercent);
                var blue = (255 - (255 * tempPercent));
                ctx.strokeStyle = "rgba(" + Math.round(redgreen) + "," + Math.round(redgreen) +
                    "," + Math.round(blue) + ",1.0)";
            } else {
                var tempPercent = (temp - halfTemp) / (maxTemp - halfTemp);
                var red = (255 * tempPercent);
                var yellow = (255 - (255 * tempPercent));
                ctx.strokeStyle = "rgba(" + Math.round(yellow + red) + "," + Math.round(yellow) + ",0,1.0)";
            }

            ctx.beginPath();
            ctx.arc(vent.x, vent.y, vent.radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.beginPath();
            for (var j = 0; j < vent.radius; j += 10) {
                ctx.arc(vent.x, vent.y, j, 0, 2 * Math.PI);
            }
            ctx.arc(vent.x, vent.y, vent.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    /**
     * Initiates all displays on the canvas.
     */
    show() {
        this.initializeSimulationPoints();
        this.simulationStopwatch.reset();

        if (!this.visible) {
            this.visible = true;
            this.simulationLogic();
        }
    }

    /**
     * Hides the Simulator interface from the canvas.
     */
    hide() {
        this.clearSimulationPoints();
        this.visible = false;
    }

    /**
     * Begin and End draw are duplicate drawing code for all layout modes.
     *
     * @param canvas: The interface where the Simulator will be drawn on.
     * @param viewAngle: The degree of rotation of the canvas.
     * @param viewScale: The zoom in/out scale of the canvas.
     * @return: The canvas after being redrawn.
     */
    beginDraw(canvas, viewAngle, viewScale) {
        if (this.canvas.width * this.canvasResolution != this.canvas.clientWidth
            || this.canvas.height * this.canvasResolution != this.canvas.clientHeight) {
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

    /**
     * Restores the canvas after being drawn.
     *
     * @param ctx: The canvas that is being redrawn.
     */
    endDraw(ctx) {
        ctx.restore();
    }

    /**
     * Resizes the canvas based on width, height & resolution.
     */
    resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth * this.canvasResolution;
        this.canvas.height = this.canvas.clientHeight * this.canvasResolution;
    }

    /**
     * Calculates the location of the mouse based on the angle of rotation of the canvas.
     */
    setRotatedCanvasMouse() {
        var canvasWidth = this.getCanvasWidth();
        var canvasHeight = this.getCanvasHeight();
        var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
            new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}),
            this.hvacApplication.viewAngle, this.hvacApplication.viewScale);

        this.rotatedCanvasMouseX = p.getX();
        this.rotatedCanvasMouseY = p.getY();
    }

    /**
     * Handles the Right-Click event. If it occurred over a Simulation Vent, delete that vent.
     *
     * @param event: Right-Click of the mouse.
     */
    layoutCanvasRightClick(event) {
        for (var i = 0; i < this.simulationVents.length; i++) {
            var vent = this.simulationVents[i];
            if (Math.hypot(vent.x - (this.rotatedCanvasMouseX + this.dragX),
                    vent.y - (this.rotatedCanvasMouseY + this.dragY)) <= vent.radius) {
                this.simulationVents.splice(i, 1);
                break;
            }
        }
        event.preventDefault();
    }

    /**
     * Handles Mouse-Click event. If occurs on a Simulation Vent, that vent can be dragged while the mouse is being
     * held down. Otherwise, the entire canvas will drag while the mouse is held down.
     *
     * @param event: Mouse-Click event.
     */
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
            if (Math.hypot(vent.x - (this.rotatedCanvasMouseX + this.dragX),
                    vent.y - (this.rotatedCanvasMouseY + this.dragY)) <= vent.radius) {
                this.dragVent = vent;
            }
        }
    }

    /**
     * Handles the event when the mouse is moving.
     *
     * @param event: The mouse when moving.
     * @return: Boolean value.
     */
    layoutCanvasMouseMoved(event) {
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

        //Dragging Code when mouse is held down and moving
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

    /**
     * Handles the event when the mouse is released after being held down.
     *
     * @param event: The mouse being released.
     */
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

    /**
     * Handles situation when mouse is moved off the canvas.
     *
     * @param event: Mouse is located off the canvas.
     */
    layoutCanvasMouseOut(event) {
        this.mouseIsOnCanvas = false;
        this.layoutCanvasMouseReleased(event);
    }

    /**
     * Handles situation when mouse is moved onto the canvas.
     *
     * @param event: Mouse is located on the canvas.
     */
    layoutCanvasMouseOver(event) {
        this.mouseIsOnCanvas = true;
    }

    /**
     * Handles situation when 'Shift' key is held down.
     *
     * @param event: 'Shift' key is held down.
     */
    onKeydown(event) {
        if (event.shiftKey) {
            this.shiftPressed = true;
        }
    }

    /**
     * Handles situation when 'Shift' key is released.
     *
     * @param event: 'Shift' key is released.
     */
    onKeyup(event) {
        if (!event.shiftKey) {
            this.shiftPressed = false;
        }
    }

    /**
     * Retrieves the current canvas.
     *
     * @return: current canvas.
     */
    getCanvas() {
        return this.canvas;
    }
}