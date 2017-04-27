/**
 * Created by Austin03 on 4/4/17.
 *
 * Creates the ProjectEditor tab for the interface.
 */

/**
 * This includes the design of the interface for when the Project Editor tab is selected and the elements that are shown.
 */
class ProjectEditor {

    /**
     * Initializes the elements shown on the Canvas in Project Editor.
     *
     * @param hvacApplication: The overall control that the Project Editor is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        //Div in Project Editor that allows selection between building projects.
        this.buildingPickerWindow = new BuildingPicker(this.hvacApplication, this.hvacApplication.hvacData);

        this.mainDiv = CreateElement({
            type: 'div',
            className: 'ProjectEditor_mainDiv',
            elements: [
                this.topBarDiv = CreateElement({
                    type: 'div',
                    className: 'ProjectEditor_TopBar'
                }),
                this.mainContentDiv = CreateElement({
                    type: 'div',
                    className: 'ProjectEditor_MainContent',
                    elements: [
                        this.buildingPickerWindow.getDiv()
                    ]
                })
            ]
        });
    }

    /**
     * Displays the Project Editor on the Canvas.
     */
    show () {}

    /**
     * Hides the Project Editor from the Canvas.
     */
    hide () {}

    /**
     * Basic boolean logic operations.
     */
    logic() {}

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: Project Editor main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}