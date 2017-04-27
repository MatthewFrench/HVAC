/**
 * Created by matt on 2/6/17.
 *
 * Creates the 3D Mode of the canvas when the Drag View tab is selected.
 */

/**
 * This includes the design of the interface for when the 3D View tab is selected within the View Editor, and
 * the elements that are shown.
 */
class ThreeDView {

    /**
     * Initializes the elements shown on the Canvas in 3D View mode.
     *
     * @param hvacApplication: The overall control that the 3D View mode is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.canvas3D = new Canvas3D({
            hvacApplication: hvacApplication
        });
        this.mainDiv = CreateElement({
            type: 'div',
            className: 'ThreeDView_mainDiv',
            elements: [
                this.canvas3D.getCanvas(),
                this.dragButton = CreateElement({
                    type: 'button',
                    text: 'Drag',
                    className: 'ThreeDView_DragButton',
                    onClick: CreateFunction(this, function () {
                        this.dragButtonClicked();
                    })
                }),
                this.rotateButton = CreateElement({
                    type: 'button',
                    text: 'Rotate',
                    className: 'ThreeDView_RotateButton',
                    onClick: CreateFunction(this, function () {
                        this.rotateButtonClicked();
                    })
                }),
                this.orbitButton = CreateElement({
                    type: 'button',
                    text: 'Orbit',
                    className: 'ThreeDView_OrbitButton',
                    onClick: CreateFunction(this, this.orbitButtonClicked)
                }),
                this.showAllFloorsButton = CreateElement({
                    type: 'button',
                    text: 'Show All Floors',
                    className: 'ThreeDView_AllFloorsButton',
                    onClick: CreateFunction(this, this.showAllFloors)
                })
            ]
        });
    }

    /**
     * Displays the 3D View mode on the Canvas.
     */
    show() {
        this.canvas3D.show();
    }

    /**
     * Hides the 3D View mode from the Canvas.
     */
    hide() {
        this.canvas3D.hide();
    }

    /**
     * Basic boolean logic operations.
     */
    logic() {
        this.canvas3D.logic();
    }

    /**
     * Fires when the rotate button on the canvas is clicked. Switches to rotating mode.
     */
    rotateButtonClicked() {
        this.canvas3D.switchToRotateMode();
    };

    /**
     * Fires when the drag button on the canvas is clicked. Switches to dragging mode.
     */
    dragButtonClicked() {
        this.canvas3D.switchToDragMode();
    }

    /**
     * Fires when the orbit button on the canvas is clicked. Switches to orbiting mode.
     */
    orbitButtonClicked() {
        this.canvas3D.switchToOrbitMode();
    }

    /**
     * Fires when the showAllFloors button on the canvas is clicked. It displays all the floors of the project on top
     * of each other.
     */
    showAllFloors() {
        this.canvas3D.showAllFloors();
    }

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: 3D View main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}