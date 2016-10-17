/**
 * Created by masse on 10/14/2016.
 */
function BasementCeilingPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementCeilingBGCover'});
    this.BasementCeilingDiv = CreateElement({type: 'div', class: 'BasementCeilingDiv'});
}

BasementCeilingPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementCeilingDiv);
};
BasementCeilingPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementCeilingDiv.remove();
};