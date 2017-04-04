/**
 * Created by personal on 11/7/16.
 *
 * This class controls the window on the canvas that allows you to manage the different floors of the
 * current project.
 */

/**
 * This function creates the Floor Picker window on the canvas.
 *
 * @param hvacApplication: The overall control that the Floor Picker is a part of.
 * @constructor
 */
function FloorPicker(hvacApplication) {
    this.hvacApplication = hvacApplication;
    this.mainDiv = new CreateElement({type: 'div', className: 'FloorPicker_Main_Div', elements: [
        CreateElement({type: 'div', className: 'FloorPicker_Title', text: 'Floors'}),
        this.floorContainer = CreateElement({type: 'div', className: 'FloorPicker_Floor_Container'}),
        CreateElement({type: 'div', className: 'FloorPicker_Bottom_Bar', elements: [
            CreateElement({type: 'button', className: 'FloorPicker_Add_Button', text: '+',
                onClick: CreateFunction(this, this.addFloor)}),
            CreateElement({type: 'button', className: 'FloorPicker_Edit_Name_Button', text: 'Edit Name',
                onClick: CreateFunction(this, this.editFloorName)}),
            CreateElement({type: 'button', className: 'FloorPicker_Remove_Button', text: '-',
                onClick: CreateFunction(this, this.removeFloor)})
        ]})
    ]});

    this.floorRows = [];
    this.currentFloorRow = null;
    this.loadFloors();
}

/**
 * This function allows the Floor Picker to load floors into the window.
 */
FloorPicker.prototype.loadFloors = function() {
    //Clear rows
    this.floorRows = [];
    while (this.floorContainer.hasChildNodes()) {
        this.floorContainer.removeChild(this.floorContainer.lastChild);
    }

    var building = this.hvacApplication.getCurrentBuilding();
    var floorList = building.getFloorList();

    //Iterate through floors and add each to the Floor Picker
    for (var i = floorList.length - 1; i >= 0; i--) {
        (function(index) {
            var floor = floorList[i];
            if (floor.floorName == "") floor.floorName = 'Floor ' + (index+1);
            var floorName = floor.floorName;
            var row = CreateElement({type: 'div', className: 'FloorPicker_Floor_Row', text: floorName,
                appendTo: this.floorContainer});

            var floorRow = new FloorRow(row, floor);
            if (floor == this.hvacApplication.getCurrentFloorPlan()) {
                row.className = "FloorPicker_Floor_Row selected";
                this.currentFloorRow = floorRow;
            }
            this.floorRows.push(floorRow);

            row.onclick = CreateFunction(this, function() {
                this.floorClicked(floorRow);
            });

            row.draggable="true";

            var allowDrop = function(ev) {
                ev.preventDefault();
            };
            var drag = function(ev) {
                ev.dataTransfer.setData("Floor ID", index);
            };
            row.ondrop = CreateFunction(this, function(ev){
                this.droppedOnFloor(ev, index);
            });
            row.ondragover = allowDrop;
            row.ondragstart = drag;

        }).call(this, i);
    }
};

FloorPicker.prototype.droppedOnFloor = function(ev, index) {
    console.log("Row was dropped on row: " + index);
    var moveFloor = ev.dataTransfer.getData("Floor ID");

    var building = this.hvacApplication.getCurrentBuilding();
    building.putFloorAboveFloor(moveFloor, index);

    this.loadFloors();
};

/**
 * This function lets users know which floor they have clicked on.
 *
 * @param floorRow: The floor that the user selected.
 */
FloorPicker.prototype.floorClicked = function(floorRow) {
    if (this.currentFloorRow != null) {
        this.currentFloorRow.div.className = "FloorPicker_Floor_Row";
    }
    this.currentFloorRow = floorRow;
    this.currentFloorRow.div.className = "FloorPicker_Floor_Row selected";

    //Set selected floor
    this.hvacApplication.selectFloor(floorRow.floor);
};

/**
 * This function creates a new floor in Floor Picker.
 */
FloorPicker.prototype.addFloor = function() {
    var building = this.hvacApplication.getCurrentBuilding();
    new FloorPlan({building: building});

    this.loadFloors();
    this.floorClicked(this.floorRows[0]);

    //Create and display EditFloorNamePopover to allow user to change name of the floor
    var newEditNamePopover = new EditFloorNamePopover(this.currentFloorRow.floor.floorName,
        CreateFunction(this, function (newFloorName) {
            this.currentFloorRow.floor.floorName = newFloorName;
            this.loadFloors();
            this.floorClicked(this.floorRows[0]);
        }));

    newEditNamePopover.show(this.hvacApplication.applicationDiv);
};

/**
 * This function displays the EditFloorNamePopover.js to be able to change the name of the floor.
 */
FloorPicker.prototype.editFloorName = function() {
    //Create and display EditFloorNamePopover to allow user to change name of the floor
    var newEditNamePopover = new EditFloorNamePopover(this.currentFloorRow.floor.floorName,
        CreateFunction(this, function (newFloorName) {
            this.currentFloorRow.floor.floorName = newFloorName;
            this.loadFloors();
            this.floorClicked(this.floorRows[0]);
        }));

    newEditNamePopover.show(this.hvacApplication.applicationDiv);
}

/**
 * This function removes a floor in Floor Picker.
 */
FloorPicker.prototype.removeFloor = function() {
    if (this.currentFloorRow == null || this.floorRows.length <= 1) return;
    var building = this.hvacApplication.getCurrentBuilding();
    building.removeFloor(this.currentFloorRow.floor);

    this.loadFloors();
    this.floorClicked(this.floorRows[0]);
};

/**
 * This function obtains the current Div.
 *
 * @return: The current Div.
 */
FloorPicker.prototype.getDiv = function() {
    return this.mainDiv;
};

/**
 * This function sets the floor and div to the current floor/div.
 *
 * @param div: The Div that is in use.
 * @param floor: The Floor that is selected.
 */
function FloorRow(div, floor) {
    this.div = div;
    this.floor = floor;
}