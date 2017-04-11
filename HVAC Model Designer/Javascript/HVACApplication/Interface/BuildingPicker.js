/**
 * Created by Austin03 on 4/6/17.
 *
 * This class controls the window on the canvas that allows you to manage the different buildings project.
 */

/**
 * This function creates the Building Picker window on the canvas.
 *
 * @param hvacApplication: The overall control that the Building Picker is a part of.
 * @constructor
 */
function BuildingPicker(hvacApplication, hvacData) {
    this.hvacApplication = hvacApplication;
    this.hvacData = hvacData;
    this.mainDiv = new CreateElement({type: 'div', className: 'BuildingPicker_Main_Div', elements: [
        CreateElement({type: 'div', className: 'BuildingPicker_Title', text: 'Building Projects'}),
        this.buildingContainer = CreateElement({type: 'div', className: 'BuildingPicker_Building_Container'}),
        CreateElement({type: 'div', className: 'BuildingPicker_Bottom_Bar', elements: [
            CreateElement({type: 'button', className: 'BuildingPicker_Add_Button', text: 'Add New Project',
                onClick: CreateFunction(this, this.addBuilding)}),
            CreateElement({type: 'button', className: 'BuildingPicker_Edit_Name_Button', text: 'Edit Name',
                onClick: CreateFunction(this, this.editBuildingName)}),
            CreateElement({type: 'button', className: 'BuildingPicker_Remove_Button', text: 'Remove Project',
                onClick: CreateFunction(this, this.removeBuilding)})
        ]})
    ]});

    this.buildingRows = [];
    this.currentBuildingRow = null;
    this.loadBuildings();
}

/**
 * This function allows the Building Picker to load Buildings into the window.
 */
BuildingPicker.prototype.loadBuildings = function() {
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

BuildingPicker.prototype.droppedOnBuilding = function(ev, index) {
    var moveBuilding = ev.dataTransfer.getData("Building ID");

    this.hvacData.putBuildingAboveBuilding(moveBuilding, index);

    this.loadBuildings();
};

/**
 * This function lets users know which building they have clicked on.
 *
 * @param buildingRow: The building that the user selected.
 */
BuildingPicker.prototype.buildingClicked = function(buildingRow) {
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
BuildingPicker.prototype.addBuilding = function() {
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
BuildingPicker.prototype.editBuildingName = function() {
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
BuildingPicker.prototype.removeBuilding = function() {
    if (this.currentBuildingRow == null || this.buildingRows.length <= 1) return;

    var newPopover = new StartOverPopover('Are you sure you want to delete "' + this.currentBuildingRow.building.buildingName + '"?',
        CreateFunction(this, function () {
            this.hvacData.removeBuilding(this.currentBuildingRow.building);
            this.loadBuildings();
            this.buildingClicked(this.buildingRows[0]);
        }));
    newPopover.show(this.hvacApplication.applicationDiv);
};

/**
 * This function obtains the current Div.
 *
 * @return: The current Div.
 */
BuildingPicker.prototype.getDiv = function() {
    return this.mainDiv;
};

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