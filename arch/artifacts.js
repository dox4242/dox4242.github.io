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
	  reincarnation: 23,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 1500
  },
  {
    name: 'Ancient Device',
    id: 160,
	  reincarnation: 22,
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
	  reincarnation: 29,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 2750
  },
  {
    name: 'Horn of the Kings',
    id: 186,
	  reincarnation: 29,
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
	  reincarnation: 29,
    fixed: function(save) {
      return util.save.upgrade_owned(save, 517);
    },
    excav: 3250,
    random: function(save) {
      return 0.005
    }
  },
  {
    name: 'Obsidian Shard',
    id: 240,
	  reincarnation: 75,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 8000
  },
  {
    name: 'Rough Stone',
    id: 151,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    fail: function(excav, num) {
      return num > 1;
    },
    random: function(save) {
      return 0.02
    },
    precheck: function(save) {
      return util.save.stat(save, 35) == 0;
    }
  },
  {
    name: 'Scarab of Fortune',
    id: 119,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469);
    },
    notry: function(save) {
      return save.alignment != 3;
    },
    random: function(save) {
      return util.save.building_count(save, 2) / 100000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 2, Math.ceil(value * 100000));
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
    nocache: true,
    random: function(save, e) {
      e = !e?save.excavations:e;
      return e / 5000;
    },
	required: function(value) {
	  return value * 5000;
	},
	display: function(value) {
	  return Math.ceil(value) + ' Excavation' + (value>1?'s':'') + ' at this point';
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
      return util.save.building_count(save, 9) / 500000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 9, Math.ceil(value * 500000));
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
      return value + ' Consecutive Elven Luck' + (value>1?'s':'');
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
      return (util.save.building_count(save, 11)) / 375000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 11, Math.ceil(value * 375000));
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
	  reincarnation: 27,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 5 && save.prestigeFaction == -1 && util.save.trophies(save) >= 666;
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
      return (util.save.building_count(save, 16)) / 200000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 16, Math.ceil(value * 200000));
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
      return (util.save.building_count(save, 13)) / 2500000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 13, Math.ceil(value * 2500000));
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
      return util.save.upgrade_owned(save,469) && save.prestigeFaction == 10 && util.save.stat(save, 3, 2) >= 86400;
    },
    random: function(save) {
      return util.save.stat(save, 3, 2) / 432000000;
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
	  reincarnation: 5,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return save.reincarnation / 5000;
    }
  },
  {
    name: 'Black Sword',
    id: 131,
	  reincarnation: 3,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 11 && util.save.stat(save, 49, 2) >= 100;
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
    name: 'Dragon Fang',
    id: 229,
	  reincarnation: 50,
    fixed: function(save) {
      var h = new Date().getHours();
      return save.reincarnation >= this.reincarnation && save.prestigeFaction == 12 && util.save.upgrade_owned(save,469);
    },
    random: function(save) {
      return util.save.building_count(save, 14) / 40000000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 14, Math.ceil(value * 40000000));
    },
    display: function(value) {
      return value + ' Iron Stronghold' + (value > 1 ? 's' : '');
    }
  },
  {
    name: 'Dragon Soul',
    id: 230,
	  reincarnation: 50,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.prestigeFaction == 12 && util.save.upgrade_owned(save,469) && save.spells[21].activeTiers >= 4;
    },
    required: function(value) {
      return Math.ceil(value * 20000000);
    },
    random: function(save) {
      return save.spells[21].c / 20000000;
    },
    display: function(value) {
      return value + ' Dragon\'s Breath Cast' + (value>1?'s':'');;
    }
  },
  {
    name: 'Vanilla Flavor Juice',
    id: 179,
	  reincarnation: 16,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.reincarnation >= this.reincarnation && util.save.stat(save, 1) <= 300;
    },
    random: function(save) {
      return 0.2
    }
  },
  {
    name: 'Know Your Enemy, Part I',
    id: 178,
	  reincarnation: 12,
    fixed: function(save) {
      for (i = 0; i <= 10; i++) {
        if (!util.save.bloodline_upgrades(save, i)) return false;
      }
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= this.reincarnation;
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
      return util.save.building_count(save, 24) / 1000000;
    },
    required: function(value, save) {
      return util.save.building_requirement(save, 24, Math.ceil(value * 1000000));
    },
    display: function(value) {
      return value + ' Witch Conclave' + (value>1?'s':'');
    }
  },
  {
    name: 'Wall Fragment',
    id: 177,
	  reincarnation: 40,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.ascension >= 1;
    },
    random: function(save) {
      return 0.1
    }
  },
  {
    name: 'Spiky Rough Egg',
    id: 211,
	  reincarnation: 46,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    excav: 1500,
    random: function(save) {
      return 0.02;
    }
  },
  {
    name: 'Fortune Teller Machine',
    id: 215,
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == -1 && save.prestigeFaction == -1;
    },
    random: function(save) {
      return 0.001;
    }
  },
  {
    name: 'Dawnstone',
    id: 233,
    fixed: function(save) {
      var h = new Date().getHours();
      return h >= 5 && h <= 7 && util.save.upgrade_owned(save,469);
    },
    nocache: true,
    random: function(save, e) {
      e = !e?save.excavations:e;
      return e / 1000000;
    },
	required: function(value) {
	  return value * 1000000;
	},
	display: function(value) {
	  return Math.ceil(value) + " Excavations at this point";
	}/*,
    required: function(value, save, n) {
      if (Math.ceil(value * 1000000) < n + save.excavations)
      console.log(value, Math.ceil(value * 1000000), n);
      return Math.max(1, Math.ceil(value * 1000000) - n) + save.excavations;
    },
    display: function(value) {
      return value + ' Excavation' + (value>1?'s':'') + ' (must excavate to this point with no eligible artifacts)';
    }*/
  },
  {
    name: 'Duskstone',
    id: 234,
    fixed: function(save) {
      var h = new Date().getHours();
      return h >= 18 && h <= 20 && util.save.upgrade_owned(save,469);
    },
    nocache: true,
    random: function(save, e) {
      e = !e?save.excavations:e;
      return e / 1000000;
    },
	required: function(value) {
	  return value * 1000000;
	},
	display: function(value) {
	  return Math.ceil(value) + " Excavations at this point";
	}/*,
    required: function(value, save, n) {
      if (Math.ceil(value * 1000000) < n + save.excavations)
      console.log(value, Math.ceil(value * 1000000), n);
      return Math.max(1, Math.ceil(value * 1000000) - n) + save.excavations;
    },
    display: function(value) {
      return value + ' Excavation' + (value>1?'s':'') + ' (must excavate to this point with no eligible artifacts)';
    }*/
  },
  {
    name: 'Ancient Heirloom',
    id: 237,
	  reincarnation: 60,
    fixed: function (save) {
      return (save.lineageLevels[0].lev + save.lineageLevels[1].lev + save.lineageLevels[2].lev +
              save.lineageLevels[3].lev + save.lineageLevels[4].lev + save.lineageLevels[5].lev +
              save.lineageLevels[6].lev + save.lineageLevels[7].lev + save.lineageLevels[8].lev +
              save.lineageLevels[9].lev + save.lineageLevels[10].lev + save.lineageLevels[11].lev) > 0;
    },
    random: function (save) {
      return (save.lineageLevels[0].lev + save.lineageLevels[1].lev + save.lineageLevels[2].lev +
              save.lineageLevels[3].lev + save.lineageLevels[4].lev + save.lineageLevels[5].lev +
              save.lineageLevels[6].lev + save.lineageLevels[7].lev + save.lineageLevels[8].lev +
              save.lineageLevels[9].lev + save.lineageLevels[10].lev + save.lineageLevels[11].lev) / 2000;
    },
    required: function (value) {
      return Math.ceil(value * 2000);
    },
    display: function (value) {
      return 'Level ' + Math.ceil(value) + ' total lineages';
    }
  },
  {
    name: 'Know Your Enemy, Part II',
    id: 242,
	  reincarnation: 76,
    fixed: function(save) {
      for (i = 0; i <= 10; i++) {
        if (!util.save.bloodline_upgrades(save, i)) return false;
      }
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return 0.05
    }
  },
  {
    name: 'Veteran Figurine',
    id: 268,
    reincarnation: 90,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && util.save.challenge_owned(save,642);
    },
    random: function(save) {
      return util.save.stat(save, 1) / 100000000;
    },
    required: function(value) {
      return Math.ceil(value * 100000000);
    },
    display: function(value) {
      return util.render.time(value) + ' Playtime'
    }
  },
  {
    name: 'Ancient Cocoa Bean',
    id: 269,
	  reincarnation: 22,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.alignment == 3;
    },
    random: function(save) {
      return 0.1
    }
  },

  {
    name: 'Wall Chunk',
    id: 256,
    reincarnation: 100,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
      return 0.1;
    }
  },

  {
    name: 'Excavated Mirage',
    id: 257,
    reincarnation: 100,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
	  //(log10(x) / 100)%, where x is FC chance
      return util.save.fc_chance(save) / 10000;
    },
	required: function (value) {
      return Math.pow(10, value * 10000);
    },
    display: function (value) {
      return util.render.sci(Math.ceil(value)) + '% Faction Coin Chance';
    }
  },
  {
    name: 'Ancestral Hourglass',
    id: 284,
    reincarnation: 100,
    fixed: function(save) {
      return save.ascension >= 2;
    },
    random: function(save) {
      return util.save.fc_chance(save) / 500000000000000000;
    },
    required: function(value) {
      return Math.ceil(value * 500000000000000000);
    },
    display: function(value) {
      return util.render.sci(value) + '% Faction Coin Chance';
    }
  },
  {
    name: 'Nightmare Figment',
    id: 278,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 8 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,156) && util.save.trophy_owned(save,145);
    },
    random: function (save) {
      return Math.pow(util.save.brainwaveHeadstart(save), 1.5) / 2000000000;
    },
    required: function (value) {
      return Math.pow(value * 2000000000, 2 / 3);
    },
    display: function (value) {
      return util.render.time(value) + ' Brainwave headstart';
    }
  },
  {
    name: 'Branch of the Life Tree',
    id: 274,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 7 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,138) && util.save.trophy_owned(save,153);
    },
    random: function (save) {
      return Math.pow(save.lineageLevels[7].lev, 3) / 200000000;
    },
    required: function (value) {
      return Math.pow(value * 200000000, 1 / 3);
    },
    display: function (value) {
      return 'Level ' + Math.ceil(value) + ' Druid Lineage';
    }
  },
  {
    name: 'Titan Helmet',
    id: 283,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 6 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,141) && util.save.trophy_owned(save,155);
    },
    random: function (save) {
      var exchanges = util.save.stat(save, 24);

      return Math.pow(exchanges, 2) / 150000000000;
    },
    required: function(value, save) {
      var exchanges = Math.ceil(Math.pow(value * 150000000000, 0.5));

      return exchanges;
    },
    display: function (value) {
      return Math.ceil(value) + ' Royal Exchanges';
    }
  },
  {
    name: 'Crystallized Lava',
    id: 275,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 5 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,134) && util.save.trophy_owned(save,140);
    },
    random: function (save) {
      return (save.buildings[10].q - 10000) / 20000000;
    },
    required: function (value) {
      return value * 20000000 + 10000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Hall of Legends';
    }
  },
  {
    name: 'Dusty Coffin', // TODO: higher is better, might require rework of the entire page logic
    id: 276,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 4 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,150) && util.save.trophy_owned(save,142);
    },
    random: function (save) {
      var value = save.stats[1].stats;
      return 0.01 / (30 + Math.pow(value, 1.5));
    },
    required: function (value) {
      return Math.floor(Math.pow((1 / (value * 100)) - 30, 1 / 1.5));
    },
    display: function (value) {
      return util.render.time(~~value) + ' spent this game';
    }
  },
  {
    name: 'Spiked Whip',
    id: 282,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 3 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,129) && util.save.trophy_owned(save,139);
    },
    random: function (save) {
      return (save.buildings[21].q - 10000) / 30000000;
    },
    required: function (value) {
      return value * 30000000 + 10000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Slave Pens';
    }
  },
  {
    name: 'Fossilized Wing',
    id: 277,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 2 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,146) && util.save.trophy_owned(save,135);
    },
    random: function (save) {
      return util.save.stat(save, 52, 2) / 2592000000;
    },
    required: function (value) {
      return value * 2592000000;
    },
    display: function (value) {
      return util.render.time(value) + ' Angel time';
    }
  },
  {
    name: 'Raw Emerald',
    id: 280,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 1 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,143) && util.save.trophy_owned(save,144);
    },
    random: function (save) {
      return (Math.pow(3 * util.save.stat(save, 135), 4.5)) / 1000000;
    },
    required: function (value) {
      return Math.pow(value * 1000000 , (1 / 4.5)) / 3;
    },
    display: function (value) {
      return Math.ceil(value) + ' Non Ruby Excavation Resets this game';
    }
  },
  {
    name: 'Silk Cloth',
    id: 281,
    reincarnation: 100,
    fixed: function (save) {
      return save.faction == 0 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,147) && util.save.trophy_owned(save,132);
    },
    random: function (save) {
      return (save.buildings[25].q - 10000) / 20000000;
    },
    required: function (value) {
      return value * 20000000 + 10000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Wizard Towers';
    }
  },
  {
    name: 'Beard Hair',
    id: 273,
    reincarnation: 116,
    fixed: function (save) {
      return save.prestigeFaction === 9 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,136) && util.save.trophy_owned(save,154);
    },
    random: function (save) {
      return util.save.assistants(save) / 10000000000;
    },
    required: function (value) {
      return value * 10000000000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Assistant Count';
    }
  },
  {
    name: 'Poison Vial',
    id: 279,
    reincarnation: 116,
    fixed: function (save) {
      return save.prestigeFaction === 10 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,133) && util.save.trophy_owned(save,130);
    },
    random: function (save) {
      return Math.pow(40 * util.save.combo_strike_counter(save), 0.9) / 1000000000;
    },
    required: function (value) {
      return Math.pow((value * 1000000000) / 40, 1 / 0.9);
    },
    display: function (value) {
      return Math.ceil(value) + ' Combo Strike Counter';
    }
  },
  {
    name: 'Dragon Scale',
    id: 292,
    reincarnation: 116,
    fixed: function (save) {
      return save.prestigeFaction === 12 && save.reincarnation >= this.reincarnation && save.excavations >= 2000 && util.save.trophy_owned(save,229) && util.save.trophy_owned(save,230);
    },
    random: function (save) {
      return util.save.active_spells(save) / 250000;
    },
    required: function (value) {
      return value * 250000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Active Spells';
    }
  },
  //TODO
  {
    name: 'Lantern of Guidance',
    id: 294,
    reincarnation: 120,
    fixed: function (save) {
      return util.save.upgrade_owned(save,749) && save.reincarnation >= this.reincarnation;
    },
    random: function (save) {
    //(x / 10,000,000,000 (10B))%, where x is mana regen.
	//set to 1000 until i can figure out a way to get the stat
      return 1000 / 1000000000000 ;
    },
    required: function (value) {
      return value * 1000000000000;
    },
    display: function (value) {
      return util.render.sci(value) + ' Mana per second';
    }
  },

  {
    name: 'Oil Lamp',
    id: 295,
    reincarnation: 120,
    fixed: function (save) {
      return util.save.upgrade_owned(save,748) && save.reincarnation >= this.reincarnation;
    },
    random: function (save) {
	//(min(x, y, z) / 1,000 days)%, where x is Fairy Chanting spell activity time, y is Hellfire Blast spell activity time, and z is Brainwave spell activity time (all time)
      return (Math.min((save.spells[6].active0 + save.spells[6].active1 + save.spells[6].active2),
					   (save.spells[11].active0 + save.spells[11].active1 + save.spells[11].active2),
	                   (save.spells[2].active0 + save.spells[2].active1 + save.spells[2].active2)) / 86400)  / 100000;
    },
    required: function (value) {
      return value * 100000;
    },
    display: function (value) {
      return 'At least ' + Math.ceil(value) + ' days of activity time for each of these spells: Fairy Chanting, Hellfire Blast and Brainwave (Check Editor for your current Stats)';
    }
  },

  {
    name: 'Spark of Life',
    id: 296,
    reincarnation: 120,
    fixed: function (save) {
      return util.save.upgrade_owned(save,747) && save.reincarnation >= this.reincarnation;
    },
    random: function (save) {
    //(ln(1 + x) ^ 2 / 12000)%, where x is FC collected this game.
      return Math.pow(Math.log10(1 + util.save.faction_coins(save)), 2) / 600000;
    },
    required: function (value) {
      return Math.pow(10,Math.sqrt(value * 600000)) - 1;
    },
    display: function (value) {
      return util.render.sci(value) + ' Faction Coins found';
    }
  },

  {
    name: 'First Crystal Fragment',
    id: 300,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 0 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x / 100000000000 (100B))%, where x is assistant count.
      return util.save.assistants(save) / 10000000000000;
    },
    required: function (value) {
      return value * 10000000000000;
    },
    display: function (value) {
      return util.render.sci(value) + ' Assistants';
    }
  },

  {
    name: 'Second Crystal Fragment',
    id: 303,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 8 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3 / 5000000 (5M))%, where x is faction coins this game.
      return Math.pow(Math.log10(util.save.faction_coins(save) + 1),3) / 250000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*250000000,1/3));
    },
    display: function (value) {
      return util.render.sci(value) + ' Faction Coins found';
    }
  },

  {
    name: 'Third Crystal Fragment',
    id: 306,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 5 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x / 50000000 (50M))%, where x is evil spells this R.
      return (save.spells[1].c + save.spells[1].r + save.spells[8].c + save.spells[8].r + save.spells[15].c + save.spells[15].r + save.spells[11].c + save.spells[11].r + save.spells[4].c + save.spells[4].r) / 5000000000;
    },
    required: function (value) {
      return value * 5000000000;
    },
    display: function (value) {
      return util.render.sci(value) + ' Evil Spells cast (This R)';
    }
  },

  {
    name: 'First Iron Fragment',
    id: 301,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 2 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3 / 100000 (100K))%, where x is mana regen.
	//Set to 1000 until I find a better way to do this
      return Math.pow(Math.log10(1000 + 1),3) / 10000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*10000000,1/3));
    },
    display: function (value) {
      return util.render.sci(value) + ' Mana per second';
    }
  },

  {
    name: 'Second Iron Fragment',
    id: 304,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 6 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x ^ 3 / 5000000000 (5B))%, where x is royal exchange bonus
      return Math.pow(util.save.re_bonus(save),3) / 500000000000;
    },
    required: function (value) {
      return Math.pow(value * 500000000000 , 1/3);
    },
    display: function (value) {
      return Math.ceil(value) + '% Royal Exchange Bonus';
    }
  },

  {
    name: 'Third Iron Fragment',
    id: 307,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 4 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3 / 1000000 (1M))%, where x is offline bonus multiplier.
	// Set to 1000, see above
      return Math.pow(Math.log10(1000 + 1),3) / 10000000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*10000000000,1/3));
    },
    display: function (value) {
      return util.render.sci(value) + ' Offline Production Bonus';
    }
  },

  {
    name: 'First Stone Fragment',
    id: 302,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 1 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3) / 20000 (20K))%, where x is clicks this game.
      return Math.pow(Math.log10(util.save.stat(save, 4) + 1),3) / 2000000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*2000000,1/3));
    },
    display: function (value) {
      return util.render.sci(value)  + ' Clicks';
    }
  },

  {
    name: 'Second Stone Fragment',
    id: 305,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 7 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(x / 20000000 (20M))%, where x is amount of buildings.
      return util.save.total_buildings(save) / 2000000000;
    },
    required: function (value) {
      return value * 2000000000;
    },
    display: function (value) {
      return Math.ceil(value) + ' Buildings (Multipliers do NOT count)';
    }
  },

  {
  name: 'Third Stone Fragment',
    id: 308,
    reincarnation: 125,
    fixed: function (save) {
      return save.faction == 3 && save.reincarnation >= this.reincarnation && save.excavations >= 12500;
    },
    random: function (save) {
	//(log10(1 + x) ^ 3) / 125000 (125K))%, where x is Tax Collections this game.
      return Math.pow(Math.log10(save.spells[18].c + 1),3) / 12500000;
    },
    required: function (value) {
      return Math.pow(10,Math.pow(value*12500000,1/3));;
    },
    display: function (value) {
      return util.render.sci(value) + ' Tax Collections (This Game)';
    }
  },

  {
    name: 'Planetary Force',
    id: 319,
    reincarnation: 100,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation;
    },
    random: function(save) {
	  //((x ^ 2.5) / 5000)%, where x is amount of consecutive days logged in
      return (Math.pow(save.consecutiveDays,2.5)/500000);
    },
	required: function (value) {
      return Math.pow(value*500000,1/2.5);
    },
    display: function (value) {
      return Math.ceil(value) + ' Consecutive Days logged in';
    }
  },

  {
    name: 'Mercenary Insignia',
    id: 330,
	  reincarnation: 160,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.faction == 11 && util.save.trophy_owned(save,152) && util.save.trophy_owned(save,131);
    },
    random: function(save) {
      return ((Math.log10(save.gems)) - 37) * (0.001);
    },
	required: function (value) {
      return 10**((value / 0.001) + 37);
    },
    display: function (value) {
      return Math.ceil(value).toPrecision(4) + ' Gems';
    }
  },

  {
    name: 'Obsidian Crown',
    id: 331,
	  reincarnation: 170,
    fixed: function(save) {
      return save.reincarnation >= this.reincarnation && save.faction == 11 && (util.save.stat(save, 135) + util.save.stat(save, 104)) >= 10;
    },
    random: function(save) {
      return (util.save.stat(save, 135) + util.save.stat(save, 104) - 10) / 100000;
    },
	required: function (value) {
      return (value * 10000) + 10;
    },
    display: function (value) {
      return Math.ceil(value) + ' Excavation Resets (This Game)';
    }
  }
];
