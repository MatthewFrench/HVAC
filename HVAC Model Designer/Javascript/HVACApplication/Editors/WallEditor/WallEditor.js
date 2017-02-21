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

        this.currentEditor = null;

        this.createViewTabClick();
    }

    deselectAllTabs() {
        this.createViewTab.className = "WallEditor_CreateViewTab";
        this.editPointViewTab.className = "WallEditor_EditPointViewTab";
        this.editCornerViewTab.className = "WallEditor_EditCornerViewTab";
        this.deleteViewTab.className = "WallEditor_DeleteViewTab";

        if (this.currentEditor != null) {
            this.currentEditor.hide();
            this.currentEditor.getDiv().remove();
        }
    }

    selectCurrentTab() {
        this.mainContentDiv.appendChild(this.currentEditor.getDiv());
        this.currentEditor.show();
    }

    createViewTabClick () {
        this.deselectAllTabs();

        this.createViewTab.className = "WallEditor_CreateViewTab selected";
        this.currentEditor = this.createView;

        this.selectCurrentTab();
    }

    editPointViewClick () {
        this.deselectAllTabs();

        this.editPointViewTab.className = "WallEditor_EditPointViewTab selected";
        this.currentEditor = this.editPointView;

        this.selectCurrentTab();
    }

    editCornerViewClick () {
        this.deselectAllTabs();

        this.editCornerViewTab.className = "WallEditor_EditCornerViewTab selected";
        this.currentEditor = this.editCornerView;

        this.selectCurrentTab();
    }

    deleteViewClick () {
        this.deselectAllTabs();

        this.deleteViewTab.className = "WallEditor_DeleteViewTab selected";
        this.currentEditor = this.deleteView;

        this.selectCurrentTab();
    }

    show () {}
    hide () {}

    getDiv() {
        return this.mainDiv;
    }
}