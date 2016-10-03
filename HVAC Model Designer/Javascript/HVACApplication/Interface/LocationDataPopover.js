/**
 * Created by masse on 10/3/2016.
 */

function LocationDataPopover() {
    "use strict";
    //Constructor
    this.locationDataDiv = null;

    this.locationDataDiv = document.createElement("div");
    this.locationDataDiv.className = "LocationDataDiv";

    this.saveDataButton = document.createElement('button');
    this.saveDataButton.className = "SaveDataButton";
    this.saveDataButton.innerText = "Save Location Data";
    var self = this;
    this.saveDataButton.onclick = function () {
        self.hide();
    };
    this.locationDataDiv.appendChild(this.saveDataButton);
}

LocationDataPopover.prototype.show = function() {
    document.body.appendChild(this.locationDataDiv);
};
LocationDataPopover.prototype.hide = function() {
    this.locationDataDiv.remove();
};
