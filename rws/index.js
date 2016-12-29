
	(function(window, document, $, undefined) {
		'use strict';
		
		// A list of all building names in ID'ed order
		var buildingNames = util.save.building_names;
		var buildingIds = util.save.building_ids;
		var buildingsOwned = [];
		var buildingsHighlighted = [ [], [] ];
		var breathNames = ['Red', 'Green', 'Blue', 'White', 'Black']
		var lightningRNG = null;
		var miracleRNG = null;
		var breathRNG = null;
		
		// Refresh the entire forecast
		var forecast = function(saveStr) {
			buildingsOwned = [];
			buildingsHighlighted = [ [], [] ];
			lightningRNG = null;
			miracleRNG = null;
			breathRNG = null;
			$('#lightningMessage, #lightningForecast, #miracleMessage, #miracleForecast, #breathMessage, #breathForecast').html('');
			
			var save = SaveHandler.Decode(saveStr);
			window.decoded = save;
			console.log('Decoded save:', save);
			
			// Only buildings owned by the player can be hit
			for (var i of buildingIds)
				if (save.buildings[i].q > 0)
					buildingsOwned.push(i);
			$('#buildings').html('<b>Buildings owned</b> <small><i>(Click a building to toggle its highlighting)</i></small><br>');
			for (var tier in buildingsOwned) {
				var hit = buildingNames[buildingsOwned[tier]];
				var span = $('<span />').html(hit).addClass('tier' + tier).data('tier', tier);
				if (tier != 0) $('#buildings').append(', ');
				$('#buildings').append(span);
			}
			
			forecastLightning(save, buildingsOwned);
			forecastMiracle(save, buildingsOwned);
			forecastBreath(save);
		};
		
		// Add the Lightning forecast
		var forecastLightning = function(save, buildingsOwned) {
			var lightningMessage = '';
			var lightningForecast = '';
			
			// Check if the save actually has Lightning Strikes to forecast
			if (save.alignment != 3) {
				lightningMessage = 'You are not Neutral aligned.';
				lightningForecast = 'No Lightning.';
			} else if (!(save.faction == 6 || save.mercSpell1 == 13 || save.mercSpell2 == 13)) {
				lightningMessage = 'You don\'t have Lightning Strike.';
				lightningForecast = 'No Lightning.';
			} else if (buildingsOwned.length == 0) {
				lightningMessage = 'You have no Buildings.';
				lightningForecast = 'No Lightning.';
			} else if (buildingsOwned.length == 1) {
				lightningMessage = 'You only have ' + buildingNames[buildingsOwned[0]] + '.';
				lightningForecast = 'The only Building you have, as often as you want.';
			}
			
			// Early exit
			if (lightningMessage != '' || lightningForecast != '') {
				$('#lightningMessage').html('<b>Lightning Strike</b><br>').append(lightningMessage);
				$('#lightningForecast').html('<b>Forecast</b><br>').append(lightningForecast);
				return;
			}
			
			// Create the RNG and get the initial forecast
			lightningRNG = new PM_PRNG(save.spells[13].s);
			lightningRNG.hasLightningRod = util.save.upgrade_owned(save, 143018);
			$('#lightningMessage').html('<b>Lightning Strike</b><br>Your RNG state is: ' + lightningRNG.state + '.');
			$('#lightningForecast').html('<b>Forecast</b> <small><i>(Click a building to toggle its highlighting)</i></small><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('Give me a longer Forecast').on('click', forecastLightningMore));
			
			forecastLightningMore();
		};
		
		// Add the Miracle forecast
		var forecastMiracle = function(save, buildingsOwned) {
			var miracleMessage = '';
			var miracleForecast = '';
			
			// (TEMP) Find the Miracle research upgrade
			var miracle = save.upgrades[143719];
			
			// Check if the save actually has Miracles to forecast
			if (!miracle || !miracle.u1) {
				miracleMessage = 'You can\'t get any Miracles yet.';
				miracleForecast = 'No Miracles.';
			} else if (buildingsOwned.length == 0) {
				miracleMessage = 'You have no Buildings.';
				miracleForecast = 'No Miracles.';
			} else if (buildingsOwned.length == 1) {
				miracleMessage = 'You only have ' + buildingNames[buildingsOwned[0]] + '.';
				miracleForecast = 'The only Building you have, as long as you want.';
			}
			
			// Early exit
			if (miracleMessage != '' || miracleForecast != '') {
				$('#miracleMessage').html('<b>Miracle</b><br>').append(miracleMessage);
				$('#miracleForecast').html('<b>Forecast</b><br>').append(miracleForecast);
				return;
			}
			
			// Create the RNG and get the initial forecast
			miracleRNG = new PM_PRNG(miracle.s);
			$('#miracleMessage').html('<b>Miracle</b><br>Your RNG state is: ' + miracleRNG.state + '.');
			$('#miracleForecast').html('<b>Forecast</b> <small><i>(Click a building to toggle its highlighting)</i></small><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('Give me a longer Forecast').on('click', forecastMiracleMore));
			
			forecastMiracleMore();
		};
		
		// Add the Breath forecast
		var forecastBreath = function(save) {
			var breathMessage = '';
			var breathForecast = '';
			
			// Check if the save actually has Dragons Breath to forecast
			if (!(save.prestigeFaction == 12 || save.mercSpell1 == 21 || save.mercSpell2 == 21)) {
				breathMessage = 'You don\'t have Dragon\'s Breath.';
				breathForecast = 'No Dragon\'s Breath.';
			}
			
			// Early exit
			if (breathMessage != '' || breathForecast != '') {
				$('#breathMessage').html('<b>Dragon\'s Breath</b><br>').append(breathMessage);
				$('#breathForecast').html('<b>Forecast</b><br>').append(breathForecast);
				return;
			}
			
			// Create the RNG and get the initial forecast
			breathRNG = new PM_PRNG(save.spells[21].s);
			$('#breathMessage').html('<b>Dragon\'s Breath</b><br>Your RNG state is: ' + breathRNG.state + '.');
			$('#breathForecast').html('<b>Forecast</b><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('Give me a longer Forecast').on('click', forecastBreathMore));
			
			forecastBreathMore();
		};
		
		// Add Lightning forecast hits
		var forecastLightningMore = function(e) {
			if (buildingsOwned.length > 0 && lightningRNG)
				for (var i = 0; i < 10; i++) {
					var len = buildingsOwned.length;
					if (lightningRNG.hasLightningRod && buildingsOwned[-1] == buildingIds[-1]) {
						len -= 1;
					}
					var tier = lightningRNG.strikeTier(len);
					var hit = buildingNames[buildingsOwned[tier]];
					var li = $('<li />').html(hit).addClass('tier' + tier).data('tier', tier);
					$('#lightningForecast > ol').append(li);
				}
			
			// Update building highlighting
			for (var tier in buildingsHighlighted[0])
				if (buildingsHighlighted[0][tier])
					$('#lightningForecast > ol > li.tier' + tier).addClass('highlight');
				else
					$('#lightningForecast > ol > li.tier' + tier).removeClass('highlight');
		};
		
		// Add Miracle forecast hits
		var forecastMiracleMore = function(e) {
			if (buildingsOwned.length > 0 && miracleRNG)
				for (var i = 0; i < 10; i++) {
					var tier = miracleRNG.strikeTier(buildingsOwned.length);
					var hit = buildingNames[buildingsOwned[tier]];
					var li = $('<li />').html(hit).addClass('tier' + tier).data('tier', tier);
					$('#miracleForecast > ol').append(li);
				}
			
			// Update building highlighting
			for (var tier in buildingsHighlighted[1])
				if (buildingsHighlighted[1][tier])
					$('#miracleForecast > ol > li.tier' + tier).addClass('highlight');
				else
					$('#miracleForecast > ol > li.tier' + tier).removeClass('highlight');
		};
		
		// Add Breath forecast hits
		var forecastBreathMore = function(e) {
			if (breathRNG)
				for (var i = 0; i < 10; i++) {
					var len = breathNames.length;
					var tier = breathRNG.strikeTier(len);
					var hit = breathNames[tier];
					var li = $('<li />').html(hit).addClass('tier' + tier).data('tier', tier);
					$('#breathForecast > ol').append(li);
				}
		};
		
		$(function() {
			
			// Initialize Bootstrap popovers
			$('[data-toggle="popover"]').popover();

			// Bind Save decoding and parsing
			$('#saveInput').on('paste', function(e) {
				// Empty the input right before the paste comes through
				$(this).val('');
				
				// The timeout ensures we can grab the save right after the paste comes through, without messing with the clipboard
				var self = this;
				setTimeout(function() {
					var saveStr = $(self).val();
					if (saveStr)
						forecast(saveStr);
				}, 1);
			}).trigger('focus');
			
			// Bind Re-Enter button to refresh the forecast using the current save string
			$('#doReEnter').on('click', function(e) {
				$('#saveInput').trigger('focus');
				var saveStr = $('#saveInput').val();
				if (saveStr)
					forecast(saveStr);
			});
			
			// Bind Copy button to copy the current save string
			$('#doSaveCopy').on('click', function(e) {
				$('#saveInput').trigger('focus');
				var save = $('#saveInput').val();
				window.prompt('Copy to clipboard: Press Ctrl+C, then Enter', save);
			});
			
			// Bind Clear button to clear the save input field
			$('#doSaveClear').on('click', function(e) {
				$('#saveInput').val('').trigger('focus');
			});
			
			// Automatically lengthen the forecast when scrolling to the bottom of the screen
			$(document).on('mousewheel DOMMouseScroll', function(e) {
				var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));
				if (delta == -1 && ($(window).scrollTop() + $(window).height() >= $(document).height())) {
					forecastLightningMore();
					forecastMiracleMore();
					forecastBreathMore();
				}
			});
			
			// Click to toggle a building highlight
			$('#lightningForecast, #miracleForecast').on('click', 'ol > li', function(e) {
				var type = $(this).parent().parent().parent().index();
				var tier = $(this).data('tier');
				if (buildingsHighlighted[type][tier]) {
					buildingsHighlighted[type][tier] = false;
					$(this).parent().children('.tier' + tier).removeClass('highlight');
				} else {
					buildingsHighlighted[type][tier] = true;
					$(this).parent().children('.tier' + tier).addClass('highlight');
				}
			// Hover to temporarily highlight the building
			}).on('mouseenter', 'ol > li', function(e) {
				$(this).parent().children('.tier' + $(this).data('tier')).addClass('hover');
			}).on('mouseleave', 'ol > li', function(e) {
				$(this).parent().children('.tier' + $(this).data('tier')).removeClass('hover');
			});
			
			$('#buildings').on('click', 'span', function(e) {
				var tier = $(this).data('tier');
				if ($(this).hasClass('highlight')) {
					$(this).removeClass('highlight');
					buildingsHighlighted[0][tier] = buildingsHighlighted[1][tier] = false;
					$('#lightningForecast > ol, #miracleForecast > ol').children('.tier' + tier).removeClass('highlight');
				} else {
					$(this).addClass('highlight');
					buildingsHighlighted[0][tier] = buildingsHighlighted[1][tier] = true;
					$('#lightningForecast > ol, #miracleForecast > ol').children('.tier' + tier).addClass('highlight');
				}
			}).on('mouseenter', 'span', function(e) {
				$(this).addClass('hover');
				$('#lightningForecast > ol, #miracleForecast > ol').children('.tier' + $(this).data('tier')).addClass('hover');
			}).on('mouseleave', 'span', function(e) {
				$(this).removeClass('hover');
				$('#lightningForecast > ol, #miracleForecast > ol').children('.tier' + $(this).data('tier')).removeClass('hover');
			});
			
		});
		
	} (window, document, jQuery));
