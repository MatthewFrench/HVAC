/**
 * Created by Matt on 9/19/16.
 */

/*This function creates some of the variables and sets them to Null for use later*/
HVACApplication.prototype.initUIVariables = function () {
    "use strict";
    this.applicationDiv = null;
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
    this.showMouse = false;
    this.floorPicker = null;
};

/*This function creates the User Interface, including adding buttons/menu*/
HVACApplication.prototype.createUI = function () {
    this.applicationDiv = CreateElement({type: 'div', class: 'ApplicationDiv', elements: [
        CreateElement({type: 'div', class: 'ApplicationBackground1'}),
        CreateElement({type: 'div', class: 'ApplicationBackground2'})
    ]});

    this.myBannerDiv = CreateElement({
        type: 'div', class: 'RibbonBanner', appendTo: this.applicationDiv, elements: [
            //Create view mode button
            this.roomEditorButtonDiv = CreateElement({
                type: 'button', class: 'RoomEditorButtonDiv', text: 'Room Editor',
                onClick: CreateFunction(this, this.roomEditorButtonClicked)
            }),
            this.viewButtonDiv = CreateElement({
                type: 'button', class: 'ViewButtonDiv', text: 'View Editor',
                onClick: CreateFunction(this, this.viewWallButtonClicked)
            }),
            this.wallEditorButtonDiv = CreateElement({
                type: 'button', class: 'WallEditorButtonDiv', text: 'Wall Editor',
                onClick: CreateFunction(this, this.wallEditorButtonClicked)
            }),
            this.AJsButton = CreateElement({
                type: 'button', class: 'AJsButton', text: 'AJs Button',
                onClick: CreateFunction(this, function(){
                    var newPopover2 = new WallPopover();
                    newPopover2.show(this.applicationDiv);
                })
            }),
            this.mySecondBannerDiv = CreateElement({
                type: 'div', class: 'SecondRibbonBanner', elements: [
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

                            this.viewMode3DController.cameraCenterX = window.innerWidth / 2;
                            this.viewMode3DController.cameraCenterY = -window.innerHeight / 2 + 41;
                            this.viewMode3DController.cameraLookAtX = this.viewMode3DController.cameraCenterX;
                            this.viewMode3DController.cameraLookAtY = this.viewMode3DController.cameraCenterY;

                            this.viewMode3DController.layoutViewMode3DCamera.position.setX(this.viewMode3DController.cameraCenterX);
                            this.viewMode3DController.layoutViewMode3DCamera.position.setY(this.viewMode3DController.cameraCenterY);
                            this.viewMode3DController.layoutViewMode3DCamera.position.setZ(this.viewMode3DController.viewZ);
                            this.viewMode3DController.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.viewMode3DController.cameraLookAtX, this.viewMode3DController.cameraLookAtY, 0));
                            this.viewMode3DController.dragButtonClicked();
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
                            this.viewAngle = 0;
                            this.viewScale = 1.0;
                            this.StartOverButton.style.backgroundColor = "#A696FF";
                            this.deleteButtonDiv.style.backgroundColor = "#8070D6";
                            var newPopover = new StartOverPopover('Are you sure you want to start this floor from scratch?',
                                CreateFunction(this, function () {
                                    this.getCurrentFloorPlan().clearWalls();
                                }), CreateFunction(this, function () {
                                }));
                            newPopover.show(this.applicationDiv);
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
        appendTo: this.applicationDiv
    });
    this.layoutCanvas = CreateElement({
        type: 'canvas', class: 'LayoutCanvas', appendTo: this.applicationDiv,
        onMouseDown: CreateFunction(this, this.layoutCanvasMousePressed),
        onMouseUp: CreateFunction(this, this.layoutCanvasMouseReleased)
    });

    this.floorPicker = new FloorPicker(this);
    this.applicationDiv.appendChild(this.floorPicker.getDiv());

    this.applicationDiv.onmousemove = CreateFunction(this, this.layoutCanvasMouseMoved);

    this.resizeCanvas();
};

//Highlights WallEditor button and shows its sub-options in the menu.
HVACApplication.prototype.wallEditorButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.wallEditorButtonDiv.className = "WallEditorButtonDiv";
    this.wallEditorButtonDiv.style.backgroundColor = "#8070D6";
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.style.backgroundColor = "#A696FF";
    this.editButtonDiv.style.backgroundColor = "#8070D6";
    this.deleteMenuDiv.style.backgroundColor = "#8070D6";
    this.roomEditorButtonDiv.style.backgroundColor = "#c9d7e0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();
    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();

    this.showCreateModeLayout();

    if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL)
    {
        this.createButtonDiv.style.backgroundColor = "#A696FF";
    }

    this.mySecondBannerDiv.appendChild(this.createButtonDiv);
    this.createButtonDiv.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.editButtonDiv);
    this.editButtonDiv.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.deleteMenuDiv);
    this.deleteMenuDiv.style.opacity = "1.0";
}

