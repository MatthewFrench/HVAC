/**
 * Created by personal on 12/9/16.
 */
function run() {

    var returnValue = 0;

    var func = CreateFunction(this, function() {
        return 1;
    });

    returnValue = func();

    assertEqual(returnValue, 1);

    end();
}