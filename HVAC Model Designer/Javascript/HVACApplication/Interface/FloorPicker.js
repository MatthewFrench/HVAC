/**
 * Created by personal on 11/7/16.
 */

/*This function creates the Floor Picker*/
function FloorPicker(hvacApplication) {
    this.hvacApplication = hvacApplication;
    this.mainDiv = new CreateElement({type: 'div', class: 'FloorPicker_Main_Div', elements: [
        CreateElement({type: 'div', class: 'FloorPicker_Title', text: 'Floors'}),
        this.floorContainer = CreateElement({type: 'div', class: 'FloorPicker_Floor_Container'}),
        CreateElement({type: 'div', class: 'FloorPicker_Bottom_Bar', elements: [
            CreateElement({type: 'button', class: 'FloorPicker_Add_Button', text: '+',
                onClick: CreateFunction(this, this.addFloor)}),
            CreateElement({type: 'button', class: 'FloorPicker_Remove_Button', text: '-',
                onClick: CreateFunction(this, this.removeFloor)})
        ]})
    ]});

    this.floorRows = [];
    this.currentFloorRow = null;
}

/*This function allows the Floor Picker to load floors*/
FloorPicker.prototype.loadFloors = function() {
    //Clear rows
    this.floorRows = [];
    while (this.floorContainer.hasChildNodes()) {
        this.floorContainer.removeChild(this.floorContainer.lastChild);
    }

    var building = this.hvacApplication.getCurrentBuilding();
    var floorList = building.getFloorList();
    for (var i = floorList.length - 1; i >= 0; i--) {

        (function(index) {

            var floor = floorList[i];
            var row = CreateElement({type: 'div', class: 'FloorPicker_Floor_Row', text: 'Floor ' + (index+1),
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
        }).call(this, i);
    }
};

/*This function lets users know which floor they have clicked on*/
FloorPicker.prototype.floorClicked = function(floorRow) {
    if (this.currentFloorRow != null) {
        this.currentFloorRow.div.className = "FloorPicker_Floor_Row";
    }
    this.currentFloorRow = floorRow;
    this.currentFloorRow.div.className = "FloorPicker_Floor_Row selected";

    //Set selected floor
    this.hvacApplication.selectFloor(floorRow.floor);
};

/*This function creates a new floor in Floor Picker*/
FloorPicker.prototype.addFloor = function() {
    var building = this.hvacApplication.getCurrentBuilding();
    new FloorPlan({building: building});

    this.loadFloors();
    this.floorClicked(this.floorRows[0]);
};

/*This function removes a floor in Floor Picker*/
FloorPicker.prototype.removeFloor = function() {
    if (this.currentFloorRow == null || this.floorRows.length <= 1) return;
    var building = this.hvacApplication.getCurrentBuilding();
    building.removeFloor(this.currentFloorRow.floor);

    this.loadFloors();
    this.floorClicked(this.floorRows[0]);
};

/*This function obtains the current Div*/
FloorPicker.prototype.getDiv = function() {
    return this.mainDiv;
};

/*This function sets the floor and div to the current floor/div*/
function FloorRow(div, floor) {
    this.div = div;
    this.floor = floor;
}