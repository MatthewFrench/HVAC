/**
 * Created by matt on 2/6/17.
 */

class EditCornerView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas2D = new Canvas2D({hvacApplication: hvacApplication, allowCornerEditing: true});
        this.mainDiv = CreateElement({type: 'div', className: 'EditCornerView_mainDiv', elements: [
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