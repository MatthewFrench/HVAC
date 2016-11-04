/**
 * Created by masse on 11/4/2016.
 */
function GlassDoorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'GlassDoorBGCover'});
    this.GlassDoorDiv = CreateElement({
        type: 'div', class: 'GlassDoorDiv', elements: [
            this.GlassDoorSaveButton = CreateElement({
                type: 'button',
                class: 'GlassDoorSaveButton',
                text: 'Save',
                onClick: CreateFunction(this, this.hide)
            }),
            this.GlassDoorCancelButton = CreateElement({
                type: 'button',
                class: 'GlassDoorCancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, this.hide)
            })
        ]
    });
}

GlassDoorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.GlassDoorDiv);
};
GlassDoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.GlassDoorDiv.remove();
};