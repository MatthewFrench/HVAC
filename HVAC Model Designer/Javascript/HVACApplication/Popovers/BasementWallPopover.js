/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Basement Wall Popover code that will allow a user to input Information about the
 * Basement Walls for calculating the U Value.
 */

/**
 * This function creates the Basement Wall Popover.
 *
 * @constructor
 */
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

/**
 * This function shows the Basement Wall Popover.
 */
BasementWallPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.BasementWallDiv);
};

/**
 * This function hides the Basement Wall Popover.
 */
BasementWallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementWallDiv.remove();
};