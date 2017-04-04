/**
 * Created by matt on 2/6/17.
 */

class RoomEditor {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'RoomEditor_mainDiv',
            text:"The purpose of the room editor is to allow setting wall properities and defining floors and ceilings for walls. This did not get completed."});
    }

    show () {}
    hide () {}

    logic() {

    }

    getDiv() {
        return this.mainDiv;
    }
}