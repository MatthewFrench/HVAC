/**
 * Created by personal on 11/11/16.
 */

/*This function creates the 3D View Mode*/
function ViewMode3DController(hvacApplication) {
    this.hvacApplication = hvacApplication;

    //Create div to hold the renderer and also controls on top
    //this.layout3D
    this.layoutViewMode3DRenderer = null;


    this.defaultZ = 2600;
    this.viewZ = this.defaultZ;
    this.plane2D = null;
    this.texture2D = null;
    this.textureCanvas = null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this.cameraCenterX = 0;
    this.cameraCenterY = 0;
}

ViewMode3DController.prototype.setupTextureCanvas = function() {
    this.textureCanvas = document.createElement('canvas');
    var lowestX = 0;
    var highestX = 0;
    var lowestY = 0;
    var highestY = 0;
    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
        var wall = this.hvacApplication.getCurrentWallList()[i];

        lowestX = Math.min(lowestX, wall.getPoint1X());
        highestX = Math.max(highestX, wall.getPoint1X());
        lowestY = Math.min(lowestY, wall.getPoint1Y());
        highestY = Math.max(highestY, wall.getPoint1Y());

        lowestX = Math.min(lowestX, wall.getPoint2X());
        highestX = Math.max(highestX, wall.getPoint2X());
        lowestY = Math.min(lowestY, wall.getPoint2Y());
        highestY = Math.max(highestY, wall.getPoint2Y());
    }

    this.canvasWidth = Math.ceil(highestX - lowestX);
    this.canvasHeight = Math.ceil(highestY - lowestY);

    this.cameraCenterX = this.canvasWidth / 2.0;
    this.cameraCenterY = this.canvasHeight / 2.0;

    console.log("Canvas width: " + this.canvasWidth + ", height: " + this.canvasHeight);

    this.textureCanvas.width = this.canvasWidth;
    this.textureCanvas.height = this.canvasHeight;

    this.texture2D = new THREE.Texture(this.textureCanvas);

    /*
    var repeatX, repeatY;
    this.texture2D.wrapS = THREE.ClampToEdgeWrapping;
    this.texture2D.wrapT = THREE.RepeatWrapping;
    repeatX = clothWidth * textureSetting.h / (clothHeight * textureSetting.w);
    repeatY = 1;
    this.texture2D.repeat.set(repeatX, repeatY);
    this.texture2D.offset.x = (repeatX - 1) / 2 * -1;
    */

    this.texture2D.minFilter = THREE.LinearFilter;
    this.texture2D.needsUpdate = true;
};

ViewMode3DController.prototype.drawTextureCanvas = function() {

    var ctx = this.textureCanvas.getContext("2d");

    console.log("Drawing: " + this.canvasWidth + ", " + this.canvasHeight);

     ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

     ctx.save();

     //ctx.translate(canvasWidth/2, canvasHeight/2);

     //ctx.rotate(this.viewAngle); //convertToRadians(this.viewAngle)

     //ctx.scale(this.viewScale, this.viewScale);

     //ctx.translate(-canvasWidth/2, -canvasHeight/2);

     //Draw walls
    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
        var wall = this.hvacApplication.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

     ctx.restore();

    this.texture2D.needsUpdate = true;
};

/*This function allows us to show the 3D View Mode*/
ViewMode3DController.prototype.show = function() {
    this.setupTextureCanvas();
    this.drawTextureCanvas();

    this.create3DEverything();

    this.hvacApplication.layoutCanvas.style.display = "none";
};

/*This function allows us to hide the 3D View Mode*/
ViewMode3DController.prototype.hide = function() {
    if (this.layoutViewMode3DRenderer != null) this.layoutViewMode3DRenderer.domElement.remove();
    this.layoutViewMode3DRenderer = null;

    this.hvacApplication.layoutCanvas.style.display = "";

    this.plane2D = null;
};

/*This function allows us to handle scrolling in 3D View Mode*/
/*
ViewMode3DController.prototype.handle3DScroll = function(evt) {
    var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
    if (delta) {
        var scaleFactor = 1.1;
        var factor = Math.pow(scaleFactor, delta);
        this.viewZ += delta;
        this.layoutViewMode3DCamera.position.setZ(this.viewZ);
    }
    evt.preventDefault();
};
*/

