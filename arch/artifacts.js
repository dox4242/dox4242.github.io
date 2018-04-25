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
    name: 'Obsidian Shard',
    id: 240,
    fixed: function(save) {
      return save.reincarnation >= 75;
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
    fixed: function(save) {
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= 5;
    },
    random: function(save) {
      return save.reincarnation / 5000;
    }
  },
  {
    name: 'Black Sword',
    id: 131,
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
    fixed: function(save) {
      var h = new Date().getHours();
      return save.reincarnation >= 50 && save.prestigeFaction == 12 && util.save.upgrade_owned(save,469);
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
    fixed: function(save) {
      return save.reincarnation >= 50 && save.prestigeFaction == 12 && util.save.upgrade_owned(save,469) && save.spells[21].activeTiers >= 4;
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
      return util.save.upgrade_owned(save,469) && save.faction == 11 && save.reincarnation >= 12;
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
    fixed: function(save) {
      return save.reincarnation >= 46;
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
    name: 'Veteran Figurine',
    id: 268,
    fixed: function(save) {
      return save.reincarnation >= 90;
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
    fixed: function(save) {
      return save.reincarnation >= 22 && save.alignment == 3;
    },
    random: function(save) {
      return 0.1
    }
  },
  // ancestral hourglass just uses a really weird number to correctly consume small values
  // todo: make it use the proper number
  {
    name: 'Ancestral Hourglass',
    id: 284,
    fixed: function(save) {
      return save.ascension >= 2;
    },
    random: function(save) {
      return util.save.fc_chance(save) / 1000000000000000000;
    },
    required: function(value) {
      return Math.ceil(value * 1000000000000000000);
    },
    display: function(value) {
      return util.render.eng(value) + ' Faction Coin Chance';
    }
  },
  {
    name: 'Nightmare Figment',
    id: 278,
    fixed: function (save) {
      return save.faction == 8 && save.reincarnation >= 100 && save.excavations >= 3000;
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
    fixed: function (save) {
      return save.faction == 7 && save.reincarnation >= 100 && save.excavations >= 3000;
    },
    random: function (save) {
      return Math.pow(save.lineageLevels[7].lev, 3) / 200000000;
    },
    required: function (value) {
      return Math.pow(value * 200000000, 1 / 3);
    },
    display: function (value) {
      return 'Level ' + Math.ceil(value) + ' druid lineage';
    }
  },
  {
    name: 'Titan Helmet',
    id: 283,
    fixed: function (save) {
      return save.faction == 6 && save.reincarnation >= 100 && save.excavations >= 3000;
    },
    random: function (save) {
      var exchanges = util.save.stat(save, 24);
      if (util.save.upgrade_owned(save, 787)) {
        var giantMarket = 1.5 * Math.pow(util.save.building_count(save, 7), 0.5);
        exchanges *= (1 + 0.01 * giantMarket);
      }
      return Math.pow(exchanges, 2) / 500000000000;
    },
    required: function(value, save) {
      var exchanges = Math.ceil(Math.pow(value * 500000000000, 0.5));
      if (util.save.upgrade_owned(save, 787)) {
        var giantMarket = 1.5 * Math.pow(util.save.building_count(save, 7), 0.5);
        exchanges /= (1 + 0.01 * giantMarket);
      }
      return exchanges;
    },
    display: function (value) {
      return Math.ceil(value) + ' royal exchanges';
    }
  },
  {
    name: 'Crystallized Lava',
    id: 275, 
    fixed: function (save) {
      return save.faction == 5 && save.reincarnation >= 100 && save.excavations >= 3000;
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
    fixed: function (save) {
      return save.faction == 4 && save.reincarnation >= 100 && save.excavations >= 3000;
    },
    random: function (save) {
      var value = save.stats[1].stats;
      return 1 / (30 + Math.pow(value, 1.75));
    },
    required: function (value) {
      return Math.floor(Math.pow((1 / (value * 100)) - 30, 1 / 1.75));
    },
    display: function (value) {
      return util.render.time(value) + ' spent this game';
    }
  },
  {
    name: 'Spiked Whip',
    id: 282, 
    fixed: function (save) {
      return save.faction == 3 && save.reincarnation >= 100 && save.excavations >= 3000;
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
    fixed: function (save) {
      return save.faction == 2 && save.reincarnation >= 100 && save.excavations >= 3000;
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
    fixed: function (save) {
      return save.faction == 1 && save.reincarnation >= 100 && save.excavations >= 3000;
    },
    random: function (save) {
      return (Math.pow(2 * util.save.stat(save, 135), 4.5)) / 1000000;
    },
    required: function (value) {
      return Math.pow(value * 1000000 , (1 / 4.5)) / 2;
    },
    display: function (value) {
      return Math.ceil(value) + ' non ruby excavation resets this game';
    }
  },
  {
    name: 'Silk Cloth',
    id: 281,
    fixed: function (save) {
      return save.faction == 0 && save.reincarnation >= 100 && save.excavations >= 3000;
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
  }
];
