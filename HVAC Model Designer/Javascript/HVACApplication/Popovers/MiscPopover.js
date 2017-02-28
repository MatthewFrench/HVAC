/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Miscellaneous Popover code that will allow a user to input Information about
 * Miscellaneous items for calculating the U Value.
 */

/**
 * This function creates the Miscellaneous Popover.
 *
 * @constructor
 */
function MiscPopover() {
    this.backgroundDiv = CreateElement({
        type: 'div',
        class: 'MiscBGCover'
    });
    this.MiscDiv = CreateElement({
        type: 'div',
        class: 'MiscDiv',
        elements: [
            this.MiscSaveButton = CreateElement({
                type: 'button',
                class: 'MiscSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.MiscCancelButton = CreateElement({
                type: 'button',
                class: 'MiscCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

/**
 * This function shows the Miscellaneous Popover.
 *
 * @param parent: The hvacApplication class that the Misc Popover is contained in.
 */
MiscPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.MiscDiv);
};

/**
 * This function hides the Miscellaneous Popover.
 */
MiscPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.MiscDiv.remove();
};