/*
 *
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */

var Pedaler = function(callback) {
	var self = this;
	window.addEventListener("deviceorientation", function(e){
		if (e.alpha) {
			self.setAngle(e.alpha, e.beta, e.gamma);
		}
	});
	this.angle = 0;
	this.callback = callback;

	setInterval(function() {
		$('#param').knob('value', self.angle * 100)
	}, 50);
}

Pedaler.prototype.setAngle = function(alpha, beta, gamma) {
	var angle = (beta + 20) / 40;
	if (angle < 0.0)
		angle = 0.0;
	else if (angle > 1.0)
		angle = 1.0;

	this.angle = angle;
	if (this.callback)
		this.callback(this.angle);
}

$(function() {
	var pedaler = new Pedaler(function(a) {
		setWahPos(a);
	});
})
