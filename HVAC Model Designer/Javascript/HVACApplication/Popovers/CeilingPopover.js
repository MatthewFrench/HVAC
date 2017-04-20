/**
 * Created by AJ Massey on 10/26/2016.
 */

/**
 * This Code is the Ceiling Popover code that will allow a user to input Information about Ceilings for calculating
 * the U Value.
 */
class CeilingPopover {

    /**
     * This function creates the Ceiling Popover.
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'CeilingBGCover'
        });
        this.CeilingDiv = CreateElement({
            type: 'div',
            className: 'CeilingDiv',
            elements: [
                this.CeilingSaveButton = CreateElement({
                    type: 'button',
                    className: 'CeilingSaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.CeilingCancelButton = CreateElement({
                    type: 'button',
                    className: 'CeilingCancelButton',
                    text: 'Cancel',
                    onClick: CreateFunction(this, this.hide)
                })
            ]
        });
    }

    /**
     * This function shows the Ceiling Popover.
     */
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.CeilingDiv);
    };

    /**
     * This function hides the Ceiling Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.CeilingDiv.remove();
    };
}