/**
 * Created by matt on 2/6/17.
 */

/**
 * This includes the design of the interface for when the Room Editor tab is selected and the elements that are shown.
 */
class RoomEditor {

    /**
     * Initializes the elements shown on the Canvas in Room Editor.
     *
     * @param hvacApplication: The overall control that the Room Editor is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.mainDiv = CreateElement({
            type: 'div',
            className: 'RoomEditor_mainDiv',
            text:"The purpose of the room editor is to allow setting wall properities and defining floors and" +
                "ceilings for walls. This did not get completed."
        });
    }

    /**
     * Displays the Room Editor on the Canvas.
     */
    show () {}

    /**
     * Hides the Room Editor from the Canvas.
     */
    hide () {}

    /**
     * Basic boolean logic operations.
     */
    logic() {}

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: Room Editor main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}