/**
 * Created by Matt on 9/9/16.
 * This JS file controls our entire HVAC Application, allowing us to do the various functions such as Create, Drag,
 * Edit, and Delete. It also controls the initial rotation of the window and establishes the floor plans and building
 * plans that are being adjusted/created.
 */

//var LAYOUT_MODE_CREATE_WALL = 0, LAYOUT_MODE_EDIT = 1, LAYOUT_MODE_DRAG = 2, LAYOUT_MODE_VIEW = 3,
//    LAYOUT_MODE_DELETE_WALL = 4;
//var WALL_POINT_ONE = 1, WALL_POINT_CENTER = 2, WALL_POINT_TWO = 2;
//var EDIT_MODE_POINT = 0, EDIT_MODE_CORNER = 1;

//Constructor
class HVACApplication {
    constructor() {
        this.hvacData = null;
        this.applicationDiv = null;
        //this.shiftPressed = false;
        //this.currentMouseX = 0.0;
        //this.currentMouseY = 0.0;
        //this.previousMouseX = 0.0;
        //this.previousMouseY = 0.0;
        //this.mouseMovedX = 0.0;
        //this.mouseMovedY = 0.0;
        //this.canvasMouseX = 0.0;
        //this.canvasMouseY = 0.0;
        //this.rotatedCanvasMouseX = 0.0;
        //this.rotatedCanvasMouseY = 0.0;
        //this.rotatedCanvasMouseMovedX = 0.0;
//this.rotatedCanvas                    MouseMovedY = 0.0;
        //this.mouseDown = false;
        //this.intersectHighlightPoints = [];
        //this.currentLayoutMode = LAYOUT_MODE_CREATE_WALL;
        //this.currentEditMode = EDIT_MODE_POINT;
        this.selectedFloor = null;
        this.selectedBuilding = null;
        //this.viewAngle = 0.0;
        //this.viewScale = 1.0;

        //this.viewMode3DController = new ViewMode3DController(this);

        //this.initUIVariables();
        //this.createUI();

        //this.initCreateModeVariables();
        //this.initDragModeVariables();
        //this.initEditCornerModeVariables();
        //this.initEditPointModeVariables();
        //this.initViewModeVariables();
        //this.initDeleteModeVariables();

        this.loadData();

        this.applicationDiv = CreateElement({
            type: 'div', className: 'ApplicationDiv', elements: [
                CreateElement({type: 'div', className: 'ApplicationBackground1'}),
                CreateElement({type: 'div', className: 'ApplicationBackground2'}),
                this.mainTitleDiv = CreateElement({
                    type: 'div',
                    className: 'HVACApplication_TitleBar',
                    text: "HVAC Model Designer"
                }),
                this.topBarDiv = CreateElement({
                    type: 'div', className: 'HVACApplication_TopBar', elements: [
                        this.wallEditorTab = CreateElement({
                            type: 'div', className: 'HVACApplication_WallEditorTab',
                            onClick: CreateFunction(this, this.wallEditorTabClick), text: "Wall Editor"
                        }),
                        this.roomEditorTab = CreateElement({
                            type: 'div', className: 'HVACApplication_RoomEditorTab',
                            onClick: CreateFunction(this, this.roomEditorTabClick), text: "Room Editor"
                        }),
                        this.viewEditorTab = CreateElement({
                            type: 'div', className: 'HVACApplication_ViewEditorTab',
                            onClick: CreateFunction(this, this.viewEditorTabClick), text: "View"
                        })
                    ]
                }),
                this.mainContentDiv = CreateElement({type: 'div', className: 'HVACApplication_MainContent'})
            ]
        });

        this.wallEditor = new WallEditor(this);
        this.roomEditor = new RoomEditor(this);
        this.viewEditor = new ViewEditor(this);

        this.currentEditor = null;

        //Load editors
        this.wallEditorTabClick();
    }


