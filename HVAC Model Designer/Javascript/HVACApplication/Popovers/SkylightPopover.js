/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Skylight Popover code that will allow a user to input Information about Skylights for calculating
 * the U Value
 */

//This function creates the Skylight Popover
function SkylightPopover() {
    this.backgroundDiv = CreateElement({
        type: 'div',
        class: 'SkylightBGCover'
    });
    this.SkylightDiv = CreateElement({
        type: 'div',
        class: 'SkylightDiv',
        elements: [
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