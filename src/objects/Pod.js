/*
*
* Pods contain position and blend data for a group of Clips.
* They allow you to blend multiple Clips, and then blend the result into other Clips.
* They can be associated with multiple position areas.
*
* @param positionIds 	Int[], a list of all position ids to draw this Pod's content into.
* @param mix 			Float, 0-1.
* @param blend 			Int, 1-17 Blend modes specified in constants.
* @param clips 			Clip[], a list of Clips that render the content from shaders.
*
*/


ap.Pod = function (params) {

	this.positionIds = params.positionIds || [];
	this.mix = params.mix || 0;
	this.blend = params.blend || ap.BLEND.Add;
	this.clips = params.clips || [];

	// TODO - this data should be packed into portsMap, useful for creating specific groups of nodes outside of xyz or port data
	// this.hardwareGroupMode = hardwareGroupMode || ap.HARDWAREGROUP_OFF;			// Off, Exclude, or Solo Mode
	// this.hardwareGroupIds = hardwareGroupIds || [];
};