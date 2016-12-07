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

    var floorList = this.getCurrentBuilding().getFloorList();
    var currentFloor = this.getCurrentFloorPlan();
    var underneathFloors = [];
    var aboveFloors = [];

    for (var i = 0; i < floorList.length; i++) {
        if (i < floorList.indexOf(currentFloor)) {
            underneathFloors.push(floorList[i]);
        }
        else if (i > floorList.indexOf(currentFloor)) {
            aboveFloors.push(floorList[i]);
        }
    }

    for (var i = 0; i < underneathFloors.length; i++) {
        for (var j = 0; j < underneathFloors[i].getWallList().length; j++) {
            var wall = underneathFloors[i].getWallList()[j];
            wall.drawDotted(ctx, true);
        }
    }

    for (var i = 0; i < aboveFloors.length; i++) {
        for (var j = 0; j < aboveFloors[i].getWallList().length; j++) {
            var wall = aboveFloors[i].getWallList()[j];
            wall.drawDotted(ctx, false);
        }
    }

    for (var i = 0; i < this.getCurrentWallList().length; i++) {
        var wall = this.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    this.endDraw(ctx);
};