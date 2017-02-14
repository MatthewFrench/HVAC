/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Wall Popover code that will allow a user to input Information about walls for calculating
 * the U Value
 */

//This function creates the Wall Popover
function WallPopover() {
    this.backgroundDiv = CreateElement({
        type: 'div',
        class: 'WallBGCover'
    });
    this.WallDiv = CreateElement({
        type: 'div',
        class: 'WallDiv',
        elements: [
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
WallPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.WallDiv);
};

//This function hides the Wall Popover
WallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WallDiv.remove();
};