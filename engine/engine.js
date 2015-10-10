
/*
 *	Main engine class.
 *  Used from now on (2015-04-01) in all games that I (Pontus) will create.
 *  :)
 */


//TODO:

//Image loading and displaying
//Resizing of frame
//Mouse events
//Keyboard events
//Database interface
//Animations


var engine = {};


engine.mx = 0;
engine.my = 0;
engine.mb = false;

engine.keys = []; // Keys pressed.

engine.scale = 1;

engine.setScale = function(s) {
	engine.scale = s;
}

engine.getScale = function() {
	return engine.scale;
}

var MAX_WIDTH = 1920; // Max screen width
var MAX_HEIGHT = 1080; // Max screen height

engine.width = $(window).width(); // Current width.
engine.height = $(window).height(); // Current height.

var showDesc = true;

engine.scene = null;

engine.setFullscreen = function() {

}


/* Loads the canvas used for rendering. */
engine.loadScene = function (canvasID) {
	console.log("Loaded scene: " + canvasID);
	engine.scene = document.getElementById(canvasID);
	engine.scene.style.position = "absolute";
	window.onresize();
	// Rectangle for mouse offset.
	var rect = engine.scene.getBoundingClientRect();

	// Mouse move event.
	engine.scene.addEventListener('mousemove', function(evt) {
	    var mousePos = getMousePos(engine.scene, evt);
	    engine.mx = mousePos.x;
	    engine.my = mousePos.y;
	}, false);

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
	  		x: evt.clientX - rect.left,
	  		y: evt.clientY - rect.top
		};
	}

	engine.scene.onmousedown = function(e){
	    engine.mb = true;
	}
	engine.scene.onmouseup = function(e){
	    engine.mb = false;
	}

	engine.scene.onmouseleave = function(e) {
		engine.mb = false;
	}

}

/* Loads the description viewed under the canvas. */
engine.loadDescription = function (descID) {
	engine.desc = document.getElementById("desc");
	if (engine.desc != null) {
		engine.desc.style.position = "relative";
		engine.desc.style.textAlign = "center";
	}
}

engine.drawImage = function(image, sx, sy, sw, sh, x, y, w, h) {
	engine.context.drawImage(image, sx, sy, sw, sh, (x - w / 2) * engine.getScale(), (y - h / 2) * engine.getScale(), w * engine.getScale(), h * engine.getScale());
}

window.onresize = function() {
	resize();
}

$(document).keydown(function(e) {
	engine.keys[e.keyCode ? e.keyCode : e.whitch] = true;
});

$(document).keyup(function(e) {
	delete engine.keys[e.keyCode ? e.keyCode : e.whitch];			
});

/* Call this to update all size variables to the new ones. This function is 
   called by default from the window.onresize function.*/
function resize() {
	engine.width = $(window).width();
	engine.height = $(window).height();

	engine.scene.style.top = 0;

	if (engine.width > MAX_WIDTH) {
		engine.width = MAX_WIDTH;
		engine.scene.style.left = $(window).width() / 2 - MAX_WIDTH / 2;
	} else {
		engine.scene.style.left = 0;
	}

	if (engine.height > MAX_HEIGHT) {
		engine.height = MAX_HEIGHT;
		engine.scene.style.top = $(window).height() / 2 - MAX_HEIGHT / 1.6;
   		if (engine.desc != null)
   			engine.desc.style.top = $(window).height() / 2 + MAX_HEIGHT / 2.4;
		showDesc = true;
	} else {
		showDesc = false;
	}

	if (showDesc) {
   		if (engine.desc != null)
   			engine.desc.style.display = "block";
   	} else {
   		if (engine.desc != null)
   			engine.desc.style.display = "none";
   	}

   	engine.scene.width = engine.width;
   	engine.scene.height = engine.height;

   	engine.context = engine.scene.getContext("2d");
	engine.context.ImageSmoothingEnabled = engine.context.imageSmoothingEnabled = engine.context.mozImageSmoothingEnabled = engine.context.oImageSmoothingEnabled = false;
}

/* Gets called when all images are loaded. */
/* This function can and should be overrided. */
engine.init = function() {
	console.log("Init");

	engine.loop();

}

/* Starts loading the images and then starts the init function. */
/* Be sure to call the loadImage function for all images before this as */
/* this function will use those images and load them, images loaded after */
/* this will not be loaded! */
engine.start = function() {
	initImages();
	checkImages();
	resize();
}

engine.loop = function() {
	requestAnimFrame(function() {
		engine.loop();
	});
	engine.updateAnimations();
	engine.render();
}

engine.render = function() {
	
}



window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		}
})();





