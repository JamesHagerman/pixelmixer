/*
*
* One possible way to use UI layer to control the API.
* 
* Webdemo setup
*
*/


function initUi(){

	var guiData;

	var gui = new dat.GUI({
		load: PX.datguiJson,
		preset: 'ApHLineBar'
	});
	

	// -------Create some Channels/Pods/Clips----------


	// ** Channel 1

	var clip1 = new PX.Clip({id: "LineCosSin"});
	var clipfx1 = new PX.Clip({id: "TestFx", blend: PX.BLEND.Fx});

	var clip2 = new PX.Clip({id: "ColorSineBar"});
	var clipfx2 = new PX.Clip({id: "TestFx", blend: PX.BLEND.Fx});

	// Create two pods each with a content clip and a fx clip inside it
	var pods = [];
	pods[1] = new PX.Pod({positionIds: [2], blend: PX.BLEND.LinearLight, clips: [clip1, clipfx1]});
	pods[0] = new PX.Pod({positionIds: [1], clips: [clip2, clipfx2]});

	// Add them both to the first channel
	var channel1 = new PX.Channel({name: "TestChannel1", mix: 1, pods: pods});
	PX.channels.setChannel(1, channel1);


	// ** Channel 2 - Post FX Channel
	
	var pods2 = [];
	var clipfx3 = new PX.Clip({id: "HueFx", blend: PX.BLEND.Fx});

	pods2[0] = new PX.Pod({positionIds: [1], clips: [clipfx3]});

	var channel2 = new PX.Channel({name: "Post FX1", type: PX.CHANNEL_TYPE_FX, mix: 1, pods: pods2});
	PX.channels.setChannel(2, channel2);



	// Tell the shader to update after we set some new state
	PX.updateShader = true;

	// The list of state that the UI is representing (V) and setting (C)
	guiData  = {
		Channel1Mix:  1,
		
		S2Blend:  "LinearLight",
		S2ClipId:  PX.demoClipNames[5],
		S2Mix:  1,
		S2Scale:  0.7,
		S2HueTint:  1,

		S1Mix:  1,
		S1ClipId:  PX.demoClipNames[3],
		S1Scale:  0.7,
		S1HueTint:  1,

		Hue:  1,
		Saturation:  1,
		HueClamp:  1,
		SatClamp:  1,
		Smooth:  0.5,
		PreAmp:  1,
		//Threshold:  1,
		//Noise:  0,

		Speed: PX.speed,
		PointSize: 80,
		Hardware: PX.demoHardware[0]

	};

	// Add preset controls
	gui.remember(guiData);


	// =========Event listeners===============


	gui.add( guiData, "Channel1Mix", 0.0, 1.0, 1.0 )  .onChange(function (v) { PX.set("mix", v, 1);  });

	gui.add( { SnapToFront:function(){
		controls.reset();
		f2.close();
		f3.close();
		f5.close();
	} } ,'SnapToFront');

	//var f1 = gui.addFolder('Shader 1');       f1.open();
	var f2 = gui.addFolder('Shader 1');    //  f2.open();
	var f3 = gui.addFolder('Shader 2');    //  f3.open();
	var f4 = gui.addFolder('Post FX');         //  f4.open();
	var f5 = gui.addFolder('Settings');    //  f5.open();

	// Pod 2
	f2.add( guiData, 'S2ClipId', PX.demoClipNames).onChange(function (v) { uniformClipTypeChange(v, 1, 2, 1 ); });
	f2.add( guiData, "S2Mix", 0.0, 1.0, 1.0 )  .onChange(function (v) { PX.set("mix", v, 1, 2, 1);  });
	f2.add( guiData, "S2Scale", 0.1, 1.0, 1.0 )    .onChange(function (v) { PX.set("p1", v, 1, 2, 1);  });
	f2.add( guiData, "S2HueTint", 0.0, 1.0, 1.0 )  .onChange(function (v) { PX.set("p1", v, 1, 2, 2);  });
	f2.add( guiData, 'S2Blend', PX.BLENDS )        .onChange(function (v) { uniformBlendChange(v, 1, 2); });

	// Pod 1
	f3.add( guiData, 'S1ClipId', PX.demoClipNames).onChange(function (v) { uniformClipTypeChange(v, 1, 1, 1 ); });
	f3.add( guiData, "S1Mix", 0.0, 1.0, 1.0 )  .onChange(function (v) { PX.set("mix", v, 1, 1, 1);  });
	f3.add( guiData, "S1Scale", 0.1, 1.0, 1.0 )    .onChange(function (v) { PX.set("p1", v, 1, 1, 1);  });
	f3.add( guiData, "S1HueTint", 0.0, 1.0, 1.0 )  .onChange(function (v) { PX.set("p1", v, 1, 1, 2);  });

	// Post Fx
	f4.add( guiData, "Hue", 0.0, 1.0, 1.0 )    .onChange(function (v) { PX.set("p1", v, 2, 1, 1);  });
	f4.add( guiData, "HueClamp", 0.0, 1.0, 1.0 )   .onChange(function (v) { PX.set("p2", v, 2, 1, 1);  });
	f4.add( guiData, "Saturation", 0.0, 1.0, 1.0 ) .onChange(function (v) { PX.set("p3", v, 2, 1, 1);  });
	f4.add( guiData, "SatClamp", 0.0, 1.0, 1.0 )   .onChange(function (v) { PX.set("p4", v, 2, 1, 1);  });
	f4.add( guiData, "Smooth", 0.0, 0.98, 1.0 )    .onChange(function (v) { PX.set("p5", v, 2, 1, 1);  });
	f4.add( guiData, "PreAmp", 0.0, 1.0, 0.0 ) .onChange(function (v) { PX.set("p6", v, 2, 1, 1);  });



	//f4.add( guiData, "Threshold", 0.0, 1.0, 1.0 ).onChange(function (v) { PX.set("", 2, 1, 1);  });
	//f4.add( guiData, "Noise", 0.0, 1.0, 1.0 ).onChange(function (v) { PX.set("", 2, 1, 1);  });

	// Global Settings (temporary for demo)
	f5.add( guiData, 'Hardware', PX.demoHardware).onChange(function (v) {

		PX.ports.clearAllPorts();

		switch(v){
			case PX.demoHardware[0]:

				PX.channels.setPodPos(2, new PX.PodPosition(-190, 140, -1000, 1070, 575, 2000));
				PX.hardware.importNodes(PX.imported, 1, 0, 0, 0);
				break;
			case PX.demoHardware[1]:

				PX.channels.setPodPos(2, new PX.PodPosition(-339, 30, -1000, 1378, 738, 2000));
				PX.hardware.addTestPortsGrid3(1, 0, 0);
				break;

			case PX.demoHardware[2]:

				PX.channels.setPodPos(2, new PX.PodPosition(-190, 286, -1000, 1070, 242, 2000));
				PX.hardware.addTestPortsGrid(1, 0, 0);
				break;

			default: 
				PX.hardware.importNodes(PX.imported, 1, 0, 0, 0);
			break;
		}
		PX.updateNodePoints(); // only need to call this when we add nodes aftervit
		PX.updateShader = true;

	});
	f5.add( guiData, "Speed", 0.025, 0.4, 1.0 ).onChange(function (v) { PX.speed = v; });
	f5.add( guiData, "PointSize", 45.0, 90.0, 1.0 ).onChange(function (v) { PX.pointMaterial.uniforms.u_pointSize.value = v;  });



	// Close folders on startup by default
	f2.close();
	f3.close();
	//f4.close();
	f5.close();

}

/*
* Trigger a blend change on a defined address
*/
function uniformBlendChange(guiItem, channel, pod, clip) { 
	for (var i = 0; i < 17; i++) {
		if(guiItem === PX.BLENDS[i]){
			PX.set("blend", (i+1) + ".", channel, pod, clip);
			return;
		}
	};
}


/*
* Trigger a clip type change - demo and testing for now // TODO dynamic UI listing
*/
function uniformClipTypeChange(clipName, channel, pod, clip) {

	var clipId = 0;

	if(clipName !== "OFF"){
		clipId = PX.clips[clipName];
	}

	var clipObj = new PX.Clip({id: clipName});
	PX.channels.setClip(channel, pod, clip, clipObj);

	PX.updateShader = true;
}
