function randint(a,b){return a+Math.floor(Math.random()*(++b-a))}

function log(x, b) {
  if (b === undefined) {
  return Math.log(x);
  }
  else {
  return Math.log(x) / Math.log(b);
  }
}

function typeve(thing) {
  var type = typeof(thing);
  if (type === 'object') {
  if (Array.isArray(thing)) {
  return 'array';
  }
  if (thing === null) {
  return 'null';
  }
  }
  return type;
}

function listJoin(a) {
  if (a.length == 0) {
    return "";
  } else if (a.length == 1) {
    return a[0];
  } else if (a.length == 2) {
    return a[0] + " and " + a[1];
  } else {
    var list = a[0];
    for (var i = 1; i < a.length-1;i++) {
      list += ", " + a[i]
    }
    list += ", and " + a[a.length-1]
    return list
  }
}

function liJoin(a) {
  var list = "";
  for (i = 0; i < a.length; i++) {
    list += "<li>" + a[i] + "</li>"
  }
  return list;
}

function ulJoin(a) {
  var list = "<ul>"
  list += liJoin(a);
  list += "</ul>"
  return list
}

function olJoin(a) {
  var list = "<ol>"
  list += liJoin(a);
  list += "</ol>"
  return list
}

(function(window, document, $, undefined) {
  function render() {
    var timeUnitsOutput = [
      ['d', 86400],
      ['h', 3600],
      ['m', 60],
      ['s', 1]
    ]

    var timeUnitsInput = {
      y: 31536000,
      mo: 2592000,
      w: 604800,
      t: 1/30
    }

    for (var x of timeUnitsOutput) {
      timeUnitsInput[x[0]] = x[1];
    }
    var units = [];
    for (var x in timeUnitsInput) {
      units.push(x);
    }
    var timeInputRe = new RegExp('((\\d+\\s*(' + units.join('|') + ')\\s*))+')
    var timeUnitRe = new RegExp(/(\d+)\s*([a-z]+)/g);

    this.inputFilters = {
      time: function(s) {
        n = Number(s);
        if (!isNaN(n)) return  n;
        n = 0;
        s = s.toLowerCase();
        if (timeInputRe.test(s)) {
          while (match = timeUnitRe.exec(s)) {
            n += Number(match[1]) * timeUnitsInput[match[2]];
          }
        }
        return n;
      },
      number: function(s) {
        return Number(s);
      }
    }

    this.outputFilters = {
      time: function(n) {
        if (n < 1) return '0s';
        var s = [];
        for (var x of timeUnitsOutput) {
          var u = Math.floor(n/x[1]);
          if (u > 0) s.push(u + x[0]);
          n = n % x[1];
        }
        return s.join(' ');
      },
      number: function(n) {
        return String(n);
      }
    }

    this.shortScale = ['M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Octg', 'Notg', 'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Ocqag', 'Noqag', 'Qig', 'UQig', 'DQig', 'TQig', 'QaQig', 'QiQig', 'SxQig', 'SpQig', 'OcQig', 'NoQig', 'Sxg', 'USxg', 'DSxg', 'TSxg', 'QaSxg', 'QiSxg', 'SxSxg', 'SpSxg', 'OcSxg', 'NoSxg', 'Spg', 'USpg', 'DSpg', 'TSpg', 'QaSpg', 'QiSpg', 'SxSpg', 'SpSpg', 'OcSpg', 'NoSpg', 'Ocg', 'UOcg', 'DOcg', 'TOcg', 'QaOcg', 'QiOcg', 'SxOcg', 'SpOcg', 'OcOcg', 'NoOcg', 'Nog', 'UNog', 'DNog', 'TNog', 'QaNog', 'QiNog', 'SxNog', 'SpNog', 'OcNog', 'NoNog', 'C', 'Uc'];

    this.expSep = 'e';

    this.sciSig = function(man, sig) {
      man = man.substr(0,sig+1);
      while ('0.'.indexOf(man[man.length-1]) != -1) {
        man = man.substr(0, man.length-1);
      }
      return man
    }

    this.sci = function(val) {
	   if(val == Infinity) {
	 	 return "Infinite"  
	   }
      var man = val.toExponential();
      var exp = Number(man.substr(man.search('e') + 1));
      var man = man.substr(0, man.search('e'));
      if (exp < 0) {
        return val.toString();
      }
      if (val >= 0 && val < 1000000) {
        return this.short(val);
      }
      return this.sciSig(man, 4) + this.expSep + exp;
    }

    this.engSig = function(man, exp, sig) {
      man = man[0] + man.substr(2, sig-1);
      exp = exp % 3;
      for (var i = 0; i < (3 - exp); i++) {
        if (man[man.length - 1] == '0') {
          man = man.substr(0, man.length - 1);
        } else {
          break;
        }
      }
      while (man.length < exp + 1) {
        man += '0';
      }
      if (man.length == exp + 1) {
        return man;
      } else {
        return man.substr(0, exp + 1) + '.' + man.substr(exp + 1);
      }
    }

    this.eng = function(val) {
      var man = val.toExponential();
      var exp = Number(man.substr(man.search('e') + 1));
      var man = man.substr(0, man.search('e'));
      if (val >= 0 && val < 1000000) {
        return this.short(val);
      }
      return this.engSig(man, exp, 4) + this.expSep + (exp - exp % 3);
    }

    this.short = function(val) {
      var man = val.toExponential();
      var exp = Number(man.substr(man.search('e') + 1));
      var man = man.substr(0, man.search('e'));
      if (exp < 0) {
        if (val == 0) return '0';
        return this.sci(val);
      } else if (exp < 3) {
        return this.engSig(man, exp, 4);
      } else if (exp < 6) {
        man = man[0] + man.substr(2, exp);
        while (man.length < exp + 1) {
          man += '0';
        }
        return man.substr(0, exp - 2) + ',' + man.substr(exp - 2);
      } else {
        var suffix = Math.floor(exp / 3) - 2;
        return this.engSig(man, exp, 4) + ' ' + this.shortScale[suffix];
      }
    }

    this.time = function(val) {
      res = [];
      val = Math.floor(val);
      if (val == 0) return '0s';

      s = val % 60;
      val = Math.floor(val / 60);
      m = val % 60;
      val = Math.floor(val / 60);
      h = val % 24;
      val = Math.floor(val / 24);
      d = val;

      if (s > 0) res.unshift(s + 's');
      if (m > 0) res.unshift(m + 'm');
      if (h > 0) res.unshift(h + 'h');
      if (d > 0) res.unshift(d + 'd');
      return res.join(', ');
    }

    this.timedelta = function(val) {
      if (val >= 0) {
        return this.time(val) + ' ago';
      } else {
        return this.time(-val) + ' from now';
      }
    }

    this.timeISO = function(time) {
      var date = new Date(time * 1000);
      return date.toLocaleDateString() + ' ' +
      date.toLocaleTimeString(undefined, {hour12: false});
    }
  }

  function save() {
    this.lengths = {factions: 16, eventResources: 21, stats: 149, buildings: 25, spells: 32};
    this.building_alignment = {
       9: 0, 13: 0,  3: 0,
      23: 1, 15: 1, 25: 1,  4: 1,  5: 1, 20: 1, 11: 1,
      21: 2, 19: 2, 24: 2,  6: 2, 18: 2,  8: 2, 12: 2,
       7: 3, 22: 3,  1: 3, 17: 3, 16: 3, 14: 3,  2: 3, 10: 0
    };
    this.building_names = {9: 'Farm', 13: 'Inn', 3: 'Blacksmith', 23: 'Warrior Barracks', 15: 'Knights Joust', 25: 'Wizard Tower', 4: 'Cathedral', 5: 'Citadel', 20: 'Royal Castle', 11: 'Heaven\'s Gate', 21: 'Slave Pen', 19: 'Orcish Arena', 24: 'Witch Conclave', 6: 'Dark Temple', 18: 'Necropolis', 8: 'Evil Fortress', 12: 'Hell Portal', 7: 'Deep Mine', 22: 'Stone Pillars', 1: 'Alchemist Lab', 17: 'Monastery', 16: 'Labyrinth', 14: 'Iron Stronghold', 2: 'Ancient Pyramid', 10: 'Hall of Legends'};
    this.building_ids = [
       9, 13,  3,
      23, 15, 25,  4,  5, 20, 11,
      21, 19, 24,  6, 18,  8, 12,
       7, 22,  1, 17, 16, 14,  2, 10
    ];
    this.spell_alignment = {
      18: 0,  3: 0, 17: 0,
      12: 1,  6: 1, 14: 1,  9: 1,  5: 1,
       1: 2,  8: 2, 15: 2, 11: 2,  4: 2,
       7: 3, 13: 3, 10: 3,  2: 3, 21: 3,
      19: 0, 20: 0, 22: 0, 23: 0, 24: 0,
      25: 4, 27: 5, 26: 6
    };
    this.upgrade_faction = {
      197: 0,  204: 0,  195: 0,  207: 0,  198: 0,  201: 0,  202: 0,  206: 0,  199: 0,  203: 0,  205: 0,  208: 0, 778: 0, 777: 0, 817: 0, 816: 0,
      169: 1,  174: 1,  175: 1,  177: 1,  170: 1,  167: 1,  166: 1,  176: 1,  171: 1,  165: 1,  173: 1,  163: 1, 774: 1, 775: 1, 812: 1, 813: 1,
       40: 2,   51: 2,   44: 2,   43: 2,   41: 2,   50: 2,   48: 2,   49: 2,   42: 2,   52: 2,   45: 2,   53: 2, 770: 2, 771: 2, 806: 2, 807: 2,
      216: 3,  223: 3,  222: 3,  210: 3,  217: 3,  209: 3,  221: 3,  214: 3,  218: 3,  213: 3,  211: 3,  220: 3, 779: 3, 783: 3, 819: 3, 818: 3,
      398: 4,  394: 4,  390: 4,  392: 4,  399: 4,  403: 4,  389: 4,  393: 4,  400: 4,  391: 4,  395: 4,  402: 4, 781: 4, 784: 4, 823: 4, 822: 4,
      104: 5,  115: 5,  111: 5,  112: 5,  105: 5,  114: 5,  110: 5,  109: 5,  106: 5,  113: 5,  102: 5,  116: 5, 772: 5, 782: 5, 808: 5, 809: 5,
      382: 6,  376: 6,  374: 6,  379: 6,  383: 6,  381: 6,  375: 6,  377: 6,  384: 6,  378: 6,  387: 6,  386: 6, 780: 6, 787: 6, 821: 6, 820: 6,
      137: 7,  141: 7,  133: 7,  145: 7,  138: 7,  142: 7,  134: 7,  146: 7,  139: 7,  144: 7,  143: 7,  135: 7, 773: 7, 785: 7, 811: 7, 810: 7,
      184: 8,  193: 8,  182: 8,  181: 8,  185: 8,  188: 8,  191: 8,  192: 8,  186: 8,  190: 8,  180: 8,  189: 8, 776: 8, 786: 8, 815: 8, 814: 8,
      152: 9,  149: 9,  157: 9,  160: 9,  153: 9,  162: 9,  158: 9,  148: 9,  154: 9,  147: 9,  159: 9,  161: 9,
      122: 10, 132: 10, 127: 10, 130: 10, 123: 10, 128: 10, 119: 10, 117: 10, 124: 10, 131: 10, 129: 10, 118: 10
    };
    this.event_trophy_ids = {
      // thanksgiving feat
      115: true,
      // christmas feats
      165: true, 163: true, 164: true, 166: true,
      // valentine's feats
      174: true, 175: true, 272: true, 315: true,
      // easter feats
      191: true, 194: true, 192: true, 193: true, 287: true, 324: true,
      // summer feats
      205: true, 207: true, 204: true, 206: true,
      // blood war feats
      246: true, 243: true, 245: true, 244: true, 293: true,
      // goblin invasion feats
      252: true, 251: true, 253: true, 298: true,
      // halloween feats
      218: true, 216: true, 217: true, 221: true, 222: true, 223: true, 219: true, 220: true,
      // ruby shine feat
      271: true,
      // christmas quests
      116800: true, 116801: true, 116802: true, 116803: true,
      116700: true, 116701: true, 116702: true, 116703: true,
      // valentine's quests
      117600: true, 117601: true, 117602: true,
      // easter quests
      119500: true, 119501: true, 119502: true, 119503: true,
      119600: true, 119601: true, 119602: true, 119603: true,
      // summer quests
      120800: true, 120801: true, 120802: true,
      120900: true, 120901: true, 120902: true,
      // blood war quests
      124800: true, 124801: true, 124802: true,
      124700: true, 124701: true, 124702: true,
      // goblin invasion quests
      125500: true, 125501: true, 125502: true,
      125400: true, 125401: true, 125402: true,
      // halloween quests
      122400: true, 122401: true, 122402: true,
      122500: true, 122501: true, 122502: true, 122503: true,
    };
    this.artifact_ids = {
      // quest artifacts
      123: true, 127: true, 125: true, 124: true, 128: true, 126: true,
      161: true, 160: true, 184: true, 186: true, 185: true, 211: true, 240: true,
      300: true, 301: true, 302: true, 303: true, 304: true, 305: true, 306: true, 307: true, 308: true,
      344: true,
      // lore artifacts
      151: true, 119: true, 120: true, 137: true, 148: true, 147: true, 132: true, 143: true,
      144: true, 146: true, 135: true, 129: true, 139: true, 150: true, 142: true, 134: true,
      140: true, 141: true, 155: true, 138: true, 153: true, 156: true, 145: true, 136: true,
      154: true, 133: true, 130: true, 152: true, 131: true, 179: true, 178: true, 187: true,
      177: true, 215: true, 229: true, 230: true, 233: true, 234: true, 237: true, 240: true,
      242: true, 268: true, 256: true, 257: true, 284: true, 281: true, 280: true, 277: true,
      282: true, 276: true, 275: true, 283: true, 274: true, 278: true, 273: true, 279: true,
      292: true, 294: true, 295: true, 296: true, 319: true, 347: true, 348: true, 349: true,
      350: true, 351: true, 352: true, 346: true   
    };
    this.hidden_trophy_ids = {
      // neutral unlocks
      6: true, 2: true, 5: true,
      // prestige unlocks
      7: true, 3: true, 1: true, 44: true, 43: true,
      // elite prestige unlocks
      309: true, 310: true, 311: true,
      // merc unlock
      53: true,
      // base research
      59: true, 58: true, 56: true, 60: true, 61: true, 57: true,
      // neutral research
      118: true, 116: true, 117: true,
      // prestige research
      183: true, 182: true, 212: true,
      // mercenary research
      239: true,
      // A2 unique building unlocks
      263: true, 261: true, 258: true, 264: true, 266: true, 259: true, 265: true, 260: true, 262: true, 288: true, 289: true, 291: true
    };
	
    this.max_trophy_count = 900;

    this.challenge_owned = function(save, id) {
      return save.upgrades[id] != undefined;
    }
    this.upgrade_owned = function(save, id) {
      return save.upgrades[id] && save.upgrades[id].u1;
    }
    this.challenge_active = function(save, id) {
      return this.upgrade_owned(save, id);
    }
    this.trophy_owned = function(save, id) {
      return save.trophies[id];
    }
    this.building_count = function(save, id, raw) {
      return save.buildings[id].q;
    }
    this.building_requirement = function(save, id, q) {
      return q;
    }
    this.building_counts = function(save) {
      var counts = [];
      for (id of this.building_ids) {
        var a = this.building_alignment[id];
        if (a == save.alignment || a == 0) {
          counts.push(save.buildings[id].q);
        }
      }
      return counts;
    }
    this.total_buildings = function(save, alignment= -1) {
      var sum = 0;
      for (var i in save.buildings) {
        if (alignment == -1 || alignment == this.building_alignment[i]) {
          sum += this.building_count(save, i);
        }
      }
      return sum;
    }
    this.total_spells = function(save, alignment= -1, level= 0) {
      var sum = 0;
      for (var i in save.spells) {
        if (alignment == -1 || alignment == this.spell_alignment[i]) {
          sum += save.spells[i].c;
          if (level >= 1) sum += save.spells[i].r;
          if (level >= 2) sum += save.spells[i].e;
        }
      }
      return sum;
    }
    this.stat_max = function(save, id, level= 0) {
      var values = [save.stats[id].stats];
      if (level >= 1) values.push(save.stats[id].statsReset);
      if (level >= 2) values.push(save.stats[id].statsRei);
      return Math.max.apply(null, values)
    }
    this.stat = function(save, id, level= 0) {
      var value = save.stats[id].stats;
      if (level >= 1) value += save.stats[id].statsReset;
      if (level >= 2) value += save.stats[id].statsRei;
      return value
    }
    this.faction_coins = function(save, level= 0) {
      var ids = [6, 7, 8, 9, 10, 11, 41, 42];
      var sum = 0;
      for (id of ids) {
        sum += this.stat(save, id, level);
      }
      return sum;
    }
    this.trophies = function(save) {
      var count = 0;
      for (id in save.trophies) {
        if (!this.event_trophy_ids[id] && !this.artifact_ids[id] && !this.hidden_trophy_ids[id]){
          count += 1;
        }
      }
      return count;
    }
    this.artifacts = function(save) {
      var count = 0;
      for (id in this.artifact_ids) {
        if (save.trophies[id]) count += 1;
      }
      return count;
    }
    this.bloodline_upgrades = function(save, faction) {
      var count = 0;
      for (id in save.upgrades) {
        if (this.upgrade_faction[id] != null && this.upgrade_faction[id] == faction) {
          count += 1;
        }
      }
      return count;
    }
    this.lineage_levels = function(save) {
      var count = 0;
      for (var i in save.lineageLevels) {
        count += save.lineageLevels[i].lev;
      }
      return count;
    }

    this.brainwaveHeadstart = function(save) {
      return 60 + (save.spells[2].active0 / 300) + (save.spells[2].activeTiers * 600);
    }

    this.assistants = function(save) {
      return 100;
    }

    this.re_bonus = function(save) {
      return 10;
    }

    this.fc_chance = function(save) {
      return 1000;
    }

    this.max_mana = function(save) {
      return 1000;
    }

    this.active_spells = function (save) {
      var n = 0;

      for (var i in save.spells) {
        n += save.spells[i].a ? 1 + save.spells[i].activeTiers : 0;
      }

      return n;
    };

    this.combo_strike_counter = function (save) {
      var n = 0;

      for (var i in save.spells) {
        n +=
          this.challenge_active(save, 575) && save.spells[i].id !== 18 ||
          !this.challenge_active(save, 575) && save.spells[i].id === 4
          ? save.spells[i].c
          : 0;
      }

      return n;
    };

    this.hasSpell = function(save, spell) {
            var _spell = util.assoc.spells.find(function(element) {
                    return element.name == spell || element.id == spell;
            });
            if(! _spell) return false;
			if(_spell.name == "Call to Arms") return true;
			if (_spell.name == "Spiritual Surge") return save.reincarnation >= 14;
            if(_spell.name == "Catalyst") {
                    return this.challenge_active(save,991) || this.upgrade_owned(save,940) || (save.reincarnation >= 130 && this.upgrade_owned(save,142019) && save.elitePrestigeFaction == 14)
            }
            return _spell.faction != null ? (save.faction == _spell.faction || save.prestigeFaction == _spell.faction || save.elitePrestigeFaction == _spell.faction)
            || save.mercSpell1 == _spell.id || save.mercSpell2 == _spell.id || this.upgrade_owned(save,_spell.perk2)
            : (save.alignment == _spell.alignment || save.secondaryAlignment == _spell.alignment) || (_spell.perk2 && this.upgrade_owned(save,_spell.perk2)) ;
    };
	
	this.minSpellTime = function (save) {
		var min = 1e308;
		
		for (var i in util.assoc.spells) {
			if (!util.assoc.spells[i].allspells)
			{
				continue;
			}
			
			var id = util.assoc.spells[i].id;
			
			var time = save.spells[id].active0 + save.spells[id].active1;
			
			if (time < min)
			{
				min = time;
			}
		}
		return min;
	}
	
	this.getSpentBudget = function (save) {
		var budget = 0;
		for (var i in util.assoc.researches) {
			if (this.upgrade_owned(save,util.assoc.researches[i].id)) {
				budget += util.assoc.researches[i].value;
			}
		}
		return budget;
	}
	
    this.blankSave = function() {
      var save = {
        upgrades: {},
        trophies: {},
        buildings: {},
        spells: {},
        factionCoins: [],
        stats: [],
        eventResources: [],
      };
      for (var i = 0; i < this.lengths.stats; i++) {
        save.stats.push({stats: 0, statsReset: 0, statsRei: 0});
      }
      for (var i = 0; i < this.lengths.factions; i++) {
        save.factionCoins.push({factionCoins: 0, royalExchanges: 0});
      }
      for (var i = 1; i <= this.lengths.spells; i++) {
        save.spells[i] = {
          _id: i,
          t: -1,
          a: false, n1: -1, n2: -1, n3: -1,
          tierstat1: 0, activeTiers: 0,
          c: 0, r: 0, e: 0,
          active0: 0, active1: 0, active2: 0,
          s: 0
        };
      }
      for (var i = 1; i <= this.lengths.buildings; i++) {
        save.buildings[i] = {
          _id: i,
          q: 0, t: 0, r: 0,
          m: 0, e: 0
        };
      }
	  for (var i = 0; i < this.lengths.eventResources; i++) {
		 save.eventResources[i] = 0;
	  }
      return save;
    }
  }

  function assoc() {
    this.bTiers = [
      {id: 1, name: 'Tier 1'},
      {id: 2, name: 'Tier 2'},
      {id: 3, name: 'Tier 3'},
      {id: 4, name: 'Tier 4'},
      {id: 5, name: 'Tier 5'},
      {id: 6, name: 'Tier 6'},
      {id: 7, name: 'Tier 7'},
      {id: 8, name: 'Tier 8'},
      {id: 9, name: 'Tier 9'},
      {id: 10, name: 'Tier 10'},
      {id: 11, name: 'Tier 11'}
    ];
    this.spells = [
      {id: 18, name: 'Tax Collection', allspells: false},
      {id: 3, name: 'Call to Arms', allspells: true},
      {id: 12, name: 'Holy Light', alignment: 1, allspells: true},
      {id: 6, name: 'Fairy Chanting', faction: 0, perk2: 680, allspells: true},
      {id: 14, name: 'Moon Blessing', faction: 1, perk2: 672, allspells: true},
      {id: 9, name: 'God\'s Hand', faction: 2, perk2: 651, allspells: true},
      {id: 1, name: 'Blood Frenzy', alignment: 2, allspells: true},
      {id: 8, name: 'Goblin\'s Greed', faction: 3, perk2: 684, allspells: true},
      {id: 15, name: 'Night Time', faction: 4, perk2: 692, allspells: true},
      {id: 11, name: 'Hellfire Blast', faction: 5, perk2: 656, allspells: true},
      {id: 7, name: 'Gem Grinder', alignment: 3, allspells: true},
      {id: 13, name: 'Lightning Strike', faction: 6, perk2: 688, allspells: true},
      {id: 10, name: 'Grand Balance', faction: 7, perk2: 664, allspells: true},
      {id: 2, name: 'Brainwave', faction: 8, perk2: 676, allspells: true},
      {id: 5, name: 'Diamond Pickaxe', faction: 9, perk2: 668, allspells: true},
      {id: 4, name: 'Combo Strike', faction: 10, perk2: 660, allspells: true},
      {id: 17, name: 'Spiritual Surge', allspells: true},
      {id: 21, name: 'Dragon\'s Breath', faction: 12, perk2: 696, allspells: true},
      {id: 19, name: 'Hailstorm', allspells: false},
      {id: 20, name: 'Heatwave', allspells: false},
      {id: 23, name: 'Shadow Embrace', allspells: false},
      {id: 24, name: 'Wail of the Banshee', allspells: false},
      {id: 22, name: 'Cannibalize', allspells: false},
      {id: 25, name: 'Temporal Flux', alignment: 4, perk2: 1019, allspells: true},
      {id: 26, name: 'All Creation', alignment: 6, perk2: 1009, allspells: true},
      {id: 27, name: 'Maelstrom', alignment: 5, perk2: 1014, allspells: true},
      {id: 28, name: 'Infinite Spiral', faction: 15, perk2: 969, allspells: true},
      {id: 29, name: 'Limited Wish', faction: 14, perk2: 963, allspells: true},
      {id: 30, name: 'Precognition', faction: 13, perk2: 957, allspells: true},
      {id: 31, name: 'Catalyst', allspells: false},
	  {id: 32, name: 'Chaos Madness', allspells: false},
    ];
    this.spellsRNG = [
      {id: 13, name: 'Lightning Strike'},
      {id: 21, name: 'Dragon\'s Breath'},
      {id: 27, name: 'Maelstrom'},
      {id: 29, name: 'Limited Wish'},
      {id: 31, name: 'Catalyst'},
	  {id: 32, name: 'Chaos Madness'},
    ];
    this.trophyIDs = [
      {id: 8, name: 'Automatic Casting'},
      {id: 9, name: 'Improved Autocasting'},
      {id: 10, name: 'Masterful Autocasting'},
      {id: 11, name: 'Priority Autocasting'},
      {id: 12, name: 'Contingency Autocasting'},
      {id: 13, name: 'Planned Autocasting'},
      {id: 159, name: 'Efficient Autocasting'},
      {id: 200, name: 'Tiered Autocasting'},
      {id: 326, name: 'Reverse Autocasting'},
      {id: 101400, name: '1 Alchemist Lab'},
      {id: 101401, name: '50 Alchemist Labs'},
      {id: 101402, name: '100 Alchemist Labs'},
      {id: 101403, name: '150 Alchemist Labs'},
      {id: 101404, name: '200 Alchemist Labs'},
      {id: 101405, name: '300 Alchemist Labs'},
      {id: 101406, name: '400 Alchemist Labs'},
      {id: 101407, name: '500 Alchemist Labs'},
      {id: 101408, name: '600 Alchemist Labs'},
      {id: 101409, name: '700 Alchemist Labs'},
      {id: 101410, name: '800 Alchemist Labs'},
      {id: 101411, name: '900 Alchemist Labs'},
      {id: 101412, name: '1000 Alchemist Labs'},
      {id: 101413, name: '1500 Alchemist Labs'},
      {id: 101414, name: '2000 Alchemist Labs'},
      {id: 101415, name: '2500 Alchemist Labs'},
      {id: 101416, name: '3000 Alchemist Labs'},
      {id: 101417, name: '3500 Alchemist Labs'},
      {id: 101418, name: '5000 Alchemist Labs'},
      {id: 101419, name: '7500 Alchemist Labs'},
      {id: 101420, name: '12000 Alchemist Labs'},
      {id: 101421, name: '20000 Alchemist Labs'},
      {id: 101500, name: '1 Ancient Pyramid'},
      {id: 101501, name: '50 Ancient Pyramids'},
      {id: 101502, name: '100 Ancient Pyramids'},
      {id: 101503, name: '150 Ancient Pyramids'},
      {id: 101504, name: '200 Ancient Pyramids'},
      {id: 101505, name: '300 Ancient Pyramids'},
      {id: 101506, name: '400 Ancient Pyramids'},
      {id: 101507, name: '500 Ancient Pyramids'},
      {id: 101508, name: '600 Ancient Pyramids'},
      {id: 101509, name: '700 Ancient Pyramids'},
      {id: 101510, name: '800 Ancient Pyramids'},
      {id: 101511, name: '900 Ancient Pyramids'},
      {id: 101512, name: '1000 Ancient Pyramids'},
      {id: 101513, name: '1500 Ancient Pyramids'},
      {id: 101514, name: '2000 Ancient Pyramids'},
      {id: 101515, name: '2500 Ancient Pyramids'},
      {id: 101516, name: '3000 Ancient Pyramids'},
      {id: 101517, name: '3500 Ancient Pyramids'},
      {id: 101518, name: '5000 Ancient Pyramids'},
      {id: 101519, name: '7500 Ancient Pyramids'},
      {id: 101520, name: '12000 Ancient Pyramids'},
      {id: 101521, name: '20000 Ancient Pyramids'},
      {id: 101600, name: '1 Blacksmith'},
      {id: 101601, name: '50 Blacksmiths'},
      {id: 101602, name: '100 Blacksmiths'},
      {id: 101603, name: '150 Blacksmiths'},
      {id: 101604, name: '200 Blacksmiths'},
      {id: 101605, name: '300 Blacksmiths'},
      {id: 101606, name: '400 Blacksmiths'},
      {id: 101607, name: '500 Blacksmiths'},
      {id: 101608, name: '600 Blacksmiths'},
      {id: 101609, name: '700 Blacksmiths'},
      {id: 101610, name: '800 Blacksmiths'},
      {id: 101611, name: '900 Blacksmiths'},
      {id: 101612, name: '1000 Blacksmiths'},
      {id: 101613, name: '1500 Blacksmiths'},
      {id: 101614, name: '2000 Blacksmiths'},
      {id: 101615, name: '2500 Blacksmiths'},
      {id: 101616, name: '3000 Blacksmiths'},
      {id: 101617, name: '3500 Blacksmiths'},
      {id: 101618, name: '5000 Blacksmiths'},
      {id: 101619, name: '7500 Blacksmiths'},
      {id: 101620, name: '12000 Blacksmiths'},
      {id: 101621, name: '20000 Blacksmiths'},
      {id: 101700, name: 'Village Grinder'},
      {id: 101701, name: 'Town Grinder'},
      {id: 101702, name: 'City Grinder'},
      {id: 101703, name: 'Kingdom Grinder'},
      {id: 101704, name: 'Empire Grinder'},
      {id: 101705, name: 'Realm Grinder'},
      {id: 101706, name: 'History Grinder'},
      {id: 101707, name: 'World Grinder'},
      {id: 101708, name: 'Universe Grinder'},
      {id: 101709, name: 'Multiverse Grinder'},
      {id: 101710, name: 'Metagrinder'},
      {id: 101711, name: 'Overgrinder'},
      {id: 101712, name: 'True Grinder'},
      {id: 101713, name: 'Master Grinder'},
      {id: 101714, name: 'Grandmaster Grinder'},
      {id: 101800, name: '1 Cathedral'},
      {id: 101801, name: '50 Cathedrals'},
      {id: 101802, name: '100 Cathedrals'},
      {id: 101803, name: '150 Cathedrals'},
      {id: 101804, name: '200 Cathedrals'},
      {id: 101805, name: '300 Cathedrals'},
      {id: 101806, name: '400 Cathedrals'},
      {id: 101807, name: '500 Cathedrals'},
      {id: 101808, name: '600 Cathedrals'},
      {id: 101809, name: '700 Cathedrals'},
      {id: 101810, name: '800 Cathedrals'},
      {id: 101811, name: '900 Cathedrals'},
      {id: 101812, name: '1000 Cathedrals'},
      {id: 101813, name: '1500 Cathedrals'},
      {id: 101814, name: '2000 Cathedrals'},
      {id: 101815, name: '2500 Cathedrals'},
      {id: 101816, name: '3000 Cathedrals'},
      {id: 101817, name: '3500 Cathedrals'},
      {id: 101818, name: '5000 Cathedrals'},
      {id: 101819, name: '7500 Cathedrals'},
      {id: 101820, name: '12000 Cathedrals'},
      {id: 101821, name: '20000 Cathedrals'},
      {id: 101900, name: '1 Citadel'},
      {id: 101901, name: '50 Citadels'},
      {id: 101902, name: '100 Citadels'},
      {id: 101903, name: '150 Citadels'},
      {id: 101904, name: '200 Citadels'},
      {id: 101905, name: '300 Citadels'},
      {id: 101906, name: '400 Citadels'},
      {id: 101907, name: '500 Citadels'},
      {id: 101908, name: '600 Citadels'},
      {id: 101909, name: '700 Citadels'},
      {id: 101910, name: '800 Citadels'},
      {id: 101911, name: '900 Citadels'},
      {id: 101912, name: '1000 Citadels'},
      {id: 101913, name: '1500 Citadels'},
      {id: 101914, name: '2000 Citadels'},
      {id: 101915, name: '2500 Citadels'},
      {id: 101916, name: '3000 Citadels'},
      {id: 101917, name: '3500 Citadels'},
      {id: 101918, name: '5000 Citadels'},
      {id: 101919, name: '7500 Citadels'},
      {id: 101920, name: '12000 Citadels'},
      {id: 101921, name: '20000 Citadels'},
      {id: 102000, name: '1 Dark Temple'},
      {id: 102001, name: '50 Dark Temples'},
      {id: 102002, name: '100 Dark Temples'},
      {id: 102003, name: '150 Dark Temples'},
      {id: 102004, name: '200 Dark Temples'},
      {id: 102005, name: '300 Dark Temples'},
      {id: 102006, name: '400 Dark Temples'},
      {id: 102007, name: '500 Dark Temples'},
      {id: 102008, name: '600 Dark Temples'},
      {id: 102009, name: '700 Dark Temples'},
      {id: 102010, name: '800 Dark Temples'},
      {id: 102011, name: '900 Dark Temples'},
      {id: 102012, name: '1000 Dark Temples'},
      {id: 102013, name: '1500 Dark Temples'},
      {id: 102014, name: '2000 Dark Temples'},
      {id: 102015, name: '2500 Dark Temples'},
      {id: 102016, name: '3000 Dark Temples'},
      {id: 102017, name: '3500 Dark Temples'},
      {id: 102018, name: '5000 Dark Temples'},
      {id: 102018, name: '5000 Dark Temples'},
      {id: 102019, name: '7500 Dark Temples'},
      {id: 102020, name: '12000 Dark Temples'},
      {id: 102021, name: '20000 Dark Temples'},
      {id: 102100, name: '1 Deep Mine'},
      {id: 102101, name: '50 Deep Mines'},
      {id: 102102, name: '100 Deep Mines'},
      {id: 102103, name: '150 Deep Mines'},
      {id: 102104, name: '200 Deep Mines'},
      {id: 102105, name: '300 Deep Mines'},
      {id: 102106, name: '400 Deep Mines'},
      {id: 102107, name: '500 Deep Mines'},
      {id: 102108, name: '600 Deep Mines'},
      {id: 102109, name: '700 Deep Mines'},
      {id: 102110, name: '800 Deep Mines'},
      {id: 102111, name: '900 Deep Mines'},
      {id: 102112, name: '1000 Deep Mines'},
      {id: 102113, name: '1500 Deep Mines'},
      {id: 102114, name: '2000 Deep Mines'},
      {id: 102115, name: '2500 Deep Mines'},
      {id: 102116, name: '3000 Deep Mines'},
      {id: 102117, name: '3500 Deep Mines'},
      {id: 102118, name: '5000 Deep Mines'},
      {id: 102119, name: '7500 Deep Mines'},
      {id: 102120, name: '12000 Deep Mines'},
      {id: 102121, name: '20000 Deep Mines'},
      {id: 102200, name: '1 Evil Fortress'},
      {id: 102201, name: '50 Evil Fortresses'},
      {id: 102202, name: '100 Evil Fortresses'},
      {id: 102203, name: '150 Evil Fortresses'},
      {id: 102204, name: '200 Evil Fortresses'},
      {id: 102205, name: '300 Evil Fortresses'},
      {id: 102206, name: '400 Evil Fortresses'},
      {id: 102207, name: '500 Evil Fortresses'},
      {id: 102208, name: '600 Evil Fortresses'},
      {id: 102209, name: '700 Evil Fortresses'},
      {id: 102210, name: '800 Evil Fortresses'},
      {id: 102211, name: '900 Evil Fortresses'},
      {id: 102212, name: '1000 Evil Fortresses'},
      {id: 102213, name: '1500 Evil Fortresses'},
      {id: 102214, name: '2000 Evil Fortresses'},
      {id: 102215, name: '2500 Evil Fortresses'},
      {id: 102216, name: '3000 Evil Fortresses'},
      {id: 102217, name: '3500 Evil Fortresses'},
      {id: 102218, name: '5000 Evil Fortresses'},
      {id: 102219, name: '7500 Evil Fortresses'},
      {id: 102220, name: '12000 Evil Fortresses'},
      {id: 102221, name: '20000 Evil Fortresses'},
      {id: 102300, name: '1 Farm'},
      {id: 102301, name: '50 Farms'},
      {id: 102302, name: '100 Farms'},
      {id: 102303, name: '150 Farms'},
      {id: 102304, name: '200 Farms'},
      {id: 102305, name: '300 Farms'},
      {id: 102306, name: '400 Farms'},
      {id: 102307, name: '500 Farms'},
      {id: 102308, name: '600 Farms'},
      {id: 102309, name: '700 Farms'},
      {id: 102310, name: '800 Farms'},
      {id: 102311, name: '900 Farms'},
      {id: 102312, name: '1000 Farms'},
      {id: 102313, name: '1500 Farms'},
      {id: 102314, name: '2000 Farms'},
      {id: 102315, name: '2500 Farms'},
      {id: 102316, name: '3000 Farms'},
      {id: 102317, name: '3500 Farms'},
      {id: 102318, name: '5000 Farms'},
      {id: 102319, name: '7500 Farms'},
      {id: 102320, name: '12000 Farms'},
      {id: 102321, name: '20000 Farms'},
      {id: 102400, name: '1 Hall Of Legends'},
      {id: 102401, name: '50 Halls Of Legends'},
      {id: 102402, name: '100 Halls Of Legends'},
      {id: 102403, name: '150 Halls Of Legends'},
      {id: 102404, name: '200 Halls Of Legends'},
      {id: 102405, name: '300 Halls Of Legends'},
      {id: 102406, name: '400 Halls Of Legends'},
      {id: 102407, name: '500 Halls Of Legends'},
      {id: 102408, name: '600 Halls Of Legends'},
      {id: 102409, name: '700 Halls Of Legends'},
      {id: 102410, name: '800 Halls Of Legends'},
      {id: 102411, name: '900 Halls Of Legends'},
      {id: 102412, name: '1000 Halls Of Legends'},
      {id: 102413, name: '1500 Halls Of Legends'},
      {id: 102414, name: '2000 Halls Of Legends'},
      {id: 102415, name: '2500 Halls Of Legends'},
      {id: 102416, name: '3000 Halls Of Legends'},
      {id: 102417, name: '3500 Halls Of Legends'},
      {id: 102418, name: '5000 Halls Of Legends'},
      {id: 102419, name: '7500 Halls Of Legends'},
      {id: 102420, name: '12000 Halls Of Legends'},
      {id: 102421, name: '20000 Halls of Legends'},
      {id: 102500, name: '1 Heavens Gate'},
      {id: 102501, name: '50 Heavens Gates'},
      {id: 102502, name: '100 Heavens Gates'},
      {id: 102503, name: '150 Heavens Gates'},
      {id: 102504, name: '200 Heavens Gates'},
      {id: 102505, name: '300 Heavens Gates'},
      {id: 102506, name: '400 Heavens Gates'},
      {id: 102507, name: '500 Heavens Gates'},
      {id: 102508, name: '600 Heavens Gates'},
      {id: 102509, name: '700 Heavens Gates'},
      {id: 102510, name: '800 Heavens Gates'},
      {id: 102511, name: '900 Heavens Gates'},
      {id: 102512, name: '1000 Heavens Gates'},
      {id: 102513, name: '1500 Heavens Gates'},
      {id: 102514, name: '2000 Heavens Gates'},
      {id: 102515, name: '2500 Heavens Gates'},
      {id: 102516, name: '3000 Heavens Gates'},
      {id: 102517, name: '3500 Heavens Gates'},
      {id: 102518, name: '5000 Heavens Gates'},
      {id: 102519, name: '7500 Heavens Gates'},
      {id: 102520, name: '12000 Heavens Gates'},
      {id: 102521, name: '20000 Heavens Gates'},
      {id: 102600, name: '1 Hell Portal'},
      {id: 102601, name: '50 Hell Portals'},
      {id: 102602, name: '100 Hell Portals'},
      {id: 102603, name: '150 Hell Portals'},
      {id: 102604, name: '200 Hell Portals'},
      {id: 102605, name: '300 Hell Portals'},
      {id: 102606, name: '400 Hell Portals'},
      {id: 102607, name: '500 Hell Portals'},
      {id: 102608, name: '600 Hell Portals'},
      {id: 102609, name: '700 Hell Portals'},
      {id: 102610, name: '800 Hell Portals'},
      {id: 102611, name: '900 Hell Portals'},
      {id: 102612, name: '1000 Hell Portals'},
      {id: 102613, name: '1500 Hell Portals'},
      {id: 102614, name: '2000 Hell Portals'},
      {id: 102615, name: '2500 Hell Portals'},
      {id: 102616, name: '3000 Hell Portals'},
      {id: 102617, name: '3500 Hell Portals'},
      {id: 102618, name: '5000 Hell Portals'},
      {id: 102619, name: '75000 Hell Portals'},
      {id: 102620, name: '12000 Hell Portals'},
      {id: 102621, name: '20000 Hell Portals'},
      {id: 102700, name: '1 Inn'},
      {id: 102701, name: '50 Inns'},
      {id: 102702, name: '100 Inns'},
      {id: 102703, name: '150 Inns'},
      {id: 102704, name: '200 Inns'},
      {id: 102705, name: '300 Inns'},
      {id: 102706, name: '400 Inns'},
      {id: 102707, name: '500 Inns'},
      {id: 102708, name: '600 Inns'},
      {id: 102709, name: '700 Inns'},
      {id: 102710, name: '800 Inns'},
      {id: 102711, name: '900 Inns'},
      {id: 102712, name: '1000 Inns'},
      {id: 102713, name: '1500 Inns'},
      {id: 102714, name: '2000 Inns'},
      {id: 102715, name: '2500 Inns'},
      {id: 102716, name: '3000 Inns'},
      {id: 102717, name: '3500 Inns'},
      {id: 102718, name: '5000 Inns'},
      {id: 102719, name: '7500 Inns'},
      {id: 102720, name: '12000 Inns'},
      {id: 102721, name: '20000 Inns'},
      {id: 102800, name: '1 Iron Stronghold'},
      {id: 102801, name: '50 Iron Strongholds'},
      {id: 102802, name: '100 Iron Strongholds'},
      {id: 102803, name: '150 Iron Strongholds'},
      {id: 102804, name: '200 Iron Strongholds'},
      {id: 102805, name: '300 Iron Strongholds'},
      {id: 102806, name: '400 Iron Strongholds'},
      {id: 102807, name: '500 Iron Strongholds'},
      {id: 102808, name: '600 Iron Strongholds'},
      {id: 102809, name: '700 Iron Strongholds'},
      {id: 102810, name: '800 Iron Strongholds'},
      {id: 102811, name: '900 Iron Strongholds'},
      {id: 102812, name: '1000 Iron Strongholds'},
      {id: 102813, name: '1500 Iron Strongholds'},
      {id: 102814, name: '2000 Iron Strongholds'},
      {id: 102815, name: '2500 Iron Strongholds'},
      {id: 102816, name: '3000 Iron Strongholds'},
      {id: 102817, name: '3500 Iron Strongholds'},
      {id: 102818, name: '5000 Iron Strongholds'},
      {id: 102819, name: '7500 Iron Strongholds'},
      {id: 102820, name: '12000 Iron Strongholds'},
      {id: 102821, name: '20000 Iron Strongholds'},
      {id: 102900, name: '1 Knights Joust'},
      {id: 102901, name: '50 Knights Jousts'},
      {id: 102902, name: '100 Knights Jousts'},
      {id: 102903, name: '150 Knights Jousts'},
      {id: 102904, name: '200 Knights Jousts'},
      {id: 102905, name: '300 Knights Jousts'},
      {id: 102906, name: '400 Knights Jousts'},
      {id: 102907, name: '500 Knights Jousts'},
      {id: 102908, name: '600 Knights Jousts'},
      {id: 102909, name: '700 Knights Jousts'},
      {id: 102910, name: '800 Knights Jousts'},
      {id: 102911, name: '900 Knights Jousts'},
      {id: 102912, name: '1000 Knights Jousts'},
      {id: 102913, name: '1500 Knights Jousts'},
      {id: 102914, name: '2000 Knights Jousts'},
      {id: 102915, name: '2500 Knights Jousts'},
      {id: 102916, name: '3000 Knights Jousts'},
      {id: 102917, name: '3500 Knights Jousts'},
      {id: 102918, name: '5000 Knights Jousts'},
      {id: 102919, name: '7500 Knights Jousts'},
      {id: 102920, name: '12000 Knights Jousts'},
      {id: 102921, name: '20000 Knights Jousts'},
      {id: 103000, name: '1 Labyrinth'},
      {id: 103001, name: '50 Labyrinths'},
      {id: 103002, name: '100 Labyrinths'},
      {id: 103003, name: '150 Labyrinths'},
      {id: 103004, name: '200 Labyrinths'},
      {id: 103005, name: '300 Labyrinths'},
      {id: 103006, name: '400 Labyrinths'},
      {id: 103007, name: '500 Labyrinths'},
      {id: 103008, name: '600 Labyrinths'},
      {id: 103009, name: '700 Labyrinths'},
      {id: 103010, name: '800 Labyrinths'},
      {id: 103011, name: '900 Labyrinths'},
      {id: 103012, name: '1000 Labyrinths'},
      {id: 103013, name: '1500 Labyrinths'},
      {id: 103014, name: '2000 Labyrinths'},
      {id: 103015, name: '2500 Labyrinths'},
      {id: 103016, name: '3000 Labyrinths'},
      {id: 103017, name: '3500 Labyrinths'},
      {id: 103018, name: '5000 Labyrinths'},
      {id: 103019, name: '7500 Labyrinths'},
      {id: 103020, name: '12000 Labyrinths'},
      {id: 103021, name: '20000 Labyrinths'},
      {id: 103100, name: '1 Monastery'},
      {id: 103101, name: '50 Monasteries'},
      {id: 103102, name: '100 Monasteries'},
      {id: 103103, name: '150 Monasteries'},
      {id: 103104, name: '200 Monasteries'},
      {id: 103105, name: '300 Monasteries'},
      {id: 103106, name: '400 Monasteries'},
      {id: 103107, name: '500 Monasteries'},
      {id: 103108, name: '600 Monasteries'},
      {id: 103109, name: '700 Monasteries'},
      {id: 103110, name: '800 Monasteries'},
      {id: 103111, name: '900 Monasteries'},
      {id: 103112, name: '1000 Monasteries'},
      {id: 103113, name: '1500 Monasteries'},
      {id: 103114, name: '2000 Monasteries'},
      {id: 103115, name: '2500 Monasteries'},
      {id: 103116, name: '3000 Monasteries'},
      {id: 103117, name: '3500 Monasteries'},
      {id: 103118, name: '5000 Monasteries'},
      {id: 103119, name: '7500 Monasteries'},
      {id: 103120, name: '12000 Monasteries'},
      {id: 103121, name: '20000 Monasteries'},
      {id: 103200, name: '1 Necropolis'},
      {id: 103201, name: '50 Necropolises'},
      {id: 103202, name: '100 Necropolises'},
      {id: 103203, name: '150 Necropolises'},
      {id: 103204, name: '200 Necropolises'},
      {id: 103205, name: '300 Necropolises'},
      {id: 103206, name: '400 Necropolises'},
      {id: 103207, name: '500 Necropolises'},
      {id: 103208, name: '600 Necropolises'},
      {id: 103209, name: '700 Necropolises'},
      {id: 103210, name: '800 Necropolises'},
      {id: 103211, name: '900 Necropolises'},
      {id: 103212, name: '1000 Necropolises'},
      {id: 103213, name: '1500 Necropolises'},
      {id: 103214, name: '2000 Necropolises'},
      {id: 103215, name: '2500 Necropolises'},
      {id: 103216, name: '3000 Necropolises'},
      {id: 103217, name: '3500 Necropolises'},
      {id: 103218, name: '5000 Necropolises'},
      {id: 103219, name: '7500 Necropolises'},
      {id: 103220, name: '12000 Necropolises'},
      {id: 103221, name: '20000 Necropolises'},
      {id: 103300, name: '1 Orcish Arena'},
      {id: 103301, name: '50 Orcish Arenas'},
      {id: 103302, name: '100 Orcish Arenas'},
      {id: 103303, name: '150 Orcish Arenas'},
      {id: 103304, name: '200 Orcish Arenas'},
      {id: 103305, name: '300 Orcish Arenas'},
      {id: 103306, name: '400 Orcish Arenas'},
      {id: 103307, name: '500 Orcish Arenas'},
      {id: 103308, name: '600 Orcish Arenas'},
      {id: 103309, name: '700 Orcish Arenas'},
      {id: 103310, name: '800 Orcish Arenas'},
      {id: 103311, name: '900 Orcish Arenas'},
      {id: 103312, name: '1000 Orcish Arenas'},
      {id: 103313, name: '1500 Orcish Arenas'},
      {id: 103314, name: '2000 Orcish Arenas'},
      {id: 103315, name: '2500 Orcish Arenas'},
      {id: 103316, name: '3000 Orcish Arenas'},
      {id: 103317, name: '3500 Orcish Arenas'},
      {id: 103318, name: '5000 Orcish Arenas'},
      {id: 103319, name: '7500 Orcish Arenas'},
      {id: 103320, name: '12000 Orcish Arenas'},
      {id: 103321, name: '20000 Orcish Arenas'},
      {id: 103400, name: '1 Royal Castle'},
      {id: 103401, name: '50 Royal Castles'},
      {id: 103402, name: '100 Royal Castles'},
      {id: 103403, name: '150 Royal Castles'},
      {id: 103404, name: '200 Royal Castles'},
      {id: 103405, name: '300 Royal Castles'},
      {id: 103406, name: '400 Royal Castles'},
      {id: 103407, name: '500 Royal Castles'},
      {id: 103408, name: '600 Royal Castles'},
      {id: 103409, name: '700 Royal Castles'},
      {id: 103410, name: '800 Royal Castles'},
      {id: 103411, name: '900 Royal Castles'},
      {id: 103412, name: '1000 Royal Castles'},
      {id: 103413, name: '1500 Royal Castles'},
      {id: 103414, name: '2000 Royal Castles'},
      {id: 103415, name: '2500 Royal Castles'},
      {id: 103416, name: '3000 Royal Castles'},
      {id: 103417, name: '3500 Royal Castles'},
      {id: 103418, name: '5000 Royal Castles'},
      {id: 103419, name: '7500 Royal Castles'},
      {id: 103420, name: '12000 Royal Castles'},
      {id: 103421, name: '20000 Royal Castles'},
      {id: 103500, name: '1 Slave Pen'},
      {id: 103501, name: '50 Slave Pens'},
      {id: 103502, name: '100 Slave Pens'},
      {id: 103503, name: '150 Slave Pens'},
      {id: 103504, name: '200 Slave Pens'},
      {id: 103505, name: '300 Slave Pens'},
      {id: 103506, name: '400 Slave Pens'},
      {id: 103507, name: '500 Slave Pens'},
      {id: 103508, name: '600 Slave Pens'},
      {id: 103509, name: '700 Slave Pens'},
      {id: 103510, name: '800 Slave Pens'},
      {id: 103511, name: '900 Slave Pens'},
      {id: 103512, name: '1000 Slave Pens'},
      {id: 103513, name: '1500 Slave Pens'},
      {id: 103514, name: '2000 Slave Pens'},
      {id: 103515, name: '2500 Slave Pens'},
      {id: 103516, name: '3000 Slave Pens'},
      {id: 103517, name: '3500 Slave Pens'},
      {id: 103518, name: '5000 Slave Pens'},
      {id: 103519, name: '7500 Slave Pens'},
      {id: 103520, name: '12000 Slave Pens'},
      {id: 103521, name: '20000 Slave Pens'},
      {id: 103600, name: '1 Stone Pillar'},
      {id: 103601, name: '50 Stone Pillars'},
      {id: 103602, name: '100 Stone Pillars'},
      {id: 103603, name: '150 Stone Pillars'},
      {id: 103604, name: '200 Stone Pillars'},
      {id: 103605, name: '300 Stone Pillars'},
      {id: 103606, name: '400 Stone Pillars'},
      {id: 103607, name: '500 Stone Pillars'},
      {id: 103608, name: '600 Stone Pillars'},
      {id: 103609, name: '700 Stone Pillars'},
      {id: 103610, name: '800 Stone Pillars'},
      {id: 103611, name: '900 Stone Pillars'},
      {id: 103612, name: '1000 Stone Pillars'},
      {id: 103613, name: '1500 Stone Pillars'},
      {id: 103614, name: '2000 Stone Pillars'},
      {id: 103615, name: '2500 Stone Pillars'},
      {id: 103616, name: '3000 Stone Pillars'},
      {id: 103617, name: '3500 Stone Pillars'},
      {id: 103618, name: '5000 Stone Pillars'},
      {id: 103619, name: '7500 Stone Pillars'},
      {id: 103620, name: '12000 Stone Pillars'},
      {id: 103621, name: '20000 Stone Pillars'},
      {id: 103700, name: '1 Warrior Barracks'},
      {id: 103701, name: '50 Warrior Barracks'},
      {id: 103702, name: '100 Warrior Barracks'},
      {id: 103703, name: '150 Warrior Barracks'},
      {id: 103704, name: '200 Warrior Barracks'},
      {id: 103705, name: '300 Warrior Barracks'},
      {id: 103706, name: '400 Warrior Barracks'},
      {id: 103707, name: '500 Warrior Barracks'},
      {id: 103708, name: '600 Warrior Barracks'},
      {id: 103709, name: '700 Warrior Barracks'},
      {id: 103710, name: '800 Warrior Barracks'},
      {id: 103711, name: '900 Warrior Barracks'},
      {id: 103712, name: '1000 Warrior Barracks'},
      {id: 103713, name: '1500 Warrior Barracks'},
      {id: 103714, name: '2000 Warrior Barracks'},
      {id: 103715, name: '2500 Warrior Barracks'},
      {id: 103716, name: '3000 Warrior Barracks'},
      {id: 103717, name: '3500 Warrior Barracks'},
      {id: 103718, name: '5000 Warrior Barracks'},
      {id: 103719, name: '7500 Warrior Barracks'},
      {id: 103720, name: '12000 Warrior Barracks'},
      {id: 103721, name: '20000 Warrior Barracks'},
      {id: 103800, name: '1 Witch Conclave'},
      {id: 103801, name: '50 Witch Conclaves'},
      {id: 103802, name: '100 Witch Conclaves'},
      {id: 103803, name: '150 Witch Conclaves'},
      {id: 103804, name: '200 Witch Conclaves'},
      {id: 103805, name: '300 Witch Conclaves'},
      {id: 103806, name: '400 Witch Conclaves'},
      {id: 103807, name: '500 Witch Conclaves'},
      {id: 103808, name: '600 Witch Conclaves'},
      {id: 103809, name: '700 Witch Conclaves'},
      {id: 103810, name: '800 Witch Conclaves'},
      {id: 103811, name: '900 Witch Conclaves'},
      {id: 103812, name: '1000 Witch Conclaves'},
      {id: 103813, name: '1500 Witch Conclaves'},
      {id: 103814, name: '2000 Witch Conclaves'},
      {id: 103815, name: '2500 Witch Conclaves'},
      {id: 103816, name: '3000 Witch Conclaves'},
      {id: 103817, name: '3500 Witch Conclaves'},
      {id: 103818, name: '5000 Witch Conclaves'},
      {id: 103819, name: '7500 Witch Conclaves'},
      {id: 103820, name: '12000 Witch Conclaves'},
      {id: 103821, name: '20000 Witch Conclaves'},
      {id: 103900, name: '1 Wizard Tower'},
      {id: 103901, name: '50 Wizard Towers'},
      {id: 103902, name: '100 Wizard Towers'},
      {id: 103903, name: '150 Wizard Towers'},
      {id: 103904, name: '200 Wizard Towers'},
      {id: 103905, name: '300 Wizard Towers'},
      {id: 103906, name: '400 Wizard Towers'},
      {id: 103907, name: '500 Wizard Towers'},
      {id: 103908, name: '600 Wizard Towers'},
      {id: 103909, name: '700 Wizard Towers'},
      {id: 103910, name: '800 Wizard Towers'},
      {id: 103911, name: '900 Wizard Towers'},
      {id: 103912, name: '1000 Wizard Towers'},
      {id: 103913, name: '1500 Wizard Towers'},
      {id: 103914, name: '2000 Wizard Towers'},
      {id: 103915, name: '2500 Wizard Towers'},
      {id: 103916, name: '3000 Wizard Towers'},
      {id: 103917, name: '3500 Wizard Towers'},
      {id: 103918, name: '5000 Wizard Towers'},
      {id: 103919, name: '7500 Wizard Towers'},
      {id: 103920, name: '12000 Wizard Towers'},
      {id: 103921, name: '20000 Wizard Towers'},
      {id: 104000, name: 'Magic User'},
      {id: 104001, name: 'Magic Abuser'},
      {id: 104002, name: 'Spell Prodigy'},
      {id: 104003, name: 'Mana Leaker'},
      {id: 104004, name: 'Mana Eraser'},
      {id: 104005, name: 'Autocaster'},
      {id: 104006, name: 'Spell Spammer'},
      {id: 104007, name: 'Mana Annihilator'},
      {id: 104008, name: 'Master Channeler'},
      {id: 104009, name: 'Caster Supreme'},
      {id: 104010, name: 'Spell Superiority'},
      {id: 104011, name: 'Massive Autocaster'},
      {id: 104012, name: 'Spell Weaver'},
      {id: 104013, name: 'Archwizard'},
      {id: 104014, name: 'Spell Master'},
      {id: 104015, name: 'Spell Grinder'},
      {id: 104100, name: 'A Clicking Start'},
      {id: 104101, name: 'Clicking More'},
      {id: 104102, name: 'Click Clock'},
      {id: 104103, name: 'Clicking Forward'},
      {id: 104104, name: 'Clicking Frenzy'},
      {id: 104105, name: 'World of Clicks'},
      {id: 104106, name: 'The Clicky Way'},
      {id: 104107, name: 'Clicker Eternal'},
      {id: 104108, name: 'Realm Clicker'},
      {id: 104500, name: '1 Faction Coin'},
      {id: 104501, name: '50 Faction Coins'},
      {id: 104502, name: '250 Faction Coins'},
      {id: 104503, name: '1000 Faction Coins'},
      {id: 104504, name: '5000 Faction Coins'},
      {id: 104505, name: '10000 Faction Coins'},
      {id: 104506, name: '50000 Faction Coins'},
      {id: 104507, name: '100000 Faction Coins'},
      {id: 104508, name: '500000 Faction Coins'},
      {id: 104509, name: '1 Million Faction Coins'},
      {id: 104510, name: '100 Millions Faction Coins'},
      {id: 104511, name: '1 Billion Faction Coins'},
      {id: 104512, name: '100 Billion Faction Coins'},
      {id: 104513, name: '1 Trillion Faction Coins'},
      {id: 104514, name: '100 Trillion Faction Coins'},
      {id: 104515, name: '1 Quadrillion Faction Coins'},
      {id: 104516, name: '1 Quintillion Faction Coins'},
      {id: 104517, name: '1 Sextillion Faction Coins'},
      {id: 104518, name: '1 Nonillion Faction Coins'},
      {id: 104519, name: '1 Tredecillion Faction Coins'},
      {id: 104520, name: '1 Septendecillion Faction Coins'},
      {id: 104600, name: 'A Thousand Coins'},
      {id: 104601, name: 'A Million Coins'},
      {id: 104602, name: 'A Billion Coins'},
      {id: 104603, name: 'A Trillion Coins'},
      {id: 104604, name: 'A Quadrillion Coins'},
      {id: 104605, name: 'A Quintillion Coins'},
      {id: 104606, name: 'A Sextillion Coins'},
      {id: 104607, name: 'A Septillion Coins'},
      {id: 104608, name: 'An Octillion Coins'},
      {id: 104609, name: 'A Nonillion Coins'},
      {id: 104610, name: 'A Decillion Coins'},
      {id: 104611, name: 'Countless Coins'},
      {id: 104612, name: 'Infinite Coins'},
      {id: 104613, name: 'Unlimited Coins'},
      {id: 104614, name: 'Endless Coins'},
      {id: 104615, name: 'Coins Galore'},
      {id: 104616, name: 'Coin Multiplication'},
      {id: 104617, name: 'Coin Hemisphere'},
      {id: 104618, name: 'Coin World'},
      {id: 104619, name: 'Coin Universe'},
      {id: 104700, name: 'Treasure Clicker'},
      {id: 104701, name: 'Treasure Finder'},
      {id: 104702, name: 'Treasure Digger'},
      {id: 104703, name: 'Treasure Hunter'},
      {id: 104704, name: 'Treasure Seeker'},
      {id: 104705, name: 'Treasure Master'},
      {id: 104706, name: 'Treasure Hero'},
      {id: 104707, name: 'Treasure Legend'},
      {id: 104708, name: 'Treasure Grinder'},
      {id: 104709, name: 'Treasure Breaker'},
      {id: 104710, name: 'Treasure Smasher'},
      {id: 104711, name: 'Treasure Destroyer'},
      {id: 104712, name: 'Treasure Annihilator'},
      {id: 104713, name: 'Treasure Disintegrator'},
      {id: 104714, name: 'Treasure Ender'},
      {id: 104715, name: 'Treasure Unmaker'},
      {id: 104716, name: 'Treasure Nullifier'},
      {id: 104717, name: 'Treasure Wrecker'},
      {id: 104718, name: 'Treasure Obliterator'},
      {id: 104900, name: '1 Gem'},
      {id: 104901, name: '50 Gems'},
      {id: 104902, name: '150 Gems'},
      {id: 104903, name: '500 Gems'},
      {id: 104904, name: '1000 Gems'},
      {id: 104905, name: '5000 Gems'},
      {id: 104906, name: '15000 Gems'},
      {id: 104907, name: '50000 Gems'},
      {id: 104908, name: '100000 Gems'},
      {id: 104909, name: '1 Billion Gems'},
      {id: 104910, name: '1 Quadrillion Gems'},
      {id: 104911, name: '1 Sextillion Gems'},
      {id: 104912, name: '1 Nonillion Gems'},
      {id: 104913, name: '1 Duodecillion Gems'},
      {id: 104914, name: '1 Quindecillion Gems'},
      {id: 104915, name: '1 Octodecillion Gems'},
      {id: 104916, name: '1 Unvigintillion Gems'},
      {id: 104917, name: '1 Quadravigintillion Gems'},
      {id: 104918, name: '1 Septenvigintillion Gems'},
      {id: 104919, name: '1 Trigintillion Gems'},
      {id: 104920, name: '1 Tretrigintillion Gems'},
      {id: 104921, name: '1 Sextrigintillion Gems'},
      {id: 104922, name: '1 Unquadragintillion Gems'},
      {id: 105000, name: '1 Reincarnation'},
      {id: 105001, name: '3 Reincarnations'},
      {id: 105002, name: '5 Reincarnations'},
      {id: 105003, name: '7 Reincarnations'},
      {id: 105004, name: '10 Reincarnations'},
      {id: 105005, name: '12 Reincarnations'},
      {id: 105006, name: '15 Reincarnations'},
      {id: 105007, name: '20 Reincarnations'},
      {id: 105008, name: '25 Reincarnations'},
      {id: 105009, name: '30 Reincarnations'},
      {id: 105010, name: '35 Reincarnations'},
      {id: 105011, name: '40 Reincarnations'},
      {id: 105012, name: '45 Reincarnations'},
      {id: 105013, name: '50 Reincarnations'},
      {id: 105014, name: '60 Reincarnations'},
      {id: 105015, name: '70 Reincarnations'},
      {id: 105016, name: '85 Reincarnations'},
      {id: 105017, name: '100 Reincarnations'},
      {id: 105018, name: '125 Reincarnations'},
      {id: 105019, name: '150 Reincarnations'},
      {id: 105100, name: 'Assistant Solo'},
      {id: 105101, name: 'Assistant Group'},
      {id: 105102, name: 'Assistant Commando'},
      {id: 105103, name: 'Assistant Squad'},
      {id: 105104, name: 'Assistant Army'},
      {id: 105105, name: 'Assistant Legion'},
      {id: 105106, name: 'Assistant Horde'},
      {id: 105107, name: 'Assistant Host'},
      {id: 105108, name: 'Assistant Clump'},
      {id: 105109, name: 'Assistant Nation'},
      {id: 105110, name: 'Assistant Kingdom'},
      {id: 105111, name: 'Assistant Continent'},
      {id: 105112, name: 'Assistant World'},
      {id: 105113, name: 'Assistant Galaxy'},
      {id: 105114, name: 'Assistant Universe'},
      {id: 105115, name: 'Assistant Dimension'},
      {id: 105116, name: 'Assistant Multiverse'},
      {id: 105117, name: 'Assistant Stratum'},
      {id: 105500, name: '1 Upgrade'},
      {id: 105501, name: '5 Upgrades'},
      {id: 105502, name: '15 Upgrades'},
      {id: 105503, name: '30 Upgrades'},
      {id: 105504, name: '50 Upgrades'},
      {id: 105505, name: '85 Upgrades'},
      {id: 105506, name: '120 Upgrades'},
      {id: 105507, name: '175 Upgrades'},
      {id: 105508, name: '235 Upgrades'},
      {id: 105509, name: '305 Upgrades'},
      {id: 105510, name: '385 Upgrades'},
      {id: 111200, name: 'Mana Droplet'},
      {id: 111201, name: 'Mana Rain'},
      {id: 111202, name: 'Mana Surge'},
      {id: 111203, name: 'Mana Fountain'},
      {id: 111204, name: 'Mana Shower'},
      {id: 111205, name: 'Mana Stream'},
      {id: 111206, name: 'Mana Flood'},
      {id: 111207, name: 'Mana Wave'},
      {id: 111208, name: 'Mana River'},
      {id: 111209, name: 'Mana Lake'},
      {id: 111210, name: 'Mana Sea'},
      {id: 111211, name: 'Mana Ocean'},
      {id: 111212, name: 'Mana Spring'},
      {id: 111213, name: 'Mana Falls'},
      {id: 116200, name: '1 Ruby'},
      {id: 116201, name: '10 Rubies'},
      {id: 116202, name: '25 Rubies'},
      {id: 116203, name: '50 Rubies'},
      {id: 116700, name: 'Gift Collector 1'},
      {id: 116701, name: 'Gift Collector 2'},
      {id: 116702, name: 'Gift Collector 3'},
      {id: 116703, name: 'Gift Collector 4'},
      {id: 116800, name: 'Snowpile 1'},
      {id: 116801, name: 'Snowpile 2'},
      {id: 116802, name: 'Snowpile 3'},
      {id: 116803, name: 'Snowpile 4'},
      {id: 117000, name: '1 Artifact'},
      {id: 117001, name: '5 Artifacts'},
      {id: 117002, name: '10 Artifacts'},
      {id: 117003, name: '20 Artifacts'},
      {id: 117004, name: '35 Artifacts'},
      {id: 117005, name: '50 Artifacts'},
      {id: 117006, name: '75 Artifacts'},
      {id: 117600, name: 'Feel the Love 1'},
      {id: 117601, name: 'Feel the Love 2'},
      {id: 117602, name: 'Feel the Love 3'},
      {id: 119500, name: 'Egg Hunter 1'},
      {id: 119501, name: 'Egg Hunter 2'},
      {id: 119502, name: 'Egg Hunter 3'},
      {id: 119503, name: 'Egg Hunter 4'},
      {id: 119600, name: 'Egg Collection 1'},
      {id: 119601, name: 'Egg Collection 2'},
      {id: 119602, name: 'Egg Collection 3'},
      {id: 119603, name: 'Egg Collection 4'},
      {id: 120800, name: 'Summeraan Champion 1'},
      {id: 120801, name: 'Summeraan Champion 2'},
      {id: 120802, name: 'Summeraan Champion 3'},
      {id: 120900, name: 'Winterly Champion 1'},
      {id: 120901, name: 'Winterly Champion 2'},
      {id: 120902, name: 'Winterly Champion 3'},
      {id: 122400, name: 'Monster Breeder 1'},
      {id: 122401, name: 'Monster Breeder 2'},
      {id: 122402, name: 'Monster Breeder 3'},
      {id: 122500, name: 'Pumpkin Smasher 1'},
      {id: 122501, name: 'Pumpkin Smasher 2'},
      {id: 122502, name: 'Pumpkin Smasher 3'},
      {id: 122503, name: 'Pumpkin Smasher 4'},
      {id: 123200, name: 'Arcane Brilliance 1'},
      {id: 123201, name: 'Arcane Brilliance 2'},
      {id: 123202, name: 'Arcane Brilliance 3'},
      {id: 123203, name: 'Arcane Brilliance 4'},
      {id: 123204, name: 'Arcane Brilliance 5'},
      {id: 123205, name: 'Arcane Brilliance 6'}
    ];
    this.upgradeIDs = [
      {id: 204, name: 'Fairy 1,1: Pixie Dust Fertilizer'},
      {id: 195, name: 'Fairy 1,2: Fairy Cuisine'},
      {id: 207, name: 'Fairy 1,3: Starmetal Alloys'},
      {id: 201, name: 'Fairy 2,1: Fairy Workers'},
      {id: 202, name: 'Fairy 2,2: Golden Pots'},
      {id: 206, name: 'Fairy 2,3: Spellsmith'},
      {id: 203, name: 'Fairy 3,1: Kind Hearts'},
      {id: 205, name: 'Fairy 3,2: Rainbow Link'},
      {id: 208, name: 'Fairy 3,3: Swarm of Fairies'},
      {id: 200, name: 'Fairy Heritage'},
      {id: 194, name: 'Fairy Bloodline'},
      {id: 832, name: 'Fairy Set'},
      {id: 174, name: 'Elven 1,1: Elven Mint'},
      {id: 175, name: 'Elven 1,2: Elven Treasure Casing'},
      {id: 177, name: 'Elven 1,3: Sylvan Treasure Frills'},
      {id: 167, name: 'Elven 2,1: Elven Emissary'},
      {id: 166, name: 'Elven 2,2: Elven Efficiency'},
      {id: 176, name: 'Elven 2,3: Secret Clicking Techniques'},
      {id: 165, name: 'Elven 3,1: Elven Diplomacy'},
      {id: 173, name: 'Elven 3,2: Elven Luck'},
      {id: 163, name: 'Elven 3,3: Ancient Clicking Arts'},
      {id: 172, name: 'Elven Heritage'},
      {id: 164, name: 'Elven Bloodline'},
      {id: 830, name: 'Elven Set'},
      {id: 51, name: 'Angel 1,1: Holy Bells'},
      {id: 44, name: 'Angel 1,2: Angelic Determination'},
      {id: 43, name: 'Angel 1,3: Angel Feathers'},
      {id: 50, name: 'Angel 2,1: Guardian Angels'},
      {id: 48, name: 'Angel 2,2: Angelic Wisdom'},
      {id: 49, name: 'Angel 2,3: Archangel Feathers'},
      {id: 52, name: 'Angel 3,1: Magical Gates'},
      {id: 45, name: 'Angel 3,2: Angelic Dominance'},
      {id: 53, name: 'Angel 3,3: Wings of Liberty'},
      {id: 47, name: 'Angelic Heritage'},
      {id: 39, name: 'Angel Bloodline'},
      {id: 824, name: 'Angel Set'},
      {id: 223, name: 'Goblin 1,1: Strong Currency'},
      {id: 222, name: 'Goblin 1,2: Slave Trading'},
      {id: 210, name: 'Goblin 1,3: Cheap Materials'},
      {id: 209, name: 'Goblin 2,1: Black Market'},
      {id: 221, name: 'Goblin 2,2: Hobgoblin Gladiators'},
      {id: 214, name: 'Goblin 2,3: Goblin Economists'},
      {id: 213, name: 'Goblin 3,1: Goblin Central Bank'},
      {id: 211, name: 'Goblin 3,2: Fool\'s Gold'},
      {id: 220, name: 'Goblin 3,3: Green Fingers Discount'},
      {id: 219, name: 'Goblin Heritage'},
      {id: 212, name: 'Goblin Bloodline'},
      {id: 833, name: 'Goblin Set'},
      {id: 394, name: 'Undead 1,1: The Walking Dead'},
      {id: 390, name: 'Undead 1,2: Deadened Muscles'},
      {id: 392, name: 'Undead 1,3: Death Temples'},
      {id: 403, name: 'Undead 2,1: Unholy Rituals'},
      {id: 389, name: 'Undead 2,2: Corpse Supply'},
      {id: 393, name: 'Undead 2,3: Plagued Buildings'},
      {id: 391, name: 'Undead 3,1: Dead Fields'},
      {id: 395, name: 'Undead 3,2: Tireless Workers'},
      {id: 402, name: 'Undead 3,3: Undead Resilience'},
      {id: 401, name: 'Undead Heritage'},
      {id: 396, name: 'Undead Bloodline'},
      {id: 838, name: 'Undead Set'},
      {id: 115, name: 'Demon 1,1: Torture Chambers'},
      {id: 111, name: 'Demon 1,2: Devil Tyrant'},
      {id: 112, name: 'Demon 1,3: Evil Conquerors'},
      {id: 114, name: 'Demon 2,1: Lava Pits'},
      {id: 110, name: 'Demon 2,2: Demon Overseers'},
      {id: 109, name: 'Demon 2,3: Demonic Presence'},
      {id: 113, name: 'Demon 3,1: Infernal Magic'},
      {id: 102, name: 'Demon 3,2: Burning Legion'},
      {id: 116, name: 'Demon 3,3: Very Bad Guys'},
      {id: 108, name: 'Demonic Heritage'},
      {id: 103, name: 'Demon Bloodline'},
      {id: 825, name: 'Demon Set'},
      {id: 376, name: 'Titan 1,1: Colossal Forge'},
      {id: 374, name: 'Titan 1,2: Charged Clicks'},
      {id: 379, name: 'Titan 1,3: Oversized Legends'},
      {id: 381, name: 'Titan 2,1: Titan Drill'},
      {id: 375, name: 'Titan 2,2: Charged Structures'},
      {id: 377, name: 'Titan 2,3: Cyclopean Strength'},
      {id: 387, name: 'Titan 3,1: Titan Sized Walls'},
      {id: 378, name: 'Titan 3,2: Heavy Coins'},
      {id: 386, name: 'Titan 3,3: Titan Obelisk'},
      {id: 385, name: 'Titan Heritage'},
      {id: 380, name: 'Titan Bloodline'},
      {id: 837, name: 'Titan Set'},
      {id: 141, name: 'Druid 1,1: Druidic Vocabulary'},
      {id: 133, name: 'Druid 1,2: Animal Companions'},
      {id: 145, name: 'Druid 1,3: Natural Recycling'},
      {id: 142, name: 'Druid 2,1: Earthly Bond'},
      {id: 134, name: 'Druid 2,2: Bardic Knowledge'},
      {id: 146, name: 'Druid 2,3: Shapeshifting'},
      {id: 144, name: 'Druid 3,1: Mabinogion'},
      {id: 143, name: 'Druid 3,2: Earthly Soul'},
      {id: 135, name: 'Druid 3,3: Building Jungle'},
      {id: 140, name: 'Druid Heritage'},
      {id: 136, name: 'Druid Bloodline'},
      {id: 828, name: 'Druid Set'},
      {id: 193, name: 'Faceless 1,1: Territorial Expanse'},
      {id: 182, name: 'Faceless 1,2: Evolutive Mutation'},
      {id: 181, name: 'Faceless 1,3: Deep Memory'},
      {id: 188, name: 'Faceless 2,1: Gold Synthesis'},
      {id: 191, name: 'Faceless 2,2: Mitosis'},
      {id: 192, name: 'Faceless 2,3: Overgrowth'},
      {id: 190, name: 'Faceless 3,1: Magical Treasure'},
      {id: 180, name: 'Faceless 3,2: Abominations'},
      {id: 189, name: 'Faceless 3,3: Hive Mind'},
      {id: 187, name: 'Faceless Heritage'},
      {id: 183, name: 'Faceless Bloodline'},
      {id: 831, name: 'Faceless Set'},
      {id: 149, name: 'Dwarven 1,1: Dwarven Ale'},
      {id: 157, name: 'Dwarven 1,2: Expert Masonry'},
      {id: 160, name: 'Dwarven 1,3: Mining Prodigies'},
      {id: 162, name: 'Dwarven 2,1: Underground Citadels'},
      {id: 158, name: 'Dwarven 2,2: Indestrucible Treasure'},
      {id: 148, name: 'Dwarven 2,3: Bearded Assistants'},
      {id: 147, name: 'Dwarven 3,1: Battlehammers'},
      {id: 159, name: 'Dwarven 3,2: Magic Resistance'},
      {id: 161, name: 'Dwarven 3,3: Overwatch'},
      {id: 155, name: 'Dwarven Heritage'},
      {id: 150, name: 'Dwarven Bloodline'},
      {id: 829, name: 'Dwarven Set'},
      {id: 132, name: 'Drow 1,1: Underworld Tyranny'},
      {id: 127, name: 'Drow 1,2: Honor Among Killers'},
      {id: 130, name: 'Drow 1,3: Shadow Advance'},
      {id: 128, name: 'Drow 2,1: Mana Addicts'},
      {id: 119, name: 'Drow 2,2: Blood Sacrifices'},
      {id: 117, name: 'Drow 2,3: Blackmail'},
      {id: 131, name: 'Drow 3,1: Spider Gods'},
      {id: 129, name: 'Drow 3,2: Professional Assassins'},
      {id: 118, name: 'Drow 3,3: Blade Dance'},
      {id: 125, name: 'Drow Heritage'},
      {id: 120, name: 'Drow Bloodline'},
      {id: 827, name: 'Drow Set'},
      {id: 608, name: 'Dragon 1,1: Dragonscales'},
      {id: 611, name: 'Dragon 1,2: Iron Flight'},
      {id: 609, name: 'Dragon 1,3: Eternal Wisdom'},
      {id: 599, name: 'Dragon 2,1: Dragonborn'},
      {id: 596, name: 'Dragon 2,2: Bountiful Hoard'},
      {id: 612, name: 'Dragon 2,3: Sharp Claws'},
      {id: 595, name: 'Dragon 3,1: Ancient Hunger'},
      {id: 610, name: 'Dragon 3,2: Imposing Presence'},
      {id: 597, name: 'Dragon 3,3: Chromatic Scales'},
      {id: 603, name: 'Dragon Heritage'},
      {id: 598, name: 'Dragon Bloodline'},
      {id: 826, name: 'Dragon Set'},
      {id: 939, name: 'Archon Bloodline'},
      {id: 940, name: 'Djinn Bloodline'},
      {id: 953, name: 'Makers Bloodline'},
      {id: 834, name: 'Mercenary Set'},
      {id: 778, name: 'Fairy Union'},
      {id: 774, name: 'Elven Union'},
      {id: 770, name: 'Angel Union'},
      {id: 779, name: 'Goblin Union'},
      {id: 781, name: 'Undead Union'},
      {id: 772, name: 'Demon Union'},
      {id: 780, name: 'Titan Union'},
      {id: 773, name: 'Druid Union'},
      {id: 776, name: 'Faceless Union'},
      {id: 847, name: 'Dwarven Union'},
      {id: 846, name: 'Drow Union'},
      {id: 855, name: 'Dragon Union'},
      {id: 880, name: 'Archon Union'},
      {id: 894, name: 'Djinn Union'},
      {id: 915, name: 'Makers Union'},
      {id: 123711, name: 'A200: Corrosion'},
      {id: 123808, name: 'A135: Decay'},
      {id: 123903, name: 'A25: Deflagration'},
      {id: 124002, name: 'A30: Delayed Reaction'},
      {id: 124109, name: 'A150: Explosives'},
      {id: 124206, name: 'A105: Fusion'},
      {id: 124304, name: 'A50: Gilding'},
      {id: 124412, name: 'A250: Philosopher\'s Stone'},
      {id: 124500, name: 'A1: Plague'},
      {id: 124605, name: 'A55: Refraction'},
      {id: 124710, name: 'A175: Soulweaving'},
      {id: 124801, name: 'A10: Transmutation'},
      {id: 124907, name: 'A120: Vivification'},
      {id: 125004, name: 'C80: Apprenticeship'},
      {id: 125111, name: 'C225: Automatons'},
      {id: 125201, name: 'C10: Cultivation'},
      {id: 125300, name: 'C1: Dummy Targets'},
      {id: 125409, name: 'C175: Gemcutting'},
      {id: 125610, name: 'C200: Journeymen'},
      {id: 125702, name: 'C25: Light Condenser'},
      {id: 125812, name: 'C250: Magnetism'},
      {id: 125903, name: 'C50: Refining'},
      {id: 126007, name: 'C135: Reinforcing'},
      {id: 126106, name: 'C120: Socketing'},
      {id: 126208, name: 'C150: Tinkering'},
      {id: 126305, name: 'C105: Woodcraft'},
      {id: 126400, name: 'D1: Blessing'},
      {id: 126507, name: 'D205: Communion'},
      {id: 126602, name: 'D25: Cursing'},
      {id: 126712, name: 'D250: Demonology'},
      {id: 126803, name: 'D50: Hallowing'},
      {id: 126905, name: 'D135: Illumination'},
      {id: 127001, name: 'D10: Inflame'},
      {id: 127108, name: 'D175: Resurrection'},
      {id: 127206, name: 'D150: Retribution'},
      {id: 127311, name: 'D245: Soulrending'},
      {id: 127409, name: 'D200: Transcendence'},
      {id: 127504, name: 'D55: Transfixion'},
      {id: 127610, name: 'D225: Weather Control'},
      {id: 127709, name: 'E200: Acquisition'},
      {id: 127804, name: 'E50: Bartering'},
      {id: 127907, name: 'E135: Bribing'},
      {id: 128011, name: 'E230: Coercion'},
      {id: 128100, name: 'E1: Coinage'},
      {id: 128202, name: 'E25: Commerce'},
      {id: 128305, name: 'E80: Common Business'},
      {id: 128403, name: 'E30: Diplomacy'},
      {id: 128510, name: 'E225: Forgery'},
      {id: 128608, name: 'E150: Investment'},
      {id: 128701, name: 'E10: Recycling'},
      {id: 128806, name: 'E145: Royal Demand'},
      {id: 128912, name: 'E250: Trade Routes'},
      {id: 129712, name: 'S250: Aeromancy'},
      {id: 129805, name: 'S135: Augmentation'},
      {id: 129901, name: 'S10: Channeling'},
      {id: 130002, name: 'S50: Conjuration'},
      {id: 130110, name: 'S200: Cryomancy'},
      {id: 130208, name: 'S175: Empowered Luck'},
      {id: 130300, name: 'S1: Enchanting'},
      {id: 130407, name: 'S180: Incantation'},
      {id: 130504, name: 'S105: Mysticism'},
      {id: 130611, name: 'S225: Necromancy'},
      {id: 130709, name: 'S215: Projection'},
      {id: 130806, name: 'S150: Pyromancy'},
      {id: 130903, name: 'S30: Vacuumancy'},
      {id: 131000, name: 'W1: Assault'},
      {id: 131108, name: 'W205: Berserking'},
      {id: 131204, name: 'W120: Betrayal'},
      {id: 131311, name: 'W225: Critical Strike'},
      {id: 131407, name: 'W200: Crusade'},
      {id: 131501, name: 'W10: Dueling'},
      {id: 131603, name: 'W50: Exertion'},
      {id: 131706, name: 'W180: Formation'},
      {id: 131810, name: 'W150: Invasion'},
      {id: 131909, name: 'W175: Overwhelm'},
      {id: 132005, name: 'W135: Rampage'},
      {id: 132112, name: 'W250: Swarming'},
      {id: 132202, name: 'W25: War Funds'},
      {id: 141917, name: 'A330: Adaptation'},
      {id: 142019, name: 'A400: Bloodspring'},
      {id: 142115, name: 'A300: Creeping'},
      {id: 142216, name: 'A305: Engraving'},
      {id: 142313, name: 'A251: Infusion'},
      {id: 142414, name: 'A270: Synthesis'},
      {id: 142518, name: 'A375: Transfusion'},
      {id: 142613, name: 'C251: Architecture'},
      {id: 142717, name: 'C340: Gem Duster'},
      {id: 142815, name: 'C305: Golemcraft'},
      {id: 142919, name: 'C400: Gravitation'},
      {id: 143018, name: 'C375: Lightning Rod'},
      {id: 143116, name: 'C330: Overload'},
      {id: 143214, name: 'C300: Weighting'},
      {id: 143316, name: 'D320: Deliverance'},
      {id: 143418, name: 'D350: Descent'},
      {id: 143517, name: 'D330: Eternity'},
      {id: 143614, name: 'D275: Meditation'},
      {id: 143719, name: 'D400: Miracle'},
      {id: 143813, name: 'D260: Mutation'},
      {id: 143915, name: 'D290: Transubstantiation'},
      {id: 144017, name: 'E330: Collection'},
      {id: 144119, name: 'E400: Conversion'},
      {id: 144214, name: 'E275: Offering'},
      {id: 144318, name: 'E350: Repurpose'},
      {id: 144413, name: 'E260: Sifting'},
      {id: 144516, name: 'E320: Smuggling'},
      {id: 144615, name: 'E290: Surveyorship'},
      {id: 144713, name: 'S251: Assimilation'},
      {id: 144819, name: 'S400: Capacity'},
      {id: 144915, name: 'S300: Chain Lightning'},
      {id: 145018, name: 'S375: Illusion'},
      {id: 145116, name: 'S305: Mesmerization'},
      {id: 145217, name: 'S330: Reverberation'},
      {id: 145314, name: 'S270: Runecarving'},
      {id: 145413, name: 'W260: Athletics'},
      {id: 145514, name: 'W275: Domination'},
      {id: 145615, name: 'W290: Entrench'},
      {id: 145717, name: 'W330: Heroism'},
      {id: 145816, name: 'W320: Shattering'},
      {id: 145919, name: 'W400: Siege'},
      {id: 146018, name: 'W350: Survival'},
      {id: 151224, name: 'C590: Alloys'},
      {id: 151323, name: 'C520: Blacksmithing'},
      {id: 151421, name: 'C460: Distribution'},
      {id: 151520, name: 'C405: Metallurgy'},
      {id: 151622, name: 'C500: Minecrafting'},
      {id: 152122, name: 'A495: Elixirs'},
      {id: 152224, name: 'A590: Hexing'},
      {id: 152323, name: 'A545: Mineralogy'},
      {id: 152420, name: 'A410: Poisons'},
      {id: 152521, name: 'A480: Waste'},
      {id: 152621, name: 'D480: Mercy'},
      {id: 152720, name: 'D435: Devotion'},
      {id: 152824, name: 'D590: Dispelling'},
      {id: 152922, name: 'D525: Purity'},
      {id: 153023, name: 'D560: Ritualism'},
      {id: 153121, name: 'E460: Inflation'},
      {id: 153223, name: 'E495: Jewellery'},
      {id: 153320, name: 'E410: Marketing'},
      {id: 153424, name: 'E590: Slavery'},
      {id: 153522, name: 'E480: Undercutting'},
      {id: 153621, name: 'S460: Focus'},
      {id: 153722, name: 'S500: Heirlooms'},
      {id: 153823, name: 'S545: Hierarchy'},
      {id: 153920, name: 'S435: Spellbinding'},
      {id: 154024, name: 'S590: Trickery'},
      {id: 154120, name: 'W405: Ambush'},
      {id: 154222, name: 'W525: Bloodlust'},
      {id: 154323, name: 'W560: Resilience'},
      {id: 154421, name: 'W520: Stalking'},
      {id: 154524, name: 'W590: Torture'},
      {id: 161626, name: 'A1325: Calefaction'},
      {id: 161725, name: 'A1200: Melting'},
      {id: 161827, name: 'A1500: Sublimation'},
      {id: 161927, name: 'C1500: Gargantuaness'},
      {id: 162026, name: 'C1325: Plasmation'},
      {id: 162125, name: 'C1300: Scintillation'},
      {id: 162225, name: 'D1125: Oblation'},
      {id: 162327, name: 'D1375: Sanctification'},
      {id: 162426, name: 'D1275: Solemnity'},
      {id: 162525, name: 'E1225: Hoarding'},
      {id: 162626, name: 'E1325: Intimidation'},
      {id: 162727, name: 'E1425: Rarity'},
      {id: 162827, name: 'S1500: Psionics'},
      {id: 162925, name: 'S1275: Sequence'},
      {id: 163026, name: 'S1450: Spellstorm'},
      {id: 163125, name: 'W1275: Authority'},
      {id: 163227, name: 'W1400: Cataclysm'},
      {id: 163326, name: 'W1375: Scavenging'},
      {id: 170929, name: 'A3400: Chemistry'},
      {id: 171028, name: 'A2950: Combination'},
      {id: 171128, name: 'C3000: Customizing'},
      {id: 171229, name: 'C3100: Engineering'},
      {id: 171328, name: 'D2775: Intervention'},
      {id: 171429, name: 'D3350: Vampirism'},
      {id: 171528, name: 'E3250: Hirelings'},
      {id: 171629, name: 'E3300: Estates'},
      {id: 171729, name: 'S3200: Manipulation'},
      {id: 171828, name: 'S2875: Scholarship'},
      {id: 171928, name: 'W3050: Flanking'},
      {id: 172029, name: 'W3150: Upheaval'},
      {id: 400301, name: 'Call to Arms 2'},
      {id: 400302, name: 'Call to Arms 3'},
      {id: 400303, name: 'Call to Arms 4'},
      {id: 400304, name: 'Call to Arms 5'},
      {id: 400305, name: 'Call to Arms 6'},
      {id: 400306, name: 'Call to Arms 7'},
      {id: 401201, name: 'Holy Light 2'},
      {id: 401202, name: 'Holy Light 3'},
      {id: 401203, name: 'Holy Light 4'},
      {id: 401204, name: 'Holy Light 5'},
      {id: 401205, name: 'Holy Light 6'},
      {id: 401206, name: 'Holy Light 7'},
      {id: 400601, name: 'Fairy Chanting 2'},
      {id: 400602, name: 'Fairy Chanting 3'},
      {id: 400603, name: 'Fairy Chanting 4'},
      {id: 400604, name: 'Fairy Chanting 5'},
      {id: 400605, name: 'Fairy Chanting 6'},
      {id: 400606, name: 'Fairy Chanting 7'},
      {id: 401401, name: 'Moon Blessing 2'},
      {id: 401402, name: 'Moon Blessing 3'},
      {id: 401403, name: 'Moon Blessing 4'},
      {id: 401404, name: 'Moon Blessing 5'},
      {id: 401405, name: 'Moon Blessing 6'},
      {id: 401406, name: 'Moon Blessing 7'},
      {id: 400901, name: 'God\'s Hand 2'},
      {id: 400902, name: 'God\'s Hand 3'},
      {id: 400903, name: 'God\'s Hand 4'},
      {id: 400904, name: 'God\'s Hand 5'},
      {id: 400905, name: 'God\'s Hand 6'},
      {id: 400906, name: 'God\'s Hand 7'},
      {id: 400101, name: 'Blood Frenzy 2'},
      {id: 400102, name: 'Blood Frenzy 3'},
      {id: 400103, name: 'Blood Frenzy 4'},
      {id: 400104, name: 'Blood Frenzy 5'},
      {id: 400105, name: 'Blood Frenzy 6'},
      {id: 400106, name: 'Blood Frenzy 7'},
      {id: 400801, name: 'Goblin\'s Greed 2'},
      {id: 400802, name: 'Goblin\'s Greed 3'},
      {id: 400803, name: 'Goblin\'s Greed 4'},
      {id: 400804, name: 'Goblin\'s Greed 5'},
      {id: 400805, name: 'Goblin\'s Greed 6'},
      {id: 400806, name: 'Goblin\'s Greed 7'},
      {id: 401501, name: 'Night Time 2'},
      {id: 401502, name: 'Night Time 3'},
      {id: 401503, name: 'Night Time 4'},
      {id: 401504, name: 'Night Time 5'},
      {id: 401505, name: 'Night Time 6'},
      {id: 401506, name: 'Night Time 7'},
      {id: 401101, name: 'Hellfire Blast 2'},
      {id: 401102, name: 'Hellfire Blast 3'},
      {id: 401103, name: 'Hellfire Blast 4'},
      {id: 401104, name: 'Hellfire Blast 5'},
      {id: 401105, name: 'Hellfire Blast 6'},
      {id: 401106, name: 'Hellfire Blast 7'},
      {id: 400701, name: 'Gem Grinder 2'},
      {id: 400702, name: 'Gem Grinder 3'},
      {id: 400703, name: 'Gem Grinder 4'},
      {id: 400704, name: 'Gem Grinder 5'},
      {id: 400705, name: 'Gem Grinder 6'},
      {id: 400706, name: 'Gem Grinder 7'},
      {id: 401301, name: 'Lightning Strike 2'},
      {id: 401302, name: 'Lightning Strike 3'},
      {id: 401303, name: 'Lightning Strike 4'},
      {id: 401304, name: 'Lightning Strike 5'},
      {id: 401305, name: 'Lightning Strike 6'},
      {id: 401306, name: 'Lightning Strike 7'},
      {id: 401001, name: 'Grand Balance 2'},
      {id: 401002, name: 'Grand Balance 3'},
      {id: 401003, name: 'Grand Balance 4'},
      {id: 401004, name: 'Grand Balance 5'},
      {id: 401005, name: 'Grand Balance 6'},
      {id: 401006, name: 'Grand Balance 7'},
      {id: 400201, name: 'Brainwave 2'},
      {id: 400202, name: 'Brainwave 3'},
      {id: 400203, name: 'Brainwave 4'},
      {id: 400204, name: 'Brainwave 5'},
      {id: 400205, name: 'Brainwave 6'},
      {id: 400206, name: 'Brainwave 7'},
      {id: 400501, name: 'Diamond Pickaxe 2'},
      {id: 400502, name: 'Diamond Pickaxe 3'},
      {id: 400503, name: 'Diamond Pickaxe 4'},
      {id: 400504, name: 'Diamond Pickaxe 5'},
      {id: 400505, name: 'Diamond Pickaxe 6'},
      {id: 400506, name: 'Diamond Pickaxe 7'},
      {id: 400401, name: 'Combo Strike 2'},
      {id: 400402, name: 'Combo Strike 3'},
      {id: 400403, name: 'Combo Strike 4'},
      {id: 400404, name: 'Combo Strike 5'},
      {id: 400405, name: 'Combo Strike 6'},
      {id: 400406, name: 'Combo Strike 7'},
      {id: 402101, name: 'Dragon\'s Breath 2'},
      {id: 402102, name: 'Dragon\'s Breath 3'},
      {id: 402103, name: 'Dragon\'s Breath 4'},
      {id: 402104, name: 'Dragon\'s Breath 5'},
      {id: 402105, name: 'Dragon\'s Breath 6'},
      {id: 402106, name: 'Dragon\'s Breath 7'},
      {id: 401701, name: 'Spiritual Surge 2'},
      {id: 401702, name: 'Spiritual Surge 3'},
      {id: 401703, name: 'Spiritual Surge 4'},
      {id: 401704, name: 'Spiritual Surge 5'},
      {id: 401705, name: 'Spiritual Surge 6'},
      {id: 401706, name: 'Spiritual Surge 7'}
    ];
	
	this.researches = [
		{ id: 103000, value: 1, branch: 1 },
		{ id: 129901, value: 10, branch: 1 },
		{ id: 130903, value: 30, branch: 1 },
		{ id: 130002, value: 50, branch: 1 },
		{ id: 130504, value: 105, branch: 1 },
		{ id: 129805, value: 135, branch: 1 },
		{ id: 130806, value: 150, branch: 1 },
		{ id: 130208, value: 175, branch: 1 },
		{ id: 130407, value: 180, branch: 1 },
		{ id: 130110, value: 200, branch: 1 },
		{ id: 130709, value: 215, branch: 1 },
		{ id: 130611, value: 225, branch: 1 },
		{ id: 129712, value: 250, branch: 1 },
		{ id: 144713, value: 251, branch: 1 },
		{ id: 145314, value: 270, branch: 1 },
		{ id: 144915, value: 300, branch: 1 },
		{ id: 145116, value: 305, branch: 1 },
		{ id: 145217, value: 330, branch: 1 },
		{ id: 145018, value: 375, branch: 1 },
		{ id: 144819, value: 400, branch: 1 },
		{ id: 153920, value: 435, branch: 1 },
		{ id: 153621, value: 460, branch: 1 },
		{ id: 153722, value: 500, branch: 1 },
		{ id: 153823, value: 545, branch: 1 },
		{ id: 154024, value: 590, branch: 1 },
		{ id: 162925, value: 1275, branch: 1 },
		{ id: 163026, value: 1450, branch: 1 },
		{ id: 162827, value: 1500, branch: 1 },
		{ id: 171828, value: 2875, branch: 1 },
		{ id: 171729, value: 3200, branch: 1 },
		{ id: 205530, value: 5125, branch: 1 },
		{ id: 205231, value: 5375, branch: 1 },
		{ id: 205332, value: 5625, branch: 1 },
		{ id: 205433, value: 5875, branch: 1 },
		{ id: 125300, value: 1, branch: 2 },
		{ id: 125201, value: 10, branch: 2 },
		{ id: 125702, value: 25, branch: 2 },
		{ id: 125903, value: 50, branch: 2 },
		{ id: 125004, value: 80, branch: 2 },
		{ id: 126305, value: 105, branch: 2 },
		{ id: 126106, value: 120, branch: 2 },
		{ id: 126007, value: 135, branch: 2 },
		{ id: 126208, value: 150, branch: 2 },
		{ id: 125409, value: 175, branch: 2 },
		{ id: 125610, value: 200, branch: 2 },
		{ id: 125111, value: 225, branch: 2 },
		{ id: 125812, value: 250, branch: 2 },
		{ id: 142613, value: 251, branch: 2 },
		{ id: 143214, value: 300, branch: 2 },
		{ id: 142815, value: 305, branch: 2 },
		{ id: 143116, value: 330, branch: 2 },
		{ id: 142717, value: 340, branch: 2 },
		{ id: 143018, value: 375, branch: 2 },
		{ id: 142919, value: 400, branch: 2 },
		{ id: 151520, value: 405, branch: 2 },
		{ id: 151421, value: 460, branch: 2 },
		{ id: 151622, value: 500, branch: 2 },
		{ id: 151323, value: 520, branch: 2 },
		{ id: 151224, value: 590, branch: 2 },
		{ id: 162125, value: 1300, branch: 2 },
		{ id: 162026, value: 1325, branch: 2 },
		{ id: 161927, value: 1500, branch: 2 },
		{ id: 171128, value: 3000, branch: 2 },
		{ id: 171229, value: 3100, branch: 2 },
		{ id: 203930, value: 5125, branch: 2 },
		{ id: 203831, value: 5375, branch: 2 },
		{ id: 203632, value: 5625, branch: 2 },
		{ id: 203733, value: 5875, branch: 2 },
		{ id: 126400, value: 1, branch: 3 },
		{ id: 127001, value: 10, branch: 3 },
		{ id: 126602, value: 25, branch: 3 },
		{ id: 126803, value: 50, branch: 3 },
		{ id: 127504, value: 55, branch: 3 },
		{ id: 126905, value: 135, branch: 3 },
		{ id: 127206, value: 150, branch: 3 },
		{ id: 127108, value: 175, branch: 3 },
		{ id: 127409, value: 200, branch: 3 },
		{ id: 126507, value: 205, branch: 3 },
		{ id: 127610, value: 225, branch: 3 },
		{ id: 127311, value: 245, branch: 3 },
		{ id: 126712, value: 250, branch: 3 },
		{ id: 143813, value: 260, branch: 3 },
		{ id: 143614, value: 275, branch: 3 },
		{ id: 143915, value: 290, branch: 3 },
		{ id: 143316, value: 320, branch: 3 },
		{ id: 143517, value: 330, branch: 3 },
		{ id: 143418, value: 350, branch: 3 },
		{ id: 143719, value: 400, branch: 3 },
		{ id: 152720, value: 435, branch: 3 },
		{ id: 152621, value: 480, branch: 3 },
		{ id: 152922, value: 525, branch: 3 },
		{ id: 153023, value: 560, branch: 3 },
		{ id: 152824, value: 590, branch: 3 },
		{ id: 162225, value: 1125, branch: 3 },
		{ id: 162426, value: 1275, branch: 3 },
		{ id: 162327, value: 1375, branch: 3 },
		{ id: 171328, value: 2775, branch: 3 },
		{ id: 171429, value: 3350, branch: 3 },
		{ id: 204230, value: 5125, branch: 3 },
		{ id: 204331, value: 5375, branch: 3 },
		{ id: 204132, value: 5625, branch: 3 },
		{ id: 204033, value: 5875, branch: 3 },
		{ id: 128100, value: 1, branch: 4 },
		{ id: 128701, value: 10, branch: 4 },
		{ id: 128202, value: 25, branch: 4 },
		{ id: 128403, value: 30, branch: 4 },
		{ id: 127804, value: 50, branch: 4 },
		{ id: 128305, value: 80, branch: 4 },
		{ id: 127907, value: 135, branch: 4 },
		{ id: 128806, value: 145, branch: 4 },
		{ id: 128608, value: 150, branch: 4 },
		{ id: 127709, value: 200, branch: 4 },
		{ id: 128510, value: 225, branch: 4 },
		{ id: 128011, value: 230, branch: 4 },
		{ id: 128912, value: 250, branch: 4 },
		{ id: 144413, value: 260, branch: 4 },
		{ id: 144214, value: 275, branch: 4 },
		{ id: 144615, value: 290, branch: 4 },
		{ id: 144516, value: 320, branch: 4 },
		{ id: 144017, value: 330, branch: 4 },
		{ id: 144318, value: 350, branch: 4 },
		{ id: 144119, value: 400, branch: 4 },
		{ id: 153320, value: 410, branch: 4 },
		{ id: 153121, value: 460, branch: 4 },
		{ id: 153522, value: 480, branch: 4 },
		{ id: 153223, value: 495, branch: 4 },
		{ id: 153424, value: 590, branch: 4 },
		{ id: 162525, value: 1225, branch: 4 },
		{ id: 162626, value: 1325, branch: 4 },
		{ id: 162727, value: 1425, branch: 4 },
		{ id: 171528, value: 3250, branch: 4 },
		{ id: 171629, value: 3300, branch: 4 },
		{ id: 204430, value: 5125, branch: 4 },
		{ id: 204731, value: 5375, branch: 4 },
		{ id: 204532, value: 5625, branch: 4 },
		{ id: 204633, value: 5875, branch: 4 },
		{ id: 124500, value: 1, branch: 5 },
		{ id: 124801, value: 10, branch: 5 },
		{ id: 123903, value: 25, branch: 5 },
		{ id: 124002, value: 30, branch: 5 },
		{ id: 124304, value: 50, branch: 5 },
		{ id: 124605, value: 55, branch: 5 },
		{ id: 124206, value: 105, branch: 5 },
		{ id: 124907, value: 120, branch: 5 },
		{ id: 123808, value: 135, branch: 5 },
		{ id: 124109, value: 150, branch: 5 },
		{ id: 124710, value: 175, branch: 5 },
		{ id: 123711, value: 200, branch: 5 },
		{ id: 124412, value: 250, branch: 5 },
		{ id: 142313, value: 251, branch: 5 },
		{ id: 142414, value: 270, branch: 5 },
		{ id: 142115, value: 300, branch: 5 },
		{ id: 142216, value: 305, branch: 5 },
		{ id: 141917, value: 330, branch: 5 },
		{ id: 142518, value: 375, branch: 5 },
		{ id: 142019, value: 400, branch: 5 },
		{ id: 152420, value: 410, branch: 5 },
		{ id: 152521, value: 480, branch: 5 },
		{ id: 152122, value: 495, branch: 5 },
		{ id: 152323, value: 545, branch: 5 },
		{ id: 152224, value: 590, branch: 5 },
		{ id: 161725, value: 1200, branch: 5 },
		{ id: 161626, value: 1325, branch: 5 },
		{ id: 161827, value: 1500, branch: 5 },
		{ id: 171028, value: 2950, branch: 5 },
		{ id: 170929, value: 3400, branch: 5 },
		{ id: 203430, value: 5125, branch: 5 },
		{ id: 203231, value: 5375, branch: 5 },
		{ id: 203532, value: 5625, branch: 5 },
		{ id: 203333, value: 5875, branch: 5 },
		{ id: 131000, value: 1, branch: 6 },
		{ id: 131501, value: 10, branch: 6 },
		{ id: 132202, value: 25, branch: 6 },
		{ id: 131603, value: 50, branch: 6 },
		{ id: 131204, value: 120, branch: 6 },
		{ id: 132005, value: 135, branch: 6 },
		{ id: 131810, value: 150, branch: 6 },
		{ id: 131909, value: 175, branch: 6 },
		{ id: 131706, value: 180, branch: 6 },
		{ id: 131407, value: 200, branch: 6 },
		{ id: 131108, value: 205, branch: 6 },
		{ id: 131311, value: 225, branch: 6 },
		{ id: 132112, value: 250, branch: 6 },
		{ id: 145413, value: 260, branch: 6 },
		{ id: 145514, value: 275, branch: 6 },
		{ id: 145615, value: 290, branch: 6 },
		{ id: 145816, value: 320, branch: 6 },
		{ id: 145717, value: 330, branch: 6 },
		{ id: 146018, value: 350, branch: 6 },
		{ id: 145919, value: 400, branch: 6 },
		{ id: 154120, value: 405, branch: 6 },
		{ id: 154421, value: 520, branch: 6 },
		{ id: 154222, value: 525, branch: 6 },
		{ id: 154323, value: 560, branch: 6 },
		{ id: 154524, value: 590, branch: 6 },
		{ id: 163125, value: 1275, branch: 6 },
		{ id: 163326, value: 1375, branch: 6 },
		{ id: 163227, value: 1400, branch: 6 },
		{ id: 171928, value: 3050, branch: 6 },
		{ id: 172029, value: 3150, branch: 6 },
		{ id: 205930, value: 5125, branch: 6 },
		{ id: 205731, value: 5375, branch: 6 },
		{ id: 205632, value: 5625, branch: 6 },
		{ id: 205833, value: 5875, branch: 6 },
		{ id: 204900, value: 5250, branch: 7 },
		{ id: 205001, value: 5500, branch: 7 },
		{ id: 204802, value: 5750, branch: 7 },
		{ id: 205103, value: 6000, branch: 7 }
	];
	
    this.alignment = [
      {id: 0, name: 'Unaligned'},
      {id: 1, name: 'Good'},
      {id: 2, name: 'Evil'},
      {id: 3, name: 'Neutral'}
    ];
    this.secondaryAlignment = [
      {id: 0, name: 'Unaligned'},
      {id: 4, name: 'Order'},
      {id: 5, name: 'Chaos'},
      {id: 6, name: 'Balance'}
    ];
    this.faction = [
      {id: -1, name: 'Unaffiliated', timestat: 62},
      {
        id: 0, name: 'Fairy', fc: true,
        fcstat: 6, fcmaxstat: 79,
        affilstat: 17, timestat: 50, upgstat: 66
      },
      {
        id: 1, name: 'Elven', fc: true,
        fcstat: 7, fcmaxstat: 80,
        affilstat: 18, timestat: 51, upgstat: 67
      },
      {
        id: 2, name: 'Angel', fc: true,
        fcstat: 8, fcmaxstat: 81,
        affilstat: 19, timestat: 52, upgstat: 68
      },
      {
        id: 3, name: 'Goblin', fc: true,
        fcstat: 9, fcmaxstat: 82,
        affilstat: 20, timestat: 53, upgstat: 69
      },
      {
        id: 4, name: 'Undead', fc: true,
        fcstat: 10, fcmaxstat: 83,
        affilstat: 21, timestat: 54, upgstat: 70
      },
      {
        id: 5, name: 'Demon', fc: true,
        fcstat: 11, fcmaxstat: 84,
        affilstat: 22, timestat: 55, upgstat: 71
      },
      {
        id: 6, name: 'Titan',
        affilstat: 32, timestat: 56, upgstat: 72
      },
      {
        id: 7, name: 'Druid',
        affilstat: 33, timestat: 57, upgstat: 73
      },
      {
        id: 8, name: 'Faceless',
        affilstat: 34, timestat: 58, upgstat: 74
      },
      {
        id: 9, name: 'Dwarven', fc: true,
        fcstat: 41, fcmaxstat: 85,
        affilstat: 43, timestat: 59, upgstat: 75
      },
      {
        id: 10, name: 'Drow', fc: true,
        fcstat: 42, fcmaxstat: 86,
        affilstat: 44, timestat: 60, upgstat: 76
      },
      {
        id: 11, name: 'Mercenary',
        affilstat: 49, timestat: 61, upgstat: 77
      },
      {
        id: 12, name: 'Dragon',
        affilstat: 78, timestat: 79, upgstat: 80
      },
      {
        id: 13, name: 'Archon',
        affilstat: 136, timestat: 139, upgstat: 142
      },
      {
        id: 14, name: 'Djinn',
        affilstat: 137, timestat: 140, upgstat: 143
      },
      {
        id: 15, name: 'Makers',
        affilstat: 138, timestat: 141, upgstat: 144
      }
    ];
  }

  window.util = {
    render: new render(),
    save: new save(),
    assoc: new assoc()
  };
})(window, document, jQuery);
