/**
 * Created by Matt on 9/9/16.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT_WALL = 1, LAYOUT_MODE_DRAG = 2;
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
    document.body.append(this.myBannerDiv);

    this.titleSpan = document.createElement("span");
    this.titleSpan.className = "TopTitle";
    this.titleSpan.innerText = "HVAC Model Designer";
    document.body.append(this.titleSpan);

    this.layoutCanvas = document.createElement("canvas");
    this.layoutCanvas.className = "LayoutCanvas";
    document.body.append(this.layoutCanvas);
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



    this.dragButtonDiv = document.createElement("div");
    this.dragButtonDiv.className = "DragButtonDiv";
    this.dragButtonDiv.innerText = "Drag";
    this.dragButtonDiv.onclick = function(event) {
        "use strict";
        self.dragButtonClicked();
    };
    document.body.append(this.dragButtonDiv);

    this.createButtonDiv = document.createElement("div");
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.innerText = "Create";
    this.createButtonDiv.onclick = function(event) {
        "use strict";
        self.createWallButtonClicked();
    };
    document.body.append(this.createButtonDiv);

    this.editButtonDiv = document.createElement("div");
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.innerText = "Edit";
    this.editButtonDiv.onclick = function(event) {
        "use strict";
        self.editWallButtonClicked();
    }
    document.body.append(this.editButtonDiv);

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

    if (this.currentCreateWall != null || this.selectedWall != null) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            wall.drawPerpendicular(ctx);
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
            this.autoSnapWallPointOne(this.currentCreateWall);
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

            this.autoSnapWallPointTwo(this.currentCreateWall);

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

            this.autoSnapWallPointTwo(this.currentCreateWall);

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
                this.autoSnapWallPointOne(this.selectedWall);

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
                this.autoSnapWallPointTwo(this.selectedWall);

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

//Auto snap
HVACApplication.prototype.autoSnapWallPointOne = function(snapWall) {
    var snappedToEnd = false;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (wall == snapWall) continue;
        if (Math.hypot(snapWall.x1 - wall.x1, snapWall.y1 - wall.y1) < 15) {
            snapWall.x1 = wall.x1;
            snapWall.y1 = wall.y1;
            snappedToEnd = true;
        }
        if (Math.hypot(snapWall.x1 - wall.x2, snapWall.y1 - wall.y2) < 15) {
            snapWall.x1 = wall.x2;
            snapWall.y1 = wall.y2;
            snappedToEnd = true;
        }
    }
    if (!snappedToEnd) {
        var closest = 15;
        var snapWallX = snapWall.x1;
        var snapWallY = snapWall.y1;
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            if (wall == snapWall) continue;
            var snapPoint = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, snapWall.x1, snapWall.y1);
            if (Math.hypot(snapPoint.x - snapWall.x1, snapPoint.y - snapWall.y1) < closest) {
                closest = Math.hypot(snapPoint.x - snapWall.x1, snapPoint.y - snapWall.y1);
                snapWallX = snapPoint.x;
                snapWallY = snapPoint.y;
            } else {
                //Try snapping on perpendicular

                //Need to make it snap to intersections of the guidelines a little better

                var pLine = getPerpendicularInfiniteLinePoint1(wall.x1, wall.y1, wall.x2, wall.y2);
                var pLine2 = getPerpendicularInfiniteLinePoint2(wall.x1, wall.y1, wall.x2, wall.y2);
                var pLine3 = getLongerLine(wall.x1, wall.y1, wall.x2, wall.y2);
                var snapPoint1 = nearestPointOnLine(pLine.x1, pLine.y1, pLine.x2, pLine.y2, snapWall.x1, snapWall.y1);
                var snapPoint2 = nearestPointOnLine(pLine2.x1, pLine2.y1, pLine2.x2, pLine2.y2, snapWall.x1, snapWall.y1);
                var snapPoint3 = nearestPointOnLine(pLine3.x1, pLine3.y1, pLine3.x2, pLine3.y2, snapWall.x1, snapWall.y1);
                if (Math.hypot(snapPoint1.x - snapWall.x1, snapPoint1.y - snapWall.y1) < closest) {
                    snapWallX = snapPoint1.x;
                    snapWallY = snapPoint1.y;
                    closest = Math.hypot(snapPoint1.x - snapWall.x1, snapPoint1.y - snapWall.y1);
                } else if (Math.hypot(snapPoint2.x - snapWall.x1, snapPoint2.y - snapWall.y1) < closest) {
                    snapWallX = snapPoint2.x;
                    snapWallY = snapPoint2.y;
                    closest = Math.hypot(snapPoint2.x - snapWall.x1, snapPoint2.y - snapWall.y1);
                } else if (Math.hypot(snapPoint3.x - snapWall.x1, snapPoint3.y - snapWall.y1) < closest) {
                    snapWallX = snapPoint3.x;
                    snapWallY = snapPoint3.y;
                    closest = Math.hypot(snapPoint3.x - snapWall.x1, snapPoint3.y - snapWall.y1);
                }
            }
        }
        snapWall.x1 = snapWallX;
        snapWall.y1 = snapWallY;
    }
};
HVACApplication.prototype.autoSnapWallPointTwo = function(snapWall) {
    var snappedToEnd = false;
    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        if (wall == snapWall) continue;
        if (Math.hypot(snapWall.x2 - wall.x1, snapWall.y2 - wall.y1) < 15) {
            snapWall.x2 = wall.x1;
            snapWall.y2 = wall.y1;
            snappedToEnd = true;
        }
        if (Math.hypot(snapWall.x2 - wall.x2, snapWall.y2 - wall.y2) < 15) {
            snapWall.x2 = wall.x2;
            snapWall.y2 = wall.y2;
            snappedToEnd = true;
        }
    }

    if (!snappedToEnd) {
        var closest = 15;
        var snapWallX = snapWall.x2;
        var snapWallY = snapWall.y2;
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            if (wall == snapWall) continue;
            var snapPoint = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, snapWall.x2, snapWall.y2);
            if (Math.hypot(snapPoint.x - snapWall.x2, snapPoint.y - snapWall.y2) < closest) {
                snapWallX = snapPoint.x;
                snapWallY = snapPoint.y;
                closest = Math.hypot(snapPoint.x - snapWall.x2, snapPoint.y - snapWall.y2);
            } else {
                //Try snapping on perpendicular
                var pLine = getPerpendicularInfiniteLinePoint1(wall.x1, wall.y1, wall.x2, wall.y2);
                var pLine2 = getPerpendicularInfiniteLinePoint2(wall.x1, wall.y1, wall.x2, wall.y2);
                var pLine3 = getLongerLine(wall.x1, wall.y1, wall.x2, wall.y2);
                var snapPoint1 = nearestPointOnLine(pLine.x1, pLine.y1, pLine.x2, pLine.y2, snapWall.x2, snapWall.y2);
                var snapPoint2 = nearestPointOnLine(pLine2.x1, pLine2.y1, pLine2.x2, pLine2.y2, snapWall.x2, snapWall.y2);
                var snapPoint3 = nearestPointOnLine(pLine3.x1, pLine3.y1, pLine3.x2, pLine3.y2, snapWall.x2, snapWall.y2);
                if (Math.hypot(snapPoint1.x - snapWall.x2, snapPoint1.y - snapWall.y2) < closest) {
                    snapWallX = snapPoint1.x;
                    snapWallY = snapPoint1.y;
                    closest = Math.hypot(snapPoint1.x - snapWall.x2, snapPoint1.y - snapWall.y2);
                } else if (Math.hypot(snapPoint2.x - snapWall.x2, snapPoint2.y - snapWall.y2) < closest) {
                    snapWallX = snapPoint2.x;
                    snapWallY = snapPoint2.y;
                    closest = Math.hypot(snapPoint2.x - snapWall.x2, snapPoint2.y - snapWall.y2);
                } else if (Math.hypot(snapPoint3.x - snapWall.x2, snapPoint3.y - snapWall.y2) < closest) {
                    snapWallX = snapPoint3.x;
                    snapWallY = snapPoint3.y;
                    closest = Math.hypot(snapPoint3.x - snapWall.x2, snapPoint3.y - snapWall.y2);
                }
            }
        }
        snapWall.x2 = snapWallX;
        snapWall.y2 = snapWallY;
    }
};

HVACApplication.prototype.dragButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DRAG;
    this.dragButtonDiv.className = "DragButtonDiv selectedButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
};
HVACApplication.prototype.createWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv selectedButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
};
HVACApplication.prototype.editWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_EDIT_WALL;
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv selectedButtonDiv";
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