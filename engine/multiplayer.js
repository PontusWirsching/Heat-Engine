

var multiplayer = {};

multiplayer.settings = {
	address: "ws://213.89.81.204:1331"
	protocol: "heatengine"
};

multiplayer.init = function() {

	multiplayer.socket = {};

	if (window.WebSocket) {}
		multiplayer.socket = new WebSocket(multiplayer.settings.address, multiplayer.settings.protocol);
	} else {
		alert("[Heat Engine] Your browser does not support WebSocket!");
	}

	socket.onmessage = function(message) {

	}

	socket.onerror = function(error) {
		console.log("[CLIENT] [ERROR] > " + error.data);
	}

	socket.onopen = function() {
		console.log("[CLIENT] Connected to socket server!");
	}
}