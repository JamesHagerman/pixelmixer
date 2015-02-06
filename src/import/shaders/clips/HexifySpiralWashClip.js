// http://glslsandbox.com/e#19474.0

ap.clips.HexifySpiralWashClip = {

	id: 14,

	params: {

		"p1": { value: 1.0, desc: "scale" }

	},

	variables: { // (optional internal variables)

		"vr": { type: "f" },
		"vg": { type: "f" },
		"vb": { type: "f" }

	},

	fragmentFunctions: {

		"hexifyWash": [ 
			"vec2 hexifyWash(vec2 p,float hexCount){",
				"p*=hexCount;",
				"vec3 p2=floor(vec3(p.x/0.86602540378,p.y+0.57735026919*p.x,p.y-0.57735026919*p.x));",
				"float y=floor((p2.y+p2.z)/3.0);",
				"float x=floor((p2.x+(1.0-mod(y,2.0)))/2.0);",
				"return vec2(x,y)/hexCount;",
			"}"

		].join("\n")

	},

	fragmentMain: [

		"p = (( gl_FragCoord.xy / resolution.xy ) - vec2(0.5, 0.5)) * (__p1);",
		"p.x*=resolution.x/resolution.y;",
		"p=hexifyWash(p,80.0);",
		"vr = 0.5*sin(10.*sqrt((p.x-0.5)*(p.x-0.5)+(p.y-0.5)*(p.y-0.5))+u_time*2.5)+0.5;",
		"vg = 0.5*sin(20.*sqrt((p.x-0.5)*(p.x-0.5)+(p.y-0.25)*(p.y-0.25))-u_time*3.5)+0.5;",
		"vb = 0.5*sin(30.*sqrt((p.x-0.5)*(p.x-0.5)+(p.y)*(p.y))+u_time*1.5)+0.5;",
		"gl_FragColor = vec4(vr,vg,vb,1);"

	].join("\n")

};
