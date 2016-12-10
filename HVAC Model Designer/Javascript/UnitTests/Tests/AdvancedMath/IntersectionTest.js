/**
 * Created by personal on 12/9/16.
 */
importScripts("../WebWorkerUnitTester.js");

var name = 'Line - Line Intersection Test';
function run() {
    //Simple
    var intersectPoint = getLineIntersectionPoint(0, -10, 0, 10,
                                      -10, 0, 10, -0);

    assert(intersectPoint.getX() == 0 && intersectPoint.getY() == 0);

    //Colinear
    intersectPoint = getLineIntersectionPoint(0, -10, 0, 10,
        0, -10, 0, 10);

    assert(intersectPoint == null);

    intersectPoint = getLineIntersectionPoint(0, -10, 0, 10,
        0, -11, 0, -20);

    assert(intersectPoint == null);

    //Parallel
    intersectPoint = getLineIntersectionPoint(0, -10, 0, 10,
        1, -10, 1, 10);

    assert(intersectPoint == null);

    end();
}