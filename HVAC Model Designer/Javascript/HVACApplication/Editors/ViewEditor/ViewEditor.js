/**
 * Created by matt on 2/6/17.
 */

class ViewEditor {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'ViewEditor_mainDiv'});
    }

    show () {}
    hide () {}

    getDiv() {
        return this.mainDiv;
    }
}