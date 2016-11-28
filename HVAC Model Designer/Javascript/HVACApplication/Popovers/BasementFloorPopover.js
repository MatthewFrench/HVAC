/**
 * Created by masse on 11/4/2016.
 */

//This function creates the Basement Floor Popover
function BasementFloorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementFloorBGCover'});
    this.BasementFloorDiv = CreateElement({
        type: 'div', class: 'BasementFloorDiv', elements: [
            this.BasementFloorSaveButton = CreateElement({
                type: 'button',
                class: 'BasementFloorSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.BasementFloorCancelButton = CreateElement({
                type: 'button',
                class: 'BasementFloorCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

//This function shows the Basement Floor Popover
BasementFloorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementFloorDiv);
};

//This function hides the Basement Floor Popover
BasementFloorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementFloorDiv.remove();
};/**
 * Created by masse on 11/4/2016.
 */
