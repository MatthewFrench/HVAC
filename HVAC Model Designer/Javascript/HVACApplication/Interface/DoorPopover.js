/**
 * Created by masse on 10/14/2016.
 */
function DoorPopover() {
    this.backgroundDiv = CreateElement({type: 'div', class: 'DoorBGCover'});
    this.DoorDiv = CreateElement({type: 'div', class: 'DoorDiv', elements: [
        this.DoorTypeElement = CreateElement({type: 'DoorType', class: 'DoorTypeElement',
            text: 'Type of Door'}),
        this.DoorTypeButton = CreateElement({type: 'select', id: 'DoorType', class: 'DoorTypeButton'}),
        this.ScreenDoorElement = CreateElement({type: 'ScreenDoor', class: 'ScreenDoorElement',
            text: 'Type of Screen Door'}),
        this.ScreenDoorButton = CreateElement({type: 'select', id: 'ScreenDoor', class: 'ScreenDoorButton'}),
        this.DoorThicknessElement = CreateElement({type: 'DoorThickness', class: 'DoorThicknessElement', text: 'Thickness of your Door'}),
        this.DoorThicknessButton = CreateElement({type: 'select', id: 'DoorThickness', class: 'DoorThicknessButton'}),
        this.DoorDescriptionElement = CreateElement({type: 'DoorDescription', class: 'DoorDescriptionElement', text: 'Description of your Door'}),
        this.DoorDescriptionButton = CreateElement({type: 'select', id: 'DoorDescription', class: 'DoorDescriptionButton'}),
        this.DoorUValueElement = CreateElement({type: 'DoorUValue', class: 'DoorUValueElement', text: 'The U Value of your  Door'}),
        this.DoorUValueBox = CreateElement({type: 'DoorUValue', id: 'DoorUValue', class: 'DoorUValueBox'}),
        this.SaveDoorDataButton = CreateElement({type: 'button', class: 'SaveDoorDataButton', text: 'Save', onClick: CreateFunction(this, this.hide)}),
        this.CancelButton = CreateElement({type: 'button', class: 'CancelButton', text: 'Cancel', onClick: CreateFunction(this, this.hide)})
    ]});

    var doortext;
    var dooroption = CreateElement({type: 'option', value: 'Wood', elements:[doortext = document.createTextNode("Wood")], appendTo: this.DoorTypeButton});
    var doortext2;
    var dooroption2 = CreateElement({type: 'option', value: 'Steel', elements:[doortext2 = document.createTextNode("Steel")], appendTo: this.DoorTypeButton});

    var self = this;

    this.DoorTypeButton.selectedIndex = -1;

    this.DoorTypeButton.onchange = function() {
        var sel = document.getElementById('DoorType');
        var first = sel.options[sel.selectedIndex];
        if (first.value == "Wood") {
            self.DoorUValueBox.innerHTML = "";
            self.DoorThicknessButton.innerHTML = "";
            self.DoorThicknessButton.style.opacity = "1.0";
            self.DoorThicknessElement.style.opacity = "1.0";
            var doorthicknesstext;
            var doorthicknessoption = CreateElement({
                type: 'option',
                value: 35,
                elements: [doorthicknesstext = document.createTextNode("35")],
                appendTo: self.DoorThicknessButton
            });
            var doorthicknesstext2;
            var doorthicknessoption2 = CreateElement({
                type: 'option',
                value: 45,
                elements: [doorthicknesstext2 = document.createTextNode("45")],
                appendTo: self.DoorThicknessButton
            });
            var doorthicknesstext3;
            var doorthicknessoption3 = CreateElement({
                type: 'option',
                value: 57,
                elements: [doorthicknesstext3 = document.createTextNode("57")],
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
            var doordescriptiontext;
            var doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [doordescriptiontext = document.createTextNode("Fiberglass or Mineral Wool Core with Steel Stiffeners, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext2;
            var doordescriptionoption2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [doordescriptiontext2 = document.createTextNode("Paper Honeycomb Core, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext3;
            var doordescriptionoption3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [doordescriptiontext3 = document.createTextNode("Solid Urethane Foam Core, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext4;
            var doordescriptionoption4 = CreateElement({
                type: 'option',
                value: 'Fourth',
                elements: [doordescriptiontext4 = document.createTextNode("Solid Fire-Rated Mineral Fiberboard Core, no Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext5;
            var doordescriptionoption5 = CreateElement({
                type: 'option',
                value: 'Fifth',
                elements: [doordescriptiontext5 = document.createTextNode("Polystyrene Core, no Thermal Break (18 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext6;
            var doordescriptionoption6 = CreateElement({
                type: 'option',
                value: 'Sixth',
                elements: [doordescriptiontext6 = document.createTextNode("Polyurethane Core, no Thermal Break (18 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext7;
            var doordescriptionoption7 = CreateElement({
                type: 'option',
                value: 'Seventh',
                elements: [doordescriptiontext7 = document.createTextNode("Polyurethane Core, no Thermal Break (24 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext8;
            var doordescriptionoption8 = CreateElement({
                type: 'option',
                value: 'Eighth',
                elements: [doordescriptiontext8 = document.createTextNode("Polyurethane Core with Thermal Break and Wood Perimeter (24 Gage)")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext9;
            var doordescriptionoption9 = CreateElement({
                type: 'option',
                value: 'Ninth',
                elements: [doordescriptiontext9 = document.createTextNode("Solid Urethane Foam Core with Thermal Break")],
                appendTo: self.DoorDescriptionButton
            });
        self.DoorDescriptionButton.selectedIndex = -1;
        }
        self.DoorThicknessButton.selectedIndex = -1;
        self.ScreenDoorButton.selectedIndex = -1;
        self.DoorDescriptionButton.selectedIndex = -1;
    }


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
            var doordescriptiontext;
            var doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [doordescriptiontext = document.createTextNode("Panel Door with 11mm Panels")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext2;
            var doordescriptionoption2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [doordescriptiontext2 = document.createTextNode("Hollow Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext3;
            var doordescriptionoption3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [doordescriptiontext3 = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
        }
        else if (second.value == "45") {
            var doordescriptiontext;
            var doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [doordescriptiontext = document.createTextNode("Panel Door with 11mm Panels")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext2;
            var doordescriptionoption2 = CreateElement({
                type: 'option',
                value: 'Second',
                elements: [doordescriptiontext2 = document.createTextNode("Hollow Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext3;
            var doordescriptionoption3 = CreateElement({
                type: 'option',
                value: 'Third',
                elements: [doordescriptiontext3 = document.createTextNode("Panel Door with 29mm Panels")],
                appendTo: self.DoorDescriptionButton
            });
            var doordescriptiontext4;
            var doordescriptionoption4 = CreateElement({
                type: 'option',
                value: 'Fourth',
                elements: [doordescriptiontext4 = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
        }
        else {
            var doordescriptiontext;
            var doordescriptionoption = CreateElement({
                type: 'option',
                value: 'First',
                elements: [doordescriptiontext = document.createTextNode("Solid Core Flush Door")],
                appendTo: self.DoorDescriptionButton
            });
        }
        self.DoorDescriptionButton.selectedIndex = -1;
    }

    this.DoorDescriptionButton.onchange = function(){
        self.DoorUValueBox.innerHTML = "";
        self.ScreenDoorButton.innerHTML = "";
        self.ScreenDoorButton.style.opacity = "1.0";
        self.ScreenDoorElement.style.opacity = "1.0";
        var screendoortext;
        var screendooroption = CreateElement({
            type: 'option',
            value: 'None',
            elements: [screendoortext = document.createTextNode("None")],
            appendTo: self.ScreenDoorButton
        });
        var screendoortext2;
        var screendooroption2 = CreateElement({
            type: 'option',
            value: 'Wood',
            elements: [screendoortext2 = document.createTextNode("Wood")],
            appendTo: self.ScreenDoorButton
        });
        var screendoortext3;
        var screendooroption3 = CreateElement({
            type: 'option',
            value: 'Metal',
            elements: [screendoortext3 = document.createTextNode("Metal")],
            appendTo: self.ScreenDoorButton
        });
        self.ScreenDoorButton.selectedIndex = -1;
    }

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
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("3.24")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.67")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.21")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else if(third.value == "Wood")
                {
                    if (fourth.value == "First")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.87")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.7")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.48")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else
                {
                    if(fourth.value == "First")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.1")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.82")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.59")],
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
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("3.07")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.61")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.21")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.27")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else if(third.value == "Wood")
                {
                    if (fourth.value == "First")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.82")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.65")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.48")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("N/A")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
                else
                {
                    if(fourth.value == "First")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("2.04")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if(fourth.value == "Second")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.82")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else if (fourth.value == "Third")
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.59")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                    else
                    {
                        var doorUValuetext;
                        var doorUValueoption = CreateElement({
                            type: 'option',
                            value: 'UValue',
                            elements: [doorUValuetext = document.createTextNode("1.48")],
                            appendTo: self.DoorUValueBox
                        })
                    }
                }
            }
            else
            {
                if(third.value == "None")
                {
                    var doorUValuetext;
                    var doorUValueoption = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [doorUValuetext = document.createTextNode("1.53")],
                        appendTo: self.DoorUValueBox
                    })
                }
                else if(third.value == "Wood")
                {
                    var doorUValuetext;
                    var doorUValueoption = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [doorUValuetext = document.createTextNode("1.14")],
                        appendTo: self.DoorUValueBox
                    })
                }
                else
                {
                    var doorUValuetext;
                    var doorUValueoption = CreateElement({
                        type: 'option',
                        value: 'UValue',
                        elements: [doorUValuetext = document.createTextNode("1.19")],
                        appendTo: self.DoorUValueBox
                    })
                }
            }
        }
    }
}

DoorPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.DoorDiv);
};
DoorPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.DoorDiv.remove();
};