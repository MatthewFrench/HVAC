/**
 * Created by Austin03 on 10/5/16.
 */

/**
 * This class Creates the form that allows the user reset the canvas and start from scratch.
 */
class StartOverPopover {

    /**
     * This function creates the Start Over Popover.
     *
     * @param question: The question that is being asked and placed as a Label in the form.
     * @param yesCallback: The function that is called if 'Yes' is clicked on.
     * @constructor
     */
    constructor(question, yesCallback) {
        this.StartOverPopoverBlock = CreateElement({
            type: 'div',
            className: 'StartOverPopover_Block'
        });
        this.StartOverPopoverDiv = CreateElement({
            type: 'div',
            className: 'StartOverPopover_Div',
            elements: [
                this.StartOverLabel = CreateElement({
                    type: 'label',
                    className: 'StartOverPopover_Label',
                    text: question
                }),
                this.StartOverYesButton = CreateElement({
                    type: 'button',
                    className: 'StartOverPopover_YesButton',
                    text: 'Yes',
                    onClick: CreateFunction(this, function () {
                        this.hide();
                        yesCallback();
                    })
                }),
                this.cancelButton = CreateElement({
                    type: 'button',
                    className: 'StartOverPopover_CancelButton',
                    text: 'Cancel',
                    onClick: CreateFunction(this, function () {
                        this.hide();
                    })
                })
            ]
        });
    }

    /**
     * This function shows the Start Over Popover.
     *
     * @param parent: The hvacApplication class that the StartOver Popover is contained in.
     */
    show(parent) {
        parent.appendChild(this.StartOverPopoverBlock);
        parent.appendChild(this.StartOverPopoverDiv);
    };

    /**
     * This function hides the Start Over Popover.
     */
    hide() {
        this.StartOverPopoverBlock.remove();
        this.StartOverPopoverDiv.remove();
    };
}

