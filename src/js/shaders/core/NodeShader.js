/**
 * Simple node shader for displaying on ap nodes
 * TODO - minimize
 */

ap.NodeShader = {

	uniforms: {
		u_colorMap:   { type: "t", value: null },
		u_pointSize:  { type: 'f', value: 60.0 },
		u_texture:    { type: "t", value: null }
	},

	attributes: { // For each node we pass along it's index value and x, y in relation to the colorMaps
		a_geoX:        { type: 'f', value: null },
		a_geoY:        { type: 'f', value: null },
		a_index:        { type: 'f', value: null }
	},

	vertexShader: [

		"uniform float u_pointSize;",
		"attribute float a_geoX;",
		"attribute float a_geoY;",
		"attribute float a_index;",
		"varying float v_geoX;",
		"varying float v_geoY;",
		"varying float v_index;",

		"void main() {",
			"v_geoX = a_geoX;",
			"v_geoY = a_geoY;",
			"v_index = a_index;",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_PointSize = u_pointSize * ( 300.0 / length( mvPosition.xyz ) );",
			"gl_Position = projectionMatrix * mvPosition;",
		"}",

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D u_texture;",
		"uniform sampler2D u_colorMap;",

		"varying float v_geoX;",
		"varying float v_geoY;",
		"varying float v_index;",

		"void main() {",
			"gl_FragColor = texture2D( u_colorMap, vec2( v_geoX, v_geoY )) * texture2D( u_texture, gl_PointCoord);",
		"}",

	].join("\n")

};
