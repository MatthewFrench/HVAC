/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Basement Wall Popover code that will allow a user to input Information about the
 * Basement Walls for calculating the U Value.
 */

/**
 * Creates a new Basement Wall Popover and handles the functionality of it.
 */
class BasementWallPopover {

    /**
     * This function creates the Basement Wall Popover.
     *
     * @constructor
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'BasementWallBGCover'
        });
        this.BasementWallDiv = CreateElement({
            type: 'div',
            className: 'BasementWallDiv',
            elements: [
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
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.BasementWallDiv);
    };

    /**
     * This function hides the Basement Wall Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.BasementWallDiv.remove();
    };
}