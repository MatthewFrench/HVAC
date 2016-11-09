/**
 * Created by Matt on 9/9/16.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
    LAYOUT_MODE_DELETE_WALL = 4;
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;
var EDIT_MODE_POINT = 0, EDIT_MODE_CORNER = 1;

//Constructor
var HVACApplication = function () {
    this.hvacData = null;
    this.shiftPressed = false;
    this.angle = 0;
    this.dragPositionX = 0.0;
    this.dragPositionY = 0.0;
    this.currentMouseX = 0.0;
    this.currentMouseY = 0.0;
    this.previousMouseX = 0.0;
    this.previousMouseY = 0.0;
    this.mouseMovedX = 0.0;
    this.mouseMovedY = 0.0;
    this.mouseDown = false;
    this.intersectHighlightPoints = [];
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.currentEditMode = EDIT_MODE_POINT;
    this.selectedFloor = null;
    this.selectedBuilding = null;

    this.initCreateModeVariables();
    this.initDragModeVariables();
    this.initEditCornerModeVariables();
    this.initEditPointModeVariables();
    this.initViewModeVariables();
    this.initDeleteModeVariables();

    this.initUIVariables();
    this.createUI();

    this.loadData();
};

HVACApplication.prototype.loadData = function() {
    "use strict";
    this.hvacData = HVACDataLoader.getHVACData();
    this.selectBuilding(this.hvacData.getBuildingList()[0]);
    this.floorPicker.loadFloors();
};

HVACApplication.prototype.saveData = function() {
    console.log("Saving: " + JSON.stringify(this.hvacData.getHashmap()));
    window.localStorage.setItem("HVACData", JSON.stringify(this.hvacData.getHashmap()));
};

HVACApplication.prototype.selectBuilding = function(building) {
    this.selectedBuilding = building;
    this.selectFloor(building.getFloorList()[0]);
    console.log("Selected building: " + this.selectedBuilding);
    console.log("Selected floor: " + this.selectedFloor);
};

HVACApplication.prototype.selectFloor = function(floor) {
    this.selectedFloor = floor;
};

HVACApplication.prototype.getCurrentWallList = function() {
    //return this.hvacData.getBuildingList()[0].getFloorList()[0].getWallList();
    return this.selectedFloor.getWallList();
};

HVACApplication.prototype.getCurrentFloorPlan = function() {
    //return this.hvacData.getBuildingList()[0].getFloorList()[0];
    return this.selectedFloor;
};

HVACApplication.prototype.getCurrentBuilding = function() {
    //return this.hvacData.getBuildingList()[0];
    return this.selectedBuilding;
};

HVACApplication.prototype.logic = function() {
    "use strict";

    this.layoutDraw();
};

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
    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);
    for (var i in this.intersectHighlightPoints) {
        var intersectPoint = this.intersectHighlightPoints[i];
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4.0;
        ctx.strokeRect(intersectPoint.getX() - 5, intersectPoint.getY() - 5, 10, 10);
    }
    ctx.restore();
};

HVACApplication.prototype.windowResized = function() {
    this.resizeCanvas();
};

HVACApplication.prototype.resizeCanvas = function() {
    "use strict";
    this.layoutCanvas.width = window.innerWidth;
    this.layoutCanvas.height = window.innerHeight - 150;
};

HVACApplication.prototype.layoutCanvasMousePressed = function(event) {
    "use strict";
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    if(event.which == 3) return;
    this.mouseDown = true;
    this.previousMouseX = this.currentMouseX;
    this.currentMouseX = mouseX;
    this.previousMouseY = this.currentMouseY;
    this.currentMouseY = mouseY;

    this.canvasMouseX = this.currentMouseX - this.dragPositionX;
    this.canvasMouseY = this.currentMouseY - this.dragPositionY;

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

HVACApplication.prototype.layoutCanvasMouseMoved = function(event) {
    "use strict";
    var mouseX = event.clientX - this.layoutCanvas.offsetLeft;
    var mouseY = event.clientY - this.layoutCanvas.offsetTop;
    this.previousMouseX = this.currentMouseX;
    this.currentMouseX = mouseX;
    this.previousMouseY = this.currentMouseY;
    this.currentMouseY = mouseY;

    this.mouseMovedX = this.previousMouseX - this.currentMouseX;
    this.mouseMovedY = this.previousMouseY - this.currentMouseY;

    this.canvasMouseX = this.currentMouseX - this.dragPositionX;
    this.canvasMouseY = this.currentMouseY - this.dragPositionY;

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
};

HVACApplication.prototype.layoutCanvasMouseReleased = function(event) {
    "use strict";
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    if(event.which == 3) return;
    this.mouseDown = false;
    this.previousMouseX = this.currentMouseX;
    this.currentMouseX = mouseX;
    this.previousMouseY = this.currentMouseY;
    this.currentMouseY = mouseY;

    this.canvasMouseX = this.currentMouseX - this.dragPositionX;
    this.canvasMouseY = this.currentMouseY - this.dragPositionY;

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

HVACApplication.prototype.onKeydown = function(event) {
    "use strict";
    //var key = event.which;
    if (event.shiftKey) {
        this.shiftPressed = true;
    }
};

HVACApplication.prototype.onKeyup = function(event) {
    "use strict";
    //var key = event.which;
    if (!event.shiftKey) {
        this.shiftPressed = false;
    }
};