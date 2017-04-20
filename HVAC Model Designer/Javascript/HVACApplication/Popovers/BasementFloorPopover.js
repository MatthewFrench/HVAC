/**
 * Created by AJ Massey on 10/26/2016.
 */

/**
 * This Code is the Basement Floor Popover code that will allow a user to input Information about the
 * Basement Floor for calculating the U Value.
 */
class BasementFloorPopover {

    /**
     * This function creates the Basement Floor Popover.
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'BasementFloorBGCover'
        });
        this.BasementFloorDiv = CreateElement({
            type: 'div',
            className: 'BasementFloorDiv',
            elements: [
                this.BasementFloorSaveButton = CreateElement({
                    type: 'button',
                    className: 'BasementFloorSaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.BasementFloorCancelButton = CreateElement({
                    type: 'button',
                    className: 'BasementFloorCancelButton',
                    text: 'Cancel',
                    onClick: CreateFunction(this, this.hide)
                })
            ]
        });
    }

    /**
     * This function shows the Basement Floor Popover.
     */
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.BasementFloorDiv);
    };

    /**
     * This function hides the Basement Floor Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.BasementFloorDiv.remove();
    };
}