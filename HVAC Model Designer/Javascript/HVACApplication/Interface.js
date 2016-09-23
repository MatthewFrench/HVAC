/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initUIVariables = function() {
    "use strict";
    this.myBannerDiv = null;
    this.titleSpan = null;
    this.layoutCanvas = null;
    this.dragButtonDiv = null;
    this.createButtonDiv = null;
    this.editButtonDiv = null;
    this.editPointButtonDiv = null;
    this.editCornerButtonDiv = null;
    this.editWallButtonDiv = null;
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
    this.editPointButtonClicked();
};

HVACApplication.prototype.viewWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_VIEW;
    this.viewButtonDiv.className = "ViewButtonDiv selectedButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.editWallButtonDiv.remove();
};

HVACApplication.prototype.dragButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DRAG;
    this.dragButtonDiv.className = "DragButtonDiv selectedButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.editWallButtonDiv.remove();
};
HVACApplication.prototype.createWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv selectedButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.editWallButtonDiv.remove();
};
HVACApplication.prototype.editButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_EDIT;
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv selectedButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

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
HVACApplication.prototype.deleteWallButtonClicked = function() {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv selectedButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.editWallButtonDiv.remove();
};