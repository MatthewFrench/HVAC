/**
 * Created by Matt on 9/9/16.
 * This JS file controls our entire HVAC Application, allowing us to do the various functions such as Create, Drag,
 * Edit, and Delete. It also controls the initial rotation of the window and establishes the floor plans and building
 * plans that are being adjusted/created.
 */

class HVACApplication {
    /**
     * Creates the HVACApplication class and initializes set variables.
     *
     * @constructor
     */
    constructor() {
        this.hvacData = null;
        this.applicationDiv = null;
        this.selectedFloor = null;
        this.selectedBuilding = null;

        this.viewAngle = 0.0;
        this.viewScale = 1.0;

        this.loadData();

        this.buildingPickerWindow = new BuildingPicker(this, this.hvacData);
        this.floorPickerWindow = new FloorPicker(this);

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
                        this.projectEditorTab = CreateElement({
                            type: 'div', className: 'HVACApplication_ProjectEditorTab',
                            onClick: CreateFunction(this, this.projectEditorTabClick), text: "Project Editor"
                        }),
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
                        }),
                        //creates AJ Button
                        this.AJsButton = CreateElement({
                            type: 'button',
                            className: 'AJsButton',
                            text: 'AJs Button',
                            onClick: CreateFunction(this, function(){
                                var newWallPopover = new WallPopover();
                                newWallPopover.show(this.applicationDiv);
                            })
                        })
                    ]
                }),
                this.mainContentDiv = CreateElement({type: 'div', className: 'HVACApplication_MainContent'}),
                this.floorPickerWindow.getDiv()
            ]
        });

        this.projectEditor = new ProjectEditor(this);
        this.wallEditor = new WallEditor(this);
        this.roomEditor = new RoomEditor(this);
        this.viewEditor = new ViewEditor(this);

        this.currentEditor = null;

        //Load editors
        this.wallEditorTabClick();
    }

    projectEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab selected";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.floorPickerWindow.getDiv().remove();
        this.mainContentDiv.appendChild(this.buildingPickerWindow.getDiv());
        this.currentEditor = this.projectEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    wallEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab selected";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.mainContentDiv.appendChild(this.floorPickerWindow.getDiv());
        this.buildingPickerWindow.getDiv().remove();
        this.currentEditor = this.wallEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    roomEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab selected";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.floorPickerWindow.getDiv().remove();
        this.buildingPickerWindow.getDiv().remove();
        this.currentEditor = this.roomEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    viewEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab selected";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.mainContentDiv.appendChild(this.floorPickerWindow.getDiv());
        this.buildingPickerWindow.getDiv().remove();
        this.currentEditor = this.viewEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    };

    loadData() {
        this.hvacData = HVACDataLoader.getHVACData();
        this.selectBuilding(this.hvacData.getBuildingList()[0]);
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
        if (this.currentEditor != null) {
            this.currentEditor.logic();
        }
    }

    getApplicationDiv() {
        return this.applicationDiv;
    }
}