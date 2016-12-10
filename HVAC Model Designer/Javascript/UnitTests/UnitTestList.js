/**
 * Created by personal on 12/9/16.
 */

function getUnitTestList() {
    var arr = [];
    arr.push({name: 'Line - Line Intersection Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/IntersectionTest.js', webworker: true});
    arr.push({name: 'Angle of Line Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/AngleOfLineTest.js', webworker: true});
    arr.push({name: 'Convert To Transform Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/ConvertToTransformTest.js', webworker: true});
    arr.push({name: 'Longer Line Creation Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/LongerLineTest.js', webworker: true});
    arr.push({name: 'Get Nearest Point On Line Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/NearestPointOnLineTest.js', webworker: true});
    arr.push({name: 'Get Perpendicular Line Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/PerpendicularLineTest.js', webworker: true});
    arr.push({name: 'Is Point in Circle Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/PointInCircleTest.js', webworker: true});
    arr.push({name: 'Snap Point to Walls Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/SnapPointToWallsTest.js', webworker: true});
    arr.push({name: 'Do Walls Intersect Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/WallIntersectionPointsTest.js', webworker: true});
    arr.push({name: 'Slice Intersecting Walls Test',
        url:'Javascript/UnitTests/Tests/AdvancedMath/WallSlicerTest.js', webworker: true});
    arr.push({name: 'Animating Timer Test',
        url:'Javascript/UnitTests/Tests/AnimationTimer/AnimationTimerTest.js', webworker: true});
    arr.push({name: 'HVAC Application Creation Test',
        url:'Javascript/UnitTests/Tests/HVACApplication/CreateTest.js', webworker: false});
    arr.push({name: 'HVAC Application Logic and Draw Test',
        url:'Javascript/UnitTests/Tests/HVACApplication/LogicDrawTest.js', webworker: false});
    arr.push({name: 'HVACData Creation Test',
        url:'Javascript/UnitTests/Tests/HVACData/CreateTest.js', webworker: false});
    arr.push({name: 'HVACData Loading Test',
        url:'Javascript/UnitTests/Tests/HVACData/LoadTest.js', webworker: false});
    arr.push({name: 'HVACData Saving Test',
        url:'Javascript/UnitTests/Tests/HVACData/SaveTest.js', webworker: false});
    arr.push({name: 'Create Element Test',
        url:'Javascript/UnitTests/Tests/Utility/CreateElement.js', webworker: false});
    arr.push({name: 'Convert Function Test',
        url:'Javascript/UnitTests/Tests/Utility/CreateFunction.js', webworker: true});
    return arr;
}