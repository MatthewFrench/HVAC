/**
 * Created by matt on 2/28/17.
 */

var Mode3DTypeEnum = {
    DRAG: 0,
    ROTATE: 1,
    ORBIT: 2
};

class Canvas3D {
    constructor({hvacApplication} = {}) {
        this.hvacApplication = hvacApplication;

        window.addEventListener("resize", CreateFunction(this, this.resizeCanvas));

        this.layoutViewMode3DRenderer = null;

        this.viewZ = 0;

        this.cameraCenterX = 0;
        this.cameraCenterY = 0;

        this.cameraLookAtX = 0;
        this.cameraLookAtY = 0;

        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = false;

        this.currentMode = Mode3DTypeEnum.DRAG;

        this.createRenderer();

        this.canvas = this.layoutViewMode3DRenderer.domElement;
        this.canvasContainer = CreateElement({type: "div", className: "Canvas3D", elements:[
            this.canvas
        ]});

        //Set mouse events for canvas
        this.canvas.addEventListener('mousewheel', CreateFunction(this, handleScroll), false);

        //On Show
        this.cameraCenterX = this.canvas.width / 2; //-this.canvasWidth / 2.0 - window.innerWidth;
        this.cameraCenterY = -this.canvas.height / 2 + 41; //this.canvasHeight / 2.0 - window.innerHeight;

        this.create3DEverything();

        this.addFlatFloor();
    }

    logic() {
        if (this.layoutViewMode3DRenderer.getSize().width != this.canvasContainer.clientWidth || this.layoutViewMode3DRenderer.getSize().height != this.canvasContainer.clientHeight) {
            this.resizeCanvas();
        }

        this.viewZ = (1 / this.hvacApplication.viewScale) / 4 * 2415; //2363

        this.layoutViewMode3DCamera.position.setZ(this.viewZ);


        if (this.lastViewScale != this.hvacApplication.viewScale)
            this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
        this.lastViewScale = this.hvacApplication.viewScale;

        this.layoutViewMode3DRenderer.render(this.layoutViewMode3DScene, this.layoutViewMode3DCamera);
    }

    createRenderer() {
        this.layoutViewMode3DRenderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        var width = 100;
        var height = 100;
        this.layoutViewMode3DCamera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100000);

        this.layoutViewMode3DScene = new THREE.Scene();

