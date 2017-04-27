/**
 * Created by matt on 4/5/17.
 *
 * Creates the Simulator tab for the interface.
 */

/**
 * This includes the design of the interface for when the Simulator tab is selected and the elements that are shown.
 */
class Simulator {

    /**
     * Initializes the elements shown on the Canvas in Simulator.
     *
     * @param hvacApplication: The overall control that the Simulator is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.simulatorCanvas = new SimulatorCanvas({hvacApplication: hvacApplication});

        this.mainDiv = CreateElement({
            type: 'div',
            className: 'Simulator_mainDiv',
            elements: [
                this.simulatorCanvas.getCanvas(),
                //Density Increase Button
                CreateElement({
                    type: 'button',
                    text: '+',
                    className: 'Simulator_Increase_Density_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.increaseDensity()
                    })
                }),
                //Density Decrease Button
                CreateElement({
                    type: 'button',
                    text: '-',
                    className: 'Simulator_Decrease_Density_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.decreaseDensity()
                    })
                }),
                //Logic Speed Increase Button
                CreateElement({
                    type: 'button',
                    text: '+',
                    className: 'Simulator_Increase_Speed_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.increaseLogicSpeed()
                    })
                }),
                //Logic Speed Decrease Button
                CreateElement({
                    type: 'button',
                    text: '-',
                    className: 'Simulator_Decrease_Speed_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.decreaseLogicSpeed()
                    })
                }),
                //Outside Hot Button
                CreateElement({
                    type: 'button',
                    text: 'Hot',
                    className: 'Simulator_Hot_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.setOutsideHot()
                    })
                }),
                //Outside Cold Button
                CreateElement({
                    type: 'button',
                    text: 'Cold',
                    className: 'Simulator_Cold_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.setOutsideCold()
                    })
                }),
                //Inside Hot Button
                CreateElement({
                    type: 'button',
                    text: 'Hot',
                    className: 'Simulator_Inside_Hot_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.resetInsideHot()
                    })
                }),
                //Inside Cold Button
                CreateElement({
                    type: 'button',
                    text: 'Cold',
                    className: 'Simulator_Inside_Cold_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.resetInsideCold()
                    })
                }),
                //Vent Hot Button
                CreateElement({
                    type: 'button',
                    text: 'Hot',
                    className: 'Simulator_Vent_Hot_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.addHotVent()
                    })
                }),
                //Vent Cold Button
                CreateElement({
                    type: 'button',
                    text: 'Cold',
                    className: 'Simulator_Vent_Cold_Button',
                    onClick: CreateFunction(this, function(){
                        this.simulatorCanvas.addColdVent()
                    })
                })
            ]
        });
    }

    /**
     * Displays the Simulator on the Canvas.
     */
    show () {
        this.simulatorCanvas.show();
        this.simulatorCanvas.logic();
    }

    /**
     * Hides the Simulator from the Canvas.
     */
    hide () {
        this.simulatorCanvas.hide();
    }

    /**
     * Basic boolean logic operations.
     */
    logic() {
        this.simulatorCanvas.logic();
    }

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: Simulator main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}