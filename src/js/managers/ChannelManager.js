/*
 * ************* CHANNEL MANAGER *************** 
 * Handles the state of all Channels running in the Universe.
 * Channels may contain Pods, which may contain Clips (structured shaders).
 *
 */

var ChannelManager = function () {

	this.channels = [];

	/*

	// TODO

	--hold state:
	---------------------------------------

	pod objects stored on channel objects

		channels = [];
		channels[0] = new Channel(); // 0 is the address. associative/holey arrays ok, its only looped once when we regenerate shader 
		channels[0].type = "content"; // or 'fx' and 'scenefx' eventually
		channels[0].pods = [];
		channels[0].pods[0] = new Pod(); // '0.0' is the 'channel.pod' address
		channels[0].pods[0].mix = 1;
		channels[0].pods[0].clips = [];
		channels[0].pods[0].clips[0] = new Clip(); // '0.0.0' is the 'channel.pod.clip' address
		channels[0].pods[0].clips[0].id = 12; // colorwash clip for example



	any number of channel objects
		type (content, fx, or scene)
		mix value
		mod values (just for mix)

		any number of pod objects
			mix value
			blend value
			mod values (just for mix)
			position group id (that this pod references position data from)
			hardware group id (up to 3 of them)
				exclude or solo mode (for all hardware groups)

			any number of clip objects
				mix value
				blend value
				param values
				mod values (for mix and params)
				clip id (so we know which shader to grab from library)


	any number of position group objects (each pod must point to one of these) (maybe refactor into seperate manager?)
		id
		position data: xyz, whd


	--responsibilites:
	---------------------------------------

	main responsibility is to build source shader from 'snippets that have pod and clip data baked in'
		the shader gets re-generated anytime
			a pod gets added or deleted
			a pod changes it's hardware group(s), or how it uses the hardware group(s) (exclude or solo) 
			a pod changes which position group it references
			a position group's coordinates change (if actively referenced by a pod)

	define shader uniforms (to be used as clip params and properties)


	when in editor mode, show all the pod position groups, record any coordinate changes


	*/

};

ChannelManager.prototype = {

	init: function () {


	},

	update: function () {


	},


	// ************* Channels ***********************

	setChannel: function (channelId, channelObject) {
		this.channels[channelId-1] = channelObject;
	},

	getChannel: function (channelId) {
		return this.channels[channelId-1];
	},

	getChannels: function () {
		return this.channels;
	},

	clearChannel: function (channelId) {
		delete this.channels[channelId-1]; // TODO optimize: most likely better to not use 'delete'
	},

	clearAllChannels: function () {
		this.channels = [];
	}

}
