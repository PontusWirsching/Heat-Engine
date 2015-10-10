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