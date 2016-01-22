
	(function(window, document, $, undefined) {
		'use strict';
		
		// A list of all building names in ID'ed order
		var buildingNames = [
			'Farm', 'Inn', 'Blacksmith', 
			'Warrior Barrack', 'Knights Joust', 'Wizard Tower', 'Cathedral', 'Citadel', 'Royal Castle', 'Heaven\'s Gate', 
			'Slave Pen', 'Orcish Arena', 'Witch Conclave', 'Dark Temple', 'Necropolis', 'Evil Fortress', 'Hell Portal', 
			'Deep Mine', 'Stone Pillar', 'Alchemist Lab', 'Monastery', 'Labyrinth', 'Iron Stronghold', 'Ancient Pyramid', 
			'Hall of Legends'
		];
		
		var buildingsOwned = [];
		var lightningRNG = null;
		var miracleRNG = null;
		
		// Refresh the entire forecast
		var forecast = function(saveStr) {
			buildingsOwned = [];
			lightningRNG = null;
			miracleRNG = null;
			$('#lightningMessage, #lightningForecast, #miracleMessage, #miracleForecast').html('');
			
			var save = SaveHandler.Decode(saveStr);
			console.log('Decoded save:', save);
			
			// Only buildings owned by the player can be hit
			for (var i in save.buildings)
				if (save.buildings[i].q > 0)
					buildingsOwned.push(i);
			$('#buildings').html('<b>Buildings owned</b><br>' + buildingsOwned.map(function(val, key) { return buildingNames[val]; }).join(', '));
			
			forecastLightning(save, buildingsOwned);
			forecastMiracle(save, buildingsOwned);
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
			lightningRNG = new PM_PRNG(save.spells[11].s);
			$('#lightningMessage').html('<b>Lightning Strike</b><br>Your RNG state is: ' + lightningRNG.state + '.');
			$('#lightningForecast').html('<b>Forecast</b><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('Give me a longer Forecast').on('click', forecastLightningMore));
			
			forecastLightningMore();
		};
		
		// Add the Miracle forecast
		var forecastMiracle = function(save, buildingsOwned) {
			var miracleMessage = '';
			var miracleForecast = '';
			
			// (TEMP) Find the Miracle research upgrade
			var miracle;
			for (var i in save.upgrades)
				if (save.upgrades[i].id == 143719)
					miracle = save.upgrades[i];
			
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
			$('#miracleForecast').html('<b>Forecast</b><br><ol></ol>')
				.append($('<button class="btn btn-link" type="button" />').html('Give me a longer Forecast').on('click', forecastMiracleMore));
			
			forecastMiracleMore();
		};
		
		// Add Lightning forecast hits
		var forecastLightningMore = function(e) {
			if (buildingsOwned.length > 0 && lightningRNG)
				for (var i = 0; i < 10; i++) {
					var tier = lightningRNG.strikeTier(buildingsOwned.length);
					var hit = buildingNames[buildingsOwned[tier]];
					$('#lightningForecast').children().last().prev().append($('<li />').html(hit));
				}
		};
		
		// Add Miracle forecast hits
		var forecastMiracleMore = function(e) {
			if (buildingsOwned.length > 0 && miracleRNG)
				for (var i = 0; i < 10; i++) {
					var tier = miracleRNG.strikeTier(buildingsOwned.length);
					var hit = buildingNames[buildingsOwned[tier]];
					$('#miracleForecast').children().last().prev().append($('<li />').html(hit));
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
				}
			});
			
			// 
			//$('')
			
		});
		
	} (window, document, jQuery));
