/**
 * Created by Austin03 on 10/5/16.
 */

function DialogBox(question, yesCallback, noCallback) {
    "use strict";
    //Constructor
    this.dialogBoxBlock = CreateElement({type: 'div', class: 'DialogBox_Block'});

    this.dialogBoxDiv = CreateElement({type: 'div', class: 'DialogBox_Div', elements: [
        this.dialogLabel = CreateElement({type: 'label', class: 'DialogBox_Label', text: question}),
        this.yesButton = CreateElement({type: 'button', class: 'DialogBox_YesButton', text: 'Yes',
            onClick: CreateFunction(this, function () {
                this.hide();
                yesCallback();
            })}),
        this.cancelButton = CreateElement({type: 'button', class: 'DialogBox_CancelButton', text: 'Cancel',
            onClick: CreateFunction(this, function () {
                this.hide();
                noCallback();
            })})
    ]});
}

DialogBox.prototype.show = function() {
    document.body.appendChild(this.dialogBoxBlock);
    document.body.appendChild(this.dialogBoxDiv);
};
DialogBox.prototype.hide = function() {
    this.dialogBoxBlock.remove();
    this.dialogBoxDiv.remove();
};