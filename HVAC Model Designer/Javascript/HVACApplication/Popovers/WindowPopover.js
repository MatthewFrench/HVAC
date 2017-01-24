/**
 * Created by masse on 10/26/2016.
 */

//This function creates the Window Popover
function WindowPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'WindowBGCover'});
    this.WindowDiv = CreateElement({
        type: 'div', class: 'WindowDiv', elements: [
            this.WindowSaveButton = CreateElement({
                type: 'button',
                class: 'WindowSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.WindowCancelButton = CreateElement({
                type: 'button',
                class: 'WindowCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Window Popover
WindowPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.WindowDiv);
};

//This function hides the Window Popover
WindowPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WindowDiv.remove();
};