/**
 * Created by personal on 12/9/16.
 */
function run() {
    var intersectHighlightPoints = [];

    var floor = new FloorPlan();

    new Wall({point1: new Point2D({x: 0, y: 0}), point2: new Point2D({x: 100, y: 100}), floor: floor});
    new Wall({point1: new Point2D({x: 0, y: 100}), point2: new Point2D({x: 100, y: 0}), floor: floor});

    wallSlicer(floor.getWallList(), intersectHighlightPoints);

    assertEqual(floor.getWallList().length, 4);
    assertEqual(intersectHighlightPoints.length, 1);
    assertEqual(intersectHighlightPoints[0].getX(), 50);
    assertEqual(intersectHighlightPoints[0].getY(), 50);

    end();
}