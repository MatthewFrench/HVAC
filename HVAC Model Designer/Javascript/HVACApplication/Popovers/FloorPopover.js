/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Floor Popover code that will allow a user to input Information about the Floor for calculating
 * the U Value.
 */

/**
 * Creates a new Floor Popover and handles the functionality of it.
 */
class FloorPopover {

    /**
     * This function creates the Floor Popover.
     *
     * @constructor
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'FloorBGCover'
        });
        this.FloorDiv = CreateElement({
            type: 'div',
            className: 'FloorDiv',
            elements: [
                this.FloorSaveButton = CreateElement({
                    type: 'button',
                    className: 'FloorSaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.FloorCancelButton = CreateElement({
                    type: 'button',
                    className: 'FloorCancelButton',
                    text: 'Cancel',
                    onClick: CreateFunction(this, this.hide)
                })
            ]
        });
    }

    /**
     * This function shows the Floor Popover.
     *
     * @param parent: The hvacApplication class that the Floor Popover is contained in.
     */
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.FloorDiv);
    };

    /**
     * This function hides the Floor Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.FloorDiv.remove();
    };
}