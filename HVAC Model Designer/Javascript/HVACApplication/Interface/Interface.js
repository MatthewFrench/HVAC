/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initUIVariables = function () {
    "use strict";
    this.myBannerDiv = null;
    this.titleSpan = null;
    this.layoutCanvas = null;
    this.dragButtonDiv = null;
    this.createButtonDiv = null;
    this.editButtonDiv = null;
    this.editPointButtonDiv = null;
    this.editCornerButtonDiv = null;
    this.locationDataDiv = null;
    this.dialogBoxDiv = null;
};

HVACApplication.prototype.createUI = function () {
    this.myBannerDiv = CreateElement({
        type: 'div', class: 'RibbonBanner', appendTo: document.body, elements: [
            this.dialogBoxButton = CreateElement({
                type: 'button', class: 'DialogBoxButton', text: 'New Design',
                onClick: CreateFunction(this, function () {
                    var newDialogBox = new DialogBox("Are you sure you want to start from scratch?", function () {
                    }, function () {});
                    newDialogBox.show();
                })
            }),
            this.locationDataButton = CreateElement({
                type: 'button', class: 'LocationDataButton', text: 'Input Location Data',
                onClick: CreateFunction(this, function () {
                    var newPopover = new LocationDataPopover();
                    newPopover.show();
                })
            }),
            this.TopAndBottomDataButton = CreateElement({
                type: 'button', class: 'TopAndBottomDataButton', text: 'Input Attic and Basement Data',
                onClick: CreateFunction(this, function () {
                    var newPopover = new TopAndBottomDataPopover();
                    newPopover.show();
                })
            })
        ]
    });
    this.titleSpan = CreateElement({type: 'span', class: 'TopTitle', text: 'HVAC Model Designer', appendTo: document.body});
    this.layoutCanvas = CreateElement({
        type: 'canvas', class: 'LayoutCanvas', appendTo: document.body,
        onMouseDown: CreateFunction(this, this.layoutCanvasMousePressed),
        onMouseUp: CreateFunction(this, this.layoutCanvasMouseReleased)
    });

    //Create view mode button
    this.viewButtonDiv = CreateElement({
        type: 'div', class: 'ViewButtonDiv', text: 'View', appendTo: document.body,
        onClick: CreateFunction(this, this.viewWallButtonClicked)
    });

    //Create drag mode button
    this.dragButtonDiv = CreateElement({
        type: 'div', class: 'DragButtonDiv', text: 'Drag', appendTo: document.body,
        onClick: CreateFunction(this, this.dragButtonClicked)
    });

    //Create create mode button
    this.createButtonDiv = CreateElement({
        type: 'div', class: 'CreateButtonDiv', text: 'Create', appendTo: document.body,
        onClick: CreateFunction(this, this.createWallButtonClicked)
    });

    this.editButtonDiv = CreateElement({
        type: 'div', class: 'EditButtonDiv', text: 'Edit', appendTo: document.body,
        onClick: CreateFunction(this, this.editButtonClicked)
    });

    //Create edit mode buttons
    this.editPointButtonDiv = CreateElement({
        type: 'div', class: 'EditPointButtonDiv', text: 'Point',
        onClick: CreateFunction(this, this.editPointButtonClicked)
    });
    this.editCornerButtonDiv = CreateElement({
        type: 'div', class: 'EditCornerButtonDiv', text: 'Corner & Wall',
        onClick: CreateFunction(this, this.editCornerButtonClicked)
    });

    //Create delete mode button
    this.deleteButtonDiv = CreateElement({
        type: 'div', class: 'DeleteButtonDiv', text: 'Delete', appendTo: document.body,
        onClick: CreateFunction(this, this.deleteWallButtonClicked)
    });

    document.body.onmousemove = CreateFunction(this, this.layoutCanvasMouseMoved);

    this.resizeCanvas();

    this.createWallButtonClicked();
    this.editPointButtonClicked();
};

//Highlights View button and deselects other buttons.
HVACApplication.prototype.viewWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_VIEW;
    this.viewButtonDiv.className = "ViewButtonDiv selectedButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
};

//Highlights Drag button and deselects other buttons.
HVACApplication.prototype.dragButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DRAG;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv selectedButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
};

//Highlights Create button and deselects other buttons.
HVACApplication.prototype.createWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv selectedButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
};

//Highlights Edit button and deselects other buttons.
HVACApplication.prototype.editButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_EDIT;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv selectedButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv";

    //Adds the sub-edit buttons
    document.body.appendChild(this.editPointButtonDiv);
    document.body.appendChild(this.editCornerButtonDiv);
};

//Highlights Point button underneath Edit button.
HVACApplication.prototype.editPointButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_POINT;
    this.editPointButtonDiv.className = "EditPointButtonDiv selectedButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";
};

//Highlights Corner button underneath Edit button.
HVACApplication.prototype.editCornerButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_CORNER;
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv selectedButtonDiv";
};

//Highlights Delete button and deselects other buttons.
HVACApplication.prototype.deleteWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.dragButtonDiv.className = "DragButtonDiv";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.editButtonDiv.className = "EditButtonDiv";
    this.deleteButtonDiv.className = "DeleteButtonDiv selectedButtonDiv";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
};