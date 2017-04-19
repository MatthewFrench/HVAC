/**
 * Created by matt on 2/23/17.
 */

/**
 * This includes the design of the interface for when the Drag View tab is selected within the View Editor, and
 * the elements that are shown.
 */
class DragView {

    /**
     * Initializes the elements shown on the Canvas in Drag View mode.
     *
     * @param hvacApplication: The overall control that the Drag View mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas2D = new Canvas2D({
            hvacApplication: hvacApplication,
            allowDragging: true
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'DragView_mainDiv',
            elements: [
                this.canvas2D.getCanvas()
            ]
        });
    }

    /**
     * Displays the Drag View mode on the Canvas.
     */
    show () {
        this.canvas2D.logic();
    }

    /**
     * Hides the Drag View mode from the Canvas.
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
     * @return: Drag View main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}