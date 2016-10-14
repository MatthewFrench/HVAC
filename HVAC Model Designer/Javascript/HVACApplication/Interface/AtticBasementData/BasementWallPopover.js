/**
 * Created by masse on 10/14/2016.
 */
function BasementWallPopover() {
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BasementWallBGCover";

    this.BasementWallDiv = document.createElement("div");
    this.BasementWallDiv.className = "BasementWallDiv";


}

BasementWallPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementWallDiv);
};
BasementWallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementWallDiv.remove();
};