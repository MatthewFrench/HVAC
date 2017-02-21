/**
 * Created by masse on 10/14/2016.
 */

//This function creates the Door Popover
function DoorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', className: 'DoorBGCover'});
    this.DoorDiv = CreateElement({type: 'div', className: 'DoorDiv', elements: [
        this.DoorTypeElement = CreateElement({type: 'DoorType', className: 'DoorTypeElement',
            text: 'Type of Door'}),
        this.DoorTypeButton = CreateElement({type: 'select', id: 'DoorType', className: 'DoorTypeButton'}),
        this.ScreenDoorElement = CreateElement({type: 'ScreenDoor', className: 'ScreenDoorElement',
            text: 'Type of Screen Door'}),
        this.ScreenDoorButton = CreateElement({type: 'select', id: 'ScreenDoor', className: 'ScreenDoorButton'}),
        this.DoorThicknessElement = CreateElement({type: 'DoorThickness', className: 'DoorThicknessElement', text: 'Thickness of your Door'}),
        this.DoorThicknessButton = CreateElement({type: 'select', id: 'DoorThickness', className: 'DoorThicknessButton'}),
        this.DoorDescriptionElement = CreateElement({type: 'DoorDescription', className: 'DoorDescriptionElement', text: 'Description of your Door'}),
        this.DoorDescriptionButton = CreateElement({type: 'select', id: 'DoorDescription', className: 'DoorDescriptionButton'}),
        this.DoorUValueElement = CreateElement({type: 'DoorUValue', className: 'DoorUValueElement', text: 'The U Value of your  Door'}),
        this.DoorUValueBox = CreateElement({type: 'DoorUValue', id: 'DoorUValue', className: 'DoorUValueBox'}),
        this.DoorSaveButton = CreateElement({type: 'button', className: 'DoorSaveButton', text: 'Save', onClick: CreateFunction(this, this.hide)}),
        this.DoorCancelButton = CreateElement({type: 'button', className: 'DoorCancelButton', text: 'Cancel', onClick: CreateFunction(this, this.hide)})
    ]});

    var Doortext;
    var Dooroption = CreateElement({type: 'option', value: 'Wood', elements:[Doortext = document.createTextNode("Wood")], appendTo: this.DoorTypeButton});
    var Doortext2;
    var Dooroption2 = CreateElement({type: 'option', value: 'Steel', elements:[Doortext2 = document.createTextNode("Steel")], appendTo: this.DoorTypeButton});

    var self = this;

    this.DoorTypeButton.selectedIndex = -1;

    //This function reveals the Door Thickness
    /*
    this.DoorTypeButton.onchange = function() {
        var sel = document.getElementById('DoorType');
        var first = sel.options[sel.selectedIndex];
        if (first.value == "Wood") {
            self.DoorUValueBox.innerHTML = "";
            self.DoorThicknessButton.innerHTML = "";
            self.DoorThicknessButton.style.opacity = "1.0";
            self.DoorThicknessElement.style.opacity = "1.0";
            var Doorthicknesstext;
            var Doorthicknessoption = CreateElement({
                type: 'option',
                value: 35,
                elements: [Doorthicknesstext = document.createTextNode("35")],
                appendTo: self.DoorThicknessButton
            });
            var Doorthicknesstext2;
            var Doorthicknessoption2 = CreateElement({
                type: 'option',
                value: 45,
                elements: [Doorthicknesstext2 = document.createTextNode("45")],
                appendTo: self.DoorThicknessButton
            });
            var Doorthicknesstext3;
            var Doorthicknessoption3 = CreateElement({
                type: 'option',
                value: 57,
                elements: [Doorthicknesstext3 = document.createTextNode("57")],
                appendTo: self.DoorThicknessButton
            });
        }
        else
        {
            self.DoorUValueBox.innerHTML = "";
            self.DoorThicknessElement.style.opacity = "0.0";
            self.DoorThicknessButton.style.opacity = "0.0";
            self.DoorDescriptionButton.innerHTML = "";
            self.DoorDescriptionButton.style.opacity = "1.0";
            self.DoorDescriptionElement.style.opacity = "1.0";
            var Doordescriptiontext;
            var Doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [Doordescriptiontext = document.createTextNode("Fiberglass or Mineral Wool Core with Steel Stiffeners, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext2;
            var Doordescriptionoption2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [Doordescriptiontext2 = document.createTextNode("Paper Honeycomb Core, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext3;
            var Doordescriptionoption3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [Doordescriptiontext3 = document.createTextNode("Solid Urethane Foam Core, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext4;
            var Doordescriptionoption4 = CreateElement({
                type: 'option',
                value: 'Fourth',
                elements: [Doordescriptiontext4 = document.createTextNode("Solid Fire-Rated Mineral Fiberboard Core, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext5;
            var Doordescriptionoption5 = CreateElement({
                type: 'option',
                value: 'Fifth',
                elements: [Doordescriptiontext5 = document.createTextNode("Polystyrene Core, no Thermal Break (18 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext6;
            var Doordescriptionoption6 = CreateElement({
                type: 'option',
                value: 'Sixth',
                elements: [Doordescriptiontext6 = document.createTextNode("Polyurethane Core, no Thermal Break (18 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext7;
            var Doordescriptionoption7 = CreateElement({
                type: 'option',
                value: 'Seventh',
                elements: [Doordescriptiontext7 = document.createTextNode("Polyurethane Core, no Thermal Break (24 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext8;
            var Doordescriptionoption8 = CreateElement({
                type: 'option',
                value: 'Eighth',
                elements: [Doordescriptiontext8 = document.createTextNode("Polyurethane Core with Thermal Break and Wood Perimeter (24 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext9;
            var Doordescriptionoption9 = CreateElement({
                type: 'option',
                value: 'Ninth',
                elements: [Doordescriptiontext9 = document.createTextNode("Solid Urethane Foam Core with Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
        self.DoorDescriptionButton.selectedIndex = -1;
        }
        self.DoorThicknessButton.selectedIndex = -1;
        self.ScreenDoorButton.selectedIndex = -1;
        self.DoorDescriptionButton.selectedIndex = -1;
    }
*/
    //This function reveals the Door Description
    /*
    this.DoorThicknessButton.onchange = function() {
        var sel = document.getElementById('DoorType');
        var first = sel.options[sel.selectedIndex];
        var sel2 = document.getElementById('DoorThickness');
        var second = sel2.options[sel2.selectedIndex];
        self.DoorUValueBox.innerHTML = "";
        self.DoorDescriptionButton.innerHTML = "";
        self.DoorDescriptionButton.style.opacity = "1.0";
        self.DoorDescriptionElement.style.opacity = "1.0";
        if (second.value == "35") {
            var Doordescriptiontext;
            var Doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [Doordescriptiontext = document.createTextNode("Panel Door with 11mm Panels")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext2;
            var Doordescriptionoption2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [Doordescriptiontext2 = document.createTextNode("Hollow Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext3;
            var Doordescriptionoption3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [Doordescriptiontext3 = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
        }
        else if (second.value == "45") {
            var Doordescriptiontext;
            var Doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [Doordescriptiontext = document.createTextNode("Panel Door with 11mm Panels")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext2;
            var Doordescriptionoption2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [Doordescriptiontext2 = document.createTextNode("Hollow Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext3;
            var Doordescriptionoption3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [Doordescriptiontext3 = document.createTextNode("Panel Door with 29mm Panels")],
                appendTo: self.DoorDescriptionButton
            });
            var Doordescriptiontext4;
            var Doordescriptionoption4 = CreateElement({
                type: 'option',
                value: 'Fourth',
                elements: [Doordescriptiontext4 = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
        }
        else {
            var Doordescriptiontext;
            var Doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [Doordescriptiontext = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
        }
        self.DoorDescriptionButton.selectedIndex = -1;
    }
*/
    //This function reveals Screen Door option
    this.DoorDescriptionButton.onchange = function(){
        self.DoorUValueBox.innerHTML = "";
        self.ScreenDoorButton.innerHTML = "";
        self.ScreenDoorButton.style.opacity = "1.0";
        self.ScreenDoorElement.style.opacity = "1.0";
        var screenDoortext;
        var screenDooroption = CreateElement({
            type: 'option',
            value: 'None',
            elements: [screenDoortext = document.createTextNode("None")],
            appendTo: self.ScreenDoorButton
        });
        var screenDoortext2;
        var screenDooroption2 = CreateElement({
            type: 'option',
            value: 'Wood',
            elements: [screenDoortext2 = document.createTextNode("Wood")],
            appendTo: self.ScreenDoorButton
        });
        var screenDoortext3;
        var screenDooroption3 = CreateElement({
            type: 'option',
            value: 'Metal',
            elements: [screenDoortext3 = document.createTextNode("Metal")],
            appendTo: self.ScreenDoorButton
        });
        self.ScreenDoorButton.selectedIndex = -1;
    }

    //This function sets UValue of Door
    /*
    this.ScreenDoorButton.onchange = function(){
        self.DoorUValueBox.innerHTML = "";
        self.DoorUValueBox.style.opacity = "1.0";
        self.DoorUValueElement.style.opacity = "1.0";
        var sel = document.getElementById('DoorType');
        var first = sel.options[sel.selectedIndex];
        var sel2 = document.getElementById('DoorThickness');
        var second = sel2.options[sel2.selectedIndex];
        var sel3 = document.getElementById('ScreenDoor');
        var third = sel3.options[sel3.selectedIndex];
        var sel4 = document.getElementById('DoorDescription');
        var fourth = sel4.options[sel4.selectedIndex];

        if(first.value == "Wood")
        {
            if(second.value == "35")
            {
                if(third.value == "None")
                {
                    if(fourth.value == "First")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("3.24")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.67")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.21")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else if(third.value == "Wood")
                {
                    if (fourth.value == "First")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.87")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.7")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.48")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else
                {
                    if(fourth.value == "First")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.1")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.82")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.59")],
                            appendTo: self.DoorUValueBox
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
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("3.07")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.61")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.21")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.27")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else if(third.value == "Wood")
                {
                    if (fourth.value == "First")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.82")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.65")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.48")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("N/A")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else
                {
                    if(fourth.value == "First")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("2.04")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.82")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.59")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var DoorUValuetext;
                        var DoorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [DoorUValuetext = document.createTextNode("1.48")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
            }
            else
            {
                if(third.value == "None")
                {
                    var DoorUValuetext;
                    var DoorUValueoption = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [DoorUValuetext = document.createTextNode("1.53")],
                        appendTo: self.DoorUValueBox
                    })
                }
                else if(third.value == "Wood")
                {
                    var DoorUValuetext;
                    var DoorUValueoption = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [DoorUValuetext = document.createTextNode("1.14")],
                        appendTo: self.DoorUValueBox
                    })
                }
                else
                {
                    var DoorUValuetext;
                    var DoorUValueoption = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [DoorUValuetext = document.createTextNode("1.19")],
                        appendTo: self.DoorUValueBox
                    })
                }
            }
        }
    }
    */
}

//This function shows the Door Popover
DoorPopover.prototype.show = function(parent) {
    parent.appendChild(this.backgroundDiv);
    parent.appendChild(this.DoorDiv);
};

//This function hides the Door Popover
DoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.DoorDiv.remove();
};