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
      5: 1, 4: 2, 17: 0
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
    this.trophy_owned = function(save, id) {
      return save.trophies[id];
    }
    this.building_count = function(save, id) {
      if (this.upgrade_owned(save, 145919) && this.beseiged[id]) {
        return save.buildings[id].q * 2;
      }
      return save.buildings[id].q;
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
        stats: []
      };
      for (var i = 0; i <= 124; i++) {
        save.stats.push({stats: 0, statsReset: 0, statsRei: 0});
      }
      for (var i = 0; i <= 11; i++) {
        save.factionCoins.push({factionCoins: 0, royalExchanges: 0});
      }
      for (var i = 1; i <= 18; i++) {
        save.spells[i] = {
          _id: i,
          t: -1,
          a: false, n1: -1, n2: -1, n3: -1,
          c: 0, r: 0, e: 0,
          active0: 0, active1: 0, active2: 0,
          s: 0
        };
      }
      for (var i = 1; i <= 25; i++) {
        save.buildings[i] = {
          _id: i,
          q: 0, t: 0, r: 0,
          m: 0, e: 0
        };
      }
      return save;
    }
  }

  function assoc() {
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
      {id: 17, name: 'Spiritual Surge'}
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
      }
    ];
  }

  window.util = {
    render: new render(),
    save: new save(),
    assoc: new assoc()
  };
})(window, document, jQuery);
