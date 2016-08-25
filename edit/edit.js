(function(window, document, $, undefined) {
  'use strict';

  var dropdownFilter = {
    faction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 11],
    prestigeFaction: [-1, 9, 10],
    bFaction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	spell: [18, 3, 12, 6, 14, 9, 1, 8, 15, 11, 7, 13, 10, 2, 5, 4, 17],
	goodmercspells: [6, 14, 9, 5, 8, 11, 4, 10, 2],
	evilmercspells: [6, 14, 9, 5, 8, 15, 11, 4, 10, 2],
	neutralmercspells: [6, 14, 9, 5, 8, 11, 4, 13, 10, 2]
  };
  
  var trophyIDs = {
	autocastSeries: [8, 9, 10, 11, 12, 13, 159, 200],
    castSpells: [104000, 104001, 104002, 104003, 104004, 104005, 104006, 104007, 104008, 104009, 104010, 104011, 104012, 104013],
    clickTreasure: [104100, 104101, 104102, 104103, 104104, 104105, 104106, 104107, 104108],
    findFactionCoins: [104500, 104501, 104502, 104503, 104504, 104505, 104506, 104507, 104508, 104509, 104510, 104511, 104512, 104513, 104514, 104515],
    gainCoins: [104600, 104601, 104602, 104603, 104604, 104605, 104606, 104607, 104608, 104609, 104610, 104611, 104612, 104613, 104614, 104615, 104616, 104617, 104618, 104619],
    gainCoinClicking: [104700, 104701, 104702, 104703, 104704, 104705, 104706, 104707, 104708, 104709, 104710, 104711, 104712, 104713, 104714, 104715, 104716, 104717, 104718],
    gainGems: [104900, 104901, 104902, 104903, 104904, 104905, 104906, 104907, 104908, 104909, 104910, 104911, 104912, 104913, 104914, 104915, 104916, 104917, 104918, 104919, 104920, 104921, 104922],
    gainReincarnate: [105000, 105001, 105002, 105003, 105004, 105005, 105006, 105007, 105008, 105009, 105010, 105011, 105012],
    haveAssistants: [105100, 105101, 105102, 105103, 105104, 105105, 105106, 105107, 105108, 105109],
    purchaseUpgrade: [105500, 105501, 105502, 105503, 105504, 105505, 105506, 105507, 105508, 105509, 105510],
    spendMana: [111200, 111201, 111202, 111203, 111204, 111205, 111206, 111207, 111208, 111209],
	gainRubies: [116200, 116201, 116202, 116203],
	giftCollector: [116700, 116701, 116702, 116703],
	snowpile: [116800, 116801, 116802, 116803],
	artifacts: [117000, 117001, 117002, 117003, 117004],
	feelTheLove: [117600, 117601, 117602],
	eggHunter: [119500, 119501, 119502, 119503],
	eggCollection: [119600, 119601, 119602, 119603],
	buildFarmsTrophies: [102300, 102301, 102302, 102303, 102304, 102305, 102306, 102307, 102308, 102309, 102310, 102311, 102312, 102313, 102314, 102315, 102316, 102317, 102318],
	buildInnsTrophies: [102700, 102701, 102702, 102703, 102704, 102705, 102706, 102707, 102708, 102709, 102710, 102711, 102712, 102713, 102714, 102715, 102716, 102717, 102718],
	buildBlacksmithsTrophies: [101600, 101601, 101602, 101603, 101604, 101605, 101606, 101607, 101608, 101609, 101610, 101611, 101612, 101613, 101614, 101615, 101616, 101617, 101618],
	buildWarriorBarracksTrophies: [103700, 103701, 103702, 103703, 103704, 103705, 103706, 103707, 103708, 103709, 103710, 103711, 103712, 103713, 103714, 103715, 103716, 103717, 103718],
	buildKnightsJoustsTrophies: [102900, 102901, 102902, 102903, 102904, 102905, 102906, 102907, 102908, 102909, 102910, 102911, 102912, 102913, 102914, 102915, 102916, 102917, 102918],
	buildWizardTowersTrophies: [103900, 103901, 103902, 103903, 103904, 103905, 103906, 103907, 103908, 103909, 103910, 103911, 103912, 103913, 103914, 103915, 103916, 103917, 103918],
	buildCathedralsTrophies: [101800, 101801, 101802, 101803, 101804, 101805, 101806, 101807, 101808, 101809, 101810, 101811, 101812, 101813, 101814, 101815, 101816, 101817, 101818],
	buildCitadelsTrophies: [101900, 101901, 101902, 101903, 101904, 101905, 101906, 101907, 101908, 101909, 101910, 101911, 101912, 101913, 101914, 101915, 101916, 101917, 101918],
	buildRoyalCastlesTrophies: [103400, 103401, 103402, 103403, 103404, 103405, 103406, 103407, 103408, 103409, 103410, 103411, 103412, 103413, 103414, 103415, 103416, 103417, 103418],
	buildHeavensGatesTrophies: [102500, 102501, 102502, 102503, 102504, 102505, 102506, 102507, 102508, 102509, 102510, 102511, 102512, 102513, 102514, 102515, 102516, 102517, 102518],
	buildSlavePensTrophies: [103500, 103501, 103502, 103503, 103504, 103505, 103506, 103507, 103508, 103509, 103510, 103511, 103512, 103513, 103514, 103515, 103516, 103517, 103518],
	buildOrcishArenasTrophies: [103300, 103301, 103302, 103303, 103304, 103305, 103306, 103307, 103308, 103309, 103310, 103311, 103312, 103313, 103314, 103315, 103316, 103317, 103318],
	buildWitchConclavesTrophies: [103800, 103801, 103802, 103803, 103804, 103805, 103806, 103807, 103808, 103809, 103810, 103811, 103812, 103813, 103814, 103815, 103816, 103817, 103818],
	buildDarkTemplesTrophies: [102000, 102001, 102002, 102003, 102004, 102005, 102006, 102007, 102008, 102009, 102010, 102011, 102012, 102013, 102014, 102015, 102016, 102017, 102018],
	buildNecropolisesTrophies: [103200, 103201, 103202, 103203, 103204, 103205, 103206, 103207, 103208, 103209, 103210, 103211, 103212, 103213, 103214, 103215, 103216, 103217, 103218],
	buildEvilFortressesTrophies: [102200, 102201, 102202, 102203, 102204, 102205, 102206, 102207, 102208, 102209, 102210, 102211, 102212, 102213, 102214, 102215, 102216, 102217, 102218],
	buildHellPortalsTrophies: [102600, 102601, 102602, 102603, 102604, 102605, 102606, 102607, 102608, 102609, 102610, 102611, 102612, 102613, 102614, 102615, 102616, 102617, 102618],
	buildDeepMinesTrophies: [102100, 102101, 102102, 102103, 102104, 102105, 102106, 102107, 102108, 102109, 102110, 102111, 102112, 102113, 102114, 102115, 102116, 102117, 102118],
	buildStonePillarsTrophies: [103600, 103601, 103602, 103603, 103604, 103605, 103606, 103607, 103608, 103609, 103610, 103611, 103612, 103613, 103614, 103615, 103616, 103617, 103618],
	buildAlchemistLabsTrophies: [101400, 101401, 101402, 101403, 101404, 101405, 101406, 101407, 101408, 101409, 101410, 101411, 101412, 101413, 101414, 101415, 101416, 101417, 101418],
	buildMonasteriesTrophies: [103100, 103101, 103102, 103103, 103104, 103105, 103106, 103107, 103108, 103109, 103110, 103111, 103112, 103113, 103114, 103115, 103116, 103117, 103118],
	buildLabyrinthsTrophies: [103000, 103001, 103002, 103003, 103004, 103005, 103006, 103007, 103008, 103009, 103010, 103011, 103012, 103013, 103014, 103015, 103016, 103017, 103018],
	buildIronStrongholdsTrophies: [102800, 102801, 102802, 102803, 102804, 102805, 102806, 102807, 102808, 102809, 102810, 102811, 102812, 102813, 102814, 102815, 102816, 102817, 102818],
	buildAncientPyramidsTrophies: [101500, 101501, 101502, 101503, 101504, 101505, 101506, 101507, 101508, 101509, 101510, 101511, 101512, 101513, 101514, 101515, 101516, 101517, 101518],
	buildHallsOfLegendsTrophies: [102400, 102401, 102402, 102403, 102404, 102405, 102406, 102407, 102408, 102409, 102410, 102411, 102412, 102413, 102414, 102415, 102416, 102417, 102418]
  };
  
  for (var x in trophyIDs) {
	dropdownFilter[x] = trophyIDs[x];
  }

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
	
	Vue.component('widget-neutraltime', {
	  template: '<tr>'
	  + '<th>Neutral playtime is not saved; it is calculated in-game.</th>'
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
      }
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
    
    Vue.component('widget-spell-rng', {
      props: ['spell', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input v-model="spell.s" number></input></td>'
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
    
    Vue.component('widget-spell-duration', {
      props: ['spell', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input v-model="spell.t" number></input></td>'
      + '</tr>'
    });
    
    Vue.component('widget-spell-autocasting', {
      props: ['spell', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}} is on Autocasting</span></th>'
      + '<td><input type="checkbox" v-model="spell.a" number></input></td>'
      + '</tr>'
	  + '<tr>'
      + '<th><span class="statname">{{name}} Silver Autocasting Order</span></th>'
      + '<td><input v-model="spell.n" number></input></td>'
      + '</tr>'
	  + '<tr>'
      + '<th><span class="statname">{{name}} Gold Autocasting Order</span></th>'
      + '<td><input v-model="spell.n2" number></input></td>'
      + '</tr>'
	  + '<tr>'
      + '<th><span class="statname">{{name}} Bronze Autocasting Order</span></th>'
      + '<td><input v-model="spell.n3" number></input></td>'
      + '</tr>'
	  });
    
    Vue.component('widget-spell-tiers', {
      props: ['spell', 'name'],
      template: '<tr>'
      + '<th><span class="statname">{{name}} Tiers Bought</span></th>'
      + '<td><input v-model="spell.tierstat1" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<th><span class="statname">{{name}} Tier Autocasting Level</span></th>'
      + '<td><input v-model="spell.tierstat2" number></input></td>'
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
      }
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

    Vue.component('widget-upgrade-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      + '<th><span class="statheader">u1 Boolean</span></th>'
      + '<th><span class="statheader">u3 Boolean</span></th>'
      + '<th><span class="statheader">RNG State</span></th>'
      + '</tr>'
    });

    Vue.component('widget-challenge-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      + '<th><span class="statheader">u1 Boolean</span></th>'
      + '<th><span class="statheader">Inactive</span></th>'
      + '<th><span class="statheader">u3 Boolean</span></th>'
      + '<th><span class="statheader">RNG State</span></th>'
      + '</tr>'
    });

    Vue.component('widget-upgrade', {
  	  props: {
  	    'upgrades': Object,
  	    'name': String,
  	    'id': String
  	  },
      template: '<tr>'
        + '<th><span class="statname">{{name}}</span></th>'
        + '<td><input type="checkbox" v-model="owned" number></input></td>'
        + '<td><input type="checkbox" v-model="upgradeU1" number></input></td>'
        + '<td><input type="checkbox" v-model="upgradeU3" number></input></td>'
        + '<td><input v-model="upgradeRNGstate" number></input></td>'
        + '</tr>',
  	  computed: {
    	owned: {
          get: function() {
      		if (this.upgrades[Number(this.id)]) { return true; }
      		else { return false; }
      	  },
          set: function() {
            if (this.owned) {
              delete this.upgades[Number(this.id)];
            }
            else {
              this.upgrades[Number(this.id)] = {_id: Number(this.id), u1: false, u2: false, u3: false, s: 0};
            }
          }
        },
    	upgradeU1: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].u1;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	},
    	upgradeU3: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].u3;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	},
    	upgradeRNGstate: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].s;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	}
  	  }
    });
    Vue.component('widget-challenge', {
  	  props: {
  	    'upgrades': Object,
  	    'name': String,
  	    'id': String
  	  },
      template: '<tr>'
        + '<th><span class="statname">{{name}}</span></th>'
        + '<td><input type="checkbox" v-model="owned" number></input></td>'
        + '<td><input type="checkbox" v-model="upgradeU1" number></input></td>'
        + '<td><input type="checkbox" v-model="upgradeU2" number></input></td>'
        + '<td><input type="checkbox" v-model="upgradeU3" number></input></td>'
        + '<td><input v-model="upgradeRNGstate" number></input></td>'
        + '</tr>',
  	  computed: {
    	owned: {
          get: function() {
      		if (this.upgrades[Number(this.id)]) { return true; }
      		else { return false; }
      	  },
          set: function() {
            if (this.owned) {
              delete this.upgades[Number(this.id)];
            }
            else {
              this.upgrades[Number(this.id)] = {_id: Number(this.id), u1: false, u2: false, u3: false, s: 0};
            }
          }
        },
    	upgradeU1: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].u1;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	},
    	upgradeU2: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].u1;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	},
    	upgradeU3: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].u3;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	},
    	upgradeRNGstate: {
          get: function() {
    	    return this.unlocked && this.upgrades[Number(this.id)].s;
          },
          set: function(x) {
            if (this.unlocked)
              this.upgrades[Number(this.id)] = [x];
          }
    	}
  	  }
    });

    Vue.component('widget-trophy-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      //+ '<th><span class="statheader">u1 Boolean</span></th>'
      + '</tr>'
    });

    Vue.component('widget-trophy', {
  	  props: {
  	    'trophies': Object,
  	    'name': String,
  	    'id': String
  	  },
      template: '<tr>'
        + '<th><span class="statname">{{name}}</span></th>'
        + '<td><input type="checkbox" v-model="unlocked" number></input></td>'
        //+ '<td><input type="checkbox" v-model="trophyU1" number></input></td>'
        + '</tr>',
  	  computed: {
    	unlocked: {
          get: function() {
      		if (this.trophies[Number(this.id)]) { return true; }
      		else { return false; }
      	  },
          set: function() {
            if (this.unlocked) {
              delete this.trophies[Number(this.id)];
            }
            else {
              this.trophies[Number(this.id)] = {_id: Number(this.id), u1: false};
            }
          }
        },
    	trophyU1: {
          get: function() {
    	    return this.unlocked && this.trophies[Number(this.id)].u1;
          },
          set: function(x) {
            if (this.unlocked)
              this.trophies[Number(this.id)] = [x];
          }
    	}
  	  }
    });

    Vue.component('widget-trophy-dropdown', {
      props: {
        'trophies': Object,
        'name': String,
        'type': String,
        'filter': String
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><select v-model="unlocked" number>'
      + '<option :disabled="option.disabled" :value="option.id" v-for="option in options">{{option.name}}</option>'
      + '</select></td>'
      + '</tr>',
  	  computed: {
    	unlocked: {
          get: function() {
		    for (var i = this.options.length-2; i >= 0; i--) {
			  if (this.trophies[trophyIDs[this.filter][i]]) {
				return trophyIDs[this.filter][i]
			  }
		    }
           return -1;
      	  },
          set: function(x) {
			for (var i = 0; i < this.options.length-1; i++) {
			  var tid = trophyIDs[this.filter][i];
              if (!this.trophies[tid]) {
				this.trophies[tid] = {_id:tid, u1:false};
              } else {
                if (this.trophies[tid]) delete this.trophies[tid];
			  }
            }
          }
		    },
        options: function() {
          var opts = [{id:-1, name:'None'}];
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
        factions: util.assoc.faction,
		//upgrades: util.assoc.upgrades,
        currenttime: Math.floor(new Date().getTime()/1000)
      },
      methods: {
        genSave: function(event) {
          this.outputsave = SaveHandler.Encode(this.save);
        },
        updateTime: function(event) { 
          this.currentTime = Math.floor(new Date().getTime()/1000);
        }
      },
      computed: {
        offlinetime: {
          get: function() {
            return this.currenttime - this.save.lastsave;
          },
          set: function(x) {
            this.save.lastsave = this.currenttime - x;
          }
        },
		upgradesArray: {
          get: function() {
		    return this.save.upgrades
          },
          set: function(x) {
            this.save.upgrades[x] = [true];
          }
		},
		trophiesArray: {
          get: function() {
		    return this.save.trophies
          },
          set: function(x) {
            this.save.trophies[x] = [true];
          }
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
