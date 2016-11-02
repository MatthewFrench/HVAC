/**
 * Created by Matt on 9/10/16.
 */

var PIXELS_IN_FOOT = 20.0;
var GUIDE_LINE_LENGTH = 50 * PIXELS_IN_FOOT;
var SNAP_TO_AMOUNT_PIXELS = 8;

function wallSlicer(walls, highlightWalls) {
    console.log("Running wall slicer, number of walls: " + walls.length);
    highlightWalls.splice(0, highlightWalls.length);
    //Slice any walls that are intersecting
    var slicedWall = false;
    for (var w1 = 0; w1 < walls.length; w1++) {
        var wall1 = walls[w1];
        for (var w2 = 0; w2 < walls.length; w2++) {
            var wall2 = walls[w2];
            if (wall1 == wall2) continue;
            //Get Intersection point
            var wall1Line = wall1.getLine();
            var wall2Line = wall2.getLine();

            var intersectionPoint = getLineIntersectionPoint(wall1Line.getPoint1X(), wall1Line.getPoint1Y(), wall1Line.getPoint2X(), wall1Line.getPoint2Y(),
                wall2Line.getPoint1X(), wall2Line.getPoint1Y(), wall2Line.getPoint2X(), wall2Line.getPoint2Y());

            //Determine what new lines we have to make from the intersection point
            if (intersectionPoint != null) {
                //The intersection point can only be at most on one wall end.
                var wall1Point1Intersects = false;
                var wall1Point2Intersects = false;
                var wall2Point1Intersects = false;
                var wall2Point2Intersects = false;

                wall1Point1Intersects = Math.hypot(wall1Line.getPoint1X() - intersectionPoint.getX(), wall1Line.getPoint1Y() - intersectionPoint.getY()) <= 1.0;
                wall1Point2Intersects = Math.hypot(wall1Line.getPoint2X() - intersectionPoint.getX(), wall1Line.getPoint2Y() - intersectionPoint.getY()) <= 1.0;
                wall2Point1Intersects = Math.hypot(wall2Line.getPoint1X() - intersectionPoint.getX(), wall2Line.getPoint1Y() - intersectionPoint.getY()) <= 1.0;
                wall2Point2Intersects = Math.hypot(wall2Line.getPoint2X() - intersectionPoint.getX(), wall2Line.getPoint2Y() - intersectionPoint.getY()) <= 1.0;

                //Ignore if both ends of the wall are at the intersect point
                if (wall1Point1Intersects && wall1Point2Intersects) continue;
                if (wall2Point1Intersects && wall2Point2Intersects) continue;

                //Ignore if the intersect point is at a corner of both walls
                if (wall1Point1Intersects && wall2Point1Intersects) continue;
                if (wall1Point1Intersects && wall2Point2Intersects) continue;
                if (wall1Point2Intersects && wall2Point1Intersects) continue;
                if (wall1Point2Intersects && wall2Point2Intersects) continue;

                var numberOfIntersects = 0;
                if (wall1Point1Intersects) numberOfIntersects++;
                if (wall1Point2Intersects) numberOfIntersects++;
                if (wall2Point1Intersects) numberOfIntersects++;
                if (wall2Point2Intersects) numberOfIntersects++;

                //Handle no intersects or one corner intersecting
                if (numberOfIntersects == 0) {
                    console.log("0 intersects points so creating 4 walls");

                    AnimationTimer.StartTimer(this, 1.0, function(){}, function(){

                        this.getCurrentFloorPlan().removeWall(wall1);

                        AnimationTimer.StartTimer(this, 1.0, function(){}, function(){
                        this.getCurrentFloorPlan().removeWall(wall2);

                        AnimationTimer.StartTimer(this, 1.0, function(){}, function(){

                            //Gonna delete both walls and create 4 new walls
                            var newWall1 = new Wall({
                                point1: new CornerPoint({x: wall1Line.getPoint1X(), y: wall1Line.getPoint1Y()}),
                                point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                floor: this.getCurrentFloorPlan()});

                            highlightWalls.push(newWall1);


                            AnimationTimer.StartTimer(this, 1.0, function(){}, function(){

                            var newWall2 = new Wall({
                                point1: new CornerPoint({x: wall1Line.getPoint2X(), y: wall1Line.getPoint2Y()}),
                                point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                floor: this.getCurrentFloorPlan()});

                            highlightWalls.push(newWall2);


                                AnimationTimer.StartTimer(this, 1.0, function(){}, function(){

                            var newWall3 = new Wall({
                                point1: new CornerPoint({x: wall2Line.getPoint1X(), y: wall2Line.getPoint1Y()}),
                                point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                floor: this.getCurrentFloorPlan()});
                            highlightWalls.push(newWall3);

                                    AnimationTimer.StartTimer(this, 1.0, function(){}, function(){
                            var newWall4 = new Wall({
                                point1: new CornerPoint({x: wall2Line.getPoint2X(), y: wall2Line.getPoint2Y()}),
                                point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                floor: this.getCurrentFloorPlan()});

                            highlightWalls.push(newWall4);


                            AnimationTimer.StartTimer(this, 1.0, function(){}, function(){
                                wallSlicer.call(this, walls, highlightWalls);
                            });
                                    });
                                });
                            });
                        });
                        });
                    });



                    slicedWall = true;
                    break;
                }/* else if (numberOfIntersects == 1) {
                    //Gonna delete 1 wall and create 2 new walls
                    if (wall1Point1Intersects || wall1Point2Intersects) {

                        console.log("Creating 2 walls to replace wall 2");


                        AnimationTimer.StartTimer(this, 1.0, function(){}, function(){


                            this.getCurrentFloorPlan().removeWall(wall2);

                            AnimationTimer.StartTimer(this, 1.0, function(){}, function(){


                                var newWall1 = new Wall({
                                    point1: new CornerPoint({x: wall2Line.getPoint1X(), y: wall2Line.getPoint1Y()}),
                                    point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                    floor: this.getCurrentFloorPlan()});
                                highlightWalls.push(newWall1);


                                AnimationTimer.StartTimer(this, 1.0, function(){}, function(){

                                var newWall2 = new Wall({
                                    point1: new CornerPoint({x: wall2Line.getPoint2X(), y: wall2Line.getPoint2Y()}),
                                    point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                    floor: this.getCurrentFloorPlan()});


                                highlightWalls.push(newWall2);


                                AnimationTimer.StartTimer(this, 1.0, function(){}, function(){
                                    wallSlicer.call(this, walls, highlightWalls);
                                });
                                });
                            });
                        });

                    } else if (wall2Point1Intersects || wall2Point2Intersects) {

                        console.log("Creating 2 walls to replace wall 1");



                        AnimationTimer.StartTimer(this, 1.0, function(){}, function(){


                            this.getCurrentFloorPlan().removeWall(wall1);

                            AnimationTimer.StartTimer(this, 1.0, function(){}, function(){



                                var newWall1 = new Wall({
                                    point1: new CornerPoint({x: wall1Line.getPoint1X(), y: wall1Line.getPoint1Y()}),
                                    point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                    floor: this.getCurrentFloorPlan()});
                                highlightWalls.push(newWall1);

                                AnimationTimer.StartTimer(this, 1.0, function(){}, function(){

                                var newWall2 = new Wall({
                                    point1: new CornerPoint({x: wall1Line.getPoint2X(), y: wall1Line.getPoint2Y()}),
                                    point2: new CornerPoint({x: intersectionPoint.getX(), y: intersectionPoint.getY()}),
                                    floor: this.getCurrentFloorPlan()});



                                highlightWalls.push(newWall2);


                                AnimationTimer.StartTimer(this, 1.0, function(){}, function(){
                                    wallSlicer.call(this, walls, highlightWalls);
                                });
                            });
                            });
                        });



                    }

                    slicedWall = true;
                    break;
                }*/
            }
        }
        if (slicedWall) break;
    }
    /*
    if (slicedWall) {
        AnimationTimer.StartTimer(this, 0.5, function(){}, function(){
            wallSlicer.call(this, walls, highlightWalls);
        });
    }*/
}

