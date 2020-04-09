(function(window, document, $, undefined) {
  'use strict';

  var eggNames = {
    562: 'Wooden Egg', 555: 'Golden Egg', 559: 'Dark Egg', 561: 'Radiant Egg',
    557: 'Arcane Egg', 558: 'Crystal Egg', 556: 'Ancient Egg', 560: 'Giant Egg'
  };
  var eggIds = [562, 555, 559, 561, 557, 558, 556, 560];

  function advanceRng(state, remaining, number) {
    var available = [];
    for (var i of remaining) available.push(i);
    var rng = new PM_PRNG(state);
    var rand = rng.nextDoubleRange(0,100);
    if (rand < 0.1 && available.length > 0) {
      rng.strikeTier(available.length);
      available.splice(j, 1)
    }
    return [rng.state, remaining];
  }

  function nextEgg(rng, available, results, i, always_unique= false) {
    var rand = rng.nextDoubleRange(0,100);
    if (always_unique || (rand < 0.1 && available.length > 0)) {
      var j = rng.strikeTier(available.length);
      results[2].push([available.splice(j, 1), i + 1]);
    }
    else if (rand < 4) {
      results[1] += 1;
    }
    else {
      results[0] += 1;
    }
  }

  function eggForecast(state, number, remaining, always_unique= false) {
    var available = [];
    for (var i of remaining) available.push(i);
    var rng = new PM_PRNG(state);
    var results = [0, 0, []];
    for (var i = 0; i < number; i++) {
      nextEgg(rng, available, results, i, always_unique);
    }
    return results;
  }

  function eggForecastType(state, number, type, remaining) {
    var available = [];
    for (var i of remaining) available.push(i);
    var rng = new PM_PRNG(state);
    var results = [0, 0, []];
    i = 0;
    while ((type < 2?results[type]:results[type].length) < number) {
      nextEgg(rng, available, results, i);
      i += 1;
    }
    results.push(i + 1);
    return results;
  }

  function eggListRender(common, rare, unique) {
    if (common == null) return;
    var results = [];
    if (common > 0) results.push(common + ' Common Egg' + (common>1?'s':''));
    if (rare > 0) results.push(rare + ' Rare Egg' + (rare>1?'s':''));
    for (var i of unique) results.push(eggNames[i[0]] + ' (' + i[1] + ')');
    var suffix = '';
    if (unique.length) {
      suffix = ' (' + unique.length + ' Unique Egg' + (unique.length>1?'s':'') + ')';
    }
    return listJoin(results) + suffix;
  }

  function eggListRenderCount(common, rare, unique, count) {
    if (common == null) return;
    return eggListRender(common, rare, unique) + ' (' + count + ' required attempts)'
  }

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
      View.state = this.state = this.save.eggRngState;

      var now = new Date();
      var end = Date.UTC(2019, 3, 25, 18, 59, 0);
      var til_end = Math.floor((end - now) / 60000);
      var til_end_scry = Math.floor((end - now) / 60000 * 1.2);
      var next_stack = this.save.eggStackSize;

      this.unowned = [];
      for (var i of eggIds) {
        if (!this.save.upgrades[i]) this.unowned.push(i);
      }

      View.raw.remainder = eggForecast(this.state, til_end, this.unowned);
      View.remainder = til_end;
      View.raw.remainder_scry = eggForecast(this.state, til_end_scry, this.unowned);
      View.remainder_scry = til_end_scry;
      View.raw.full_stack = eggForecast(this.state, 720, this.unowned);
      View.raw.next_stack = eggForecast(this.state, next_stack, this.unowned);
      View.next_stack = next_stack;
      if (this.unowned.length) {
        View.raw.next_unique = eggForecast(this.state, 1, this.unowned, true)[2][0][0];
      }
      else {
        View.raw.next_unique = null;
      }
      var after_stack = advanceRng(this.state, this.unowned);
      console.log(after_stack);
      console.log(this.state, this.unowned);
      if (after_stack[1].length) {
        View.raw.next_unique_after = eggForecast(after_stack[0], 1, after_stack[1], true)[2][0][0];
      }
      else {
        View.raw.next_unique_after = null;
      }
      this.updatecustom();
      this.updaterare();
      this.updatecommon();
	  
	  //Snow
	  View.isComplete = this.save.trophies[353] != undefined
	  View.snowState = this.save.upgrades[1062].s;
	  View.snowballsFound = this.save.stats[110].stats + this.save.stats[110].statsReset + this.save.stats[110].statsRei;
	  View.raw.snowflakeChance = Math.pow(View.snowballsFound, 2) / 9000000000;
	  View.snowflakeChance = (View.raw.snowflakeChance * 100) + "%";
	  if (!View.isComplete)
	  {
		this.findFlake();
	  }
    }
    this.updatecustom = function() {
      if (!this.save) return;
      View.raw.custom = eggForecast(this.state, View.customnumber, this.unowned);
    }
    this.updaterare = function() {
      if (!this.save) return;
      View.raw.rare = eggForecastType(this.state, View.rarenumber, 1, this.unowned);
    }
    this.updatecommon = function() {
      if (!this.save) return;
      View.raw.common = eggForecastType(this.state, View.commonnumber, 0, this.unowned);
    }
	
	//Snow
	this.findFlake = function() {
      if (!this.save) return;
	  
	  // worst case
	  var rng = new PM_PRNG(View.snowState);
	  var found = false;
	  var snowballs = View.snowballsFound;
	  var count = 0;
	  
      while (!found)
	  {
		  count++;
		  var chance = Math.pow(snowballs + count, 2) / 9000000000;
	      var roll = rng.nextDouble();
		  if (roll <= chance)
		  {
			  found = true;
		  }
	  }
	  View.snowballsNeeded = snowballs + count;
	  
	  // best case
	  /*var rng = new PM_PRNG(View.snowState);
	  var found = false;
	  var snowballs = View.snowballsFound;
	  var count = 0;
	  
      while (!found)
	  {
		  count++;
		  var chance = Math.pow(snowballs + count + 719, 2) / 9000000000;
	      var roll = rng.nextDouble();
		  if (roll <= chance)
		  {
			  found = true;
		  }
	  }
	  View.snowballsNeeded2 = count;*/
    }
  }

  window.Controller = new controller();
  //window.View = new view();
  
  
  $(function() {
    
    // Initalize Vue
    window.View = new Vue({
      el: '#app',
      data: {
        flavor: {
          intro: 'you shouldn\'t be seeing these',
          title: 'something has gone',
          tagline: 'horribly wrong'
        },
        state: null,
        remainder: 0,
        remainder_scry: 0,
        next_stack: 0,
        raw: {
          remainder: [],
          remainder_scry: [],
          full_stack: [],
          next_stack: [],
          next_unique: null,
          next_unique_after: null,
          custom: [],
          rare: [],
          common: [],
          customnumber: 0,
          rarenumber: 0,
          commonnumber: 0,
		  //Snow
		  snowflakeChance: ""
        },
		//Snow
		isComplete: false,
		snowState: 0,
		snowballsFound: 0,
		snowflakeChance: 0,
		snowballsNeeded: 0,
		snowballsNeeded2: 0,
      },
      computed: {
        remainder_list: function() {
          return eggListRender.apply(null, this.raw.remainder);
        },
        remainder_scry_list: function() {
          return eggListRender.apply(null, this.raw.remainder_scry);
        },
        full_stack_list: function() {
          return eggListRender.apply(null, this.raw.full_stack);
        },
        next_stack_list: function() {
          return eggListRender.apply(null, this.raw.next_stack);
        },
        next_unique_list: function() {
          if (this.raw.next_unique == null) return;
          return eggNames[this.raw.next_unique];
        },
        next_unique_after_list: function() {
          if (this.raw.next_unique_after == null) return;
          return eggNames[this.raw.next_unique_after];
        },
        custom_list: function() {
          return eggListRender.apply(null, this.raw.custom);
        },
        rare_list: function() {
          if (this.rarenumber < 1) return;
          return eggListRenderCount.apply(null, this.raw.rare);
        },
        common_list: function() {
          if (this.commonnumber < 1) return;
          return eggListRenderCount.apply(null, this.raw.common);
        },
        customnumber: {
          get: function() {
            return this.raw.customnumber;
          },
          set: function(value) {
            var old = this.raw.customnumber;
            this.raw.customnumber = Math.min(value,1000000);
            if (old != this.raw.customnumber) Controller.updatecustom();
          }
        },
        rarenumber: {
          get: function() {
            return this.raw.rarenumber;
          },
          set: function(value) {
            var old = this.raw.rarenumber;
            this.raw.rarenumber = Math.min(value,100000);
            if (old != this.raw.rarenumber) Controller.updaterare();
          }
        },
        commonnumber: {
          get: function() {
            return this.raw.commonnumber;
          },
          set: function(value) {
            var old = this.raw.commonnumber;
            this.raw.commonnumber = Math.min(value,1000000);
            if (old != this.raw.commonnumber) Controller.updatecommon();
          }
        }
      }
    });

    // Initialize Flavor texts
    Flavor.pageLoaded(View);
    
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
