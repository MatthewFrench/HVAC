/**
 * Created by personal on 12/9/16.
 */

function run() {
    var x = 0;
    var y = 0;
    var cx = 0;
    var cy = 0;
    var radius = 5;

    assert(pointInCircle(x, y, cx, cy, radius));

    var x = 10;
    var y = 5;
    var cx = 5;
    var cy = 5;
    var radius = 5;

    assert(pointInCircle(x, y, cx, cy, radius));

    var x = 10;
    var y = 10;
    var cx = 5;
    var cy = 5;
    var radius = 5;

    assert(!pointInCircle(x, y, cx, cy, radius));

    end();
}