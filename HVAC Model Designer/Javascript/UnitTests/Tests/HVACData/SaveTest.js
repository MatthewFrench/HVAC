/**
 * Created by personal on 12/9/16.
 */
function run() {

    var app = new HVACApplication();
    assert(app != null);


    app.loadData();
    var data = app.hvacData.getHashmap();

    assertNotEqual(app.hvacData, null);

    app.saveData();

    assertNotEqual(app.hvacData, null);

    app.loadData();
    var data2 = app.hvacData.getHashmap();

    assertNotEqual(app.hvacData, null);

    assertEqual(JSON.stringify(data), JSON.stringify(data2));

    end();
}