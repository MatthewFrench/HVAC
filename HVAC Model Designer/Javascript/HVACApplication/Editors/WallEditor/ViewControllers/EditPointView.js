/**
 * Created by matt on 2/6/17.
 */

class EditPointView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'EditPointView_mainDiv'});
    }

    show () {}
    hide () {}

    logic() {

    }

    getDiv() {
        return this.mainDiv;
    }
}