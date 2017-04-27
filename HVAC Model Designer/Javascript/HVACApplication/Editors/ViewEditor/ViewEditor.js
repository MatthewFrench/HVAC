/**
 * Created by matt on 2/6/17.
 *
 * Creates the ViewEditor tab for the interface.
 */

/**
 * This includes the design of the interface for when the View Editor tab is selected and the elements that are shown.
 */
class ViewEditor {

    /**
     * Initializes the elements shown on the Canvas in View Editor.
     *
     * @param hvacApplication: The overall control that the View Editor is a part of.
     * @constructor
     */
    constructor(hvacApplication) {
        this.hvacApplication = hvacApplication;

        this.mainDiv = CreateElement({
            type: 'div',
            className: 'ViewEditor_mainDiv',
            elements: [
                this.topBarDiv = CreateElement({
                    type: 'div',
                    className: 'ViewEditor_TopBar',
                    elements: [
                        this.dragTab = CreateElement({
                            type: 'div',
                            className: 'ViewEditor_DragTab',
                            onClick: CreateFunction(this, this.dragTabClick),
                            text: "Drag 2D"
                        }),
                        this.rotateTab = CreateElement({
                            type: 'div',
                            className: 'ViewEditor_RotateTab',
                            onClick: CreateFunction(this, this.rotateTabClick),
                            text: "Rotate 2D"
                        }),
                        this.view3DTab = CreateElement({
                            type: 'div',
                            className: 'ViewEditor_View3DTab',
                            onClick: CreateFunction(this, this.view3DTabClick),
                            text: "View 3D"
                        })
                    ]
                }),
                this.mainContentDiv = CreateElement({
                    type: 'div',
                    className: 'ViewEditor_MainContent'
                })
            ]
        });

        this.dragView = new DragView(hvacApplication);
        this.rotateView = new RotateView(hvacApplication);
        this.threeDView = new ThreeDView(hvacApplication);

        this.viewController = null;

        this.dragTabClick();
    }

    /**
     * Deselects all tabs and hides the current viewController.
     */
    deselectAllTabs() {
        this.dragTab.className = "ViewEditor_DragTab";
        this.rotateTab.className = "ViewEditor_RotateTab";
        this.view3DTab.className = "ViewEditor_View3DTab";

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
     * Highlights the Drag View tab and displays its ViewController when clicked.
     */
    dragTabClick () {
        this.deselectAllTabs();

        this.dragTab.className = "ViewEditor_DragTab selected";
        this.viewController = this.dragView;

        this.selectCurrentTab();
    }

    /**
     * Highlights the Rotate View tab and displays its ViewController when clicked.
     */
    rotateTabClick () {
        this.deselectAllTabs();

        this.rotateTab.className = "ViewEditor_RotateTab selected";
        this.viewController = this.rotateView;

        this.selectCurrentTab();
    }

    /**
     * Highlights the 3D View tab and displays its ViewController when clicked.
     */
    view3DTabClick () {
        this.deselectAllTabs();

        this.view3DTab.className = "ViewEditor_View3DTab selected";
        this.viewController = this.threeDView;

        this.selectCurrentTab();
    }

    /**
     * Displays the View Editor on the Canvas.
     */
    show () {
        this.viewController.show();
    }

    /**
     * Hides the View Editor from the Canvas.
     */
    hide () {
        this.viewController.hide();
    }

    /**
     * Basic boolean logic operations.
     */
    logic() {
        if (this.viewController != null) this.viewController.logic();
    }

    /**
     * Returns all the elements that this Div contains.
     *
     * @return: View Editor main Div.
     */
    getDiv() {
        return this.mainDiv;
    }
}