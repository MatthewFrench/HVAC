/**
 * Created by masse on 10/26/2016.
 */

//This function creates the Wall Popover
function WallPopover() {
    this.backgroundDiv = CreateElement({type: 'div', className: 'WallBGCover'});
    this.WallDiv = CreateElement({
        type: 'div', className: 'WallDiv', elements: [
            this.WallSaveButton = CreateElement({
                type: 'button',
                className: 'WallSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.WallCancelButton = CreateElement({
                type: 'button',
                className: 'WallCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Wall Popover
WallPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.WallDiv);
};

//This function hides the Wall Popover
WallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WallDiv.remove();
};