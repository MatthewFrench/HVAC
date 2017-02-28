/**
 * Created by personal on 11/11/16.
 *
 * This class deals with creating the 3D Model of the different floors and displaying the floor in
 * different View modes.
 */

//Determines which type of 3D view is selected
var Mode3DTypeEnum = {
    DRAG: 0,
    ROTATE: 1,
    ORBIT: 2
};

/**
 * This function creates the 3D View Mode.
 *
 * @param hvacApplication: The overall control that the 3D mode is a part of.
 * @constructor
 */
function ViewMode3DController(hvacApplication) {
    this.hvacApplication = hvacApplication;

    this.layoutViewMode3DRenderer = null;

    this.viewZ = 0; //Adding the z-coordinates for 3D view

    //Coordinates for to center the canvas
    this.cameraCenterX = 0;
    this.cameraCenterY = 0;

    //Coordinates for the focus point
    this.cameraLookAtX = 0;
    this.cameraLookAtY = 0;

    //Coordinates for the point where the mouse is located
    this.mouseX = 0;
    this.mouseY = 0;

    this.mouseDown = false; //Determines if the mouse button is held down

    this.currentMode = Mode3DTypeEnum.DRAG; //Initial 3D mode selected

    this.createRenderer();
}

/**
 * Sets base for 3D walls at current floor.
 */
ViewMode3DController.prototype.addFlatFloor = function () {

    //Iterates through each wall in current floor
    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
        var wall = this.hvacApplication.getCurrentWallList()[i];

        var lengthOfWall = wall.getLine().getLength() + 4;
        var wallCenter = wall.getLine().getCenterPoint();
        var wallRotation = wall.getLine().getRotation();

        var wallWidth = 5;

        /*, opacity: 0.5*/
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false});
        material.transparent = true;

        var plane = new THREE.Mesh(new THREE.PlaneGeometry(wallWidth, lengthOfWall), material);
        plane.doubleSided = false;
        plane.position.x = wallCenter.x;
        plane.position.y = -wallCenter.y;
        plane.rotation.z = wallRotation;
        this.layoutViewMode3DScene.add(plane);
    }
};

/**
 * This function allows us to show the current floor in 3D View when the 3D button is clicked on.
 */
ViewMode3DController.prototype.show = function () {
    this.cameraCenterX = this.hvacApplication.applicationDiv.clientWidth / 2; //-this.canvasWidth / 2.0 - window.innerWidth;
    this.cameraCenterY = -this.hvacApplication.applicationDiv.clientHeight / 2 + 41; //this.canvasHeight / 2.0 - window.innerHeight;

    this.create3DEverything();

    this.addFlatFloor();

    this.hvacApplication.layoutCanvas.style.display = "none";
};

/**
 * This function reverts the interface from 3D back to 2D and removes the 3D view options.
 */
ViewMode3DController.prototype.hide = function () {
    this.layoutViewMode3DRenderer.domElement.remove();

    this.hvacApplication.layoutCanvas.style.display = "";

    this.dragButton.remove();
    this.rotateButton.remove();
    this.orbitButton.remove();
    this.showAllFloorsButton.remove();

    this.hvacApplication.resizeCanvas();
};

/**
 * Creates the different 3D view button options on the canvas when 3D button is clicked.
 */
