var statTables = [
  {
    heading: 'Production',
    stats: [
      {
        name: 'Clicks',
        type: 'sum',
        stat: 4,
        form: 'number'
      },
      {
        name: 'Automatic Clicks',
        type: 'sum',
        stat: 63,
        form: 'number'
      },
      {
        name: 'Manual Clicks',
        type: 'sumdiff',
        stat: [4, 63],
        form: 'number'
      },
      {
        name: 'Coins Gained',
        type: 'sum',
        stat: 0,
        form: 'number'
      },
      {
        name: 'Max Coins at Once',
        type: 'max',
        stat: 31,
        form: 'number'
      },
      {
        name: 'Coins Gained by Clicking',
        type: 'sum',
        stat: 5,
        form: 'number'
      },
      {
        name: 'Coins Gained Automatically',
        type: 'sumdiff',
        stat: [0, 5],
        form: 'number'
      },
      {
        name: 'Coins Gained by Assistants',
        type: 'sum',
        stat: 25,
        form: 'number'            
      },
      {
        name: 'Coins Spent',
        type: 'sum',
        stat: 26,
        form: 'number'            
      },
      {
        name: 'Gems Gained Last Game',
        type: 'plain',
        stat: 30,
        form: 'number',
        override: ['---', null, '---']         
      }
    ]
  },
  {
    heading: 'Buildings',
    description: 'Note: the "All reincarnations" parts of all stats on this panel except "Max Buildings" are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
    stats: [
      {
        name: 'Buildings Built',
        type: 'sum',
        stat: ['b:Farm', 'b:Inn', 'b:Blacksmith', 'b:DeepMine', 'b:StonePillars', 'b:AlchemistLab', 'b:Monastery', 'b:Labyrinth', 'b:IronStronghold', 'b:AncientPyramid', 'b:HallOfLegends', 'b:SlavePen', 'b:OrcishArena', 'b:WitchConclave', 'b:DarkTemple', 'b:Necropolis', 'b:EvilFortress', 'b:HellPortal', 'b:WarriorBarracks', 'b:KnightsJoust', 'b:WizardTower', 'b:Cathedral', 'b:Citadel', 'b:RoyalCastle', 'b:HeavensGate'],
        form: 'number'
      },
      {
        name: 'Max Buildings',
        type: 'max',
        stat: 12,
        form: 'number'
      },
      {
        name: 'Neutral Buildings Built',
        type: 'sum',
        stat: ['b:Farm', 'b:Inn', 'b:Blacksmith', 'b:DeepMine', 'b:StonePillars', 'b:AlchemistLab', 'b:Monastery', 'b:Labyrinth', 'b:IronStronghold', 'b:AncientPyramid', 'b:HallOfLegends'],
        form: 'number'
      },
      {
        name: 'Good Buildings Built',
        type: 'sum',
        stat: ['b:WarriorBarracks', 'b:KnightsJoust', 'b:WizardTower', 'b:Cathedral', 'b:Citadel', 'b:RoyalCastle', 'b:HeavensGate'],
        form: 'number'
      },
      {
        name: 'Evil Buildings Built',
        type: 'sum',
        stat: ['b:SlavePen', 'b:OrcishArena', 'b:WitchConclave', 'b:DarkTemple', 'b:Necropolis', 'b:EvilFortress', 'b:HellPortal'],
        form: 'number'
      }
    ]
  },
  {
    heading: 'Neutral Buildings',
    description: 'Note: the "All reincarnations" parts of all stats on this panel are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
    stats: [
      {
        name: 'Farms Built',
        type: 'sum',
        stat: 'b:Farm',
        form: 'number',
      },
      {
        name: 'Max Farms',
        type: 'max',
        stat: 'b:Farm',
        form: 'number',
      },
      {
        name: 'Inns Built',
        type: 'sum',
        stat: 'b:Inn',
        form: 'number',
      },
      {
        name: 'Max Inns',
        type: 'max',
        stat: 'b:Inn',
        form: 'number',
      },
      {
        name: 'Blacksmiths Built',
        type: 'sum',
        stat: 'b:Blacksmith',
        form: 'number',
      },
      {
        name: 'Max Blacksmiths',
        type: 'max',
        stat: 'b:Blacksmith',
        form: 'number',
      },
      {
        name: 'Deep Mines Built',
        type: 'sum',
        stat: 'b:DeepMine',
        form: 'number',
      },
      {
        name: 'Max Deep Mines',
        type: 'max',
        stat: 'b:DeepMine',
        form: 'number',
      },
      {
        name: 'Stone Pillars Built',
        type: 'sum',
        stat: 'b:StonePillars',
        form: 'number',
      },
      {
        name: 'Max Stone Pillars',
        type: 'max',
        stat: 'b:StonePillars',
        form: 'number',
      },
      {
        name: 'Alchemist Labs Built',
        type: 'sum',
        stat: 'b:AlchemistLab',
        form: 'number',
      },
      {
        name: 'Max Alchemist Labs',
        type: 'max',
        stat: 'b:AlchemistLab',
        form: 'number',
      },
      {
        name: 'Monasteries Built',
        type: 'sum',
        stat: 'b:Monastery',
        form: 'number',
      },
      {
        name: 'Max Monasteries',
        type: 'max',
        stat: 'b:Monastery',
        form: 'number',
      },
      {
        name: 'Labyrinths Built',
        type: 'sum',
        stat: 'b:Labyrinth',
        form: 'number',
      },
      {
        name: 'Max Labyrinths',
        type: 'max',
        stat: 'b:Labyrinth',
        form: 'number',
      },
      {
        name: 'Iron Strongholds Built',
        type: 'sum',
        stat: 'b:IronStronghold',
        form: 'number',
      },
      {
        name: 'Max Iron Strongholds',
        type: 'max',
        stat: 'b:IronStronghold',
        form: 'number',
      },
      {
        name: 'Ancient Pyramids Built',
        type: 'sum',
        stat: 'b:AncientPyramid',
        form: 'number',
      },
      {
        name: 'Max Ancient Pyramids',
        type: 'max',
        stat: 'b:AncientPyramid',
        form: 'number',
      },
      {
        name: 'Halls of Legends Built',
        type: 'sum',
        stat: 'b:HallOfLegends',
        form: 'number',
      },
      {
        name: 'Max Halls of Legends',
        type: 'max',
        stat: 'b:HallOfLegends',
        form: 'number',
      },
    ]
  },
  {
    heading: 'Good Buildings',
    description: 'Note: the "All reincarnations" parts of all stats on this panel are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
    stats: [
      {
        name: 'Warrior Barracks Built',
        type: 'sum',
        stat: 'b:WarriorBarracks',
        form: 'number',
      },
      {
        name: 'Max Warrior Barracks',
        type: 'max',
        stat: 'b:WarriorBarracks',
        form: 'number',
      },
      {
        name: 'Knights Jousts Built',
        type: 'sum',
        stat: 'b:KnightsJoust',
        form: 'number',
      },
      {
        name: 'Max Knights Jousts',
        type: 'max',
        stat: 'b:KnightsJoust',
        form: 'number',
      },
      {
        name: 'Wizard Towers Built',
        type: 'sum',
        stat: 'b:WizardTower',
        form: 'number',
      },
      {
        name: 'Max Wizard Towers',
        type: 'max',
        stat: 'b:WizardTower',
        form: 'number',
      },
      {
        name: 'Cathedrals Built',
        type: 'sum',
        stat: 'b:Cathedral',
        form: 'number',
      },
      {
        name: 'Max Cathedrals',
        type: 'max',
        stat: 'b:Cathedral',
        form: 'number',
      },
      {
        name: 'Citadels Built',
        type: 'sum',
        stat: 'b:Citadel',
        form: 'number',
      },
      {
        name: 'Max Citadels',
        type: 'max',
        stat: 'b:Citadel',
        form: 'number',
      },
      {
        name: 'Royal Castles Built',
        type: 'sum',
        stat: 'b:RoyalCastle',
        form: 'number',
      },
      {
        name: 'Max Royal Castles',
        type: 'max',
        stat: 'b:RoyalCastle',
        form: 'number',
      },
      {
        name: 'Heaven\'s Gates Built',
        type: 'sum',
        stat: 'b:HeavensGate',
        form: 'number',
      },
      {
        name: 'Max Heaven\'s Gates',
        type: 'max',
        stat: 'b:HeavensGate',
        form: 'number',
      },
    ]
  },
  {
    heading: 'Evil Buildings',
    description: 'Note: the "All reincarnations" parts of all stats on this panel are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
    stats: [
      {
        name: 'Slave Pens Built',
        type: 'sum',
        stat: 'b:SlavePen',
        form: 'number',
      },
      {
        name: 'Max Slave Pens',
        type: 'max',
        stat: 'b:SlavePen',
        form: 'number',
      },
      {
        name: 'Orcish Arenas Built',
        type: 'sum',
        stat: 'b:OrcishArena',
        form: 'number',
      },
      {
        name: 'Max Orcish Arenas',
        type: 'max',
        stat: 'b:OrcishArena',
        form: 'number',
      },
      {
        name: 'Witch Conclaves Built',
        type: 'sum',
        stat: 'b:WitchConclave',
        form: 'number',
      },
      {
        name: 'Max Witch Conclaves',
        type: 'max',
        stat: 'b:WitchConclave',
        form: 'number',
      },
      {
        name: 'Dark Temples Built',
        type: 'sum',
        stat: 'b:DarkTemple',
        form: 'number',
      },
      {
        name: 'Max Dark Temples',
        type: 'max',
        stat: 'b:DarkTemple',
        form: 'number',
      },
      {
        name: 'Necropolises Built',
        type: 'sum',
        stat: 'b:Necropolis',
        form: 'number',
      },
      {
        name: 'Max Necropolises',
        type: 'max',
        stat: 'b:Necropolis',
        form: 'number',
      },
      {
        name: 'Evil Fortresses Built',
        type: 'sum',
        stat: 'b:EvilFortress',
        form: 'number',
      },
      {
        name: 'Max Evil Fortresses',
        type: 'max',
        stat: 'b:EvilFortress',
        form: 'number',
      },
      {
        name: 'Hell Portals Built',
        type: 'sum',
        stat: 'b:HellPortal',
        form: 'number',
      },
      {
        name: 'Max Hell Portals',
        type: 'max',
        stat: 'b:HellPortal',
        form: 'number',
      },
    ]
  },
  {
    heading: 'Time',
    stats: [
      {
        name: 'Playtime',
        type: 'sum',
        stat: 1,
        form: 'time'
      },
      {
        name: 'Playtime Last Game',
        type: 'plain',
        stat: 29,
        form: 'time',
        override: ['---', null, '---']
      },
      {
        name: 'Neutral Playtime',
        type: 'sumdiff',
        stat: [1, [2, 3]],
        form: 'time'
      },
      {
        name: 'Good Playtime',
        type: 'sum',
        stat: 2,
        form: 'time'
      },
      {
        name: 'Evil Playtime',
        type: 'sum',
        stat: 3,
        form: 'time'
      },
      {
        name: 'Offline Playtime',
        type: 'sum',
        stat: 45,
        form: 'time'
      },
      {
        name: 'Max Offline Playtime',
        type: 'sum',
        stat: 46,
        form: 'time'
      }
    ]
  },
  {
    heading: 'Magic',
    description: 'Note: the "All reincarnations" parts of all "&lt;Spell&gt; Casts" stats on this panel except "Lightning Strike Casts (Alt)" are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate. "Lightning Strike Casts (Alt)" has existed longer than its normal variant and may be larger and more accurate.',
    stats: [
      {
        name: 'Mana Produced',
        type: 'sum',
        stat: 16,
        form: 'number'
      },
      {
        name: 'Mana Spent',
        type: 'sum',
        stat: 27,
        form: 'number'            
      },
      {
        name: 'Spells Cast',
        type: 'sum',
        stat: 15,
        form: 'number'
      },
      {
        name: 'Time with Active Spell(s)',
        type: 'sum',
        stat: 97,
        form: 'time'
      },
      {
        name: 'Tax Collection Casts',
        type: 'sum',
        stat: 's:TaxCollection',
        form: 'number'
      },
      {
        name: 'Call to Arms Casts',
        type: 'sum',
        stat: 's:CallToArms',
        form: 'number'
      },
      {
        name: 'Holy Light Casts',
        type: 'sum',
        stat: 's:HolyLight',
        form: 'number'
      },
      {
        name: 'Blood Frenzy Casts',
        type: 'sum',
        stat: 's:BloodFrenzy',
        form: 'number'
      },
      {
        name: 'Gem Grinder Casts',
        type: 'sum',
        stat: 's:GemGrinder',
        form: 'number'
      },
      {
        name: 'Fairy Chanting Casts',
        type: 'sum',
        stat: 's:FairyChanting',
        form: 'number'
      },
      {
        name: 'Moon Blessing Casts',
        type: 'sum',
        stat: 's:MoonBlessing',
        form: 'number'
      },
      {
        name: 'God\'s Hand Casts',
        type: 'sum',
        stat: 's:GodsHand',
        form: 'number'
      },
      {
        name: 'Goblin\'s Greed Casts',
        type: 'sum',
        stat: 's:GoblinsGreed',
        form: 'number'
      },
      {
        name: 'Night Time Casts',
        type: 'sum',
        stat: 's:NightTime',
        form: 'number'
      },
      {
        name: 'Hellfire Blast Casts',
        type: 'sum',
        stat: 's:HellfireBlast',
        form: 'number'
      },
      {
        name: 'Lightning Strike Casts',
        type: 'sum',
        stat: 's:LightningStrike',
        form: 'number'
      },
      {
        name: 'Lightning Strike Casts (Alt)',
        type: 'sum',
        stat: 37,
        form: 'number'
      },
      {
        name: 'Grand Balance Casts',
        type: 'sum',
        stat: 's:GrandBalance',
        form: 'number'
      },
      {
        name: 'Brainwave Casts',
        type: 'sum',
        stat: 's:Brainwave',
        form: 'number'
      },
      {
        name: 'Diamond Pickaxe Casts',
        type: 'sum',
        stat: 's:DiamondPickaxe',
        form: 'number'
      },
      {
        name: 'Combo Strike Casts',
        type: 'sum',
        stat: 's:ComboStrike',
        form: 'number'
      },
      {
        name: 'Spiritual Surge Casts',
        type: 'sum',
        stat: 's:SpiritualSurge',
        form: 'number'
      }
    ]
  },
  {
    heading: 'Faction Coins',
    stats: [
      {
        name: 'Exchanges Made',
        type: 'sum',
        stat: 24,
        form: 'number'
      },
      {
        name: 'Faction Coins Gained',
        type: 'sum',
        stat: [6, 7, 8, 9, 10, 11, 41, 42],
        form: 'number'
      },
      {
        name: 'Max Faction Coins at Once',
        type: 'sum',
        stat: 78,
        form: 'number'
      },
      {
        name: 'Diamond Pickaxe Faction Coins',
        type: 'sum',
        stat: 47,
        form: 'number'
      },
      {
        name: 'Honor Among Killers Faction Coins',
        type: 'sum',
        stat: 48,
        form: 'number'
      },
      {
        name: 'Fairy Coins Gained',
        type: 'sum',
        stat: 6,
        form: 'number'
      },
      {
        name: 'Max Fairy Coins Gained',
        type: 'sum',
        stat: 79,
        form: 'number'
      },
      {
        name: 'Elf Coins Gained',
        type: 'sum',
        stat: 7,
        form: 'number'
      },
      {
        name: 'Max Elf Coins Gained',
        type: 'sum',
        stat: 80,
        form: 'number'
      },
      {
        name: 'Angel Coins Gained',
        type: 'sum',
        stat: 8,
        form: 'number'
      },
      {
        name: 'Max Angel Coins Gained',
        type: 'sum',
        stat: 81,
        form: 'number'
      },
      {
        name: 'Goblin Coins Gained',
        type: 'sum',
        stat: 9,
        form: 'number'
      },
      {
        name: 'Max Goblin Coins Gained',
        type: 'sum',
        stat: 82,
        form: 'number'
      },
      {
        name: 'Undead Coins Gained',
        type: 'sum',
        stat: 10,
        form: 'number'
      },
      {
        name: 'Max Undead Coins Gained',
        type: 'sum',
        stat: 83,
        form: 'number'
      },
      {
        name: 'Demon Coins Gained',
        type: 'sum',
        stat: 11,
        form: 'number'
      },
      {
        name: 'Max Demon Coins Gained',
        type: 'sum',
        stat: 84,
        form: 'number'
      },
      {
        name: 'Dwarf Coins Gained',
        type: 'sum',
        stat: 41,
        form: 'number'
      },
      {
        name: 'Max Dwarf Coins Gained',
        type: 'sum',
        stat: 85,
        form: 'number'
      },
      {
        name: 'Drow Coins Gained',
        type: 'sum',
        stat: 42,
        form: 'number'
      },
      {
        name: 'Max Drow Coins Gained',
        type: 'sum',
        stat: 86,
        form: 'number'
      }
    ]
  },
  {
    heading: 'Factions',
    stats: [
      {
        name: 'Time Spent Unaffiliated',
        type: 'sum',
        stat: 62,
        form: 'time'            
      },
      {
        name: 'Fairy Affiliations',
        type: 'sum',
        stat: 17,
        form: 'number'
      },
      {
        name: 'Fairy Playtime',
        type: 'sum',
        stat: 50,
        form: 'time'
      },
      {
        name: 'Fairy Upgrades Bought',
        type: 'sum',
        stat: 66,
        form: 'number'
      },
      {
        name: 'Elf Affiliations',
        type: 'sum',
        stat: 18,
        form: 'number'
      },
      {
        name: 'Elf Playtime',
        type: 'sum',
        stat: 51,
        form: 'time'
      },
      {
        name: 'Elf Upgrades Bought',
        type: 'sum',
        stat: 67,
        form: 'number'
      },
      {
        name: 'Angel Affiliations',
        type: 'sum',
        stat: 19,
        form: 'number'
      },
      {
        name: 'Angel Playtime',
        type: 'sum',
        stat: 52,
        form: 'time'
      },
      {
        name: 'Angel Upgrades Bought',
        type: 'sum',
        stat: 68,
        form: 'number'
      },
      {
        name: 'Goblin Affiliations',
        type: 'sum',
        stat: 20,
        form: 'number'
      },
      {
        name: 'Goblin Playtime',
        type: 'sum',
        stat: 53,
        form: 'time'
      },
      {
        name: 'Goblin Upgrades Bought',
        type: 'sum',
        stat: 69,
        form: 'number'
      },
      {
        name: 'Undead Affiliations',
        type: 'sum',
        stat: 21,
        form: 'number'
      },
      {
        name: 'Undead Playtime',
        type: 'sum',
        stat: 54,
        form: 'time'
      },
      {
        name: 'Undead Upgrades Bought',
        type: 'sum',
        stat: 70,
        form: 'number'
      },
      {
        name: 'Demon Affiliations',
        type: 'sum',
        stat: 22,
        form: 'number'
      },
      {
        name: 'Demon Playtime',
        type: 'sum',
        stat: 55,
        form: 'time'
      },
      {
        name: 'Demon Upgrades Bought',
        type: 'sum',
        stat: 71,
        form: 'number'
      },
      {
        name: 'Titan Affiliations',
        type: 'sum',
        stat: 32,
        form: 'number'
      },
      {
        name: 'Titan Playtime',
        type: 'sum',
        stat: 56,
        form: 'time'
      },
      {
        name: 'Titan Upgrades Bought',
        type: 'sum',
        stat: 72,
        form: 'number'
      },
      {
        name: 'Druid Affiliations',
        type: 'sum',
        stat: 33,
        form: 'number'
      },
      {
        name: 'Druid Playtime',
        type: 'sum',
        stat: 57,
        form: 'time'
      },
      {
        name: 'Druid Upgrades Bought',
        type: 'sum',
        stat: 73,
        form: 'number'
      },
      {
        name: 'Faceless Affiliations',
        type: 'sum',
        stat: 34,
        form: 'number'
      },
      {
        name: 'Faceless Alliances',
        type: 'plain',
        stat: 'd:facelessAlly',
        form: 'number',
        override: ['---', '---', null]
      },
      {
        name: 'Faceless Playtime',
        type: 'sum',
        stat: 58,
        form: 'time'
      },
      {
        name: 'Faceless Upgrades Bought',
        type: 'sum',
        stat: 74,
        form: 'number'
      },
      {
        name: 'Dwarf Affiliations',
        type: 'sum',
        stat: 43,
        form: 'number'
      },
      {
        name: 'Dwarf Playtime',
        type: 'sum',
        stat: 59,
        form: 'time'
      },
      {
        name: 'Dwarf Upgrades Bought',
        type: 'sum',
        stat: 75,
        form: 'number'
      },
      {
        name: 'Drow Affiliations',
        type: 'sum',
        stat: 44,
        form: 'number'
      },
      {
        name: 'Drow Playtime',
        type: 'sum',
        stat: 60,
        form: 'time'
      },
      {
        name: 'Drow Upgrades Bought',
        type: 'sum',
        stat: 76,
        form: 'number'
      },
      {
        name: 'Mercenary Affiliations',
        type: 'sum',
        stat: 49,
        form: 'number'
      },
      {
        name: 'Mercenary Playtime',
        type: 'sum',
        stat: 61,
        form: 'time'
      },
      {
        name: 'Mercenary Upgrades Bought',
        type: 'sum',
        stat: 77,
        form: 'number'
      }
    ]
  },
  {
    heading: 'Research',
    stats: [
      {
        name: 'Spellcraft Level',
        type: 'sum',
        stat: 90,
        form: 'number'
      },
      {
        name: 'Craftsmanship Level',
        type: 'sum',
        stat: 91,
        form: 'number'
      },
      {
        name: 'Divine Level',
        type: 'sum',
        stat: 92,
        form: 'number'
      },
      {
        name: 'Economics Level',
        type: 'sum',
        stat: 93,
        form: 'number'
      },
      {
        name: 'Alchemy Level',
        type: 'sum',
        stat: 94,
        form: 'number'
      },
      {
        name: 'Warfare Level',
        type: 'sum',
        stat: 95,
        form: 'number'
      }
    ]
  },
  {
    heading: 'Miscellaneous',
    stats: [
      {
        name: 'Number of Abdications',
        type: 'sum',
        stat: 28,
        form: 'number',
        override: ['---', null, null]
      },
      {
        name: 'Max Base Assistants',
        type: 'max',
        stat: 96,
        form: 'number'
      },
      {
        name: 'Assistant Squishes',
        type: 'sum',
        stat: 23,
        form: 'number'
      },
      {
        name: 'Max Upgrades Purchased',
        type: 'max',
        stat: 13,
        form: 'number'        
      },
      {
        name: 'Excavations',
        type: 'sum',
        stat: 35,
        form: 'number'        
      },
      {
        name: 'Excavation Reports (sorta)',
        type: 'sum',
        stat: 36,
        form: 'number'        
      },
      {
        name: 'Greedyness',
        type: 'sum',
        stat: 64,
        form: 'number'        
      },
      {
        name: 'Facelessness',
        type: 'sum',
        stat: 38,
        form: 'number',
        override: ['---', null, null]
      }
    ]
  },
  {
    heading: 'Experimental',
    description: 'Note: what "Unknown Stat (14)" is tracking is currently unknown. All other stats in this table are non-functional and all parts should be 0.',
    stats: [
      {
        name: 'Unknown Stat (14)',
        type: 'plain',
        stat: 14,
        form: 'plain'            
      },
      {
        name: 'Pay Upkeep Casts (Unused)',
        type: 'plain',
        stat: 65,
        form: 'plain'            
      },
      {
        name: 'Max Playtime (Broken)',
        type: 'plain',
        stat: 39,
        form: 'plain'            
      },
      {
        name: 'Max Spells Cast (Broken)',
        type: 'plain',
        stat: 40,
        form: 'plain'            
      },
      {
        name: 'Max Treasure Clicks (Broken)',
        type: 'plain',
        stat: 87,
        form: 'plain'            
      },
      {
        name: 'Max Assistant Squishes (Broken)',
        type: 'plain',
        stat: 88,
        form: 'plain'            
      },
      {
        name: 'Max Automatic Clicks (Broken)',
        type: 'plain',
        stat: 89,
        form: 'plain'            
      }
    ]
  }
];
