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
    context.lineCap = "round";
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();

    if (showHandles) {
        drawHandle(context, this.x1, this.y1);
        drawHandle(context, this.x2, this.y2);
    }
}

WallObject.prototype.drawPerpendicular = function(context, nearPointArray) {

    var line1Near = false;
    var line2Near = false;
    var line3Near = false;

    var line = getPerpendicularInfiniteLinePoint1(this.x1, this.y1, this.x2, this.y2);
    var line2 = getPerpendicularInfiniteLinePoint2(this.x1, this.y1, this.x2, this.y2);
    var line3 = getLongerLine(this.x1, this.y1, this.x2, this.y2);

    var nearPixels = 25.0;
    for (var i = 0; i < nearPointArray.length; i++) {
        var point = nearPointArray[i];

        var nearPoint1 = nearestPointOnLine( line.x1,  line.y1,  line.x2,  line.y2,  point.x,  point.y);
        var nearPoint2 = nearestPointOnLine( line2.x1,  line2.y1,  line2.x2,  line2.y2,  point.x,  point.y);
        var nearPoint3 = nearestPointOnLine( line3.x1,  line3.y1,  line3.x2,  line3.y2,  point.x,  point.y);

        if (Math.hypot(nearPoint1.x - point.x, nearPoint1.y - point.y) <= nearPixels) {
            line1Near = true;
        }
        if (Math.hypot(nearPoint2.x - point.x, nearPoint2.y - point.y) <= nearPixels) {
            line2Near = true;
        }
        if (Math.hypot(nearPoint3.x - point.x, nearPoint3.y - point.y) <= nearPixels) {
            line3Near = true;
        }
    }

    context.globalAlpha = 0.2;
    context.lineWidth = 2;
    context.lineCap = "round";

    var centerX = (this.x1 - this.x2) / 2.0 + this.x2;
    var centerY = (this.y1 - this.y2) / 2.0 + this.y2;
    var length = Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
    var grd=context.createRadialGradient(centerX,centerY,length/2.0,centerX,centerY,length + GUIDE_LINE_LENGTH/2.0);
    grd.addColorStop(0,"rgba(0, 0, 0, 1.0)");
    grd.addColorStop(1,"rgba(0, 0, 0, 0.05)");

    context.strokeStyle = grd;
    context.beginPath();
    if (line1Near) {
        context.moveTo(line.x1, line.y1);
        context.lineTo(line.x2, line.y2);
    }
    if (line2Near) {
        context.moveTo(line2.x1, line2.y1);
        context.lineTo(line2.x2, line2.y2);
    }
    if (line3Near) {
        context.moveTo(line3.x1, line3.y1);
        context.lineTo(line3.x2, line3.y2);
    }
    context.stroke();
    context.globalAlpha = 1.0;
};

WallObject.prototype.drawLength = function(context) {
    "use strict";
    //Go down to 5 decimal places

    var lengthInFeet = Math.hypot(this.x1 - this.x2, this.y1 - this.y2) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = ((lengthInFeet - feet) * 12).toFixed(1);
    //var inches = ((lengthInFeet - feet) * 12);
    var centerX = (this.x1 - this.x2) / 2.0 + this.x2;
    var centerY = (this.y1 - this.y2) / 2.0 + this.y2;

    if (this.y1 < this.y2) {
        centerY = this.y1 - 50.0;
    } else {
        centerY = this.y2 - 50.0;
    }



    context.textAlign = "center";
    context.font = '30px Helvetica';

    var textSize = context.measureText(feet+" ft " + inches + " in").width + 6;
    context.globalAlpha = 0.9;
    context.fillStyle = "black";
    fillRoundedRect(context, centerX - textSize / 2, centerY - 15 - 2, textSize, 30, 5);
    //context.fillRect(centerX - textSize / 2, centerY - 28, textSize, 30);
    context.globalAlpha = 1.0;
    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.fillText(feet+" ft " + inches + " in", centerX, centerY);
}

function strokeRoundedRect(context, x, y, width, height, cornerRadius) {
    "use strict";

    context.beginPath();
    context.moveTo(x + cornerRadius, y);
    context.lineTo(x + width - cornerRadius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    context.lineTo(x + width, y + height - cornerRadius);
    context.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
    context.lineTo(x + cornerRadius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    context.lineTo(x, y + cornerRadius);
    context.quadraticCurveTo(x, y, x + cornerRadius, y);
    context.closePath();
    context.stroke();
}

function fillRoundedRect(context, x, y, width, height, cornerRadius) {
    "use strict";

    context.beginPath();
    context.moveTo(x + cornerRadius, y);
    context.lineTo(x + width - cornerRadius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    context.lineTo(x + width, y + height - cornerRadius);
    context.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
    context.lineTo(x + cornerRadius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    context.lineTo(x, y + cornerRadius);
    context.quadraticCurveTo(x, y, x + cornerRadius, y);
    context.closePath();
    context.fill();
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