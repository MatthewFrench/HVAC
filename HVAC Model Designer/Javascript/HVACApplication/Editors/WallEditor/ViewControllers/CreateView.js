/**
 * Created by matt on 2/6/17.
 */

class CreateView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'CreateView_mainDiv'});
    }

    show () {}
    hide () {}

    getDiv() {
        return this.mainDiv;
    }
}