//Highlights RoomEditor button and shows its sub-options in the menu.
HVACApplication.prototype.roomEditorButtonClicked = function () {
    "use strict";
    this.roomEditorButtonDiv.style.backgroundColor = "#8070D6";
    this.wallEditorButtonDiv.style.backgroundColor = "#c9d7e0";
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();
    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();
    this.deleteMenuDiv.remove();
    this.createButtonDiv.remove();
    this.editButtonDiv.remove();
}

//Highlights View button and deselects other buttons.
HVACApplication.prototype.viewWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_VIEW;
    this.viewButtonDiv.style.backgroundColor = "#8070D6";
    this.viewMode2DButtonDiv.style.backgroundColor = "#A696FF";
    this.viewMode3DButtonDiv.style.backgroundColor = "#8070D6";
    this.dragButtonDiv.style.backgroundColor = "#8070D6";
    this.wallEditorButtonDiv.style.backgroundColor = "#c9d7e0";
    this.roomEditorButtonDiv.style.backgroundColor = "#c9d7e0";

    this.mySecondBannerDiv.appendChild(this.viewMode2DButtonDiv);
    this.viewMode2DButtonDiv.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.viewMode3DButtonDiv);
    this.viewMode3DButtonDiv.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.dragButtonDiv);
    this.dragButtonDiv.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.RestoreButton);
    this.RestoreButton.style.opacity = "1.0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();
    this.deleteMenuDiv.remove();
    this.createButtonDiv.remove();
    this.editButtonDiv.remove();

    if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
        this.dragButtonDiv.style.backgroundColor = "#A696FF";
    } else if (this.currentLayoutMode == LAYOUT_MODE_VIEW && this.currentViewModeLayout == ViewModeType.Mode2D) {
        this.viewMode2DButtonDiv.style.backgroundColor = "#A696FF";
    } else if (this.currentLayoutMode == LAYOUT_MODE_VIEW && this.currentViewModeLayout == ViewModeType.Mode3D) {
        this.viewMode3DButtonDiv.style.backgroundColor = "#A696FF";
    }

    this.showViewModeLayout();
};

//Highlights Drag button and deselects other buttons.
HVACApplication.prototype.dragButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DRAG;
    this.dragButtonDiv.style.backgroundColor = "#A696FF";
    this.viewMode2DButtonDiv.style.backgroundColor = "#8070D6";
    this.viewMode3DButtonDiv.style.backgroundColor = "#8070D6";
    this.StartOverButton.style.backgroundColor = "#8070D6";

    this.showDragModeLayout();
};

/*This function shows that 2D mode has been selected*/
HVACApplication.prototype.viewWall2DButtonClicked = function() {
    this.currentLayoutMode = LAYOUT_MODE_VIEW;
    this.dragButtonDiv.style.backgroundColor = "#8070D6";
    this.viewMode2DButtonDiv.style.backgroundColor = "#A696FF";
    this.viewMode3DButtonDiv.style.backgroundColor = "#8070D6";
    this.StartOverButton.style.backgroundColor = "#8070D6";

    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();

    this.layoutCanvas.style.display = "block";
};

/*This function shows that 3D mode has been selected*/
HVACApplication.prototype.viewWall3DButtonClicked = function() {
    this.dragButtonDiv.style.backgroundColor = "#8070D6";
    this.viewMode2DButtonDiv.style.backgroundColor = "#8070D6";
    this.viewMode3DButtonDiv.style.backgroundColor = "#A696FF";
    this.StartOverButton.style.backgroundColor = "#8070D6";

    this.currentViewModeLayout = ViewModeType.Mode3D;
    this.viewMode3DController.show();
    //this.layoutCanvas.style.display = "none";
};

