var Artifacts = [
  {
    name: 'Ancient Stoneslab 1',
    id: 123,
    excav: 5
  },
  {
    name: 'Fossilized Piece of Bark 1',
    id: 127,
    excav: 10
  },
  {
    name: 'Bone Fragment 1',
    id: 125,
    excav: 15
  },
  {
    name: 'Ancient Stoneslab 2',
    id: 124,
    excav: 20
  },
  {
    name: 'Fossilized Piece of Bark 2',
    id: 128,
    excav: 25
  },
  {
    name: 'Bone Fragment 2',
    id: 126,
    excav: 30
  },
  {
    name: 'Key to the Lost City',
    id: 161,
    fixed: function(save) {
      return save.reincarnation >= 23;
    },
    excav: 1500
  },
  {
    name: 'Ancient Device',
    id: 160,
    fixed: function(save) {
      return save.upgrades[465] && save.upgrades[465].u1 ||
        save.upgrades[461] && save.upgrades[461].u1 ||
        save.upgrades[463] && save.upgrades[463].u1;
    },
    excav: 2000,
    random: function(save) {
      return 0.002
    }
  },
  {
    name: 'Earth Core',
    id: 184,
    fixed: function(save) {
      return save.reincarnation >= 29;
    },
    excav: 2750
  },
  {
    name: 'Horn of the Kings',
    id: 186,
    fixed: function(save) {
      return util.save.upgrade_owned(save, 519);
    },
    excav: 3250,
    random: function(save) {
      return 0.005
    }
  },
  {
    name: 'Flame of Bondelnar',
    id: 185,
    fixed: function(save) {
      return util.save.upgrade_owned(save, 517);
    },
    excav: 3250,
    random: function(save) {
      return 0.005
    }
  },
  {
    name: 'Rough Stone',
    id: 151,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    excav: 1,
    fail: function(excav, num) {
      return num > 1;
    },
    random: function(save) {
      return 0.02
    }
  },
  {
    name: 'Scarab of Fortune',
    id: 119,
    notry: function(save) {
      return save.alignment != 3;
    },
    random: function(save) {
      return save.buildings[2].q / 100000;
    },
    required: function(value) {
      return Math.ceil(value * 100000);
    },
    display: function(value) {
      return value + ' Ancient Pyramid' + (value>1?'s':'');
    }
  },
  {
    name: 'Chocolate Cookie',
    id: 120,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    random: function(save) {
      return save.excavations / 5000;
    }
  },
  {
    name: 'Fossilized Rodent',
    id: 137,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    random: function(save) {
      return util.save.stat(save, 4, 1) / 500000000;
    },
    required: function(value) {
      return Math.ceil(value * 500000000);
    },
    display: function(value) {
      return value + ' Total Treasure Click' + (value>1?'s':'');
    }
  },
  {
    name: 'Power Orb',
    id: 148,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && util.save.max_mana(save) >= 3000;
    },
    random: function(save) {
      return util.save.max_mana(save) / 1500000;
    },
    required: function(value) {
      return Math.ceil(value * 1500000);
    },
    display: function(value) {
      return value + ' Max Mana';
    }
  },
  {
    name: 'Pink Carrot',
    id: 147,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 0 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.buildings[9].q / 500000;
    },
    required: function(value) {
      return Math.ceil(value * 500000);
    },
    display: function(value) {
      return value + ' Farm' + (value>1?'s':'');;
    }
  },
  {
    name: 'Bottled Voice',
    id: 132,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 0 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[6].c / 4000000;
    },
    required: function(value) {
      return Math.ceil(value * 4000000);
    },
    display: function(value) {
      return value + ' Fairy Chanting Cast' + (value>1?'s':'');;
    }
  },
  {
    name: 'Lucky Clover',
    id: 143,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 1 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return (save.stats[101].statsReset - 1) / 2;
    },
    required: function(value) {
      return Math.ceil(value * 2) + 1;
    },
    display: function(value) {
      return r + ' Consecutive Elven Luck' + (r>1?'s':'');
    }
  },
  {
    name: 'Mini-treasure',
    id: 144,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 1 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.stat(save, 4) / 300000000;
    },
    required: function(value) {
      return Math.ceil(value * 300000000);
    },
    display: function(value) {
      return value + ' Treasure Click' + (value>1?'s':'');
    }
  },
  {
    name: 'Pillar Fragment',
    id: 146,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 2 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return (save.buildings[11].q) / 375000;
    },
    required: function(value) {
      return Math.ceil(value * 375000);
    },
    display: function(value) {
      return value + ' Heaven\'s Gate' + (value>1?'s':'');
    }
  },
  {
    name: 'Divine Sword',
    id: 135,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 2 && save.prestigeFaction == -1 && save.stats[99].statsReset >= 3;
    },
    random: function(save) {
      return (save.stats[99].statsReset) / 6000;
    },
    required: function(value) {
      return Math.ceil(value * 6000);
    },
    display: function(value) {
      return value + ' Consecutive Angel Affiliation' + (value>1?'s':'');
    }
  },
  {
    name: 'Ancient Coin Piece',
    id: 129,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 3 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.faction_coins(save, 1) / 5000000000;
    },
    required: function(value) {
      return Math.ceil(value * 5000000000);
    },
    display: function(value) {
      return value + ' Total Faction Coins Found';
    }
  },
  {
    name: 'Goblin Purse',
    id: 139,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 3 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[18].c / 30000000;
    },
    required: function(value) {
      return Math.ceil(value * 30000000);
    },
    display: function(value) {
      return value + ' Tax Collection Cast' + (value>1?'s':'');;
    }
  },
  {
    name: 'Rotten Organ',
    id: 150,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 4 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return util.save.assistants(save) / 50000;
    },
    required: function(value) {
      return Math.ceil(value * 50000);
    },
    display: function(value) {
      return value + ' Assistant' + (value>1?'s':'');;
    }
  },
  {
    name: 'Jaw Bone',
    id: 142,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 4 && save.prestigeFaction == -1&& util.save.stat(save, 45, 1) >= 86400;
    },
    random: function(save) {
      return util.save.stat(save, 45, 1) / 86400000;
    },
    required: function(value) {
      return Math.ceil(value * 86400000);
    },
    display: function(value) {
      return util.render.time(value) + ' Total Offline Time';
    }
  },
  {
    name: 'Demonic Figurine',
    id: 134,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 5 && save.prestigeFaction == -1 && util.save.trophies(save) > util.save.max_trophy_count * 0.9;
    },
    random: function(save) {
      return 0.01;
    }
  },
  {
    name: 'Demon Horn',
    id: 140,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 5 && save.prestigeFaction == -1 && save.stats[100].statsReset >= 3;
    },
    random: function(save) {
      return (save.stats[100].statsReset) / 6000;
    },
    required: function(value) {
      return Math.ceil(value * 6000);
    },
    display: function(value) {
      return value + ' Consecutive Demon Affiliation' + (value>1?'s':'');
    }
  },
  {
    name: 'Huge Titan Statue',
    id: 141,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 6 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[13].c / 100000;
    },
    required: function(value) {
      return Math.ceil(value * 100000);
    },
    display: function(value) {
      return value + ' Lightning Strike Cast' + (value>1?'s':'');;
    }
  },
  {
    name: 'Titan Shield',
    id: 155,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 6 && save.prestigeFaction == -1 && util.save.stat(save, 1) >= 36000;
    },
    random: function(save) {
      return util.save.stat(save, 1) / 18000000;
    },
    required: function(value) {
      return Math.ceil(value * 18000000);
    },
    display: function(value) {
      return util.render.time(value) + ' Playtime'
    }
  },
  {
    name: 'Glyph Table',
    id: 138,
    fixed: function(save) {
      var counts = util.save.building_counts(save);
      for (var i = 1; i < counts.length; i++) {
        if (counts[i] != counts[0]) return false;
      }
      return util.save.upgrade_owned(save,469) && save.faction == 7 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return 0.02
    }
  },
  {
    name: 'Stone of Balance',
    id: 153,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 7 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[10].c / 3000000;
    },
    required: function(value) {
      return Math.ceil(value * 3000000);
    },
    display: function(value) {
      return value + ' Grand Balance Cast' + (value>1?'s':'');;
    }
  },
  {
    name: 'Translucent Goo',
    id: 156,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 8 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return save.spells[2].c / 40000;
    },
    required: function(value) {
      return Math.ceil(value * 40000);
    },
    display: function(value) {
      return value + ' Brainwave Cast' + (value>1?'s':'');;
    }
  },
  {
    name: 'Octopus-shaped Helmet',
    id: 145,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 8 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return (save.buildings[11].q) / 200000;
    },
    required: function(value) {
      return Math.ceil(value * 200000);
    },
    display: function(value) {
      return value + ' Labyrinth' + (value>1?'s':'');
    }
  },
  {
    name: 'Dwarven Bow',
    id: 136,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 9;
    },
    random: function(save) {
      return util.save.stat(save, 4) / 2500000;
    },
    required: function(value) {
      return Math.ceil(value * 2500000);
    },
    display: function(value) {
      return value + ' Treasure Click' + (value>1?'s':'');
    }
  },
  {
    name: 'Stone Tankard',
    id: 154,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 9;
    },
    random: function(save) {
      return (save.buildings[13].q) / 2500000;
    },
    required: function(value) {
      return Math.ceil(value * 2500000);
    },
    display: function(value) {
      return value + ' Inn' + (value>1?'s':'');
    }
  },
  {
    name: 'Ceremonial Dagger',
    id: 133,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 10 && util.save.stat(save, 4) == 0;
    },
    random: function(save) {
      return 0.02
    }
  },
  {
    name: 'Arachnid Figurine',
    id: 130,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 10 && util.save.stat(save, 4, 2) >= 86400;
    },
    random: function(save) {
      return util.save.stat(save, 4, 2) / 432000000;
    },
    required: function(value) {
      return Math.ceil(value * 432000000);
    },
    display: function(value) {
      return util.render.time(value) + ' All Time Evil Time';
    }
  },
  {
    name: 'Steel Plate',
    id: 152,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 11 && save.reincarnation >= 5;
    },
    random: function(save) {
      return save.reincarnation / 5000;
    }
  },
  {
    name: 'Black Sword',
    id: 131,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 11 && util.save.stat(save, 49, 2) >= 100;
    },
    random: function(save) {
      return util.save.stat(save, 61, 2) / 6000000;
    },
    required: function(value) {
      return Math.ceil(value * 6000000);
    },
    display: function(value) {
      return util.render.time(value) + ' All Time Mercenary Time';
    }
  },
  {
    name: 'Vanilla Flavor Juice',
    id: 179,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.reincarnation >= 16 && util.save.stat(save, 1) <= 300;
    },
    random: function(save) {
      return 0.2
    }
  },
  {
    name: 'Know Your Enemy, Part I',
    id: 178,
    fixed: function(save) {
      for (i = 0; i <= 10; i++) {
        if (!util.save.bloodline_upgrades(save, i)) return false;
      }
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 11 && save.reincarnation >= 12;
    },
    random: function(save) {
      return 0.1
    }
  },
  {
    name: 'Voodoo Doll',
    id: 187,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    notry: function(save) {
      return save.alignment != 2;
    },
    random: function(save) {
      return save.buildings[24].q / 1000000;
    },
    required: function(value) {
      return Math.ceil(value * 1000000);
    },
    display: function(value) {
      return value + ' Witch Conclave' + (value>1?'s':'');
    }
  },
  {
    name: 'Wall Fragment',
    id: 177,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.ascension >= 1;
    },
    random: function(save) {
      return 0.1
    }
  }
];
