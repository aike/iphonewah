$(function() {
	$('body')
	.css({
		backgroundImage: 'url("images/floor.jpg")',
		position: 'fixed'
	});

	$('<img>').panel({
		id: 'pedal',
		image: 'images/wahpedal.png',
		left: 70,
		top: 110
	})
	.css({ zIndex: -1 })
	.appendTo('#draw');

	$('<img>').knob({
		id: 'param',
		image: 'images/wahparam.png',
		left: 230,
		top: 10,
		width: 120,
		height: 120
	})
	.appendTo('#draw');

});
