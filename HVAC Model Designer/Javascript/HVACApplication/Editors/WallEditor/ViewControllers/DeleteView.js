/**
 * Created by matt on 2/6/17.
 */

/**
 * This includes the design of the interface for when the Delete tab is selected within the Wall Editor, and the
 * elements that are shown.
 */
class DeleteView {

    /**
     * Initializes the elements shown on the Canvas in Delete mode.
     *
     * @param hvacApplication: The overall control that the Delete mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas2D = new Canvas2D({
            hvacApplication: hvacApplication,
            allowDeletingWalls: true
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'DeleteView_mainDiv',
            elements: [
                this.canvas2D.getCanvas(),
                CreateElement({
                    type: "button",
                    text: "Clear Walls",
                    className: "DeleteView_deleteWallsButton",
                    onClick: CreateFunction(this, this.deleteWalls)
                })
            ]
        });
    }

    /**
     * Asks if user would like to erase all of the walls of the current floor. Will continue with deleting all of the
     * walls if user answers 'Yes'.
     */
    deleteWalls() {
        this.hvacApplication.viewAngle = 0;
        this.hvacApplication.viewScale = 1.0;
        var newPopover = new StartOverPopover('Are you sure you want to start this floor from scratch?',
            CreateFunction(this, function () {
                this.hvacApplication.getCurrentFloorPlan().clearWalls();
            })
        );
        newPopover.show(this.hvacApplication.applicationDiv);
    }

    /**
     * Displays the Delete mode on the Canvas.
     */
    show () {
        this.canvas2D.logic();
    }

    /**
     * Hides the Delete mode from the Canvas.
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
     * @return: Delete main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}