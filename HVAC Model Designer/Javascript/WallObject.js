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

WallObject.prototype.draw = function(context, showHandles) {
    context.strokeStyle = "white";

    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();

    if (showHandles) {
        drawHandle(context, this.x1, this.y1);
        drawHandle(context, this.x2, this.y2);
    }
}

function drawHandle(context, x, y) {
    "use strict";
    context.lineWidth = 2;
    context.strokeStyle = "rgb(100,150,255)";
    context.beginPath();
    context.arc(x,y,20,0,2*Math.PI);
    context.stroke();

    context.globalAlpha = 0.5;
    context.fillStyle = "rgb(150,200,255)";
    context.beginPath();
    context.arc(x,y,10,0,2*Math.PI);
    context.fill();
    context.globalAlpha = 1.0;
}