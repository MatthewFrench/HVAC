/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initDragModeVariables = function () {
    "use strict";

}

HVACApplication.prototype.mousePressedDragModeLayout = function () {
    "use strict";
};

HVACApplication.prototype.mouseMovedDragModeLayout = function () {
    "use strict";

    var movedX = this.previousMouseX - this.currentMouseX;
    var movedY = this.previousMouseY - this.currentMouseY;

    if (this.mouseDown) {
        this.dragPositionX -= movedX;
        this.dragPositionY -= movedY;
    }

};

HVACApplication.prototype.mouseReleasedDragModeLayout = function () {
    "use strict";


    var canvasMouseX = this.currentMouseX - this.dragPositionX;
    var canvasMouseY = this.currentMouseY - this.dragPositionY;

};

HVACApplication.prototype.drawDragModeLayout = function () {
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