//Determines if the coordinate point falls within the area of the circle.
function pointInCircle( x,  y,  cx,  cy,  radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}

//Returns the nearest point on a line from a specific coordinate point.
function nearestPointOnLine( ax,  ay,  bx,  by,  px,  py) {
    var clampToSegment = true;

    var apx = px - ax;
    var apy = py - ay;
    var abx = bx - ax;
    var aby = by - ay;

    var ab2 = abx * abx + aby * aby;
    var ap_ab = apx * abx + apy * aby;
    var t = ap_ab / ab2;
    if (clampToSegment) {
        if (t < 0) {
            t = 0;
        } else if (t > 1) {
            t = 1;
        }
    }
    return new Point2D({x:ax + abx * t, y: ay + aby * t});
}

//Returns the angle of a line.
function getAngleOfLineBetweenPoints(x1, y1, x2, y2)
{
    var xDiff = x2 - x1;
    var yDiff = y2 - y1;
    return Math.atan2(yDiff, xDiff);
}

//Makes endpoint 1 become perpendicular.
function getPerpendicularInfiniteLinePoint1(x1, y1, x2, y2) {
    "use strict";

    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

    var lineLength = GUIDE_LINE_LENGTH / 2.0;

    var newX1 = x1 + lineLength * Math.cos(nearestAngle);
    var newY1 = y1 + lineLength * Math.sin(nearestAngle);

    var newX2 = x1 - lineLength * Math.cos(nearestAngle);
    var newY2 = y1 - lineLength * Math.sin(nearestAngle);

    return new Line2D({x1: newX1, y1: newY1, x2: newX2, y2: newY2});
}

