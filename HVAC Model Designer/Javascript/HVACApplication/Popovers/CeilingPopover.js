/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Ceiling Popover code that will allow a user to input Information about Ceilings for calculating
 * the U Value.
 */

/**
 * This function creates the Ceiling Popover.
 *
 * @constructor
 */
function CeilingPopover() {
    this.backgroundDiv = CreateElement({
        type: 'div',
        class: 'CeilingBGCover'
    });
    this.CeilingDiv = CreateElement({
        type: 'div',
        class: 'CeilingDiv',
        elements: [
            this.CeilingSaveButton = CreateElement({
                type: 'button',
                class: 'CeilingSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.CeilingCancelButton = CreateElement({
                type: 'button',
                class: 'CeilingCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

/**
 * This function shows the Ceiling Popover.
 */
CeilingPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.CeilingDiv);
};

/**
 * This function hides the Ceiling Popover.
 */
CeilingPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.CeilingDiv.remove();
};