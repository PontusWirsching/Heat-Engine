

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