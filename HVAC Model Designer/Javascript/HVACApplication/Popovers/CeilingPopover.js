/**
 * Created by masse on 11/4/2016.
 */

//This function creates the Ceiling Popover
function CeilingPopover() {
    this.backgroundDiv = CreateElement({type: 'div', className: 'CeilingBGCover'});
    this.CeilingDiv = CreateElement({
        type: 'div', className: 'CeilingDiv', elements: [
            this.CeilingSaveButton = CreateElement({
                type: 'button',
                className: 'CeilingSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.CeilingCancelButton = CreateElement({
                type: 'button',
                className: 'CeilingCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Ceiling Popover
CeilingPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.CeilingDiv);
};

//This function hides the Ceiling Popover
CeilingPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.CeilingDiv.remove();
};