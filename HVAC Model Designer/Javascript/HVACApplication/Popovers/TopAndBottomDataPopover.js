/**
 * Created by AJ Massey on 10/26/2016.
 */

/**
 * This Code is the Basement and Attic Popover code that will allow a user to input Information about Basements
 * and Attics for calculating the U Value.
 */
class TopAndBottomDataPopover {

    /**
     * This function creates the TopAndBottom Popover.
     */
    constructor() {
        var attic_stud_spacing_text;
        var attic_stud_spacing_text2;
        var attic_stud_spacing_text3;
        var attic_stud_spacing_text4;
        this.TopAndBottomDataDiv = null;
        this.saveDataButton = null;
        this.titleSpan = null;

        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'BackgroundCover'
        });
        this.TopAndBottomDataDiv = CreateElement({
            type: 'div',
            className: 'TopAndBottomDataDiv',
            elements: [
                this.saveDataButton = CreateElement({
                    type: 'button',
                    className: 'SaveDataButton',
                    text: 'Save Attic and Basement Data',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.titleSpan = CreateElement({
                    type: 'span',
                    className: 'AtticTitle',
                    text: 'Input Attic Data'
                }),
                this.StudSpacingElement = CreateElement({
                    type: 'StudSpacing',
                    className: 'StudSpacingElement',
                    text: 'Spacing of your Studs'
                }),
                this.StudSpacingButton = CreateElement({
                    type: 'select',
                    id: 'StudSpacing',
                    className: 'StudSpacingButton'
                }),
                this.StudSpacingElement = CreateElement({
                    type: 'StudHeight',
                    className: 'StudHeightElement',
                    text: 'Height of your Studs'
                }),
                this.StudHeightButton = CreateElement({
                    type: 'select',
                    id: 'StudHeight',
                    className: 'StudHeightButton'
                }),
                this.StudWidthElement = CreateElement({
                    type: 'StudWidth',
                    className: 'StudWidthElement',
                    text: 'Width of your Studs'
                }),
                this.StudWidthButton = CreateElement({
                    type: 'select',
                    id: 'StudWidth',
                    className: 'StudWidthButton'
                }),
                this.AtticInsulationElement = CreateElement({
                    type: 'AtticInsulation',
                    className: 'AtticInsulationElement',
                    text: 'Type of Insulation'
                }),
                this.AtticInsulationButton = CreateElement({
                    type: 'select',
                    id: 'AtticInsulation',
                    className: 'AtticInsulationButton'
                }),
                this.AtticInsulationDepthElement = CreateElement({
                    type: 'AtticDepthInsulation',
                    className: 'AtticInsulationDepthElement',
                    text: 'Depth of Attic Insulation'
                }),
                this.AtticInsulationDepthButton = CreateElement({
                    type: 'select',
                    id: 'AtticDepthInsulation',
                    className: 'AtticInsulationDepthButton'
                }),
                this.TotalAtticUValueElement = CreateElement({
                    type: 'TotalAtticUValue',
                    className: 'TotalAtticUValueElement',
                    text: 'Total Attic U Value'
                }),
                this.TotalAtticUValueText = CreateElement({
                    type: 'input',
                    id: 'TotalAtticUValue',
                    className: 'TotalAtticUValueText'
                })
            ]
        });

        var attic_stud_spacing_option = CreateElement({
            type: 'option',
            value: '12',
            elements:[
                attic_stud_spacing_text = document.createTextNode("12''")
            ],
            appendTo: this.StudSpacingButton
        });
        var attic_stud_spacing_option2 = CreateElement({
            type: 'option',
            value: '16',
            elements:[
                attic_stud_spacing_text2 = document.createTextNode("16''")
            ],
            appendTo: this.StudSpacingButton
        });
        var attic_stud_spacing_option3 = CreateElement({
            type: 'option',
            value: '19.2',
            elements:[
                attic_stud_spacing_text3 = document.createTextNode("19.2''")
            ],
            appendTo: this.StudSpacingButton
        });
        var attic_stud_spacing_option4 = CreateElement({
            type: 'option',
            value: '24',
            elements:[
                attic_stud_spacing_text4 = document.createTextNode("24''")
            ],
            appendTo: this.StudSpacingButton
        });
        this.StudSpacingButton.selectedIndex = -1;
    }

    /**
     * This function shows the Top&Bottom Popover.
     *
     * @param parent: The hvacApplication class that the Top&Bottom Popover is contained in.
     */
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.TopAndBottomDataDiv);
    };

    /**
     * This function hides the Top&Bottom Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.TopAndBottomDataDiv.remove();
    };
}

