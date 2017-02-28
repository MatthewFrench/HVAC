/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Window Popover code that will allow a user to input Information about windows for calculating
 * the U Value.
 */

/**
 * This function creates the Window Popover.
 *
 * @constructor
 */
function WindowPopover() {
    this.backgroundDiv = CreateElement({
        type: 'div',
        class: 'WindowBGCover'
    });
    this.WindowDiv = CreateElement({
        type: 'div',
        class: 'WindowDiv',
        elements: [
            this.WindowSaveButton = CreateElement({
                type: 'button',
                class: 'WindowSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.WindowCancelButton = CreateElement({
                type: 'button',
                class: 'WindowCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

/**
 * This function shows the Window Popover.
 *
 * @param parent: The hvacApplication class that the StartOver Popover is contained in.
 */
WindowPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.WindowDiv);
};

/**
 * This function hides the Window Popover.
 */
WindowPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WindowDiv.remove();
};