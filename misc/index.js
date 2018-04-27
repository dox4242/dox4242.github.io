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
      View.spells = this.get_tiers(this.save);
    }

    this.get_tiers = function(save) {
      var spells = [];
      var arcaneTrophies = 0;
      for (var i = 0; i < 20; i++) {
        if (save.trophies[123200 + i]) arcaneTrophies = i + 1;
      }
      for (var s of util.assoc.spells) {
        if (s.name == 'Tax Collection') continue;
        if (s.name == 'Hailstorm') continue;
        if (s.name == 'Heatwave') continue;
        if (s.name == 'Temporal Flux') continue;
        if (s.name == 'All Creation') continue;
        if (s.name == 'Maelstrom') continue;
        var spell = {name: s.name, id: s.id, unlocked: 0, owned: 0, time2tier: 0};
        var start = 400001 + s.id * 100;
        for (var i = start; i < start + 20; i++) {
          if (save.upgrades[i]) {
            spell.unlocked += 1;
            if (save.upgrades[i].u1) spell.owned += 1;
          }
        }
        // Time for tier: Formula: 43200 * ( (T - 0.5 * A)^2 - (T - 0.5 * A)) * 0.98^(R - (T - 0.5 * (A + 1)) - 42) seconds
        // where T is tier, A is amount of arcane brilliance trophies, R is reincarnation.
        spell.time2tier = Math.ceil((43200 * (Math.pow(((spell.owned + 2) - 0.5 * arcaneTrophies), 2) - ((spell.owned + 2) - 0.5 * arcaneTrophies)) * Math.pow(0.98, (save.reincarnation - ((spell.owned + 2) - 0.5 * (arcaneTrophies + 1)) - 42))) - save.spells[spell.id].active0 - save.spells[spell.id].active1);
        spells.push(spell);
      }
      return spells;
    }
  }

  window.Controller = new controller();
  
  $(function() {
    
    // Initalize Vue
    window.View = new Vue({
      el: '#app',
      data: {
        spells: []
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
