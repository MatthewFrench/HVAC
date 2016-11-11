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

    this.floorPicker = null;
};

HVACApplication.prototype.createUI = function () {
    this.myBannerDiv = CreateElement({
        type: 'div', class: 'RibbonBanner', appendTo: document.body, elements: [
            this.StartOverButton = CreateElement({
                type: 'button', class: 'StartOverButton', text: 'Start Over',
                onClick: CreateFunction(this, function () {
                    var newPopover = new StartOverPopover('Are you sure you want to start from scratch?',
                        CreateFunction(this, function () {
                            this.getCurrentFloorPlan().clearWalls();
                        }), CreateFunction(this, function () {
                        }));
                    newPopover.show();
                })
            }),
            this.LocationDataButton = CreateElement({
                type: 'button', class: 'LocationDataButton', text: 'Input Location Data',
                onClick: CreateFunction(this, function () {
                    var newPopover = new LocationPopover();
                    newPopover.show();
                })
            }),
            this.AJsButton = CreateElement({
                type: 'button', class: 'AJsButton', text: 'AJsButton',
                onClick: CreateFunction(this, function () {
                    var newPopover = new DoorPopover();
                    newPopover.show();
                })
            }),
            this.RestoreButton = CreateElement({
                type: 'button', class: 'RestoreButton', text: 'Restore Design',
                onClick: CreateFunction(this, function () {
                    this.viewAngle = 0;
                })
            }),
            //Create view mode button
            this.viewButtonDiv = CreateElement({
                type: 'button', class: 'ViewButtonDiv', text: 'View',
                onClick: CreateFunction(this, this.viewWallButtonClicked)
            }),
            //Create drag mode button
            this.dragButtonDiv = CreateElement({
                type: 'button', class: 'DragButtonDiv', text: 'Drag',
                onClick: CreateFunction(this, this.dragButtonClicked)
            }),
            //Create create mode button
            this.createButtonDiv = CreateElement({
                type: 'button', class: 'CreateButtonDiv', text: 'Create',
                onClick: CreateFunction(this, this.createWallButtonClicked)
            }),
            this.editButtonDiv = CreateElement({
                type: 'button', class: 'EditButtonDiv', text: 'Edit',
                onClick: CreateFunction(this, this.editButtonClicked)
            }),
            //Create edit mode buttons
            this.editPointButtonDiv = CreateElement({
                type: 'button', class: 'EditPointButtonDiv', text: 'Point',
                onClick: CreateFunction(this, this.editPointButtonClicked)
            }),
            this.editCornerButtonDiv = CreateElement({
                type: 'button', class: 'EditCornerButtonDiv', text: 'Corner & Wall',
                onClick: CreateFunction(this, this.editCornerButtonClicked)
            }),
            //Create delete mode button
            this.deleteButtonDiv = CreateElement({
                type: 'button', class: 'DeleteButtonDiv', text: 'Delete',
                onClick: CreateFunction(this, this.deleteWallButtonClicked)
            })
        ]
    });
    this.titleSpan = CreateElement({
        type: 'span',
        class: 'TopTitle',
        text: 'HVAC Model Designer',
        appendTo: document.body
    });
    this.layoutCanvas = CreateElement({
        type: 'canvas', class: 'LayoutCanvas', appendTo: document.body,
        onMouseDown: CreateFunction(this, this.layoutCanvasMousePressed),
        onMouseUp: CreateFunction(this, this.layoutCanvasMouseReleased)
    });

    this.viewMode2DButtonDiv = CreateElement({
        type: 'button', class: 'ViewMode2DButtonDiv selectedButtonDiv', text: '2D',
        onClick: CreateFunction(this, this.viewWall2DButtonClicked)
    });
    this.viewMode3DButtonDiv = CreateElement({
        type: 'button', class: 'ViewMode3DButtonDiv', text: '3D',
        onClick: CreateFunction(this, this.viewWall3DButtonClicked)
    });

    this.floorPicker = new FloorPicker(this);
    document.body.appendChild(this.floorPicker.getDiv());

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

    this.myBannerDiv.appendChild(this.viewMode2DButtonDiv);
    this.myBannerDiv.appendChild(this.viewMode3DButtonDiv);

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();

    this.showViewModeLayout();
};
HVACApplication.prototype.viewWall2DButtonClicked = function() {
    this.viewMode2DButtonDiv.className = 'ViewMode2DButtonDiv selectedButtonDiv';
    this.viewMode3DButtonDiv.className = 'ViewMode3DButtonDiv';

    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.layoutViewMode3DRenderer.domElement.remove();

    this.layoutCanvas.style.display = "block";
};
HVACApplication.prototype.viewWall3DButtonClicked = function() {
    this.viewMode2DButtonDiv.className = 'ViewMode2DButtonDiv';
    this.viewMode3DButtonDiv.className = 'ViewMode3DButtonDiv selectedButtonDiv';

    this.setLayoutViewModeTo3D();
    this.layoutCanvas.style.display = "none";
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
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();

    this.showDragModeLayout();
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
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();

    this.showCreateModeLayout();
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
    this.myBannerDiv.appendChild(this.editPointButtonDiv);
    this.myBannerDiv.appendChild(this.editCornerButtonDiv);
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();

    if (this.currentEditMode == EDIT_MODE_CORNER) {
        this.showEditCornerModeLayout();
    } else if (this.currentEditMode == EDIT_MODE_POINT) {
        this.showEditPointModeLayout();
    }
};

//Highlights Point button underneath Edit button.
HVACApplication.prototype.editPointButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_POINT;
    this.editPointButtonDiv.className = "EditPointButtonDiv selectedButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";

    this.showEditPointModeLayout();
};

//Highlights Corner button underneath Edit button.
HVACApplication.prototype.editCornerButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_CORNER;
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv selectedButtonDiv";

    this.showEditCornerModeLayout();
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
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();

    this.showDeleteModeLayout();
};