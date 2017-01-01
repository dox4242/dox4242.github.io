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
    this.shortScale = ['M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Octg', 'Notg', 'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Ocqag', 'Noqag', 'Qig', 'UQig', 'DQig', 'TQig', 'QaQig', 'QiQig', 'SxQig', 'SpQig', 'OcQig', 'NoQig', 'Sxg', 'USxg', 'DSxg', 'TSxg', 'QaSxg', 'QiSxg', 'SxSxg', 'SpSxg', 'OcSxg', 'NoSxg', 'Spg', 'USpg', 'DSpg', 'TSpg', 'QaSpg', 'QiSpg', 'SxSpg', 'SpSpg', 'OcSpg', 'NoSpg', 'Ocg', 'UOcg', 'DOcg', 'TOcg', 'QaOcg', 'QiOcg', 'SxOcg', 'SpOcg', 'OcOcg', 'NoOcg', 'Nog', 'UNog', 'DNog', 'TNog', 'QaNog', 'QiNog', 'SxNog', 'SpNog', 'OcNog', 'NoNog', 'C', 'Uc'];

    this.expSep = '<sub>E</sub>';

    this.sciSig = function(man, sig) {
      man = man.substr(0,sig+1);
      while ('0.'.indexOf(man[man.length-1]) != -1) {
        man = man.substr(0, man.length-1);
      }
      return man
    }

    this.sci = function(val) {
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

  function build_dataflow(spec, self) {
    for (var i in spec) {
      for (var j in spec[i]) {
        if (i == 'additive' || i == 'multiplicative') {
          spec[i][j] = spec[i][j].bind(self);
        }
        else {
          spec[i][j][0] = spec[i][j][0].bind(self);
          spec[i][j][1] = spec[i][j][1].bind(self);
        }
      }
    }
  }

  function save() {
    this.lengths = {factions:13, eventResources:18, stats: 130, buildings: 25, spells: 23};
    this.beseiged = {20: true, 11: true, 8: true, 12: true, 14: true, 2: true, 10: true};
    this.building_alignment = {
      9: 0, 13: 0, 3: 0,
      23: 1, 15: 1, 25: 1, 4: 1, 5: 1, 20: 1, 11: 1,
      21: 2, 19: 2, 24: 2, 6: 2, 18: 2, 8: 2, 12: 2,
      7: 3, 22: 3, 1: 3, 17: 3, 16: 3, 14: 3, 2: 3, 10: 0
    };
    this.building_names = {9: 'Farm', 13: 'Inn', 3: 'Blacksmith', 23: 'Warrior Barracks', 15: 'Knights Joust', 25: 'Wizard Tower', 4: 'Cathedral', 5: 'Citadel', 20: 'Royal Castle', 11: 'Heaven\'s Gate', 21: 'Slave Pen', 19: 'Orcish Arena', 24: 'Witch Conclave', 6: 'Dark Temple', 18: 'Necropolis', 8: 'Evil Fortress', 12: 'Hell Portal', 7: 'Deep Mine', 22: 'Stone Pillars', 1: 'Alchemist Lab', 17: 'Monastery', 16: 'Labyrinth', 14: 'Iron Stronghold', 2: 'Ancient Pyramid', 10: 'Hall of Legends'};
    this.building_ids = [
      9, 13, 3,
      23, 15, 25, 4, 5, 20, 11,
      21, 19, 24, 6, 18, 8, 12,
      7, 22, 1, 17, 16, 14, 2, 10
    ];
    this.spell_alignment = {
      18: 0, 3: 0,
      12: 1, 6: 1, 14: 1, 9: 1,
      1: 2, 8:2, 15: 2, 11: 2,
      7: 3, 13: 3, 10: 3, 2: 3,
      5: 1, 4: 2, 17: 0, 21: 0
    };
    this.upgrade_faction = {
      197: 0, 204: 0, 195: 0, 207: 0, 198: 0, 201: 0, 202: 0, 206: 0, 199: 0, 203: 0, 205: 0, 208: 0, 
      169: 1, 174: 1, 175: 1, 177: 1, 170: 1, 167: 1, 166: 1, 176: 1, 171: 1, 165: 1, 173: 1, 163: 1, 
      40: 2, 51: 2, 44: 2, 43: 2, 41: 2, 50: 2, 48: 2, 49: 2, 42: 2, 52: 2, 45: 2, 53: 2,
      216: 3, 223: 3, 222: 3, 210: 3, 217: 3, 209: 3, 221: 3, 214: 3, 218: 3, 213: 3, 211: 3, 220: 3,
      398:4, 394: 4, 390: 4, 392: 4, 399: 4, 403: 4, 389: 4, 393: 4, 400: 4, 391: 4, 395: 4, 402: 4,
      104: 5, 115: 5, 111: 5, 112: 5, 105: 5, 114: 5, 110: 5, 109: 5, 106: 5, 113: 5, 102: 5, 116: 5,
      382: 6, 376: 6, 374: 6, 379: 6, 383: 6, 381: 6, 375: 6, 377: 6, 384: 6, 378: 6, 387: 6, 386: 6,
      137: 7, 141: 7, 133: 7, 145: 7, 138: 7, 142: 7, 134: 7, 146: 7, 139: 7, 144: 7, 143: 7, 135: 7,
      184: 8, 193: 8, 182: 8, 181: 8, 185: 8, 188: 8, 191: 8, 192: 8, 186: 8, 190: 8, 180: 8, 189: 8,
      152: 9, 149: 9, 157: 9, 160: 9, 153: 9, 162: 9, 158: 9, 148: 9, 154: 9, 147: 9, 159: 9, 161: 9,
      122: 10, 132: 10, 127: 10, 130: 10, 123: 10, 128: 10, 119: 10, 117: 10, 124: 10, 131: 10, 129: 10, 118: 10
    };
    this.event_trophy_ids = {
      // thanksgiving feat
      115: true,
      // christmas feats
      164: true, 166: true, 165: true, 163: true,
      // valentine's feats
      174: true, 175: true,
      // easter feats
      191: true, 194: true, 192: true, 193: true,
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
      // halloween quests
      122400: true, 122401: true, 122402: true,
      122500: true, 122501: true, 122502: true
      
      
    };
    this.artifact_ids = {
      // quest artifacts
      123: true, 127: true, 125: true, 124: true, 128: true, 126: true,
      161: true, 160: true, 184: true, 186: true, 185: true,
      // lore artifacts
      151: true, 119: true, 120: true, 137: true, 148: true, 147: true, 132: true, 143: true,
      144: true, 146: true, 135: true, 129: true, 139: true, 150: true, 142: true, 134: true,
      140: true, 141: true, 155: true, 138: true, 153: true, 156: true, 145: true, 136: true,
      154: true, 133: true, 130: true, 152: true, 131: true, 179: true, 178: true, 187: true,
      177: true
    };
    this.hidden_trophy_ids = {
      // neutral unlocks
      6: true, 2: true, 5: true,
      // prestige unlocks
      7: true, 3: true, 1: true, 44: true, 43: true,
      // merc unlock
      53: true,
      // base research
      59: true, 58: true, 56: true, 60: true, 61: true, 57: true,
      // neutral research
      118: true, 116: true, 117: true,
      // prestige research
      183: true, 182: true
    };
    this.research_ids = {
      130300: -1, 129901: 2, 130002: 3, 130903: -1, 130504: -1, 129805: -1, 130806: -1,
      130407: -1, 130208: 1, 130709: -1, 130110: -1, 130611: 4, 129712: -1, 144713: 8,
      145314: -1, 144915: 6, 145116: -1, 145217: -1, 145018: 8, 144819: -1, 153920: 10,
      153621: -1, 153722: -1, 153823: -1, 154024: 9, 125300: 1, 125201: -1, 125702: 2,
      125903: 5, 125004: -1, 126305: -1, 126106: -1, 126007: -1, 126208: -1, 125409: 3,
      125610: -1, 125111: 1, 125812: -1, 142613: 6, 143214: 7, 142815: -1, 143116: -1,
      142717: -1, 143018: 6, 142919: -1, 151520: -1, 151421: -1, 151622: -1, 151323: 9,
      151224: 9, 126400: 2, 127001: 5, 126602: 4, 126803: 1, 127504: -1, 126905: -1,
      127206: -1, 126507: -1, 127108: 2, 127409: -1, 127610: -1, 127311: -1, 126712: -1,
      143813: 8, 143614: 7, 143915: -1, 143316: -1, 143517: -1, 143418: 6, 143719: -1,
      152720: 9, 152621: -1, 152922: -1, 153023: -1, 152824: -1, 128100: 3, 128701: 4,
      128202: 1, 128403: -1, 127804: -1, 128305: -1, 128806: -1, 127907: -1, 128608: -1,
      127709: -1, 128510: 3, 128011: 5, 128912: -1, 144413: 7, 144214: 6, 144615: -1,
      144516: -1, 144017: -1, 144318: 8, 144119: -1, 153320: 9, 153121: -1, 153522: -1,
      153223: 10, 153424: 10, 124500: 4, 124801: 3, 124002: -1, 123903: 5, 124304: 2,
      124605: -1, 124206: -1, 124907: -1, 123808: -1, 124109: -1, 124710: 4, 123711: -1,
      124412: -1, 142313: 7, 142414: -1, 142115: 8, 142216: -1, 141917: -1, 142518: 7,
      142019: -1, 152420: 10, 152521: -1, 152122: 9, 152323: -1, 152224: -1, 131000: 5,
      131501: 1, 132202: 3, 131603: 4, 131204: -1, 132005: -1, 131706: -1, 131407: -1,
      131108: -1, 131909: 5, 131810: -1, 131311: 2, 132112: -1, 145413: 6, 145514: 8,
      145615: -1, 145816: -1, 145717: -1, 146018: 7, 145919: -1, 154120: -1, 154421: -1,
      154222: -1, 154323: -1, 154524: -1
    }
    this.max_trophy_count = 719;
    this.assistant_upgrades = {
      beginning: [],
      additive: {
        // building assistants
        59: function(save) { return 1; },
        69: function(save) { return 1; },
        73: function(save) { return 1; },
        76: function(save) { return 1; },
        75: function(save) { return 1; },
        55: function(save) { return 1; },
        56: function(save) { return 1; },
        71: function(save) { return 1; },
        70: function(save) { return 1; },
        61: function(save) { return 1; },
        72: function(save) { return 1; },
        68: function(save) { return 1; },
        58: function(save) { return 1; },
        57: function(save) { return 1; },
        77: function(save) { return 1; },
        60: function(save) { return 1; },
        63: function(save) { return 1; },
        64: function(save) { return 1; },
        74: function(save) { return 1; },
        54: function(save) { return 1; },
        66: function(save) { return 1; },
        65: function(save) { return 1; },
        62: function(save) { return 1; },
        67: function(save) { return 1; },
        // burning legion
        102: function(save) {
          return Math.floor(Math.sqrt(1 + 2.5 * this.building_count(save, 12)) - 1);
        },
        // corpse supply
        389: function(save) {
          return Math.floor(Math.sqrt(1 + 2 * this.building_count(save, 18)) - 1);
        },
        // reincarnation power
        36: function(save) {
          return save.reincarnation >= 5 ? save.reincarnation : 0;
        },
        // vivification
        124907: function(save) {
          return Math.floor(this.max_mana(save) / 50);
        },
        // undead heritage
        401: function(save) {
          return Math.floor(1 + 1.5 * Math.pow((this.upgrade_owned(save, 98)?5:1) * this.stat(save, 1) / 3600, 0.5));
        },
        // descent
        143418: function(save) {
          return Math.floor(Math.pow(this.building_count(save, 10), 0.5));
        },
        // golemcraft
        142815: function(save) {
          return Math.floor(2 * Math.pow(this.stat(save, 45, 1) / 3600, 0.5));
        },
        // animal companions
        133: function(save) {
          return 3 + Math.floor((Math.sqrt(1 + (this.upgrade_owned(save, 485) ? 16 : 12) * this.stat(save, 1) / 3600) - 1)/ 2);
        },
        // mitosis
        191: function(save) {
          return Math.floor(0.3 * Math.pow(this.total_buildings(save), 0.8));
        },
        // undead bloodline
        396: function(save) {
          return Math.floor(8 * Math.pow(save.reincarnation, 0.8));
        },
        // assistant squasher
        324: function(save) { return 1; },
        // swarm of fairies
        208: function(save) {
          return Math.floor((Math.sqrt(1 + 4 * (this.building_count(save, 9) + this.building_count(save, 13) + this.building_count(save, 3))) - 1) / 3);
        },
        // commerce
        128202: function(save) {
          return Math.floor(Math.sqrt(1 + 6 * this.stat(save, 24)) - 1);
        },
        // holy crusaders
        227: function(save) {
          Math.floor((Math.sqrt(1 + 20 * this.stat(save, 15) / 25) - 1) / 2);
        },
        // transfusion
        142518: function(save) {
          return Math.floor(4.5 * Math.log(1 + this.stat(save, 16)));
        },
        // resurrection
        127108: function(save) {
          return Math.floor(0.45 * Math.pow(3 * save.spells[9].active0 / 20,0.6));
        },
        // overwhelm
        131909: function(save) {
          return Math.floor(0.75 * Math.pow(this.total_spells(save, 2, 1),0.5));
        },
        // crusade
        131407: function(save) {
          return Math.floor(0.05 * Math.pow(this.stat(save,2,1), 0.48));
        },
        // demonology
        126712: function(save) {
          return Math.floor(Math.pow(Math.log(1 + this.faction_coins(save)), 1.3));
        },
        // swarming
        132112: function(save) {
          return Math.floor(this.trophies(save) / 8);
        },
        // pixie mischief
        90: function(save) {
          return this.bloodline_upgrades(save, 0);
        },
        // ruby power
        480: function(save) {
          return this.stat(save, 105, 2);
        },
        // rich followers
        495: function(save) {
          return Math.floor(this.stat(save, 24) / 80);
        },
        // recruitment
        490: function(save) {
          return Math.floor(this.stat(save, 1) / 60) % 60;;
        },
        // cyclopean army
        492: function(save) {
          return Math.floor(2 * Math.pow(this.re_bonus(save),0.5));
        },
        // stalking
        154421: function(save) {
          return Math.floor(save.spells[4].active0 / 100);
        },
        // slavery
        153424: function(save) {
          return Math.floor(Math.pow(this.total_buildings(save, 2) / 300,1.05));
        }
      },
      middle: [
        // heart assistants
        [
          function(save) {
            return save.season == 3;
          },
          function(save, sum) {
            return sum = this.stat(save, 114, 2);
          }
        ]
      ],
      multiplicative: {
        // death knights
        100: function(save) {
          return 1.1;
        }
      },
      ending: [
        [
          function (save) { return true; },
          function (save, value) { return Math.floor(value); }
        ]
      ]
    };
    this.re_bonus_upgrades = {
      beginning: [
        [
          function (save) { return true; },
          function (save, value) { return 10; }
        ]
      ],
      additive: {
        // heavy coins
        378: function(save) { return 40; },
        // titan heritage
        385: function(save) { return 15; },
        // exchange master
        333: function(save) { return 5; },
        // exchange lord
        332: function(save) { return 5; },
        // diplomacy
        128403: function(save) { 
          return Math.floor(7 * Math.pow(this.stat(save, 1) / 3600,0.6));
        },
        // because I like to grind
        510: function(save) { return 1; },
        // ruby power
        480: function(save) {
          return this.stat(save, 109, 2) * 1.5;
        },
        // reincarnation power
        36: function(save) {
          return save.reincarnation >= 25 ? save.reincarnation * 0.5 : 0;
        },
        // inflation
        153121: function(save) { 
          return Math.floor(3.5 * Math.log(1 + this.faction_coins(save)) / Math.LN10);
        }
      },
      middle: [
        // heart RE bonus
        [
          function(save) {
            return save.season == 3;
          },
          function(save, sum) {
            return sum = this.stat(save, 118, 2) * 1.5;
          }
        ]
      ],
      multiplicative: {},
      ending: []
    }
    this.max_mana_upgrades = {
      beginning: [
        [
          function (save) { return true; },
          function (save, value) { return 1000; }
        ]
      ],
      additive: {
        // druid heritage
        140: function(save) { 
          return Math.floor(this.total_buildings(save) / 20);
        },
        // kind hearts
        203: function(save) {
          return Math.floor(this.total_buildings(save, 1) / 12);;
        },
        // earthly bond
        142: function(save) {
          return Math.floor(1.5 * this.building_count(save, 22));
        },
        // faceless bloodline
        183: function(save) {
          return Math.floor(10 * Math.pow(Math.log(1 + this.stat(save,16)) / Math.LN10,3));
        },
        // vacuumancy
        130903: function(save) {
          return Math.floor(25 * this.stat(save,1) / 60 / 60);
        },
        // rampage
        132005: function(save) {
          return Math.floor(1.25 * this.trophies(save));
        },
        // capacity
        144819: function(save) {
          return Math.floor(22 * Math.pow(this.stat_max(save, 40, 1),0.32));
        },
        // premeditation
        357: function(save) { return 200; },
        // mana matrix
        505: function(save) { return 10; },
        // reincarnation power
        36: function(save) {
          return save.reincarnation >= 12 ? save.reincarnation * 25 : 0;
        },
        // legendary antics
        83: function(save) {
          return Math.floor(0.01 * 6.66 * this.building_count(save, 10));
        },
        // ruby power
        480: function(save) {
          return this.stat(save, 107, 2) * 25;
        },
        // eldritch architecture
        487: function(save) {
          return Math.floor(this.building_count(save, 16) / 4);
        },
        // mystic maze
        491: function(save) {
          return 8 * Math.floor(this.building_count(save, 16) / 20);
        },
        // heirlooms
        153722: function(save) {
          return 100 * this.artifacts(save);
        },
        // giant egg
        560: function(save) { return save.season == 4 ? 500 : 0; }
      },
      middle: [
        // heart max mana
        [
          function(save) {
            return save.season == 3;
          },
          function(save, sum) {
            return sum = this.stat(save, 116, 2) * 25;
          }
        ]
      ],
      multiplicative: {
        // balanced economy
        497: function(save) {
          return 1 + 0.02 * Math.log(1 + this.faction_coins(save)) / Math.LN10;
        },
        // mana crypts
        79: function(save) { return 1.2; }
      },
      ending: [
        [
          function (save) { return true; },
          function (save, value) { return Math.floor(value); }
        ]
      ]
    }

    build_dataflow(this.assistant_upgrades, this);
    build_dataflow(this.re_bonus_upgrades, this);
    build_dataflow(this.max_mana_upgrades, this);

    this.upgrade_owned = function(save, id) {
      return save.upgrades[id] && save.upgrades[id].u1;
    }
    this.challenge_active = function(save, id) {
      return this.upgrade_owned(save, id);
    }
    this.trophy_owned = function(save, id) {
      return save.trophies[id];
    }
    this.building_multiplier = function(save, id) {
      var m = 1;
      if (this.upgrade_owned(save, 145919) && this.beseiged[id]) {
        m *= 2;
      }
      if (this.upgrade_owned(save, 577) && id == 14) {
        m *= 1.05;
      }
      if (this.challenge_active(save, 568)) {
        m *= 1.2;
      }
      return m;
    }
    this.building_count = function(save, id, raw) {
      var q = save.buildings[id].q;
      if (!raw) q *= this.building_multiplier(save, id);
      return Math.floor(q);
    }
    this.building_requirement = function(save, id, q) {
      return Math.ceil(q / this.building_multiplier(save, id));
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
    this.researches = function(save, faction= -1) {
      var count = 0;
      for (var id in this.research_ids) {
        if (this.upgrade_owned(save, id) && (faction == -1 || this.research_ids[id] == faction)) {
          count += 1;
        }
      }
      return count;
    }

    this.dataflow = function(save, spec) {
      var value = 0;
      for (var i of spec.beginning) {
        if (i[0](save)) value = i[1](save, value);
      }
      for (var i in spec.additive) {
        if (this.upgrade_owned(save, i)) {
          value += spec.additive[i](save);
        }
      }
      for (var i of spec.middle) {
        if (i[0](save)) value = i[1](save, value);
      }
      for (var i in spec.multiplicative) {
        if (this.upgrade_owned(save, i)) value *= spec.multiplicative[i](save);
      }
      for (var i of spec.ending) {
        if (i[0](save)) value = i[1](save, value);
      }
      return value
    }
    this.assistants = function(save) {
      return this.dataflow(save, this.assistant_upgrades);
    }

    this.re_bonus = function(save) {
      return this.dataflow(save, this.re_bonus_upgrades);
    }

    this.max_mana = function(save) {
      return this.dataflow(save, this.max_mana_upgrades);
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
      {id: 18, name: 'Tax Collection'},
      {id: 3, name: 'Call to Arms'},
      {id: 12, name: 'Holy Light'},
      {id: 6, name: 'Fairy Chanting'},
      {id: 14, name: 'Moon Blessing'},
      {id: 9, name: 'God\'s Hand'},
      {id: 1, name: 'Blood Frenzy'},
      {id: 8, name: 'Goblin\'s Greed'},
      {id: 15, name: 'Night Time'},
      {id: 11, name: 'Hellfire Blast'},
      {id: 7, name: 'Gem Grinder'},
      {id: 13, name: 'Lightning Strike'},
      {id: 10, name: 'Grand Balance'},
      {id: 2, name: 'Brainwave'},
      {id: 5, name: 'Diamond Pickaxe'},
      {id: 4, name: 'Combo Strike'},
      {id: 17, name: 'Spiritual Surge'},
      {id: 21, name: 'Dragon\'s Breath'},
      {id: 19, name: 'Hailstorm'},
      {id: 20, name: 'Heatwave'}
      //{id: 23, name: 'Shadow Embrace'},
      //{id: 24, name: 'Wail of the Banshee'},
      //{id: 22, name: 'Cannibalize'}
    ];
    this.spellsRNG = [
      {id: 13, name: 'Lightning Strike'},
      {id: 21, name: 'Dragon\'s Breath'},
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
      {id: 101818, name: '7500 Cathedrals'},
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
      {id: 123203, name: 'Arcane Brilliance 4'}
    ];
    this.alignment = [
      {id: 0, name: 'Unaligned'},
      {id: 1, name: 'Good'},
      {id: 2, name: 'Evil'},
      {id: 3, name: 'Neutral'}
    ];
    this.faction = [
      {id: -1, name: 'Unaffiliated', timestat: 62},
      {
        id: 0, name: 'Fairy', fc: true,
        fcstat: 6, fcmaxstat: 79,
        affilstat: 17, timestat: 50, upgstat: 66
      },
      {
        id: 1, name: 'Elf', fc: true,
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
        id: 9, name: 'Dwarf', fc: true,
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
        affilstat: 80, timestat: 79, upgstat: 78
      }
    ];
  }

  window.util = {
    render: new render(),
    save: new save(),
    assoc: new assoc()
  };
})(window, document, jQuery);
