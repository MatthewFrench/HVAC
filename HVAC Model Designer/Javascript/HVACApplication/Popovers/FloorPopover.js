/**
 * Created by masse on 11/4/2016.
 */
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

FloorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.FloorDiv);
};
FloorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.FloorDiv.remove();
};