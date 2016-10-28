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
    this.dragPositionX = 0.0;
    this.dragPositionY = 0.0;
    this.currentMouseX = 0.0;
    this.currentMouseY = 0.0;
    this.previousMouseX = 0.0;
    this.previousMouseY = 0.0;
    this.mouseMovedX = 0.0;
    this.mouseMovedY = 0.0;
    this.mouseDown = false;
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.currentEditMode = EDIT_MODE_POINT;

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
};

HVACApplication.prototype.saveData = function() {
    console.log("Saving: " + JSON.stringify(this.hvacData.getHashmap()));
    window.localStorage.setItem("HVACData", JSON.stringify(this.hvacData.getHashmap()));
};

HVACApplication.prototype.getCurrentWallList = function() {
    return this.hvacData.getBuildingList()[0].getFloorList()[0].getWallList();
};

HVACApplication.prototype.getCurrentFloorPlan = function() {
    return this.hvacData.getBuildingList()[0].getFloorList()[0];
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

    console.log("Mouse pressed");

    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        console.log("Mouse pressed create wall");
        this.mousePressedCreateModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
        console.log("Mouse pressed drag");
        this.mousePressedDragModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        console.log("Mouse pressed edit");
        if (this.currentEditMode == EDIT_MODE_POINT) {
            console.log("Mouse pressed edit point");
            this.mousePressedEditPointModeLayout();
        }
        if (this.currentEditMode == EDIT_MODE_CORNER) {
            console.log("Mouse pressed edit corner");
            this.mousePressedEditCornerModeLayout();
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
        console.log("Mouse pressed view");
        this.mousePressedViewModeLayout();
    }
    if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
        console.log("Mouse pressed delete");
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