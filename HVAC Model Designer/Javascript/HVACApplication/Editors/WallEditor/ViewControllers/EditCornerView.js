/**
 * Created by matt on 2/6/17.
 */

class EditCornerView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'EditCornerView_mainDiv'});
    }

    show () {}
    hide () {}

    logic() {

    }

    getDiv() {
        return this.mainDiv;
    }
}