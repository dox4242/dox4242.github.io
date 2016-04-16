	function controller() {
		this.hiddenTrophies = ['t:ArcheologyFacelessTrophy', 't:ArcheologyTitanTrophy', 't:ArcheologyDruidTrophy', 't:ArcheologyUnderworldTrophy', 't:DwarvenInvitationTrophy', 't:DrowInvitationTrophy', 't:ArcheologyDwarfTrophy', 't:ArcheologyDrowTrophy', 't:MercenaryOathTrophy', 't:ResearchDemonTrophy', 't:ResearchUndeadTrophy', 't:ResearchFairyTrophy', 't:ResearchGoblinTrophy', 't:ResearchAngelTrophy', 't:ResearchElvenTrophy'];

		this.goodBuildings = ['b:RoyalCastle', 'b:KnightsJoust', 'b:Citadel', 'b:WarriorBarracks', 'b:HeavensGate', 'b:Cathedral', 'b:WizardTower']

		this.hasUpgrade = function(id) {
			return this.save.upgrade.hasOwnProperty(id);
		}
		this.hasResearch = function(id) {
			return this.hasUpgrade(id) && this.save.upgrade[id].u === 2;
		}

		this.buildingCount = function(good) {
			var sum = 0;
			if (good) {
				for (var i = 0; i < this.goodBuildings.length; i++) {
					sum += this.save.build[[this.goodBuildings[i]]].q;    
				}
			} else {
				for (var k in this.save.build) {
					if (!this.save.build.hasOwnProperty(k)) continue;
					sum += this.save.build[k].q;
				}
			}
			return sum;
		}

		this.trophyCount = function() {
			var count = 0;
			for (var k in this.save.trophy) {
				if (this.hiddenTrophies.indexOf(k) === -1) count += 1;
			}
			return count;
		}

		this.getMaxMana = function() {
			var maxMana = 1000;

			if (this.hasUpgrade('ur:DruidHeritage')) {
				maxMana += Math.floor(this.buildingCount(false) / 20);
			}
			if (this.hasUpgrade('uf:KindHearts') || this.hasUpgrade('uf:FairyHelpers')) {
				maxMana += Math.floor(this.buildingCount(true) / 12);      
			}
			if (this.hasUpgrade('ur:EarthlyBond')) {
				maxMana += 1.5 * this.save.build['b:StonePillars'].q;
			}
			// Vacuumancy
			if (this.hasResearch('urs:Spellcraft04')) {
				maxMana += Math.floor(25 * this.save.stats[1] / 60 / 60);
			}
			// Rampage
			if (this.hasResearch('urs:Warfare06')) {
				maxMana += Math.floor(1.25 * this.trophyCount());
			}
			if (this.hasUpgrade('u:Premeditation')) {
				maxMana += 200;
			}
			if (this.hasUpgrade('u:Reincarnation') && this.save.rei >= 12) {
				maxMana += 25 * this.save.rei;
			}

			return maxMana;
		}

		this.getCont = function() {
			return this.save.contv / 100 * this.maxMana;
		}

		this.setCont = function(level) {
			this.save.contv = 100 * (Number(level) / this.maxMana);
			View.updateOutput();
		}

		this.loadSave = function(dat) {
			try {
				this.save = decode(dat);
			} catch(err) {
				console.log(err);
				Flavor.saveInvalid();
				return
			}
			this.maxMana = this.getMaxMana();
			View.maxMana(this.maxMana);
			Flavor.saveLoaded();
			View.setThreshold(Math.floor(this.getCont()));
			View.updateOutput();
		}

		this.pasteHandler = function(e) {
			var dat;
			// IE
			if (window.clipboardData && window.clipboardData.getData) {
				dat = window.clipboardData.getData('text');
			}
			// chrome/firefox/safari
			else {
				dat = e.originalEvent.clipboardData.getData('text/plain');
			}
			this.loadSave(dat);
		}

		this.clickHandler = function(e) {
			this.setCont($('#mana-field').prop('value'));
			$('#save-out').select();
		}
	}

	function view() {
		this.saveStatus = function(status) {
			if (status === 1) {
				$('#manabox').prop('class', 'panel panel-success');
				$('#mana-field').prop('disabled', false);
			} else if (status === -1) {
				$('#manabox').prop('class', 'panel panel-danger');
				$('#mana-field').prop('disabled', true);
			} else if (status === 0) {
				$('#manabox').prop('class', 'panel panel-default');
				$('#mana-field').prop('disabled', true);
			}
		}
		this.maxMana = function(max) {
			$('#mana-field').prop('max', max)
		}
		this.setStatus = function(message) {
			$('#status-message').html(message);
		}
		this.setIntro = function(message) {
			$('#intro-message').html(message);
		}
		this.setThreshold = function(level) {
			$('#mana-field').prop('value', level);
		}
		this.updateOutput = function() {
			$('#save-out').prop('value', encode(Controller.save));
		}
	}

	Controller = new controller();
	View = new view();

	$(function initialize() {
		$('.tooltip-fixed').popover();
		Flavor.pageLoaded();
		$('#save-field').on('paste', function(e) {Controller.pasteHandler(e)});
		$('#save-out').on('click', function(e) {Controller.clickHandler(e)});
	});
