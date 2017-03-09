/**
 * Created by matt on 2/6/17.
 */

class EditPointView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas2D = new Canvas2D({hvacApplication: hvacApplication, allowEditingPoints: true});
        this.mainDiv = CreateElement({type: 'div', className: 'EditPointView_mainDiv', elements: [
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