/**
 * Basic test shader in ap clip harness
 * Using minimum amount needed for a clip
 */


ap.clips.BareBonesClip = {

	fragmentMain: [

		"gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" // Output Red

		].join("\n")

};