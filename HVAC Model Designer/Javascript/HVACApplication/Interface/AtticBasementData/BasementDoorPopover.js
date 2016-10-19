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
        this.BasementDoorUValueBox = CreateElement({type: 'BasementDoorUValue', id: 'BasementDoorUValue', class: 'BasementDoorUValueBox'})
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
        self.BasementDoorThicknessButton.selectedIndex = -1;
        self.BasementScreenDoorButton.selectedIndex = -1;
        self.BasementDoorDescriptionButton.selectedIndex = -1;
    }


    this.BasementDoorThicknessButton.onchange = function() {
        var sel = document.getElementById('BasementDoorType');
        var first = sel.options[sel.selectedIndex];
        var sel2 = document.getElementById('BasementDoorThickness');
        var second = sel2.options[sel2.selectedIndex];
        self.BasementDoorDescriptionButton.innerHTML = "";
        self.BasementDoorDescriptionButton.style.opacity = "1.0";
        self.BasementDoorDescriptionElement.style.opacity = "1.0";
        if (first.value == "Wood") {
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
        }
        else if (first.value == "Steel") {
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
        }
        self.BasementDoorDescriptionButton.selectedIndex = -1;
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