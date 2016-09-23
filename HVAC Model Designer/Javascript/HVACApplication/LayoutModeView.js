/**
 * Created by Matt on 9/23/2016.
 */

HVACApplication.prototype.initViewModeVariables = function () {
    "use strict";

}

HVACApplication.prototype.mousePressedViewModeLayout = function () {
    "use strict";
};

HVACApplication.prototype.mouseMovedViewModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    if (this.mouseDown) {
        this.dragPositionX -= movedX;
        this.dragPositionY -= movedY;
    }

};

HVACApplication.prototype.mouseReleasedViewModeLayout = function () {
    "use strict";


    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;
};

HVACApplication.prototype.drawViewModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, false);
    }

    ctx.restore();
}