ViewMode3DController.prototype.createRenderer = function () {
    this.layoutViewMode3DRenderer = new THREE.WebGLRenderer({alpha: true, antialias: true});

    var width = window.innerWidth;
    var height = window.innerHeight - 82;
    this.layoutViewMode3DCamera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100000);

    this.layoutViewMode3DScene = new THREE.Scene();

    //Creates the Drag button on the canvas
    this.dragButton = CreateElement({
        type: 'button',
        text: 'Drag',
        onClick: CreateFunction(this, function () {
            this.dragButtonClicked();
        })
    });

    //Creates the Rotate button on the canvas
    this.rotateButton = CreateElement({
        type: 'button',
        text: 'Rotate',
        onClick: CreateFunction(this, function () {
            this.rotateButtonClicked();
        })
    });

    //Creates the Orbit button on the canvas
    this.orbitButton = CreateElement({
        type: 'button',
        text: 'Orbit',
        onClick: CreateFunction(this, this.orbitButtonClicked)
    });

    //Creates the ShowAllFloors button on the canvas
    this.showAllFloorsButton = CreateElement({
        type: 'button',
        text: 'Show All Floors',
        onClick: CreateFunction(this, this.showAllFloors)
    });

    //Gets the current mouse coordinates and notifies the program that the mouse button is currently down
    this.layoutViewMode3DRenderer.domElement.onmousedown = CreateFunction(this, function (event) {
        var mouseX = event.offsetX;
        var mouseY = event.offsetY;

        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.mouseDown = true;
    });

    //Handles the visual effect in the different View modes when the mouse is moving
    this.layoutViewMode3DRenderer.domElement.onmousemove = CreateFunction(this, function (event) {
        var mouseX = event.offsetX;
        var mouseY = event.offsetY;

        var movedX = mouseX - this.mouseX;
        var movedY = mouseY - this.mouseY;

        movedX /= this.hvacApplication.viewScale;
        movedY /= this.hvacApplication.viewScale;

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        //Checks to see if the mouse button is down while it is moving
        //This is to see if the canvas needs to change the View
        if (this.mouseDown) {
            if (this.currentMode == Mode3DTypeEnum.ROTATE) {
                this.layoutViewMode3DCamera.up.set( 0, 1, 0 );

                this.layoutViewMode3DCamera.position.setX(this.layoutViewMode3DCamera.position.x - movedX * 2);
                this.layoutViewMode3DCamera.position.setY(this.layoutViewMode3DCamera.position.y + movedY * 2);
                this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
            }
            else if (this.currentMode == Mode3DTypeEnum.DRAG) {
                this.cameraLookAtX -= movedX;
                this.cameraLookAtY += movedY;
                this.layoutViewMode3DCamera.position.setX(this.layoutViewMode3DCamera.position.x - movedX);
                this.layoutViewMode3DCamera.position.setY(this.layoutViewMode3DCamera.position.y + movedY);
                this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
            }
            else if (this.currentMode == Mode3DTypeEnum.ORBIT) {
                this.layoutViewMode3DCamera.up.set( 0, 0, 1 );

                //Function to calculate the angle of the camera
                var angle = function(cx, cy, ex, ey) {
                    var dy = ey - cy;
                    var dx = ex - cx;
                    var theta = Math.atan2(dy, dx);
                    return theta;
                };

                //Determines how much rotation of the 3D model is based on the distance the mouse moved
                var rotate = Math.hypot(movedX, movedY) / Math.PI / 2.0 / 50.0;
                if (movedX > 0) rotate *= -1;

                this.cameraAngle = angle(this.cameraLookAtX, this.cameraLookAtY,
                    this.layoutViewMode3DCamera.position.x, this.layoutViewMode3DCamera.position.y);
                this.cameraAngle += rotate;

                var orbitRange = Math.hypot(this.cameraLookAtX - this.layoutViewMode3DCamera.position.x,
                    this.cameraLookAtY - this.layoutViewMode3DCamera.position.y);
                this.layoutViewMode3DCamera.position.x = Math.cos(this.cameraAngle) * orbitRange + this.cameraLookAtX;
                this.layoutViewMode3DCamera.position.y = Math.sin(this.cameraAngle) * orbitRange + this.cameraLookAtY;
                this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
            }
        }
    });

    //Gets the current mouse coordinates and notifies the program that the mouse button is currently up
    this.layoutViewMode3DRenderer.domElement.onmouseup = CreateFunction(this, function (event) {
        var mouseX = event.offsetX;
        var mouseY = event.offsetY;

        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.mouseDown = false;
    });
};

/**
 * This function converts the walls from 2D to 3D View Mode.
 */
