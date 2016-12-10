/**
 * Created by masse on 11/4/2016.
 */

//This function creates the Skylight Popover
function SkylightPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'SkylightBGCover'});
    this.SkylightDiv = CreateElement({
        type: 'div', class: 'SkylightDiv', elements: [
            this.SkylightSaveButton = CreateElement({
                type: 'button',
                class: 'SkylightSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.SkylightCancelButton = CreateElement({
                type: 'button',
                class: 'SkylightCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Skylight Popover
SkylightPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.SkylightDiv);
};

//This function hides the Skylight Popover
SkylightPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.SkylightDiv.remove();
};