/**
 * Created by masse on 10/10/2016.
 */
function TopAndBottomDataPopover() {
    "use strict";
    //Constructor
    this.TopAndBottomDataDiv = null;
    this.saveDataButton = null;
    this.titleSpan = null;
    this.backgroundDiv = CreateElement({type: 'div', class: 'BackgroundCover'});

    this.TopAndBottomDataDiv = CreateElement({type: 'div', class: 'TopAndBottomDataDiv', elements: [
        this.saveDataButton = CreateElement({type: 'button', class: 'SaveDataButton',
            text: 'Save Attic and Basement Data', onClick: CreateFunction(this, this.hide)}),
        this.titleSpan = CreateElement({type: 'span', class: 'AtticTitle', text: 'Input Attic Data'}),
        this.StudSpacingElement = CreateElement({type: 'StudSpacing', class: 'StudSpacingElement',
            text: 'Spacing of your Studs'}),
        this.StudSpacingButton = CreateElement({type: 'select', id: 'StudSpacing', class: 'StudSpacingButton'}),
        this.StudSpacingElement = CreateElement({type: 'StudHeight', class: 'StudHeightElement',
            text: 'Height of your Studs'}),
        this.StudHeightButton = CreateElement({type: 'select', id: 'StudHeight', class: 'StudHeightButton'}),
        this.StudWidthElement = CreateElement({type: 'StudWidth', class: 'StudWidthElement', text: 'Width of your Studs'}),
        this.StudWidthButton = CreateElement({type: 'select', id: 'StudWidth', class: 'StudWidthButton'}),
        this.AtticInsulationElement = CreateElement({type: 'AtticInsulation', class: 'AtticInsulationElement',
            text: 'Type of Insulation'}),
        this.AtticInsulationButton = CreateElement({type: 'select', id: 'AtticInsulation', class: 'AtticInsulationButton'}),
        this.AtticInsulationDepthElement = CreateElement({type: 'AtticDepthInsulation',
            class: 'AtticInsulationDepthElement', text: 'Depth of Attic Insulation'}),
        this.AtticInsulationDepthButton = CreateElement({type: 'select', id: 'AtticDepthInsulation',
            class: 'AtticInsulationDepthButton'}),
        this.titleSpan = CreateElement({type: 'span', class: 'BasementTitle', text: 'Input Basement Data'}),
        this.BasementCeilingButton = CreateElement({type: 'button', class: 'BasementCeilingButton',
            text: 'Input Basement Ceiling Data',
            onClick: CreateFunction(this, function() {
                var newPopover = new BasementCeilingPopover();
                newPopover.show();
            })}),
        this.BasementFloorButton = CreateElement({type: 'button', class: 'BasementFloorButton',
            text: 'Input Basement Floor Data',
            onClick: CreateFunction(this, function () {
                var newPopover = new BasementFloorPopover();
                newPopover.show();
            })}),
        this.BasementWindowButton = CreateElement({type: 'button', class: 'BasementWallButton',
            text: 'Input Basement Wall Data',
            onClick: CreateFunction(this, function () {
                var newPopover = new BasementWindowPopover();
                newPopover.show();
            })}),
        this.BasementWallButton = CreateElement({type: 'button', class: 'BasementWallButton',
            text: 'Input Basement Window Data',
            onClick: CreateFunction(this, function () {
                var newPopover = new BasementWallPopover();
                newPopover.show();
            })}),
        this.BasementDoorButton = CreateElement({type: 'button', class: 'BasementDoorButton',
            text: 'Input Basement Door Data',
            onClick: CreateFunction(this, function () {
                var newPopover = new BasementDoorPopover();
                newPopover.show();
            })})
    ]});
}
TopAndBottomDataPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.TopAndBottomDataDiv);
};
TopAndBottomDataPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.TopAndBottomDataDiv.remove();
};