ViewMode3DController.prototype.create3DEverything = function () {
    this.viewZ = this.defaultZ;

    var width = this.hvacApplication.applicationDiv.clientWidth;
    var height = this.hvacApplication.applicationDiv.clientHeight - 82;

    this.layoutViewMode3DCamera.aspect = width / height;
    this.layoutViewMode3DCamera.updateProjectionMatrix();
    this.layoutViewMode3DRenderer.setSize(width, height);

    this.layoutViewMode3DCamera.position.z = this.viewZ;
    this.layoutViewMode3DCamera.position.x = this.cameraCenterX;
    this.layoutViewMode3DCamera.position.y = this.cameraCenterY;

    this.cameraLookAtX = this.cameraCenterX;
    this.cameraLookAtY = this.cameraCenterY;
    this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

    this.layoutViewMode3DScene = new THREE.Scene();

    //Iterates through each wall on the current floor and converts it from 2D to 3D
    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
        (function (i) {
            AnimationTimer.StartTimerDelayed(this, i * 0.1, 0.0, function () {
            }, function () {
                var wall = this.hvacApplication.getCurrentWallList()[i];

                var lengthOfWall = wall.getLine().getLength();
                var wallCenter = wall.getLine().getCenterPoint();

                var wallWidth = 10;
                var wallHeight = 160;
                var wallLength = lengthOfWall;

                var geometry = new THREE.BoxBufferGeometry(wallWidth, wallLength, wallHeight);

                var group = new THREE.Object3D();

                var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, opacity: 0.75});
                material.transparent = true;

                var newMesh = new THREE.Mesh(geometry, material);
                group.add(newMesh);

                //Create outline object
                var geo = new THREE.EdgesGeometry(geometry); // or WireframeGeometry( geometry )
                var mat = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2});
                mat.transparent = true;
                var wireframe = new THREE.LineSegments(geo, mat);

                group.add(wireframe);

                this.layoutViewMode3DScene.add(group);

                var locationX = wallCenter.x;
                var locationY = -wallCenter.y;

                var rotation = wall.getLine().getRotation();
                AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
                    var x = locationX * percent;
                    var y = locationY * percent;

                    group.position.set(x, y, wallHeight / 2);
                    group.rotation.set(0, 0, rotation * percent);
                }, function () {
                    group.position.set(locationX, locationY, wallHeight / 2);
                    group.rotation.set(0, 0, rotation);

                });
            });
        }).call(this, i);
    }

    this.layoutViewMode3DRenderer.setPixelRatio(window.devicePixelRatio);
    this.layoutViewMode3DRenderer.setSize(width, height);

    this.layoutViewMode3DRenderer.domElement.style.position = "absolute";
    this.layoutViewMode3DRenderer.domElement.style.top = "82px";
    this.layoutViewMode3DRenderer.domElement.style.left = "0";

    this.hvacApplication.applicationDiv.appendChild(this.layoutViewMode3DRenderer.domElement);

    window.addEventListener('resize', CreateFunction(this, this.resizeView), false);

    //Create drag/rotate
    this.dragButton.style.position = "absolute";
    this.dragButton.style.left = "5px";
    this.dragButton.style.top = "85px";
    this.hvacApplication.applicationDiv.appendChild(this.dragButton);

    this.rotateButton.style.position = "absolute";
    this.rotateButton.style.left = "55px";
    this.rotateButton.style.top = "85px";
    this.hvacApplication.applicationDiv.appendChild(this.rotateButton);

    this.orbitButton.style.position = "absolute";
    this.orbitButton.style.left = "115px";
    this.orbitButton.style.top = "85px";
    this.hvacApplication.applicationDiv.appendChild(this.orbitButton);

    this.showAllFloorsButton.style.position = "absolute";
    this.showAllFloorsButton.style.left = "165px";
    this.showAllFloorsButton.style.top = "85px";
    this.hvacApplication.applicationDiv.appendChild(this.showAllFloorsButton);

    this.resizeView();

    this.hvacApplication.currentViewModeLayout = ViewModeType.Mode3D;
};

/**
 * Handles events for when the Rotate Button is clicked in 3D mode.
 */
