/**
 * Created by matt on 2/6/17.
 */

class DeleteView {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.canvas2D = new Canvas2D({hvacApplication: hvacApplication, allowDeletingWalls: true});
        this.mainDiv = CreateElement({type: 'div', className: 'DeleteView_mainDiv', elements: [
            this.canvas2D.getCanvas(),
            CreateElement({type: "button",
                           text: "Clear Walls",
                           className: "DeleteView_deleteWallsButton",
                           onClick: CreateFunction(this, this.deleteWalls)})
        ]});
    }

    deleteWalls() {
        this.hvacApplication.viewAngle = 0;
        this.hvacApplication.viewScale = 1.0;
        var newPopover = new StartOverPopover('Are you sure you want to start this floor from scratch?',
            CreateFunction(this, function () {
                this.hvacApplication.getCurrentFloorPlan().clearWalls();
            }));
        newPopover.show(this.hvacApplication.applicationDiv);
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