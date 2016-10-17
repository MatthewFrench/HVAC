/**
 * Created by masse on 10/14/2016.
 */
function BasementWallPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementWallBGCover'});

    this.BasementWallDiv = CreateElement({type: 'div', class: 'BasementWallDiv'});
}

BasementWallPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementWallDiv);
};
BasementWallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementWallDiv.remove();
};