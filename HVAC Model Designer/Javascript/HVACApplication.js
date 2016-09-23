/**
 * Created by Matt on 9/9/16.
 */

<<<<<<< HEAD
var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT_WALL = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
    LAYOUT_MODE_DELETE_WALL = 4;
=======
var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT = 1, LAYOUT_MODE_DRAG = 2;
>>>>>>> master
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;
var EDIT_MODE_POINT = 0, EDIT_MODE_CORNER = 1, EDIT_MODE_WALL = 2;

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
<<<<<<< HEAD
    this.highlightedWall = null;
=======
    this.currentEditMode = EDIT_MODE_POINT;
    this.editPointButtonDiv = null;
    this.editCornerButtonDiv = null;
    this.editWallButtonDiv = null;
>>>>>>> master

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
        self.editButtonClicked();
    }
    document.body.appendChild(this.editButtonDiv);

<<<<<<< HEAD
    this.deleteButtonDiv = document.createElement("div");
    this.deleteButtonDiv.className = "DeleteButtonDiv";
    this.deleteButtonDiv.innerText = "Delete";
    this.deleteButtonDiv.onclick = function(event) {
        "use strict";
        self.deleteWallButtonClicked();
    }
    document.body.appendChild(this.deleteButtonDiv);
=======
    //Create edit mode buttons
    this.editPointButtonDiv = document.createElement("div");
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editPointButtonDiv.innerText = "Point";
    this.editPointButtonDiv.onclick = function(event) {
        "use strict";
        self.editPointButtonClicked();
    }
    this.editCornerButtonDiv = document.createElement("div");
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";
    this.editCornerButtonDiv.innerText = "Corner";
    this.editCornerButtonDiv.onclick = function(event) {
        "use strict";
        self.editCornerButtonClicked();
    }
    this.editWallButtonDiv = document.createElement("div");
    this.editWallButtonDiv.className = "EditWallButtonDiv";
    this.editWallButtonDiv.innerText = "Wall";
    this.editWallButtonDiv.onclick = function(event) {
        "use strict";
        self.editWallButtonClicked();
    }

>>>>>>> master

    this.resizeCanvas();

    this.createWallButtonClicked();
    this.editPointButtonClicked();
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
        if (this.selectedWallPoint == WALL_POINT_ONE) {
            closePointArray.push(new Point2D(this.currentCreateWall.x1, this.currentCreateWall.y1));
        }
        if (this.selectedWallPoint == WALL_POINT_TWO) {
            closePointArray.push(new Point2D(this.currentCreateWall.x2, this.currentCreateWall.y2));
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            if (this.selectedWall != null) {
                if (this.selectedWallPoint == WALL_POINT_ONE) {
                    closePointArray.push(new Point2D(this.selectedWall.x1, this.selectedWall.y1));
                }
                if (this.selectedWallPoint == WALL_POINT_TWO) {
                    closePointArray.push(new Point2D(this.selectedWall.x2, this.selectedWall.y2));
                }
            }
        }
    }

    if (this.currentCreateWall != null || this.selectedWall != null) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            wall.drawPerpendicular(ctx, closePointArray);
        }
    }

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT);
    }

    if (this.currentCreateWall != null) {
        this.currentCreateWall.drawLength(ctx);
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            if (this.selectedWall != null) {
                this.selectedWall.drawLength(ctx);
            }
        }
    }

    if (this.highlightedWall != null) {
        this.highlightedWall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL);
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
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            var closest = 25;
            for (var i = 0; i < this.wallList.length; i++) {
                var wall = this.wallList[i];
                if (pointInCircle(canvasMouseX, canvasMouseY, wall.x1, wall.y1, closest)) {
                    closest = Math.hypot(canvasMouseX - wall.x1, canvasMouseY - wall.y1);
                    this.selectedWallPoint = WALL_POINT_ONE;
                    this.selectedWall = wall;
                }
                if (pointInCircle(canvasMouseX, canvasMouseY, wall.x2, wall.y2, closest)) {
                    closest = Math.hypot(canvasMouseX - wall.x2, canvasMouseY - wall.y2);
                    this.selectedWallPoint = WALL_POINT_TWO;
                    this.selectedWall = wall;
                }
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
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {
            this.selectedWall = null;
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
        if (this.highlightedWall != null) {
            this.wallList.splice(this.wallList.indexOf(this.highlightedWall), 1);
            this.highlightedWall = null;
        }
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
    this.highlightedWall = null;

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
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
        if (this.currentEditMode == EDIT_MODE_POINT) {

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
    if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            var point = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, this.lastMouseX, this.lastMouseY);
            var dist = Math.hypot(point.x - this.lastMouseX, point.y - this.lastMouseY);
            if (dist < 15) {
                this.highlightedWall = wall;
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
<<<<<<< HEAD
    this.deleteButtonDiv.className = "DeleteButtonDiv";
=======

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.editWallButtonDiv.remove();
>>>>>>> master
};
HVACApplication.prototype.createWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv selectedButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
<<<<<<< HEAD
    this.deleteButtonDiv.className = "DeleteButtonDiv";
=======

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.editWallButtonDiv.remove();
>>>>>>> master
};
HVACApplication.prototype.editButtonClicked = function() {
    "use strict";
<<<<<<< HEAD
    this.currentLayoutMode = LAYOUT_MODE_EDIT_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv selectedButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";
};
HVACApplication.prototype.deleteWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv selectedButtonDiv";
};
=======
    this.currentLayoutMode = LAYOUT_MODE_EDIT;
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv selectedButtonDiv";

    document.body.appendChild(this.editPointButtonDiv);
    document.body.appendChild(this.editCornerButtonDiv);
    document.body.appendChild(this.editWallButtonDiv);
};

HVACApplication.prototype.editPointButtonClicked = function() {
    "use strict";
    this.currentEditMode = EDIT_MODE_POINT;
    this.editPointButtonDiv.className = "EditPointButtonDiv selectedButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";
    this.editWallButtonDiv.className = "EditWallButtonDiv";
};

HVACApplication.prototype.editCornerButtonClicked = function() {
    "use strict";
    this.currentEditMode = EDIT_MODE_CORNER;
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv selectedButtonDiv";
    this.editWallButtonDiv.className = "EditWallButtonDiv";
};

HVACApplication.prototype.editWallButtonClicked = function() {
    "use strict";
    this.currentEditMode = EDIT_MODE_WALL;
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";
    this.editWallButtonDiv.className = "EditWallButtonDiv selectedButtonDiv";
};
>>>>>>> master

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