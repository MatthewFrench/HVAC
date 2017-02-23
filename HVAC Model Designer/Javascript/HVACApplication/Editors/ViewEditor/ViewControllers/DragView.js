/**
 * Created by matt on 2/23/17.
 */

class DragView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas2D = new Canvas2D({hvacApplication: hvacApplication, allowDragging: true});
        this.mainDiv = CreateElement({type: 'div', className: 'DragView_mainDiv', elements: [
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