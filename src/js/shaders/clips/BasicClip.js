/**
 * Basic test shader in ap clip harness
 */


ap.clips.BasicClip = {

	id: 2, // OSC requires id's to be integers
	
	params: { // (optional uniforms)

		// Each shader can have upto 6 params that are controlled by it's UI / modulations
		// TODO: define display ranges that will be shown in UI (percentage of param value)
		"p1": { value: 0.5, desc: "scale" },
		"p2": { value: 0.0, desc: "hue" }

	},
	
	properties: { // (optional uniforms)

		// These are internal properties that can be referenced from init/update methods, and passed as uniforms
		"v1": { type: "f", value: 0.0 }

	},
	
	variables: { // (optional internal variables)

		// These are internal variables that are used inside fragmentMain // TODO implement - to be defined with the shader importer
		//"mov0": { type: "f" },
		//"mov1": { type: "f" },
		//"mov2": { type: "f" },
		//"c1": { type: "f" },
		//"c2": { type: "f" },
		//"c3": { type: "f" },
		"blue": { type: "f" },
		"rx": { type: "f" },
		"ry": { type: "f" }

	},

	// Optional helper functions used inside fragmentMain // TODO implement - to be defined with the shader importer

	fragmentFunctions: {

		"red": [ "vec3 red() {",
			"	return vec3(1.0, 0.0, 0.0);",
			"}"

			].join("\n"),

		"red2": [

			"vec4 red(float bright) {",
			"	return vec4(bright, 0.0, 0.0, 1.0);",
			"}"

			].join("\n")

	},


	fragmentMain: [ // Note we only need the Fragment shader and not the Vertex shader as well

		/**
		*
		* ****** Helper Properties:
		* 
		* float ap_index;								// Current node: index value (integer)
		* vec4 ap_xyz;									// Current node: xyz coordinates (or other values to map to)
		* vec3 ap_lastRgb;								// Current node: rgb value last frame. 4th value discard slot
		* vec3 ap_rgb;									// Current node: rgb ouput value
		* 
		* float u_time;									// Uniform: Animation speed, movement should be tied to this other inputs
		* float u_random;								// Uniform: Random value (0-1)
		* float u_mapSize;								// Uniform: The pixelmap size of all nodes
		* sampler2D u_coordsMap;						// Uniform: The xyz coordinates of all nodes stored in a texture
		* sampler2D u_prevCMap;							// Uniform: The previous rgb colors of all nodes stored in a texture
		*
		*
		* ****** Helper Methods:
		*
		* vec3 rgb2hsv(vec3 c); 						// Convert RGB to HSV
		* vec3 hsv2rgb(vec3 c); 						// Convert HSV to RGB
		* vec3 blend(vec3 c1, vec3 c2, float type);		// Blend Modes (1-17)
		* float rand(vec2 co);							// Random Generator	(vec2)
		* float mix(float a, float b, float mix);		// Mix two floats
		* 
		**/

		/**
		* 
		* ****** Still to come: (work in progress) // TODO
		*
		* sampler2D u_portsMap		
		* Clip position data: scale and offset
		* PortId data
		* HardwareGroup Id's
		* Pod's positiond data: x y z width height depth
		*
		* Loader harness to bootstrap these values to any GLSL fragment shader
		* 
		**/

/*
		// TODO position data comes from Pod/Clip coordinates
		"p = ((0.01) * vec2( ap_xyz[0] +  (ap_xyz[2] * 0.25), ap_xyz[1]) ) + 6.;",

		"mov0 = p.x+p.y+cos(sin(u_time)*2.0)*100.+sin(p.x/100.)*1000.;",
		"mov1 = p.y;",
		"mov2 = p.x;",
		"c1 = abs(sin(mov1+u_time)/2.+mov2/2.-mov1-mov2+u_time);",
		"c2 = abs(sin(c1+sin(mov0/1000.+u_time)+sin(p.y/40.+u_time)+sin((p.x+p.y)/100.)*3.));",
		"c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(p.x/1000.)));",

		"c1 = c1 * 0.25;",

		"gl_FragColor = vec4(c2,c3,c1, 1.0); // end shader"

*/

		"rx = gl_FragCoord.x / resolution.x;", // Example of using variables
		"ry = gl_FragCoord.y / resolution.y;",
		//"ry = gl_FragCoord.y / resolution.y * __p1;", // Example of using a param

		//"blue = red(0.0).r;", // Example of using a helper method
		"blue = __v1;", // Example of using a property
		
		// Create a blue border
		"if(ry < 0.05 || ry > 0.95){",
		"	blue = 1.0;",
		"}else if(rx < 0.05 || rx > 0.95){",
		"	blue = 1.0;",
		"}",

		"gl_FragColor = vec4( rx, ry, blue, 1.0 );"



		].join("\n"),


	// Optional JS methods that can be defined per shader 

	init: function(address, uniforms){

		//uniforms[address + "_v1"].value = Math.random(); // Example of using properties
	},

	update: function(address, uniforms){

		//uniforms[address + "_v1"].value = Math.random(); // Example of using properties
	}
};