//Makes endpoint 2 become perpendicular.
function getPerpendicularInfiniteLinePoint2(x1, y1, x2, y2) {
    "use strict";

    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2) + 90.0 * Math.PI / 180.0;

    var lineLength = GUIDE_LINE_LENGTH / 2.0;

    var newX1 = x2 + lineLength * Math.cos(nearestAngle);
    var newY1 = y2 + lineLength * Math.sin(nearestAngle);

    var newX2 = x2 - lineLength * Math.cos(nearestAngle);
    var newY2 = y2 - lineLength * Math.sin(nearestAngle);

    return new Line2D({x1: newX1, y1: newY1, x2: newX2, y2: newY2});
}

//Creates a longer line for when increasing the line length.
function getLongerLine(x1, y1, x2, y2) {
    "use strict";
    var nearestAngle = getAngleOfLineBetweenPoints(x1, y1, x2, y2);

    var lineLength = Math.hypot(x1 - x2, y1 - y2) / 2.0 + (GUIDE_LINE_LENGTH)/2.0;

    var centerX = (x1 - x2) / 2 + x2;
    var centerY = (y1 - y2) / 2 + y2;

    var newX1 = centerX + lineLength * Math.cos(nearestAngle);
    var newY1 = centerY + lineLength * Math.sin(nearestAngle);

    var newX2 = centerX - lineLength * Math.cos(nearestAngle);
    var newY2 = centerY - lineLength * Math.sin(nearestAngle);

    return new Line2D({x1: newX1, y1: newY1, x2: newX2, y2: newY2});
}

//Snap point to the closest 1/10th of an inch
/*
function snapPointToInchGrid(snapWall) {
    "use strict";

}*/

