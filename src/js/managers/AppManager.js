/*
* ************* APPLICATION MANAGER *************** 
*
* Handles application model state and gl rendering responsibilities.
*
*/

var AppManager = function (ap) {

	this.ap = ap;
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';

	this.container;
	this.renderer;

	this.cameraRTT
	this.sceneRTT
	this.rtTexture;

	this.scene;
	this.controls;
	this.camera;

	this.particleSystem;
	this.geometry;

	this.time;

	// TODO preload this
	this.nodeTexture = THREE.ImageUtils.loadTexture( "images/nodeflare1.png" );

	// TODO
	/*
	this.rtTextureA, this.rtTextureB, this.coordsMap, this.portsMap;
	this.simSize = 0;
	this.base = 10000000;
	this.rtToggle = true;

	this.nodeShaderMaterial;
	*/

};



AppManager.prototype = {

	init: function () {

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		this.cameraRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
		this.sceneRTT = new THREE.Scene();

		this.rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );


		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.autoClear = false;
		this.container.appendChild( this.renderer.domElement ); 
		this.container.appendChild( this.stats.domElement );

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.z = 1700;
		this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement);


		material = new THREE.ShaderMaterial( {

			uniforms: { time: { type: "f", value: 0.0 } },
			vertexShader: document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragment_shader_pass_1' ).textContent

		} );

		var materialScreen = new THREE.ShaderMaterial( {

			uniforms: { tDiffuse: { type: "t", value: this.rtTexture } },
			vertexShader: document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragment_shader_screen' ).textContent,

			depthWrite: false

		} );

		var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );

		quad = new THREE.Mesh( plane, material );
		quad.position.z = -100;
		this.sceneRTT.add( quad );

		quad = new THREE.Mesh( plane, materialScreen );
		quad.position.z = -100;
		this.scene.add( quad );
		

		uniforms = {
			u_colorMap:   { type: "t", value: this.rtTexture },
			u_pointSize:        { type: 'f', value: 60.0 },
			u_texture:   { type: "t", value: this.nodeTexture }
		};

		nodeShaderMaterial = new THREE.ShaderMaterial( {

			uniforms:       uniforms,
			//attributes:     attributes,
			vertexShader:   document.getElementById( 'node_vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'node_fragmentshader' ).textContent,

			depthTest:      false,
			transparent:    true

		});


		this.geometry = new THREE.Geometry();

		// TODO - addNodes() function handled by HardwareManager()
		// Add basic test nodes right here for now
		for ( e = 0; e < 12; e ++ ) {
			for ( i = 0; i < 14; i ++ ) { 
				var vertex = new THREE.Vector3();
				vertex.x = (e * 30) - 155;
				vertex.y = (i * 30) - 155;
				this.geometry.vertices.push( vertex );
			}
		}

		this.particleSystem = new THREE.PointCloud( this.geometry, nodeShaderMaterial );
		this.particleSystem.sortParticles = true;
		this.scene.add( this.particleSystem );

	},

	update: function () {

		this.time = Date.now() * 0.0015;
		this.stats.update();


		//this.camera.position.x += ( mouseX - this.camera.position.x ) * 0.05;
		//this.camera.position.y += ( - mouseY - this.camera.position.y ) * 0.05;
		//this.camera.lookAt( this.scene.position );
		this.controls.update();
		

		this.renderer.clear();

		// Render first scene into texture
		this.renderer.render( this.sceneRTT, this.cameraRTT, this.rtTexture, true );

		// Render full screen quad with generated texture
		// TODO turn this on when we need to capture for broadcast
			//this.renderer.render( this.scene, this.cameraRTT );
			//gl = renderer.getContext();
			//gl.readPixels(0, 0, 12, 12, gl.RGBA, gl.UNSIGNED_BYTE, pixels); //TODO update size
			//this.renderer.clear();

		// Render the node and plane scene using the generated texture
		this.renderer.render( this.scene, this.camera );
		
	},

	// temporary for testing
	setContainer: function ( _container ) {

		this.container = _container;
	}

}
