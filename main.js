var global = {};

$(document).ready(function() {

	engine.loadScene("main");
	engine.setFullscreen(true);
	engine.loadDescription("desc");

	engine.loadImage("mossgolem", "assets/MossGolem_Walk.png");
	engine.loadImage("grass", "assets/weed.png");

	engine.init = function() {
		engine.addSprite(new Sprite("grass", 0, 0, 256, 35, engine.getImage("grass")));

		engine.addAnimation(new Animation('mossgolem_walk', engine.getImage("mossgolem"), 201, 201, 16, true));





		var xml = new XMLHttpRequest();

		xml.onreadystatechange = function() {
	   		if (xml.readyState == 4 && xml.status == 200) {
	    		
	   			var xmlDoc = xml.responseXML;
	   			var test = xmlDoc.getElementsByTagName("map")[0].attributes[1].value;

	   			console.log(test);

	    	}
   		}
		xml.open("GET", "assets/level.tmx", true);
		xml.send();













		engine.loop();
	}
	
	window.onresize = function() {
		resize();
	}

	// Create world
	var world = new World();

	// Create player
	var box = new CollisionBox("globe", 0,  50, 25, 60);
	box.applyForce(new Vector(0, 0));
	engine.camera.position.set(box.position.getX(), box.position.getY());
	world.addObject(box);

	// Create the floors
	for (var i = 0; i < 10; i++) {
		world.addObject(new CollisionBox("floor", i * 256, 100, 256, 35));
	}


	var playerFlip = false;
	var j = false;
	global.scale = 512;
	var t = false;
	var sx = 0;
	var sy = 0;


	engine.render = function() {

		// Sets the scale
		engine.setScale(engine.height / global.scale);




		// Sets the background
		engine.context.fillStyle = "black";
		engine.context.fillRect(0, 0, engine.width, engine.height);
	



		// Camera movement:
		var distance = engine.math.getDistance(engine.camera.position.getX(), engine.camera.position.getY(), box.position.getX() * engine.scale, box.position.getY() * engine.scale);
		var angle = engine.math.getAngle(engine.camera.position.getX(), engine.camera.position.getY(), box.position.getX() * engine.scale, box.position.getY() * engine.scale);
		var smoothing = 16;
		engine.camera.position.x += Math.cos(angle * Math.PI / 180) * distance / smoothing;
		engine.camera.position.y += Math.sin(angle * Math.PI / 180) * distance / smoothing;




		// Update physics
		world.update();




		// Apply gravity on player
		box.applyForce(new Vector(0, -0.8));




		// Check for jumping
		if (engine.keys[32] && j) {
			j = false;
			box.velocity.setY(0);
			box.applyForce(new Vector(0, 10));
		} else if (!engine.keys[32] && !j) {
			j = true;
		}





		// Movement
		var speed = 2;
		if (engine.keys[65]) {
			box.velocity.x = -speed;
			playerFlip = false;
			engine.getAnimation("mossgolem_walk").start();
		} else if (engine.keys[68]) {
			box.velocity.x = speed;
			playerFlip = true;
			engine.getAnimation("mossgolem_walk").start();
		} else {
			box.velocity.setX(0);
			engine.getAnimation("mossgolem_walk").stop();
		}





		// Draw player
		engine.getAnimation('mossgolem_walk').draw(box.position.getX(), box.position.getY(), 201, 201, playerFlip);



		engine.graphics.setColor("red");


		// Draw the world
		for (var i = 0; i < world.objects.length; i++) {
			if (world.objects[i].name == "floor") {
				engine.drawSprite("grass", world.objects[i].position.getX(), world.objects[i].position.getY(), world.objects[i].size.getWidth(), world.objects[i].size.getHeight());
				engine.graphics.drawRect(world.objects[i].position.getX(), world.objects[i].position.getY(), world.objects[i].size.getWidth(), world.objects[i].size.getHeight());
			}
		}

		engine.graphics.drawRect(box.position.getX(), box.position.getY(), box.size.getWidth(), box.size.getHeight());


	}


	engine.start();

});


