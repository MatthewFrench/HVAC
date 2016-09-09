/**
 * Created by Matt on 9/9/16.
 */
var WallObject = function (x1, y1, x2, y2) {
    "use strict";

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

WallObject.prototype.draw = function(context) {
    context.strokeStyle = "white";

    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();
}