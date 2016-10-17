/**
 * Created by masse on 10/14/2016.
 */
function BasementWindowPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementWindowBGCover'});

    this.BasementWindowDiv = CreateElement({type: 'div', class: 'BasementWindowDiv'});

}

BasementWindowPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementWindowDiv);
};
BasementWindowPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementWindowDiv.remove();
};