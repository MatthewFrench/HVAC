/**
 * Created by matt on 2/6/17.
 */

class ViewEditor {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'ViewEditor_mainDiv', elements: [
            this.topBarDiv = CreateElement({
                type: 'div', className: 'ViewEditor_TopBar', elements: [
                    this.dragTab = CreateElement({
                        type: 'div', className: 'ViewEditor_DragTab',
                        onClick: CreateFunction(this, this.dragTabClick), text: "Drag 2D"
                    }),
                    this.rotateTab = CreateElement({
                        type: 'div', className: 'ViewEditor_RotateTab',
                        onClick: CreateFunction(this, this.rotateTabClick), text: "Rotate 2D"
                    }),
                    this.view3DTab = CreateElement({
                        type: 'div', className: 'ViewEditor_View3DTab',
                        onClick: CreateFunction(this, this.view3DTabClick), text: "View 3D"
                    })
                ]
            }),
            this.mainContentDiv = CreateElement({type: 'div', className: 'ViewEditor_MainContent'})
        ]});

        this.dragView = new DragView(hvacApplication);
        this.rotateView = new RotateView(hvacApplication);
        this.threeDView = new ThreeDView(hvacApplication);

        this.viewController = null;

        this.dragTabClick();
    }

    deselectAllTabs() {
        this.dragTab.className = "ViewEditor_DragTab";
        this.rotateTab.className = "ViewEditor_RotateTab";
        this.view3DTab.className = "ViewEditor_View3DTab";

        if (this.viewController != null) {
            this.viewController.hide();
            this.viewController.getDiv().remove();
        }
    }

    selectCurrentTab() {
        this.mainContentDiv.appendChild(this.viewController.getDiv());
        this.viewController.show();
    }

    dragTabClick () {
        this.deselectAllTabs();

        this.dragTab.className = "ViewEditor_DragTab selected";
        this.viewController = this.dragView;

        this.selectCurrentTab();
    }

    rotateTabClick () {
        this.deselectAllTabs();

        this.rotateTab.className = "ViewEditor_RotateTab selected";
        this.viewController = this.rotateView;

        this.selectCurrentTab();
    }

    view3DTabClick () {
        this.deselectAllTabs();

        this.view3DTab.className = "ViewEditor_View3DTab selected";
        this.viewController = this.threeDView;

        this.selectCurrentTab();
    }

    show () {}
    hide () {}

    logic() {
        if (this.viewController != null) this.viewController.logic();
    }

    getDiv() {
        return this.mainDiv;
    }
}