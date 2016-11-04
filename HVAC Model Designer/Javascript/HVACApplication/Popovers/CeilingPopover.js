/**
 * Created by masse on 11/4/2016.
 */
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

CeilingPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.CeilingDiv);
};
CeilingPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.CeilingDiv.remove();
};