/**
 * Created by masse on 10/14/2016.
 */
function BasementCeilingPopover() {
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BasementCeilingBGCover";

    this.BasementCeilingDiv = document.createElement("div");
    this.BasementCeilingDiv.className = "BasementCeilingDiv";


}

BasementCeilingPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementCeilingDiv);
};
BasementCeilingPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementCeilingDiv.remove();
};