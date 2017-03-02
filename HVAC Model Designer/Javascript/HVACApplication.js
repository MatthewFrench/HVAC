/**
 * Created by Matt on 9/9/16.
 *
 * This JS file controls our entire HVAC Application, allowing us to do the various functions such as Create, Drag,
 * Edit, and Delete. It also controls the initial rotation of the window and establishes the floor plans and building
 * plans that are being adjusted/created.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
    LAYOUT_MODE_DELETE_WALL = 4;
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;
var EDIT_MODE_POINT = 0, EDIT_MODE_CORNER = 1;

/**
 * Creates the HVACApplication class and initializes set variables.
 *
 * @constructor
 */
var HVACApplication = function () {
    this.hvacData = null;
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
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.currentEditMode = EDIT_MODE_POINT;
    this.selectedFloor = null;
    this.selectedBuilding = null;
    this.viewAngle = 0.0;
    this.viewScale = 1.0;

    this.viewMode3DController = new ViewMode3DController(this);

    this.initUIVariables();
    this.createUI();
    this.initCreateModeVariables();
    this.initDragModeVariables();
    this.initEditCornerModeVariables();
    this.initEditPointModeVariables();
    this.initViewModeVariables();
    this.initDeleteModeVariables();
    this.loadData();
};

/**
 * Loads in the information that was saved to local storage.
 */
HVACApplication.prototype.loadData = function() {
    "use strict";
    this.hvacData = HVACDataLoader.getHVACData();
    this.selectBuilding(this.hvacData.getBuildingList()[0]);
    this.floorPicker.loadFloors();
};

/**
 * Saves the current project information to local storage.
 */
HVACApplication.prototype.saveData = function() {
    window.localStorage.setItem("HVACData", JSON.stringify(this.hvacData.getHashmap()));
};

/**
 * Set the selected building project and also selected the first floor of it.
 *
 * @param building: The building project currently loaded.
 */
HVACApplication.prototype.selectBuilding = function(building) {
    this.selectedBuilding = building;
    this.selectFloor(building.getFloorList()[0]);
};

/**
 * Set the current selected floor.
 *
 * @param floor: The floor that the user or the first instance of loading a building project has selected.
 */
HVACApplication.prototype.selectFloor = function(floor) {
    this.selectedFloor = floor;
};

/**
 * Retrieves the wall list of the currently selected floor.
 *
 * @return: The wall list of the currently selected floor.
 */
HVACApplication.prototype.getCurrentWallList = function() {
    return this.selectedFloor.getWallList();
};

/**
 * Retrieves the currently selected floor.
 *
 * @return: The currently selected floor.
 */
HVACApplication.prototype.getCurrentFloorPlan = function() {
    return this.selectedFloor;
};

/**
 * Retrieves the currently selected building project.
 *
 * @return: The currently selected building project.
 */
HVACApplication.prototype.getCurrentBuilding = function() {
    return this.selectedBuilding;
};

/**
 * Redraw the canvas.
 */
HVACApplication.prototype.logic = function() {
    "use strict";
    this.layoutDraw();
};

/**
 * Begin and End draw are duplicate drawing code for all layout modes
 *
 * @return: context of the canvas.
 */
HVACApplication.prototype.beginDraw = function() {
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();

    ctx.translate(canvasWidth/2, canvasHeight/2);

    ctx.rotate(this.viewAngle); //convertToRadians(this.viewAngle)

    ctx.scale(this.viewScale, this.viewScale);

    ctx.translate(-canvasWidth/2, -canvasHeight/2);

    return ctx;
};

/**
 * Restore the layout of the canvas.
 *
 * @param ctx: The context of the canvas.
 */
HVACApplication.prototype.endDraw = function(ctx) {
    ctx.restore();
};

/**
 * Determines which mode user is in and proceeds to draw the canvas based on that mode.
 */
HVACApplication.prototype.layoutDraw = function() {
    "use strict";
    if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
        this.drawViewModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
        this.drawDeleteModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        this.drawCreateModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
        this.drawDragModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            this.drawEditPointModeLayout();
        }
        if (this.currentEditMode == EDIT_MODE_CORNER) {
            this.drawEditCornerModeLayout();
        }
    }

    //Draw slice intersection points
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;
    ctx.save();
    ctx.translate(canvasWidth/2, canvasHeight/2);
    ctx.rotate(this.viewAngle); //convertToRadians(this.viewAngle)
    ctx.scale(this.viewScale, this.viewScale); //convertToRadians(this.viewAngle)
    ctx.translate(-canvasWidth/2, -canvasHeight/2);
    for (var i in this.intersectHighlightPoints) {
        var intersectPoint = this.intersectHighlightPoints[i];
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4.0;
        ctx.strokeRect(intersectPoint.getX() - 5, intersectPoint.getY() - 5, 10, 10);
    }
    ctx.restore();

