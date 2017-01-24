/**
 * Created by personal on 12/9/16.
 */
function run() {
    var wallList = [];
    var excludeWallList = [];

    wallList.push(new Wall({point1: new Point2D({x: 1, y: 1}), point2: new Point2D({x: 100, y: 100})}));

    var pointX = 0;
    var pointY = 0;

    var point = snapPointToWalls(pointX, pointY, wallList, excludeWallList);

    assertEqual(point.getX(), 1);
    assertEqual(point.getY(), 1);

    var pointX = -50;
    var pointY = -50;

    var point = snapPointToWalls(pointX, pointY, wallList, excludeWallList);

    assertEqual(point.getX(), pointX);
    assertEqual(point.getY(), pointY);

    end();
}