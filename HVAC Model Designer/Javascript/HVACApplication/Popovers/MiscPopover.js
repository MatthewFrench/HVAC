/**
 * Created by masse on 10/26/2016.
 */

//This function creates the Miscellaneous Popover
function MiscPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'MiscBGCover'});
    this.MiscDiv = CreateElement({
        type: 'div', class: 'MiscDiv', elements: [
            this.MiscSaveButton = CreateElement({
                type: 'button',
                class: 'MiscSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.MiscCancelButton = CreateElement({
                type: 'button',
                class: 'MiscCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Miscellaneous Popover
MiscPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.MiscDiv);
};

//This function hides the Miscellaneous Popover
MiscPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.MiscDiv.remove();
};