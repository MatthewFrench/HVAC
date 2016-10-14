/**
 * Created by masse on 10/14/2016.
 */
function BasementDoorPopover() {
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BasementDoorBGCover";

    this.BasementDoorDiv = document.createElement("div");
    this.BasementDoorDiv.className = "BasementDoorDiv";


}

BasementDoorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementDoorDiv);
};
BasementDoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementDoorDiv.remove();
};