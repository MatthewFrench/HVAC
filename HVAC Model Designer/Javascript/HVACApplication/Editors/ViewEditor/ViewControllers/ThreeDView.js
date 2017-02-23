/**
 * Created by matt on 2/6/17.
 */

class ThreeDView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'ThreeDView_mainDiv', elements: []});
    }

    show () {
    }
    hide () {}

    logic() {
    }

    getDiv() {
        return this.mainDiv;
    }
}