/**
 * Created by Austin03 on 10/5/16.
 */

function StartOverPopover(question, yesCallback, noCallback) {
    "use strict";
    //Constructor
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
                noCallback();
            })})
    ]});
}

StartOverPopover.prototype.show = function() {
    document.body.appendChild(this.StartOverPopoverBlock);
    document.body.appendChild(this.StartOverPopoverDiv);
};
StartOverPopover.prototype.hide = function() {
    this.StartOverPopoverBlock.remove();
    this.StartOverPopoverDiv.remove();
};