(function(window, document, $, undefined) {
  'use strict';

  var dropdownFilter = {
    faction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 11],
    prestigeFaction: [-1, 9, 10, 12],
    bloodlineFaction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    spell: [18, 3, 12, 6, 14, 9, 1, 8, 15, 11, 7, 13, 10, 2, 5, 4, 21, 17],
    goodmercspells: [6, 14, 9, 5, 8, 11, 4, 10, 2, 21],
    evilmercspells: [6, 14, 9, 5, 8, 15, 11, 4, 10, 2, 21],
    neutralmercspells: [6, 14, 9, 5, 8, 11, 4, 13, 10, 2, 21],
  };
  
  var trophyIDs = {
    autocastSeries: [8, 9, 10, 11, 12, 13, 159, 200],
    buildBuildings: [101700, 101701, 101702, 101703, 101704, 101705, 101706, 101707, 101708, 101709, 101710, 101711, 101712],
    castSpells: [104000, 104001, 104002, 104003, 104004, 104005, 104006, 104007, 104008, 104009, 104010, 104011, 104012, 104013],
    clickTreasure: [104100, 104101, 104102, 104103, 104104, 104105, 104106, 104107, 104108],
    findFactionCoins: [104500, 104501, 104502, 104503, 104504, 104505, 104506, 104507, 104508, 104509, 104510, 104511, 104512, 104513, 104514, 104515, 104516, 104517],
    gainCoins: [104600, 104601, 104602, 104603, 104604, 104605, 104606, 104607, 104608, 104609, 104610, 104611, 104612, 104613, 104614, 104615, 104616, 104617, 104618, 104619],
    gainCoinClicking: [104700, 104701, 104702, 104703, 104704, 104705, 104706, 104707, 104708, 104709, 104710, 104711, 104712, 104713, 104714, 104715, 104716, 104717, 104718],
    gainGems: [104900, 104901, 104902, 104903, 104904, 104905, 104906, 104907, 104908, 104909, 104910, 104911, 104912, 104913, 104914, 104915, 104916, 104917, 104918, 104919, 104920, 104921, 104922],
    gainReincarnate: [105000, 105001, 105002, 105003, 105004, 105005, 105006, 105007, 105008, 105009, 105010, 105011, 105012, 105013, 105014, 105015],
    haveAssistants: [105100, 105101, 105102, 105103, 105104, 105105, 105106, 105107, 105108, 105109, 105110, 105111, 105112],
    purchaseUpgrade: [105500, 105501, 105502, 105503, 105504, 105505, 105506, 105507, 105508, 105509, 105510],
    produceMana: [111200, 111201, 111202, 111203, 111204, 111205, 111206, 111207, 111208, 111209, 111210, 111211],
    gainRubies: [116200, 116201, 116202, 116203],
    artifacts: [117000, 117001, 117002, 117003, 117004, 117005],
    spellTiers: [123200, 123201, 123202, 123203],
    buildFarmsTrophies: [102300, 102301, 102302, 102303, 102304, 102305, 102306, 102307, 102308, 102309, 102310, 102311, 102312, 102313, 102314, 102315, 102316, 102317, 102318, 102319, 102320],
    buildInnsTrophies: [102700, 102701, 102702, 102703, 102704, 102705, 102706, 102707, 102708, 102709, 102710, 102711, 102712, 102713, 102714, 102715, 102716, 102717, 102718, 102719, 102720],
    buildBlacksmithsTrophies: [101600, 101601, 101602, 101603, 101604, 101605, 101606, 101607, 101608, 101609, 101610, 101611, 101612, 101613, 101614, 101615, 101616, 101617, 101618, 101619, 101620],
    buildWarriorBarracksTrophies: [103700, 103701, 103702, 103703, 103704, 103705, 103706, 103707, 103708, 103709, 103710, 103711, 103712, 103713, 103714, 103715, 103716, 103717, 103718, 103719, 103720],
    buildKnightsJoustsTrophies: [102900, 102901, 102902, 102903, 102904, 102905, 102906, 102907, 102908, 102909, 102910, 102911, 102912, 102913, 102914, 102915, 102916, 102917, 102918, 102919, 102920],
    buildWizardTowersTrophies: [103900, 103901, 103902, 103903, 103904, 103905, 103906, 103907, 103908, 103909, 103910, 103911, 103912, 103913, 103914, 103915, 103916, 103917, 103918, 103919, 103920],
    buildCathedralsTrophies: [101800, 101801, 101802, 101803, 101804, 101805, 101806, 101807, 101808, 101809, 101810, 101811, 101812, 101813, 101814, 101815, 101816, 101817, 101818, 101819, 101820],
    buildCitadelsTrophies: [101900, 101901, 101902, 101903, 101904, 101905, 101906, 101907, 101908, 101909, 101910, 101911, 101912, 101913, 101914, 101915, 101916, 101917, 101918, 101919, 101920],
    buildRoyalCastlesTrophies: [103400, 103401, 103402, 103403, 103404, 103405, 103406, 103407, 103408, 103409, 103410, 103411, 103412, 103413, 103414, 103415, 103416, 103417, 103418, 103419, 103420],
    buildHeavensGatesTrophies: [102500, 102501, 102502, 102503, 102504, 102505, 102506, 102507, 102508, 102509, 102510, 102511, 102512, 102513, 102514, 102515, 102516, 102517, 102518, 102519, 102520],
    buildSlavePensTrophies: [103500, 103501, 103502, 103503, 103504, 103505, 103506, 103507, 103508, 103509, 103510, 103511, 103512, 103513, 103514, 103515, 103516, 103517, 103518, 103519, 103520],
    buildOrcishArenasTrophies: [103300, 103301, 103302, 103303, 103304, 103305, 103306, 103307, 103308, 103309, 103310, 103311, 103312, 103313, 103314, 103315, 103316, 103317, 103318, 103319, 103320],
    buildWitchConclavesTrophies: [103800, 103801, 103802, 103803, 103804, 103805, 103806, 103807, 103808, 103809, 103810, 103811, 103812, 103813, 103814, 103815, 103816, 103817, 103818, 103819, 103820],
    buildDarkTemplesTrophies: [102000, 102001, 102002, 102003, 102004, 102005, 102006, 102007, 102008, 102009, 102010, 102011, 102012, 102013, 102014, 102015, 102016, 102017, 102018, 102019, 102020],
    buildNecropolisesTrophies: [103200, 103201, 103202, 103203, 103204, 103205, 103206, 103207, 103208, 103209, 103210, 103211, 103212, 103213, 103214, 103215, 103216, 103217, 103218, 103219, 103220],
    buildEvilFortressesTrophies: [102200, 102201, 102202, 102203, 102204, 102205, 102206, 102207, 102208, 102209, 102210, 102211, 102212, 102213, 102214, 102215, 102216, 102217, 102218, 102219, 102220],
    buildHellPortalsTrophies: [102600, 102601, 102602, 102603, 102604, 102605, 102606, 102607, 102608, 102609, 102610, 102611, 102612, 102613, 102614, 102615, 102616, 102617, 102618, 102619, 102620],
    buildDeepMinesTrophies: [102100, 102101, 102102, 102103, 102104, 102105, 102106, 102107, 102108, 102109, 102110, 102111, 102112, 102113, 102114, 102115, 102116, 102117, 102118, 102119, 102120],
    buildStonePillarsTrophies: [103600, 103601, 103602, 103603, 103604, 103605, 103606, 103607, 103608, 103609, 103610, 103611, 103612, 103613, 103614, 103615, 103616, 103617, 103618, 103619, 103620],
    buildAlchemistLabsTrophies: [101400, 101401, 101402, 101403, 101404, 101405, 101406, 101407, 101408, 101409, 101410, 101411, 101412, 101413, 101414, 101415, 101416, 101417, 101418, 101419, 101420],
    buildMonasteriesTrophies: [103100, 103101, 103102, 103103, 103104, 103105, 103106, 103107, 103108, 103109, 103110, 103111, 103112, 103113, 103114, 103115, 103116, 103117, 103118, 103119, 103120],
    buildLabyrinthsTrophies: [103000, 103001, 103002, 103003, 103004, 103005, 103006, 103007, 103008, 103009, 103010, 103011, 103012, 103013, 103014, 103015, 103016, 103017, 103018, 103019, 103020],
    buildIronStrongholdsTrophies: [102800, 102801, 102802, 102803, 102804, 102805, 102806, 102807, 102808, 102809, 102810, 102811, 102812, 102813, 102814, 102815, 102816, 102817, 102818, 102819, 102820],
    buildAncientPyramidsTrophies: [101500, 101501, 101502, 101503, 101504, 101505, 101506, 101507, 101508, 101509, 101510, 101511, 101512, 101513, 101514, 101515, 101516, 101517, 101518, 101519, 101520],
    buildHallsOfLegendsTrophies: [102400, 102401, 102402, 102403, 102404, 102405, 102406, 102407, 102408, 102409, 102410, 102411, 102412, 102413, 102414, 102415, 102416, 102417, 102418, 102419, 102420]
  };
  
  var upgradeIDs = {
    bloodlineIDs: [194, 164, 39, 212, 396, 103, 380, 136, 183, 150, 120, 598],
    ctaTiers: [400301, 400302, 400303, 400304, 400305],
    hlTiers: [401201, 401202, 401203, 401204, 401205],
    fcTiers: [400601, 400602, 400603, 400604, 400605],
    mbTiers: [401401, 401402, 401403, 401404, 401405],
    ghTiers: [400901, 400902, 400903, 400904, 400905],
    bfTiers: [400101, 400102, 400103, 400104, 400105],
    gbgTiers: [400801, 400802, 400803, 400804, 400805],
    ntTiers: [401501, 401502, 401503, 401504, 401505],
    hbTiers: [401101, 401102, 401103, 401104, 401105],
    gmgTiers: [400701, 400702, 400703, 400704, 400705],
    lsTiers: [401301, 401302, 401303, 401304, 401305],
    gbTiers: [401001, 401002, 401003, 401004, 401005],
    bwTiers: [400201, 400202, 400203, 400204, 400205],
    dpTiers: [400501, 400502, 400503, 400504, 400505],
    csTiers: [400401, 400402, 400403, 400404, 400405],
    dbTiers: [402101, 402102, 402103, 402104, 402105],
    ssTiers: [401701, 401702, 401703, 401704, 401705],
  };
  
  for (var x in trophyIDs) {
    dropdownFilter[x] = trophyIDs[x];
  }

  for (var x in upgradeIDs) {
    dropdownFilter[x] = upgradeIDs[x];
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
      View.checkLSavail()
      View.checkMiracleAvail()
      View.updateTime()
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

    Vue.filter('timeIO', {
      read: function(val) {
        return util.render.outputFilters.time(val);
      },
      write: function(val, old) {
        return util.render.inputFilters.time(val);
      }
    })
	
    Vue.component('widget-neutraltime', {
      props: {
        total: Object,
        good: Object,
        evil: Object
      },
      template: '<tr>'
      + '<th>Neutral Playtime</th>'
      + '<td><span class="derivedstat">{{lvl1 | timeIO}}</span></td>'
      + '<td><span class="derivedstat">{{lvl2 | timeIO}}</span></td>'
      + '<td><span class="derivedstat">{{lvl3 | timeIO}}</span></td>'
      + '<td><span class="derivedstat">{{lvl4 | timeIO}}</span></td>'
      + '<td><span class="derivedstat">{{lvl5 | timeIO}}</span></td>'
      + '</tr>',
      computed: {
        lvl1: function() { return this.total.stats - this.good.stats - this.evil.stats; },
        lvl2: function() { return this.total.statsReset - this.good.statsReset - this.evil.statsReset; },
        lvl3: function() { return this.lvl1 + this.lvl2; },
        lvl4: function() { return this.total.statsRei - this.good.statsRei - this.evil.statsRei; },
        lvl5: function() { return this.lvl3 + this.lvl4; }
      }
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
      + '<td><input v-model="spell.active0 | timeIO" number></input></td>'
      + '<td><input v-model="spell.active1 | timeIO" number></input></td>'
      + '<td><span class="derivedstat">{{spell.active0 + spell.active1 | timeIO}}</span></td>'
      + '<td><input v-model="spell.active2 | timeIO" number></input></td>'
      + '<td><span class="derivedstat">{{spell.active0 + spell.active1 + spell.active2 | timeIO}}</span></td>'
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
    
    Vue.component('widget-spell-tiers-dropdown', {
      props: {
        'upgrades': Object,
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
              if (this.upgrades[upgradeIDs[this.filter][i]]) { return upgradeIDs[this.filter][i]; }
            }
            return -1;
          },
          set: function(x) {
            for (var i = 0; i < this.options.length-1; i++) {
              var uid = upgradeIDs[this.filter][i];
              if (uid <= x) {
                this.upgrades[uid] = {_id:uid, u1:false, u3: true};
              } else {
                if (this.upgrades[uid]) delete this.upgrades[uid];
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

    Vue.component('widget-stat-time', {
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
      + '<td v-show="!hideAb"><input v-model="stat.stats | timeIO" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevAbs"><input v-model="stat.statsReset | timeIO" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideRei"><span class="derivedstat">{{stat.stats + stat.statsReset | timeIO}}</span></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevReis"><input v-model="stat.statsRei | timeIO" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideTotal"><span class="derivedstat">{{stat.stats + stat.statsReset + stat.statsRei | timeIO}}</span></td>'
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
    
    Vue.component('widget-stat-max-time', {
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
      + '<td v-show="!hideAb"><input v-model="stat.stats | timeIO" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevAbs"><input v-model="stat.statsReset | timeIO" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideRei"><span class="derivedstat">{{rei | timeIO}}</span></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hidePrevReis"><input v-model="stat.statsRei | timeIO" number></input></td>'
      + '<td v-else><span class="nullstat">&mdash;</span></td>'
      + '<td v-show="!hideTotal"><span class="derivedstat">{{total | timeIO}}</span></td>'
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
    
    Vue.component('widget-field-time', {
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
      + '<td v-show="canEdit" :colspan="colspan"><input v-model="field | timeIO"></input></td>'
      + '<td v-else :colspan="colspan"><span class="rawstat">{{field | timeIO}}</span></td>'
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

    Vue.component('widget-bloodline-dropdown', {
      props: {
        'field': {},
        'upgrades': Object,
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
            var blFactionIDs = { 0:194, 1:164, 2:39, 3:212, 4:396, 5:103, 6:380, 7:136, 8:183, 9:150, 10:120, 11:598 };
            if (this.field == -1) { return this.field }
            return blFactionIDs[this.field]
          },
          set: function(x) {
            var blFactionIDs = { 0:194, 1:164, 2:39, 3:212, 4:396, 5:103, 6:380, 7:136, 8:183, 9:150, 10:120, 11:598 };
            if (this.field > -1) {
              delete this.upgrades[blFactionIDs[this.field]]
            }
            for (var i in blFactionIDs) {
              if (blFactionIDs[i] == x) { this.field = i }
            }
            if (x == -1) { this.field = x }
            else { this.upgrades[x] = {_id:x, u1:true} }
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

    Vue.component('widget-upgrade-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      /*+ '<th><span class="statheader">u1 Boolean</span></th>'
      + '<th><span class="statheader">u3 Boolean</span></th>'
      + '<th><span class="statheader">RNG State</span></th>'*/
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
      /*+ '<td><input type="checkbox" v-model="upgradeU1" number></input></td>'
      + '<td><input type="checkbox" v-model="upgradeU3" number></input></td>'
      + '<td><input v-model="upgradeRNGstate" number></input></td>'*/
      + '</tr>',
      computed: {
    	owned: {
          get: function() {
            if (this.upgrades[this.id]) { return true; }
            else { return false; }
      	  },
          set: function() {
            if (this.owned) { delete this.upgrades[this.id]; }
            else { this.upgrades[this.id] = {_id: this.id, u1: true, u2: false, u3: false, s: 0}; }
          }
        },
    	upgradeU1: {
          get: function() {
    	    return this.unlocked && this.upgrades[this.id].u1;
          },
          set: function(x) {
            if (this.unlocked) { this.upgrades[this.id] = [x]; }
          }
    	},
    	upgradeU3: {
          get: function() {
    	    return this.unlocked && this.upgrades[this.id].u3;
          },
          set: function(x) {
            if (this.unlocked) { this.upgrades[this.id] = [x]; }
          }
    	},
    	upgradeRNGstate: {
          get: function() {
    	    return this.unlocked && this.upgrades[this.id].s;
          },
          set: function(x) {
            if (this.unlocked) { this.upgrades[this.id] = [x]; }
          }
    	}
      }
    });

    Vue.component('widget-challenge-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      + '</tr>'
    });

    Vue.component('widget-challenge', {
      props: {
        'upgrades': Object,
        'name': String,
        'id': String
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input type="checkbox" v-model="unlocked" number></input></td>'
      + '</tr>',
      computed: {
    	unlocked: {
          get: function() {
            if (this.upgrades[this.id]) { return true; }
            else { return false; }
      	  },
          set: function(x) {
            if (this.upgrades[this.id] && !x) { delete this.upgrades[this.id]; }
            else if (!this.upgrades[this.id] && x) { 
              Vue.set(View.save.upgrades, this.id, {_id: this.id, u1: true, u2: false, u3: false, s: 0}); 
            }
          }
        }
      }
    });

    Vue.component('widget-research-upgrades-header', {
      template: '<tr>'
      + '<th><span class="statheader">Spellcraft</span></th>'
      + '<th><span class="statheader">Craftsmanship</span></th>'
      + '<th><span class="statheader">Divine</span></th>'
      + '<th><span class="statheader">Economics</span></th>'
      + '<th><span class="statheader">Alchemy</span></th>'
      + '<th><span class="statheader">Warfare</span></th>'
      + '</tr>'
    });

    Vue.component('widget-research-upgrades', {
      props: {
        'upgrades': Object,
      },
      template: '<tr>'
      + '<td>S1 <input type="checkbox" v-model="S1" number></input></td>'
      + '<td>C1 <input type="checkbox" v-model="C1" number></input></td>'
      + '<td>D1 <input type="checkbox" v-model="D1" number></input></td>'
      + '<td>E1 <input type="checkbox" v-model="E1" number></input></td>'
      + '<td>A1 <input type="checkbox" v-model="A1" number></input></td>'
      + '<td>W1 <input type="checkbox" v-model="W1" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S10 <input type="checkbox" v-model="S10" number></input></td>'
      + '<td>C10 <input type="checkbox" v-model="C10" number></input></td>'
      + '<td>D10 <input type="checkbox" v-model="D10" number></input></td>'
      + '<td>E10 <input type="checkbox" v-model="E10" number></input></td>'
      + '<td>A10 <input type="checkbox" v-model="A10" number></input></td>'
      + '<td>W10 <input type="checkbox" v-model="W10" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S30 <input type="checkbox" v-model="S30" number></input></td>'
      + '<td>C25 <input type="checkbox" v-model="C25" number></input></td>'
      + '<td>D25 <input type="checkbox" v-model="D25" number></input></td>'
      + '<td>E25 <input type="checkbox" v-model="E25" number></input></td>'
      + '<td>A25 <input type="checkbox" v-model="A25" number></input></td>'
      + '<td>W25 <input type="checkbox" v-model="W25" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S50 <input type="checkbox" v-model="S50" number></input></td>'
      + '<td>C50 <input type="checkbox" v-model="C50" number></input></td>'
      + '<td>D50 <input type="checkbox" v-model="D50" number></input></td>'
      + '<td>E30 <input type="checkbox" v-model="E30" number></input></td>'
      + '<td>A30 <input type="checkbox" v-model="A30" number></input></td>'
      + '<td>W50 <input type="checkbox" v-model="W50" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S105 <input type="checkbox" v-model="S105" number></input></td>'
      + '<td>C80 <input type="checkbox" v-model="C80" number></input></td>'
      + '<td>D55 <input type="checkbox" v-model="D55" number></input></td>'
      + '<td>E50 <input type="checkbox" v-model="E50" number></input></td>'
      + '<td>A50 <input type="checkbox" v-model="A50" number></input></td>'
      + '<td>W120 <input type="checkbox" v-model="W120" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S135 <input type="checkbox" v-model="S135" number></input></td>'
      + '<td>C105 <input type="checkbox" v-model="C105" number></input></td>'
      + '<td>D135 <input type="checkbox" v-model="D135" number></input></td>'
      + '<td>E80 <input type="checkbox" v-model="E80" number></input></td>'
      + '<td>A55 <input type="checkbox" v-model="A55" number></input></td>'
      + '<td>W135 <input type="checkbox" v-model="W135" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S150 <input type="checkbox" v-model="S150" number></input></td>'
      + '<td>C120 <input type="checkbox" v-model="C120" number></input></td>'
      + '<td>D150 <input type="checkbox" v-model="D150" number></input></td>'
      + '<td>E135 <input type="checkbox" v-model="E135" number></input></td>'
      + '<td>A105 <input type="checkbox" v-model="A105" number></input></td>'
      + '<td>W150 <input type="checkbox" v-model="W150" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S175 <input type="checkbox" v-model="S175" number></input></td>'
      + '<td>C135 <input type="checkbox" v-model="C135" number></input></td>'
      + '<td>D175 <input type="checkbox" v-model="D175" number></input></td>'
      + '<td>E145 <input type="checkbox" v-model="E145" number></input></td>'
      + '<td>A120 <input type="checkbox" v-model="A120" number></input></td>'
      + '<td>W175 <input type="checkbox" v-model="W175" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S180 <input type="checkbox" v-model="S180" number></input></td>'
      + '<td>C150 <input type="checkbox" v-model="C150" number></input></td>'
      + '<td>D200 <input type="checkbox" v-model="D200" number></input></td>'
      + '<td>E150 <input type="checkbox" v-model="E150" number></input></td>'
      + '<td>A135 <input type="checkbox" v-model="A135" number></input></td>'
      + '<td>W180 <input type="checkbox" v-model="W180" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S200 <input type="checkbox" v-model="S200" number></input></td>'
      + '<td>C175 <input type="checkbox" v-model="C175" number></input></td>'
      + '<td>D205 <input type="checkbox" v-model="D205" number></input></td>'
      + '<td>E200 <input type="checkbox" v-model="E200" number></input></td>'
      + '<td>A150 <input type="checkbox" v-model="A150" number></input></td>'
      + '<td>W200 <input type="checkbox" v-model="W200" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S215 <input type="checkbox" v-model="S215" number></input></td>'
      + '<td>C200 <input type="checkbox" v-model="C200" number></input></td>'
      + '<td>D225 <input type="checkbox" v-model="D225" number></input></td>'
      + '<td>E225 <input type="checkbox" v-model="E225" number></input></td>'
      + '<td>A175 <input type="checkbox" v-model="A175" number></input></td>'
      + '<td>W205 <input type="checkbox" v-model="W205" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S225 <input type="checkbox" v-model="S225" number></input></td>'
      + '<td>C225 <input type="checkbox" v-model="C225" number></input></td>'
      + '<td>D245 <input type="checkbox" v-model="D245" number></input></td>'
      + '<td>E230 <input type="checkbox" v-model="E230" number></input></td>'
      + '<td>A200 <input type="checkbox" v-model="A200" number></input></td>'
      + '<td>W225 <input type="checkbox" v-model="W225" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S250 <input type="checkbox" v-model="S250" number></input></td>'
      + '<td>C250 <input type="checkbox" v-model="C250" number></input></td>'
      + '<td>D250 <input type="checkbox" v-model="D250" number></input></td>'
      + '<td>E250 <input type="checkbox" v-model="E250" number></input></td>'
      + '<td>A250 <input type="checkbox" v-model="A250" number></input></td>'
      + '<td>W250 <input type="checkbox" v-model="W250" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S251 <input type="checkbox" v-model="S251" number></input></td>'
      + '<td>C251 <input type="checkbox" v-model="C251" number></input></td>'
      + '<td>D260 <input type="checkbox" v-model="D260" number></input></td>'
      + '<td>E260 <input type="checkbox" v-model="E260" number></input></td>'
      + '<td>A251 <input type="checkbox" v-model="A251" number></input></td>'
      + '<td>W260 <input type="checkbox" v-model="W260" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S270 <input type="checkbox" v-model="S270" number></input></td>'
      + '<td>C300 <input type="checkbox" v-model="C300" number></input></td>'
      + '<td>D275 <input type="checkbox" v-model="D275" number></input></td>'
      + '<td>E275 <input type="checkbox" v-model="E275" number></input></td>'
      + '<td>A270 <input type="checkbox" v-model="A270" number></input></td>'
      + '<td>W275 <input type="checkbox" v-model="W275" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S300 <input type="checkbox" v-model="S300" number></input></td>'
      + '<td>C305 <input type="checkbox" v-model="C305" number></input></td>'
      + '<td>D290 <input type="checkbox" v-model="D290" number></input></td>'
      + '<td>E290 <input type="checkbox" v-model="E290" number></input></td>'
      + '<td>A300 <input type="checkbox" v-model="A300" number></input></td>'
      + '<td>W290 <input type="checkbox" v-model="W290" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S305 <input type="checkbox" v-model="S305" number></input></td>'
      + '<td>C330 <input type="checkbox" v-model="C330" number></input></td>'
      + '<td>D320 <input type="checkbox" v-model="D320" number></input></td>'
      + '<td>E320 <input type="checkbox" v-model="E320" number></input></td>'
      + '<td>A305 <input type="checkbox" v-model="A305" number></input></td>'
      + '<td>W320 <input type="checkbox" v-model="W320" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S330 <input type="checkbox" v-model="S330" number></input></td>'
      + '<td>C340 <input type="checkbox" v-model="C340" number></input></td>'
      + '<td>D330 <input type="checkbox" v-model="D330" number></input></td>'
      + '<td>E330 <input type="checkbox" v-model="E330" number></input></td>'
      + '<td>A330 <input type="checkbox" v-model="A330" number></input></td>'
      + '<td>W330 <input type="checkbox" v-model="W330" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S375 <input type="checkbox" v-model="S375" number></input></td>'
      + '<td>C375 <input type="checkbox" v-model="C375" number></input></td>'
      + '<td>D350 <input type="checkbox" v-model="D350" number></input></td>'
      + '<td>E350 <input type="checkbox" v-model="E350" number></input></td>'
      + '<td>A375 <input type="checkbox" v-model="A375" number></input></td>'
      + '<td>W350 <input type="checkbox" v-model="W350" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S400 <input type="checkbox" v-model="S400" number></input></td>'
      + '<td>C400 <input type="checkbox" v-model="C400" number></input></td>'
      + '<td>D400 <input type="checkbox" v-model="D400" number></input></td>'
      + '<td>E400 <input type="checkbox" v-model="E400" number></input></td>'
      + '<td>A400 <input type="checkbox" v-model="A400" number></input></td>'
      + '<td>W400 <input type="checkbox" v-model="W400" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S435 <input type="checkbox" v-model="S435" number></input></td>'
      + '<td>C405 <input type="checkbox" v-model="C405" number></input></td>'
      + '<td>D435 <input type="checkbox" v-model="D435" number></input></td>'
      + '<td>E410 <input type="checkbox" v-model="E410" number></input></td>'
      + '<td>A410 <input type="checkbox" v-model="A410" number></input></td>'
      + '<td>W405 <input type="checkbox" v-model="W405" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S460 <input type="checkbox" v-model="S460" number></input></td>'
      + '<td>C460 <input type="checkbox" v-model="C460" number></input></td>'
      + '<td>D480 <input type="checkbox" v-model="D480" number></input></td>'
      + '<td>E460 <input type="checkbox" v-model="E460" number></input></td>'
      + '<td>A480 <input type="checkbox" v-model="A480" number></input></td>'
      + '<td>W520 <input type="checkbox" v-model="W520" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S500 <input type="checkbox" v-model="S500" number></input></td>'
      + '<td>C500 <input type="checkbox" v-model="C500" number></input></td>'
      + '<td>D525 <input type="checkbox" v-model="D525" number></input></td>'
      + '<td>E480 <input type="checkbox" v-model="E480" number></input></td>'
      + '<td>A495 <input type="checkbox" v-model="A495" number></input></td>'
      + '<td>W525 <input type="checkbox" v-model="W525" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S545 <input type="checkbox" v-model="S545" number></input></td>'
      + '<td>C520 <input type="checkbox" v-model="C520" number></input></td>'
      + '<td>D560 <input type="checkbox" v-model="D560" number></input></td>'
      + '<td>E495 <input type="checkbox" v-model="E495" number></input></td>'
      + '<td>A545 <input type="checkbox" v-model="A545" number></input></td>'
      + '<td>W560 <input type="checkbox" v-model="W560" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S590 <input type="checkbox" v-model="S590" number></input></td>'
      + '<td>C590 <input type="checkbox" v-model="C590" number></input></td>'
      + '<td>D590 <input type="checkbox" v-model="D590" number></input></td>'
      + '<td>E590 <input type="checkbox" v-model="E590" number></input></td>'
      + '<td>A590 <input type="checkbox" v-model="A590" number></input></td>'
      + '<td>W590 <input type="checkbox" v-model="W590" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S1275 <input type="checkbox" v-model="S1275" number></input></td>'
      + '<td>C1300 <input type="checkbox" v-model="C1300" number></input></td>'
      + '<td>D1125 <input type="checkbox" v-model="D1125" number></input></td>'
      + '<td>E1225 <input type="checkbox" v-model="E1225" number></input></td>'
      + '<td>A1200 <input type="checkbox" v-model="A1200" number></input></td>'
      + '<td>W1275 <input type="checkbox" v-model="W1275" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S1450 <input type="checkbox" v-model="S1450" number></input></td>'
      + '<td>C1325 <input type="checkbox" v-model="C1325" number></input></td>'
      + '<td>D1275 <input type="checkbox" v-model="D1275" number></input></td>'
      + '<td>E1325 <input type="checkbox" v-model="E1325" number></input></td>'
      + '<td>A1325 <input type="checkbox" v-model="A1325" number></input></td>'
      + '<td>W1375 <input type="checkbox" v-model="W1375" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S1500 <input type="checkbox" v-model="S1500" number></input></td>'
      + '<td>C1500 <input type="checkbox" v-model="C1500" number></input></td>'
      + '<td>D1375 <input type="checkbox" v-model="D1375" number></input></td>'
      + '<td>E1425 <input type="checkbox" v-model="E1425" number></input></td>'
      + '<td>A1500 <input type="checkbox" v-model="A1500" number></input></td>'
      + '<td>W1400 <input type="checkbox" v-model="W1400" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S2875 <input type="checkbox" v-model="S2875" number></input></td>'
      + '<td>C3000 <input type="checkbox" v-model="C3000" number></input></td>'
      + '<td>D2775 <input type="checkbox" v-model="D2775" number></input></td>'
      + '<td>E3250 <input type="checkbox" v-model="E3250" number></input></td>'
      + '<td>A2950 <input type="checkbox" v-model="A2950" number></input></td>'
      + '<td>W3050 <input type="checkbox" v-model="W3050" number></input></td>'
      + '</tr>'
      + '<tr>'
      + '<td>S3200 <input type="checkbox" v-model="S3200" number></input></td>'
      + '<td>C3100 <input type="checkbox" v-model="C3100" number></input></td>'
      + '<td>D3350 <input type="checkbox" v-model="D3350" number></input></td>'
      + '<td>E3300 <input type="checkbox" v-model="E3300" number></input></td>'
      + '<td>A3400 <input type="checkbox" v-model="A3400" number></input></td>'
      + '<td>W3150 <input type="checkbox" v-model="W3150" number></input></td>'
      + '</tr>',
      computed: {
        S1: {
          get: function() {
            if (this.upgrades[130300]) { return this.upgrades[130300].u1; }
            else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130300]) {
	       if (this.upgrades[130300].u1) { this.upgrades[130300].u1 = false; }
	       else { this.upgrades[130300].u1 = true; }
            }
            else { this.upgrades[130300] = {_id: 130300, u1: true, u2: false, u3: false, s: 0}; }
          }
        },
        C1: {
          get: function() {
            if (this.upgrades[125300]) { return this.upgrades[125300].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125300]) {
	       if (this.upgrades[125300].u1) { this.upgrades[125300].u1 = false; }
	       else { this.upgrades[125300].u1 = true; }
            }
            else {
              this.upgrades[125300] = {_id: 125300, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D1: {
          get: function() {
            if (this.upgrades[126400]) { return this.upgrades[126400].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126400]) {
	       if (this.upgrades[126400].u1) { this.upgrades[126400].u1 = false; }
	       else { this.upgrades[126400].u1 = true; }
            }
            else {
              this.upgrades[126400] = {_id: 126400, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E1: {
          get: function() {
            if (this.upgrades[128100]) { return this.upgrades[128100].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128100]) {
	       if (this.upgrades[128100].u1) { this.upgrades[128100].u1 = false; }
	       else { this.upgrades[128100].u1 = true; }
            }
            else {
              this.upgrades[128100] = {_id: 128100, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A1: {
          get: function() {
            if (this.upgrades[124500]) { return this.upgrades[124500].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124500]) {
	       if (this.upgrades[124500].u1) { this.upgrades[124500].u1 = false; }
	       else { this.upgrades[124500].u1 = true; }
            }
            else {
              this.upgrades[124500] = {_id: 124500, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W1: {
          get: function() {
            if (this.upgrades[131000]) { return this.upgrades[131000].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131000]) {
	       if (this.upgrades[131000].u1) { this.upgrades[131000].u1 = false; }
	       else { this.upgrades[131000].u1 = true; }
            }
            else {
              this.upgrades[131000] = {_id: 131000, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S10: {
          get: function() {
            if (this.upgrades[129901]) { return this.upgrades[129901].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[129901]) {
	       if (this.upgrades[129901].u1) { this.upgrades[129901].u1 = false; }
	       else { this.upgrades[129901].u1 = true; }
            }
            else {
              this.upgrades[129901] = {_id: 129901, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C10: {
          get: function() {
            if (this.upgrades[125201]) { return this.upgrades[125201].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125201]) {
	       if (this.upgrades[125201].u1) { this.upgrades[125201].u1 = false; }
	       else { this.upgrades[125201].u1 = true; }
            }
            else {
              this.upgrades[125201] = {_id: 125201, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D10: {
          get: function() {
            if (this.upgrades[127001]) { return this.upgrades[127001].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127001]) {
	       if (this.upgrades[127001].u1) { this.upgrades[127001].u1 = false; }
	       else { this.upgrades[127001].u1 = true; }
            }
            else {
              this.upgrades[127001] = {_id: 127001, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E10: {
          get: function() {
            if (this.upgrades[128701]) { return this.upgrades[128701].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128701]) {
	       if (this.upgrades[128701].u1) { this.upgrades[128701].u1 = false; }
	       else { this.upgrades[128701].u1 = true; }
            }
            else {
              this.upgrades[128701] = {_id: 128701, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A10: {
          get: function() {
            if (this.upgrades[124801]) { return this.upgrades[124801].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124801]) {
	       if (this.upgrades[124801].u1) { this.upgrades[124801].u1 = false; }
	       else { this.upgrades[124801].u1 = true; }
            }
            else {
              this.upgrades[124801] = {_id: 124801, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W10: {
          get: function() {
            if (this.upgrades[131501]) { return this.upgrades[131501].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131501]) {
	       if (this.upgrades[131501].u1) { this.upgrades[131501].u1 = false; }
	       else { this.upgrades[131501].u1 = true; }
            }
            else {
              this.upgrades[131501] = {_id: 131501, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S30: {
          get: function() {
            if (this.upgrades[130903]) { return this.upgrades[130903].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130903]) {
	       if (this.upgrades[130903].u1) { this.upgrades[130903].u1 = false; }
	       else { this.upgrades[130903].u1 = true; }
            }
            else {
              this.upgrades[130903] = {_id: 130903, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C25: {
          get: function() {
            if (this.upgrades[125702]) { return this.upgrades[125702].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125702]) {
	       if (this.upgrades[125702].u1) { this.upgrades[125702].u1 = false; }
	       else { this.upgrades[125702].u1 = true; }
            }
            else {
              this.upgrades[125702] = {_id: 125702, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D25: {
          get: function() {
            if (this.upgrades[126602]) { return this.upgrades[126602].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126602]) {
	       if (this.upgrades[126602].u1) { this.upgrades[126602].u1 = false; }
	       else { this.upgrades[126602].u1 = true; }
            }
            else {
              this.upgrades[126602] = {_id: 126602, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E25: {
          get: function() {
            if (this.upgrades[128202]) { return this.upgrades[128202].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128202]) {
	       if (this.upgrades[128202].u1) { this.upgrades[128202].u1 = false; }
	       else { this.upgrades[128202].u1 = true; }
            }
            else {
              this.upgrades[128202] = {_id: 128202, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A25: {
          get: function() {
            if (this.upgrades[123903]) { return this.upgrades[123903].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[123903]) {
	       if (this.upgrades[123903].u1) { this.upgrades[123903].u1 = false; }
	       else { this.upgrades[123903].u1 = true; }
            }
            else {
              this.upgrades[123903] = {_id: 123903, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W25: {
          get: function() {
            if (this.upgrades[132202]) { return this.upgrades[132202].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[132202]) {
	       if (this.upgrades[132202].u1) { this.upgrades[132202].u1 = false; }
	       else { this.upgrades[132202].u1 = true; }
            }
            else {
              this.upgrades[132202] = {_id: 132202, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S50: {
          get: function() {
            if (this.upgrades[130002]) { return this.upgrades[130002].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130002]) {
	       if (this.upgrades[130002].u1) { this.upgrades[130002].u1 = false; }
	       else { this.upgrades[130002].u1 = true; }
            }
            else {
              this.upgrades[130002] = {_id: 130002, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C50: {
          get: function() {
            if (this.upgrades[125903]) { return this.upgrades[125903].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125903]) {
	       if (this.upgrades[125903].u1) { this.upgrades[125903].u1 = false; }
	       else { this.upgrades[125903].u1 = true; }
            }
            else {
              this.upgrades[125903] = {_id: 125903, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D50: {
          get: function() {
            if (this.upgrades[126803]) { return this.upgrades[126803].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126803]) {
	       if (this.upgrades[126803].u1) { this.upgrades[126803].u1 = false; }
	       else { this.upgrades[126803].u1 = true; }
            }
            else {
              this.upgrades[126803] = {_id: 126803, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E30: {
          get: function() {
            if (this.upgrades[128403]) { return this.upgrades[128403].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128403]) {
	       if (this.upgrades[128403].u1) { this.upgrades[128403].u1 = false; }
	       else { this.upgrades[128403].u1 = true; }
            }
            else {
              this.upgrades[128403] = {_id: 128403, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A30: {
          get: function() {
            if (this.upgrades[124002]) { return this.upgrades[124002].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124002]) {
	       if (this.upgrades[124002].u1) { this.upgrades[124002].u1 = false; }
	       else { this.upgrades[124002].u1 = true; }
            }
            else {
              this.upgrades[124002] = {_id: 124002, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W50: {
          get: function() {
            if (this.upgrades[131603]) { return this.upgrades[131603].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131603]) {
	       if (this.upgrades[131603].u1) { this.upgrades[131603].u1 = false; }
	       else { this.upgrades[131603].u1 = true; }
            }
            else {
              this.upgrades[131603] = {_id: 131603, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S105: {
          get: function() {
            if (this.upgrades[130504]) { return this.upgrades[130504].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130504]) {
	       if (this.upgrades[130504].u1) { this.upgrades[130504].u1 = false; }
	       else { this.upgrades[130504].u1 = true; }
            }
            else {
              this.upgrades[130504] = {_id: 130504, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C80: {
          get: function() {
            if (this.upgrades[125004]) { return this.upgrades[125004].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125004]) {
	       if (this.upgrades[125004].u1) { this.upgrades[125004].u1 = false; }
	       else { this.upgrades[125004].u1 = true; }
            }
            else {
              this.upgrades[125004] = {_id: 125004, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D55: {
          get: function() {
            if (this.upgrades[127504]) { return this.upgrades[127504].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127504]) {
	       if (this.upgrades[127504].u1) { this.upgrades[127504].u1 = false; }
	       else { this.upgrades[127504].u1 = true; }
            }
            else {
              this.upgrades[127504] = {_id: 127504, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E50: {
          get: function() {
            if (this.upgrades[127804]) { return this.upgrades[127804].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127804]) {
	       if (this.upgrades[127804].u1) { this.upgrades[127804].u1 = false; }
	       else { this.upgrades[127804].u1 = true; }
            }
            else {
              this.upgrades[127804] = {_id: 127804, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A50: {
          get: function() {
            if (this.upgrades[124304]) { return this.upgrades[124304].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124304]) {
	       if (this.upgrades[124304].u1) { this.upgrades[124304].u1 = false; }
	       else { this.upgrades[124304].u1 = true; }
            }
            else {
              this.upgrades[124304] = {_id: 124304, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W120: {
          get: function() {
            if (this.upgrades[131204]) { return this.upgrades[131204].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131204]) {
	       if (this.upgrades[131204].u1) { this.upgrades[131204].u1 = false; }
	       else { this.upgrades[131204].u1 = true; }
            }
            else {
              this.upgrades[131204] = {_id: 131204, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S135: {
          get: function() {
            if (this.upgrades[129805]) { return this.upgrades[129805].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[129805]) {
	       if (this.upgrades[129805].u1) { this.upgrades[129805].u1 = false; }
	       else { this.upgrades[129805].u1 = true; }
            }
            else {
              this.upgrades[129805] = {_id: 129805, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C105: {
          get: function() {
            if (this.upgrades[126305]) { return this.upgrades[126305].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126305]) {
	       if (this.upgrades[126305].u1) { this.upgrades[126305].u1 = false; }
	       else { this.upgrades[126305].u1 = true; }
            }
            else {
              this.upgrades[126305] = {_id: 126305, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D135: {
          get: function() {
            if (this.upgrades[126905]) { return this.upgrades[126905].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126905]) {
	       if (this.upgrades[126905].u1) { this.upgrades[126905].u1 = false; }
	       else { this.upgrades[126905].u1 = true; }
            }
            else {
              this.upgrades[126905] = {_id: 126905, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E80: {
          get: function() {
            if (this.upgrades[128305]) { return this.upgrades[128305].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128305]) {
	       if (this.upgrades[128305].u1) { this.upgrades[128305].u1 = false; }
	       else { this.upgrades[128305].u1 = true; }
            }
            else {
              this.upgrades[128305] = {_id: 128305, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A55: {
          get: function() {
            if (this.upgrades[124605]) { return this.upgrades[124605].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124605]) {
	       if (this.upgrades[124605].u1) { this.upgrades[124605].u1 = false; }
	       else { this.upgrades[124605].u1 = true; }
            }
            else {
              this.upgrades[124605] = {_id: 124605, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W135: {
          get: function() {
            if (this.upgrades[132005]) { return this.upgrades[132005].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[132005]) {
	       if (this.upgrades[132005].u1) { this.upgrades[132005].u1 = false; }
	       else { this.upgrades[132005].u1 = true; }
            }
            else {
              this.upgrades[132005] = {_id: 132005, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S150: {
          get: function() {
            if (this.upgrades[130806]) { return this.upgrades[130806].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130806]) {
	       if (this.upgrades[130806].u1) { this.upgrades[130806].u1 = false; }
	       else { this.upgrades[130806].u1 = true; }
            }
            else {
              this.upgrades[130806] = {_id: 130806, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C120: {
          get: function() {
            if (this.upgrades[126106]) { return this.upgrades[126106].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126106]) {
	       if (this.upgrades[126106].u1) { this.upgrades[126106].u1 = false; }
	       else { this.upgrades[126106].u1 = true; }
            }
            else {
              this.upgrades[126106] = {_id: 126106, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D150: {
          get: function() {
            if (this.upgrades[127206]) { return this.upgrades[127206].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127206]) {
	       if (this.upgrades[127206].u1) { this.upgrades[127206].u1 = false; }
	       else { this.upgrades[127206].u1 = true; }
            }
            else {
              this.upgrades[127206] = {_id: 127206, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E135: {
          get: function() {
            if (this.upgrades[127907]) { return this.upgrades[127907].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127907]) {
	       if (this.upgrades[127907].u1) { this.upgrades[127907].u1 = false; }
	       else { this.upgrades[127907].u1 = true; }
            }
            else {
              this.upgrades[127907] = {_id: 127907, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A105: {
          get: function() {
            if (this.upgrades[124206]) { return this.upgrades[124206].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124206]) {
	       if (this.upgrades[124206].u1) { this.upgrades[124206].u1 = false; }
	       else { this.upgrades[124206].u1 = true; }
            }
            else {
              this.upgrades[124206] = {_id: 124206, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W150: {
          get: function() {
            if (this.upgrades[131810]) { return this.upgrades[131810].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131810]) {
	       if (this.upgrades[131810].u1) { this.upgrades[131810].u1 = false; }
	       else { this.upgrades[131810].u1 = true; }
            }
            else {
              this.upgrades[131810] = {_id: 131810, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S175: {
          get: function() {
            if (this.upgrades[130208]) { return this.upgrades[130208].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130208]) {
	       if (this.upgrades[130208].u1) { this.upgrades[130208].u1 = false; }
	       else { this.upgrades[130208].u1 = true; }
            }
            else {
              this.upgrades[130208] = {_id: 130208, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C135: {
          get: function() {
            if (this.upgrades[126007]) { return this.upgrades[126007].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126007]) {
	       if (this.upgrades[126007].u1) { this.upgrades[126007].u1 = false; }
	       else { this.upgrades[126007].u1 = true; }
            }
            else {
              this.upgrades[126007] = {_id: 126007, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D175: {
          get: function() {
            if (this.upgrades[127108]) { return this.upgrades[127108].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127108]) {
	       if (this.upgrades[127108].u1) { this.upgrades[127108].u1 = false; }
	       else { this.upgrades[127108].u1 = true; }
            }
            else {
              this.upgrades[127108] = {_id: 127108, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E145: {
          get: function() {
            if (this.upgrades[128806]) { return this.upgrades[128806].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128806]) {
	       if (this.upgrades[128806].u1) { this.upgrades[128806].u1 = false; }
	       else { this.upgrades[128806].u1 = true; }
            }
            else {
              this.upgrades[128806] = {_id: 128806, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A120: {
          get: function() {
            if (this.upgrades[124907]) { return this.upgrades[124907].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124907]) {
	       if (this.upgrades[124907].u1) { this.upgrades[124907].u1 = false; }
	       else { this.upgrades[124907].u1 = true; }
            }
            else {
              this.upgrades[124907] = {_id: 124907, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W175: {
          get: function() {
            if (this.upgrades[131909]) { return this.upgrades[131909].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131909]) {
	       if (this.upgrades[131909].u1) { this.upgrades[131909].u1 = false; }
	       else { this.upgrades[131909].u1 = true; }
            }
            else {
              this.upgrades[131909] = {_id: 131909, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S180: {
          get: function() {
            if (this.upgrades[130407]) { return this.upgrades[130407].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130407]) {
	       if (this.upgrades[130407].u1) { this.upgrades[130407].u1 = false; }
	       else { this.upgrades[130407].u1 = true; }
            }
            else {
              this.upgrades[130407] = {_id: 130407, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C150: {
          get: function() {
            if (this.upgrades[126208]) { return this.upgrades[126208].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126208]) {
	       if (this.upgrades[126208].u1) { this.upgrades[126208].u1 = false; }
	       else { this.upgrades[126208].u1 = true; }
            }
            else {
              this.upgrades[126208] = {_id: 126208, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D200: {
          get: function() {
            if (this.upgrades[127409]) { return this.upgrades[127409].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127409]) {
	       if (this.upgrades[127409].u1) { this.upgrades[127409].u1 = false; }
	       else { this.upgrades[127409].u1 = true; }
            }
            else {
              this.upgrades[127409] = {_id: 127409, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E150: {
          get: function() {
            if (this.upgrades[128608]) { return this.upgrades[128608].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128608]) {
	       if (this.upgrades[128608].u1) { this.upgrades[128608].u1 = false; }
	       else { this.upgrades[128608].u1 = true; }
            }
            else {
              this.upgrades[128608] = {_id: 128608, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A135: {
          get: function() {
            if (this.upgrades[123808]) { return this.upgrades[123808].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[123808]) {
	       if (this.upgrades[123808].u1) { this.upgrades[123808].u1 = false; }
	       else { this.upgrades[123808].u1 = true; }
            }
            else {
              this.upgrades[123808] = {_id: 123808, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W180: {
          get: function() {
            if (this.upgrades[131706]) { return this.upgrades[131706].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131706]) {
	       if (this.upgrades[131706].u1) { this.upgrades[131706].u1 = false; }
	       else { this.upgrades[131706].u1 = true; }
            }
            else {
              this.upgrades[131706] = {_id: 131706, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S200: {
          get: function() {
            if (this.upgrades[130110]) { return this.upgrades[130110].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130110]) {
	       if (this.upgrades[130110].u1) { this.upgrades[130110].u1 = false; }
	       else { this.upgrades[130110].u1 = true; }
            }
            else {
              this.upgrades[130110] = {_id: 130110, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C175: {
          get: function() {
            if (this.upgrades[125409]) { return this.upgrades[125409].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125409]) {
	       if (this.upgrades[125409].u1) { this.upgrades[125409].u1 = false; }
	       else { this.upgrades[125409].u1 = true; }
            }
            else {
              this.upgrades[125409] = {_id: 125409, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D205: {
          get: function() {
            if (this.upgrades[126507]) { return this.upgrades[126507].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126507]) {
	       if (this.upgrades[126507].u1) { this.upgrades[126507].u1 = false; }
	       else { this.upgrades[126507].u1 = true; }
            }
            else {
              this.upgrades[126507] = {_id: 126507, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E200: {
          get: function() {
            if (this.upgrades[127709]) { return this.upgrades[127709].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127709]) {
	       if (this.upgrades[127709].u1) { this.upgrades[127709].u1 = false; }
	       else { this.upgrades[127709].u1 = true; }
            }
            else {
              this.upgrades[127709] = {_id: 127709, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A150: {
          get: function() {
            if (this.upgrades[124109]) { return this.upgrades[124109].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124109]) {
	       if (this.upgrades[124109].u1) { this.upgrades[124109].u1 = false; }
	       else { this.upgrades[124109].u1 = true; }
            }
            else {
              this.upgrades[124109] = {_id: 124109, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W200: {
          get: function() {
            if (this.upgrades[131407]) { return this.upgrades[131407].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131407]) {
	       if (this.upgrades[131407].u1) { this.upgrades[131407].u1 = false; }
	       else { this.upgrades[131407].u1 = true; }
            }
            else {
              this.upgrades[131407] = {_id: 131407, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S215: {
          get: function() {
            if (this.upgrades[130709]) { return this.upgrades[130709].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130709]) {
	       if (this.upgrades[130709].u1) { this.upgrades[130709].u1 = false; }
	       else { this.upgrades[130709].u1 = true; }
            }
            else {
              this.upgrades[130709] = {_id: 130709, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C200: {
          get: function() {
            if (this.upgrades[125610]) { return this.upgrades[125610].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125610]) {
	       if (this.upgrades[125610].u1) { this.upgrades[125610].u1 = false; }
	       else { this.upgrades[125610].u1 = true; }
            }
            else {
              this.upgrades[125610] = {_id: 125610, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D225: {
          get: function() {
            if (this.upgrades[127610]) { return this.upgrades[127610].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127610]) {
	       if (this.upgrades[127610].u1) { this.upgrades[127610].u1 = false; }
	       else { this.upgrades[127610].u1 = true; }
            }
            else {
              this.upgrades[127610] = {_id: 127610, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E225: {
          get: function() {
            if (this.upgrades[128510]) { return this.upgrades[128510].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128510]) {
	       if (this.upgrades[128510].u1) { this.upgrades[128510].u1 = false; }
	       else { this.upgrades[128510].u1 = true; }
            }
            else {
              this.upgrades[128510] = {_id: 128510, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A175: {
          get: function() {
            if (this.upgrades[124710]) { return this.upgrades[124710].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124710]) {
	       if (this.upgrades[124710].u1) { this.upgrades[124710].u1 = false; }
	       else { this.upgrades[124710].u1 = true; }
            }
            else {
              this.upgrades[124710] = {_id: 124710, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W205: {
          get: function() {
            if (this.upgrades[131108]) { return this.upgrades[131108].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131108]) {
	       if (this.upgrades[131108].u1) { this.upgrades[131108].u1 = false; }
	       else { this.upgrades[131108].u1 = true; }
            }
            else {
              this.upgrades[131108] = {_id: 131108, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S225: {
          get: function() {
            if (this.upgrades[130611]) { return this.upgrades[130611].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[130611]) {
	       if (this.upgrades[130611].u1) { this.upgrades[130611].u1 = false; }
	       else { this.upgrades[130611].u1 = true; }
            }
            else {
              this.upgrades[130611] = {_id: 130611, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C225: {
          get: function() {
            if (this.upgrades[125111]) { return this.upgrades[125111].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125111]) {
	       if (this.upgrades[125111].u1) { this.upgrades[125111].u1 = false; }
	       else { this.upgrades[125111].u1 = true; }
            }
            else {
              this.upgrades[125111] = {_id: 125111, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D245: {
          get: function() {
            if (this.upgrades[127311]) { return this.upgrades[127311].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[127311]) {
	       if (this.upgrades[127311].u1) { this.upgrades[127311].u1 = false; }
	       else { this.upgrades[127311].u1 = true; }
            }
            else {
              this.upgrades[127311] = {_id: 127311, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E230: {
          get: function() {
            if (this.upgrades[128011]) { return this.upgrades[128011].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128011]) {
	       if (this.upgrades[128011].u1) { this.upgrades[128011].u1 = false; }
	       else { this.upgrades[128011].u1 = true; }
            }
            else {
              this.upgrades[128011] = {_id: 128011, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A200: {
          get: function() {
            if (this.upgrades[123711]) { return this.upgrades[123711].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[123711]) {
	       if (this.upgrades[123711].u1) { this.upgrades[123711].u1 = false; }
	       else { this.upgrades[123711].u1 = true; }
            }
            else {
              this.upgrades[123711] = {_id: 123711, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W225: {
          get: function() {
            if (this.upgrades[131311]) { return this.upgrades[131311].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[131311]) {
	       if (this.upgrades[131311].u1) { this.upgrades[131311].u1 = false; }
	       else { this.upgrades[131311].u1 = true; }
            }
            else {
              this.upgrades[131311] = {_id: 131311, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S250: {
          get: function() {
            if (this.upgrades[129712]) { return this.upgrades[129712].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[129712]) {
	       if (this.upgrades[129712].u1) { this.upgrades[129712].u1 = false; }
	       else { this.upgrades[129712].u1 = true; }
            }
            else {
              this.upgrades[129712] = {_id: 129712, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C250: {
          get: function() {
            if (this.upgrades[125812]) { return this.upgrades[125812].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[125812]) {
	       if (this.upgrades[125812].u1) { this.upgrades[125812].u1 = false; }
	       else { this.upgrades[125812].u1 = true; }
            }
            else {
              this.upgrades[125812] = {_id: 125812, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D250: {
          get: function() {
            if (this.upgrades[126712]) { return this.upgrades[126712].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[126712]) {
	       if (this.upgrades[126712].u1) { this.upgrades[126712].u1 = false; }
	       else { this.upgrades[126712].u1 = true; }
            }
            else {
              this.upgrades[126712] = {_id: 126712, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E250: {
          get: function() {
            if (this.upgrades[128912]) { return this.upgrades[128912].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[128912]) {
	       if (this.upgrades[128912].u1) { this.upgrades[128912].u1 = false; }
	       else { this.upgrades[128912].u1 = true; }
            }
            else {
              this.upgrades[128912] = {_id: 128912, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A250: {
          get: function() {
            if (this.upgrades[124412]) { return this.upgrades[124412].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[124412]) {
	       if (this.upgrades[124412].u1) { this.upgrades[124412].u1 = false; }
	       else { this.upgrades[124412].u1 = true; }
            }
            else {
              this.upgrades[124412] = {_id: 124412, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W250: {
          get: function() {
            if (this.upgrades[132112]) { return this.upgrades[132112].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[132112]) {
	       if (this.upgrades[132112].u1) { this.upgrades[132112].u1 = false; }
	       else { this.upgrades[132112].u1 = true; }
            }
            else {
              this.upgrades[132112] = {_id: 132112, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S251: {
          get: function() {
            if (this.upgrades[144713]) { return this.upgrades[144713].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144713]) {
	       if (this.upgrades[144713].u1) { this.upgrades[144713].u1 = false; }
	       else { this.upgrades[144713].u1 = true; }
            }
            else {
              this.upgrades[144713] = {_id: 144713, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C251: {
          get: function() {
            if (this.upgrades[142613]) { return this.upgrades[142613].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142613]) {
	       if (this.upgrades[142613].u1) { this.upgrades[142613].u1 = false; }
	       else { this.upgrades[142613].u1 = true; }
            }
            else {
              this.upgrades[142613] = {_id: 142613, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D260: {
          get: function() {
            if (this.upgrades[143813]) { return this.upgrades[143813].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143813]) {
	       if (this.upgrades[143813].u1) { this.upgrades[143813].u1 = false; }
	       else { this.upgrades[143813].u1 = true; }
            }
            else {
              this.upgrades[143813] = {_id: 143813, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E260: {
          get: function() {
            if (this.upgrades[144413]) { return this.upgrades[144413].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144413]) {
	       if (this.upgrades[144413].u1) { this.upgrades[144413].u1 = false; }
	       else { this.upgrades[144413].u1 = true; }
            }
            else {
              this.upgrades[144413] = {_id: 144413, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A251: {
          get: function() {
            if (this.upgrades[142313]) { return this.upgrades[142313].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142313]) {
	       if (this.upgrades[142313].u1) { this.upgrades[142313].u1 = false; }
	       else { this.upgrades[142313].u1 = true; }
            }
            else {
              this.upgrades[142313] = {_id: 142313, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W260: {
          get: function() {
            if (this.upgrades[145413]) { return this.upgrades[145413].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145413]) {
	       if (this.upgrades[145413].u1) { this.upgrades[145413].u1 = false; }
	       else { this.upgrades[145413].u1 = true; }
            }
            else {
              this.upgrades[145413] = {_id: 145413, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S270: {
          get: function() {
            if (this.upgrades[145314]) { return this.upgrades[145314].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145314]) {
	       if (this.upgrades[145314].u1) { this.upgrades[145314].u1 = false; }
	       else { this.upgrades[145314].u1 = true; }
            }
            else {
              this.upgrades[145314] = {_id: 145314, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C300: {
          get: function() {
            if (this.upgrades[143214]) { return this.upgrades[143214].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143214]) {
	       if (this.upgrades[143214].u1) { this.upgrades[143214].u1 = false; }
	       else { this.upgrades[143214].u1 = true; }
            }
            else {
              this.upgrades[143214] = {_id: 143214, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D275: {
          get: function() {
            if (this.upgrades[143614]) { return this.upgrades[143614].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143614]) {
	       if (this.upgrades[143614].u1) { this.upgrades[143614].u1 = false; }
	       else { this.upgrades[143614].u1 = true; }
            }
            else {
              this.upgrades[143614] = {_id: 143614, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E275: {
          get: function() {
            if (this.upgrades[144214]) { return this.upgrades[144214].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144214]) {
	       if (this.upgrades[144214].u1) { this.upgrades[144214].u1 = false; }
	       else { this.upgrades[144214].u1 = true; }
            }
            else {
              this.upgrades[144214] = {_id: 144214, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A270: {
          get: function() {
            if (this.upgrades[142414]) { return this.upgrades[142414].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142414]) {
	       if (this.upgrades[142414].u1) { this.upgrades[142414].u1 = false; }
	       else { this.upgrades[142414].u1 = true; }
            }
            else {
              this.upgrades[142414] = {_id: 142414, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W275: {
          get: function() {
            if (this.upgrades[145514]) { return this.upgrades[145514].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145514]) {
	       if (this.upgrades[145514].u1) { this.upgrades[145514].u1 = false; }
	       else { this.upgrades[145514].u1 = true; }
            }
            else {
              this.upgrades[145514] = {_id: 145514, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S300: {
          get: function() {
            if (this.upgrades[144915]) { return this.upgrades[144915].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144915]) {
	       if (this.upgrades[144915].u1) { this.upgrades[144915].u1 = false; }
	       else { this.upgrades[144915].u1 = true; }
            }
            else {
              this.upgrades[144915] = {_id: 144915, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C305: {
          get: function() {
            if (this.upgrades[142815]) { return this.upgrades[142815].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142815]) {
	       if (this.upgrades[142815].u1) { this.upgrades[142815].u1 = false; }
	       else { this.upgrades[142815].u1 = true; }
            }
            else {
              this.upgrades[142815] = {_id: 142815, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D290: {
          get: function() {
            if (this.upgrades[143915]) { return this.upgrades[143915].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143915]) {
	       if (this.upgrades[143915].u1) { this.upgrades[143915].u1 = false; }
	       else { this.upgrades[143915].u1 = true; }
            }
            else {
              this.upgrades[143915] = {_id: 143915, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E290: {
          get: function() {
            if (this.upgrades[144615]) { return this.upgrades[144615].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144615]) {
	       if (this.upgrades[144615].u1) { this.upgrades[144615].u1 = false; }
	       else { this.upgrades[144615].u1 = true; }
            }
            else {
              this.upgrades[144615] = {_id: 144615, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A300: {
          get: function() {
            if (this.upgrades[142115]) { return this.upgrades[142115].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142115]) {
	       if (this.upgrades[142115].u1) { this.upgrades[142115].u1 = false; }
	       else { this.upgrades[142115].u1 = true; }
            }
            else {
              this.upgrades[142115] = {_id: 142115, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W290: {
          get: function() {
            if (this.upgrades[145615]) { return this.upgrades[145615].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145615]) {
	       if (this.upgrades[145615].u1) { this.upgrades[145615].u1 = false; }
	       else { this.upgrades[145615].u1 = true; }
            }
            else {
              this.upgrades[145615] = {_id: 145615, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S305: {
          get: function() {
            if (this.upgrades[145116]) { return this.upgrades[145116].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145116]) {
	       if (this.upgrades[145116].u1) { this.upgrades[145116].u1 = false; }
	       else { this.upgrades[145116].u1 = true; }
            }
            else {
              this.upgrades[145116] = {_id: 145116, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C330: {
          get: function() {
            if (this.upgrades[143116]) { return this.upgrades[143116].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143116]) {
	       if (this.upgrades[143116].u1) { this.upgrades[143116].u1 = false; }
	       else { this.upgrades[143116].u1 = true; }
            }
            else {
              this.upgrades[143116] = {_id: 143116, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D320: {
          get: function() {
            if (this.upgrades[143316]) { return this.upgrades[143316].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143316]) {
	       if (this.upgrades[143316].u1) { this.upgrades[143316].u1 = false; }
	       else { this.upgrades[143316].u1 = true; }
            }
            else {
              this.upgrades[143316] = {_id: 143316, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E320: {
          get: function() {
            if (this.upgrades[144516]) { return this.upgrades[144516].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144516]) {
	       if (this.upgrades[144516].u1) { this.upgrades[144516].u1 = false; }
	       else { this.upgrades[144516].u1 = true; }
            }
            else {
              this.upgrades[144516] = {_id: 144516, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A305: {
          get: function() {
            if (this.upgrades[142216]) { return this.upgrades[142216].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142216]) {
	       if (this.upgrades[142216].u1) { this.upgrades[142216].u1 = false; }
	       else { this.upgrades[142216].u1 = true; }
            }
            else {
              this.upgrades[142216] = {_id: 142216, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W320: {
          get: function() {
            if (this.upgrades[145816]) { return this.upgrades[145816].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145816]) {
	       if (this.upgrades[145816].u1) { this.upgrades[145816].u1 = false; }
	       else { this.upgrades[145816].u1 = true; }
            }
            else {
              this.upgrades[145816] = {_id: 145816, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S330: {
          get: function() {
            if (this.upgrades[145217]) { return this.upgrades[145217].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145217]) {
	       if (this.upgrades[145217].u1) { this.upgrades[145217].u1 = false; }
	       else { this.upgrades[145217].u1 = true; }
            }
            else {
              this.upgrades[145217] = {_id: 145217, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C340: {
          get: function() {
            if (this.upgrades[142717]) { return this.upgrades[142717].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142717]) {
	       if (this.upgrades[142717].u1) { this.upgrades[142717].u1 = false; }
	       else { this.upgrades[142717].u1 = true; }
            }
            else {
              this.upgrades[142717] = {_id: 142717, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D330: {
          get: function() {
            if (this.upgrades[143517]) { return this.upgrades[143517].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143517]) {
	       if (this.upgrades[143517].u1) { this.upgrades[143517].u1 = false; }
	       else { this.upgrades[143517].u1 = true; }
            }
            else {
              this.upgrades[143517] = {_id: 143517, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E330: {
          get: function() {
            if (this.upgrades[144017]) { return this.upgrades[144017].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144017]) {
	       if (this.upgrades[144017].u1) { this.upgrades[144017].u1 = false; }
	       else { this.upgrades[144017].u1 = true; }
            }
            else {
              this.upgrades[144017] = {_id: 144017, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A330: {
          get: function() {
            if (this.upgrades[141917]) { return this.upgrades[141917].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[141917]) {
	       if (this.upgrades[141917].u1) { this.upgrades[141917].u1 = false; }
	       else { this.upgrades[141917].u1 = true; }
            }
            else {
              this.upgrades[141917] = {_id: 141917, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W330: {
          get: function() {
            if (this.upgrades[145717]) { return this.upgrades[145717].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145717]) {
	       if (this.upgrades[145717].u1) { this.upgrades[145717].u1 = false; }
	       else { this.upgrades[145717].u1 = true; }
            }
            else {
              this.upgrades[145717] = {_id: 145717, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S375: {
          get: function() {
            if (this.upgrades[145018]) { return this.upgrades[145018].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145018]) {
	       if (this.upgrades[145018].u1) { this.upgrades[145018].u1 = false; }
	       else { this.upgrades[145018].u1 = true; }
            }
            else {
              this.upgrades[145018] = {_id: 145018, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C375: {
          get: function() {
            if (this.upgrades[143018]) { return this.upgrades[143018].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143018]) {
	       if (this.upgrades[143018].u1) { this.upgrades[143018].u1 = false; }
	       else { this.upgrades[143018].u1 = true; }
            }
            else {
              this.upgrades[143018] = {_id: 143018, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D350: {
          get: function() {
            if (this.upgrades[143418]) { return this.upgrades[143418].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143418]) {
	       if (this.upgrades[143418].u1) { this.upgrades[143418].u1 = false; }
	       else { this.upgrades[143418].u1 = true; }
            }
            else {
              this.upgrades[143418] = {_id: 143418, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E350: {
          get: function() {
            if (this.upgrades[144318]) { return this.upgrades[144318].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144318]) {
	       if (this.upgrades[144318].u1) { this.upgrades[144318].u1 = false; }
	       else { this.upgrades[144318].u1 = true; }
            }
            else {
              this.upgrades[144318] = {_id: 144318, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A375: {
          get: function() {
            if (this.upgrades[142518]) { return this.upgrades[142518].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142518]) {
	       if (this.upgrades[142518].u1) { this.upgrades[142518].u1 = false; }
	       else { this.upgrades[142518].u1 = true; }
            }
            else {
              this.upgrades[142518] = {_id: 142518, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W350: {
          get: function() {
            if (this.upgrades[146018]) { return this.upgrades[146018].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[146018]) {
	       if (this.upgrades[146018].u1) { this.upgrades[146018].u1 = false; }
	       else { this.upgrades[146018].u1 = true; }
            }
            else {
              this.upgrades[146018] = {_id: 146018, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S400: {
          get: function() {
            if (this.upgrades[144819]) { return this.upgrades[144819].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144819]) {
	       if (this.upgrades[144819].u1) { this.upgrades[144819].u1 = false; }
	       else { this.upgrades[144819].u1 = true; }
            }
            else {
              this.upgrades[144819] = {_id: 144819, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C400: {
          get: function() {
            if (this.upgrades[142919]) { return this.upgrades[142919].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142919]) {
	       if (this.upgrades[142919].u1) { this.upgrades[142919].u1 = false; }
	       else { this.upgrades[142919].u1 = true; }
            }
            else {
              this.upgrades[142919] = {_id: 142919, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D400: {
          get: function() {
            if (this.upgrades[143719]) { return this.upgrades[143719].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[143719]) {
	       if (this.upgrades[143719].u1) { this.upgrades[143719].u1 = false; }
	       else { this.upgrades[143719].u1 = true; }
            }
            else {
              this.upgrades[143719] = {_id: 143719, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E400: {
          get: function() {
            if (this.upgrades[144119]) { return this.upgrades[144119].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[144119]) {
	       if (this.upgrades[144119].u1) { this.upgrades[144119].u1 = false; }
	       else { this.upgrades[144119].u1 = true; }
            }
            else {
              this.upgrades[144119] = {_id: 144119, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A400: {
          get: function() {
            if (this.upgrades[142019]) { return this.upgrades[142019].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[142019]) {
	       if (this.upgrades[142019].u1) { this.upgrades[142019].u1 = false; }
	       else { this.upgrades[142019].u1 = true; }
            }
            else {
              this.upgrades[142019] = {_id: 142019, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W400: {
          get: function() {
            if (this.upgrades[145919]) { return this.upgrades[145919].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[145919]) {
	       if (this.upgrades[145919].u1) { this.upgrades[145919].u1 = false; }
	       else { this.upgrades[145919].u1 = true; }
            }
            else {
              this.upgrades[145919] = {_id: 145919, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S435: {
          get: function() {
            if (this.upgrades[153920]) { return this.upgrades[153920].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153920]) {
	       if (this.upgrades[153920].u1) { this.upgrades[153920].u1 = false; }
	       else { this.upgrades[153920].u1 = true; }
            }
            else {
              this.upgrades[153920] = {_id: 153920, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C405: {
          get: function() {
            if (this.upgrades[151520]) { return this.upgrades[151520].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[151520]) {
	       if (this.upgrades[151520].u1) { this.upgrades[151520].u1 = false; }
	       else { this.upgrades[151520].u1 = true; }
            }
            else {
              this.upgrades[151520] = {_id: 151520, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D435: {
          get: function() {
            if (this.upgrades[152720]) { return this.upgrades[152720].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152720]) {
	       if (this.upgrades[152720].u1) { this.upgrades[152720].u1 = false; }
	       else { this.upgrades[152720].u1 = true; }
            }
            else {
              this.upgrades[152720] = {_id: 152720, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E410: {
          get: function() {
            if (this.upgrades[153320]) { return this.upgrades[153320].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153320]) {
	       if (this.upgrades[153320].u1) { this.upgrades[153320].u1 = false; }
	       else { this.upgrades[153320].u1 = true; }
            }
            else {
              this.upgrades[153320] = {_id: 153320, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A410: {
          get: function() {
            if (this.upgrades[152420]) { return this.upgrades[152420].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152420]) {
	       if (this.upgrades[152420].u1) { this.upgrades[152420].u1 = false; }
	       else { this.upgrades[152420].u1 = true; }
            }
            else {
              this.upgrades[152420] = {_id: 152420, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W405: {
          get: function() {
            if (this.upgrades[154120]) { return this.upgrades[154120].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[154120]) {
	       if (this.upgrades[154120].u1) { this.upgrades[154120].u1 = false; }
	       else { this.upgrades[154120].u1 = true; }
            }
            else {
              this.upgrades[154120] = {_id: 154120, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S460: {
          get: function() {
            if (this.upgrades[153621]) { return this.upgrades[153621].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153621]) {
	       if (this.upgrades[153621].u1) { this.upgrades[153621].u1 = false; }
	       else { this.upgrades[153621].u1 = true; }
            }
            else {
              this.upgrades[153621] = {_id: 153621, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C460: {
          get: function() {
            if (this.upgrades[151421]) { return this.upgrades[151421].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[151421]) {
	       if (this.upgrades[151421].u1) { this.upgrades[151421].u1 = false; }
	       else { this.upgrades[151421].u1 = true; }
            }
            else {
              this.upgrades[151421] = {_id: 151421, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D480: {
          get: function() {
            if (this.upgrades[152621]) { return this.upgrades[152621].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152621]) {
	       if (this.upgrades[152621].u1) { this.upgrades[152621].u1 = false; }
	       else { this.upgrades[152621].u1 = true; }
            }
            else {
              this.upgrades[152621] = {_id: 152621, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E460: {
          get: function() {
            if (this.upgrades[153121]) { return this.upgrades[153121].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153121]) {
	       if (this.upgrades[153121].u1) { this.upgrades[153121].u1 = false; }
	       else { this.upgrades[153121].u1 = true; }
            }
            else {
              this.upgrades[153121] = {_id: 153121, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A480: {
          get: function() {
            if (this.upgrades[152521]) { return this.upgrades[152521].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152521]) {
	       if (this.upgrades[152521].u1) { this.upgrades[152521].u1 = false; }
	       else { this.upgrades[152521].u1 = true; }
            }
            else {
              this.upgrades[152521] = {_id: 152521, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W520: {
          get: function() {
            if (this.upgrades[154421]) { return this.upgrades[154421].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[154421]) {
	       if (this.upgrades[154421].u1) { this.upgrades[154421].u1 = false; }
	       else { this.upgrades[154421].u1 = true; }
            }
            else {
              this.upgrades[154421] = {_id: 154421, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S500: {
          get: function() {
            if (this.upgrades[153722]) { return this.upgrades[153722].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153722]) {
	       if (this.upgrades[153722].u1) { this.upgrades[153722].u1 = false; }
	       else { this.upgrades[153722].u1 = true; }
            }
            else {
              this.upgrades[153722] = {_id: 153722, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C500: {
          get: function() {
            if (this.upgrades[151622]) { return this.upgrades[151622].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[151622]) {
	       if (this.upgrades[151622].u1) { this.upgrades[151622].u1 = false; }
	       else { this.upgrades[151622].u1 = true; }
            }
            else {
              this.upgrades[151622] = {_id: 151622, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D525: {
          get: function() {
            if (this.upgrades[152922]) { return this.upgrades[152922].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152922]) {
	       if (this.upgrades[152922].u1) { this.upgrades[152922].u1 = false; }
	       else { this.upgrades[152922].u1 = true; }
            }
            else {
              this.upgrades[152922] = {_id: 152922, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E480: {
          get: function() {
            if (this.upgrades[153522]) { return this.upgrades[153522].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153522]) {
	       if (this.upgrades[153522].u1) { this.upgrades[153522].u1 = false; }
	       else { this.upgrades[153522].u1 = true; }
            }
            else {
              this.upgrades[153522] = {_id: 153522, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A495: {
          get: function() {
            if (this.upgrades[152122]) { return this.upgrades[152122].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152122]) {
	       if (this.upgrades[152122].u1) { this.upgrades[152122].u1 = false; }
	       else { this.upgrades[152122].u1 = true; }
            }
            else {
              this.upgrades[152122] = {_id: 152122, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W525: {
          get: function() {
            if (this.upgrades[154222]) { return this.upgrades[154222].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[154222]) {
	       if (this.upgrades[154222].u1) { this.upgrades[154222].u1 = false; }
	       else { this.upgrades[154222].u1 = true; }
            }
            else {
              this.upgrades[154222] = {_id: 154222, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S545: {
          get: function() {
            if (this.upgrades[153823]) { return this.upgrades[153823].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153823]) {
	       if (this.upgrades[153823].u1) { this.upgrades[153823].u1 = false; }
	       else { this.upgrades[153823].u1 = true; }
            }
            else {
              this.upgrades[153823] = {_id: 153823, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C520: {
          get: function() {
            if (this.upgrades[151323]) { return this.upgrades[151323].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[151323]) {
	       if (this.upgrades[151323].u1) { this.upgrades[151323].u1 = false; }
	       else { this.upgrades[151323].u1 = true; }
            }
            else {
              this.upgrades[151323] = {_id: 151323, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D560: {
          get: function() {
            if (this.upgrades[153023]) { return this.upgrades[153023].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153023]) {
	       if (this.upgrades[153023].u1) { this.upgrades[153023].u1 = false; }
	       else { this.upgrades[153023].u1 = true; }
            }
            else {
              this.upgrades[153023] = {_id: 153023, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E495: {
          get: function() {
            if (this.upgrades[153223]) { return this.upgrades[153223].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153223]) {
	       if (this.upgrades[153223].u1) { this.upgrades[153223].u1 = false; }
	       else { this.upgrades[153223].u1 = true; }
            }
            else {
              this.upgrades[153223] = {_id: 153223, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A545: {
          get: function() {
            if (this.upgrades[152323]) { return this.upgrades[152323].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152323]) {
	       if (this.upgrades[152323].u1) { this.upgrades[152323].u1 = false; }
	       else { this.upgrades[152323].u1 = true; }
            }
            else {
              this.upgrades[152323] = {_id: 152323, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W560: {
          get: function() {
            if (this.upgrades[154323]) { return this.upgrades[154323].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[154323]) {
	       if (this.upgrades[154323].u1) { this.upgrades[154323].u1 = false; }
	       else { this.upgrades[154323].u1 = true; }
            }
            else {
              this.upgrades[154323] = {_id: 154323, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S590: {
          get: function() {
            if (this.upgrades[154024]) { return this.upgrades[154024].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[154024]) {
	       if (this.upgrades[154024].u1) { this.upgrades[154024].u1 = false; }
	       else { this.upgrades[154024].u1 = true; }
            }
            else {
              this.upgrades[154024] = {_id: 154024, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C590: {
          get: function() {
            if (this.upgrades[151224]) { return this.upgrades[151224].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[151224]) {
	       if (this.upgrades[151224].u1) { this.upgrades[151224].u1 = false; }
	       else { this.upgrades[151224].u1 = true; }
            }
            else {
              this.upgrades[151224] = {_id: 151224, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D590: {
          get: function() {
            if (this.upgrades[152824]) { return this.upgrades[152824].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152824]) {
	       if (this.upgrades[152824].u1) { this.upgrades[152824].u1 = false; }
	       else { this.upgrades[152824].u1 = true; }
            }
            else {
              this.upgrades[152824] = {_id: 152824, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E590: {
          get: function() {
            if (this.upgrades[153424]) { return this.upgrades[153424].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[153424]) {
	       if (this.upgrades[153424].u1) { this.upgrades[153424].u1 = false; }
	       else { this.upgrades[153424].u1 = true; }
            }
            else {
              this.upgrades[153424] = {_id: 153424, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A590: {
          get: function() {
            if (this.upgrades[152224]) { return this.upgrades[152224].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[152224]) {
	       if (this.upgrades[152224].u1) { this.upgrades[152224].u1 = false; }
	       else { this.upgrades[152224].u1 = true; }
            }
            else {
              this.upgrades[152224] = {_id: 152224, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W590: {
          get: function() {
            if (this.upgrades[154524]) { return this.upgrades[154524].u1; }
              else { return false; }
          },
          set: function() {
            if (this.upgrades[154524]) {
              if (this.upgrades[154524].u1) { this.upgrades[154524].u1 = false; }
              else { this.upgrades[154524].u1 = true; }
            }
            else {
              this.upgrades[154524] = {_id: 154524, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S1275: {
          get: function() {
            if (this.upgrades[162925]) { return this.upgrades[162925].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162925]) {
	       if (this.upgrades[162925].u1) { this.upgrades[162925].u1 = false; }
	       else { this.upgrades[162925].u1 = true; }
            }
            else {
              this.upgrades[162925] = {_id: 162925, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C1300: {
          get: function() {
            if (this.upgrades[162125]) { return this.upgrades[162125].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162125]) {
	       if (this.upgrades[162125].u1) { this.upgrades[162125].u1 = false; }
	       else { this.upgrades[162125].u1 = true; }
            }
            else {
              this.upgrades[162125] = {_id: 162125, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D1125: {
          get: function() {
            if (this.upgrades[162225]) { return this.upgrades[162225].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162225]) {
	       if (this.upgrades[162225].u1) { this.upgrades[162225].u1 = false; }
	       else { this.upgrades[162225].u1 = true; }
            }
            else {
              this.upgrades[162225] = {_id: 162225, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E1225: {
          get: function() {
            if (this.upgrades[162525]) { return this.upgrades[162525].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162525]) {
	       if (this.upgrades[162525].u1) { this.upgrades[162525].u1 = false; }
	       else { this.upgrades[162525].u1 = true; }
            }
            else {
              this.upgrades[162525] = {_id: 162525, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A1200: {
          get: function() {
            if (this.upgrades[161725]) { return this.upgrades[161725].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[161725]) {
	       if (this.upgrades[161725].u1) { this.upgrades[161725].u1 = false; }
	       else { this.upgrades[161725].u1 = true; }
            }
            else {
              this.upgrades[161725] = {_id: 161725, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W1275: {
          get: function() {
            if (this.upgrades[163125]) { return this.upgrades[163125].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[163125]) {
	       if (this.upgrades[163125].u1) { this.upgrades[163125].u1 = false; }
	       else { this.upgrades[163125].u1 = true; }
            }
            else {
              this.upgrades[163125] = {_id: 163125, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S1450: {
          get: function() {
            if (this.upgrades[163026]) { return this.upgrades[163026].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[163026]) {
	       if (this.upgrades[163026].u1) { this.upgrades[163026].u1 = false; }
	       else { this.upgrades[163026].u1 = true; }
            }
            else {
              this.upgrades[163026] = {_id: 163026, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C1325: {
          get: function() {
            if (this.upgrades[162026]) { return this.upgrades[162026].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162026]) {
	       if (this.upgrades[162026].u1) { this.upgrades[162026].u1 = false; }
	       else { this.upgrades[162026].u1 = true; }
            }
            else {
              this.upgrades[162026] = {_id: 162026, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D1275: {
          get: function() {
            if (this.upgrades[162426]) { return this.upgrades[162426].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162426]) {
	       if (this.upgrades[162426].u1) { this.upgrades[162426].u1 = false; }
	       else { this.upgrades[162426].u1 = true; }
            }
            else {
              this.upgrades[162426] = {_id: 162426, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E1325: {
          get: function() {
            if (this.upgrades[162626]) { return this.upgrades[162626].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162626]) {
	       if (this.upgrades[162626].u1) { this.upgrades[162626].u1 = false; }
	       else { this.upgrades[162626].u1 = true; }
            }
            else {
              this.upgrades[162626] = {_id: 162626, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A1325: {
          get: function() {
            if (this.upgrades[161626]) { return this.upgrades[161626].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[161626]) {
	       if (this.upgrades[161626].u1) { this.upgrades[161626].u1 = false; }
	       else { this.upgrades[161626].u1 = true; }
            }
            else {
              this.upgrades[161626] = {_id: 161626, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W1375: {
          get: function() {
            if (this.upgrades[163326]) { return this.upgrades[163326].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[163326]) {
	       if (this.upgrades[163326].u1) { this.upgrades[163326].u1 = false; }
	       else { this.upgrades[163326].u1 = true; }
            }
            else {
              this.upgrades[163326] = {_id: 163326, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S1500: {
          get: function() {
            if (this.upgrades[162827]) { return this.upgrades[162827].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162827]) {
	       if (this.upgrades[162827].u1) { this.upgrades[162827].u1 = false; }
	       else { this.upgrades[162827].u1 = true; }
            }
            else {
              this.upgrades[162827] = {_id: 162827, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C1500: {
          get: function() {
            if (this.upgrades[161927]) { return this.upgrades[161927].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[161927]) {
	       if (this.upgrades[161927].u1) { this.upgrades[161927].u1 = false; }
	       else { this.upgrades[161927].u1 = true; }
            }
            else {
              this.upgrades[161927] = {_id: 161927, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D1375: {
          get: function() {
            if (this.upgrades[162327]) { return this.upgrades[162327].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162327]) {
	       if (this.upgrades[162327].u1) { this.upgrades[162327].u1 = false; }
	       else { this.upgrades[162327].u1 = true; }
            }
            else {
              this.upgrades[162327] = {_id: 162327, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E1425: {
          get: function() {
            if (this.upgrades[162727]) { return this.upgrades[162727].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[162727]) {
	       if (this.upgrades[162727].u1) { this.upgrades[162727].u1 = false; }
	       else { this.upgrades[162727].u1 = true; }
            }
            else {
              this.upgrades[162727] = {_id: 162727, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A1500: {
          get: function() {
            if (this.upgrades[161827]) { return this.upgrades[161827].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[161827]) {
	       if (this.upgrades[161827].u1) { this.upgrades[161827].u1 = false; }
	       else { this.upgrades[161827].u1 = true; }
            }
            else {
              this.upgrades[161827] = {_id: 161827, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W1400: {
          get: function() {
            if (this.upgrades[163227]) { return this.upgrades[163227].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[163227]) {
	       if (this.upgrades[163227].u1) { this.upgrades[163227].u1 = false; }
	       else { this.upgrades[163227].u1 = true; }
            }
            else {
              this.upgrades[163227] = {_id: 163227, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S2875: {
          get: function() {
            if (this.upgrades[171828]) { return this.upgrades[171828].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171828]) {
	       if (this.upgrades[171828].u1) { this.upgrades[171828].u1 = false; }
	       else { this.upgrades[171828].u1 = true; }
            }
            else {
              this.upgrades[171828] = {_id: 171828, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        S3200: {
          get: function() {
            if (this.upgrades[171729]) { return this.upgrades[171729].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171729]) {
	       if (this.upgrades[171729].u1) { this.upgrades[171729].u1 = false; }
	       else { this.upgrades[171729].u1 = true; }
            }
            else {
              this.upgrades[171729] = {_id: 171729, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C3000: {
          get: function() {
            if (this.upgrades[171128]) { return this.upgrades[171128].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171128]) {
	       if (this.upgrades[171128].u1) { this.upgrades[171128].u1 = false; }
	       else { this.upgrades[171128].u1 = true; }
            }
            else {
              this.upgrades[171128] = {_id: 171128, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        C3100: {
          get: function() {
            if (this.upgrades[171229]) { return this.upgrades[171229].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171229]) {
	       if (this.upgrades[171229].u1) { this.upgrades[171229].u1 = false; }
	       else { this.upgrades[171229].u1 = true; }
            }
            else {
              this.upgrades[171229] = {_id: 171229, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D2775: {
          get: function() {
            if (this.upgrades[171328]) { return this.upgrades[171328].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171328]) {
	       if (this.upgrades[171328].u1) { this.upgrades[171328].u1 = false; }
	       else { this.upgrades[171328].u1 = true; }
            }
            else {
              this.upgrades[171328] = {_id: 171328, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        D3350: {
          get: function() {
            if (this.upgrades[171429]) { return this.upgrades[171429].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171429]) {
	       if (this.upgrades[171429].u1) { this.upgrades[171429].u1 = false; }
	       else { this.upgrades[171429].u1 = true; }
            }
            else {
              this.upgrades[171429] = {_id: 171429, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E3250: {
          get: function() {
            if (this.upgrades[171528]) { return this.upgrades[171528].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171528]) {
	       if (this.upgrades[171528].u1) { this.upgrades[171528].u1 = false; }
	       else { this.upgrades[171528].u1 = true; }
            }
            else {
              this.upgrades[171528] = {_id: 171528, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        E3300: {
          get: function() {
            if (this.upgrades[171629]) { return this.upgrades[171629].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171629]) {
	       if (this.upgrades[171629].u1) { this.upgrades[171629].u1 = false; }
	       else { this.upgrades[171629].u1 = true; }
            }
            else {
              this.upgrades[171629] = {_id: 171629, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A2950: {
          get: function() {
            if (this.upgrades[171028]) { return this.upgrades[171028].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171028]) {
	       if (this.upgrades[171028].u1) { this.upgrades[171028].u1 = false; }
	       else { this.upgrades[171028].u1 = true; }
            }
            else {
              this.upgrades[171028] = {_id: 171028, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        A3400: {
          get: function() {
            if (this.upgrades[170929]) { return this.upgrades[170929].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[170929]) {
	       if (this.upgrades[170929].u1) { this.upgrades[170929].u1 = false; }
	       else { this.upgrades[170929].u1 = true; }
            }
            else {
              this.upgrades[170929] = {_id: 170929, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W3050: {
          get: function() {
            if (this.upgrades[171928]) { return this.upgrades[171928].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[171928]) {
	       if (this.upgrades[171928].u1) { this.upgrades[171928].u1 = false; }
	       else { this.upgrades[171928].u1 = true; }
            }
            else {
              this.upgrades[171928] = {_id: 171928, u1: true, u2: false, u3: false, s: 0};
            }
          }
        },
        W3150: {
          get: function() {
            if (this.upgrades[172029]) { return this.upgrades[172029].u1; }
      	       else { return false; }
      	   },
          set: function() {
            if (this.upgrades[172029]) {
	       if (this.upgrades[172029].u1) { this.upgrades[172029].u1 = false; }
	       else { this.upgrades[172029].u1 = true; }
            }
            else {
              this.upgrades[172029] = {_id: 172029, u1: true, u2: false, u3: false, s: 0};
            }
          }
        }
      }
    });

    Vue.component('widget-trophy-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      + '</tr>'
    });

    Vue.component('widget-event-trophy-header', {
      template: '<tr>'
      + '<th><span class="statheader">Name</span></th>'
      + '<th><span class="statheader">Owned</span></th>'
      + '<th><span class="statheader">Completed (this year)</span></th>'
      + '<th><span class="statheader">Completed (total)</span></th>'
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
            if (this.trophies[this.id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.unlocked && !x) { delete this.trophies[this.id]; }
            else if (!this.unlocked && x) { this.trophies[this.id] = {_id: this.id, u1: false}; }
          }
        },
        trophyU1: {
          get: function() {
            return this.unlocked && this.trophies[this.id].u1;
          },
          set: function(x) {
            if (this.unlocked) { this.trophies[this.id] = [x]; }
          }
        }
      }
    });

    Vue.component('widget-event-trophy', {   // simple, non-arrayed trophies
      props: {
        'trophies': Object,
        'name': String,
        'id': String
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input type="checkbox" v-model="unlocked" number></input></td>'
      + '<td><input type="checkbox" v-model="trophyU1" disabled></input></td>'
      + '<td><input v-model="trophyU2" number></input></td>'
      + '</tr>',
      computed: {
        unlocked: {
          get: function() {
            if (this.trophies[this.id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.trophies[this.id] && !x) { 
              this.trophyU1 = false;
              this.trophyU2 = 0;
              delete this.trophies[this.id];
            }
            else if (!this.trophies[this.id] && x) {
              Vue.set(View.save.trophies, this.id, {_id: this.id, u1: true, u2: 1});
            }
          }
        },
        trophyU1: {
          get: function() {
            return this.trophies[this.id] && this.trophies[this.id].u1;
          },
          set: function(x) {
            if (this.trophies[this.id]) { this.trophies[this.id].u1 = x; }
          }
        },
        trophyU2: {
          get: function() {
            return this.trophies[this.id]?this.trophies[this.id].u2:0;
          },
          set: function(x) {
            if (!this.trophies[this.id] && x > 0) {
              this.unlocked = true;
            }
            this.trophies[this.id].u2 = x;
          }
        }
      }
    });

    Vue.component('widget-trophy-dropdown', {    // trophy arrays in full
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
              if (this.trophies[trophyIDs[this.filter][i]]) { return trophyIDs[this.filter][i]; }
            }
            return -1;
          },
          set: function(x) {
            for (var i = 0; i < this.options.length-1; i++) {
              var tid = trophyIDs[this.filter][i];
              if (!x) {
                delete this.trophies[tid];
              } else {
                  if (tid <= x) {
                    this.trophies[tid] = {_id:tid, u1:false};
                  } else {
                    delete this.trophies[tid];
                  }
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
	
    Vue.component('widget-trophy-comp-dropdown', {    // trophy with compressed arrays
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
              if (this.trophies[trophyIDs[this.filter][i]]) { return trophyIDs[this.filter][i]; }
            }
            return -1;
          },
          set: function(x) {
            for (var i = 0; i < this.options.length-1; i++) {
              var tid = trophyIDs[this.filter][i];
              if (this.trophies[tid]) delete this.trophies[tid];
            }
            this.trophies[x] = {_id:x, u1:true};
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
        lsinput: '',
        lsmsg: '',
        LightningRod: [[[9, 9, 8, 8, 10, 8, 10, 8, 8, 9, 9], [1348656067, 2066742637, 724761641, 1139776337, 1832831073, 2874410, 314652574, 29728603, 57855160, 80741010, 798827580]],
                       [[9, 8, 10, 10, 9, 9, 10, 10, 8, 9], [1348656067, 195509834, 1092747531, 1369388690, 124895406, 1889967370, 778094957, 1054736116, 145769791, 798827580]],
                       [[10, 9, 9, 10, 9, 10, 9, 9, 10], [1019766806, 1010581720, 293919951, 1832831073, 274387307, 314652574, 233911564, 571758769, 1127716841]],
                       [[10, 10, 9, 10, 10, 9, 10, 10], [1019766806, 72980725, 44627026, 1267687915, 314652574, 142176518, 965174051, 1127716841]],
                       [[10, 10, 10, 10, 10, 10, 10], [454623648, 54592755, 260059819, 404214639, 462244724, 255012428, 442091522]],
                       [[12, 12, 12, 12, 12, 12], [770473881, 821234634, 250490584, 1896993063, 643171274, 89562065]],
                       [[14, 13, 12, 13, 14], [770473881, 419517449, 527131743, 819876890, 1377009766]],
                       [[15, 15, 15, 15], [1408849714, 355243782, 951868488, 738633933]],
                       [[18, 17, 18], [918066031, 129106684, 1050527706]],
                       [[28, 28], [1202476373, 447787816]]],
        buildingcount: 0,
        buildingnames: ['Alchemist Lab', 'Ancient Pyramid', 'Blacksmith', 'Cathedral', 'Citadel', 'Dark Temple', 'Deep Mine', 'Evil Fortress', 'Farm', 'Hall of Legends', 'Heaven\'s Gate', 'Hell Portal', 'Inn', 'Iron Stronghold', 'Knights Joust', 'Labyrinth', 'Monastery', 'Necropolis', 'Orcish Arena', 'Royal Castle', 'Slave Pen', 'Stone Pillars', 'Warrior Barracks', 'Witch Conclave', 'Wizard Tower'],
        currentbuildingsLS: [],
        currentbuildingsM: [],
        LSavail: 'False',
        miracleinput: '',
        miraclemsg: '',
        miracleAvail: 'False',
        outputsave: null,
        save: util.save.blankSave(),
        spells: util.assoc.spells,
        spellsRNG: util.assoc.spellsRNG,
        factions: util.assoc.faction,
        currentTime: Math.floor(new Date().getTime()/1000)
      },
      watch: {
        lsinput: function(data) {
          var selIndex = this.currentbuildingsLS.findIndex(x => x == this.lsinput)
          var rodIndex = 11 - this.buildingcount    // miracle Id 143018
          var hits = this.LightningRod[rodIndex][0][selIndex]
          var seed = this.LightningRod[rodIndex][1][selIndex]
          this.save.spells[13].s = seed
          this.lsmsg = 'Hit streak = ' + hits
        },
        miracleinput: function(data) {
          var selIndex = this.currentbuildingsM.findIndex(x => x == this.miracleinput)
          var rodIndex = 11 - this.buildingcount
          var hits = this.LightningRod[rodIndex][0][selIndex]
          var seed = this.LightningRod[rodIndex][1][selIndex]
          this.save.upgrades[143719].s = seed
          this.miraclemsg = 'Hit streak = ' + hits
        }
      },
      methods: {
        genSave: function(event) {
          this.outputsave = SaveHandler.Encode(this.save);
        },
        updateTime: function() { 
          this.currentTime = Math.floor(new Date().getTime()/1000);
        },
        checkLSavail: function () {
          if (this.save.faction != 6) {
            if (this.save.faction == 11) {
              if (this.save.mercSpell1 == 13 || this.save.mercSpell2 == 13) {
                this.LSavail = 'True'
              }
            }
          } else { this.LSavail = 'True' }
          for (var i of [9,13,3,23,15,25,4,5,20,11,21,19,24,6,18,8,12,7,22,1,17,16,14,2,10]) {
            if (this.save.buildings[i].q > 0) {
              if ((i ==10) && (this.save.upgrades[143018].u1 == true)) {
                continue
              }
              this.currentbuildingsLS.push(this.buildingnames[this.save.buildings[i].id-1])
              this.buildingcount += 1
            }
          }
          if (this.buildingcount < 2) { this.LSavail = 'False' }
        },
        checkMiracleAvail: function () {
          if (this.save.upgrades[143719] != null) {
            if (this.save.upgrades[143719].u1 == true) {
                this.miracleAvail = 'True'
            } else {
              this.miracleAvail = 'False'
            }
          }
          this.buildingcount = 0
          for (var i of [9,13,3,23,15,25,4,5,20,11,21,19,24,6,18,8,12,7,22,1,17,16,14,2,10]) {
            if (this.save.buildings[i].q > 0) {
              this.currentbuildingsM.push(this.buildingnames[this.save.buildings[i].id-1])
              this.buildingcount += 1
            }
          }
          if (this.buildingcount < 2) { this.miracleAvail = 'False' }
        }
      },
      computed: {
        offlinetime: {
          get: function() {
            this.updateTime()
            this.offlineoffset = this.currentTime - this.save.lastsave
            return 0;
          },
          set: function(x) {
            this.updateTime()
            this.save.lastsave = this.currentTime - x;
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
        },
        lsJoke: {
          get: function() {
            return (localStorage.lsJoke == undefined || localStorage.lsJoke == 'true');
          },
          set: function(x) {
            console.log(x);
            localStorage.lsJoke = x;
            console.log(localStorage.lsJoke);
          }
        },
        angelLine: {
          get: function() {
            return this.save.sTimer / 30;
          },
          set: function(x) {
            this.save.sTimer = x * 30;
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
    
    // Bind Copy button to copy the generated save string
    $('#doGenCopy').on('click', function(e) {
      $('#saveOutput').trigger('focus');
      var save = $('#saveOutput').val();
      window.prompt('Copy to clipboard: Press Ctrl+C, then Enter', save);
    });
    
    // Bind Clear button to clear the save input field
    $('#doSaveClear').on('click', function(e) {
      $('#saveInput').val('').trigger('focus');
    });
    
  });
  
} (window, document, jQuery));
