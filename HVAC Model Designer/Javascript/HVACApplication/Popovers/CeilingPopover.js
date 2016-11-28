/**
 * Created by masse on 11/4/2016.
 */

//This function creates the Ceiling Popover
function CeilingPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'CeilingBGCover'});
    this.CeilingDiv = CreateElement({
        type: 'div', class: 'CeilingDiv', elements: [
            this.CeilingSaveButton = CreateElement({
                type: 'button',
                class: 'CeilingSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.CeilingCancelButton = CreateElement({
                type: 'button',
                class: 'CeilingCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Ceiling Popover
CeilingPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.CeilingDiv);
};

//This function hides the Ceiling Popover
CeilingPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.CeilingDiv.remove();
};