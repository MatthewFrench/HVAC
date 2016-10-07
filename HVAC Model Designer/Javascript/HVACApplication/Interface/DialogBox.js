/**
 * Created by Austin03 on 10/5/16.
 */

function DialogBox() {
    "use strict";
    //Constructor
    this.dialogBoxDiv = null;

    this.dialogBoxDiv = document.createElement("div");
    this.dialogBoxDiv.className = "DialogBox_Div";

    this.dialogLabel = document.createElement("label");
    this.dialogLabel.className = "DialogBox_Label";
    this.dialogLabel.innerText = "Are you sure you want to start from scratch?";
    this.dialogBoxDiv.appendChild(this.dialogLabel);

    this.yesButton = document.createElement("button");
    this.yesButton.className = "DialogBox_YesButton";
    this.yesButton.innerText = "Yes";
    var self = this;
    this.yesButton.onclick = function () {
        self.hide();
    };
    this.dialogBoxDiv.appendChild(this.yesButton);

    this.cancelButton = document.createElement("button");
    this.cancelButton.className = "DialogBox_CancelButton";
    this.cancelButton.innerText = "Cancel";
    var selfish = this;
    this.cancelButton.onclick = function () {
        selfish.hide();
    };
    this.dialogBoxDiv.appendChild(this.cancelButton);
}

DialogBox.prototype.show = function() {
    document.body.appendChild(this.dialogBoxDiv);
};
DialogBox.prototype.hide = function() {
    this.dialogBoxDiv.remove();
};