/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Glass Door Popover code that will allow a user to input Information about any Glass
 * Doors for calculating the U Value.
 */

/**
 * This function creates the Glass Door Popover.
 *
 * @constructor
 */
function GlassDoorPopover() {
/*
    this.backgroundDiv = CreateElement({type: 'div', className: 'GlassDoorBGCover'});
    this.GlassDoorDiv = CreateElement({
        type: 'div', className: 'GlassDoorDiv', elements: [
*/
    this.backgroundDiv = CreateElement({
        type: 'div',
        className: 'GlassDoorBGCover'
    });
    this.GlassDoorDiv = CreateElement({
        type: 'div',
        className: 'GlassDoorDiv',
        elements: [
            this.GlassDoorSaveButton = CreateElement({
                type: 'button',
                className: 'GlassDoorSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.GlassDoorCancelButton = CreateElement({
                type: 'button',
                className: 'GlassDoorCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

/**
 * This function shows the Glass Door Popover.
 *
 * @param parent: The hvacApplication class that the Glass Door Popover is contained in.
 */
GlassDoorPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.GlassDoorDiv);
};

/**
 * This function hides the Glass Door Popover.
 */
GlassDoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.GlassDoorDiv.remove();
};