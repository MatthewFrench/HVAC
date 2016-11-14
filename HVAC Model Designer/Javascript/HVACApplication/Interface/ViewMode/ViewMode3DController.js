/**
 * Created by personal on 11/11/16.
 */

HVACApplication.prototype.setLayoutViewModeTo3D = function() {
    //this.layoutViewMode3DCamera, this.layoutViewMode3DScene, this.layoutViewMode3DRenderer;
    //this.layoutViewMode3DMesh;

        this.layoutViewMode3DCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.layoutViewMode3DCamera.position.z = 400;
this.layoutViewMode3DCamera.lookAt(0, 0, 0);
        this.layoutViewMode3DScene = new THREE.Scene();

        //var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );


    for (var i = 0; i < this.getCurrentWallList().length; i++) {

        (function(i){
            AnimationTimer.StartTimerDelayed(this, i * 1.0, 0.0, function(){}, function(){

                var wall = this.getCurrentWallList()[i];

                var lengthOfWall = wall.getLine().getLength();
                var wallCenter = wall.getLine().getCenterPoint();
                var wallRotation = wall.getLine().getRotation();

                var wallWidth = 5;
                var wallHeight = 50;
                var wallLength = lengthOfWall / 10.0;

                var geometry = new THREE.BoxBufferGeometry( wallWidth, wallLength, wallHeight );
                var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, opacity: 0.5 } );

                var newMesh = new THREE.Mesh( geometry, material );
                //newMesh.rotation.set(new THREE.Vector3( 0, 0, 0.1));

                this.layoutViewMode3DScene.add( newMesh );


                var locationX = wallCenter.x / 10.0;
                var locationY = wallCenter.y / 10.0;
                var rotation = wall.getLine().getRotation();
                console.log("Wall rotation: " + rotation);
                AnimationTimer.StartTimer(this, 1.5, function(speed, percent){
                    var x = locationX * percent;
                    var y = locationY * percent;

                    newMesh.position.set(x, y, 0);
                    newMesh.rotation.set(0, 0, rotation * percent);
                }, function(){
                    newMesh.position.set(locationX, locationY, 0);
                    newMesh.rotation.set(0, 0, rotation);

                });

            });


        }).call(this, i);
    }



        this.layoutViewMode3DRenderer = new THREE.WebGLRenderer();
        this.layoutViewMode3DRenderer.setPixelRatio( window.devicePixelRatio );
        this.layoutViewMode3DRenderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.layoutViewMode3DRenderer.domElement );

        window.addEventListener( 'resize', CreateFunction(this, this.resizeViewModeLayout3D), false );

        this.resizeViewModeLayout3D();

    this.currentViewModeLayout = ViewModeType.Mode3D;
};

HVACApplication.prototype.drawViewModeLayout3D = function () {
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

    this.layoutViewMode3DRenderer.render( this.layoutViewMode3DScene, this.layoutViewMode3DCamera );
};

HVACApplication.prototype.resizeViewModeLayout3D = function() {
    this.layoutViewMode3DCamera.aspect = window.innerWidth / window.innerHeight;
    this.layoutViewMode3DCamera.updateProjectionMatrix();
    this.layoutViewMode3DRenderer.setSize( window.innerWidth, window.innerHeight );
};