ViewMode3DController.prototype.rotateButtonClicked = function() {
    //Get old rotation, do look at, get new rotation, animate between rotations
    var oldSetX = this.layoutViewMode3DCamera.up.x;
    var oldSetY = this.layoutViewMode3DCamera.up.y;
    var oldSetZ = this.layoutViewMode3DCamera.up.z;

    if (oldSetX != 0 || oldSetY != 1 || oldSetZ != 0) {
        var oldX = this.layoutViewMode3DCamera.rotation.x;
        var oldY = this.layoutViewMode3DCamera.rotation.y;
        var oldZ = this.layoutViewMode3DCamera.rotation.z;

        this.layoutViewMode3DCamera.up.set(0, 1, 0);
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        var newX = this.layoutViewMode3DCamera.rotation.x;
        var newY = this.layoutViewMode3DCamera.rotation.y;
        var newZ = this.layoutViewMode3DCamera.rotation.z;

        this.layoutViewMode3DCamera.up.set(oldSetX, oldSetY, oldSetZ);
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        AnimationTimer.StartTimer(this, 0.4, function (speed, percent) {
            var x = (newX - oldX) * (percent * percent) + oldX;
            var y = (newY - oldY) * (percent * percent) + oldY;
            var z = (newZ - oldZ) * (percent * percent) + oldZ;

            this.layoutViewMode3DCamera.rotation.x = x;
            this.layoutViewMode3DCamera.rotation.y = y;
            this.layoutViewMode3DCamera.rotation.z = z;
        }, function () {
            this.layoutViewMode3DCamera.up.set(0, 1, 0);
            this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
        });
    }

    this.currentMode = Mode3DTypeEnum.ROTATE;
};

/**
 * Handles events for when the Drag Button is clicked in 3D mode.
 */
ViewMode3DController.prototype.dragButtonClicked = function() {
    //Get rotation, do look at, get new rotation, animate between rotations
    var oldSetX = this.layoutViewMode3DCamera.up.x;
    var oldSetY = this.layoutViewMode3DCamera.up.y;
    var oldSetZ = this.layoutViewMode3DCamera.up.z;

    if (oldSetX != 0 || oldSetY != 1 || oldSetZ != 0) {
        var oldX = this.layoutViewMode3DCamera.rotation.x;
        var oldY = this.layoutViewMode3DCamera.rotation.y;
        var oldZ = this.layoutViewMode3DCamera.rotation.z;

        this.layoutViewMode3DCamera.up.set(0, 1, 0);
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        var newX = this.layoutViewMode3DCamera.rotation.x;
        var newY = this.layoutViewMode3DCamera.rotation.y;
        var newZ = this.layoutViewMode3DCamera.rotation.z;

        this.layoutViewMode3DCamera.up.set(oldSetX, oldSetY, oldSetZ);
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        AnimationTimer.StartTimer(this, 0.4, function (speed, percent) {
            var x = (newX - oldX) * (percent * percent) + oldX;
            var y = (newY - oldY) * (percent * percent) + oldY;
            var z = (newZ - oldZ) * (percent * percent) + oldZ;

            this.layoutViewMode3DCamera.rotation.x = x;
            this.layoutViewMode3DCamera.rotation.y = y;
            this.layoutViewMode3DCamera.rotation.z = z;
        }, function () {
            this.layoutViewMode3DCamera.up.set(0, 1, 0);
            this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
        });
    }

    this.currentMode = Mode3DTypeEnum.DRAG;
};

/**
 * Handles events for when the Orbit Button is clicked in 3D mode.
 */
ViewMode3DController.prototype.orbitButtonClicked = function () {
    this.currentMode = Mode3DTypeEnum.ORBIT;

    //Get rotation, do look at, get new rotation, animate between rotations
    var oldSetX = this.layoutViewMode3DCamera.up.x;
    var oldSetY = this.layoutViewMode3DCamera.up.y;
    var oldSetZ = this.layoutViewMode3DCamera.up.z;

    if (oldSetX != 0 || oldSetY != 0 || oldSetZ != 1) {

        var oldX = this.layoutViewMode3DCamera.rotation.x;
        var oldY = this.layoutViewMode3DCamera.rotation.y;
        var oldZ = this.layoutViewMode3DCamera.rotation.z;

        this.layoutViewMode3DCamera.up.set(0, 0, 1);
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        var newX = this.layoutViewMode3DCamera.rotation.x;
        var newY = this.layoutViewMode3DCamera.rotation.y;
        var newZ = this.layoutViewMode3DCamera.rotation.z;

        this.layoutViewMode3DCamera.up.set(oldSetX, oldSetY, oldSetZ);
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        AnimationTimer.StartTimer(this, 0.4, function (speed, percent) {
            var x = (newX - oldX) * (percent * percent) + oldX;
            var y = (newY - oldY) * (percent * percent) + oldY;
            var z = (newZ - oldZ) * (percent * percent) + oldZ;

            this.layoutViewMode3DCamera.rotation.x = x;
            this.layoutViewMode3DCamera.rotation.y = y;
            this.layoutViewMode3DCamera.rotation.z = z;
        }, function () {
            this.layoutViewMode3DCamera.up.set(0, 0, 1);
            this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
        });
    }
};

