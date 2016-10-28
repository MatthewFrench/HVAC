/**
 * Created by Matt on 9/9/16.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
    LAYOUT_MODE_DELETE_WALL = 4;
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;
var EDIT_MODE_POINT = 0, EDIT_MODE_CORNER = 1;

//Constructor
var HVACApplication = function () {
    this.wallList = [];
    this.shiftPressed = false;
    this.dragPositionX = 0.0;
    this.dragPositionY = 0.0;
    this.currentMouseX = 0.0;
    this.currentMouseY = 0.0;
    this.previousMouseX = 0.0;
    this.previousMouseY = 0.0;
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

    var hvacData = JSON.parse(window.localStorage.getItem("HVACData"));
    if (hvacData != null) {
        if (hvacData["Version"] == 1) {
            var wallDataArray = hvacData["Walls"];
            for (var i = 0; i < wallDataArray.length; i++) {
                var wallData = wallDataArray[i];
                this.wallList.push(new WallObject(wallData["x1"],wallData["y1"],wallData["x2"],wallData["y2"]));
            }
        }
    }
};

HVACApplication.prototype.saveData = function() {
    //Format
    //  Hashmap
    //      "Version" => number
    //      "Walls" => array
    //          [Hashmap]
    //              "x1" => number
    //              "y1" => number
    //              "x2" => number
    //              "y2" => number

    var hvacData = {};
    hvacData["Version"] = 1;
    hvacData["Walls"] = [];
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        hvacData["Walls"].push({});
        hvacData["Walls"][i]["x1"] = wall.x1;
        hvacData["Walls"][i]["y1"] = wall.y1;
        hvacData["Walls"][i]["x2"] = wall.x2;
        hvacData["Walls"][i]["y2"] = wall.y2;
    }

    window.localStorage.setItem("HVACData", JSON.stringify(hvacData));
}

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