/**
 * Created by Matt on 9/9/16.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT_WALL = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
    LAYOUT_MODE_DELETE = 4;
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;

//Constructor
var HVACApplication = function () {
    this.myBannerDiv = null;
    this.titleSpan = null;
    this.layoutCanvas = null;
    this.wallList = [];
    this.currentCreateWall = null;
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.selectedWall = null;
    this.selectedWallPoint = WALL_POINT_ONE;
    this.shiftPressed = false;
    this.dragButtonDiv = null;
    this.createButtonDiv = null;
    this.editButtonDiv = null;
    this.dragPositionX = 0.0;
    this.dragPositionY = 0.0;
    this.lastMouseX = 0.0;
    this.lastMouseY = 0.0;
    this.mouseDown = false;

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

    this.resizeCanvas();

    this.createWallButtonClicked();
};

HVACApplication.prototype.logic = function() {
    "use strict";

    this.layoutDraw();
}
HVACApplication.prototype.layoutDraw = function() {
    "use strict";

    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    var closePointArray = [];
    closePointArray.push(new Point2D(this.lastMouseX, this.lastMouseY));
    if (this.currentCreateWall != null) {
        closePointArray.push(new Point2D(this.currentCreateWall.x1, this.currentCreateWall.y1));
        closePointArray.push(new Point2D(this.currentCreateWall.x2, this.currentCreateWall.y2));
    }
    if (this.selectedWall != null) {
        closePointArray.push(new Point2D(this.selectedWall.x1, this.selectedWall.y1));
        closePointArray.push(new Point2D(this.selectedWall.x2, this.selectedWall.y2));
    }

    if (this.currentCreateWall != null || this.selectedWall != null) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }
    }

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
HVACApplication.prototype.windowResized = function() {
    this.resizeCanvas();
}
HVACApplication.prototype.resizeCanvas = function() {
    "use strict";
    this.layoutCanvas.width = window.innerWidth;
    this.layoutCanvas.height = window.innerHeight - 150;
}

HVACApplication.prototype.layoutCanvasMousePressed = function(event) {
    "use strict";
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    if(event.which == 3) return;
    this.mouseDown = true;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;

    var canvasMouseX = mouseX - this.dragPositionX;
    var canvasMouseY = mouseY - this.dragPositionY;

    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall == null) {
            this.currentCreateWall = new WallObject(canvasMouseX, canvasMouseY, canvasMouseX, canvasMouseY);
            this.wallList.push(this.currentCreateWall);
            var point = snapPointToWalls(this.currentCreateWall.x1,
                this.currentCreateWall.y1, this.wallList, [this.currentCreateWall]);
            this.currentCreateWall.x1 = point.x;
            this.currentCreateWall.y1 = point.y;
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT_WALL) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, 25)) {
                this.selectedWallPoint = WALL_POINT_ONE;
                this.selectedWall = wall;
                break;
            }
            if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, 25)) {
                this.selectedWallPoint = WALL_POINT_TWO;
                this.selectedWall = wall;
                break;
            }
        }
    }
}

HVACApplication.prototype.layoutCanvasMouseReleased = function(event) {
    "use strict";
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    if(event.which == 3) return;
    this.mouseDown = false;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;

    var canvasMouseX = mouseX - this.dragPositionX;
    var canvasMouseY = mouseY - this.dragPositionY;

    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall != null) {
            this.currentCreateWall.x2 = canvasMouseX;
            this.currentCreateWall.y2 = canvasMouseY;

            snapWallToDecimalFromPoint1(this.currentCreateWall);

            var point = snapPointToWalls(this.currentCreateWall.x2,
                this.currentCreateWall.y2, this.wallList, [this.currentCreateWall]);
            this.currentCreateWall.x2 = point.x;
            this.currentCreateWall.y2 = point.y;

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestIncrement(this.currentCreateWall.x1, this.currentCreateWall.y1,
                    this.currentCreateWall.x2, this.currentCreateWall.y2, 45);
                this.currentCreateWall.x2 = line.x2;
                this.currentCreateWall.y2 = line.y2;
            }

            if (this.currentCreateWall.x1 == this.currentCreateWall.x2 &&
            this.currentCreateWall.y1 == this.currentCreateWall.y2) {
                this.wallList.splice(this.wallList.indexOf(this.currentCreateWall), 1);
            }

            this.currentCreateWall = null;
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT_WALL) {
        this.selectedWall = null;
    }
}

HVACApplication.prototype.layoutCanvasMouseMoved = function(event) {
    "use strict";
    var mouseX = event.clientX - this.layoutCanvas.offsetLeft;
    var mouseY = event.clientY - this.layoutCanvas.offsetTop;
    var movedX = this.lastMouseX - mouseX;
    var movedY = this.lastMouseY - mouseY;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;


    var canvasMouseX = mouseX - this.dragPositionX;
    var canvasMouseY = mouseY - this.dragPositionY;

    if(event.which == 3) return;
    if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
        if (this.mouseDown) {
            this.dragPositionX -= movedX;
            this.dragPositionY -= movedY;
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall != null) {
            this.currentCreateWall.x2 = canvasMouseX;
            this.currentCreateWall.y2 = canvasMouseY;

            snapWallToDecimalFromPoint1(this.currentCreateWall);

            var point = snapPointToWalls(this.currentCreateWall.x2,
                this.currentCreateWall.y2, this.wallList, [this.currentCreateWall]);
            this.currentCreateWall.x2 = point.x;
            this.currentCreateWall.y2 = point.y;

            if (this.shiftPressed) {
                var line = getLinePoint2SnappedToNearestIncrement(this.currentCreateWall.x1, this.currentCreateWall.y1,
                    this.currentCreateWall.x2, this.currentCreateWall.y2, 45);
                this.currentCreateWall.x2 = line.x2;
                this.currentCreateWall.y2 = line.y2;
            }
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT_WALL) {
        if (this.selectedWall != null) {
            if (this.selectedWallPoint == WALL_POINT_ONE) {
                this.selectedWall.x1 = canvasMouseX;
                this.selectedWall.y1 = canvasMouseY;

                snapWallToDecimalFromPoint2(this.selectedWall);

                //Auto snap
                var point = snapPointToWalls(this.selectedWall.x1,
                    this.selectedWall.y1, this.wallList, [this.selectedWall]);
                this.selectedWall.x1 = point.x;
                this.selectedWall.y1 = point.y;

                if (this.shiftPressed) {
                    var line = getLinePoint1SnappedToNearestIncrement(this.selectedWall.x1, this.selectedWall.y1,
                        this.selectedWall.x2, this.selectedWall.y2, 45);
                    this.selectedWall.x1 = line.x1;
                    this.selectedWall.y1 = line.y1;
                }

            }
            if (this.selectedWallPoint == WALL_POINT_TWO) {
                this.selectedWall.x2 = canvasMouseX;
                this.selectedWall.y2 = canvasMouseY;

                snapWallToDecimalFromPoint1(this.selectedWall);

                //Auto snap
                var point = snapPointToWalls(this.selectedWall.x2,
                    this.selectedWall.y2, this.wallList, [this.selectedWall]);
                this.selectedWall.x2 = point.x;
                this.selectedWall.y2 = point.y;

                if (this.shiftPressed) {
                    var line = getLinePoint2SnappedToNearestIncrement(this.selectedWall.x1, this.selectedWall.y1,
                        this.selectedWall.x2, this.selectedWall.y2, 45);
                    this.selectedWall.x2 = line.x2;
                    this.selectedWall.y2 = line.y2;
                }

            }
        } else {
            if (this.mouseDown) {
                this.dragPositionX -= movedX;
                this.dragPositionY -= movedY;
            }
        }
    }
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