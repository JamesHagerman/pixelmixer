/*
* ************* UI MANAGER *************** 
*
* One possible View & Controller state of the MVC application
*
*/

var UiManager = function () {

	this.guiData;

	this.gui = new dat.GUI({
		load: ap.datguiJson,
		preset: 'Test'
	});

};

UiManager.prototype = {

	init: function () {

			// ****** UI ******  // TODO replace dat.gui with react components (or similar) that reflect model: ap.channels 



			// The list of state that the UI is representing (V) and setting (C)
			this.guiData  = {
				Channel1Mix:  1,
				/*
				S3Blend:  'Add',
				S3ClipId:  0,
				S3Mix:  1,
				S3Scale:  1,
				Hue3Mix:  1,
				*/
				S2Blend:  'Add',
				S2ClipId:  ap.demoHardware[0],
				S2Mix:  1,
				S2Scale:  .7,
				S2HueTint:  1,

				S1Mix:  1,
				S1ClipId:  ap.demoHardware[0],
				S1Scale:  .7,
				S1HueTint:  1,

				Hue:  1,
				Sat:  1,
				//Threshold:  1,
				//Noise:  0,

				Speed: ap.app.speed,
				PointSize: 60,
				Hardware: ap.demoHardware[0]

			}
			
			// Add preset controls
			this.gui.remember(this.guiData);


			// =========Event listeners===============

			this.gui.add( this.guiData, "Channel1Mix", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_mix.value = _in; });
			
			this.gui.add( this.guiData, 'Hardware', ap.demoHardware).onChange(function (_in) {

				ap.ports.clearAllPorts();

				switch(_in){
					case ap.demoHardware[0]:

						ap.channels.setPodPos(2, new PodPosition(-190, 140, 0, 1070, 575, 1));
						ap.hardware.importNodes(ap.imported, 1, 0, 0, 0);
						break;
					case ap.demoHardware[1]:

						ap.channels.setPodPos(2, { x: -340, y: 30, z: 10, w: 1380, h: 740, d: 1 });
						ap.hardware.addTestPortsGrid3(1, 0, 0);
						break;

					case ap.demoHardware[2]:

						ap.channels.setPodPos(2, new PodPosition(-190, 286, 0, 1070, 242, 1));
						ap.hardware.addTestPortsGrid(1, 0, 0);
						break;


					default: 
						ap.hardware.importNodes(ap.imported, 1, 0, 0, 0);
					break;
				}
					ap.app.updateNodePoints(); // only need to call this when we add nodes after_init
					ap.app.updateMainSourceShader();

					updateShader = true;

			});

			//var f1 = gui.addFolder('Shader 1'); 		f1.open();
			var f2 = this.gui.addFolder('Shader 1'); 	//	f2.open();
			var f3 = this.gui.addFolder('Shader 2'); 	//	f3.open();
			var f4 = this.gui.addFolder('Post FX'); 		//	f4.open();
			var f5 = this.gui.addFolder('Settings'); 	//	f5.open();

			/*
			// Pod 3
			f1.add( guiData, 'S3Blend', ap.BLENDS )		.onChange(function () { uniformBlendChange( guiData.S3Blend, "_1_3"); });
			f1.add( guiData, 'S3ClipId', ap.demoPresetNames).onChange(function () { uniformClipTypeChange( guiData.S3ClipId, 1, 3, 1 ); });
			f1.add( guiData, "S3Mix", 0.0, 1.0, 1.0 )	.onChange(function () { ap.app.material.uniforms._1_3_1_mix.value = guiData.S3Mix; });
			f1.add( guiData, "S3Scale", 0.0, 1.0, 1.0 )	.onChange(function () { ap.app.material.uniforms._1_3_1_p1.value = guiData.S3Scale; });
			f1.add( guiData, "Hue3Mix", 0.0, 1.0, 1.0 )	.onChange(function () { ap.app.material.uniforms._1_3_2_p1.value = guiData.Hue3Mix; });
			*/
			// Pod 2
			f2.add( this.guiData, 'S2ClipId', ap.demoPresetNames).onChange(function (_in) { ap.ui.uniformClipTypeChange(_in, 1, 2, 1 ); });
			f2.add( this.guiData, "S2Mix", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_2_1_mix.value =_in; });
			f2.add( this.guiData, "S2Scale", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_2_1_p1.value =_in; });
			f2.add( this.guiData, "S2HueTint", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_2_2_p1.value =_in; });
			f2.add( this.guiData, 'S2Blend', ap.BLENDS )		.onChange(function (_in) { ap.ui.uniformBlendChange(_in, "_1_2"); });
			
			// Pod 1
			f3.add( this.guiData, 'S1ClipId', ap.demoPresetNames).onChange(function (_in) { ap.ui.uniformClipTypeChange(_in, 1, 1, 1 ); });
			f3.add( this.guiData, "S1Mix", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_1_1_mix.value =_in; });
			f3.add( this.guiData, "S1Scale", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_1_1_p1.value =_in; });
			f3.add( this.guiData, "S1HueTint", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._1_1_2_p1.value =_in; });
			
			// Post Fx
			f4.add( this.guiData, "Hue", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._2_1_1_p1.value =_in; });
			f4.add( this.guiData, "Sat", 0.0, 1.0, 1.0 )	.onChange(function (_in) { ap.app.material.uniforms._2_1_1_p2.value =_in; });
			//f4.add( this.guiData, "Threshold", 0.0, 1.0, 1.0 ).onChange(function (_in) { ap.app.material.uniforms._2_1_1_p5.value =_in; });
			//f4.add( this.guiData, "Noise", 0.0, 1.0, 1.0 ).onChange(function (_in) { ap.app.material.uniforms._2_1_1_p6.value =_in; });
			
			// Global Settings (temporary for demo)
			f5.add( this.guiData, "Speed", 0.0, .15, 1.0 ).onChange(function (_in) { ap.app.speed =_in; });
			f5.add( this.guiData, "PointSize", 15.0, 90.0, 1.0 ).onChange(function (_in) { ap.app.nodeShaderMaterial.uniforms.u_pointSize.value =_in; });
			
			f5.add( { ResetCam:function(){
				ap.app.controls.reset();
			} } ,'ResetCam');


			

			// Close folders on startup by default

			f2.close();
			f3.close();
			f4.close();
			f5.close();

	},

	update: function () {

	}, 

	/*
	* Trigger a blend change on ap.app.material based on a defined address
	*/
	uniformBlendChange: function (guiItem, address) { 
		var blend = 1.0;
		if(guiItem === ap.BLENDS[0]){       blend = 1.0;
		}else if(guiItem === ap.BLENDS[1]){ blend = 2.0; 
		}else if(guiItem === ap.BLENDS[2]){ blend = 3.0; 
		}else if(guiItem === ap.BLENDS[3]){ blend = 4.0; 
		}else if(guiItem === ap.BLENDS[4]){ blend = 5.0;
		}else if(guiItem === ap.BLENDS[5]){ blend = 6.0;
		}else if(guiItem === ap.BLENDS[6]){ blend = 7.0; 
		}else if(guiItem === ap.BLENDS[7]){ blend = 8.0;
		}else if(guiItem === ap.BLENDS[8]){ blend = 9.0;
		}else if(guiItem === ap.BLENDS[9]){ blend = 10.0;
		}else if(guiItem === ap.BLENDS[10]){ blend = 11.0;
		}else if(guiItem === ap.BLENDS[11]){ blend = 12.0;
		}else if(guiItem === ap.BLENDS[12]){ blend = 13.0;
		}else if(guiItem === ap.BLENDS[13]){ blend = 14.0;
		}else if(guiItem === ap.BLENDS[14]){ blend = 15.0;
		}else if(guiItem === ap.BLENDS[15]){ blend = 16.0;
		}else if(guiItem === ap.BLENDS[16]){ blend = 17.0;
		}
		ap.app.material.uniforms[address + "_blend"].value = blend;
	},


	/*
	* Trigger a clip type change - demo and testing for now // TODO dynamic UI listing
	*/
	uniformClipTypeChange: function (clipName, channel, pod, clip) {

		var clipId = 0;

		if(clipName !== "OFF"){
			// TODO don't require clips to end in Clip
			clipId = ap.clips[clipName + "Clip"].id;
		}

		ap.channels.setClip(channel, pod, clip, new Clip(clipId, 1.0, ap.BLEND.Add));

		updateShader = true;
	}

}
