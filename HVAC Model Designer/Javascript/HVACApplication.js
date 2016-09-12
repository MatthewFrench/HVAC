/**
 * Created by Matt on 9/9/16.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT_WALL = 1
var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;

//Constructor
var HVACApplication = function () {
    this.myBannerDiv = null;
    this.titleSpan = null;
    this.layoutCanvas = null;
    this.wallList = [];
    this.currentCreateWall = null;
    this.createWallButton = null;
    this.editWallButton = null;
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.selectedWall = null;
    this.selectedWallPoint = WALL_POINT_ONE;
    this.shiftPressed = false;

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

    this.createWallButton = document.createElement("button");
    this.createWallButton.className = "CreateWallButton";
    this.createWallButton.innerHTML = "Create Wall";
    var self = this;
    this.createWallButton.onclick = function(event) {
        "use strict";
        self.createWallButtonClicked();
    }
    this.myBannerDiv.append(this.createWallButton);

    this.editWallButton = document.createElement("button");
    this.editWallButton.className = "EditWallButton";
    this.editWallButton.innerHTML = "Edit Wall";
    this.editWallButton.onclick = function(event) {
        "use strict";
        self.editWallButtonClicked();
    }
    this.myBannerDiv.append(this.editWallButton);


    this.resizeCanvas();
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

    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall == null) {
            this.currentCreateWall = new WallObject(mouseX, mouseY, mouseX, mouseY);
            this.wallList.push(this.currentCreateWall);
            this.autoSnapWallPointOne(this.currentCreateWall);
        }
    }
    if (this.currentLayoutMode == LAYOUT_MODE_EDIT_WALL) {
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            if (pointInCircle(mouseX, mouseY, wall.x1, wall.y1, 25)) {
                this.selectedWallPoint = WALL_POINT_ONE;
                this.selectedWall = wall;
                break;
            }
            if (pointInCircle(mouseX, mouseY, wall.x2, wall.y2, 25)) {
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
    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall != null) {
            this.currentCreateWall.x2 = mouseX;
            this.currentCreateWall.y2 = mouseY;

            this.snapToDecimalFromPoint1(this.currentCreateWall);

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
    if(event.which == 3) return;
    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
        if (this.currentCreateWall != null) {
            this.currentCreateWall.x2 = mouseX;
            this.currentCreateWall.y2 = mouseY;

            this.snapToDecimalFromPoint1(this.currentCreateWall);

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
                this.selectedWall.x1 = mouseX;
                this.selectedWall.y1 = mouseY;


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
                this.selectedWall.x2 = mouseX;
                this.selectedWall.y2 = mouseY;


                //Auto snap
                this.autoSnapWallPointTwo(this.selectedWall);

                if (this.shiftPressed) {
                    var line = getLinePoint2SnappedToNearestIncrement(this.selectedWall.x1, this.selectedWall.y1,
                        this.selectedWall.x2, this.selectedWall.y2, 45);
                    this.selectedWall.x2 = line.x2;
                    this.selectedWall.y2 = line.y2;
                }

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
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            if (wall == snapWall) continue;
            var snapPoint = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, snapWall.x1, snapWall.y1);
            if (Math.hypot(snapPoint.x - snapWall.x1, snapPoint.y - snapWall.y1) < 15) {
                snapWall.x1 = snapPoint.x;
                snapWall.y1 = snapPoint.y;
            }
        }
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
        for (var i = 0; i < this.wallList.length; i++) {
            var wall = this.wallList[i];
            if (wall == snapWall) continue;
            var snapPoint = nearestPointOnLine(wall.x1, wall.y1, wall.x2, wall.y2, snapWall.x2, snapWall.y2);
            if (Math.hypot(snapPoint.x - snapWall.x2, snapPoint.y - snapWall.y2) < 15) {
                snapWall.x2 = snapPoint.x;
                snapWall.y2 = snapPoint.y;
            }
        }
    }
};
HVACApplication.prototype.snapToDecimalFromPoint1 = function(snapWall) {
    "use strict";

    var lengthInFeet = Math.hypot(snapWall.x1 - snapWall.x2, snapWall.y1 - snapWall.y2) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = (lengthInFeet - feet) * 12;

    inches = Math.round(inches * 10) / 10.0;

    var lineLength = (feet + inches / 12.0) * PIXELS_IN_FOOT;
    var nearestAngle = getAngleOfLineBetweenPoints(snapWall.x1, snapWall.y1, snapWall.x2, snapWall.y2);

    var newX = snapWall.x1 + lineLength * Math.cos(nearestAngle);
    var newY = snapWall.y1 + lineLength * Math.sin(nearestAngle);

    snapWall.x2 = newX;
    snapWall.y2 = newY;
}

HVACApplication.prototype.createWallButtonClicked = function() {
    "use strict";
    console.log("createWallButtonClicked");
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
}
HVACApplication.prototype.editWallButtonClicked = function() {
    "use strict";
    console.log("editWallButtonClicked");
    this.currentLayoutMode = LAYOUT_MODE_EDIT_WALL;
}
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