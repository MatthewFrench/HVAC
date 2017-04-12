/**
 * Created by matt on 4/5/17.
 */

class Simulator {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.simulatorCanvas = new SimulatorCanvas({hvacApplication: hvacApplication});
        this.mainDiv = CreateElement({type: 'div', className: 'Simulator_mainDiv', elements: [
            this.simulatorCanvas.getCanvas(),
            CreateElement({type: 'button', text: '+', className: 'Simulator_Increase_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.increaseDensity()
            })}),
            CreateElement({type: 'button', text: '-', className: 'Simulator_Decrease_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.decreaseDensity()
            })}),
            CreateElement({type: 'button', text: '+', className: 'Simulator_Increase_Speed_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.increaseLogicSpeed()
            })}),
            CreateElement({type: 'button', text: '-', className: 'Simulator_Decrease_Speed_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.decreaseLogicSpeed()
            })})

            ,
            CreateElement({type: 'button', text: 'Hot', className: 'Simulator_Hot_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.setOutsideHot()
            })}),
            CreateElement({type: 'button', text: 'Cold', className: 'Simulator_Cold_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.setOutsideCold()
            })})

            //Inside Hot Cold Buttons

            ,
            CreateElement({type: 'button', text: 'Hot', className: 'Simulator_Inside_Hot_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.resetInsideHot()
            })}),
            CreateElement({type: 'button', text: 'Cold', className: 'Simulator_Inside_Cold_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.resetInsideCold()
            })})

            //Vent buttons

            ,
            CreateElement({type: 'button', text: 'Hot', className: 'Simulator_Vent_Hot_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.addHotVent()
            })}),
            CreateElement({type: 'button', text: 'Cold', className: 'Simulator_Vent_Cold_Button', onClick: CreateFunction(this, function(){
                this.simulatorCanvas.addColdVent()
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