/**
 * Created by AJ Massey on 10/26/2016.
 *
 * This Code is the Wall Popover code that will allow a user to input Information about walls for calculating
 * the U Value.
 */

/**
 * This function creates the Wall Popover.
 *
 * @constructor
 */
function WallPopover() {
/*
    this.backgroundDiv = CreateElement({type: 'div', className: 'WallBGCover'});
    this.WallDiv = CreateElement({
        type: 'div', className: 'WallDiv', elements: [
*/
    var self = this;

    this.backgroundDiv = CreateElement({
        type: 'div',
        className: 'WallBGCover'
    });
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
    var InsulationOption = CreateElement({
        type: 'option',
        value: 'Fiberglass Batts',
        elements: [
            InsulationText = document.createTextNode("Fiberglass Batts")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption2 = CreateElement({
        type: 'option',
        value: 'Fiberglass Blown',
        elements: [
            InsulationText2 = document.createTextNode("Fiberglass Blown")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption3 = CreateElement({
        type: 'option',
        value: 'Rock Wool Batt',
        elements: [
            InsulationText3 = document.createTextNode("Rock Wool Batt")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption4 = CreateElement({
        type: 'option',
        value: 'Rock Wool Blown',
        elements: [
            InsulationText4 = document.createTextNode("Rock Wool Blown")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption5 = CreateElement({
        type: 'option',
        value: 'Cellulose Blown',
        elements: [
            InsulationText5 = document.createTextNode("Cellulose Blown")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption6 = CreateElement({
        type: 'option',
        value: 2.13,
        elements: [
            InsulationText6 = document.createTextNode("Vermiculite")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption7 = CreateElement({
        type: 'option',
        value: 1.05,
        elements: [
            InsulationText7 = document.createTextNode("Autoclaved Aerated Concrete")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption8 = CreateElement({
        type: 'option',
        value: 4.48,
        elements: [
            InsulationText8 = document.createTextNode("Urea Terpolymer Foam")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption9 = CreateElement({
        type: 'option',
        value: 4.00,
        elements: [
            InsulationText9 = document.createTextNode("Rigid Fiberglass")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption10 = CreateElement({
        type: 'option',
        value: 4.00,
        elements: [
            InsulationText10 = document.createTextNode("Expanded Polystyrene (Beadboard)")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption11 = CreateElement({
        type: 'option',
        value: 5.00,
        elements: [
            InsulationText11 = document.createTextNode("Extruded Polystyrene")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption12 = CreateElement({
        type: 'option',
        value: 6.25,
        elements: [
            InsulationText12 = document.createTextNode("Polyurethane (Foamed-in-Place)")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    var InsulationOption13 = CreateElement({
        type: 'option',
        value: 'Polyisocyanurate (Foil-Faced)',
        elements: [
            InsulationText13 = document.createTextNode("Polyisocyanurate (Foil-Faced)")
        ],
        appendTo: this.InsulationMaterialsButton
    });
    this.InsulationMaterialsButton.selectedIndex = -1;

    //This function reveals the Insulation Thickness options
    this.InsulationMaterialsButton.onchange = function() {
        var sel = document.getElementById('InsulationMaterials');
        var first = sel.options[sel.selectedIndex];
        var i;
        for(i = document.getElementById("InsulationDetails").options.length - 1 ; i >= 0 ; i--) {
            document.getElementById("InsulationDetails").remove(i);
        }
        document.getElementById("InsulationDetails").style.display = "block";
        document.getElementById("ConstructionMaterials").style.display = "none";
        self.InsulationDetailsButton.style.opacity = "1.0";
        self.InsulationDetailsElement.style.opacity = "1.0";
        self.ConstructionMaterialsElement.style.opacity = "0.0";
        if (first.value == 'Fiberglass Batts') {
            var InsulationDetailsOption = CreateElement({
                type: 'option',
                value: 11.00,
                elements: [
                    InsulationDetailsText = document.createTextNode("3 1/2''")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption2 = CreateElement({
                type: 'option',
                value: 13.00,
                elements: [
                    InsulationDetailsText2 = document.createTextNode("3 5/8''")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption3 = CreateElement({
                type: 'option',
                value: 15.00,
                elements: [
                    InsulationDetailsText3 = document.createTextNode("3 1/2''")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption4 = CreateElement({
                type: 'option',
                value: 19.00,
                elements: [
                    InsulationDetailsText4 = document.createTextNode("6 1/2''")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption5 = CreateElement({
                type: 'option',
                value: 21.00,
                elements: [
                    InsulationDetailsText5 = document.createTextNode("5 1/4'' High Density")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption6 = CreateElement({
                type: 'option',
                value: 25.00,
                elements: [
                    InsulationDetailsText6 = document.createTextNode("8''")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption7 = CreateElement({
                type: 'option',
                value: 30.00,
                elements: [
                    InsulationDetailsText7 = document.createTextNode("8'' High Density")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption8 = CreateElement({
                type: 'option',
                value: 30.00,
                elements: [
                    InsulationDetailsText8 = document.createTextNode("9 1/2''")
                ],
                appendTo: self.InsulationDetailsButton
            });
            var InsulationDetailsOption9 = CreateElement({
                type: 'option',
                value: 38.00,
                elements: [
                    InsulationDetailsText9 = document.createTextNode("12''")
                ],
                appendTo: self.InsulationDetailsButton
            });
        }
        self.InsulationDetailsButton.selectedIndex = -1;
    };
    this.InsulationDetailsButton.onchange = function() {
        var i;
        for(i = document.getElementById("ConstructionMaterials").options.length - 1 ; i >= 0 ; i--) {
            document.getElementById("ConstructionMaterials").remove(i);
        }
        document.getElementById("InsulationDetails").style.display = "none";
        document.getElementById("ConstructionMaterials").style.display = "block";
        self.InsulationDetailsElement.style.opacity = "0.0";
        self.ConstructionMaterialsElement.style.opacity = "1.0";
        self.ConstructionMaterialsButton.style.opacity = "1.0";
        var ConstructionMaterialsOption = CreateElement({
            type: 'option',
            value: .8,
            elements: [
                ConstructionMaterialsText = document.createTextNode("Concrete Block 4''")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption2 = CreateElement({
            type: 'option',
            value: 1.11,
            elements: [
                ConstructionMaterialsText2 = document.createTextNode("Concrete Block 8''")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption3 = CreateElement({
            type: 'option',
            value: 1.28,
            elements: [
                ConstructionMaterialsText3 = document.createTextNode("Concrete Block 12''")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption4 = CreateElement({
            type: 'option',
            value: .8,
            elements: [
                ConstructionMaterialsText4 = document.createTextNode("Brick 4'' Common")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption5 = CreateElement({
            type: 'option',
            value: .44,
            elements: [
                ConstructionMaterialsText5 = document.createTextNode("Brick 4'' Face")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption6 = CreateElement({
            type: 'option',
            value: .08,
            elements: [
                ConstructionMaterialsText6 = document.createTextNode("Poured Concrete")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption7 = CreateElement({
            type: 'option',
            value: 1.25,
            elements: [
                ConstructionMaterialsText7 = document.createTextNode("Soft Wood Lumber")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption8 = CreateElement({
            type: 'option',
            value: 1.88,
            elements: [
                ConstructionMaterialsText8 = document.createTextNode("Lumber 2'' Nominal (1 1/2'')")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption9 = CreateElement({
            type: 'option',
            value: 4.38,
            elements: [
                ConstructionMaterialsText9 = document.createTextNode("Lumber 2x4 (3 1/2'')")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption10 = CreateElement({
            type: 'option',
            value: 6.88,
            elements: [
                ConstructionMaterialsText10 = document.createTextNode("Lumber 2x6 (5 1/2'')")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        var ConstructionMaterialsOption11 = CreateElement({
            type: 'option',
            value: 1.33,
            elements: [
                ConstructionMaterialsText11 = document.createTextNode("Cedar Logs and Lumber")
            ],
            appendTo: self.ConstructionMaterialsButton
        });
        self.ConstructionMaterialsButton.selectedIndex = -1;
    };
    this.ConstructionMaterialsButton.onchange = function() {
        var i;
        for(i = document.getElementById("SheathingMaterials").options.length - 1 ; i >= 0 ; i--) {
            document.getElementById("SheathingMaterials").remove(i);
        }
        self.SheathingMaterialsElement.style.opacity = "1.0";
        self.SheathingMaterialsButton.style.opacity = "1.0";
        var SheathingMaterialsOption = CreateElement({
            type: 'option',
            value: 'PW',
            elements: [
                SheathingMaterialsText = document.createTextNode("Plywood")
            ],
            appendTo: self.SheathingMaterialsButton
        });
        var SheathingMaterialsOption2 = CreateElement({
            type: 'option',
            value: 'FB',
            elements: [
                SheathingMaterialsText = document.createTextNode("Fiberboard")
            ],
            appendTo: self.SheathingMaterialsButton
        });
        var SheathingMaterialsOption3 = CreateElement({
            type: 'option',
            value: 'FG',
            elements: [
                SheathingMaterialsText = document.createTextNode("Fiberglass")
            ],
            appendTo: self.SheathingMaterialsButton
        });
        var SheathingMaterialsOption4 = CreateElement({
            type: 'option',
            value: 'EP',
            elements: [
                SheathingMaterialsText = document.createTextNode("Extruded Polystyrene")
            ],
            appendTo: self.SheathingMaterialsButton
        });
        var SheathingMaterialsOption5 = CreateElement({
            type: 'option',
            value: 'FFP',
            elements: [
                SheathingMaterialsText = document.createTextNode("Foil-Faced Polyisocyanurate")
            ],
            appendTo: self.SheathingMaterialsButton
        });
        self.SheathingMaterialsButton.selectedIndex = -1;
    };
    this.SheathingMaterialsButton.onchange = function() {
        var sel = document.getElementById('SheathingMaterials');
        var first = sel.options[sel.selectedIndex];
        var i;
        for (i = document.getElementById("SheathingDetails").options.length - 1; i >= 0; i--) {
            document.getElementById("SheathingDetails").remove(i);
        }
        document.getElementById("SheathingDetails").style.display = "block";
        document.getElementById("SidingMaterials").style.display = "none";
        self.SheathingDetailsButton.style.opacity = "1.0";
        self.SheathingDetailsElement.style.opacity = "1.0";
        self.SidingMaterialsElement.style.opacity = "0.0";
        if (first.value == 'PW') {
            var SheathingDetailsOption = CreateElement({
                type: 'option',
                value: .31,
                elements: [
                    SheathingDetailsText = document.createTextNode("1/4''")
                ],
                appendTo: self.SheathingDetailsButton
            });
            var SheathingDetailsOption2 = CreateElement({
                type: 'option',
                value: .47,
                elements: [
                    SheathingDetailsText = document.createTextNode("3/8''")
                ],
                appendTo: self.SheathingDetailsButton
            });
            var SheathingDetailsOption3 = CreateElement({
                type: 'option',
                value: .63,
                elements: [
                    SheathingDetailsText = document.createTextNode("1/2''")
                ],
                appendTo: self.SheathingDetailsButton
            });
            var SheathingDetailsOption4 = CreateElement({
                type: 'option',
                value: .77,
                elements: [
                    SheathingDetailsText = document.createTextNode("5/8''")
                ],
                appendTo: self.SheathingDetailsButton
            });
            var SheathingDetailsOption5 = CreateElement({
                type: 'option',
                value: .94,
                elements: [
                    SheathingDetailsText = document.createTextNode("3/4''")
                ],
                appendTo: self.SheathingDetailsButton
            });
            var SheathingDetailsOption6 = CreateElement({
                type: 'option',
                value: 1.25,
                elements: [
                    SheathingDetailsText = document.createTextNode("1''")
                ],
                appendTo: self.SheathingDetailsButton
            });
        }
        self.SheathingDetailsButton.selectedIndex = -1;
    };
    this.SheathingDetailsButton.onchange = function() {
        var i;
        for(i = document.getElementById("SidingMaterials").options.length - 1 ; i >= 0 ; i--)
        {
            document.getElementById("SidingMaterials").remove(i);
        }
        document.getElementById("SheathingDetails").style.display = "none";
        document.getElementById("SidingMaterials").style.display = "block";
        self.SheathingDetailsElement.style.opacity = "0.0";
        self.SidingMaterialsElement.style.opacity = "1.0";
        self.SidingMaterialsButton.style.opacity = "1.0";
        var SidingMaterialsOption = CreateElement({
            type: 'option',
            value: 0.34,
            elements: [
                SidingMaterialsText = document.createTextNode("Hardboard")
            ],
            appendTo: self.SidingMaterialsButton
        });
        var SidingMaterialsOption2 = CreateElement({
            type: 'option',
            value: 0.77,
            elements: [
                SidingMaterialsText2 = document.createTextNode("Plywood 5/8''")
            ],
            appendTo: self.SidingMaterialsButton
        });
        var SidingMaterialsOption3 = CreateElement({
            type: 'option',
            value: 0.93,
            elements: [
                SidingMaterialsText3 = document.createTextNode("Plywood 3/4''")
            ],
            appendTo: self.SidingMaterialsButton
        });
        var SidingMaterialsOption4 = CreateElement({
            type: 'option',
            value: 0.80,
            elements: [
                SidingMaterialsText4 = document.createTextNode("Wood Beveled Lapped")
            ],
            appendTo: self.SidingMaterialsButton
        });
        var SidingMaterialsOption5 = CreateElement({
            type: 'option',
            value: 0.61,
            elements: [
                SidingMaterialsText5 = document.createTextNode("Alum, Steel, Vinyl (Hollow Back)")
            ],
            appendTo: self.SidingMaterialsButton
        });
        var SidingMaterialsOption6 = CreateElement({
            type: 'option',
            value: 1.80,
            elements: [
                SidingMaterialsText6 = document.createTextNode("Alum, Steel, Vinyl (w/ 1/2'' board)")
            ],
            appendTo: self.SidingMaterialsButton
        });
        var SidingMaterialsOption7 = CreateElement({
            type: 'option',
            value: 0.44,
            elements: [
                SidingMaterialsText7 = document.createTextNode("Brick 4''")
            ],
            appendTo: self.SidingMaterialsButton
        });
        self.SidingMaterialsButton.selectedIndex = -1;
    };
    this.SidingMaterialsButton.onchange = function() {
        var i;
        for (i = document.getElementById("InteriorFinish").options.length - 1; i >= 0; i--) {
            document.getElementById("InteriorFinish").remove(i);
        }
        self.InteriorFinishElement.style.opacity = "1.0";
        self.InteriorFinishButton.style.opacity = "1.0";
        var InteriorFinishOption = CreateElement({
            type: 'option',
            value: 0.45,
            elements: [
                InteriorFinishText = document.createTextNode("Gypsum Board 1/2''")
            ],
            appendTo: self.InteriorFinishButton
        });
        var InteriorFinishOption2 = CreateElement({
            type: 'option',
            value: 0.56,
            elements: [
                InteriorFinishText2 = document.createTextNode("Gypsum Board 5/8''")
            ],
            appendTo: self.InteriorFinishButton
        });
        var InteriorFinishOption3 = CreateElement({
            type: 'option',
            value: 0.47,
            elements: [
                InteriorFinishText3 = document.createTextNode("Paneling 3/8''")
            ],
            appendTo: self.InteriorFinishButton
        });
        self.InteriorFinishButton.selectedIndex = -1;
    };
}

/**
 * This function shows the Wall Popover.
 *
 * @param parent: The hvacApplication class that the StartOver Popover is contained in.
 */
WallPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.WallDiv);
};

/**
 * This function hides the Wall Popover.
 */
WallPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.WallDiv.remove();
};