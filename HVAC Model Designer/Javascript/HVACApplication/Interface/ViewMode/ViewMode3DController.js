/**
 * Created by personal on 11/11/16.
 */

HVACApplication.prototype.setLayoutViewModeTo3D = function() {
    //this.layoutViewMode3DCamera, this.layoutViewMode3DScene, this.layoutViewMode3DRenderer;
    //this.layoutViewMode3DMesh;

        this.layoutViewMode3DCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.layoutViewMode3DCamera.position.z = 400;
        this.layoutViewMode3DScene = new THREE.this.layoutViewMode3DScene();

        //var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
        var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        this.layoutViewMode3DMesh = new THREE.this.layoutViewMode3DMesh( geometry, material );

        this.layoutViewMode3DScene.add( this.layoutViewMode3DMesh );

        this.layoutViewMode3DRenderer = new THREE.WebGLRenderer();
        this.layoutViewMode3DRenderer.setPixelRatio( window.devicePixelRatio );
        this.layoutViewMode3DRenderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.layoutViewMode3DRenderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );

        this.resizeViewModeLayout3D();
};

HVACApplication.prototype.drawViewModeLayout3D = function () {
    //requestAnimationFrame( animate );
    //this.layoutViewMode3DMesh.rotation.x += 0.005;
    //this.layoutViewMode3DMesh.rotation.y += 0.01;
    this.layoutViewMode3DRenderer.render( this.layoutViewMode3DScene, this.layoutViewMode3DCamera );
};

HVACApplication.prototype.resizeViewModeLayout3D = function() {
    this.layoutViewMode3DCamera.aspect = window.innerWidth / window.innerHeight;
    this.layoutViewMode3DCamera.updateProjectionMatrix();
    this.layoutViewMode3DRenderer.setSize( window.innerWidth, window.innerHeight );
};