AudioPixel 3.0
========

#### A Tool for Sound and Color ####

The aim of this project is to create an online version of the AudioPixel 2 software.

The goal is for anyone to be able to load and view projects in the browser using a simplified interface, while also granting advanced users full editing capabilities,  the ability to write and save new visual content, and the functionality of broadcasting to lighting and other physical hardware.


This is a private repo for now, with the intention of going public in the future with a release at http://www.github.com/audiopixel




### Main Features ###
	
* 3D Editor - Import, load, edit, and construct node arrangements
* GPU Accelerated graphics engine written in GLSL
* Upload any GLSL fragment shader
* Rendering views: 3D Point Cloud, 3D Directional Lights, 2D Quad Pixel Shaders
* Easy system for handling audio (or any data) input for content manipulation
* Broadcast lighting hardware protocols: UDP, OSC, and DMX
* Realtime Shader Editor
* Enhance your own shaders with helper methods/values not normally in GLSL
* HTML5 video input
* Preview channels in previz mode while still communicating main mix to hardware
* MIDI controller support and MIDI mapping
* Simulate physical sensor inputs using mouse / keyboard
* Multiple position / index maps that are used to generate content 
* Sync  online content to offline native OS app
* Timeline recorder with playback
* Save user profile(s) and share projects / presets / shaders / clips
* Open Source



## AudioPixel Workflow Philosophy ##

A platform that functions like Ableton channels containing shaders / Processing / Flash / video clips, structured in Photoshop blending layers.
Built by DJs, using the general mixing paradigm:
Play content in one channel, while previewing future content to be mixed in with an adjacent channel. 
A channel can contain its own effects, as well as the mixer having master post effect channel(s) that affect a whole scene/project.


## Possible Uses Include: ##

* Mixer for loading pixel shaders into 3D space
* Control light shows via laptop or mobile device
* Runs on dedicated server / gaming machine, triggered by OSC API
* Lighting conceptualize / architectural tool
* Animate particles / sprites in any OpenGL or Three.js project
* Anyone with a browser can view saved projects 
* View large-scale and interactive light art - Bay Bridge, Jen Lewin's Pools as possible examples


---

## Basic Roadmap ##

### Phase I ###

* GLSL Engine (*completed*)
* Editor & realtime previz as one (*completed, needs UI layer*)
* Clip harness / load any GLSL Shader (*completed*)
* UI with fixed channel set (dat.gui) (*completed*)
* GLSL fragment shader importer
* Broadcast UDP

### Phase II ###

* Write clips/shaders with inline text editor
* Dynamic UI for any amount of channels (React components)
* Create and save multiple index/position maps
* Modulation inputs
* HTML5 Video input
* Broadcast OSC, DMX
* App Layer
* Receive MIDI events and OSC API input
* Sync from online content to offline mode
* Images / Animated GIFs / Text with all system fonts

### Phase III ###

* Save user profile(s) and share presets/shaders/clips
* Timeline Recorder
* Entire program logic driven by bare bones OSC API

---



## AP3 Shader vs Vanilla GLSL Shader ##
The AudioPixel platform will extend the standard GLSL fragment shader capabilities so that additional functionality can be achieved.

| Feature | GLSL | AP3 |
|----------------- | -------------------- | --------------------- |
| GPU accelerated | x | x |
| X,Y coordinates | x | x |
| Attributes and uniforms | x | x |
| Index value | | x |
| Z coordinate | | x |
| All node coordinates | | x |
| Multiple defined coordinates | | x |
| Previous node color value | | x |
| All previous color values | | x |
| Random values | | x |
| Accompanying init & update methods | | x |
| Resized & blended in 3D space | | x |
| Hardware port / light unit info | | x |


## How to Contribute ##

Jump right in. If you have access to this repo I would feel honored to have you as a contributor on this project.

The next few weeks are more core construction, but after that it's going to be quite easy to add in managers, shaders/clips, presets, ...

For now feel free to push to master branch for any small changes.
Large changes or additions are best as branches.


