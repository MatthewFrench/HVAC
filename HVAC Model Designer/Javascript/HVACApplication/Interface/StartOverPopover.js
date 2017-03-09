/**
 * Created by Austin03 on 10/5/16.
 */

/*This function creates the Start Over Popover*/
function StartOverPopover(question, yesCallback, noCallback) {
    "use strict";
    //Constructor
    this.StartOverPopoverBlock = CreateElement({type: 'div', className: 'StartOverPopover_Block'});

    this.StartOverPopoverDiv = CreateElement({type: 'div', className: 'StartOverPopover_Div', elements: [
        this.StartOverLabel = CreateElement({type: 'label', className: 'StartOverPopover_Label', text: question}),
        this.StartOverYesButton = CreateElement({type: 'button', className: 'StartOverPopover_YesButton', text: 'Yes',
            onClick: CreateFunction(this, function () {
                this.hide();
                yesCallback();
            })}),
        this.cancelButton = CreateElement({type: 'button', className: 'StartOverPopover_CancelButton', text: 'Cancel',
            onClick: CreateFunction(this, function () {
                this.hide();
                noCallback();
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