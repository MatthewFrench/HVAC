/**
 * Created by Matt on 9/9/16.
 *
 * This class handles the drawing of the lines on the canvas.
 */

/**
 * This function draws lines on our canvas.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param showHandles: Determine if show wall endpoints.
 */
Wall.prototype.draw = function(context, showHandles) {
    context.strokeStyle = "white";

    context.lineWidth = 5;
    context.beginPath();
    context.lineCap = "round";
    var line = this.getLine();
    context.moveTo(line.getPoint1X(), line.getPoint1Y());
    context.lineTo(line.getPoint2X(), line.getPoint2Y());
    context.stroke();

    if (showHandles) {
        drawHandle(context, line.getPoint1X(), line.getPoint1Y());
        drawHandle(context, line.getPoint2X(), line.getPoint2Y());
    }
};

/**
 * Draws dotted lines for the floors above/below the current floor.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param setOfFloors: boolean that decides if dealing with the floors above or below the current floor.
 */
Wall.prototype.drawDotted = function(context, setOfFloors) {
    if (setOfFloors) {
        //The floors above the current floor are set to green
        context.strokeStyle = "rgba(0, 255, 0, 0.5)";
    }
    else {
        //The floors above the current floor are set to red
        context.strokeStyle = "rgba(255, 0, 0, 0.5)";
    }

    context.lineWidth = 5;
    context.save();
    context.setLineDash([2, 10]); //dashes are 5px and spaces are 3px
    context.beginPath();
    context.lineCap = "round";
    var line = this.getLine();
    context.moveTo(line.getPoint1X(), line.getPoint1Y());
    context.lineTo(line.getPoint2X(), line.getPoint2Y());
    context.stroke();
    context.restore();
}

/**
 * This function draws perpendicular lines on the canvas.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param nearPointArray: The current point of the cursor.
 */
Wall.prototype.drawPerpendicular = function(context, nearPointArray) {

    var x1 = this.getLine().getPoint1X();
    var y1 = this.getLine().getPoint1Y();
    var x2 = this.getLine().getPoint2X();
    var y2 = this.getLine().getPoint2Y();

    var line1Near = false;
    var line2Near = false;
    var line3Near = false;

    var line = getPerpendicularInfiniteLinePoint1(x1, y1, x2, y2);
    var line2 = getPerpendicularInfiniteLinePoint2(x1, y1, x2, y2);
    var line3 = getLongerLine(x1, y1, x2, y2);

    //Check if the current point of the cursor is close enough to this wall to snap to it.
    var nearPixels = 25.0;
    for (var i = 0; i < nearPointArray.length; i++) {
        var point = nearPointArray[i];

        var nearPoint1 = nearestPointOnLine(line.getPoint1X(), line.getPoint1Y(),
            line.getPoint2X(), line.getPoint2Y(), point.getX(), point.getY());
        var nearPoint2 = nearestPointOnLine(line2.getPoint1X(), line2.getPoint1Y(),
            line2.getPoint2X(), line2.getPoint2Y(), point.getX(), point.getY());
        var nearPoint3 = nearestPointOnLine(line3.getPoint1X(), line3.getPoint1Y(),
            line3.getPoint2X(), line3.getPoint2Y(), point.getX(), point.getY());

        if (Math.hypot(nearPoint1.getX() - point.getX(), nearPoint1.getY() - point.getY()) <= nearPixels) {
            line1Near = true;
        }
        if (Math.hypot(nearPoint2.getX() - point.getX(), nearPoint2.getY() - point.getY()) <= nearPixels) {
            line2Near = true;
        }
        if (Math.hypot(nearPoint3.getX() - point.getX(), nearPoint3.getY() - point.getY()) <= nearPixels) {
            line3Near = true;
        }
    }

    context.globalAlpha = 0.2;
    context.lineWidth = 2;
    context.lineCap = "round";

    var centerX = (x1 - x2) / 2.0 + x2;
    var centerY = (y1 - y2) / 2.0 + y2;
    var length = Math.hypot(x1 - x2, y1 - y2);

    context.strokeStyle = "#08ff08";//grd;
    context.beginPath();

    if (line1Near) {
        context.moveTo(line.getPoint1X(), line.getPoint1Y());
        context.lineTo(line.getPoint2X(), line.getPoint2Y());
    }
    if (line2Near) {
        context.moveTo(line2.getPoint1X(), line2.getPoint1Y());
        context.lineTo(line2.getPoint2X(), line2.getPoint2Y());
    }
    if (line3Near) {
        context.moveTo(line3.getPoint1X(), line3.getPoint1Y());
        context.lineTo(line3.getPoint2X(), line3.getPoint2Y());
    }

    context.stroke();
    context.globalAlpha = 1.0;
};

/**
 * This function shows the length of the line being drawn on our canvas.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param translatePoint: The current coordinate point of the cursor.
 * @param rotation: The degree for how much the canvas has rotated.
 * @param scale: The ratio for how much the canvas has zoomed in/out.
 */
Wall.prototype.drawLength = function(context, translatePoint, rotation, scale) {
    "use strict";
    //Go down to 5 decimal places

    var xy1 = convertToTransform(this.getLine().getPoint1(), translatePoint, -rotation, 1/scale);
    var xy2 = convertToTransform(this.getLine().getPoint2(), translatePoint, -rotation, 1/scale);

    var x1 = xy1.getX();
    var y1 = xy1.getY();
    var x2 = xy2.getX();
    var y2 = xy2.getY();

    var lengthInFeet = Math.hypot(x1 - x2, y1 - y2) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = ((lengthInFeet - feet) * 12).toFixed(1);
    var centerX = (x1 - x2) / 2.0 + x2;
    var centerY = (y1 - y2) / 2.0 + y2;

    if (y1 < y2) {
        centerY = y1 - 50.0;
    } else {
        centerY = y2 - 50.0;
    }

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.textAlign = "center";
    context.font = '30px Helvetica';

    var textSize = context.measureText(feet+" ft " + inches + " in").width + 6;
    context.globalAlpha = 0.9;
    context.fillStyle = "black";
    fillRoundedRect(context, centerX - textSize / 2, centerY - 15 - 2, textSize, 30, 5);
    context.globalAlpha = 1.0;
    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.fillText(feet+" ft " + inches + " in", centerX, centerY);
    context.restore();
};

/**
 * This function would create a rectangle with a border. Currently Unused.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param x: The x-coordinate of the top-left corner of the Wall Length Text rectangle.
 * @param y: The y-coordinate of the top-left corner of the Wall Length Text rectangle.
 * @param width: The width-size of the text rectangle. Base on the length of the text.
 * @param height: The height-size of the text rectangle.
 * @param cornerRadius: The degree of the rounded corners of the rectangle.
 */
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

/**
 * This function creates a rectangle that is completely filled. Currently being used for our Wall Length.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param x: The x-coordinate of the top-left corner of the Wall Length Text rectangle.
 * @param y: The y-coordinate of the top-left corner of the Wall Length Text rectangle.
 * @param width: The width-size of the text rectangle. Base on the length of the text.
 * @param height: The height-size of the text rectangle.
 * @param cornerRadius: The degree of the rounded corners of the rectangle.
 */
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

/**
 * This function gives stroke width and color.
 *
 * @param context: The canvas on which the lines will be drawn on.
 * @param x: The x-coordinate of one end of a wall.
 * @param y: The y-coordinate of one end of a wall.
 */
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