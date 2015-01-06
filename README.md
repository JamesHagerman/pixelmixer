AudioPixel 3.0
========

#### A Tool for Sound and Color ####

The aim of this project is to create an online adaptation of the AudioPixel 2.0 software.

The goal is for anyone to be able to view online projects using a simplified interface, while also having full rendering and editing capabilities to broadcast to lights and write and save new content.

Private repo for now, with the intention of going public at http://www.github.com/audiopixel


_*The below is preliminary and we are still seeking input_


### Main Features ###
	
	3D Editor
	GPU Accelerated Graphics Engine written in GLSL
	Audio Input (or any data input)
	Rendering views: 3D Point Cloud, 3D Directional Lights, 2D Quad pixel shader
	Broadcast lighting hardware protocols such as UDP, OSC, and DMX
	Preview channels in previz while still communicating main mix to hardware
	Upload any GLSL fragment shader
	Write your own with helper methods/values not normally in GLSL
	Hundreds of scripts built in
	Simulate physical sensor inputs using mouse / keyboard
	Open Source


### Differences between AP2 & AP3 ###

These are only architecture changes, not additional features, which are listed below separately.

AP2  | AP3
------------ | -------------
UI View: edit all channels | UI View: edit one at a time
Individual pod data | Pod position groups
Editor separate app | Editor in-play
 | Move clip content in Editor
 | Multiple position maps for content

### Phase II ###

HTML5 Video input

MIDI controller and OSC API input

Offline sync version. Sync online content to Native App

Modulation Inputs for all clip settings

Images / Animated Gifs / Text with all system fonts

Configure LED color output (Full RGB by default)
(Specify output to be white LEDs only as an example)


### Phase III ###

Write your own clips/shaders with inline text editor

Create user profile(s) and save/share presets/shaders/clips

Mapping selections for projections per channel

Timeline Recorder

Entire program logic driven by bar bones API