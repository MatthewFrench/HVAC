/**
 * Created by personal on 12/9/16.
 */
function run() {
    var wallList = [];
    var excludeWallList = [];

    wallList.push(new Wall({point1: new Point2D({x: 0, y: 0}), point2: new Point2D({x: 100, y: 100})}));
    wallList.push(new Wall({point1: new Point2D({x: 0, y: 100}), point2: new Point2D({x: 100, y: 0})}));

    var points = getWallIntersectionPoints(wallList, excludeWallList);

    assertEqual(points.length, 1);
    assertEqual(points[0].getX(), 50);
    assertEqual(points[0].getY(), 50);

    end();
}