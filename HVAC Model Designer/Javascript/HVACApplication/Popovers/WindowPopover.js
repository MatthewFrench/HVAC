/**
 * Created by masse on 10/26/2016.
 */
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

WindowPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.WindowDiv);
};
WindowPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WindowDiv.remove();
};