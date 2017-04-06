/**
 * Created by matt on 4/5/17.
 */

class Simulator {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.simulatorCanvas = new SimulatorCanvas({hvacApplication: hvacApplication});
        this.mainDiv = CreateElement({type: 'div', className: 'Simulator_mainDiv', elements: [
            this.simulatorCanvas.getCanvas(),
            CreateElement({type: 'button', text: 'Increase Density', className: 'Simulator_Increase_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.increaseDensity()
            })}),
            CreateElement({type: 'button', text: 'Decrease Density', className: 'Simulator_Decrease_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.decreaseDensity()
            })})
        ]});
    }

    show () {
        this.simulatorCanvas.show();
        this.simulatorCanvas.logic();
    }
    hide () {
        this.simulatorCanvas.hide();
    }

    logic() {
        this.simulatorCanvas.logic();
    }

    getDiv() {
        return this.mainDiv;
    }
}