    wallEditorTabClick() {
        this.wallEditorTab.className = "HVACApplication_WallEditorTab selected";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.wallEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    roomEditorTabClick() {
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab selected";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.roomEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    viewEditorTabClick() {
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab selected";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.viewEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    loadData() {
        "use strict";
        this.hvacData = HVACDataLoader.getHVACData();
        this.selectBuilding(this.hvacData.getBuildingList()[0]);
        //this.floorPicker.loadFloors();
    };

    saveData() {
        window.localStorage.setItem("HVACData", JSON.stringify(this.hvacData.getHashmap()));
    };

    selectBuilding(building) {
        this.selectedBuilding = building;
        this.selectFloor(building.getFloorList()[0]);
    };

    selectFloor(floor) {
        this.selectedFloor = floor;
    };

    getCurrentWallList() {
        return this.selectedFloor.getWallList();
    };

    getCurrentFloorPlan() {
        return this.selectedFloor;
    };

    getCurrentBuilding() {
        return this.selectedBuilding;
    };

    logic() {
        "use strict";
        //this.layoutDraw();
    }

//Begin and End draw are duplicate drawing code for all layout modes
    beginDraw(canvas, viewAngle, viewScale) {
        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.save();

        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        ctx.rotate(viewAngle); //convertToRadians(this.viewAngle)

        ctx.scale(viewScale, viewScale);

        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

        return ctx;
    }

    drawSlicePoints(canvas, viewAngle, viewScale, intersectHighlightPoints) {
        //Draw slice intersection points
        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        ctx.save();
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(viewAngle); //convertToRadians(this.viewAngle)
        ctx.scale(viewScale, viewScale); //convertToRadians(this.viewAngle)
        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
        for (var i in intersectHighlightPoints) {
            var intersectPoint = intersectHighlightPoints[i];
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4.0;
            ctx.strokeRect(intersectPoint.getX() - 5, intersectPoint.getY() - 5, 10, 10);
        }
        ctx.restore();
    }

    endDraw(ctx) {
        ctx.restore();
    }

    /*
     layoutDraw() {
     "use strict";

     if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
     this.drawViewModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
     this.drawDeleteModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
     this.drawCreateModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
     this.drawDragModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
     if (this.currentEditMode == EDIT_MODE_POINT) {
     this.drawEditPointModeLayout();
     }
     if (this.currentEditMode == EDIT_MODE_CORNER) {
     this.drawEditCornerModeLayout();
     }
     }
     };
     */

    windowResized() {
        //this.resizeCanvas();
    }

//resizeCanvas() {
//    "use strict";
    //this.layoutCanvas.width = this.layoutCanvas.clientWidth;
    //this.layoutCanvas.height = this.layoutCanvas.clientHeight;
//};

    /*
     setRotatedCanvasMouse() {
     var canvasWidth = this.layoutCanvas.width;
     var canvasHeight = this.layoutCanvas.height;
     var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
     new Point2D({x: canvasWidth/2, y: canvasHeight/2}), this.viewAngle, this.viewScale);
     this.rotatedCanvasMouseX = p.getX();
     this.rotatedCanvasMouseY = p.getY();
     };
     */
    /*
     layoutCanvasMousePressed(event) {
     "use strict";
     var mouseX = event.offsetX - this.layoutCanvas.clientLeft;
     var mouseY = event.offsetY - this.layoutCanvas.clientTop;
     if(event.which == 3) return;
     this.mouseDown = true;
     this.previousMouseX = this.currentMouseX;
     this.currentMouseX = mouseX;
     this.previousMouseY = this.currentMouseY;
     this.currentMouseY = mouseY;

     this.canvasMouseX = this.currentMouseX;
     this.canvasMouseY = this.currentMouseY;

     this.setRotatedCanvasMouse();

     if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
     this.mousePressedCreateModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
     this.mousePressedDragModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
     if (this.currentEditMode == EDIT_MODE_POINT) {
     this.mousePressedEditPointModeLayout();
     }
     if (this.currentEditMode == EDIT_MODE_CORNER) {
     this.mousePressedEditCornerModeLayout();
     }
     }
     if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
     this.mousePressedViewModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
     this.mousePressedDeleteModeLayout();
     }
     };

     layoutCanvasMouseMoved(event) {
     "use strict";
     var mouseX = event.offsetX - this.applicationDiv.offsetLeft - this.applicationDiv.clientLeft;
     var mouseY = event.offsetY - this.applicationDiv.offsetTop - this.applicationDiv.clientTop;
     this.previousMouseX = this.currentMouseX;
     this.currentMouseX = mouseX;
     this.previousMouseY = this.currentMouseY;
     this.currentMouseY = mouseY;

     this.mouseMovedX = this.previousMouseX - this.currentMouseX;
     this.mouseMovedY = this.previousMouseY - this.currentMouseY;

     this.canvasMouseX = this.currentMouseX;
     this.canvasMouseY = this.currentMouseY;


     var oldRotatedX = this.rotatedCanvasMouseX;
     var oldRotatedY = this.rotatedCanvasMouseY;
     this.setRotatedCanvasMouse();
     this.rotatedCanvasMouseMovedX = oldRotatedX - this.rotatedCanvasMouseX;
     this.rotatedCanvasMouseMovedY = oldRotatedY - this.rotatedCanvasMouseY;

     if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
     this.mouseMovedCreateModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
     this.mouseMovedDragModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
     if (this.currentEditMode == EDIT_MODE_POINT) {
     this.mouseMovedEditPointModeLayout();
     }
     if (this.currentEditMode == EDIT_MODE_CORNER) {
     this.mouseMovedEditCornerModeLayout();
     }
     }
     if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
     this.mouseMovedViewModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
     this.mouseMovedDeleteModeLayout();
     }

     if(event.stopPropagation) event.stopPropagation();
     if(event.preventDefault) event.preventDefault();
     event.cancelBubble=true;
     event.returnValue=false;
     return false;
     };

     layoutCanvasMouseReleased(event) {
     "use strict";
     var mouseX = event.offsetX - this.layoutCanvas.clientLeft;
     var mouseY = event.offsetY - this.layoutCanvas.clientTop;
     if(event.which == 3) return;
     this.mouseDown = false;
     this.previousMouseX = this.currentMouseX;
     this.currentMouseX = mouseX;
     this.previousMouseY = this.currentMouseY;
     this.currentMouseY = mouseY;

     this.canvasMouseX = this.currentMouseX;
     this.canvasMouseY = this.currentMouseY;

     this.setRotatedCanvasMouse();

     if (this.currentLayoutMode == LAYOUT_MODE_CREATE_WALL) {
     this.mouseReleasedCreateModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DRAG) {
     this.mouseReleasedDragModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_EDIT) {
     if (this.currentEditMode == EDIT_MODE_POINT) {
     this.mouseReleasedEditPointModeLayout();
     }
     if (this.currentEditMode == EDIT_MODE_CORNER) {
     this.mouseReleasedEditCornerModeLayout();
     }
     }
     if (this.currentLayoutMode == LAYOUT_MODE_VIEW) {
     this.mouseReleasedViewModeLayout();
     }
     if (this.currentLayoutMode == LAYOUT_MODE_DELETE_WALL) {
     this.mouseReleasedDeleteModeLayout();
     }
     };
     */
    /*
     onKeydown(event) {
     "use strict";
     //var key = event.which;
     if (event.shiftKey) {
     this.shiftPressed = true;
     }
     };

     onKeyup(event) {
     "use strict";
     //var key = event.which;
     if (!event.shiftKey) {
     this.shiftPressed = false;
     }
     };
     */

    getApplicationDiv() {
        return this.applicationDiv;
    }
}