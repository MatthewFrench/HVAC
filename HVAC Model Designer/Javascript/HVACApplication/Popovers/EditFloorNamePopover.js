/**
 * Created by Austin03 on 2/21/17.
 *
 * This class Creates the form that allows the user to edit floor names.
 */

/**
 * This function creates the Edit Floor Name Popover.
 *
 * @param floorName: The name of the floor to be edited.
 * @constructor
 */
function EditFloorNamePopover(floorName, saveName) {
    "use strict";

    this.EditFloorNamePopoverBlock = CreateElement({
        type: 'div',
        className: 'EditFloorNamePopover_Block'
    });

    this.EditFloorNamePopoverDiv = CreateElement({
        type: 'div',
        className: 'EditFloorNamePopover_Div',
        elements: [
            this.FloorNameLabel = CreateElement({
                type: 'label',
                className: 'EditFloorNamePopover_Label',
                text: "What would you like to name your floor?"
            }),
            this.FloorNameTextBox = CreateElement({
                type: 'input',
                className: 'EditFloorNamePopover_TextBox',
                value: floorName
            }),
            this.SaveButton = CreateElement({
                type: 'button',
                className: 'EditFloorNamePopover_SaveButton',
                text: 'Save',
                onClick: CreateFunction(this, function () {
                    saveName(this.FloorNameTextBox.value);
                    this.hide();
                })
            }),
            this.cancelButton = CreateElement({
                type: 'button',
                className: 'EditFloorNamePopover_CancelButton',
                text: 'Cancel',
                onClick: CreateFunction(this, function () {
                    this.hide();
                })
            })
        ]
    });
}

/**
 * This function shows the Edit Floor Name Popover.
 *
 * @param parent: The hvacApplication class that the Edit Floor Name Popover is contained in.
 */
EditFloorNamePopover.prototype.show = function(parent) {
    parent.appendChild(this.EditFloorNamePopoverBlock);
    parent.appendChild(this.EditFloorNamePopoverDiv);
};

/**
 * This function hides the Edit Floor Name Popover.
 */
EditFloorNamePopover.prototype.hide = function() {
    this.EditFloorNamePopoverBlock.remove();
    this.EditFloorNamePopoverDiv.remove();
};