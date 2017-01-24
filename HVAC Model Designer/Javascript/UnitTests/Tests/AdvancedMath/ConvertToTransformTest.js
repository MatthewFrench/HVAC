/**
 * Created by personal on 12/9/16.
 */

function run() {
    var point = new Point2D({x: 0, y: 0});
    var translatePoint = new Point2D({x: 5, y: 0});
    var rotation = Math.PI;
    var scale = 2.0;

    var transformedPoint = convertToTransform(point, translatePoint, rotation, scale);
    var equalsPoint = new Point2D({x: 7.5, y:0});
    assertEqual(Math.round(transformedPoint.x*1000)/1000.0, equalsPoint.x);
    assertEqual(Math.round(transformedPoint.y*1000)/1000.0, equalsPoint.y);

    end();
}