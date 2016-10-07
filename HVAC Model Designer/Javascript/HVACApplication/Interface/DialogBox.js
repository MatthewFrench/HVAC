/**
 * Created by Austin03 on 10/5/16.
 */

function DialogBox(question, yesCallback, noCallback) {
    "use strict";
    //Constructor
    this.dialogBoxBlock = document.createElement('div');
    this.dialogBoxBlock.className = 'DialogBox_Block';

    this.dialogBoxDiv = document.createElement("div");
    this.dialogBoxDiv.className = "DialogBox_Div";

    this.dialogLabel = document.createElement("label");
    this.dialogLabel.className = "DialogBox_Label";
    this.dialogLabel.innerText = question;
    this.dialogBoxDiv.appendChild(this.dialogLabel);

    this.yesButton = document.createElement("button");
    this.yesButton.className = "DialogBox_YesButton";
    this.yesButton.innerText = "Yes";
    var self = this;
    this.yesButton.onclick = function () {
        self.hide();
        yesCallback();
    };
    this.dialogBoxDiv.appendChild(this.yesButton);

    this.cancelButton = document.createElement("button");
    this.cancelButton.className = "DialogBox_CancelButton";
    this.cancelButton.innerText = "Cancel";
    var selfish = this;
    this.cancelButton.onclick = function () {
        selfish.hide();
        noCallback();
    };
    this.dialogBoxDiv.appendChild(this.cancelButton);
}

DialogBox.prototype.show = function() {
    document.body.appendChild(this.dialogBoxBlock);
    document.body.appendChild(this.dialogBoxDiv);
};
DialogBox.prototype.hide = function() {
    this.dialogBoxBlock.remove();
    this.dialogBoxDiv.remove();
};