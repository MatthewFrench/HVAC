/**
 * Created by Matt on 9/19/16.
 */

HVACApplication.prototype.initEditWallModeVariables = function () {
    "use strict";

};

HVACApplication.prototype.mousePressedEditWallModeLayout = function () {
    "use strict";
};

HVACApplication.prototype.mouseMovedEditWallModeLayout = function () {
    "use strict";

};

HVACApplication.prototype.mouseReleasedEditWallModeLayout = function () {
    "use strict";

};

HVACApplication.prototype.drawEditWallModeLayout = function () {
    "use strict";
    var ctx = this.layoutCanvas.getContext("2d");
    var canvasWidth = this.layoutCanvas.width;
    var canvasHeight = this.layoutCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(this.dragPositionX, this.dragPositionY);

    for (var i = 0; i < this.wallList.length; i++) {
        var wall = this.wallList[i];
        wall.draw(ctx, this.currentLayoutMode == LAYOUT_MODE_EDIT);
    }

    ctx.restore();
}