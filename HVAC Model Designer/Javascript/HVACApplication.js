/**
 * Created by Matt on 9/9/16.
 */

var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT_WALL = 1

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
    this.layoutCanvas.onmousemove = function(event){
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
        wall.draw(ctx);
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

    if (this.currentCreateWall == null) {
        this.currentCreateWall = new WallObject(mouseX, mouseY, mouseX, mouseY);
        this.wallList.push(this.currentCreateWall);
    }
}

HVACApplication.prototype.layoutCanvasMouseReleased = function(event) {
    "use strict";
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    if (this.currentCreateWall != null) {
        this.currentCreateWall.x2 = mouseX;
        this.currentCreateWall.y2 = mouseY;
        this.currentCreateWall = null;
    }
}

HVACApplication.prototype.layoutCanvasMouseMoved = function(event) {
    "use strict";
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    if (this.currentCreateWall != null) {
        this.currentCreateWall.x2 = mouseX;
        this.currentCreateWall.y2 = mouseY;
    }
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