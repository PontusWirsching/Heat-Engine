

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
						global.numJumps = 0;
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