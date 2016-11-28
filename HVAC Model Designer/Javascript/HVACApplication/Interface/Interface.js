/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initUIVariables = function () {
    "use strict";
    this.myBannerDiv = null;
    this.mySecondBannerDiv = null;
    this.titleSpan = null;
    this.layoutCanvas = null;
    this.dragButtonDiv = null;
    this.createButtonDiv = null;
    this.editButtonDiv = null;
    this.editPointButtonDiv = null;
    this.editCornerButtonDiv = null;
    this.viewMode2DButtonDiv = null;
    this.viewMode3DButtonDiv = null;
    this.locationDataDiv = null;
    this.RestoreButton = null;
    this.StartOverButton = null;

    this.floorPicker = null;
};

HVACApplication.prototype.createUI = function () {
    this.myBannerDiv = CreateElement({
        type: 'div', class: 'RibbonBanner', appendTo: document.body, elements: [
            this.LocationDataButton = CreateElement({
                type: 'button', class: 'LocationDataButton', text: 'Data',
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
            //Create view mode button
            this.viewButtonDiv = CreateElement({
                type: 'button', class: 'ViewButtonDiv', text: 'View',
                onClick: CreateFunction(this, this.viewWallButtonClicked)
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
            this.deleteMenuDiv = CreateElement({
                type: 'button', class: 'deleteMenuDiv', text: 'Delete',
                onClick: CreateFunction(this, this.deleteMenuClicked)
            }),
            this.mySecondBannerDiv = CreateElement({
                type: 'div', class: 'SecondRibbonBanner', elements: [
                    //Create drag mode button
                    this.dragButtonDiv = CreateElement({
                        type: 'text', class: 'DragButtonDiv', text: 'Drag',
                        onClick: CreateFunction(this, this.dragButtonClicked)
                    }),
                    this.viewMode2DButtonDiv = CreateElement({
                        type: 'text', class: 'ViewMode2DButtonDiv', text: '2D',
                        onClick: CreateFunction(this, this.viewWall2DButtonClicked)
                    }),
                    this.viewMode3DButtonDiv = CreateElement({
                        type: 'text', class: 'ViewMode3DButtonDiv', text: '3D',
                        onClick: CreateFunction(this, this.viewWall3DButtonClicked)
                    }),
                    this.RestoreButton = CreateElement({
                        type: 'text', class: 'RestoreButton', text: 'Restore',
                        onClick: CreateFunction(this, function () {
                            this.viewAngle = 0;
                            this.viewScale = 1.0;
                        })
                    }),
                    //Create edit mode buttons
                    this.editPointButtonDiv = CreateElement({
                        type: 'text', class: 'EditPointButtonDiv', text: 'Point',
                        onClick: CreateFunction(this, this.editPointButtonClicked)
                    }),
                    this.editCornerButtonDiv = CreateElement({
                        type: 'text', class: 'EditCornerButtonDiv', text: 'Corner',
                        onClick: CreateFunction(this, this.editCornerButtonClicked)
                    }),
                    this.StartOverButton = CreateElement({
                        type: 'text', class: 'StartOverButton', text: 'Floor',
                        onClick: CreateFunction(this, function () {
                            var newPopover = new StartOverPopover('Are you sure you want to start this floor from scratch?',
                                CreateFunction(this, function () {
                                    this.getCurrentFloorPlan().clearWalls();
                                }), CreateFunction(this, function () {
                                }));
                            newPopover.show();
                        })
                    }),
                    //Create delete mode button
                    this.deleteButtonDiv = CreateElement({
                        type: 'text', class: 'DeleteButtonDiv', text: 'Wall',
                        onClick: CreateFunction(this, this.deleteWallButtonClicked)
                    })
                    ]
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

    this.floorPicker = new FloorPicker(this);
    document.body.appendChild(this.floorPicker.getDiv());

    document.body.onmousemove = CreateFunction(this, this.layoutCanvasMouseMoved);

    this.resizeCanvas();

    this.editPointButtonClicked();
};

//Highlights View button and deselects other buttons.
HVACApplication.prototype.viewWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_VIEW;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.viewButtonDiv.style.backgroundColor = "#9c8cf2";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.style.backgroundColor = "#c9d7e0";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.style.backgroundColor = "#c9d7e0";
    this.deleteMenuDiv.className = "deleteMenuDiv";
    this.deleteMenuDiv.style.backgroundColor = "#c9d7e0";

    this.myBannerDiv.appendChild(this.viewMode2DButtonDiv);
    this.viewMode2DButtonDiv.style.opacity = "1.0";
    this.myBannerDiv.appendChild(this.viewMode3DButtonDiv);
    this.viewMode3DButtonDiv.style.opacity = "1.0";
    this.myBannerDiv.appendChild(this.dragButtonDiv);
    this.dragButtonDiv.style.opacity = "1.0";
    this.myBannerDiv.appendChild(this.RestoreButton);
    this.RestoreButton.style.opacity = "1.0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();

    this.showViewModeLayout();
};
//Highlights Drag button and deselects other buttons.
HVACApplication.prototype.dragButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DRAG;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.style.backgroundColor = "#c9d7e0";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.style.backgroundColor = "#c9d7e0";
    this.deleteMenuDiv.className = "deleteMenuDiv";
    this.deleteMenuDiv.style.backgroundColor = "#c9d7e0";

    this.showDragModeLayout();
};
HVACApplication.prototype.viewWall2DButtonClicked = function() {
    this.viewMode2DButtonDiv.className = 'ViewMode2DButtonDiv';
    this.viewMode3DButtonDiv.className = 'ViewMode3DButtonDiv';

    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();

    this.layoutCanvas.style.display = "block";
};
HVACApplication.prototype.viewWall3DButtonClicked = function() {
    this.viewMode2DButtonDiv.className = 'ViewMode2DButtonDiv';
    this.viewMode3DButtonDiv.className = 'ViewMode3DButtonDiv';

    this.currentViewModeLayout = ViewModeType.Mode3D;
    this.viewMode3DController.show();
    this.layoutCanvas.style.display = "none";
};

//Highlights Create button and deselects other buttons.
HVACApplication.prototype.createWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.style.backgroundColor = "#9c8cf2";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.style.backgroundColor = "#c9d7e0";
    this.deleteMenuDiv.className = "deleteMenuDiv";
    this.deleteMenuDiv.style.backgroundColor = "#c9d7e0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();

    this.showCreateModeLayout();
};

//Highlights Edit button and deselects other buttons.
HVACApplication.prototype.editButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_EDIT;
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.style.backgroundColor = "#c9d7e0";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.style.backgroundColor = "#9c8cf2";
    this.deleteMenuDiv.className = "deleteMenuDiv";
    this.deleteMenuDiv.style.backgroundColor = "#c9d7e0";

    //Adds the sub-edit buttons
    this.myBannerDiv.appendChild(this.editPointButtonDiv);
    this.editPointButtonDiv.style.opacity = "1.0";
    this.myBannerDiv.appendChild(this.editCornerButtonDiv);
    this.editCornerButtonDiv.style.opacity = "1.0";

    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();

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
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editPointButtonDiv.style.backgroundColor = "#9c8cf2";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";

    this.showEditPointModeLayout();
};

//Highlights Corner button underneath Edit button.
HVACApplication.prototype.editCornerButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_CORNER;
    this.editPointButtonDiv.className = "EditPointButtonDiv";
    this.editCornerButtonDiv.className = "EditCornerButtonDiv";
    this.editCornerButtonDiv.style.backgroundColor = "#9c8cf2";

    this.showEditCornerModeLayout();
};
HVACApplication.prototype.deleteMenuClicked = function () {
    "use strict";
    this.viewButtonDiv.className = "ViewButtonDiv";
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.className = "CreateButtonDiv";
    this.createButtonDiv.style.backgroundColor = "#c9d7e0";
    this.editButtonDiv.className = "EditButtonDiv";
    this.editButtonDiv.style.backgroundColor = "#c9d7e0";
    this.deleteMenuDiv.className = "deleteMenuDiv";
    this.deleteMenuDiv.style.backgroundColor = "#9c8cf2";

    this.myBannerDiv.appendChild(this.StartOverButton);
    this.StartOverButton.style.opacity = "1.0";
    this.myBannerDiv.appendChild(this.deleteButtonDiv);
    this.deleteButtonDiv.style.opacity = "1.0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();

    this.showDeleteModeLayout();
};
//Highlights Delete button and deselects other buttons.
HVACApplication.prototype.deleteWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE_WALL;

    this.showDeleteModeLayout();
};