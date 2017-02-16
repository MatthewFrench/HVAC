/**
 * Created by matt on 2/6/17.
 */

class WallEditor {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', class: 'WallEditor_mainDiv'});
    }

    getDiv() {
        return this.mainDiv;
    }
}