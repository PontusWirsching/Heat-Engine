


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
	this.flip = false;
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

	this.setFlip = function(f) {
		this.flip = f;
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

	this.draw = function(x, y, w, h) {
		var xx = this.spriteWidth * Math.round(this.currentFrame % this.framesWide);
		var yy = this.spriteHeight * Math.floor(this.currentFrame / this.framesHigh);
		if (!this.flip) engine.drawImage(this.image, xx, yy, this.spriteWidth, this.spriteHeight, x, y, w, h);
		else {
			engine.context.save();
        	engine.context.scale(-1, 1);
        	engine.context.translate(-x * engine.getScale(), y * engine.getScale());
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

engine.graphics.strokeRect = function(x, y, width, height) {
	engine.context.strokeRect((x - width / 2) * engine.getScale(), (y - height / 2) * engine.getScale(), width * engine.getScale(), height * engine.getScale());
}