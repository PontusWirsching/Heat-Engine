
/*
 *	Main engine class.
 *  Used from now on (2015-04-01) in all games that I (Pontus) will create.
 *  :)
 */


//TODO:

//Database interface


function Point(x, y) {
	this.x = x;
	this.y = y;

	this.set = function(x, y) { this.setX(x); this.setY(y); };
	this.setX = function(x) { this.x = x; };
	this.setY = function(y) { this.y = y; };
	this.getX = function() { return this.x; };
	this.getY = function() { return this.y; };
	this.add = function(p) { this.x += p.x; this.y += p.y; };
	this.subtract = function(p) { this.x -= p.x; this.y -= p.y; };
	this.multiply = function(p) { this.x *= p.x; this.y *= p.y; };
	this.divide = function(p) { this.x /= p.x; this.y /= p.y; };
}

function Dimension(width, height) {
	this.width = width;
	this.height = height;

	this.set = function(width, height) { this.setWidth(width); this.setHeight(height); };
	this.setWidth = function(width) { this.width = width; };
	this.setHeight = function(height) { this.height = height; };
	this.getWidth = function() { return this.width; };
	this.getHeight = function() { return this.height; };
	this.add = function(d) { this.width += d.width; this.height += d.height; };
	this.subtract = function(d) { this.width -= d.width; this.height -= d.height; };
	this.scale = function(scale) { this.width *= scale; this.height *= scale; };
	
}

function Vector(x, y) {
	this.x = x;
	this.y = y;

	this.set = function(x, y) { this.setX(x); this.setY(y); };
	this.setX = function(x) { this.x = x; };
	this.setY = function(y) { this.y = y; };
	this.getX = function() { return this.x; };
	this.getY = function() { return this.y; };
	this.add = function(p) { this.x += p.x; this.y += p.y; };
	this.subtract = function(p) { this.x -= p.x; this.y -= p.y; };
	this.multiply = function(p) { this.x *= p.x; this.y *= p.y; };
	this.divide = function(p) { this.x /= p.x; this.y /= p.y; };
	this.getAngle = function() { return engine.math.getAngle(0, 0, this.getX(), this.getY()); };
	this.getDistance = function() { return Math.sqrt( (0 - this.getX()) * (0 - this.getX()) + (0 - this.getY()) * (0 - this.getY())); };
	this.rotate = function(degrees) { var d = this.getDistance(); var a = this.getAngle() + degrees; this.x = Math.cos(a * Math.PI / 180) * d; this.y = Math.sin(a * Math.PI / 180) * d; };
	this.flip = function() { this.rotate(180.0); };
	this.scale = function(scale) { this.multiply(new Vector(scale, scale)); };
}


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

var MAX_WIDTH = 800; // Max screen width
var MAX_HEIGHT = 600; // Max screen height

engine.width = $(window).width(); // Current width.
engine.height = $(window).height(); // Current height.

var showDesc = true;

engine.scene = null;

engine.fullscreen = false;

