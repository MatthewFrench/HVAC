/**
 * Created by Matt on 9/19/16.
 */

//Creates and initializes the Drag variable
HVACApplication.prototype.initDragModeVariables = function () {
    "use strict";
};

//Shows the Drag Mode Layout
HVACApplication.prototype.showDragModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is pressed down.
HVACApplication.prototype.mousePressedDragModeLayout = function () {
    "use strict";
};

//Action taken for when the mouse is moving.
HVACApplication.prototype.mouseMovedDragModeLayout = function () {
    "use strict";

    if (this.mouseDown) {

        for (var i = 0; i < this.getCurrentWallList().length; i++) {
            var wall = this.getCurrentWallList()[i];
            wall.setPoint1X(wall.getPoint1X() - this.rotatedCanvasMouseMovedX);
            wall.setPoint2X(wall.getPoint2X() - this.rotatedCanvasMouseMovedX);
            wall.setPoint1Y(wall.getPoint1Y() - this.rotatedCanvasMouseMovedY);
            wall.setPoint2Y(wall.getPoint2Y() - this.rotatedCanvasMouseMovedY);
        }

    }
};

//Action taken for when the mouse is released.
HVACApplication.prototype.mouseReleasedDragModeLayout = function () {
    "use strict";

};

//Redraws the display on the canvas.
HVACApplication.prototype.drawDragModeLayout = function () {
    "use strict";
    var ctx = this.beginDraw();


    //Draw above and below floors
    var floorList = this.getCurrentBuilding().getFloorList();
    var currentFloor = this.getCurrentFloorPlan();
    var currentFloorIndex = floorList.indexOf(currentFloor);

    if (currentFloorIndex > 0) {
        var underneathFloor = floorList[currentFloorIndex - 1];
        for (var j = 0; j < underneathFloor.getWallList().length; j++) {
            var wall = underneathFloor.getWallList()[j];
            wall.drawDotted(ctx, true);
        }
    }
    if (currentFloorIndex < floorList.length - 1) {
        var aboveFloor = floorList[currentFloorIndex + 1];
        for (var j = 0; j < aboveFloor.getWallList().length; j++) {
            var wall = aboveFloor.getWallList()[j];
            wall.drawDotted(ctx, false);
        }
    }

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    this.endDraw(ctx);
};