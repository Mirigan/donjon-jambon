$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var life = 3;
	var current_section = 'start';
	
	buttons.click( function() {
		gotoSection($(this).attr('go'));
	});

	$('#submitName').on('click', function() {
		var name = $('#myName').val();
		if (name == '') {
			$('#myName').focus();
			return;
		}
		console.log('il y a un nom !');
		$('span.myName').text(name);
		gotoSection('intro');
	});

	$(document).on('click', '#replay', function() {
		setLife(3);
		startGame();
	});

	function processActions()
	{
		var section = $('.section#' + current_section);
		section.find('action').each(function() {
			var action = $(this).attr('name');
			if (action == 'reset') {
				setLife(3);
			} else if (action == 'hit') {
				loseLife(1);
			} else if (action == 'doubleHit') {
				loseLife(2);
			} 
		});
	}
	
	function gotoSection(key) {
		var section = $('.section#' + key);
		$('.section:visible').fadeOut(200, function() {
			current_section = key;
			processActions();
			if (getLife() <= 0) {
				endGame();
			}
			section.fadeIn(200);
		});

		if ($('.section:visible').length == 0) {
			section.fadeIn(200);
		}
		
	}
	
	function getLife() {
		return life;
	}
	
	function setLife(v) {
		life = v;
		updateLife();
	}
	
	function loseLife(v) {
		life -= v;
		updateLife();
	}

	function updateLife() {
		$('#status .life .value').text(life);
	}
	
	function startGame() {
		$('.section').hide();
		setLife(3);
		gotoSection('start');
	}
	
	function endGame() {
		var section = $('.section#' + current_section);
		section.find('button').remove();
		section.append($('.section#death').html());
	}

	startGame();
	
});