/*This function converts everything from 2D to 3D View Mode*/
ViewMode3DController.prototype.create3DEverything = function () {
    //this.layoutViewMode3DCamera, this.layoutViewMode3DScene, this.layoutViewMode3DRenderer;
    //this.layoutViewMode3DMesh;
    this.viewZ = this.defaultZ;

    if (this.layoutViewMode3DRenderer != null) {
        this.layoutViewMode3DRenderer.domElement.remove();
    }

    var width = window.innerWidth;
    var height = window.innerHeight - 85;
    this.layoutViewMode3DCamera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100000);
    this.layoutViewMode3DCamera.position.z = this.viewZ;
    this.layoutViewMode3DCamera.lookAt(this.cameraCenterX, this.cameraCenterY, 0);
    this.layoutViewMode3DScene = new THREE.Scene();

    //var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );

    var material = new THREE.MeshLambertMaterial({ map : this.texture2D });
    material.transparent = true;
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(this.textureCanvas.width, this.textureCanvas.height), material);
    plane.doubleSided = false;
    plane.position.x = this.textureCanvas.width/2;
    plane.position.y = -this.textureCanvas.height/2;
    plane.rotation.z = 0;
    this.layoutViewMode3DScene.add(plane);
    this.plane2D = plane;


    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {

        (function (i) {
            AnimationTimer.StartTimerDelayed(this, i * 0.1, 0.0, function () {
            }, function () {

                var wall = this.hvacApplication.getCurrentWallList()[i];

                var lengthOfWall = wall.getLine().getLength();
                var wallCenter = wall.getLine().getCenterPoint();
                var wallRotation = wall.getLine().getRotation();

                var wallWidth = 5;
                var wallHeight = 50;
                var wallLength = lengthOfWall;

                var geometry = new THREE.BoxBufferGeometry(wallWidth, wallLength, wallHeight);
                var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, opacity: 0.5});
                material.transparent = true;
                var newMesh = new THREE.Mesh(geometry, material);
                //newMesh.rotation.set(new THREE.Vector3( 0, 0, 0.1));

                this.layoutViewMode3DScene.add(newMesh);


                //var canvasWidth = this.hvacApplication.layoutCanvas.width;
                //var canvasHeight = this.hvacApplication.layoutCanvas.height;

                //var locationX = (-canvasWidth/2+wallCenter.x) / 10.0;
                //var locationY = -(-canvasHeight/2+wallCenter.y) / 10.0;

                var locationX = wallCenter.x;
                var locationY = -wallCenter.y;

                var rotation = wall.getLine().getRotation();
                AnimationTimer.StartTimer(this, 1.0, function (speed, percent) {
                    var x = locationX * percent;
                    var y = locationY * percent;

                    newMesh.position.set(x, y, 0);
                    newMesh.rotation.set(0, 0, rotation * percent);
                }, function () {
                    newMesh.position.set(locationX, locationY, 0);
                    newMesh.rotation.set(0, 0, rotation);

                });

            });


        }).call(this, i);
    }


    this.layoutViewMode3DRenderer = new THREE.WebGLRenderer({ alpha: true });
    this.layoutViewMode3DRenderer.setPixelRatio(window.devicePixelRatio);
    this.layoutViewMode3DRenderer.setSize(width, height);

    this.layoutViewMode3DRenderer.domElement.style.position = "absolute";
    this.layoutViewMode3DRenderer.domElement.style.top = "85px";
    this.layoutViewMode3DRenderer.domElement.style.left = "0";

    document.body.appendChild(this.layoutViewMode3DRenderer.domElement);

    window.addEventListener('resize', CreateFunction(this, this.resizeView), false);


    //this.layoutViewMode3DRenderer.domElement.addEventListener('mousewheel', CreateFunction(this, this.handle3DScroll), false);

    this.resizeView();

    this.hvacApplication.currentViewModeLayout = ViewModeType.Mode3D;
};

/*This function creates the drawing Layout in 3D View Mode*/
ViewMode3DController.prototype.drawLayout = function () {
    //requestAnimationFrame( animate );
    //this.layoutViewMode3DMesh.rotation.x += 0.005;
    //this.layoutViewMode3DMesh.rotation.y += 0.01;
    /*
     var timer = Date.now() * 0.0001;

     this.layoutViewMode3DCamera.position.x = Math.cos( timer ) * 200;
     this.layoutViewMode3DCamera.position.z = Math.sin( timer ) * 200;
     this.layoutViewMode3DCamera.lookAt( this.layoutViewMode3DScene.position );
     */
    //this.layoutViewMode3DScene.rotation.x += 0.005;
    //this.layoutViewMode3DScene.rotation.y += 0.01;
/*
    var ctx = this.hvacApplication.beginDraw();

    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {
        var wall = this.hvacApplication.getCurrentWallList()[i];
        wall.draw(ctx, false);
    }

    this.hvacApplication.endDraw(ctx);
*/

    this.viewZ = this.defaultZ / this.hvacApplication.viewScale;

    console.log("Scale: " + this.viewZ);
    this.layoutViewMode3DCamera.position.setZ(this.viewZ);

    //this.drawTextureCanvas();
    //this.texture2D.needsUpdate = true;

    this.layoutViewMode3DRenderer.render(this.layoutViewMode3DScene, this.layoutViewMode3DCamera);
};

/*This function allows us to resize the 3D View Mode*/
ViewMode3DController.prototype.resizeView = function () {
    if (this.layoutViewMode3DRenderer == null) return;

    var width = window.innerWidth;
    var height = window.innerHeight - 85;

    this.layoutViewMode3DCamera.aspect = width / height;
    this.layoutViewMode3DCamera.updateProjectionMatrix();
    this.layoutViewMode3DRenderer.setSize(width, height);
};