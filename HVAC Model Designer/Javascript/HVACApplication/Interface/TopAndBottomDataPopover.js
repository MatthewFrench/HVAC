/**
 * Created by masse on 10/10/2016.
 */
function TopAndBottomDataPopover() {
    "use strict";
    //Constructor
    this.TopAndBottomDataDiv = null;
    this.saveDataButton = null;
    this.titleSpan = null;
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BackgroundCover";

    this.TopAndBottomDataDiv = document.createElement("div");
    this.TopAndBottomDataDiv.className = "TopAndBottomDataDiv";

    this.saveDataButton = document.createElement('button');
    this.saveDataButton.className = "SaveDataButton";
    this.saveDataButton.innerText = "Save Location Data";
    var self = this;
    this.saveDataButton.onclick = function () {
        self.hide();
    };
    this.TopAndBottomDataDiv.appendChild(this.saveDataButton);

    this.titleSpan = document.createElement("span");
    this.titleSpan.className = "TopAndBottomTitle";
    this.titleSpan.innerText = "Input Attic and Basement Data";
    this.TopAndBottomDataDiv.appendChild(this.titleSpan);
}

TopAndBottomDataPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.TopAndBottomDataDiv);
};
TopAndBottomDataPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.TopAndBottomDataDiv.remove();
};
