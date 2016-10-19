/**
 * Created by masse on 10/14/2016.
 */
function BasementDoorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'BasementDoorBGCover'});
    this.BasementDoorDiv = CreateElement({type: 'div', class: 'BasementDoorDiv', elements: [
        this.BasementDoorTypeElement = CreateElement({type: 'BasementDoorType', class: 'BasementDoorTypeElement',
            text: 'Type of Door'}),
        this.BasementDoorTypeButton = CreateElement({type: 'select', id: 'BasementDoorType', class: 'BasementDoorTypeButton'}),
        this.BasementScreenDoorElement = CreateElement({type: 'BasementScreenDoor', class: 'BasementScreenDoorElement',
            text: 'Type of Screen Door'}),
        this.BasementScreenDoorButton = CreateElement({type: 'select', id: 'BasementScreenDoor', class: 'BasementScreenDoorButton'}),
        this.BasementDoorThicknessElement = CreateElement({type: 'BasementDoorThickness', class: 'BasementDoorThicknessElement', text: 'Thickness of your Door'}),
        this.BasementDoorThicknessButton = CreateElement({type: 'select', id: 'BasementDoorThickness', class: 'BasementDoorThicknessButton'}),
        this.BasementDoorDescriptionElement = CreateElement({type: 'BasementDoorDescription', class: 'BasementDoorDescriptionElement', text: 'Description of your Door'}),
        this.BasementDoorDescriptionButton = CreateElement({type: 'select', id: 'BasementDoorDescription', class: 'BasementDoorDescriptionButton'}),
        this.BasementDoorUValueElement = CreateElement({type: 'BasementDoorUValue', class: 'BasementDoorUValueElement', text: 'The U Value of your Basement Door'}),
        this.BasementDoorUValueBox = CreateElement({type: 'BasementDoorUValue', id: 'BasementDoorUValue', class: 'BasementDoorUValueBox'}),
        this.SaveBasementDoorDataButton = CreateElement({type: 'button', class: 'SaveBasementDoorDataButton', text: 'Save Basement Door Data', onClick: CreateFunction(this, this.hide)})
    ]});

    var basement_door_text;
    var basement_door_option = CreateElement({type: 'option', value: 'Wood', elements:[basement_door_text = document.createTextNode("Wood")], appendTo: this.BasementDoorTypeButton});
    var basement_door_text2;
    var basement_door_option2 = CreateElement({type: 'option', value: 'Steel', elements:[basement_door_text2 = document.createTextNode("Steel")], appendTo: this.BasementDoorTypeButton});

    var self = this;

    this.BasementDoorTypeButton.selectedIndex = -1;

    this.BasementDoorTypeButton.onchange = function() {
        var sel = document.getElementById('BasementDoorType');
        var first = sel.options[sel.selectedIndex];
        if (first.value == "Wood") {
            self.BasementDoorUValueBox.innerHTML = "";
            self.BasementDoorThicknessButton.innerHTML = "";
            self.BasementDoorThicknessButton.style.opacity = "1.0";
            self.BasementDoorThicknessElement.style.opacity = "1.0";
            var basement_door_thickness_text;
            var basement_door_thickness_option = CreateElement({
                type: 'option',
                value: 35,
                elements: [basement_door_thickness_text = document.createTextNode("35")],
                appendTo: self.BasementDoorThicknessButton
            });
            var basement_door_thickness_text2;
            var basement_door_thickness_option2 = CreateElement({
                type: 'option',
                value: 45,
                elements: [basement_door_thickness_text2 = document.createTextNode("45")],
                appendTo: self.BasementDoorThicknessButton
            });
            var basement_door_thickness_text3;
            var basement_door_thickness_option3 = CreateElement({
                type: 'option',
                value: 57,
                elements: [basement_door_thickness_text3 = document.createTextNode("57")],
                appendTo: self.BasementDoorThicknessButton
            });
        }
        else
        {
            self.BasementDoorUValueBox.innerHTML = "";
            self.BasementDoorThicknessElement.style.opacity = "0.0";
            self.BasementDoorThicknessButton.style.opacity = "0.0";
            self.BasementDoorDescriptionButton.innerHTML = "";
            self.BasementDoorDescriptionButton.style.opacity = "1.0";
            self.BasementDoorDescriptionElement.style.opacity = "1.0";
            var basement_door_description_text;
            var basement_door_description_option = CreateElement({
                type: 'option',
                value: 'First',
                elements: [basement_door_description_text = document.createTextNode("Fiberglass or Mineral Wool Core with Steel Stiffeners, no Thermal Break")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text2;
            var basement_door_description_option2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [basement_door_description_text2 = document.createTextNode("Paper Honeycomb Core, no Thermal Break")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text3;
            var basement_door_description_option3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [basement_door_description_text3 = document.createTextNode("Solid Urethane Foam Core, no Thermal Break")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text4;
            var basement_door_description_option4 = CreateElement({
                type: 'option',
                value: 'Fourth',
                elements: [basement_door_description_text4 = document.createTextNode("Solid Fire-Rated Mineral Fiberboard Core, no Thermal Break")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text5;
            var basement_door_description_option5 = CreateElement({
                type: 'option',
                value: 'Fifth',
                elements: [basement_door_description_text5 = document.createTextNode("Polystyrene Core, no Thermal Break (18 Gage)")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text6;
            var basement_door_description_option6 = CreateElement({
                type: 'option',
                value: 'Sixth',
                elements: [basement_door_description_text6 = document.createTextNode("Polyurethane Core, no Thermal Break (18 Gage)")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text7;
            var basement_door_description_option7 = CreateElement({
                type: 'option',
                value: 'Seventh',
                elements: [basement_door_description_text7 = document.createTextNode("Polyurethane Core, no Thermal Break (24 Gage)")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text8;
            var basement_door_description_option8 = CreateElement({
                type: 'option',
                value: 'Eighth',
                elements: [basement_door_description_text8 = document.createTextNode("Polyurethane Core with Thermal Break and Wood Perimeter (24 Gage)")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text9;
            var basement_door_description_option9 = CreateElement({
                type: 'option',
                value: 'Ninth',
                elements: [basement_door_description_text9 = document.createTextNode("Solid Urethane Foam Core with Thermal Break")],
                appendTo: self.BasementDoorDescriptionButton
            });
        self.BasementDoorDescriptionButton.selectedIndex = -1;
        }
        self.BasementDoorThicknessButton.selectedIndex = -1;
        self.BasementScreenDoorButton.selectedIndex = -1;
        self.BasementDoorDescriptionButton.selectedIndex = -1;
    }


    this.BasementDoorThicknessButton.onchange = function() {
        var sel = document.getElementById('BasementDoorType');
        var first = sel.options[sel.selectedIndex];
        var sel2 = document.getElementById('BasementDoorThickness');
        var second = sel2.options[sel2.selectedIndex];
        self.BasementDoorUValueBox.innerHTML = "";
        self.BasementDoorDescriptionButton.innerHTML = "";
        self.BasementDoorDescriptionButton.style.opacity = "1.0";
        self.BasementDoorDescriptionElement.style.opacity = "1.0";
        if (second.value == "35") {
            var basement_door_description_text;
            var basement_door_description_option = CreateElement({
                type: 'option',
                value: 'First',
                elements: [basement_door_description_text = document.createTextNode("Panel Door with 11mm Panels")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text2;
            var basement_door_description_option2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [basement_door_description_text2 = document.createTextNode("Hollow Core Flush Door")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text3;
            var basement_door_description_option3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [basement_door_description_text3 = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.BasementDoorDescriptionButton
            });
        }
        else if (second.value == "45") {
            var basement_door_description_text;
            var basement_door_description_option = CreateElement({
                type: 'option',
                value: 'First',
                elements: [basement_door_description_text = document.createTextNode("Panel Door with 11mm Panels")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text2;
            var basement_door_description_option2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [basement_door_description_text2 = document.createTextNode("Hollow Core Flush Door")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text3;
            var basement_door_description_option3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [basement_door_description_text3 = document.createTextNode("Panel Door with 29mm Panels")],
                appendTo: self.BasementDoorDescriptionButton
            });
            var basement_door_description_text4;
            var basement_door_description_option4 = CreateElement({
                type: 'option',
                value: 'Fourth',
                elements: [basement_door_description_text4 = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.BasementDoorDescriptionButton
            });
        }
        else {
            var basement_door_description_text;
            var basement_door_description_option = CreateElement({
                type: 'option',
                value: 'First',
                elements: [basement_door_description_text = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.BasementDoorDescriptionButton
            });
        }
        self.BasementDoorDescriptionButton.selectedIndex = -1;
    }

    this.BasementDoorDescriptionButton.onchange = function(){
        self.BasementDoorUValueBox.innerHTML = "";
        self.BasementScreenDoorButton.innerHTML = "";
        self.BasementScreenDoorButton.style.opacity = "1.0";
        self.BasementScreenDoorElement.style.opacity = "1.0";
        var basement_screen_door_text;
        var basement_screen_door_option = CreateElement({
            type: 'option',
            value: 'None',
            elements: [basement_screen_door_text = document.createTextNode("None")],
            appendTo: self.BasementScreenDoorButton
        });
        var basement_screen_door_text2;
        var basement_screen_door_option2 = CreateElement({
            type: 'option',
            value: 'Wood',
            elements: [basement_screen_door_text2 = document.createTextNode("Wood")],
            appendTo: self.BasementScreenDoorButton
        });
        var basement_screen_door_text3;
        var basement_screen_door_option3 = CreateElement({
            type: 'option',
            value: 'Metal',
            elements: [basement_screen_door_text3 = document.createTextNode("Metal")],
            appendTo: self.BasementScreenDoorButton
        });
        self.BasementScreenDoorButton.selectedIndex = -1;
    }

    this.BasementScreenDoorButton.onchange = function(){
        self.BasementDoorUValueBox.innerHTML = "";
        self.BasementDoorUValueBox.style.opacity = "1.0";
        self.BasementDoorUValueElement.style.opacity = "1.0";
        var sel = document.getElementById('BasementDoorType');
        var first = sel.options[sel.selectedIndex];
        var sel2 = document.getElementById('BasementDoorThickness');
        var second = sel2.options[sel2.selectedIndex];
        var sel3 = document.getElementById('BasementScreenDoor');
        var third = sel3.options[sel3.selectedIndex];
        var sel4 = document.getElementById('BasementDoorDescription');
        var fourth = sel4.options[sel4.selectedIndex];

        if(first.value == "Wood")
        {
            if(second.value == "35")
            {
                if(third.value == "None")
                {
                    if(fourth.value == "First")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("3.24")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.67")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.21")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                }
                else if(third.value == "Wood")
                {
                    if (fourth.value == "First")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.87")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.7")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.48")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                }
                else
                {
                    if(fourth.value == "First")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.1")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.82")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.59")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                }

            }
            else if(second.value == "45")
            {
                if(third.value == "None")
                {
                    if(fourth.value == "First")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("3.07")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.61")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.21")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.27")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                }
                else if(third.value == "Wood")
                {
                    if (fourth.value == "First")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.82")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.65")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.48")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("N/A")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                }
                else
                {
                    if(fourth.value == "First")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("2.04")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.82")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.59")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                    else
                    {
                        var basement_door_UValue_text;
                        var basement_door_UValue_option = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [basement_door_UValue_text = document.createTextNode("1.48")],
                            appendTo: self.BasementDoorUValueBox
                        })
                    }
                }
            }
            else
            {
                if(third.value == "None")
                {
                    var basement_door_UValue_text;
                    var basement_door_UValue_option = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [basement_door_UValue_text = document.createTextNode("1.53")],
                        appendTo: self.BasementDoorUValueBox
                    })
                }
                else if(third.value == "Wood")
                {
                    var basement_door_UValue_text;
                    var basement_door_UValue_option = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [basement_door_UValue_text = document.createTextNode("1.14")],
                        appendTo: self.BasementDoorUValueBox
                    })
                }
                else
                {
                    var basement_door_UValue_text;
                    var basement_door_UValue_option = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [basement_door_UValue_text = document.createTextNode("1.19")],
                        appendTo: self.BasementDoorUValueBox
                    })
                }
            }
        }
    }
}

BasementDoorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.BasementDoorDiv);
};
BasementDoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.BasementDoorDiv.remove();
};