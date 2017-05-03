/**
 * Created by Austin03 on 4/6/17.
 */

/**
 * This class controls the window on the canvas that allows you to manage the different buildings project.
 */
class BuildingPicker {

    /**
     * This function creates the Building Picker window on the canvas.
     *
     * @param hvacApplication: The overall control that the Building Picker is a part of.
     * @constructor
     */
    constructor(hvacApplication, hvacData) {
        this.hvacApplication = hvacApplication;
        this.hvacData = hvacData;

        this.mainDiv = new CreateElement({
            type: 'div',
            className: 'BuildingPicker_Main_Div',
            elements: [
                CreateElement({
                    type: 'div',
                    className: 'BuildingPicker_Title',
                    text: 'Building Projects'
                }),
                this.buildingContainer = CreateElement({
                    type: 'div',
                    className: 'BuildingPicker_Building_Container'
                }),
                CreateElement({
                    type: 'div',
                    className: 'BuildingPicker_Bottom_Bar',
                    elements: [
                        CreateElement({type: 'div', className: 'BuildingPicker_TopButtons', elements:[
                            CreateElement({
                                type: 'button',
                                className: 'BuildingPicker_Add_Button',
                                text: 'Add New Project',
                                onClick: CreateFunction(this, this.addBuilding)
                            }),
                            CreateElement({
                                type: 'button',
                                className: 'BuildingPicker_Edit_Name_Button',
                                text: 'Edit Name',
                                onClick: CreateFunction(this, this.editBuildingName)
                            }),
                            CreateElement({
                                type: 'button',
                                className: 'BuildingPicker_Remove_Button',
                                text: 'Remove Project',
                                onClick: CreateFunction(this, this.removeBuilding)
                            })
                        ]}),
                        CreateElement({type: 'div', className: 'BuildingPicker_BottomButtons', elements: [
                            CreateElement({
                                type: 'button',
                                className: 'BuildingPicker_Load_Button',
                                text: 'Load from Disk',
                                onClick: CreateFunction(this, function(){this.loadInput.click();})
                            }),
                            this.loadInput = CreateElement({
                                type: 'input',
                                inputType: 'file',
                                onChange: CreateFunction(this, this.loadFromDisk)
                            }),
                            CreateElement({
                                type: 'button',
                                className: 'BuildingPicker_Save_Button',
                                text: 'Save to Disk',
                                onClick: CreateFunction(this, this.saveToDisk)
                            })
                        ]})
                    ]
                })
            ]
        });
        this.loadInput.style.display = "none";

        this.buildingRows = [];
        this.currentBuildingRow = null;
        this.loadBuildings();
    }

