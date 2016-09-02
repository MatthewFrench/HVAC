/**
 * Created by Matt on 9/2/16.
 */
window.onload = main;

function main() {
    //Create webgl canvas
    canvas = document.createElement('canvas');
    canvas.className = "WebGLCanvas";
    document.body.appendChild(canvas);

    initializeWebGL();
}