//Highlights Create button and deselects other buttons.
HVACApplication.prototype.createWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.style.backgroundColor = "#A696FF";
    this.editButtonDiv.style.backgroundColor = "#8070D6";
    this.deleteMenuDiv.style.backgroundColor = "#8070D6";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();
    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();

    this.showCreateModeLayout();
};

//Highlights Edit button and deselects other buttons.
HVACApplication.prototype.editButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_EDIT;
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.style.backgroundColor = "#8070D6";
    this.editButtonDiv.style.backgroundColor = "#A696FF";
    this.deleteMenuDiv.style.backgroundColor = "#8070D6";
    this.editPointButtonDiv.style.backgroundColor = "#8070D6";
    this.editCornerButtonDiv.style.backgroundColor = "#8070D6";

    //Adds the sub-edit buttons
    this.mySecondBannerDiv.appendChild(this.editPointButtonDiv);
    this.editPointButtonDiv.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.editCornerButtonDiv);
    this.editCornerButtonDiv.style.opacity = "1.0";

    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.StartOverButton.remove();
    this.deleteButtonDiv.remove();
    //this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();

    if (this.currentEditMode == EDIT_MODE_CORNER) {
        this.showEditCornerModeLayout();
        this.editCornerButtonDiv.style.backgroundColor = "#A696FF";
    } else if (this.currentEditMode == EDIT_MODE_POINT) {
        this.showEditPointModeLayout();
        this.editPointButtonDiv.style.backgroundColor = "#A696FF";
    }
};

//Highlights Point button underneath Edit button.
HVACApplication.prototype.editPointButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_POINT;
    this.editPointButtonDiv.style.backgroundColor = "#A696FF";
    this.editCornerButtonDiv.style.backgroundColor = "#8070D6";

    this.showEditPointModeLayout();
};

//Highlights Corner button underneath Edit button.
HVACApplication.prototype.editCornerButtonClicked = function () {
    "use strict";
    this.currentEditMode = EDIT_MODE_CORNER;
    this.editPointButtonDiv.style.backgroundColor = "#8070D6";
    this.editCornerButtonDiv.style.backgroundColor = "#A696FF";

    this.showEditCornerModeLayout();
};

/*This function shows the Delete button as selected*/
HVACApplication.prototype.deleteMenuClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE_WALL;
    this.viewButtonDiv.style.backgroundColor = "#c9d7e0";
    this.createButtonDiv.style.backgroundColor = "#8070D6";
    this.editButtonDiv.style.backgroundColor = "#8070D6";
    this.deleteMenuDiv.style.backgroundColor = "#A696FF";
    this.deleteButtonDiv.style.backgroundColor = "#8070D6";
    this.StartOverButton.style.backgroundColor = "#8070D6";

    this.mySecondBannerDiv.appendChild(this.StartOverButton);
    this.StartOverButton.style.opacity = "1.0";
    this.mySecondBannerDiv.appendChild(this.deleteButtonDiv);
    this.deleteButtonDiv.style.opacity = "1.0";

    this.editPointButtonDiv.remove();
    this.editCornerButtonDiv.remove();
    this.viewMode2DButtonDiv.remove();
    this.viewMode3DButtonDiv.remove();
    this.dragButtonDiv.remove();
    this.RestoreButton.remove();
    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.viewMode3DController.hide();

    if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
        this.deleteButtonDiv.style.backgroundColor = "#A696FF";
    }

    this.showDeleteModeLayout();
};

//Highlights Delete button and deselects other buttons.
HVACApplication.prototype.deleteWallButtonClicked = function () {
    "use strict";
    this.currentLayoutMode = LAYOUT_MODE_DELETE_WALL;
    this.StartOverButton.style.backgroundColor = "#8070D6";
    this.deleteButtonDiv.style.backgroundColor = "#A696FF";

    this.showDeleteModeLayout();
};

HVACApplication.prototype.getApplicationDiv = function() {
    return this.applicationDiv;
};