/**
 * Created by personal on 12/9/16.
 */
function run() {
    var app = new HVACApplication();
    assert(app != null);

    app.loadData();

    assertNotEqual(app.hvacData, null);

    end();
}