engine.setFullscreen = function(f) {
	engine.fullscreen = f;
	if (f) {
		MAX_WIDTH = $(window).width();
		MAX_HEIGHT = $(window).height();
	}
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


engine.camera = {};

engine.camera.position = new Point(0, 0);


engine.drawImage = function(image, sx, sy, sw, sh, x, y, w, h) {


	//if (x - engine.camera.position.getX() - w / 2 < -engine.width / 2) return;

	
	engine.context.drawImage(image, sx, sy, sw, sh, (x - w / 2) * engine.getScale() + engine.width / 2 - engine.camera.position.getX(), (y - h / 2) * engine.getScale() + engine.height / 2 - engine.camera.position.getY(), w * engine.getScale(), h * engine.getScale());
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

	if (engine.fullscreen) {
		MAX_WIDTH = $(window).width();
		MAX_HEIGHT = $(window).height();
	}

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
	engine.context.lineWidth = engine.getScale();
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


/* End of engine.js */
/* Start of math.js */



engine.math = {};

/**
 * Returns an angle between the two points defined by the coordinates.
 * The angle is returned in degrees.
 */
engine.math.getAngle = function(x1, y1, x2, y2) {
	var angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	if (angleDeg < 0) angleDeg += 360;
	if (angleDeg > 360) angleDeg -= 360;
	return angleDeg;
}

engine.math.getDistance = function(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

/* End of math.js */
/* Start of graphics.js */




/* A sprite object to hold variables. */
function Sprite(name, x, y, width, height, image) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = image;
}

/* Draws a sprite object. */
engine.drawSprite = function(sprite, x, y, w, h) {
	var s;
	if (sprite instanceof Sprite) {
		s = sprite;
	} else {
		s = engine.getSprite(sprite);
	}
	engine.drawImage(s.image.image, s.x, s.y, s.width, s.height, x, y, w, h);
}

/* Array of sprites. */
engine.sprites = [];

/* Adds a sprite to public list. */
engine.addSprite = function(sprite) {
	engine.sprites.push(sprite);
}

/* Returns a sprite instance if found. */
engine.getSprite = function(name) {
	for (var i = 0; i < engine.sprites.length; i++) {
		if (engine.sprites[i] != null && engine.sprites[i].name == name)
			return engine.sprites[i];
	}
	return null;
}









/********** animation ***********/








/* Array of animations. */
engine.animations = [];

/* An animation instance. */
function Animation(name, img, spriteWidth, spriteHeight, fps, loop, numf) {
	this.name = name;
	this.image = img.image;
	this.spriteWidth = spriteWidth;
	this.spriteHeight = spriteHeight;
	this.fps = fps;
	this.play = false;
	this.loop = loop;
	this.currentFrame = 0;
	this.framesWide = this.image.width / this.spriteWidth;
	this.framesHigh = this.image.height / this.spriteHeight;
	if (numf != undefined && numf != null && numf != 0) {
		this.numFrames = numf;
	} else {
		this.numFrames = this.framesWide * this.framesHigh;
	}
	this.timer = 0;

	this.start = function() {
		this.play = true;
	}

	this.stop = function() {
		this.play = false;
	}

	this.update = function() {
		if (this.play) this.timer++;
		if (this.timer >= 60 / this.fps) {
			this.currentFrame++;
			if (this.currentFrame >= this.numFrames) {
				this.currentFrame = 0;
			}
			this.timer = 0;
		}
	}

	this.draw = function(x, y, w, h, flip) {
		var xx = this.spriteWidth * Math.round(this.currentFrame % this.framesWide);
		var yy = this.spriteHeight * Math.floor(this.currentFrame / this.framesHigh);
		if (!flip) engine.drawImage(this.image, xx, yy, this.spriteWidth, this.spriteHeight, x, y, w, h);
		else {
			engine.context.save();
			engine.context.translate(engine.width, 0);
        	engine.context.scale(-1, 1);
        	engine.context.translate(-x * engine.getScale() + engine.camera.position.getX() * 2, y * engine.getScale());
			engine.drawImage(this.image, xx, yy, this.spriteWidth, this.spriteHeight, 0, 0, w, h);
			engine.context.restore();
		}
	}

}

/* Adds the animation. */
engine.addAnimation = function(animation) {
	engine.animations.push(animation);
}

engine.getAnimation = function(name) {
	for (var i = 0; i < engine.animations.length; i++) {
		if (engine.animations[i] != null && engine.animations[i].name == name){
			return engine.animations[i];
		}
	}
	return null;
}

engine.updateAnimations = function() {
	for (var i = 0; i < engine.animations.length; i++) {
		if (i >= engine.animations.length) break;
		var animation = engine.animations[i];
		if (animation == null) continue;
		animation.update();
	}
}








/********** Image ***********/









/* This object basicly holds an image and its id. */
function ImageObject(name, image) {
	this.name = name;
	this.image = image;
}

engine.images = [];

/* Array that contains all paths for images that should be loaded. */
engine.imagePaths = [];

/* Adds an image path to the array of images to load. */
engine.loadImage = function(name, imagePath) {
	engine.imagePaths.push([name, imagePath]);
}

/* Returns an image by its name. */
engine.getImage = function(imageName) {
	for (var i = 0; i < engine.images.length; i++) {
		if (engine.images[i].name == imageName) {
			return engine.images[i];
		}
	}
	return null;
}

var doneImages = 0;
var requiredImages = 0;

/* Loads images. */
function initImages() {
	var paths = engine.imagePaths;
	requiredImages = paths.length;
	for (i in paths) {
		var img = new Image();
		img.src = paths[i][1];
		engine.images[i] = new ImageObject(paths[i][0], img);
		engine.images[i].image.onload = function() {
			doneImages++;
		}
	}
}



/* Checks if images are done loading.
   If so then call the init function. */
function checkImages() {
	if (doneImages >= requiredImages) {
		engine.init();
	} else {
		setTimeout(function() {
			checkImages();
		}, 1);
	}
}




/********** Camera ***********/




/**
 The Camera will create a virtual viewport for the game to
 adapt to.

 The x and y is the position for the camera. These variables
 makes sure that the camera can move.

*/
function Camera(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.ws = 1;
	this.hs = 1;

	this.getViewportWidth = function() {
		return this.width;
	}

	this.getViewportHeight = function() {
		return this.height;
	}

	this.resize = function() {
		this.ws = engine.width / this.width;
		this.hs = engine.height / this.height;
		console.log(this.ws + ", " + this.hs + ", " + (engine.width / this.width));
	}

	engine.drawImage = function(image, sx, sy, sw, sh, x, y, w, h) {
		h *= this.hs
		engine.context.drawImage(image, sx, sy, sw, sh, x - w / 2, y - h / 2, w * 1, h);
	}

}



/************** Graphics ****************/




engine.graphics = {};

engine.graphics.setColor = function(color) {
	engine.context.strokeStyle = color;
	engine.context.fillStyle = color;
}

engine.graphics.drawRect = function(x, y, width, height) {
	engine.context.strokeRect((x - width / 2) * engine.getScale() + engine.width / 2 - engine.camera.position.getX(), (y - height / 2) * engine.getScale() + engine.height / 2 - engine.camera.position.getY(), width * engine.getScale(), height * engine.getScale());
}

engine.graphics.fillRect = function(x, y, width, height) {
	engine.context.fillRect((x - width / 2) * engine.getScale() + engine.width / 2 - engine.camera.position.getX(), (y - height / 2) * engine.getScale() + engine.height / 2 - engine.camera.position.getY(), width * engine.getScale(), height * engine.getScale());
}


/* End of graphics.js */
/* Start of physics.js */




function CollisionBox(name, x, y, width, height) {
	this.position = new Point(x, y);
	this.size = new Dimension(width, height);
	this.name = name;
	this.velocity = new Vector(0, 0);

	this.intersects = function(box2) {
		if (this.position.getY() + this.size.getHeight() / 2 >= box2.position.getY() - box2.size.getHeight() / 2) {
			if (this.position.getX() - this.size.getWidth() / 2 <= box2.position.getX() + box2.size.getWidth() / 2) {	
				if (this.position.getY() - this.size.getHeight() / 2 <= box2.position.getY() + box2.size.getHeight() / 2) {
					if (this.position.getX() + this.size.getWidth() / 2 >= box2.position.getX() - box2.size.getWidth() / 2) {	
						return true;
					}
				}
			}
		}
		return false;
	};

	this.applyForce = function(v) {
		this.velocity.add(v);
	}

	this.update = function() {
		this.position.add(new Point(this.velocity.getX(), this.velocity.getY()));
	}

}

function World() {

	// An array of the collision objects.
	this.objects = [];

	this.addObject = function(object) {
		this.objects.push(object);
	}

	this.getObject = function(name) {
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i] != null && this.objects[i].name == name)
				return this.objects[i];
		}
		return null;
	}

	this.getObjectByIndex = function(index) {
		return this.objects[index];
	}

	this.update = function() {

		for (var i = 0; i < this.objects.length; i++) {
			if (i >= this.objects.length) break;
			if (this.objects[i] == null) continue;
			var o = this.objects[i];


			var didCollideY = false;
			for (var step = 0; step < Math.abs(o.velocity.getY()); step++) {

				var willBe = new CollisionBox("tmp", o.position.getX(), o.position.getY() + Math.abs(o.velocity.getY()) / -o.velocity.getY(), o.size.getWidth(), o.size.getHeight());

				for (var j = 0; j < this.objects.length; j++) {
					if (j >= this.objects.length) break;
					if (this.objects[j] == null || this.objects[j] == o) continue;
					var o2 = this.objects[j];

					//Insert collision detection here!

					if (willBe.intersects(o2)) {
						didCollideY = true;
						o.velocity.setY(0);
						break;
					}

				}

				if (!didCollideY) 
					o.position.y += Math.abs(o.velocity.getY()) / -o.velocity.getY();
			}

			var didCollideX = false;
			for (var step = 0; step < Math.abs(o.velocity.getX()); step++) {

				var willBe = new CollisionBox("tmp", o.position.getX() - Math.abs(o.velocity.getX()) / -o.velocity.getX(), o.position.getY(), o.size.getWidth(), o.size.getHeight());

				for (var j = 0; j < this.objects.length; j++) {
					if (j >= this.objects.length) break;
					if (this.objects[j] == null || this.objects[j] == o) continue;
					var o2 = this.objects[j];

					//Insert collision detection here!

					if (willBe.intersects(o2)) {
						didCollideX = true;
						o.velocity.setX(0);
						break;
					}

				}

				if (!didCollideX) 
					o.position.x -= Math.abs(o.velocity.getX()) / -o.velocity.getX();
			}
		}

	}

}

/* End of physics.js */