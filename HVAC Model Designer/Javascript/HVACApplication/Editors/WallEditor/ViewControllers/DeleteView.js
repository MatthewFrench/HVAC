/**
 * Created by matt on 2/6/17.
 */

class DeleteView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'DeleteView_mainDiv'});
    }

    show () {}
    hide () {}

    logic() {

    }

    getDiv() {
        return this.mainDiv;
    }
}