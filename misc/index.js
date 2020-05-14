(function(window, document, $, undefined) {
  'use strict';

  function controller() {
    this.loadSave = function(dat) {
      try {
        this.save = SaveHandler.Decode(dat);
        console.log('Decoded save:', this.save);
        if (this.save.options[0]) {
          this.save.options = this.save.options[0];
        }
        if (this.save.hasOwnProperty('buyButton')) {
          this.save.options.buyButton = this.save.buyButton;
        }
      } catch(err) {
        console.log(err);
        return;
      }
      this.get_tiers(this.save);
    }

    this.get_tiers = function(save) {
      var spells = [];
	  var unlockedTiers = 0;
      var maxTier = 0;
      
      //for (var i = 0; i < 20; i++) {
      //  if (save.trophies[123200 + i]) arcaneTrophies = i + 1;
      //}
      
      maxTier = save.reincarnation >= 100 ? 7 : 6;
      
      for (var s of util.assoc.spells) {
        if (s.id == 18 || s.id == 19 || s.id == 20 || s.id == 22 || s.id == 23 || s.id == 24 || s.id == 25 || s.id == 26 || s.id == 27 || s.id == 28 || s.id == 29 || s.id == 30 || s.id == 31 || s.id == 32) continue;
        var spell = {name: s.name, id: s.id, enabled: false, unlocked: 0, time2tier: 0, text: ""};
        var start = 400001 + s.id * 100;
        for (var i = start; i < start + 20; i++) {
          if (save.upgrades[i]) {
            spell.unlocked += 1;
			unlockedTiers += 1;
          }
		  if (util.save.hasSpell(save, spell.id))
		  {
			  spell.enabled = true;
		  }
        }
		spells.push(spell);
	  }
	  
	  for (var spell of spells) {
        
        if (spell.unlocked + 1 == maxTier)
        {
            spell.text = "Spell is already at max tier";
        }
        else
        {
            // Time for tier: Formula: 57600 * (0.4 + 0.1 * T) * ((T ^ 2 + 1) / (0.1 * U + 1)) * (0.97 ^ (R - 35))
			// Where T = tier, U = number of unlocked tiers, R = reincarnation
			spell.time2tier = Math.ceil((57600 * (0.4 + 0.1 * (spell.unlocked + 2)) * ((Math.pow(spell.unlocked + 2, 2) + 1) / (0.1 * unlockedTiers + 1)) * (Math.pow(0.97, save.reincarnation - 35))) - save.spells[spell.id].active0 - save.spells[spell.id].active1);
            
            if (spell.time2tier < 0)
            {
                spell.text = "Next tier will be unlocked when spell is visible";
            }
            else
            {          
                spell.text = "Next tier in " + util.render.time(spell.time2tier);
            }
        }
        
      }
	  View.unlockedTiers = unlockedTiers;
      View.allSpells = spells;
	  
	  // Timeline
	  var timeLineText = [];
	  var timeLineTimeSpent = 0;
	  var timeLineUnlockedTiers = unlockedTiers;
	  
	  var enabledSpells = [];
	  var currentTiers = 0;
	  var maxTiers = 0;
	  
	  for (var spell of spells)
	  {
		  if (spell.enabled)
		  {
			  //clone the spell
			  enabledSpells.push(JSON.parse(JSON.stringify(spell)));
			  currentTiers += spell.unlocked + 1;
		  }
	  }
	  maxTiers = maxTier * enabledSpells.length;
	  
	  while (currentTiers < maxTiers)
	  {
		  var spell2tier;
		  var minTierTime = Infinity;
		  for (var spell of enabledSpells)
		  {
			  if (spell.unlocked + 1 == maxTier)
			  {
				  continue;
			  }
			  
			  var time2tier = Math.ceil((57600 * (0.4 + 0.1 * (spell.unlocked + 2)) * ((Math.pow(spell.unlocked + 2, 2) + 1) / (0.1 * timeLineUnlockedTiers + 1)) * (Math.pow(0.97, save.reincarnation - 35))) - save.spells[spell.id].active0 - save.spells[spell.id].active1 - timeLineTimeSpent);
			  
			  if (minTierTime > time2tier)
			  {
				  minTierTime = time2tier;
				  spell2tier = spell;
			  }
		  }
		  
		  if (minTierTime < 0)
		  {
			  minTierTime = 0;
		  }
		  
		  timeLineTimeSpent += minTierTime;
		  timeLineText.push(util.render.time(timeLineTimeSpent) + ": " + spell2tier.name + " Will tier to tier " + (spell2tier.unlocked + 2));
		  timeLineUnlockedTiers += 1;
		  currentTiers += 1;
		  spell2tier.unlocked += 1;
	  }
	  View.timeLine = timeLineText;
    }
  }

  window.Controller = new controller();
  
  $(function() {
    
    // Initalize Vue
    window.View = new Vue({
      el: '#app',
      data: {
        allSpells: [],
		unlockedTiers: -1,
		timeLine: ""
      }
    });
    Vue.config.debug = true;
    
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
          Controller.loadSave(saveStr);
      }, 1);
    }).trigger('focus');
    
    // Bind Re-Enter button to refresh the forecast using the current save string
    $('#doReEnter').on('click', function(e) {
      $('#saveInput').trigger('focus');
      var saveStr = $('#saveInput').val();
      if (saveStr)
        Controller.loadSave(saveStr);
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
  });
  
} (window, document, jQuery));
