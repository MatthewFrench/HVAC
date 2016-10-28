/**
 * Created by masse on 10/26/2016.
 */
function MiscPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'MiscBGCover'});
    this.MiscDiv = CreateElement({
        type: 'div', class: 'MiscDiv', elements: [
            this.MiscSaveButton = CreateElement({
                type: 'button',
                class: 'MiscSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.MiscCancelButton = CreateElement({
                type: 'button',
                class: 'MiscCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

MiscPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.MiscDiv);
};
MiscPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.MiscDiv.remove();
};