/**
 * Created by masse on 11/4/2016.
 */

/*This function creates the Floor Popover*/
function FloorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'FloorBGCover'});
    this.FloorDiv = CreateElement({
        type: 'div', class: 'FloorDiv', elements: [
            this.FloorSaveButton = CreateElement({
                type: 'button',
                class: 'FloorSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.FloorCancelButton = CreateElement({
                type: 'button',
                class: 'FloorCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

/*This function shows the Floor Popover*/
FloorPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.FloorDiv);
};

/*This function hides the Floor Popover*/
FloorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.FloorDiv.remove();
};