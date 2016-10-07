/**
 * Created by masse on 10/3/2016.
 */

function LocationDataPopover() {
    "use strict";
    //Constructor
    this.locationDataDiv = null;
    this.saveDataButton = null;
    this.titleSpan = null;
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BackgroundCover";

    this.locationDataDiv = document.createElement("div");
    this.locationDataDiv.className = "LocationDataDiv";

    this.saveDataButton = document.createElement('button');
    this.saveDataButton.className = "SaveDataButton";
    this.saveDataButton.innerText = "Save Location Data";
    var self = this;
    this.saveDataButton.onclick = function () {
        self.hide();
    };
    this.locationDataDiv.appendChild(this.saveDataButton);

    this.titleSpan = document.createElement("span");
    this.titleSpan.className = "LocationTitle";
    this.titleSpan.innerText = "Input Location Data";
    this.locationDataDiv.appendChild(this.titleSpan);

    this.firstElement = document.createElement("state");
    this.firstElement.className = "State";
    this.firstElement.innerText = "Select your State";
    this.locationDataDiv.appendChild(this.firstElement);

    var StateArray = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    this.optionArray = [];
    this.textArray = [];
    this.firstButton = document.createElement("select");
    this.firstButton.setAttribute("id", "State");
    this.firstButton.className = "StateDropDown";
    this.firstButton.innerText = "Select a State from Dropdown";
    for(var i = 0; i<StateArray.length; i++)
    {
        this.optionArray[i] = document.createElement("option");
        this.optionArray[i].setAttribute("value", StateArray[i]);
        this.textArray[i] = document.createTextNode(StateArray[i]);
        this.optionArray[i].appendChild(this.textArray[i]);
        this.firstButton.appendChild(this.optionArray[i]);
    }
    this.locationDataDiv.appendChild(this.firstButton);


    this.secondElement = document.createElement("city");
    this.secondElement.className = "City";
    this.secondElement.innerText = "Select the City closest to yours";
    this.locationDataDiv.appendChild(this.secondElement);

    this.secondButton = document.createElement("select");
    this.secondButton.setAttribute("id", "City");
    this.secondButton.className = "CityDropDown";
    this.secondButton.innerText = "Select a City from Dropdown";
    this.locationDataDiv.appendChild(this.secondButton);
}

LocationDataPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.locationDataDiv);
};
LocationDataPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.locationDataDiv.remove();
};