//Converts calculated pixel values of first point into closest 1/10 of an inch.
/*
function snapWallToDecimalFromPoint1(snapWall) {
    "use strict";

    var lengthInFeet = Math.hypot(snapWall.getPoint1X() - snapWall.getPoint2X(), snapWall.getPoint1Y() - snapWall.getPoint2Y()) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = (lengthInFeet - feet) * 12;

    inches = Math.round(inches * 10) / 10.0;

    var lineLength = (feet + inches / 12.0) * PIXELS_IN_FOOT;
    var nearestAngle = getAngleOfLineBetweenPoints(snapWall.getPoint1X(), snapWall.getPoint1Y(), snapWall.getPoint2X(), snapWall.getPoint2Y());

    var newX = snapWall.getPoint1X() + lineLength * Math.cos(nearestAngle);
    var newY = snapWall.getPoint1Y() + lineLength * Math.sin(nearestAngle);

    snapWall.getPoint2X() = newX;
    snapWall.getPoint2Y() = newY;
}*/

//Converts calculated pixel values of second point into closest 1/10 of an inch.
/*
function snapWallToDecimalFromPoint2(snapWall) {
    "use strict";

    var lengthInFeet = Math.hypot(snapWall.getPoint1X() - snapWall.getPoint2X(), snapWall.getPoint1Y() - snapWall.getPoint2Y()) / PIXELS_IN_FOOT;
    var feet = Math.floor(lengthInFeet);
    var inches = (lengthInFeet - feet) * 12;

    inches = Math.round(inches * 10) / 10.0;

    var lineLength = (feet + inches / 12.0) * PIXELS_IN_FOOT;
    var nearestAngle = getAngleOfLineBetweenPoints(snapWall.getPoint1X(), snapWall.getPoint1Y(), snapWall.getPoint2X(), snapWall.getPoint2Y());

    var newX = snapWall.getPoint2X() - lineLength * Math.cos(nearestAngle);
    var newY = snapWall.getPoint2Y() - lineLength * Math.sin(nearestAngle);

    snapWall.getPoint1X() = newX;
    snapWall.getPoint1Y() = newY;
}*/

//Gets the first point to snap closest to.
function getLinePoint1SnappedToNearestRotation(x1, y1, x2, y2, increment) {
    "use strict";
    increment = increment * Math.PI / 180;
    var angleOfLine = getAngleOfLineBetweenPoints(x2, y2, x1, y1);
    var nearestAngle = Math.round(angleOfLine / increment) * increment;
    var lineLength = Math.hypot(x1 - x2, y1 - y2);

    var newX = x2 + lineLength * Math.cos(nearestAngle);
    var newY = y2 + lineLength * Math.sin(nearestAngle);

    return new Line2D({x1: newX, y1: newY, x2: x2, y2: y2});
}

//Gets the second point to snap closest to.
function getLinePoint2SnappedToNearestRotation(x1, y1, x2, y2, increment) {
    "use strict";
    increment = increment * Math.PI / 180;
    var angleOfLine = getAngleOfLineBetweenPoints(x1, y1, x2, y2);
    var nearestAngle = Math.round(angleOfLine / increment) * increment;
    var lineLength = Math.hypot(x1 - x2, y1 - y2);

    var newX = x1 + lineLength * Math.cos(nearestAngle);
    var newY = y1 + lineLength * Math.sin(nearestAngle);

    return new Line2D({x1:x1, y1: y1, x2: newX, y2: newY});
}

//Returns the list of intersecting points on a line.
function getLineIntersectionPoint(point1X1, point1Y1, point1X2, point1Y2,
                                  point2X1, point2Y1, point2X2, point2Y2)
{
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = point1X2 - point1X1;     s1_y = point1Y2 - point1Y1;
    s2_x = point2X2 - point2X1;     s2_y = point2Y2 - point2Y1;

    var s, t;
    s = (-s1_y * (point1X1 - point2X1) + s1_x * (point1Y1 - point2Y1)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (point1Y1 - point2Y1) - s2_y * (point1X1 - point2X1)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return new Point2D({x: point1X1 + (t * s1_x), y: point1Y1 + (t * s1_y)});
    }

    return null; // No collision
}

