/**
 * Created by AJ Massey on 10/26/2016.
 */

/**
 * This Code is the Window Popover code that will allow a user to input Information about windows for calculating
 * the U Value.
 */
class WindowPopover {

    /**
     * This function creates the Window Popover.
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'WindowBGCover'
        });
        this.WindowDiv = CreateElement({
            type: 'div',
            className: 'WindowDiv',
            elements: [
                this.WindowSaveButton = CreateElement({
                    type: 'button',
                    className: 'WindowSaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.WindowCancelButton = CreateElement({
                    type: 'button',
                    className: 'WindowCancelButton',
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
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.WindowDiv);
    };

    /**
     * This function hides the Window Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.WindowDiv.remove();
    };
}

