/**
 * Created by Austin03 on 10/5/16.
 */

function DialogBox(question, yesCallback, noCallback) {
    "use strict";
    //Constructor
    this.dialogBoxBlock = CreateElement({type: 'div', class: 'DialogBox_Block'});

    this.dialogBoxDiv = CreateElement({type: 'div', class: 'DialogBox_Div', elements: [
        this.dialogLabel = CreateElement({type: 'label', class: 'DialogBox_Label', text: 'question'}),
        this.yesButton = CreateElement({type: 'button', class: 'DialogBox_YesButton', text: 'Yes'})
    ]});

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