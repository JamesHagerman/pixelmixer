

if ( ! Detector.webgl ) { Detector.addGetWebGLMessage(); }


var frameCount = 0;
var updateShader;



function onLoad(){


	// Register all clips by their id's for easy lookup later
	for (var property in ap.clips) {
		if (ap.clips.hasOwnProperty(property)) {
			ap.register[ap.clips[property].id] = property;
		}
	}


	// ****** Managers ******

	ap.ports = new PortManager();
	ap.hardware = new HardwareManager();
	ap.channels = new ChannelManager();
	ap.app = new AppManager(document.getElementById( 'container' ));
	ap.app.setSize(window.innerWidth, window.innerHeight);
	ap.ui = new UiManager();

	ap.ports.init();
	ap.hardware.init();
	ap.channels.init();
	ap.app.init();
	ap.ui.init();


	// ****** Runtime Loop ****** 

	var updateShaderLimiter = 0;
	// Allow limiter to be modified based on system capabilities, if we detect lag we can increase it

	function animate() {

		//if(frameCount % 30 == 1){ // Slow framerate testing


		// Update everything else if we don't have to update the shader this frame
		if((!updateShader || updateShaderLimiter < 4) && updateShaderLimiter > 0){

			// ** Main loop update 
			ap.app.update();
			ap.ports.update();
			ap.hardware.update();
			ap.channels.update();
			ap.ui.update();

		}else{

			// We detected the shader needs an update, only do that this frame
			ap.app.updateMainSourceShader();
			ap.app.update();
			updateShaderLimiter = 0;
			updateShader = false;
		}
		updateShaderLimiter++;

		// Render next frame // TODO: throttle logic if needed
		requestAnimationFrame( animate );
		frameCount++;
	}

	animate();




	// ****** Event Handlers ****** 

	document.addEventListener( 'keydown', function ( event ) {

		//console.log(event.keyCode);

		switch ( event.keyCode ) {

			case 8: // prevent browser back
				event.preventDefault();
				break;


		// TESTING

			case 16: // shift
				break;
		}

	}, false );


	function onWindowResize() {

		// TODO - allow to be set in page and not always use fullscreen of window res
		ap.app.glWidth = window.innerWidth;
		ap.app.glHeight = window.innerHeight;

		if(ap.app.readPixels){
			ap.app.pixels = new Uint8Array(4 * ap.app.glWidth * ap.app.glHeight);
		}

		ap.app.camera.aspect = ap.app.glWidth / ap.app.glHeight;
		ap.app.camera.updateProjectionMatrix();

		ap.app.renderer.setSize( ap.app.glWidth, ap.app.glHeight );
		ap.app.controls.handleResize();

	}

	window.addEventListener( 'resize', onWindowResize, false );

	setTimeout(onWindowResize, 1);

}