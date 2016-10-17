/**
 * Created by masse on 10/14/2016.
 */
function BasementDoorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementDoorBGCover'});
    this.BasementDoorDiv = CreateElement({type: 'div', class: 'BasementDoorDiv'});
}

BasementDoorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementDoorDiv);
};
BasementDoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementDoorDiv.remove();
};