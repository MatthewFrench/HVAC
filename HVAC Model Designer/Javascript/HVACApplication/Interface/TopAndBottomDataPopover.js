/**
 * Created by masse on 10/10/2016.
 */
function TopAndBottomDataPopover() {
    "use strict";
    //Constructor
    this.TopAndBottomDataDiv = null;
    this.saveDataButton = null;
    this.titleSpan = null;
    this.backgroundDiv = document.createElement("div");
    this.backgroundDiv.className = "BackgroundCover";

    this.TopAndBottomDataDiv = document.createElement("div");
    this.TopAndBottomDataDiv.className = "TopAndBottomDataDiv";

    this.saveDataButton = document.createElement('button');
    this.saveDataButton.className = "SaveDataButton";
    this.saveDataButton.innerText = "Save Attic and Basement Data";
    var self = this;
    this.saveDataButton.onclick = function () {
        self.hide();
    };
    this.TopAndBottomDataDiv.appendChild(this.saveDataButton);

    this.titleSpan = document.createElement("span");
    this.titleSpan.className = "AtticTitle";
    this.titleSpan.innerText = "Input Attic Data";
    this.TopAndBottomDataDiv.appendChild(this.titleSpan);

    this.StudSpacingElement = document.createElement("StudSpacing");
    this.StudSpacingElement.className = "StudSpacingElement";
    this.StudSpacingElement.innerText = "Spacing of your Studs";
    this.TopAndBottomDataDiv.appendChild(this.StudSpacingElement);
    this.StudSpacingButton = document.createElement("select");
    this.StudSpacingButton.setAttribute("id", "StudSpacing");
    this.StudSpacingButton.className = "StudSpacingButton";
    this.TopAndBottomDataDiv.appendChild(this.StudSpacingButton);

    this.StudHeightElement = document.createElement("StudHeight");
    this.StudHeightElement.className = "StudHeightElement";
    this.StudHeightElement.innerText = "Height of your Studs";
    this.TopAndBottomDataDiv.appendChild(this.StudHeightElement);
    this.StudHeightButton = document.createElement("select");
    this.StudHeightButton.setAttribute("id", "StudHeight");
    this.StudHeightButton.className = "StudHeightButton";
    this.TopAndBottomDataDiv.appendChild(this.StudHeightButton);

    this.StudWidthElement = document.createElement("StudWidth");
    this.StudWidthElement.className = "StudWidthElement";
    this.StudWidthElement.innerText = "Width of your Studs";
    this.TopAndBottomDataDiv.appendChild(this.StudWidthElement);
    this.StudWidthButton = document.createElement("select");
    this.StudWidthButton.setAttribute("id", "StudWidth");
    this.StudWidthButton.className = "StudWidthButton";
    this.TopAndBottomDataDiv.appendChild(this.StudWidthButton);

    this.AtticInsulationElement = document.createElement("AtticInsulation");
    this.AtticInsulationElement.className = "AtticInsulationElement";
    this.AtticInsulationElement.innerText = "Type of Insulation";
    this.TopAndBottomDataDiv.appendChild(this.AtticInsulationElement);
    this.AtticInsulationButton = document.createElement("select");
    this.AtticInsulationButton.setAttribute("id", "AtticInsulation");
    this.AtticInsulationButton.className = "AtticInsulationButton";
    this.TopAndBottomDataDiv.appendChild(this.AtticInsulationButton);

    this.AtticInsulationDepthElement = document.createElement("AtticDepthInsulation");
    this.AtticInsulationDepthElement.className = "AtticInsulationDepthElement";
    this.AtticInsulationDepthElement.innerText = "Depth of Attic Insulation";
    this.TopAndBottomDataDiv.appendChild(this.AtticInsulationDepthElement);
    this.AtticInsulationDepthButton = document.createElement("select");
    this.AtticInsulationDepthButton.setAttribute("id", "AtticDepthInsulation");
    this.AtticInsulationDepthButton.className = "AtticInsulationDepthButton";
    this.TopAndBottomDataDiv.appendChild(this.AtticInsulationDepthButton);

    this.titleSpan = document.createElement("span");
    this.titleSpan.className = "BasementTitle";
    this.titleSpan.innerText = "Input Basement Data";
    this.TopAndBottomDataDiv.appendChild(this.titleSpan);
}

TopAndBottomDataPopover.prototype.show = function() {
    document.body.appendChild(this.backgroundDiv);
    document.body.appendChild(this.TopAndBottomDataDiv);
};
TopAndBottomDataPopover.prototype.hide = function() {
    this.backgroundDiv.remove();
    this.TopAndBottomDataDiv.remove();
};
