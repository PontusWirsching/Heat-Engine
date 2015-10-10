$(document).ready(function() {

	console.log("MAIN!");

	engine.loadScene("main");
	engine.setFullscreen(false);
	engine.loadDescription("desc");

	engine.loadImage("mossgolem", "assets/MossGolem_Walk.png");
	engine.loadImage("globe", "assets/spritesheet.png");
	engine.loadImage("grass", "assets/weed.png");

	engine.init = function() {

		engine.addSprite(new Sprite("grass", 0, 0, 256, 35, engine.getImage("grass")));


		engine.addAnimation(new Animation('mossgolem_walk', engine.getImage("mossgolem"), 201, 201, 32, true));

		engine.addAnimation(new Animation('globe_spin', engine.getImage("globe"), 60, 60, 120, true, 60));

		engine.loop();
	}
	
	window.onresize = function() {
		resize();
	}

	var world = new World();

	var box = new CollisionBox("globe", 0, 0, 25, 60);
	box.applyForce(new Vector(0, 1));
	world.addObject(box);

	var floor = new CollisionBox("floor", 0, 0, 256, 35);
	world.addObject(floor);


	var j = false;

	engine.render = function() {
		engine.setScale(engine.height / 128);

		floor.position.set(engine.width / engine.getScale() / 2, engine.height / engine.getScale());

		c = false;

		world.update();

		//box.velocity.set(0, 0);
		
		var angle = engine.math.getAngle(box.position.getX(), box.position.getY(), engine.mx / engine.getScale(), engine.my / engine.getScale());
		var distance = engine.math.getDistance(box.position.getX(), box.position.getY(), engine.mx / engine.getScale(), engine.my / engine.getScale());

		var xx = Math.cos(angle * Math.PI / 180) * distance / 4;
		var yy = -Math.sin(angle * Math.PI / 180) * distance / 4;

		//box.applyForce(new Vector(xx, yy));


		box.applyForce(new Vector(0, -1.8));

		if (engine.keys[32] && j) {
			j = false;
			box.velocity.setY(0);
			box.applyForce(new Vector(0, 15));
		} else if (!engine.keys[32] && !j) {
			j = true;
		}

		var speed = 4;

		if (engine.keys[65]) {
			box.velocity.x = -speed;
			engine.getAnimation('mossgolem_walk').setFlip(false);
			engine.getAnimation("mossgolem_walk").start();
		} else if (engine.keys[68]) {
			box.velocity.x = speed;
			engine.getAnimation("mossgolem_walk").setFlip(true);
			engine.getAnimation("mossgolem_walk").start();
		} else {
			box.velocity.setX(0);
			engine.getAnimation("mossgolem_walk").stop();
		}



		engine.context.fillStyle = "black";
		engine.context.fillRect(0, 0, engine.width, engine.height);


		




		engine.getAnimation('mossgolem_walk').draw(box.position.getX(), box.position.getY(), 201, 201);

		engine.drawSprite("grass", floor.position.getX(), floor.position.getY(), floor.size.getWidth(), floor.size.getHeight());

		engine.graphics.setColor("red");
		//engine.graphics.strokeRect(box.position.getX(), box.position.getY(), box.size.getWidth(), box.size.getHeight());
		//engine.graphics.strokeRect(floor.position.getX(), floor.position.getY(), floor.size.getWidth(), floor.size.getHeight());

	}


	engine.start();

});


