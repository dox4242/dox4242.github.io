(function(window, document, $, undefined) {
  'use strict';

  var dropdownFilter = {
    faction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 11],
    prestigeFaction: [-1, 9, 10, 12],
    elitePrestigeFaction: [-1, 13, 14, 15],
    bloodlineFaction: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    spell: [18, 3, 12, 6, 14, 9, 1, 8, 15, 11, 7, 13, 10, 2, 5, 4, 21, 17, 25, 26, 27, 28, 29, 30],
    goodmercspells: [6, 14, 9, 5, 8, 11, 4, 10, 2, 21],
    evilmercspells: [6, 14, 9, 5, 8, 15, 11, 4, 10, 2, 21],
    neutralmercspells: [6, 14, 9, 5, 8, 11, 4, 13, 10, 2, 21],
  };
  
  var trophyIDs = {
    autocastSeries: [8, 9, 10, 11, 12, 13, 159, 200],
    buildBuildings: [101700, 101701, 101702, 101703, 101704, 101705, 101706, 101707, 101708, 101709, 101710, 101711, 101712, 101713, 101714],
    castSpells: [104000, 104001, 104002, 104003, 104004, 104005, 104006, 104007, 104008, 104009, 104010, 104011, 104012, 104013, 104014, 104015],
    clickTreasure: [104100, 104101, 104102, 104103, 104104, 104105, 104106, 104107, 104108],
    findFactionCoins: [104500, 104501, 104502, 104503, 104504, 104505, 104506, 104507, 104508, 104509, 104510, 104511, 104512, 104513, 104514, 104515, 104516, 104517, 104518, 104519, 104520],
    gainCoins: [104600, 104601, 104602, 104603, 104604, 104605, 104606, 104607, 104608, 104609, 104610, 104611, 104612, 104613, 104614, 104615, 104616, 104617, 104618, 104619],
    gainCoinClicking: [104700, 104701, 104702, 104703, 104704, 104705, 104706, 104707, 104708, 104709, 104710, 104711, 104712, 104713, 104714, 104715, 104716, 104717, 104718],
    gainGems: [104900, 104901, 104902, 104903, 104904, 104905, 104906, 104907, 104908, 104909, 104910, 104911, 104912, 104913, 104914, 104915, 104916, 104917, 104918, 104919, 104920, 104921, 104922],
    gainReincarnate: [105000, 105001, 105002, 105003, 105004, 105005, 105006, 105007, 105008, 105009, 105010, 105011, 105012, 105013, 105014, 105015, 105016, 105017, 105018],
    haveAssistants: [105100, 105101, 105102, 105103, 105104, 105105, 105106, 105107, 105108, 105109, 105110, 105111, 105112, 105113, 105114, 105115],
    purchaseUpgrade: [105500, 105501, 105502, 105503, 105504, 105505, 105506, 105507, 105508, 105509, 105510],
    produceMana: [111200, 111201, 111202, 111203, 111204, 111205, 111206, 111207, 111208, 111209, 111210, 111211, 111212, 111213],
    gainRubies: [116200, 116201, 116202, 116203],
    artifacts: [117000, 117001, 117002, 117003, 117004, 117005, 117006],
    spellTiers: [123200, 123201, 123202, 123203, 123204, 123205],
    buildFarmsTrophies: [102300, 102301, 102302, 102303, 102304, 102305, 102306, 102307, 102308, 102309, 102310, 102311, 102312, 102313, 102314, 102315, 102316, 102317, 102318, 102319, 102320, 102321],
    buildInnsTrophies: [102700, 102701, 102702, 102703, 102704, 102705, 102706, 102707, 102708, 102709, 102710, 102711, 102712, 102713, 102714, 102715, 102716, 102717, 102718, 102719, 102720, 102721],
    buildBlacksmithsTrophies: [101600, 101601, 101602, 101603, 101604, 101605, 101606, 101607, 101608, 101609, 101610, 101611, 101612, 101613, 101614, 101615, 101616, 101617, 101618, 101619, 101620, 101621],
    buildWarriorBarracksTrophies: [103700, 103701, 103702, 103703, 103704, 103705, 103706, 103707, 103708, 103709, 103710, 103711, 103712, 103713, 103714, 103715, 103716, 103717, 103718, 103719, 103720, 103721],
    buildKnightsJoustsTrophies: [102900, 102901, 102902, 102903, 102904, 102905, 102906, 102907, 102908, 102909, 102910, 102911, 102912, 102913, 102914, 102915, 102916, 102917, 102918, 102919, 102920, 102921],
    buildWizardTowersTrophies: [103900, 103901, 103902, 103903, 103904, 103905, 103906, 103907, 103908, 103909, 103910, 103911, 103912, 103913, 103914, 103915, 103916, 103917, 103918, 103919, 103920, 103921],
    buildCathedralsTrophies: [101800, 101801, 101802, 101803, 101804, 101805, 101806, 101807, 101808, 101809, 101810, 101811, 101812, 101813, 101814, 101815, 101816, 101817, 101818, 101819, 101820, 101821],
    buildCitadelsTrophies: [101900, 101901, 101902, 101903, 101904, 101905, 101906, 101907, 101908, 101909, 101910, 101911, 101912, 101913, 101914, 101915, 101916, 101917, 101918, 101919, 101920, 101921],
    buildRoyalCastlesTrophies: [103400, 103401, 103402, 103403, 103404, 103405, 103406, 103407, 103408, 103409, 103410, 103411, 103412, 103413, 103414, 103415, 103416, 103417, 103418, 103419, 103420, 103421],
    buildHeavensGatesTrophies: [102500, 102501, 102502, 102503, 102504, 102505, 102506, 102507, 102508, 102509, 102510, 102511, 102512, 102513, 102514, 102515, 102516, 102517, 102518, 102519, 102520, 102521],
    buildSlavePensTrophies: [103500, 103501, 103502, 103503, 103504, 103505, 103506, 103507, 103508, 103509, 103510, 103511, 103512, 103513, 103514, 103515, 103516, 103517, 103518, 103519, 103520, 103521],
    buildOrcishArenasTrophies: [103300, 103301, 103302, 103303, 103304, 103305, 103306, 103307, 103308, 103309, 103310, 103311, 103312, 103313, 103314, 103315, 103316, 103317, 103318, 103319, 103320, 103321],
    buildWitchConclavesTrophies: [103800, 103801, 103802, 103803, 103804, 103805, 103806, 103807, 103808, 103809, 103810, 103811, 103812, 103813, 103814, 103815, 103816, 103817, 103818, 103819, 103820, 103821],
    buildDarkTemplesTrophies: [102000, 102001, 102002, 102003, 102004, 102005, 102006, 102007, 102008, 102009, 102010, 102011, 102012, 102013, 102014, 102015, 102016, 102017, 102018, 102019, 102020, 102021],
    buildNecropolisesTrophies: [103200, 103201, 103202, 103203, 103204, 103205, 103206, 103207, 103208, 103209, 103210, 103211, 103212, 103213, 103214, 103215, 103216, 103217, 103218, 103219, 103220, 103221],
    buildEvilFortressesTrophies: [102200, 102201, 102202, 102203, 102204, 102205, 102206, 102207, 102208, 102209, 102210, 102211, 102212, 102213, 102214, 102215, 102216, 102217, 102218, 102219, 102220, 102221],
    buildHellPortalsTrophies: [102600, 102601, 102602, 102603, 102604, 102605, 102606, 102607, 102608, 102609, 102610, 102611, 102612, 102613, 102614, 102615, 102616, 102617, 102618, 102619, 102620, 102621],
    buildDeepMinesTrophies: [102100, 102101, 102102, 102103, 102104, 102105, 102106, 102107, 102108, 102109, 102110, 102111, 102112, 102113, 102114, 102115, 102116, 102117, 102118, 102119, 102120, 102121],
    buildStonePillarsTrophies: [103600, 103601, 103602, 103603, 103604, 103605, 103606, 103607, 103608, 103609, 103610, 103611, 103612, 103613, 103614, 103615, 103616, 103617, 103618, 103619, 103620, 103621],
    buildAlchemistLabsTrophies: [101400, 101401, 101402, 101403, 101404, 101405, 101406, 101407, 101408, 101409, 101410, 101411, 101412, 101413, 101414, 101415, 101416, 101417, 101418, 101419, 101420, 101421],
    buildMonasteriesTrophies: [103100, 103101, 103102, 103103, 103104, 103105, 103106, 103107, 103108, 103109, 103110, 103111, 103112, 103113, 103114, 103115, 103116, 103117, 103118, 103119, 103120, 103121],
    buildLabyrinthsTrophies: [103000, 103001, 103002, 103003, 103004, 103005, 103006, 103007, 103008, 103009, 103010, 103011, 103012, 103013, 103014, 103015, 103016, 103017, 103018, 103019, 103020, 103021],
    buildIronStrongholdsTrophies: [102800, 102801, 102802, 102803, 102804, 102805, 102806, 102807, 102808, 102809, 102810, 102811, 102812, 102813, 102814, 102815, 102816, 102817, 102818, 102819, 102820, 102821],
    buildAncientPyramidsTrophies: [101500, 101501, 101502, 101503, 101504, 101505, 101506, 101507, 101508, 101509, 101510, 101511, 101512, 101513, 101514, 101515, 101516, 101517, 101518, 101519, 101520, 101521],
    buildHallsOfLegendsTrophies: [102400, 102401, 102402, 102403, 102404, 102405, 102406, 102407, 102408, 102409, 102410, 102411, 102412, 102413, 102414, 102415, 102416, 102417, 102418, 102419, 102420, 102421]
  };
  
  var upgradeIDs = {
    bloodlines: [194, 164, 39, 212, 396, 103, 380, 136, 183, 150, 120, 598],
    spellcraft: [130300, 129901, 130903, 130002, 130504, 129805, 130806, 130208, 130407, 130110, 130709, 130611, 129712, 144713, 145314, 144915, 145116, 145217, 145018, 144819, 153920, 153621, 153722, 153823, 154024, 162925, 163026, 162827, 171828, 171729], 
    craftsmanship: [125300, 125201, 125702, 125903, 125004, 126305, 126106, 126007, 126208, 125409, 125610, 125111, 125812, 142613, 143214, 142815, 143116, 142717, 143018, 142919, 151520, 151421, 151622, 151323, 151224, 162125, 162026, 161927, 171128, 171229],
    divine: [126400, 127001, 126602, 126803, 127504, 126905, 127206, 127108, 127409, 126507, 127610, 127311, 126712, 143813, 143614, 143915, 143316, 143517, 143418, 143719, 152720, 152621, 152922, 153023, 152824, 162225, 162426, 162327, 171328, 171429],
    economics: [128100, 128701, 128202, 128403, 127804, 128305, 127907, 128806, 128608, 127709, 128510, 128011, 128912, 144413, 144214, 144615, 144516, 144017, 144318, 144119, 153320, 153121, 153522, 153223, 153424, 162525, 162626, 162727, 171528, 171629],
    alchemy: [124500, 124801, 123903, 124002, 124304, 124605, 124206, 124907, 123808, 124109, 124710, 123711, 124412, 142313, 142414, 142115, 142216, 141917, 142518, 142019, 152420, 152521, 152122, 152323, 152224, 161725, 161626, 161827, 171028, 170929],
    warfare: [131000, 131501, 132202, 131603, 131204, 132005, 131810, 131909, 131706, 131407, 131108, 131311, 132112, 145413, 145514, 145615, 145816, 145717, 146018, 145919, 154120, 154421, 154222, 154323, 154524, 163125, 163326, 163227, 171928, 172029],
    ctaTiers: [400301, 400302, 400303, 400304, 400305, 400306],
    hlTiers: [401201, 401202, 401203, 401204, 401205, 401206],
    fcTiers: [400601, 400602, 400603, 400604, 400605, 400606],
    mbTiers: [401401, 401402, 401403, 401404, 401405, 401406],
    ghTiers: [400901, 400902, 400903, 400904, 400905, 400906],
    bfTiers: [400101, 400102, 400103, 400104, 400105, 400106],
    gbgTiers: [400801, 400802, 400803, 400804, 400805, 400806],
    ntTiers: [401501, 401502, 401503, 401504, 401505, 401506],
    hbTiers: [401101, 401102, 401103, 401104, 401105, 401106],
    gmgTiers: [400701, 400702, 400703, 400704, 400705, 400706],
    lsTiers: [401301, 401302, 401303, 401304, 401305, 401306],
    gbTiers: [401001, 401002, 401003, 401004, 401005, 401006],
    bwTiers: [400201, 400202, 400203, 400204, 400205, 400206],
    dpTiers: [400501, 400502, 400503, 400504, 400505, 400506],
    csTiers: [400401, 400402, 400403, 400404, 400405, 400406],
    dbTiers: [402101, 402102, 402103, 402104, 402105, 402106],
    ssTiers: [401701, 401702, 401703, 401704, 401705, 401706],
  };
  
  var allResearches = upgradeIDs.spellcraft.concat(upgradeIDs.craftsmanship, upgradeIDs.divine, upgradeIDs.economics, upgradeIDs.alchemy, upgradeIDs.warfare)

  
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
      + '<td colspan="5"><input v-model="spell.s" number></input></td>'
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
      + '<td colspan="5"><input v-model="spell.t" number></input></td>'
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
        'filter': String,
        'colspan': {
          type: Number,
          default: function() { return 1; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td :colspan="colspan"><select v-model="field" number>'
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
        'filter': String,
        'colspan': {
          type: Number,
          default: function() { return 1; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td :colspan="colspan"><select v-model="unlocked" number>'
      + '<option :disabled="option.disabled" :value="option.id" v-for="option in options">{{option.name}}</option>'
      + '</select></td>'
      + '</tr>',
      computed: {
        unlocked: {
          get: function() {
            var blFactionIDs = { 0:194, 1:164, 2:39, 3:212, 4:396, 5:103, 6:380, 7:136, 8:183, 9:150, 10:120, 12:598 };
            if (this.field == -1) { return this.field }
            return blFactionIDs[this.field]
          },
          set: function(x) {
            var blFactionIDs = { 0:194, 1:164, 2:39, 3:212, 4:396, 5:103, 6:380, 7:136, 8:183, 9:150, 10:120, 12:598 };
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
      /*+ '<td><input type="checkbox" v-model="U1" number></input></td>'
      + '<td><input type="checkbox" v-model="U2" number></input></td>'
      + '<td><input type="checkbox" v-model="U3" number></input></td>'
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
    	U1: {
          get: function() {
    	    return this.unlocked && this.upgrades[this.id].u1;
          },
          set: function(x) {
            if (this.unlocked) { this.upgrades[this.id] = [x]; }
          }
    	},
    	U2: {
          get: function() {
    	    return this.unlocked && this.upgrades[this.id].u2;
          },
          set: function(x) {
            if (this.unlocked) { this.upgrades[this.id] = [x]; }
          }
    	},
    	U3: {
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
      + '<th><span class="statheader">Unlocked</span></th>'
      + '<th><span class="statheader">Enabled</span></th>'
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
      + '<td><input type="checkbox" v-model="enabled" number></input></td>'
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
        },
    	enabled: {
          get: function() {
    	    return this.unlocked && this.upgrades[this.id].u1;
          },
          set: function(x) {
            if (this.unlocked) { this.upgrades[this.id] = [x]; }
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
      + '</tr><tr>'
      + '<td colspan="6">Unlocked / Owned</td></tr>'
    });
    
    Vue.component('widget-research-all', {
      props: {
        'upgrades': Object,
      },
      template: '<tr><td>All '
      + '<input type="checkbox" v-model="all_unlocked" number></input> '
      + '<input type="checkbox" v-model="all_owned" number></input></td></tr>',
      computed: {
        all_unlocked: {
          set: function(x) {
            for (var i of allResearches) {
              if (x && !this.upgrades[i]) { this.upgrades[i] = {_id: this.i, u1: false, u2: false, u3: false, s: 0}; }
              else if (this.upgrades[i]) { delete this.upgrades[i]; }
            }
          }
        },
        all_owned: {
          set: function(x) {
            for (var i of allResearches) {
              if (!this.upgrades[i] && x) { this.upgrades[i] = {_id: i, u1: true, u2: false, u3: false, s: 0}; }
              else { this.upgrades[i].u1 = x; }
            }
          }
        }
      }
    });
    Vue.component('widget-research-upgrade-row', {
      props: {
        'upgrades': Object,
        's_name': String,
        'c_name': String,
        'd_name': String,
        'e_name': String,
        'a_name': String,
        'w_name': String,
        's_id': String,
        'c_id': String,
        'd_id': String,
        'e_id': String,
        'a_id': String,
        'w_id': String
      },
      template: '<tr>'
      + '<td><span class="statname">{{s_name}} </span>'
      + '<input type="checkbox" v-model="s_unlocked" number></input> '
      + '<input type="checkbox" v-model="s_owned" number></input></td>'
      + '<td><span class="statname">{{c_name}}</span> '
      + '<input type="checkbox" v-model="c_unlocked" number></input> '
      + '<input type="checkbox" v-model="c_owned" number></input></td>'
      + '<td><span class="statname">{{d_name}}</span> '
      + '<input type="checkbox" v-model="d_unlocked" number></input> '
      + '<input type="checkbox" v-model="d_owned" number></input></td>'
      + '<td><span class="statname">{{e_name}}</span> '
      + '<input type="checkbox" v-model="e_unlocked" number></input> '
      + '<input type="checkbox" v-model="e_owned" number></input></td>'
      + '<td><span class="statname">{{a_name}}</span> '
      + '<input type="checkbox" v-model="a_unlocked" number></input> '
      + '<input type="checkbox" v-model="a_owned" number></input></td>'
      + '<td><span class="statname">{{w_name}}</span> '
      + '<input type="checkbox" v-model="w_unlocked" number></input> '
      + '<input type="checkbox" v-model="w_owned" number></input></td>'
      + '</tr>',
      computed: {
    	s_unlocked: {
          get: function() {
            if (this.upgrades[this.s_id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.s_unlocked) { delete this.upgrades[this.s_id]; }
            else { this.upgrades[this.s_id] = {_id: this.s_id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	s_owned: {
          get: function() {
            return this.upgrades[this.s_id] && this.upgrades[this.s_id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.s_id] && x) { this.upgrades[this.s_id] = {_id: this.s_id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.s_id].u1 = x; }
          }
    	},
    	c_unlocked: {
          get: function() {
            if (this.upgrades[this.c_id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.c_unlocked) { delete this.upgrades[this.c_id]; }
            else { this.upgrades[this.c_id] = {_id: this.c_id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	c_owned: {
          get: function() {
            return this.upgrades[this.c_id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.c_id]) { this.upgrades[this.c_id] = {_id: this.c_id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.c_id].u1 = x; }
          }
    	},
    	d_unlocked: {
          get: function() {
            if (this.upgrades[this.d_id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.d_unlocked) { delete this.upgrades[this.d_id]; }
            else { this.upgrades[this.d_id] = {_id: this.d_id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	d_owned: {
          get: function() {
            return this.upgrades[this.d_id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.d_id]) { this.upgrades[this.d_id] = {_id: this.d_id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.d_id].u1 = x; }
          }
    	},
    	e_unlocked: {
          get: function() {
            if (this.upgrades[this.e_id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.e_unlocked) { delete this.upgrades[this.e_id]; }
            else { this.upgrades[this.e_id] = {_id: this.e_id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	e_owned: {
          get: function() {
            return this.upgrades[this.e_id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.e_id]) { this.upgrades[this.e_id] = {_id: this.e_id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.e_id].u1 = x; }
          }
    	},
    	a_unlocked: {
          get: function() {
            if (this.upgrades[this.a_id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.a_unlocked) { delete this.upgrades[this.a_id]; }
            else { this.upgrades[this.a_id] = {_id: this.a_id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	a_owned: {
          get: function() {
            return this.upgrades[this.a_id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.a_id]) { this.upgrades[this.a_id] = {_id: this.a_id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.a_id].u1 = x; }
          }
    	},
    	w_unlocked: {
          get: function() {
            if (this.upgrades[this.w_id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.w_unlocked) { delete this.upgrades[this.w_id]; }
            else { this.upgrades[this.w_id] = {_id: this.w_id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	w_owned: {
          get: function() {
            return this.upgrades[this.w_id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.w_id]) { this.upgrades[this.w_id] = {_id: this.w_id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.w_id].u1 = x; }
          }
    	}
      }
    });

    Vue.component('widget-lineage-perk', {
      props: {
        'upgrades': Object,
        'name': String,
        'id': String
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td><input type="checkbox" v-model="unlocked" number></input> '
      + '<input type="checkbox" v-model="owned" number></input></td>'
      + '</tr>',
      computed: {
    	unlocked: {
          get: function() {
            if (this.upgrades[this.id]) { return true; }
            else { return false; }
          },
          set: function(x) {
            if (this.s_unlocked) { delete this.upgrades[this.id]; }
            else { this.upgrades[this.id] = {_id: this.id, u1: false, u2: false, u3: false, s: 0}; }
          }
        },
    	owned: {
          get: function() {
            return this.upgrades[this.id] && this.upgrades[this.id].u1;
      	  },
          set: function(x) {
            if (!this.upgrades[this.id] && x) { this.upgrades[this.id] = {_id: this.id, u1: true, u2: false, u3: false, s: 0}; }
            else { this.upgrades[this.id].u1 = x; }
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
        'id': String,
        'colspan': {
          type: Number,
          default: function() { return 1; }
        }
      },
      template: '<tr>'
      + '<th><span class="statname">{{name}}</span></th>'
      + '<td :colspan="colspan"><input type="checkbox" v-model="unlocked" number></input></td>'
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
              if ((i ==10) && util.save.upgrade_owned(this.save, 143018)) {
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
