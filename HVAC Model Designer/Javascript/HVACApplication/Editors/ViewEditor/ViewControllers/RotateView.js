/**
 * Created by matt on 2/23/17.
 *
 * Creates the Rotate Mode of the canvas when the Drag View tab is selected.
 */

/**
 * This includes the design of the interface for when the Drag View tab is selected within the View Editor, and
 * the elements that are shown.
 */
class RotateView {

    /**
     * Initializes the elements shown on the Canvas in Rotate View mode.
     *
     * @param hvacApplication: The overall control that the Rotate View mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas2D = new Canvas2D({
            hvacApplication: hvacApplication,
            allowRotating: true
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'RotateView_mainDiv',
            elements: [
                this.canvas2D.getCanvas()
            ]
        });
    }

    /**
     * Displays the Rotate View mode on the Canvas.
     */
    show () {
        this.canvas2D.logic();
    }

    /**
     * Hides the Rotate View mode from the Canvas.
     */
    hide () {}

    /**
     * Basic boolean logic operations.
     */
    logic() {
        this.canvas2D.logic();
    }

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: Rotate View main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}