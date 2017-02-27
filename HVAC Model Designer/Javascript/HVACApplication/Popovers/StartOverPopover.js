/**
 * Created by Austin03 on 10/5/16.
 */

/**
 * This function creates the Start Over Popover.
 *
 * @param question
 * @param yesCallback
 * @constructor
 */
function StartOverPopover(question, yesCallback) {
    "use strict";

    this.StartOverPopoverBlock = CreateElement({type: 'div', class: 'StartOverPopover_Block'});

    this.StartOverPopoverDiv = CreateElement({type: 'div', class: 'StartOverPopover_Div', elements: [
        this.StartOverLabel = CreateElement({type: 'label', class: 'StartOverPopover_Label', text: question}),
        this.StartOverYesButton = CreateElement({type: 'button', class: 'StartOverPopover_YesButton', text: 'Yes',
            onClick: CreateFunction(this, function () {
                this.hide();
                yesCallback();
            })}),
        this.cancelButton = CreateElement({type: 'button', class: 'StartOverPopover_CancelButton', text: 'Cancel',
            onClick: CreateFunction(this, function () {
                this.hide();
            })})
    ]});
}

/*This function shows the Start Over Popover*/
StartOverPopover.prototype.show = function(parent) {
    parent.appendChild(this.StartOverPopoverBlock);
    parent.appendChild(this.StartOverPopoverDiv);
};

/*This function hides the Start Over Popover*/
StartOverPopover.prototype.hide = function() {
    this.StartOverPopoverBlock.remove();
    this.StartOverPopoverDiv.remove();
};