        this.layoutViewMode3DRenderer.domElement.onmousedown = CreateFunction(this, function (event) {
            var mouseX = event.offsetX;
            var mouseY = event.offsetY;

            this.mouseX = mouseX;
            this.mouseY = mouseY;
            this.mouseDown = true;
        });
        this.layoutViewMode3DRenderer.domElement.onmousemove = CreateFunction(this, function (event) {
            var mouseX = event.offsetX;
            var mouseY = event.offsetY;

            var movedX = mouseX - this.mouseX;
            var movedY = mouseY - this.mouseY;

            movedX /= this.hvacApplication.viewScale;
            movedY /= this.hvacApplication.viewScale;

            this.mouseX = mouseX;
            this.mouseY = mouseY;

            if (this.mouseDown) {
                if (this.currentMode == Mode3DTypeEnum.ROTATE) {
                    this.layoutViewMode3DCamera.up.set( 0, 1, 0 );

                    this.layoutViewMode3DCamera.position.setX(this.layoutViewMode3DCamera.position.x - movedX * 2);
                    this.layoutViewMode3DCamera.position.setY(this.layoutViewMode3DCamera.position.y + movedY * 2);
                    this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
                } else if (this.currentMode == Mode3DTypeEnum.DRAG) {
                    this.cameraLookAtX -= movedX;
                    this.cameraLookAtY += movedY;
                    this.layoutViewMode3DCamera.position.setX(this.layoutViewMode3DCamera.position.x - movedX);
                    this.layoutViewMode3DCamera.position.setY(this.layoutViewMode3DCamera.position.y + movedY);
                    this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));
                } else if (this.currentMode == Mode3DTypeEnum.ORBIT) {
                    this.layoutViewMode3DCamera.up.set( 0, 0, 1 );

                    var angle = function(cx, cy, ex, ey) {
                        var dy = ey - cy;
                        var dx = ex - cx;
                        var theta = Math.atan2(dy, dx);
                        return theta;
                    };

                    var rotate = Math.hypot(movedX, movedY) / Math.PI / 2.0 / 50.0;
                    if (movedX > 0) rotate *= -1;

                    this.cameraAngle = angle(this.cameraLookAtX, this.cameraLookAtY, this.layoutViewMode3DCamera.position.x, this.layoutViewMode3DCamera.position.y);
                    this.cameraAngle += rotate;


                    var orbitRange = Math.hypot(this.cameraLookAtX - this.layoutViewMode3DCamera.position.x, this.cameraLookAtY - this.layoutViewMode3DCamera.position.y);
                    this.layoutViewMode3DCamera.position.x = Math.cos(this.cameraAngle) * orbitRange + this.cameraLookAtX;
                    this.layoutViewMode3DCamera.position.y = Math.sin(this.cameraAngle) * orbitRange + this.cameraLookAtY;
                    this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

                    //console.log("x: " + this.layoutViewMode3DCamera.rotation.x + ", y: " + this.layoutViewMode3DCamera.rotation.y + ", z: " + this.layoutViewMode3DCamera.rotation.z);
                }
            }
        });
        this.layoutViewMode3DRenderer.domElement.onmouseup = CreateFunction(this, function (event) {
            var mouseX = event.offsetX;
            var mouseY = event.offsetY;

            this.mouseX = mouseX;
            this.mouseY = mouseY;
            this.mouseDown = false;
        });
    }

    create3DEverything() {
        this.viewZ = this.defaultZ;

        var width = 100;
        var height = 100;

        this.layoutViewMode3DCamera.aspect = width / height;
        this.layoutViewMode3DCamera.updateProjectionMatrix();
        //this.layoutViewMode3DRenderer.setSize(width, height);

        this.layoutViewMode3DCamera.position.z = this.viewZ;
        this.layoutViewMode3DCamera.position.x = this.cameraCenterX;
        this.layoutViewMode3DCamera.position.y = this.cameraCenterY;

        this.cameraLookAtX = this.cameraCenterX;
        this.cameraLookAtY = this.cameraCenterY;
        this.layoutViewMode3DCamera.lookAt(new THREE.Vector3(this.cameraLookAtX, this.cameraLookAtY, 0));

        this.layoutViewMode3DScene = new THREE.Scene();

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

        //this.canvas.appendChild(this.layoutViewMode3DRenderer.domElement);

        this.resizeCanvas();
    }

    addFlatFloor() {
        for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {

            var wall = this.hvacApplication.getCurrentWallList()[i];

            var lengthOfWall = wall.getLine().getLength() + 4;
            var wallCenter = wall.getLine().getCenterPoint();
            var wallRotation = wall.getLine().getRotation();

            var wallWidth = 5;

            var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false});
            /*, opacity: 0.5*/
            material.transparent = true;
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(wallWidth, lengthOfWall), material);
            plane.doubleSided = false;
            plane.position.x = wallCenter.x;
            plane.position.y = -wallCenter.y;
            plane.rotation.z = wallRotation;
            this.layoutViewMode3DScene.add(plane);
        }
    }

    switchToRotateMode() {
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
        this.currentMode = Mode3DTypeEnum.ROTATE;
    };

    switchToDragMode() {
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
    }

    switchToOrbitMode() {
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
    }

    showAllFloors() {
        var floorList = this.hvacApplication.getCurrentBuilding().getFloorList();
        var currentFloor = this.hvacApplication.getCurrentFloorPlan();
        var currentFloorIndex = floorList.indexOf(currentFloor);

        var delay = 0;
        for (var j = 0; j < floorList.length; j++) {
            if (floorList[j] == currentFloor) continue;
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
    }

    resizeCanvas() {
        if (this.layoutViewMode3DRenderer == null) return;

        this.layoutViewMode3DCamera.aspect = this.canvasContainer.clientWidth / this.canvasContainer.clientHeight;
        this.layoutViewMode3DCamera.updateProjectionMatrix();
        this.layoutViewMode3DRenderer.setSize(this.canvasContainer.clientWidth, this.canvasContainer.clientHeight);
    }


    setRotatedCanvasMouse() {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;
        var p = convertToTransform(new Point2D({x: this.canvasMouseX, y: this.canvasMouseY}),
            new Point2D({x: canvasWidth / 2, y: canvasHeight / 2}), this.hvacApplication.viewAngle, this.hvacApplication.viewScale);
        this.rotatedCanvasMouseX = p.getX();
        this.rotatedCanvasMouseY = p.getY();
    }


    layoutCanvasMousePressed(event) {
        "use strict";
        var mouseX = event.offsetX - this.canvas.clientLeft;
        var mouseY = event.offsetY - this.canvas.clientTop;
        if (event.which == 3) return;
        this.mouseDown = true;
        this.previousMouseX = this.currentMouseX;
        this.currentMouseX = mouseX;
        this.previousMouseY = this.currentMouseY;
        this.currentMouseY = mouseY;

        this.canvasMouseX = this.currentMouseX;
        this.canvasMouseY = this.currentMouseY;

        this.setRotatedCanvasMouse();
    }

    layoutCanvasMouseMoved(event) {
        var mouseX = event.offsetX - this.hvacApplication.applicationDiv.offsetLeft - this.hvacApplication.applicationDiv.clientLeft;
        var mouseY = event.offsetY - this.hvacApplication.applicationDiv.offsetTop - this.hvacApplication.applicationDiv.clientTop;
        this.previousMouseX = this.currentMouseX;
        this.currentMouseX = mouseX;
        this.previousMouseY = this.currentMouseY;
        this.currentMouseY = mouseY;

        this.mouseMovedX = this.previousMouseX - this.currentMouseX;
        this.mouseMovedY = this.previousMouseY - this.currentMouseY;

        this.canvasMouseX = this.currentMouseX;
        this.canvasMouseY = this.currentMouseY;

        var oldRotatedX = this.rotatedCanvasMouseX;
        var oldRotatedY = this.rotatedCanvasMouseY;
        this.setRotatedCanvasMouse();
        this.rotatedCanvasMouseMovedX = oldRotatedX - this.rotatedCanvasMouseX;
        this.rotatedCanvasMouseMovedY = oldRotatedY - this.rotatedCanvasMouseY;

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    }

    layoutCanvasMouseReleased(event) {
        "use strict";
        var mouseX = event.offsetX - this.canvas.clientLeft;
        var mouseY = event.offsetY - this.canvas.clientTop;
        if (event.which == 3) return;
        this.mouseDown = false;
        this.previousMouseX = this.currentMouseX;
        this.currentMouseX = mouseX;
        this.previousMouseY = this.currentMouseY;
        this.currentMouseY = mouseY;

        this.canvasMouseX = this.currentMouseX;
        this.canvasMouseY = this.currentMouseY;

        this.setRotatedCanvasMouse();
    }

    getCanvas() {
        return this.canvasContainer;//this.layoutViewMode3DRenderer.domElement;//this.canvas;
    }
}