/* Debug mouse position showing
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.canvasMouseX, this.canvasMouseY, 5, 0, 2 * Math.PI);
        ctx.fill();
        */
};

/**
 * Resizes the canvas to properly fit the web browser on computer screen.
 */
HVACApplication.prototype.windowResized = function() {
    this.resizeCanvas();
};

/**
 * Resizes the canvas width and height.
 */
HVACApplication.prototype.resizeCanvas = function() {
    "use strict";
    this.layoutCanvas.width = this.layoutCanvas.clientWidth;
    this.layoutCanvas.height = this.layoutCanvas.clientHeight;
};

/**
 * Sets the mouse position on the canvas.
 */
HVACApplication.prototype.setRotatedCanvasMouse = function() {
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;
    var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
        new Point2D({x: canvasWidth/2, y: canvasHeight/2}), this.viewAngle, this.viewScale);
    this.rotatedCanvasMouseX = p.getX();
    this.rotatedCanvasMouseY = p.getY();
};

/**
 * When the mouse is pressed down, calculate its location and handle the events based on which mode the project
 * is in.
 *
 * @param event: The event of the mouse being pressed down.
 */
HVACApplication.prototype.layoutCanvasMousePressed = function(event) {
    "use strict";
    if (ElementIsOrContainsElement(GetTargetFromMouseEvent(event), this.layoutCanvas) == false) {
        this.showMouse = false;
        return;
    }
    else {
        this.showMouse = true;
    }
    var mouseX = event.offsetX - this.layoutCanvas.clientLeft;
    var mouseY = event.offsetY - this.layoutCanvas.clientTop;
    if(event.which == 3) return;
    this.mouseDown = true;
    this.previousMouseX = this.currentMouseX;
    this.currentMouseX = mouseX;
    this.previousMouseY = this.currentMouseY;
    this.currentMouseY = mouseY;

    this.canvasMouseX = this.currentMouseX;
    this.canvasMouseY = this.currentMouseY;

    this.setRotatedCanvasMouse();

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
};

/**
 * When the mouse is moving, calculate its location and handle the events based on which mode the project
 * is in.
 *
 * @param event: The event of the mouse moving.
 */
HVACApplication.prototype.layoutCanvasMouseMoved = function(event) {
    "use strict";
    //Determines if the mouse is located on multiple Divs
    if (ElementIsOrContainsElement(GetTargetFromMouseEvent(event), this.layoutCanvas) == false) {
        this.showMouse = false;
        return;
    }
    else {
        this.showMouse = true;
    }

    var mouseX = event.offsetX - this.applicationDiv.offsetLeft - this.applicationDiv.clientLeft;
    var mouseY = event.offsetY - this.applicationDiv.offsetTop - this.applicationDiv.clientTop;
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

    if(event.stopPropagation) event.stopPropagation();
    if(event.preventDefault) event.preventDefault();
    event.cancelBubble=true;
    event.returnValue=false;
    return false;
};

/**
 * When the mouse is released, calculate its location and handle the events based on which mode the project
 * is in.
 *
 * @param event: The event of the mouse being released.
 */
HVACApplication.prototype.layoutCanvasMouseReleased = function(event) {
    "use strict";
    //Determines if the mouse is located on multiple Divs
    if (ElementIsOrContainsElement(GetTargetFromMouseEvent(event), this.layoutCanvas) == false) {
        this.showMouse = false;
        return;
    }
    else {
        this.showMouse = true;
    }
    var mouseX = event.offsetX - this.layoutCanvas.clientLeft;
    var mouseY = event.offsetY - this.layoutCanvas.clientTop;
    if(event.which == 3) return;
    this.mouseDown = false;
    this.previousMouseX = this.currentMouseX;
    this.currentMouseX = mouseX;
    this.previousMouseY = this.currentMouseY;
    this.currentMouseY = mouseY;

    this.canvasMouseX = this.currentMouseX;
    this.canvasMouseY = this.currentMouseY;

    this.setRotatedCanvasMouse();

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
};

/**
 * Determines if the Shift key is pressed down.
 *
 * @param event: The event of the key being pressed down.
 */
HVACApplication.prototype.onKeydown = function(event) {
    "use strict";
    //var key = event.which;
    if (event.shiftKey) {
        this.shiftPressed = true;
    }
};

/**
 * Determines if the Shift key is released.
 *
 * @param event: The event of the key being released.
 */
HVACApplication.prototype.onKeyup = function(event) {
    "use strict";
    //var key = event.which;
    if (!event.shiftKey) {
        this.shiftPressed = false;
    }
};