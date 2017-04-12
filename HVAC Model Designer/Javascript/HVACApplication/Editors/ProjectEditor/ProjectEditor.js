/**
 * Created by Austin03 on 4/4/17.
 */

class ProjectEditor {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.buildingPickerWindow = new BuildingPicker(this.hvacApplication, this.hvacApplication.hvacData);

        this.mainDiv = CreateElement({type: 'div', className: 'ProjectEditor_mainDiv', elements: [
            this.topBarDiv = CreateElement({
                type: 'div', className: 'ProjectEditor_TopBar'
            }),
            this.mainContentDiv = CreateElement({type: 'div', className: 'ProjectEditor_MainContent', elements: [
                this.buildingPickerWindow.getDiv()
            ]})
        ]});

    }

    show () {}
    hide () {}

    logic() {}

    getDiv() {
        return this.mainDiv;
    }
}