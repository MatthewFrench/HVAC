/**
 * Created by masse on 11/4/2016.
 */

//This function creates the Basement Wall Popover
function BasementWallPopover() {
    this.backgroundDiv = CreateElement({type: 'div', className: 'BasementWallBGCover'});
    this.BasementWallDiv = CreateElement({
        type: 'div', className: 'BasementWallDiv', elements: [
            this.BasementWallSaveButton = CreateElement({
                type: 'button',
                className: 'BasementWallSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.BasementWallCancelButton = CreateElement({
                type: 'button',
                className: 'BasementWallCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Basement Wall Popover
BasementWallPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.BasementWallDiv);
};

//This function hides the Basement Wall Popover
BasementWallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementWallDiv.remove();
};