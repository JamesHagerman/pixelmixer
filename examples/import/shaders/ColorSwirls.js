// http://glslsandbox.com/e#18039.0

PX.clips.ColorSwirls = {

	params: {

		"p1": { value: 0.35, desc: "scale" }

	},

	fragmentFunctions: [

		[ "vec3 rotateXY(vec3 vect, vec3 axis, float angle) {",
				"float s = sin(angle);",
				"float c = cos(angle);",
				"float oc = 1.0 - c;",
				"float azs = axis.z * s; ",
				"float axs = axis.x * s;",
				"float ays = axis.y * s;",
				"float ocxy = oc * axis.x * axis.y; ",
				"float oczx = oc * axis.z * axis.x;",
				"float ocyz = oc * axis.y * axis.z;  ",
				"mat4 rm = mat4(oc * axis.x * axis.x + c, ocxy - azs, oczx + ays, 0.0,",
				"ocxy + azs, oc * axis.y * axis.y + c, ocyz - axs, 0.0,		   ",
				"oczx -ays, ocyz + axs, oc * axis.z * axis.z + c,  0.0,",
				"0.0, 0.0, 0.0, 1.0);",
				"return (vec4(vect, 1.0)*rm).xyz;",
			"}"

		].join("\n")

	],

	fragmentMain: [


		"vec2 p = (( gl_FragCoord.xy / resolution.xy ) - vec2(0.5, 0.5)) * (_p1 * 2.);",
		"p = p*pi;",

		"float t = (rcpi*(time/pi+picu))+pi;",
	    "vec3 camp = (vec3(0.0, 0.0, 1.0))*(twpi+sin(t)*pi);",
		"vec3 qAxis = normalize(vec3(sin(t*(rcpi)), cos(t*(prpi)), cos(t*(lgpi)) ));",
		"vec3 wAxis = normalize(vec3(cos(t*(-trpi)), sin(t*(rcpi)), sin(t*(lgpi)) ));",
		"camp = rotateXY(camp, wAxis, sin(t*prpi)*pi);",
		"vec3 camTarget = -camp;//vec3(0.0,0.0,0.0);",
		"vec3 camDir = normalize(camTarget-camp);",
		
		"t*=rcpi;",
	    "vec3 camUp  = normalize(vec3(0.0,1.0,0.0));",
		"camUp = rotateXY(camUp, camDir, sin(t*prpi)*pi);",
	    "vec3 camSide = cross(camDir, camUp);",
		
		"t*=rcpi;",
	    "vec3 rayDir = ((camSide*p.x + camUp*p.y - camDir*((1.))));",
		"rayDir = (rayDir+normalize(rayDir))/2.;",
		"vec3 col = (sin(qAxis+wAxis+camp+rayDir*pisq)*0.5+0.5);",
		"vec3 vp = col;",
		"for(int i=1; i<64; i++)",
		"{",
			"float ii = sqrt(float(i));",
			"vp+=rayDir/(ii);",
			"vp = rotateXY(vp,normalize(qAxis+col/pi),length(col)/ii);",
			"col = mix(col,(sin(vp+col+wAxis)*0.5+0.5),sin(t)*0.5+0.5);",
		
		"}",
		
		"gl_FragColor = vec4((col),1.0);"

	].join("\n")

};
