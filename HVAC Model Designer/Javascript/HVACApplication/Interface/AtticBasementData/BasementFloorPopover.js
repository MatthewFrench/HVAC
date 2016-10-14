/**
 * Created by masse on 10/14/2016.
 */
function BasementFloorPopover() {
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BasementFloorBGCover";

    this.BasementFloorDiv = document.createElement("div");
    this.BasementFloorDiv.className = "BasementFloorDiv";


}

BasementFloorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementFloorDiv);
};
BasementFloorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementFloorDiv.remove();
};