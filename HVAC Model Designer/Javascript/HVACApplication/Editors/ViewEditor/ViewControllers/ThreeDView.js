/**
 * Created by matt on 2/6/17.
 */

class ThreeDView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas3D = new Canvas3D({hvacApplication: hvacApplication});
        this.mainDiv = CreateElement({type: 'div', className: 'ThreeDView_mainDiv', elements: [
            this.canvas3D.getCanvas(),
            this.dragButton = CreateElement({
                type: 'button', text: 'Drag', className: 'ThreeDView_DragButton', onClick: CreateFunction(this, function () {
                    this.dragButtonClicked();
                })
            }),
            this.rotateButton = CreateElement({
                type: 'button', text: 'Rotate', className: 'ThreeDView_RotateButton', onClick: CreateFunction(this, function () {
                    this.rotateButtonClicked();
                })
            }),
            this.orbitButton = CreateElement({
                type: 'button', text: 'Orbit', className: 'ThreeDView_OrbitButton', onClick: CreateFunction(this, this.orbitButtonClicked)
            }),
            this.showAllFloorsButton = CreateElement({
                type: 'button', text: 'Show All Floors', className: 'ThreeDView_AllFloorsButton', onClick: CreateFunction(this, this.showAllFloors)
            })
        ]});
    }

    show() {
        this.canvas3D.show();
    }

    hide() {
        this.canvas3D.hide();
    }

    logic() {
        this.canvas3D.logic();
    }

    rotateButtonClicked() {
        this.canvas3D.switchToRotateMode();
    };

    dragButtonClicked() {
        this.canvas3D.switchToDragMode();
    }

    orbitButtonClicked() {
        this.canvas3D.switchToOrbitMode();
    }

    showAllFloors() {
        this.canvas3D.showAllFloors();
    }

    getDiv() {
        return this.mainDiv;
    }
}