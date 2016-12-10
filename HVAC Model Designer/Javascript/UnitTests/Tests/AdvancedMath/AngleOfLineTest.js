/**
 * Created by personal on 12/9/16.
 */

function run() {
    assertEqual(getAngleOfLineBetweenPoints(0, 0, 5, 5), Math.PI/4);
    assertEqual(getAngleOfLineBetweenPoints(5, 5, 0, 0), Math.PI*5/4);

    end();
}