//Returns the list of intersecting points on a wall.
function getWallIntersectionPoints(wallList, excludeWallList) {
    "use strict";
    var pointArray = [];

    for (var i = 0; i < wallList.length; i++) {
        var wall1 = wallList[i];
        if (excludeWallList.includes(wall1)) continue;
        for (var j = 0; j < wallList.length; j++) {
            var wall2 = wallList[j];
            if (excludeWallList.includes(wall2) || wall2 == wall1) continue;

            //Get intersection point and add it to point array
            var point = getLineIntersectionPoint(wall1.getPoint1X(), wall1.getPoint1Y(), wall1.getPoint2X(), wall1.getPoint2Y(),
                wall2.getPoint1X(), wall2.getPoint1Y(), wall2.getPoint2X(), wall2.getPoint2Y());
            if (point != null) {
                pointArray.push(point);
            }
        }
    }

    return pointArray;
}

//Gets the list for perpendicular intersecting points.
function getWallPerpendicularIntersectionPoints(wallList, excludeWallList) {
    "use strict";

    var perpendicularLineArray = [];
    for (var i = 0; i < wallList.length; i++) {
        var wall1 = wallList[i];
        if (excludeWallList.includes(wall1)) continue;
        //Add perpendicular lines
        perpendicularLineArray.push(getPerpendicularInfiniteLinePoint1(wall1.getPoint1X(), wall1.getPoint1Y(), wall1.getPoint2X(), wall1.getPoint2Y()));
        perpendicularLineArray.push(getPerpendicularInfiniteLinePoint2(wall1.getPoint1X(), wall1.getPoint1Y(), wall1.getPoint2X(), wall1.getPoint2Y()));
        perpendicularLineArray.push(getLongerLine(wall1.getPoint1X(), wall1.getPoint1Y(), wall1.getPoint2X(), wall1.getPoint2Y()));
    }


    var pointArray = [];

    for (var i = 0; i < perpendicularLineArray.length; i++) {
        var line = perpendicularLineArray[i];
        for (var j = 0; j < perpendicularLineArray.length; j++) {
            var line2 = perpendicularLineArray[j];
            if (line == line2) continue;

            //Get intersection point and add it to point array
            var point = getLineIntersectionPoint(line.getPoint1X(), line.getPoint1Y(), line.getPoint2X(), line.getPoint2Y(),
                line2.getPoint1X(), line2.getPoint1Y(), line2.getPoint2X(), line2.getPoint2Y());
            if (point != null) {
                pointArray.push(point);
            }
        }
    }

    return pointArray;
}

