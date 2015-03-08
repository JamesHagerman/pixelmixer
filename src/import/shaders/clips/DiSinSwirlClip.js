/**
 * Basic test shader in ap clip harness
 */


ap.clips.DiSinSwirlClip = {

	id: 15, 
	
	params: { // (optional uniforms)

		"p1": { value: 0.5, desc: "scale" }

	},
	

	fragmentMain: [ // Note we only need the Fragment shader and not the Vertex shader as well


		// TODO position data comes from Pod/Clip coordinates
		"vec2 p = (( gl_FragCoord.xy / resolution.xy ) - vec2(0.5, 0.5)) * (_p1 * 8.);",

		"float mov0 = p.x+p.y+cos(sin(u_time)*2.0)*100.+sin(p.x/100.)*1000.;",
		"float mov1 = p.y;",
		"float mov2 = p.x;",
		"float c1 = abs(sin(mov1+u_time)/2.+mov2/2.-mov1-mov2+u_time);",
		"float c2 = abs(sin(c1+sin(mov0/1000.+u_time)+sin(p.y/40.+u_time)+sin((p.x+p.y)/100.)*3.));",
		"float c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(p.x/1000.)));",

		"c1 = c1 * 0.25;",

		"gl_FragColor = vec4(c2,c3,c1, 1.0);"



		].join("\n"),


	// Optional JS methods that can be defined per shader 

	init: function(address, uniforms){

		//uniforms[address + "_v1"].value = Math.random(); // Example of using properties
	},

	update: function(address, uniforms){

		//uniforms[address + "_v1"].value = Math.random(); // Example of using properties
	}
};