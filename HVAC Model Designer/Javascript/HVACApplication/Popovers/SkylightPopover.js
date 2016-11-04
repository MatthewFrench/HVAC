/**
 * Created by masse on 11/4/2016.
 */
function SkylightPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'SkylightBGCover'});
    this.SkylightDiv = CreateElement({
        type: 'div', class: 'SkylightDiv', elements: [
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

SkylightPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.SkylightDiv);
};
SkylightPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.SkylightDiv.remove();
};