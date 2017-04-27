/**
 * Created by matt on 2/6/17.
 *
 * Creates the Create Mode of the canvas when the Create View tab is selected.
 */

/**
 * This includes the design of the interface for when the Create tab is selected within the Wall Editor, and the
 * elements that are shown.
 */
class CreateView {

    /**
     * Initializes the elements shown on the Canvas in Create mode.
     *
     * @param hvacApplication: The overall control that the Create mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas2D = new Canvas2D({
            hvacApplication: hvacApplication,
            allowCreatingWalls: true
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'CreateView_mainDiv',
            elements: [
                this.canvas2D.getCanvas()
            ]
        });
    }

    /**
     * Displays the Create mode on the Canvas.
     */
    show () {
        this.canvas2D.logic();
    }

    /**
     * Hides the Create mode from the Canvas.
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
     * @return: Create main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}