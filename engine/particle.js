



/* Spawns a certain particle effect. */
function ParticleSpawner(x, y) {
	this.floor = 0.07 + y;
	this.x = x;
	this.y = y;

	/* Holds all particles on screen. */
	this.particles = [];

	this.update = function() {
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			p.update();
		}

	}
	this.render = function() {

		for (var i = 0; i < this.particles.length; i++) {

			var p = this.particles[i];
			p.render();

		}
	}
	this.spawnParticle = function(xv, yv) {
		this.particles.push(new Particle(this.x, this.y, xv, yv, this));
	}


}

/* Instance of a particle. */
/* This can and should be overridden by the user. */
function Particle(x, y, xv, yv, spawner) {
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	this.gravity = true;
	this.time = 1;
	this.render = function() {

		engine.context.save();

		engine.context.globalAlpha = this.time;
		engine.drawImage(engine.images[0], 159, 44, 9, 8, this.x * engine.width, this.y * engine.height, 25, 25);
	
		engine.context.restore();
	}
	this.update = function() {
		this.time -= 0.02;
		if (this.time <= 0) {
			spawner.particles.splice(spawner.particles.indexOf(this), 1);
		}
		if (this.gravity) {
			this.yv += 0.0005;
		}
		if (this.y + this.yv >= spawner.floor) {
			this.y = spawner.floor;
			this.yv = 0;
			if (this.xv > 0) {
				this.xv -= 0.0002;
			} else {
				this.xv += 0.0002;
			}
			if (Math.abs(this.xv) <= 0.0005) {
				this.xv = 0;
			}
		}
		this.x += this.xv;
		this.y += this.yv;

	}
}