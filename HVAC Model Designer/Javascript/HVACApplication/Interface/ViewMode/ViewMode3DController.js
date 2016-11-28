/**
 * Created by personal on 11/11/16.
 */

function ViewMode3DController(hvacApplication) {
    this.hvacApplication = hvacApplication;

    //Create div to hold the renderer and also controls on top
    //this.layout3D
    this.layoutViewMode3DRenderer = null;
}

ViewMode3DController.prototype.show = function() {
    this.create3DEverything();
};
ViewMode3DController.prototype.hide = function() {
    if (this.layoutViewMode3DRenderer != null) this.layoutViewMode3DRenderer.domElement.remove();
    this.layoutViewMode3DRenderer = null;
};

ViewMode3DController.prototype.handle3DScroll = function(evt) {
    var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
    if (delta) {
        var scaleFactor = 1.1;
        var factor = Math.pow(scaleFactor, delta);
        this.z += delta;
        this.layoutViewMode3DCamera.position.setZ(this.z);
    }
    evt.preventDefault();
};

ViewMode3DController.prototype.create3DEverything = function () {
    //this.layoutViewMode3DCamera, this.layoutViewMode3DScene, this.layoutViewMode3DRenderer;
    //this.layoutViewMode3DMesh;
    this.z = 400;

    if (this.layoutViewMode3DRenderer != null) {
        this.layoutViewMode3DRenderer.domElement.remove();
    }

    this.layoutViewMode3DCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.layoutViewMode3DCamera.position.z = 400;
    this.layoutViewMode3DCamera.lookAt(0, 0, 0);
    this.layoutViewMode3DScene = new THREE.Scene();

    //var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );


    for (var i = 0; i < this.hvacApplication.getCurrentWallList().length; i++) {

        (function (i) {
            AnimationTimer.StartTimerDelayed(this, i * 0.5, 0.0, function () {
            }, function () {

                var wall = this.hvacApplication.getCurrentWallList()[i];

                var lengthOfWall = wall.getLine().getLength();
                var wallCenter = wall.getLine().getCenterPoint();
                var wallRotation = wall.getLine().getRotation();

                var wallWidth = 5;
                var wallHeight = 50;
                var wallLength = lengthOfWall / 10.0;

                var geometry = new THREE.BoxBufferGeometry(wallWidth, wallLength, wallHeight);
                var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, opacity: 0.5});

                var newMesh = new THREE.Mesh(geometry, material);
                //newMesh.rotation.set(new THREE.Vector3( 0, 0, 0.1));

                this.layoutViewMode3DScene.add(newMesh);


                var canvasWidth = this.hvacApplication.layoutCanvas.width;
                var canvasHeight = this.hvacApplication.layoutCanvas.height;

                var locationX = (-canvasWidth/2+wallCenter.x) / 10.0;
                var locationY = -(-canvasHeight/2+wallCenter.y) / 10.0;
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


    this.layoutViewMode3DRenderer = new THREE.WebGLRenderer();
    this.layoutViewMode3DRenderer.setPixelRatio(window.devicePixelRatio);
    this.layoutViewMode3DRenderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.layoutViewMode3DRenderer.domElement);

    window.addEventListener('resize', CreateFunction(this, this.resizeView), false);


    this.layoutViewMode3DRenderer.domElement.addEventListener('mousewheel', CreateFunction(this, this.handle3DScroll), false);

    this.resizeView();

    this.hvacApplication.currentViewModeLayout = ViewModeType.Mode3D;
};

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

    this.layoutViewMode3DRenderer.render(this.layoutViewMode3DScene, this.layoutViewMode3DCamera);
};

ViewMode3DController.prototype.resizeView = function () {
    if (this.layoutViewMode3DRenderer == null) return;
    this.layoutViewMode3DCamera.aspect = window.innerWidth / window.innerHeight;
    this.layoutViewMode3DCamera.updateProjectionMatrix();
    this.layoutViewMode3DRenderer.setSize(window.innerWidth, window.innerHeight);
};