/**
 * Created by matt on 2/6/17.
 *
 * Creates the EditPoint Mode of the canvas when the Create View tab is selected.
 */

/**
 * This includes the design of the interface for when the Edit Point tab is selected within the Wall Editor, and
 * the elements that are shown.
 */
class EditPointView {

    /**
     * Initializes the elements shown on the Canvas in Edit Point mode.
     *
     * @param hvacApplication: The overall control that the Edit Point mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas2D = new Canvas2D({
            hvacApplication: hvacApplication,
            allowEditingPoints: true
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'EditPointView_mainDiv',
            elements: [
                this.canvas2D.getCanvas()
            ]
        });
    }

    /**
     * Displays the Edit Point mode on the Canvas.
     */
    show () {
        this.canvas2D.logic();
    }

    /**
     * Hides the Edit Point mode from the Canvas.
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
     * @return: Edit Point main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}