/**
 * Allows the viewing of all floors stacked on top of each other in 3D.
 */
ViewMode3DController.prototype.showAllFloors = function () {
    var floorList = this.hvacApplication.getCurrentBuilding().getFloorList();
    var currentFloor = this.hvacApplication.getCurrentFloorPlan();
    var currentFloorIndex = floorList.indexOf(currentFloor);
    var delay = 0;

    //Iterates through each floor
    for (var j = 0; j < floorList.length; j++) {
        if (floorList[j] == currentFloor) continue;

        //Iterates through each wall of the current floor
        for (var i = 0; i < floorList[j].getWallList().length; i++) {
            (function (i, floor, floorNum, delay) {
                AnimationTimer.StartTimerDelayed(this, delay * 0.1, 0.0, function () {
                }, function () {
                    var wall = floor.getWallList()[i];

                    var lengthOfWall = wall.getLine().getLength();
                    var wallCenter = wall.getLine().getCenterPoint();

                    var wallWidth = 10;
                    var wallHeight = 160;
                    var wallLength = lengthOfWall;

                    var geometry = new THREE.BoxBufferGeometry(wallWidth, wallLength, wallHeight);

                    var group = new THREE.Object3D();

                    var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, opacity: 0.75});
                    material.transparent = true;
                    var newMesh = new THREE.Mesh(geometry, material);
                    group.add(newMesh);

                    //Create outline object
                    var geo = new THREE.EdgesGeometry(geometry); // or WireframeGeometry( geometry )
                    var mat = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2});
                    mat.transparent = true;
                    var wireframe = new THREE.LineSegments(geo, mat);

                    group.add(wireframe);

                    this.layoutViewMode3DScene.add(group);

                    var locationX = wallCenter.x;
                    var locationY = -wallCenter.y;
                    var locationZ = wallHeight / 2 + wallHeight * (floorNum - currentFloorIndex);

                    var rotation = wall.getLine().getRotation();
                    AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
                        var x = locationX * percent;
                        var y = locationY * percent;

                        group.position.set(x, y, locationZ);
                        group.rotation.set(0, 0, rotation * percent);
                    }, function () {
                        group.position.set(locationX, locationY, locationZ);
                        group.rotation.set(0, 0, rotation);
                    });
                });
            }).call(this, i, floorList[j], j, delay);

            delay++;
        }
    }
};

/**
 * This function creates the drawing Layout in 3D View Mode.
 */
ViewMode3DController.prototype.drawLayout = function () {
    this.viewZ = (1 / this.hvacApplication.viewScale) / 4 * 2415; //2363

    this.layoutViewMode3DCamera.position.setZ(this.viewZ);

    if (this.lastViewScale != this.hvacApplication.viewScale)
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
    this.lastViewScale = this.hvacApplication.viewScale;

    this.layoutViewMode3DRenderer.render(this.layoutViewMode3DScene, this.layoutViewMode3DCamera);
};

/**
 * This function allows us to resize the 3D View Mode.
 */
ViewMode3DController.prototype.resizeView = function () {
    if (this.layoutViewMode3DRenderer == null) return;

    var width = this.hvacApplication.applicationDiv.clientWidth;
    var height = this.hvacApplication.applicationDiv.clientHeight - 82;

    this.layoutViewMode3DCamera.aspect = width / height;
    this.layoutViewMode3DCamera.updateProjectionMatrix();
    this.layoutViewMode3DRenderer.setSize(width, height);
};