//Process for snapping a point to other walls.
function snapPointToWalls(pointX, pointY, wallList, excludeWallList) {
    var snappedToEnd = false;
    var closest = SNAP_TO_AMOUNT_PIXELS;
    var snapToX = pointX;
    var snapToY = pointY;

    var wallIntersectionClosest = closest;
    //Snap to wall intersection points
    var points = getWallIntersectionPoints(wallList, excludeWallList);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (Math.hypot(pointX - point.getX(), pointY - point.getY()) < wallIntersectionClosest) {
            snapToX = point.getX();
            snapToY = point.getY();
            snappedToEnd = true;
            wallIntersectionClosest = Math.hypot(pointX - point.getX(), pointY - point.getY());
        }
    }
    var wallPerpendicularClosest = wallIntersectionClosest;
    //Snap to wall perpendicular intersection points
    var points = getWallPerpendicularIntersectionPoints(wallList, excludeWallList);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (Math.hypot(pointX - point.getX(), pointY - point.getY()) < wallPerpendicularClosest) {
            snapToX = point.getX();
            snapToY = point.getY();
            snappedToEnd = true;
            closest = Math.hypot(pointX - point.getX(), pointY - point.getY());
        }
    }

    var closest = wallPerpendicularClosest;
    //Snap to wall end points
    for (var i = 0; i < wallList.length; i++) {
        var wall = wallList[i];
        if (excludeWallList.includes(wall)) continue;
        if (Math.hypot(pointX - wall.getPoint1X(), pointY - wall.getPoint1Y()) <= closest) {
            snapToX = wall.getPoint1X();
            snapToY = wall.getPoint1Y();
            snappedToEnd = true;
            closest = Math.hypot(pointX - wall.getPoint1X(), pointY - wall.getPoint1Y());
        }
        if (Math.hypot(pointX - wall.getPoint2X(), pointY - wall.getPoint2Y()) <= closest) {
            snapToX = wall.getPoint2X();
            snapToY = wall.getPoint2Y();
            snappedToEnd = true;
            closest = Math.hypot(pointX - wall.getPoint2X(), pointY - wall.getPoint2Y());
        }
    }


    if (!snappedToEnd) {
        var snapWallX = snapToX;
        var snapWallY = snapToY;
        for (var i = 0; i < wallList.length; i++) {
            var wall = wallList[i];
            if (excludeWallList.includes(wall)) continue;
            var snapPoint = nearestPointOnLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y(), pointX, pointY);
            //Snap to any point on the wall
            if (Math.hypot(snapPoint.getX() - pointX, snapPoint.getY() - pointY) < closest) {
                closest = Math.hypot(snapPoint.getX() - pointX, snapPoint.getY() - pointY);
                snapWallX = snapPoint.getX();
                snapWallY = snapPoint.getY();
            } else {
                //Snap to wall guide lines

                var pLine = getPerpendicularInfiniteLinePoint1(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y());
                var pLine2 = getPerpendicularInfiniteLinePoint2(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y());
                var pLine3 = getLongerLine(wall.getPoint1X(), wall.getPoint1Y(), wall.getPoint2X(), wall.getPoint2Y());
                var snapPoint1 = nearestPointOnLine(pLine.getPoint1X(), pLine.getPoint1Y(), pLine.getPoint2X(), pLine.getPoint2Y(), pointX, pointY);
                var snapPoint2 = nearestPointOnLine(pLine2.getPoint1X(), pLine2.getPoint1Y(), pLine2.getPoint2X(), pLine2.getPoint2Y(), pointX, pointY);
                var snapPoint3 = nearestPointOnLine(pLine3.getPoint1X(), pLine3.getPoint1Y(), pLine3.getPoint2X(), pLine3.getPoint2Y(), pointX, pointY);
                if (Math.hypot(snapPoint1.getX() - pointX, snapPoint1.getY() - pointY) < closest) {
                    snapWallX = snapPoint1.getX();
                    snapWallY = snapPoint1.getY();
                    closest = Math.hypot(snapPoint1.getX() - pointX, snapPoint1.getY() - pointY);
                } else if (Math.hypot(snapPoint2.getX() - pointX, snapPoint2.getY() - pointY) < closest) {
                    snapWallX = snapPoint2.getX();
                    snapWallY = snapPoint2.getY();
                    closest = Math.hypot(snapPoint2.getX() - pointX, snapPoint2.getY() - pointY);
                } else if (Math.hypot(snapPoint3.getX() - pointX, snapPoint3.getY() - pointY) < closest) {
                    snapWallX = snapPoint3.getX();
                    snapWallY = snapPoint3.getY();
                    closest = Math.hypot(snapPoint3.getX() - pointX, snapPoint3.getY() - pointY);
                }
            }
        }
        pointX = snapWallX;
        pointY = snapWallY;
    } else {
        pointX = snapToX;
        pointY = snapToY;
    }
    return new Point2D({x: pointX, y: pointY});
};

//Converts degrees into radians
function convertToRadians(degree) {
    return degree*(Math.PI/180);
}

//Increments angle of rotating object
function incrementAngle(angle) {
    angle+= 2;
    if(angle > 360) {
        angle = angle - 360;
    }
    return angle;
}

//Decrements angle of rotating object
function decrementAngle(angle) {
    angle-= 2;
    if(angle < 0) {
        angle = angle + 360;
    }
    return angle;
}