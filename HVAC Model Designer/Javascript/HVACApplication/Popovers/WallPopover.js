/**
 * Created by masse on 10/26/2016.
 */

//This function creates the Wall Popover
function WallPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'WallBGCover'});
    this.WallDiv = CreateElement({
        type: 'div', class: 'WallDiv', elements: [
            this.WallSaveButton = CreateElement({
                type: 'button',
                class: 'WallSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.WallCancelButton = CreateElement({
                type: 'button',
                class: 'WallCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Wall Popover
WallPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.WallDiv);
};

//This function hides the Wall Popover
WallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WallDiv.remove();
};