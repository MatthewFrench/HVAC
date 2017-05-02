/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Wall Popover code that will allow a user to input Information about walls for calculating
 * the U Value.
 */

/**
 * Creates a new Wall Popover and handles the functionality of it.
 */
class WallPopover {

    /**
     * This function creates the Wall Popover.
     *
     * @constructor
     */
    constructor() {
        this.backgroundDiv = CreateElement({
            type: 'div',
            className: 'WallBGCover'
        });

        /**
         * This function creates all of the buttons for the Wall Properties
         */
        this.WallDiv = CreateElement({
            type: 'div',
            className: 'WallDiv',
            elements: [
                this.InsulationMaterialsElement = CreateElement({
                    type: 'InsulationMaterials',
                    className: 'InsulationMaterialsElement',
                    text: 'Type of Insulation Material'
                }),
                this.InsulationMaterialsButton = CreateElement({
                    type: 'select',
                    id: 'InsulationMaterials',
                    className: 'InsulationMaterialsButton'
                }),
                this.InsulationDetailsElement = CreateElement({
                    type: 'InsulationDetails',
                    className: 'InsulationDetailsElement',
                    text: 'Choose Thickness of Insulation'
                }),
                this.InsulationDetailsButton = CreateElement({
                    type: 'select',
                    id: 'InsulationDetails',
                    className: 'InsulationDetailsButton'
                }),
                this.ConstructionMaterialsElement = CreateElement({
                    type: 'ConstructionMaterials',
                    className: 'ConstructionMaterialsElement',
                    text: 'Type of Construction Material'
                }),
                this.ConstructionMaterialsButton = CreateElement({
                    type: 'select',
                    id: 'ConstructionMaterials',
                    className: 'ConstructionMaterialsButton'
                }),
                this.SheathingMaterialsElement = CreateElement({
                    type: 'SheathingMaterials',
                    className: 'SheathingMaterialsElement',
                    text: 'Type of Sheathing Material'
                }),
                this.SheathingMaterialsButton = CreateElement({
                    type: 'select',
                    id: 'SheathingMaterials',
                    className: 'SheathingMaterialsButton'
                }),
                this.SheathingDetailsElement = CreateElement({
                    type: 'SheathingDetails',
                    className: 'SheathingDetailsElement',
                    text: 'Choose Thickness of Sheathing'
                }),
                this.SheathingDetailsButton = CreateElement({
                    type: 'select',
                    id: 'SheathingDetails',
                    className: 'SheathingDetailsButton'
                }),
                this.SidingMaterialsElement = CreateElement({
                    type: 'SidingMaterials',
                    className: 'SidingMaterialsElement',
                    text: 'Type of Siding Material'
                }),
                this.SidingMaterialsButton = CreateElement({
                    type: 'select',
                    id: 'SidingMaterials',
                    className: 'SidingMaterialsButton'
                }),
                this.InteriorFinishElement = CreateElement({
                    type: 'InteriorFinish',
                    className: 'InteriorFinishElement',
                    text: 'Type of Interior Finish'
                }),
                this.InteriorFinishButton = CreateElement({
                    type: 'select',
                    id: 'InteriorFinish',
                    className: 'InteriorFinishButton'
                }),
                this.WallSaveButton = CreateElement({
                    type: 'button',
                    className: 'WallSaveButton',
                    text: 'Save',
                    onClick: CreateFunction(this, this.hide)
                }),
                this.WallCancelButton = CreateElement({
                    type: 'button',
                    className: 'WallCancelButton',
                    text: 'Cancel',
                    onClick: CreateFunction(this, this.hide)
                })
            ]
        });

        /**
         * Creating the options for the Insulation Materials
         */
        var InsulationOption = CreateElement({
            type: 'option',
            value: 'Fiberglass Batts',
            elements: [
                this.InsulationText = document.createTextNode("Fiberglass Batts")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption2 = CreateElement({
            type: 'option',
            value: 'Fiberglass Blown',
            elements: [
                this.InsulationText = document.createTextNode("Fiberglass Blown")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption3 = CreateElement({
            type: 'option',
            value: 'Rock Wool Batt',
            elements: [
                this.InsulationText = document.createTextNode("Rock Wool Batt")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption4 = CreateElement({
            type: 'option',
            value: 'Rock Wool Blown',
            elements: [
                this.InsulationText = document.createTextNode("Rock Wool Blown")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption5 = CreateElement({
            type: 'option',
            value: 'Cellulose Blown',
            elements: [
                this.InsulationText = document.createTextNode("Cellulose Blown")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption6 = CreateElement({
            type: 'option',
            value: 2.13,
            elements: [
                this.InsulationText = document.createTextNode("Vermiculite")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption7 = CreateElement({
            type: 'option',
            value: 1.05,
            elements: [
                this.InsulationText = document.createTextNode("Autoclaved Aerated Concrete")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption8 = CreateElement({
            type: 'option',
            value: 4.48,
            elements: [
                this.InsulationText = document.createTextNode("Urea Terpolymer Foam")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption9 = CreateElement({
            type: 'option',
            value: 4.00,
            elements: [
                this.InsulationText = document.createTextNode("Rigid Fiberglass")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption10 = CreateElement({
            type: 'option',
            value: 4.00,
            elements: [
                this.InsulationText = document.createTextNode("Expanded Polystyrene (Beadboard)")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption11 = CreateElement({
            type: 'option',
            value: 5.00,
            elements: [
                this.InsulationText = document.createTextNode("Extruded Polystyrene")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption12 = CreateElement({
            type: 'option',
            value: 6.25,
            elements: [
                this.InsulationText = document.createTextNode("Polyurethane (Foamed-in-Place)")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        var InsulationOption13 = CreateElement({
            type: 'option',
            value: 'Polyisocyanurate (Foil-Faced)',
            elements: [
                this.InsulationText = document.createTextNode("Polyisocyanurate (Foil-Faced)")
            ],
            appendTo: this.InsulationMaterialsButton
        });
        this.InsulationMaterialsButton.selectedIndex = -1;

        /**
         * Creating the options for the Insulation Materials Thickness
         */
        this.InsulationMaterialsButton.onchange = CreateFunction(this, function () {
            var sel = this.InsulationMaterialsButton
            var first = sel.options[sel.selectedIndex];
            var i;
            for (i = this.InsulationDetailsButton.options.length - 1; i >= 0; i--) {
                this.InsulationDetailsButton.remove(i);
            }
            this.InsulationDetailsButton.style.display = "block";
            this.ConstructionMaterialsButton.style.display = "none";
            this.InsulationDetailsButton.style.opacity = "1.0";
            this.InsulationDetailsElement.style.opacity = "1.0";
            this.ConstructionMaterialsElement.style.opacity = "0.0";
            if (first.value == 'Fiberglass Batts') {
                var InsulationDetailsOption = CreateElement({
                    type: 'option',
                    value: 11.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("3 1/2''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption2 = CreateElement({
                    type: 'option',
                    value: 13.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("3 5/8''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption3 = CreateElement({
                    type: 'option',
                    value: 15.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("3 1/2''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption4 = CreateElement({
                    type: 'option',
                    value: 19.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("6 1/2''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption5 = CreateElement({
                    type: 'option',
                    value: 21.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("5 1/4'' High Density")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption6 = CreateElement({
                    type: 'option',
                    value: 25.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("8''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption7 = CreateElement({
                    type: 'option',
                    value: 30.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("8'' High Density")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption8 = CreateElement({
                    type: 'option',
                    value: 30.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("9 1/2''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
                var InsulationDetailsOption9 = CreateElement({
                    type: 'option',
                    value: 38.00,
                    elements: [
                        this.InsulationDetailsText = document.createTextNode("12''")
                    ],
                    appendTo: this.InsulationDetailsButton
                });
            }
            else {
                this.InsulationDetailsButton.onchange();
            }
            this.InsulationDetailsButton.selectedIndex = -1;
        });

        /**
         * Creating the options for the Construction Materials
         */
        this.InsulationDetailsButton.onchange = CreateFunction(this, function () {
            var i;
            for (i = this.ConstructionMaterialsButton.options.length - 1; i >= 0; i--) {
                this.ConstructionMaterialsButton.remove(i);
            }
            this.InsulationDetailsButton.style.display = "none";
            this.ConstructionMaterialsButton.style.display = "block";
            this.InsulationDetailsElement.style.opacity = "0.0";
            this.ConstructionMaterialsElement.style.opacity = "1.0";
            this.ConstructionMaterialsButton.style.opacity = "1.0";
            var ConstructionMaterialsOption = CreateElement({
                type: 'option',
                value: .8,
                elements: [
                    this.ConstructionMaterialsText = document.createTextNode("Concrete Block 4''")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption2 = CreateElement({
                type: 'option',
                value: 1.11,
                elements: [
                    this.ConstructionMaterialsText2 = document.createTextNode("Concrete Block 8''")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption3 = CreateElement({
                type: 'option',
                value: 1.28,
                elements: [
                    this.ConstructionMaterialsText3 = document.createTextNode("Concrete Block 12''")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption4 = CreateElement({
                type: 'option',
                value: .8,
                elements: [
                    this.ConstructionMaterialsText4 = document.createTextNode("Brick 4'' Common")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption5 = CreateElement({
                type: 'option',
                value: .44,
                elements: [
                    this.ConstructionMaterialsText5 = document.createTextNode("Brick 4'' Face")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption6 = CreateElement({
                type: 'option',
                value: .08,
                elements: [
                    this.ConstructionMaterialsText6 = document.createTextNode("Poured Concrete")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption7 = CreateElement({
                type: 'option',
                value: 1.25,
                elements: [
                    this.ConstructionMaterialsText7 = document.createTextNode("Soft Wood Lumber")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption8 = CreateElement({
                type: 'option',
                value: 1.88,
                elements: [
                    this.ConstructionMaterialsText8 = document.createTextNode("Lumber 2'' Nominal (1 1/2'')")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption9 = CreateElement({
                type: 'option',
                value: 4.38,
                elements: [
                    this.ConstructionMaterialsText9 = document.createTextNode("Lumber 2x4 (3 1/2'')")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption10 = CreateElement({
                type: 'option',
                value: 6.88,
                elements: [
                    this.ConstructionMaterialsText10 = document.createTextNode("Lumber 2x6 (5 1/2'')")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            var ConstructionMaterialsOption11 = CreateElement({
                type: 'option',
                value: 1.33,
                elements: [
                    this.ConstructionMaterialsText11 = document.createTextNode("Cedar Logs and Lumber")
                ],
                appendTo: this.ConstructionMaterialsButton
            });
            this.ConstructionMaterialsButton.selectedIndex = -1;
        });

        /**
         * Creating the options for the Sheathing Materials
         */
        this.ConstructionMaterialsButton.onchange = CreateFunction(this, function () {
            var i;
            for (i = this.SheathingMaterialsButton.options.length - 1; i >= 0; i--) {
                this.SheathingMaterialsButton.remove(i);
            }
            this.SheathingMaterialsElement.style.opacity = "1.0";
            this.SheathingMaterialsButton.style.opacity = "1.0";
            var SheathingMaterialsOption = CreateElement({
                type: 'option',
                value: 'PW',
                elements: [
                    this.SheathingMaterialsText = document.createTextNode("Plywood")
                ],
                appendTo: this.SheathingMaterialsButton
            });
            var SheathingMaterialsOption2 = CreateElement({
                type: 'option',
                value: 'FB',
                elements: [
                    this.SheathingMaterialsText = document.createTextNode("Fiberboard")
                ],
                appendTo: this.SheathingMaterialsButton
            });
            var SheathingMaterialsOption3 = CreateElement({
                type: 'option',
                value: 'FG',
                elements: [
                    this.SheathingMaterialsText = document.createTextNode("Fiberglass")
                ],
                appendTo: this.SheathingMaterialsButton
            });
            var SheathingMaterialsOption4 = CreateElement({
                type: 'option',
                value: 'EP',
                elements: [
                    this.SheathingMaterialsText = document.createTextNode("Extruded Polystyrene")
                ],
                appendTo: this.SheathingMaterialsButton
            });
            var SheathingMaterialsOption5 = CreateElement({
                type: 'option',
                value: 'FFP',
                elements: [
                    this.SheathingMaterialsText = document.createTextNode("Foil-Faced Polyisocyanurate")
                ],
                appendTo: this.SheathingMaterialsButton
            });
            this.SheathingMaterialsButton.selectedIndex = -1;
        });

        /**
         * Creating the options for the Sheathing Materials Thickness
         */
        this.SheathingMaterialsButton.onchange = CreateFunction(this, function () {
            var sel = this.SheathingMaterialsButton;
            var first = sel.options[sel.selectedIndex];
            var i;
            for (i = this.SheathingDetailsButton.options.length - 1; i >= 0; i--) {
                this.SheathingDetailsButton.remove(i);
            }
            this.SheathingDetailsButton.style.display = "block";
            this.SidingMaterialsButton.style.display = "none";
            this.SheathingDetailsButton.style.opacity = "1.0";
            this.SheathingDetailsElement.style.opacity = "1.0";
            this.SidingMaterialsElement.style.opacity = "0.0";
            if (first.value == 'PW') {
                var SheathingDetailsOption = CreateElement({
                    type: 'option',
                    value: .31,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1/4''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption2 = CreateElement({
                    type: 'option',
                    value: .47,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("3/8''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption3 = CreateElement({
                    type: 'option',
                    value: .63,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1/2''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption4 = CreateElement({
                    type: 'option',
                    value: .77,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("5/8''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption5 = CreateElement({
                    type: 'option',
                    value: .94,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("3/4''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption6 = CreateElement({
                    type: 'option',
                    value: 1.25,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
            }
            else if (first.value == 'FB') {
                var SheathingDetailsOption = CreateElement({
                    type: 'option',
                    value: 1.32,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1/2''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption2 = CreateElement({
                    type: 'option',
                    value: 2.06,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("25/32''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption3 = CreateElement({
                    type: 'option',
                    value: 2.64,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
            }
            else if (first.value == 'FG') {
                var SheathingDetailsOption = CreateElement({
                    type: 'option',
                    value: 3.00,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("3/4''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption2 = CreateElement({
                    type: 'option',
                    value: 4.00,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption3 = CreateElement({
                    type: 'option',
                    value: 6.00,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1 1/2''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
            }
            else if (first.value == 'EP') {
                var SheathingDetailsOption = CreateElement({
                    type: 'option',
                    value: 3.75,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("3/4''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption2 = CreateElement({
                    type: 'option',
                    value: 5.00,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption3 = CreateElement({
                    type: 'option',
                    value: 7.50,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1 1/2''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
            }
            else if (first.value == 'FFP') {
                var SheathingDetailsOption = CreateElement({
                    type: 'option',
                    value: 5.40,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("3/4''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption2 = CreateElement({
                    type: 'option',
                    value: 7.20,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
                var SheathingDetailsOption3 = CreateElement({
                    type: 'option',
                    value: 10.80,
                    elements: [
                        this.SheathingDetailsText = document.createTextNode("1 1/2''")
                    ],
                    appendTo: this.SheathingDetailsButton
                });
            }
            this.SheathingDetailsButton.selectedIndex = -1;
        });

        /**
         * Creating the options for the Siding Materials
         */
        this.SheathingDetailsButton.onchange = CreateFunction(this, function () {
            var i;
            for (i = this.SidingMaterialsButton.options.length - 1; i >= 0; i--) {
                this.SidingMaterialsButton.remove(i);
            }
            this.SheathingDetailsButton.style.display = "none";
            this.SidingMaterialsButton.style.display = "block";
            this.SheathingDetailsElement.style.opacity = "0.0";
            this.SidingMaterialsElement.style.opacity = "1.0";
            this.SidingMaterialsButton.style.opacity = "1.0";
            var SidingMaterialsOption = CreateElement({
                type: 'option',
                value: 0.34,
                elements: [
                    this.SidingMaterialsText = document.createTextNode("Hardboard")
                ],
                appendTo: this.SidingMaterialsButton
            });
            var SidingMaterialsOption2 = CreateElement({
                type: 'option',
                value: 0.77,
                elements: [
                    this.SidingMaterialsText2 = document.createTextNode("Plywood 5/8''")
                ],
                appendTo: this.SidingMaterialsButton
            });
            var SidingMaterialsOption3 = CreateElement({
                type: 'option',
                value: 0.93,
                elements: [
                    this.SidingMaterialsText3 = document.createTextNode("Plywood 3/4''")
                ],
                appendTo: this.SidingMaterialsButton
            });
            var SidingMaterialsOption4 = CreateElement({
                type: 'option',
                value: 0.80,
                elements: [
                    this.SidingMaterialsText4 = document.createTextNode("Wood Beveled Lapped")
                ],
                appendTo: this.SidingMaterialsButton
            });
            var SidingMaterialsOption5 = CreateElement({
                type: 'option',
                value: 0.61,
                elements: [
                    this.SidingMaterialsText5 = document.createTextNode("Alum, Steel, Vinyl (Hollow Back)")
                ],
                appendTo: this.SidingMaterialsButton
            });
            var SidingMaterialsOption6 = CreateElement({
                type: 'option',
                value: 1.80,
                elements: [
                    this.SidingMaterialsText6 = document.createTextNode("Alum, Steel, Vinyl (w/ 1/2'' board)")
                ],
                appendTo: this.SidingMaterialsButton
            });
            var SidingMaterialsOption7 = CreateElement({
                type: 'option',
                value: 0.44,
                elements: [
                    this.SidingMaterialsText7 = document.createTextNode("Brick 4''")
                ],
                appendTo: this.SidingMaterialsButton
            });
            this.SidingMaterialsButton.selectedIndex = -1;
        });

        /**
         * Creating the options for the Interior Finish Materials
         */
        this.SidingMaterialsButton.onchange = CreateFunction(this, function () {
            var i;
            for (i = this.InteriorFinishButton.options.length - 1; i >= 0; i--) {
                this.InteriorFinishButton.remove(i);
            }
            this.InteriorFinishElement.style.opacity = "1.0";
            this.InteriorFinishButton.style.opacity = "1.0";
            var InteriorFinishOption = CreateElement({
                type: 'option',
                value: 0.45,
                elements: [
                    this.InteriorFinishText = document.createTextNode("Gypsum Board 1/2''")
                ],
                appendTo: this.InteriorFinishButton
            });
            var InteriorFinishOption2 = CreateElement({
                type: 'option',
                value: 0.56,
                elements: [
                    this.InteriorFinishText2 = document.createTextNode("Gypsum Board 5/8''")
                ],
                appendTo: this.InteriorFinishButton
            });
            var InteriorFinishOption3 = CreateElement({
                type: 'option',
                value: 0.47,
                elements: [
                    this.InteriorFinishText3 = document.createTextNode("Paneling 3/8''")
                ],
                appendTo: this.InteriorFinishButton
            });
            this.InteriorFinishButton.selectedIndex = -1;
        });

        //Set Insulation material start
        this.InsulationMaterialsButton.selectedIndex = 0;
        this.InsulationMaterialsButton.onchange();
    }

    /**
     * This function shows the Wall Popover.
     *
     * @param parent: The hvacApplication class that the StartOver Popover is contained in.
     */
    show(parent) {
        parent.appendChild(this.backgroundDiv);
        parent.appendChild(this.WallDiv);
    }

    /**
     * This function hides the Wall Popover.
     */
    hide() {
        this.backgroundDiv.remove();
        this.WallDiv.remove();
    }
}