/**
 * Created by masse on 11/4/2016.
 */

/*This function creates the Glass Door Popover*/
function GlassDoorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', className: 'GlassDoorBGCover'});
    this.GlassDoorDiv = CreateElement({
        type: 'div', className: 'GlassDoorDiv', elements: [
            this.GlassDoorSaveButton = CreateElement({
                type: 'button',
                className: 'GlassDoorSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.GlassDoorCancelButton = CreateElement({
                type: 'button',
                className: 'GlassDoorCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

/*This function shows the Glass Door Popover*/
GlassDoorPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.GlassDoorDiv);
};

/*This function hides the Glassd Door Popover*/
GlassDoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.GlassDoorDiv.remove();
};