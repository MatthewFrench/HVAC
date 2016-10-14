/**
 * Created by masse on 10/14/2016.
 */
function BasementWindowPopover() {
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BasementWindowBGCover";

    this.BasementWindowDiv = document.createElement("div");
    this.BasementWindowDiv.className = "BasementWindowDiv";


}

BasementWindowPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementWindowDiv);
};
BasementWindowPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementWindowDiv.remove();
};