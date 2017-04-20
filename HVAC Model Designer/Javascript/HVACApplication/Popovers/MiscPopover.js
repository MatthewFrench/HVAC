/**
 * Created by AJ Massey on 10/26/2016.
 */

/**
 * This Code is the Miscellaneous Popover code that will allow a user to input Information about
 * Miscellaneous items for calculating the U Value.
 */
class MiscPopover {
    /**
     * This function creates the Miscellaneous Popover.
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'MiscBGCover'
        });
        this.MiscDiv = CreateElement({
            type: 'div',
            className: 'MiscDiv',
            elements: [
                this.MiscSaveButton = CreateElement({
                    type: 'button',
                    className: 'MiscSaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.MiscCancelButton = CreateElement({
                    type: 'button',
                    className: 'MiscCancelButton',
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
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.MiscDiv);
    };

    /**
     * This function hides the Miscellaneous Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.MiscDiv.remove();
    };
}

