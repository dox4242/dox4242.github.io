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
      for (var s of util.assoc.spells) {
        if (s.name == 'Tax Collection') continue;
        if (s.name == 'Hailstorm') continue;
        if (s.name == 'Heatwave') continue;
        var spell = {name: s.name, id: s.id, unlocked: 0, owned: 0};
        var start = 400001 + s.id * 100;
        for (var i = start; i < start + 4; i++) {
          if (save.upgrades[i]) {
            spell.unlocked += 1;
            if (save.upgrades[i].u1) spell.owned += 1;
          }
        }
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
        gemsActive: 0,
        gemsBefore: 0,
        gemsAfter: 0,
        cycleTime: 0,
        runTime: 0
      },
      computed: {
        gemsPrev: function() {
          return this.gemsActive + this.gemsBefore;
        },
        gemsCurr: function() {
          return this.gemsActive + this.gemsAfter;
        },
        gemRate: function() {
          return (this.gemsAfter - this.gemsBefore) / this.cycleTime * 3600;
        },
        gemRateFull: function() {
          return (this.gemsCurr - this.gemsActive) / this.runTime;
        },
        recommend: function() {
          return this.gemRateFull > this.gemRate ? 'Yep' : 'Nope';
        },
        gemsActiveLn: function() {
          return Math.log(this.gemsActive);
        },
        gemsPrevLn: function() {
          return Math.log(this.gemsPrev);
        },
        gemsCurrLn: function() {
          return Math.log(this.gemsCurr);
        },
        percentCycle: function() {
          return (this.gemsCurrLn - this.gemsPrevLn) * 100;
        },
        percentRate: function() {
          return this.percentCycle / this.cycleTime * 3600;
        },
        percentRateFull: function() {
          return (this.gemsCurrLn - this.gemsActiveLn)/ this.runTime * 100;
        },
        recommendPercent: function() {
          return this.percentRateFull > this.percentRate ? 'Yep' : 'Nope';
        }
      }
    });
    Vue.config.debug = true;
    
    // Initialize Bootstrap popovers
    $('[data-toggle="popover"]').popover();
  });
  
} (window, document, jQuery));
