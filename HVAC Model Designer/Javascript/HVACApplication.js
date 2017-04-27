/**
 * Created by Matt on 9/9/16.
 *
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
                this.currentProjectLabel = CreateElement({
                    type: 'label',
                    className: 'CurrentProjectLabel',
                    text: 'Current Project: ' + this.getCurrentBuilding().buildingName
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
                        this.simulatorTab = CreateElement({
                            type: 'div', className: 'HVACApplication_SimulatorTab',
                            onClick: CreateFunction(this, this.simulatorTabClick), text: "Simulator"
                        }),
                        //creates Wall Properties Button
                        this.wallPropertiesButton = CreateElement({
                            type: 'button',
                            className: 'wallPropertiesButton',
                            text: 'Wall Properties Button',
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
        this.simulator = new Simulator(this);

        this.currentEditor = null;

        //Load editors
        this.projectEditorTabClick();
    }

    //What happens when "Project Editor" is clicked on
    projectEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab selected";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.projectEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
        this.hideFloorPicker();
    };

    //What happens when "Wall Editor" is clicked on
    wallEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab selected";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";
        this.simulatorTab.className = "HVACApplication_SimulatorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.wallEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
        this.showFloorPicker();
    }

    //What happens when "Room Editor" is clicked on
    roomEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab selected";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";
        this.simulatorTab.className = "HVACApplication_SimulatorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.roomEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
        this.showFloorPicker();
    }

    //What happens when "View Editor" is clicked on
    viewEditorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab selected";
        this.simulatorTab.className = "HVACApplication_SimulatorTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.viewEditor;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
        this.showFloorPicker();
    }

    //What happens when "Simulator" is clicked on
    simulatorTabClick() {
        this.projectEditorTab.className = "HVACApplication_ProjectEditorTab";
        this.wallEditorTab.className = "HVACApplication_WallEditorTab";
        this.roomEditorTab.className = "HVACApplication_RoomEditorTab";
        this.viewEditorTab.className = "HVACApplication_ViewEditorTab";
        this.simulatorTab.className = "HVACApplication_SimulatorTab selected";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
        this.currentEditor = this.simulator;
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
        this.hideFloorPicker();
    }

    //Loads in the HVACData and gets a list of all current buildings
    loadData() {
        this.hvacData = HVACDataLoader.getHVACData();
        this.selectBuilding(this.hvacData.getBuildingList()[0]);
    };

    //Saves the HVACData to a JSON object for mapping
    saveData() {
        window.localStorage.setItem("HVACData", JSON.stringify(this.hvacData.getHashmap()));
    }

    //Opens up the project involving the building you have selected
    //@param building: Currently selected building in Project Editor
    selectBuilding(building) {
        if (this.currentProjectLabel != null)
            this.currentProjectLabel.innerHTML = "Current Project: " + building.buildingName;
        this.selectedBuilding = building;
        this.selectFloor(building.getFloorList()[0]);
    }

    //Opens the canvas to the floor that you have selected
    //@param floor: Currently selected floor in Floor Picker
    selectFloor(floor) {
        this.selectedFloor = floor;
    }

    //Hides the Floor Picker when Project Editor/Simulator are selected
    hideFloorPicker() {
        this.floorPickerWindow.getDiv().style.display = "none";
    }

    //Shows the Floor Picker when Wall Editor, Room Editor, or View are selected
    showFloorPicker() {
        this.floorPickerWindow.getDiv().style.display = "";
        this.floorPickerWindow.loadFloors();
    }

    //Gets a list of the current walls that have been created
    getCurrentWallList() {
        return this.selectedFloor.getWallList();
    }

    //Accesses the current Floor Plan
    getCurrentFloorPlan() {
        return this.selectedFloor;
    };

    //Accesses the current Building
    getCurrentBuilding() {
        return this.selectedBuilding;
    }

    //Accesses the Logic function inside of the current Editor
    logic() {
        if (this.currentEditor != null) {
            this.currentEditor.logic();
        }
    }

    //This shows the HVAC Application Canvas and Divs
    getApplicationDiv() {
        return this.applicationDiv;
    }
}