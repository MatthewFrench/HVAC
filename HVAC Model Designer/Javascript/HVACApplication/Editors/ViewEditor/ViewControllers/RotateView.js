/**
 * Created by matt on 2/23/17.
 */

class RotateView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas2D = new Canvas2D({hvacApplication: hvacApplication, allowRotating: true});
        this.mainDiv = CreateElement({type: 'div', className: 'RotateView_mainDiv', elements: [
            this.canvas2D.getCanvas()
        ]});
    }

    show () {
        this.canvas2D.logic();
    }
    hide () {}

    logic() {
        this.canvas2D.logic();
    }

    getDiv() {
        return this.mainDiv;
    }
}