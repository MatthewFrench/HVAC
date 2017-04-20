/**
 * Created by matt on 2/6/17.
 */

/**
 * This includes the design of the interface for when the Wall Editor tab is selected and the elements that are shown.
 */
class WallEditor {

    /**
     * Initializes the elements shown on the Canvas in Wall Editor.
     *
     * @param hvacApplication: The overall control that the Wall Editor is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.mainDiv = CreateElement({
            type: 'div',
            className: 'WallEditor_mainDiv',
            elements: [
                this.topBarDiv = CreateElement({
                    type: 'div',
                    className: 'WallEditor_TopBar',
                    elements: [
                        this.createViewTab = CreateElement({
                            type: 'div',
                            className: 'WallEditor_CreateViewTab',
                            onClick: CreateFunction(this, this.createViewTabClick),
                            text: "Create Wall"
                        }),
                        this.editPointViewTab = CreateElement({
                            type: 'div',
                            className: 'WallEditor_EditPointViewTab',
                            onClick: CreateFunction(this, this.editPointViewClick),
                            text: "Edit Point"
                        }),
                        this.editCornerViewTab = CreateElement({
                            type: 'div',
                            className: 'WallEditor_EditCornerViewTab',
                            onClick: CreateFunction(this, this.editCornerViewClick),
                            text: "Edit Corner"
                        }),
                        this.deleteViewTab = CreateElement({
                            type: 'div',
                            className: 'WallEditor_DeleteViewTab',
                            onClick: CreateFunction(this, this.deleteViewClick),
                            text: "Delete"
                        })
                    ]
                }),
                this.mainContentDiv = CreateElement({
                    type: 'div',
                    className: 'WallEditor_MainContent'
                })
            ]
        });

        this.createView = new CreateView(hvacApplication);
        this.deleteView = new DeleteView(hvacApplication);
        this.editCornerView = new EditCornerView(hvacApplication);
        this.editPointView = new EditPointView(hvacApplication);

        this.viewController = null;

        this.createViewTabClick();
    }

    /**
     * Deselects all tabs and hides the current viewController.
     */
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

    /**
     * Displays the currently selected tab.
     */
    selectCurrentTab() {
        this.mainContentDiv.appendChild(this.viewController.getDiv());
        this.viewController.show();
    }

    /**
     * Highlights the Create tab and displays its ViewController when clicked.
     */
    createViewTabClick() {
        this.deselectAllTabs();

        this.createViewTab.className = "WallEditor_CreateViewTab selected";
        this.viewController = this.createView;

        this.selectCurrentTab();
    }

    /**
     * Highlights the Edit Point tab and displays its ViewController when clicked.
     */
    editPointViewClick() {
        this.deselectAllTabs();

        this.editPointViewTab.className = "WallEditor_EditPointViewTab selected";
        this.viewController = this.editPointView;

        this.selectCurrentTab();
    }

    /**
     * Highlights the Edit Corner tab and displays its ViewController when clicked.
     */
    editCornerViewClick () {
        this.deselectAllTabs();

        this.editCornerViewTab.className = "WallEditor_EditCornerViewTab selected";
        this.viewController = this.editCornerView;

        this.selectCurrentTab();
    }

    /**
     * Highlights the Delete tab and displays its ViewController when clicked.
     */
    deleteViewClick () {
        this.deselectAllTabs();

        this.deleteViewTab.className = "WallEditor_DeleteViewTab selected";
        this.viewController = this.deleteView;

        this.selectCurrentTab();
    }

    /**
     * Displays the Wall Editor on the Canvas.
     */
    show() {}

    /**
     * Hides the Wall Editor from the Canvas.
     */
    hide() {}

    /**
     * Basic boolean logic operations.
     */
    logic() {
        if (this.viewController != null) this.viewController.logic();
    }

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: Wall Editor main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}