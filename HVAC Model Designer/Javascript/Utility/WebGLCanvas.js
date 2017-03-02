/**
 * Created by Matt on 9/2/16.
 *
 * This class focuses on the image and interface of the canvas on a web browser.
 */

var canvas;
var gl;
var squareVerticesBuffer;
var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var perspectiveMatrix;

/**
 * Process to initialize the WebGL context
 *
 * @constructor
 */
function initializeWebGL() {
    gl = null;

    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    initWebGL(canvas); // Initialize the GL context

    // Only continue if WebGL is available and working
    if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        // Initialize the shaders; this is where all the lighting for the
        // vertices and so forth is established.
        initShaders();

        // Here's where we call the routine that builds all the objects
        // we'll be drawing.
        initBuffers();

        // Set up to draw the scene periodically.
        setInterval(drawScene, 15);
    }
}

/**
 * Initialize WebGL, returning the GL context or null if WebGL isn't available or could not be initialized.
 */
function initWebGL() {
    gl = null;

    try {
        gl = canvas.getContext("experimental-webgl");
    }
    catch(e) {
    }

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }
}

/**
 * Initialize the buffers we'll need. For this demo, we just have one object -- a simple two-dimensional square.
 */
function initBuffers() {

    // Create a buffer for the square's vertices.
    squareVerticesBuffer = gl.createBuffer();

    // Select the squareVerticesBuffer as the one to apply vertex
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    // Now create an array of vertices for the square. Note that the Z
    // coordinate is always 0 here.
    var vertices = [
        1.0,  1.0,  0.0,
        -1.0, 1.0,  0.0,
        1.0,  -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];

    // Now pass the list of vertices into WebGL to build the shape. We
    // do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current vertex buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Now set up the colors for the vertices
    var colors = [
        1.0,  1.0,  1.0,  1.0,    // white
        1.0,  0.0,  0.0,  1.0,    // red
        0.0,  1.0,  0.0,  1.0,    // green
        0.0,  0.0,  1.0,  1.0     // blue
    ];

    squareVerticesColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

/**
 * Draw the scene.
 */
function drawScene() {
    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Establish the perspective with which we want to view the
    // scene. Our field of view is 45 degrees, with a width/height
    // ratio of 640:480, and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
    perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    loadIdentity();

    // Now move the drawing position a bit to where we want to start
    // drawing the square.
    mvTranslate([-0.0, 0.0, -6.0]);

    // Draw the square by binding the array buffer to the square's vertices
    // array, setting attributes, and pushing it to GL.
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Set the colors attribute for the vertices.
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesColorBuffer);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

    // Draw the square.
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/**
 * Initialize the shaders, so WebGL knows how to light our scene.
 */
function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs", getFragmentShader(), true);
    var vertexShader = getShader(gl, "shader-vs", getVertexShader(), false);

    // Create the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);
}

/**
 * Loads a shader program by scouring the current document, looking for a script with the specified ID.
 *
 * @param gl: A created shader program.
 * @param id: ID of specific script.
 * @param theSource: Function that tries to get the specific script.
 * @param isFragment: Determines if the script is a fragment or not.
 * @return: The shader that was found.
 */
function getShader(gl, id, theSource, isFragment) {
    //var shaderScript = document.getElementById(id);

    // Didn't find an element with the specified ID; abort.
/*
    if (!shaderScript) {
        return null;
    }

    // Walk through the source element's children, building the
    // shader source string.

    var theSource = "";
    var currentChild = shaderScript.firstChild;

    while(currentChild) {
        if (currentChild.nodeType == 3) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }
*/
    // Now figure out what type of shader script we have,
    // based on its MIME type.
    var shader;

    if (isFragment) {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }

    // Send the source to the shader object
    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

/**
 * Loads selected Identity to the matrix.
 */
function loadIdentity() {
    mvMatrix = Matrix.I(4);
}

/**
 * Creates multiple matrices.
 *
 * @param m: The list of matrices.
 */
function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
}

/**
 * Translate the past in matrix.
 *
 * @param v: matrix to be translated.
 */
function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

/**
 * Sets the matrices created into a uniform location.
 */
function setMatrixUniforms() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}