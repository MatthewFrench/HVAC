/**
 * Created by Matt on 9/10/16.
 */
/**
 * Returns true if the point is in the defined circle.
 */
function pointInCircle( x,  y,  cx,  cy,  radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}