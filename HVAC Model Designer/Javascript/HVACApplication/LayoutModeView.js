/**
 * Created by Matt on 9/23/2016.
 *
 * This class deals with user interaction with the canvas when the Create Mode is selected.
 */

var scaleFactor = 1.1; //Ratio of how much the canvas should scale when zooming in/out

//Determines which view type is currently being displayed
var ViewModeType = {
    Mode2D: 0,
    Mode3D: 1
};

//Allows the handling of scrolling in View Mode.
var handleScroll = function(evt) {
        var delta;
        if (evt.wheelDelta) {
            delta = evt.wheelDelta / 40;
        }
        else if (evt.detail) {
            delta = -evt.detail;
        }
        else {
            delta = 0;
        }

        if (delta) {
            var factor = Math.pow(scaleFactor, delta);
            this.viewScale = factor * this.viewScale;

            if (this.viewScale > 2) {
                this.viewScale = 2;
            }
            else if (this.viewScale < 0.25) {
                this.viewScale = 0.25;
            }
        }
        evt.preventDefault();
};

/**
 * Creates and initializes the View Mode variables.
 */
HVACApplication.prototype.initViewModeVariables = function () {
    "use strict";
    this.currentViewModeLayout = ViewModeType.Mode2D;
    this.applicationDiv.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);
};

/**
 * Shows the View Mode Layout.
 */
HVACApplication.prototype.showViewModeLayout = function () {
    "use strict";
    if (this.currentViewModeLayout == ViewModeType.Mode3D) {
        this.viewMode3DController.show();
    }
};

//When the mouse is pressed down, calculates the current mouse point.
HVACApplication.prototype.mousePressedViewModeLayout = function () {
    "use strict";
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;
    this.mouseAngle = Math.atan2(this.canvasMouseX - canvasWidth/2, this.canvasMouseY - canvasHeight/2);
};

//When the mouse is moving, calculates the rotation angle based on how much the mouse moved.
HVACApplication.prototype.mouseMovedViewModeLayout = function () {
    "use strict";
    if (this.mouseDown) {
        var canvasWidth = this.layoutCanvas.width;
        var canvasHeight = this.layoutCanvas.height;
        var newMouseAngle = Math.atan2(this.canvasMouseX - canvasWidth/2, this.canvasMouseY - canvasHeight/2);
        this.viewAngle -= (newMouseAngle - this.mouseAngle);// * 180 / Math.PI;;
        this.mouseAngle = newMouseAngle;
    }
};

//Action taken for when the mouse is released. Currently has no effect on anything by itself.
HVACApplication.prototype.mouseReleasedViewModeLayout = function () {
    "use strict";
};

//Redraws the display on the canvas.
HVACApplication.prototype.drawViewModeLayout = function () {
    "use strict";
    if (this.currentViewModeLayout == ViewModeType.Mode2D) {
        var ctx = this.beginDraw();

        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.draw(ctx, false);
        }

        this.endDraw(ctx);
    } else if (this.currentViewModeLayout = ViewModeType.Mode3D) {
        this.viewMode3DController.drawLayout();
    }
};