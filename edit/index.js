(function(window, document, $, undefined) {
  'use strict';

  var dropdownFilter = {
    faction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 11],
    prestigeFaction: [-1, 9, 10],
    bFaction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  };

  for (var i in dropdownFilter) {
    var obj = {};
    for (var j of dropdownFilter[i]) {
      obj[j] = true;
    }
    dropdownFilter[i] = obj;
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
      View.save = this.save;
    }
  }

  window.Controller = new controller();

  $(function() {

    Vue.filter('filterDef', function(value, attr) {
      if (value == undefined) return value;
      var filtered = [];
      for (i of value) {
        if (i[attr] != undefined) filtered.push(i);
      }
      return filtered;
    });

    Vue.component('widget-fivestat-header', {
      template: '<tr>'
      + '<th><span class="statheader">Stat</span></th>'
      + '<th><span class="statheader">This Abdication</span></th>'
      + '<th><span class="statheader">Prior Abdications</span></th>'
      + '<th><span class="statheader">This Reincarnation</span></th>'
      + '<th><span class="statheader">Prior Reincarnations</span></th>'
      + '<th><span class="statheader">All Reincarnations</span></th>'
      + '</tr>'
    });

    Vue.component('widget-onestat-header', {
      template: '<tr>'
      + '<th><span class="statheader">Stat</span></th>'
      + '<th><span class="statheader">Value</span></th>'
      + '</tr>'
    });

    Vue.component('widget-factioncoin-header', {
      template: '<tr>'
      + '<th><span class="statheader">Faction</span></th>'
      + '<th><span class="statheader">Faction Coins</span></th>'
      + '<th><span class="statheader">Royal Exchanges</span></th>'
      + '</tr>'
    });
    
    Vue.component('widget-factioncoin', {
      props: ['fc', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input v-model="fc.factionCoins" number></input></td>'
      + '<td><input v-model="fc.royalExchanges" number></input></td>'
      + '</tr>'
    });
    
    Vue.component('widget-building', {
      props: ['building', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input v-model="building.q" number></input></td>'
      + '<td><span class="derivedstat">{{building.t - building.q}}</span></td>'
      + '<td><input v-model="building.t" number></input></td>'
      + '<td><input v-model="building.r" number></input></td>'
      + '<td><span class="derivedstat">{{building.r + building.t}}</span></td>'
      + '</tr>'
    });
    
    Vue.component('widget-building-max', {
      props: ['building', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><span class="derivedstat">{{building.q}}</span></td>'
      + '<td><span class="nullstat">&mdash;</span></td>'
      + '<td><input v-model="building.m" number></input></td>'
      + '<td><input v-model="building.e" number></input></td>'
      + '<td><span class="derivedstat">{{total}}</span></td>'
      + '</tr>',
      computed: {
        total: function() {
          return Math.max(this.building.m, this.building.e);
        }
      },
    });
    
    Vue.component('widget-spell', {
      props: ['spell', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input v-model="spell.c" number></input></td>'
      + '<td><input v-model="spell.r" number></input></td>'
      + '<td><span class="derivedstat">{{spell.c + spell.r}}</span></td>'
      + '<td><input v-model="spell.e" number></input></td>'
      + '<td><span class="derivedstat">{{spell.c + spell.r + spell.e}}</span></td>'
      + '</tr>'
    });
    
    Vue.component('widget-spell-time', {
      props: ['spell', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input v-model="spell.active0" number></input></td>'
      + '<td><input v-model="spell.active1" number></input></td>'
      + '<td><span class="derivedstat">{{spell.active0 + spell.active1}}</span></td>'
      + '<td><input v-model="spell.active2" number></input></td>'
      + '<td><span class="derivedstat">{{spell.active0 + spell.active1 + spell.active2}}</span></td>'
      + '</tr>'
    });
    
    Vue.component('widget-stat', {
      props: {
        stat: Object,
        name: String,
        hideAb: {
          type: Boolean,
          default: function() { return false; }
        },
        hidePrevAbs: {
          type: Boolean,
          default: function() { return false; }
        },
        hideRei: {
          type: Boolean,
          default: function() { return false; }
        },
        hidePrevReis: {
          type: Boolean,
          default: function() { return false; }
        },
        hideTotal: {
          type: Boolean,
          default: function() { return false; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td v-show="!hideAb"><input v-model="stat.stats" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevAbs"><input v-model="stat.statsReset" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideRei"><span class="derivedstat">{{stat.stats + stat.statsReset}}</span></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevReis"><input v-model="stat.statsRei" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideTotal"><span class="derivedstat">{{stat.stats + stat.statsReset + stat.statsRei}}</span></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '</tr>'
    });
    
    Vue.component('widget-stat-max', {
      props: {
        stat: Object,
        name: String,
        hideAb: {
          type: Boolean,
          default: function() { return false; }
        },
        hidePrevAbs: {
          type: Boolean,
          default: function() { return false; }
        },
        hideRei: {
          type: Boolean,
          default: function() { return false; }
        },
        hidePrevReis: {
          type: Boolean,
          default: function() { return false; }
        },
        hideTotal: {
          type: Boolean,
          default: function() { return false; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td v-show="!hideAb"><input v-model="stat.stats" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevAbs"><input v-model="stat.statsReset" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideRei"><span class="derivedstat">{{rei}}</span></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevReis"><input v-model="stat.statsRei" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideTotal"><span class="derivedstat">{{total}}</span></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '</tr>',
      computed: {
        rei: function() {
          return Math.max(this.stat.stats, this.stat.statsReset);
        },
        total: function() {
          return Math.max(this.stat.stats, this.stat.statsReset, this.stat.statsRei);
        }
      },
    });
    
    Vue.component('widget-field', {
      props: {
        'field': {},
        'name': String,
        'canEdit': {
          type: Boolean,
          default: function() { return false; }
        },
        'colspan': {
          type: Number,
          default: function() { return 1; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td v-show="canEdit" :colspan="colspan"><input v-model="field" number></input></td>'
      + '<td v-else :colspan="colspan"><span class="rawstat">{{field}}</span></td>'
      + '</tr>'
    });
    
    Vue.component('widget-field-dropdown', {
      props: {
        'field': {},
        'name': String,
        'type': String,
        'filter': String
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><select v-model="field" number>'
      + '<option :disabled="option.disabled" :value="option.id" v-for="option in options">{{option.name}}</option>'
      + '</select></td>'
      + '</tr>',
      computed: {
        options: function() {
          var opts = [];
          for (var i of util.assoc[this.type]) {
            if (this.filter && !dropdownFilter[this.filter][i.id]) continue;
            opts.push({
              id: i.id,
              name: i.name,
              //disabled: this.filter && !dropdownFilter[this.filter][i.id]
            });
          }
          return opts;
        }
      }
    });
    
    /*Vue.component('widget-field-alignid', {
      props: {
        'field': {},
        'name': String
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><select v-model="field" number>'
      + '<option value="0">Unaligned</option>'
      + '<option value="1">Good</option>'
      + '<option value="2">Evil</option>'
      + '<option value="3">Neutral</option>'
      + '</select></td>'
      + '</tr>'
    });
    
    Vue.component('widget-field-factionid', {
      props: {
        'field': {},
        'name': String,
        hideBase: {
          type: Boolean,
          default: function() { return false; }
        },
        hideNeutral: {
          type: Boolean,
          default: function() { return false; }
        },
        hidePrestige: {
          type: Boolean,
          default: function() { return false; }
        },
        hideMerc: {
          type: Boolean,
          default: function() { return false; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><select v-model="field" number>'
      + '<option value="-1">Unaffiliated</option>'
      + '<option value="0" :disabled="hideBase">Fairy</option>'
      + '<option value="1" :disabled="hideBase">Elf</option>'
      + '<option value="2" :disabled="hideBase">Angel</option>'
      + '<option value="3" :disabled="hideBase">Goblin</option>'
      + '<option value="4" :disabled="hideBase">Undead</option>'
      + '<option value="5" :disabled="hideBase">Demon</option>'
      + '<option value="6" :disabled="hideNeutral">Titan</option>'
      + '<option value="7" :disabled="hideNeutral">Druid</option>'
      + '<option value="8" :disabled="hideNeutral">Faceless</option>'
      + '<option value="9" :disabled="hidePrestige">Dwarf</option>'
      + '<option value="10" :disabled="hidePrestige">Drow</option>'
      + '<option value="11" :disabled="hideMerc">Mercenary</option>'
      + '</select></td>'
      + '</tr>'
    });*/

    Vue.config.debug = true;

    // Initalize Vue
    window.View = new Vue({
      el: '#app',
      data: {
        flavor: {
          intro: 'you shouldn\'t be seeing these',
          title: 'something has gone',
          tagline: 'horribly wrong'
        },
        outputsave: null,
        save: util.save.blankSave(),
        spells: util.assoc.spells,
        factions: util.assoc.faction
      },
      methods: {
        genSave: function(event) {
          this.outputsave = SaveHandler.Encode(this.save);
        }
      }
    });
    Vue.config.debug = true;

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
