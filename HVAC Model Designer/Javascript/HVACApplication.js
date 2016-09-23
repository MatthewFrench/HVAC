/**
 * Created by Matt on 9/9/16.
 */

<<<<<<< HEAD
var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT = 1, LAYOUT_MODE_DRAG = 2;
=======
var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT_WALL = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
    LAYOUT_MODE_DELETE = 4;
>>>>>>> parent of 23f592b... Added Functionality to Delete Button.
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;
var EDIT_MODE_POINT = 0, EDIT_MODE_CORNER = 1, EDIT_MODE_WALL = 2;

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
<<<<<<< HEAD
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.currentEditMode = EDIT_MODE_POINT;
=======

    this.createUI();
};

HVACApplication.prototype.createUI = function() {
    this.myBannerDiv = document.createElement("div");
    this.myBannerDiv.className = "RibbonBanner";
    document.body.appendChild(this.myBannerDiv);

    this.titleSpan = document.createElement("span");
    this.titleSpan.className = "TopTitle";
    this.titleSpan.innerText = "HVAC Model Designer";
    document.body.appendChild(this.titleSpan);

    this.layoutCanvas = document.createElement("canvas");
    this.layoutCanvas.className = "LayoutCanvas";
    document.body.appendChild(this.layoutCanvas);
    var self = this;
    document.body.onmousemove = function(event){
        self.layoutCanvasMouseMoved(event);
    };
    this.layoutCanvas.onmousedown = function(event){
        self.layoutCanvasMousePressed(event);
    };
    this.layoutCanvas.onmouseup = function(event){
        self.layoutCanvasMouseReleased(event);
    };


    this.viewButtonDiv = document.createElement("div");
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.viewButtonDiv.innerText = "View";
    this.viewButtonDiv.onclick = function(event) {
        "use strict";
        self.viewWallButtonClicked();
    }
    document.body.appendChild(this.viewButtonDiv);

    this.dragButtonDiv = document.createElement("div");
    this.dragButtonDiv.className = "DragButtonDiv";
    this.dragButtonDiv.innerText = "Drag";
    this.dragButtonDiv.onclick = function(event) {
        "use strict";
        self.dragButtonClicked();
    };
    document.body.appendChild(this.dragButtonDiv);

    this.createButtonDiv = document.createElement("div");
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.innerText = "Create";
    this.createButtonDiv.onclick = function(event) {
        "use strict";
        self.createWallButtonClicked();
    };
    document.body.appendChild(this.createButtonDiv);

    this.editButtonDiv = document.createElement("div");
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.innerText = "Edit";
    this.editButtonDiv.onclick = function(event) {
        "use strict";
        self.editWallButtonClicked();
    }
    document.body.appendChild(this.editButtonDiv);

    this.deleteButtonDiv = document.createElement("div");
    this.deleteButtonDiv.className = "DeleteButtonDiv";
    this.deleteButtonDiv.innerText = "Delete";
    this.deleteButtonDiv.onclick = function(event) {
        "use strict";
        self.deleteWallButtonClicked();
    }
    document.body.appendChild(this.deleteButtonDiv);
>>>>>>> parent of 23f592b... Added Functionality to Delete Button.

    this.initCreateModeVariables();
    this.initDragModeVariables();
    this.initEditCornerModeVariables();
    this.initEditPointModeVariables();
    this.initEditWallModeVariables();

    this.initUIVariables();
    this.createUI();
};

HVACApplication.prototype.logic = function() {
    "use strict";

    this.layoutDraw();
};
HVACApplication.prototype.layoutDraw = function() {
    "use strict";

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
        if (this.currentEditMode == EDIT_MODE_WALL) {
            this.drawEditWallModeLayout();
        }
    }
<<<<<<< HEAD
};
=======

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT_WALL);
    }

    if (this.currentCreateWall != null) {
        this.currentCreateWall.drawLength(ctx);
    }
    if (this.selectedWall != null) {
        this.selectedWall.drawLength(ctx);
    }

    ctx.restore();
}
>>>>>>> parent of 23f592b... Added Functionality to Delete Button.
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
<<<<<<< HEAD
        if (this.currentEditMode == EDIT_MODE_CORNER) {
            this.mousePressedEditCornerModeLayout();
        }
        if (this.currentEditMode == EDIT_MODE_WALL) {
            this.mousePressedEditWallModeLayout();
        }
    }
};
=======
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT_WALL) {
        this.selectedWall = null;
    }
}
>>>>>>> parent of 23f592b... Added Functionality to Delete Button.

HVACApplication.prototype.layoutCanvasMouseMoved = function(event) {
    "use strict";
    var mouseX = event.clientX - this.layoutCanvas.offsetLeft;
    var mouseY = event.clientY - this.layoutCanvas.offsetTop;
<<<<<<< HEAD
    this.previousMouseX = this.currentMouseX;
    this.currentMouseX = mouseX;
    this.previousMouseY = this.currentMouseY;
    this.currentMouseY = mouseY;
=======
    var movedX = this.lastMouseX - mouseX;
    var movedY = this.lastMouseY - mouseY;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;


    var canvasMouseX = mouseX - this.dragPositionX;
    var canvasMouseY = mouseY - this.dragPositionY;
>>>>>>> parent of 23f592b... Added Functionality to Delete Button.

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
        if (this.currentEditMode == EDIT_MODE_WALL) {
            this.mouseMovedEditWallModeLayout();
        }
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
<<<<<<< HEAD
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            this.mouseReleasedEditPointModeLayout();
        }
        if (this.currentEditMode == EDIT_MODE_CORNER) {
            this.mouseReleasedEditCornerModeLayout();
        }
        if (this.currentEditMode == EDIT_MODE_WALL) {
            this.mouseReleasedEditWallModeLayout();
        }
    }
=======
}

HVACApplication.prototype.viewWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_VIEW;
    this.viewButtonDiv.className = "ViewButtonDiv selectedButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";
};
HVACApplication.prototype.dragButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DRAG;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv selectedButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";
};
HVACApplication.prototype.createWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv selectedButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";
};
HVACApplication.prototype.editWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_EDIT_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv selectedButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";
};
HVACApplication.prototype.deleteWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv selectedButtonDiv";
>>>>>>> parent of 23f592b... Added Functionality to Delete Button.
};


HVACApplication.prototype.onKeydown = function(event) {
    "use strict";
    //var key = event.which;
    if (!!event.shiftKey) {
        this.shiftPressed = true;
    }
};
HVACApplication.prototype.onKeyup = function(event) {
    "use strict";
    //var key = event.which;
    if (!!!event.shiftKey) {
        this.shiftPressed = false;
    }
};
