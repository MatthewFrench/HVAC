/**
 * Created by matt on 2/6/17.
 *
 * Creates the EditCorner Mode of the canvas when the Create View tab is selected.
 */

/**
 * This includes the design of the interface for when the Edit Corner tab is selected within the Wall Editor, and
 * the elements that are shown.
 */
class EditCornerView {

    /**
     * Initializes the elements shown on the Canvas in Edit Corner mode.
     *
     * @param hvacApplication: The overall control that the Edit Corner mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas2D = new Canvas2D({
            hvacApplication: hvacApplication,
            allowCornerEditing: true
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'EditCornerView_mainDiv',
            elements: [
                this.canvas2D.getCanvas()
            ]
        });
    }

    /**
     * Displays the Edit Corner mode on the Canvas.
     */
    show () {
        this.canvas2D.logic();
    }

    /**
     * Hides the Edit Corner mode from the Canvas.
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
     * @return: Edit Corner main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}