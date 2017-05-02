/**
 * Created by Austin03 on 2/21/17.
 *
 * This is a popover that allows editing project names and floor names.
 */

/**
 * Creates the form that allows the user to edit building or floor names.
 */
class EditNamePopover {

    /**
     * This function creates the Edit Name Popover.
     *
     * @param currentName: The name of the building/floor to be edited.
     * @param saveName: The function that will update the name of the building/floor.
     * @param labelText: The question being populated in the popover.
     * @constructor
     */
    constructor(currentName, saveName, labelText) {
        this.EditNamePopoverBlock = CreateElement({
            type: 'div',
            className: 'EditNamePopover_Block'
        });
        this.EditNamePopoverDiv = CreateElement({
            type: 'div',
            className: 'EditNamePopover_Div',
            elements: [
                this.NameLabel = CreateElement({
                    type: 'label',
                    className: 'EditNamePopover_Label',
                    text: labelText
                }),
                this.NameTextBox = CreateElement({
                    type: 'input',
                    className: 'EditNamePopover_TextBox',
                    value: currentName
                }),
                this.SaveButton = CreateElement({
                    type: 'button',
                    className: 'EditNamePopover_SaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, function () {
                        saveName(this.NameTextBox.value);
                        this.hide();
                    })
                }),
                this.cancelButton = CreateElement({
                    type: 'button',
                    className: 'EditNamePopover_CancelButton',
                    text: 'Cancel',
                    onClick: CreateFunction(this, function () {
                        this.hide();
                    })
                })
            ]
        });
    }

    /**
     * This function shows the Edit Name Popover.
     *
     * @param parent: The hvacApplication class that the Edit Name Popover is contained in.
     */
    show(parent) {
        parent.appendChild(this.EditNamePopoverBlock);
        parent.appendChild(this.EditNamePopoverDiv);
    };

    /**
     * This function hides the Edit Name Popover.
     */
    hide() {
        this.EditNamePopoverBlock.remove();
        this.EditNamePopoverDiv.remove();
    };
}