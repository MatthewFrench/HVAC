/**
 * Created by masse on 10/14/2016.
 */
function BasementFloorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementFloorBGCover'});
    this.BasementFloorDiv = CreateElement({type: 'div', class: 'BasementFloorDiv'});
}

BasementFloorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementFloorDiv);
};
BasementFloorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementFloorDiv.remove();
};