    saveToDisk() {
        var building = this.hvacApplication.getCurrentBuilding();
        var blob = new Blob([JSON.stringify(building.getHashmap())], {type: "text/plain;charset=utf-8"});

        let download = document.createElement('a');
        download.href = URL.createObjectURL(blob);
        download.download = "Schematic - " + building.buildingName + ".txt";
        download.click();
    }
    loadFromDisk(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;

            var buildingMap = JSON.parse(contents);


                var building = new BuildingPlan({hvacData: this.hvacData});
                for (var floorIndex in buildingMap['floors']) {
                    var floorMap = buildingMap['floors'][floorIndex];
                    var floorName = "";
                    if (floorMap.hasOwnProperty("floorName")) floorName = floorMap["floorName"];
                    var floor = new FloorPlan({building: building, floorName: floorName});
                    for (var wallIndex in floorMap['walls']) {
                        var wallMap = floorMap['walls'][wallIndex];
                        var x1 = wallMap["point1"]['x'];
                        var y1 = wallMap["point1"]['y'];
                        var x2 = wallMap["point2"]['x'];
                        var y2 = wallMap["point2"]['y'];
                        if (x1 == undefined || y1 == undefined || x2 == undefined || y2 == undefined) continue;
                        var wall = new Wall({
                            point1: new CornerPoint({x: x1, y: y1}),
                            point2: new CornerPoint({x: x2, y: y2}),
                            floor: floor
                        });
                    }
                }

            this.hvacApplication.selectBuilding(building);
        };
        reader.readAsText(file);
    }

    /**
     * This function allows the Building Picker to load Buildings into the window.
     */
    loadBuildings() {
        //Clear rows
        this.buildingRows = [];
        while (this.buildingContainer.hasChildNodes()) {
            this.buildingContainer.removeChild(this.buildingContainer.lastChild);
        }

        var buildingList = this.hvacData.getBuildingList();

        //Iterate through buildings and add each to the Building Picker
        for (var i = buildingList.length - 1; i >= 0; i--) {
            (function(index) {
                var building = buildingList[i];
                if (building.buildingName == "") building.buildingName = 'Building ' + (index+1);
                var buildingName = building.buildingName;
                var row = CreateElement({type: 'div', className: 'BuildingPicker_Building_Row', text: buildingName,
                    appendTo: this.buildingContainer});

                var buildingRow = new BuildingRow(row, building);
                if (building == this.hvacApplication.getCurrentBuilding()) {
                    row.className = "BuildingPicker_Building_Row selected";
                    this.hvacApplication.currentProjectLabel.innerHTML = "Current Project: " + building.buildingName;
                    this.currentBuildingRow = buildingRow;
                }
                this.buildingRows.push(buildingRow);

                row.onclick = CreateFunction(this, function() {
                    this.buildingClicked(buildingRow);
                });

                row.draggable="true";

                var allowDrop = function(ev) {
                    ev.preventDefault();
                };
                var drag = function(ev) {
                    ev.dataTransfer.setData("Building ID", index);
                };
                row.ondrop = CreateFunction(this, function(ev){
                    this.droppedOnBuilding(ev, index);
                });
                row.ondragover = allowDrop;
                row.ondragstart = drag;

            }).call(this, i);
        }
    };

    droppedOnBuilding(ev, index) {
        var moveBuilding = ev.dataTransfer.getData("Building ID");

        this.hvacData.putBuildingAboveBuilding(moveBuilding, index);

        this.loadBuildings();
    };

    /**
     * This function lets users know which building they have clicked on.
     *
     * @param buildingRow: The building that the user selected.
     */
    buildingClicked(buildingRow) {
        if (this.currentBuildingRow != null) {
            this.currentBuildingRow.div.className = "BuildingPicker_Building_Row";
        }
        this.currentBuildingRow = buildingRow;
        this.currentBuildingRow.div.className = "BuildingPicker_Building_Row selected";

        //Set selected building
        this.hvacApplication.selectBuilding(buildingRow.building);
    };

    /**
     * This function creates a new building in Building Picker.
     */
    addBuilding() {
        var newBuilding = new BuildingPlan({hvacData: this.hvacData});
        newBuilding.addFloor(new FloorPlan({building: newBuilding}));

        this.loadBuildings();
        this.buildingClicked(this.buildingRows[0]);

        //Create and display EditNamePopover to allow user to change name of the building
        var newEditNamePopover = new EditNamePopover(this.currentBuildingRow.building.buildingName,
            CreateFunction(this, function (newBuildingName) {
                this.currentBuildingRow.building.buildingName = newBuildingName;
                this.loadBuildings();
                this.buildingClicked(this.buildingRows[0]);
            }),
            "What would you like to name your building project?");

        newEditNamePopover.show(this.hvacApplication.applicationDiv);
    };

    /**
     * This function displays the EditNamePopover.js to be able to change the name of the building.
     */
    editBuildingName() {
        //Create and display EditNamePopover to allow user to change name of the building
        var newEditNamePopover = new EditNamePopover(this.currentBuildingRow.building.buildingName,
            CreateFunction(this, function (newBuildingName) {
                this.currentBuildingRow.building.buildingName = newBuildingName;
                this.loadBuildings();
                this.buildingClicked(this.buildingRows[0]);
            }),
            "What would you like to name your building project?");

        newEditNamePopover.show(this.hvacApplication.applicationDiv);
    }

    /**
     * This function removes a building in Building Picker.
     */
    removeBuilding() {
        if (this.currentBuildingRow == null || this.buildingRows.length <= 1) return;

        var newPopover = new StartOverPopover('Are you sure you want to delete "' +
            this.currentBuildingRow.building.buildingName + '"?',
            CreateFunction(this, function () {
                this.hvacData.removeBuilding(this.currentBuildingRow.building);
                this.loadBuildings();
                this.buildingClicked(this.buildingRows[0]);
            })
        );
        newPopover.show(this.hvacApplication.applicationDiv);
    };

    /**
     * This function obtains the current Div.
     *
     * @return: The current Div.
     */
    getDiv() {
        return this.mainDiv;
    };
}

/**
 * This function sets the building and div to the current building/div.
 *
 * @param div: The Div that is in use.
 * @param building: The Building that is selected.
 */
function BuildingRow(div, building) {
    this.div = div;
    this.building = building;
}