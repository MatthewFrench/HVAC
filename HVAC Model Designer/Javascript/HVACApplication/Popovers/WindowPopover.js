/**
 * Created by masse on 10/26/2016.
 */

//This function creates the Window Popover
function WindowPopover() {
    this.backgroundDiv = CreateElement({type: 'div', className: 'WindowBGCover'});
    this.WindowDiv = CreateElement({
        type: 'div', className: 'WindowDiv', elements: [
            this.WindowSaveButton = CreateElement({
                type: 'button',
                className: 'WindowSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.WindowCancelButton = CreateElement({
                type: 'button',
                className: 'WindowCancelButton',
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