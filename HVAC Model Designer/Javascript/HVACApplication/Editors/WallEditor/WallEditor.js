/**
 * Created by matt on 2/6/17.
 */

class WallEditor {
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;
        this.mainDiv = CreateElement({type: 'div', className: 'WallEditor_mainDiv', elements: [
            this.topBarDiv = CreateElement({
                type: 'div', className: 'WallEditor_TopBar', elements: [
                    this.createViewTab = CreateElement({
                        type: 'div', className: 'WallEditor_CreateViewTab',
                        onClick: CreateFunction(this, this.createViewTabClick), text: "Create Wall"
                    }),
                    this.editPointViewTab = CreateElement({
                        type: 'div', className: 'WallEditor_EditPointViewTab',
                        onClick: CreateFunction(this, this.editPointViewClick), text: "Edit Point"
                    }),
                    this.editCornerViewTab = CreateElement({
                        type: 'div', className: 'WallEditor_EditCornerViewTab',
                        onClick: CreateFunction(this, this.editCornerViewClick), text: "Edit Corner"
                    }),
                    this.deleteViewTab = CreateElement({
                        type: 'div', className: 'WallEditor_DeleteViewTab',
                        onClick: CreateFunction(this, this.deleteViewClick), text: "Delete"
                    })
                ]
            }),
            this.mainContentDiv = CreateElement({type: 'div', className: 'WallEditor_MainContent'})
        ]});

        this.createView = new CreateView(hvacApplication);
        this.deleteView = new DeleteView(hvacApplication);
        this.editCornerView = new EditCornerView(hvacApplication);
        this.editPointView = new EditPointView(hvacApplication);

        this.viewController = null;

        this.createViewTabClick();
    }

    deselectAllTabs() {
        this.createViewTab.className = "WallEditor_CreateViewTab";
        this.editPointViewTab.className = "WallEditor_EditPointViewTab";
        this.editCornerViewTab.className = "WallEditor_EditCornerViewTab";
        this.deleteViewTab.className = "WallEditor_DeleteViewTab";

        if (this.viewController != null) {
            this.viewController.hide();
            this.viewController.getDiv().remove();
        }
    }

    selectCurrentTab() {
        this.mainContentDiv.appendChild(this.viewController.getDiv());
        this.viewController.show();
    }

    createViewTabClick () {
        this.deselectAllTabs();

        this.createViewTab.className = "WallEditor_CreateViewTab selected";
        this.viewController = this.createView;

        this.selectCurrentTab();
    }

    editPointViewClick () {
        this.deselectAllTabs();

        this.editPointViewTab.className = "WallEditor_EditPointViewTab selected";
        this.viewController = this.editPointView;

        this.selectCurrentTab();
    }

    editCornerViewClick () {
        this.deselectAllTabs();

        this.editCornerViewTab.className = "WallEditor_EditCornerViewTab selected";
        this.viewController = this.editCornerView;

        this.selectCurrentTab();
    }

    deleteViewClick () {
        this.deselectAllTabs();

        this.deleteViewTab.className = "WallEditor_DeleteViewTab selected";
        this.viewController = this.deleteView;

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