/*
* ************* APPLICATION MANAGER *************** 
*
* Handles application model state and gl rendering responsibilities.
*
*/

var AppManager = function (ap, container) {

	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';

	this.container = container;
	this.renderer;

	this.cameraRTT;
	this.sceneRTT;
	this.rtTexture;

	this.scene;
	this.controls;
	this.camera;
	this.material;

	this.geoX = [];
	this.geoY = [];
	this.passIndex = [];

	this.geometry = new THREE.Geometry();
	this.pointCloud;
	this.fragmentShader;

	this.time = 0;
	this.simSize = 128;

	this.nodeTexture = THREE.ImageUtils.loadTexture( "images/nodeflare1.png" );  // TODO preload this

	this.coordsMap;
	this.base = 10000000;

	this.plane = new THREE.PlaneBufferGeometry( this.simSize, this.simSize );

	// TODO
	/*
	this.rtTextureA, this.rtTextureB, this.portsMap;
	this.rtToggle = true;

	this.nodeShaderMaterial;
	*/

};



AppManager.prototype = {

	init: function () {

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		this.cameraRTT = new THREE.OrthographicCamera( this.simSize / - 2, this.simSize / 2, this.simSize / 2, this.simSize / - 2, -10000, 10000 );
		this.sceneRTT = new THREE.Scene();

		this.rtTexture = new THREE.WebGLRenderTarget( this.simSize, this.simSize, {minFilter: THREE.NearestMipMapNearestFilter,magFilter: THREE.NearestFilter,format: THREE.RGBFormat});
				
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.autoClear = false;
		this.container.appendChild( this.renderer.domElement ); 
		this.container.appendChild( this.stats.domElement );

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.z = 1700;
		this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement);

		this.geometry = new THREE.Geometry();

		this.updateMainSourceShader();

		//---------------
		// testing

		//this.addTestPlane(); 

/*
		// Example of updating the nodes on the fly:
		var that = this;
		setTimeout(function(){
			that.addNodesAsTestGrid(); // Change or add more nodes
			that.updateNodes();
		}, 2000);
*/

/*
		// Example of updating the main shader on the fly:
		var that = this;
		setTimeout(function(){
			that.updateMainSourceShader();
		}, 2000);
*/

		//---------------
	},

	update: function () {

		this.time += .05;
		this.stats.update();


		//this.camera.position.x += ( mouseX - this.camera.position.x ) * 0.05;
		//this.camera.position.y += ( - mouseY - this.camera.position.y ) * 0.05;
		//this.camera.lookAt( this.scene.position );
		this.controls.update();
		

		//this.renderer.clear();

		// Render first scene into texture
		this.renderer.render( this.sceneRTT, this.cameraRTT, this.rtTexture, true );

/*		// TODO turn this on when we need to capture for broadcast
			// Render full screen quad with generated texture
			this.renderer.render( this.sceneRTT, this.cameraRTT );
			gl = renderer.getContext();
			gl.readPixels(0, 0, 12, 12, gl.RGBA, gl.UNSIGNED_BYTE, pixels); //TODO update size
			this.renderer.clear();
*/

		// Render the node and plane scene using the generated texture
		this.renderer.render( this.scene, this.camera );


		// Update uniforms

		if(this.material){
			this.material.uniforms.u_time.value = this.time;
		}
		
	},

	///////////////// test

	addTestPlane: function(){
		var materialScreen = new THREE.ShaderMaterial( {

			uniforms: 		{"u_texture":   { type: "t", value: this.rtTexture }},
			vertexShader: 	ap.shaders.SimpleTextureShader.vertexShader,
			fragmentShader: ap.shaders.SimpleTextureShader.fragmentShader,
			depthWrite: false

		} );

		var quad = new THREE.Mesh( this.plane, materialScreen );
		quad.position.z = -100;
		this.scene.add( quad );

	},

	/////////////////

	// Should get called whenever there are any changes on StateManager
	// (This is the main view that should reflect state)
	updateNodePoints: function () {

		// Reset values and grab entire state fresh
		this.geoX = [];
		this.geoY = [];
		this.passIndex = [];
		this.geometry = new THREE.Geometry();

		// Update 'this.geometry' with all the known nodes on state
		// Create attributes for each one to pass to the shader
		var t = 0;
		for ( e = 0; e < ap.state.ports.length; e ++ ) { 

			var port = ap.state.ports[e];
			for ( i = 0; i < port.nodes.length; i ++ ) { 

				var vertex = new THREE.Vector3();
				vertex.x = port.nodes[i].x;
				vertex.y = port.nodes[i].y;
				vertex.z = port.nodes[i].z;
				this.geometry.vertices.push( vertex );

				// for each point push along x, y values to reference correct pixel in u_colorMaps
				var imageSize = this.simSize; 
				var tx = (t+1) % imageSize;
				if(tx == 0){
					tx = imageSize;
				}
				var ty = ((t+2) - tx) / imageSize;

				this.geoX.push(tx / imageSize - 0.5 / imageSize);
				this.geoY.push(1.0 - ty / imageSize - 0.5 / imageSize); // flip y
				this.passIndex.push(t);
				t++;
			}
		}

		this.generateCoordsMap();
		this.material.uniforms.u_coordsMap.value = this.coordsMap;
		this.createNodePointCloud();

	},

	generateCoordsMap: function () {

		// Generate coordsMap data texture for all the nodes x,y,z
		var a = new Float32Array( Math.pow(this.simSize, 2) * 4 );
		var t = 0;
		for ( var k = 0, kl = a.length; k < kl; k += 4 ) {
			var x = 0;
			var y = 0;
			var z = 0;

			if(this.geometry.vertices[t]){
				x = this.geometry.vertices[t].x / this.base;
				y = this.geometry.vertices[t].y / this.base;
				z = this.geometry.vertices[t].z / this.base;
				a[ k + 3 ] = 1;
			}else{
				a[ k + 3 ] = 0;
			}

			a[ k + 0 ] = x;
			a[ k + 1 ] = y;
			a[ k + 2 ] = z;
			t++;

		}

		this.coordsMap = new THREE.DataTexture( a, this.simSize, this.simSize, THREE.RGBAFormat, THREE.FloatType );
		this.coordsMap.minFilter = THREE.NearestFilter;
		this.coordsMap.magFilter = THREE.NearestFilter;
		this.coordsMap.needsUpdate = true;
		this.coordsMap.flipY = true;

	},

	createNodePointCloud: function(){

		var attributes = ap.shaders.NodeShader.attributes;
		attributes.a_geoX.value = this.geoX;
		attributes.a_geoY.value = this.geoY;
		attributes.a_index.value = this.passIndex;

		var uniforms = ap.shaders.NodeShader.uniforms;
		uniforms.u_colorMap.value = this.rtTexture;
		uniforms.u_texture.value = this.nodeTexture;

		nodeShaderMaterial = new THREE.ShaderMaterial( {

			uniforms:       uniforms,
			attributes:     attributes,
			vertexShader:   ap.shaders.NodeShader.vertexShader,
			fragmentShader: ap.shaders.NodeShader.fragmentShader,

			depthTest:      false,
			transparent:    true
		});

		var name = "AP Nodes";
		if(this.scene.getObjectByName(name)){
			// If the pointCloud has already been added, remove it so we can add it fresh
			this.scene.remove( this.pointCloud );
		}

		this.pointCloud = new THREE.PointCloud( this.geometry, nodeShaderMaterial );
		this.pointCloud.sortParticles = true;
		this.pointCloud.name = name;

		this.scene.add( this.pointCloud );

	},

	updateMainSourceShader: function(){
		// Main quad and texture that gets rendered as the source shader

		this.fragmentShader = document.getElementById( 'fragment_shader_pass_1' ).textContent;

		// TODO - Add shaders based on the loaded clips
		//this.fragmentShader = this.fragmentShader.replace("//#INCLUDESHADERS", "");

		// TODO - update uniforms based on the loaded clips


		// Add ShaderUtils 
		this.fragmentShader = this.fragmentShader.replace("//#INCLUDESHADERUTILS", ap.shaders.ShaderUtils);

		this.material = new THREE.ShaderMaterial( {
			uniforms: {
				u_time: { type: "f", value: this.time },
				u_coordsMap: { type: "t", value: this.coordsMap },
				u_mapSize: { type: "f", value: this.simSize }
			},
			vertexShader: ap.shaders.SimpleTextureShader.vertexShader,
			fragmentShader: this.fragmentShader
		} );

		var name = "SourceQuad";
		var lookupObj = this.sceneRTT.getObjectByName(name);
		if(lookupObj){
			// If the quad has already been added, remove it so we can add it fresh
			this.sceneRTT.remove(lookupObj);
		}

		var quad = new THREE.Mesh( this.plane, this.material );
		quad.position.z = -100;
		quad.name = name;
		this.sceneRTT.add( quad );

	}

}
