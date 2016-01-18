	var statTables = [
		{
			heading: 'General',
			levels: [0],
			columns: ['Stat', 'Value'],
			stats: [
				{
					name: 'Reincarnation',
					type: 'plain',
					stat: 'g:rei',
					form: 'plain'
				}, {
					name: 'Gems',
					type: 'plain',
					stat: 'g:gems',
					form: 'number'
				}, {
					name: 'Gems after Abdication',
					type: 'sum',
					stat: ['d:gemGain', 'g:gems'],
					form: 'number'
				}, {
					name: 'Gold',
					type: 'plain',
					stat: 'g:resource',
					form: 'number'
				}, {
					name: 'Alignment',
					type: 'plain',
					stat: 'g:alignment',
					form: 'f:alignment'
				}, {
					name: 'Faction',
					type: 'plain',
					stat: 'g:faction',
					form: 'f:faction'
				}, {
					name: 'Prestige Faction',
					type: 'plain',
					stat: 'g:activeFaction',
					form: 'f:faction'
				}, {
					name: 'Bloodline Faction',
					type: 'plain',
					stat: 'g:bFaction',
					form: 'f:faction'
				}, {
					name: 'Save Timestamp',
					type: 'plain',
					stat: 'd:timestamp',
					form: 'plain'
				}, {
					name: 'Save Created',
					type: 'plain',
					stat: 'd:timedelta',
					form: 'timedelta'
				}, {
					name: 'Save/Game Version',
					type: 'plain',
					stat: 'd:version',
					form: 'plain'
				}
			]
		}, {
			heading: 'Production',
			stats: [
				{
					name: 'Clicks',
					type: 'sum',
					stat: 4,
					form: 'number'
				}, {
					name: 'Automatic Clicks',
					type: 'sum',
					stat: 63,
					form: 'number'
				}, {
					name: 'Manual Clicks',
					type: 'sumdiff',
					stat: [4, 63],
					form: 'number'
				}, {
					name: 'Coins Gained',
					type: 'sum',
					stat: 0,
					form: 'number'
				}, {
					name: 'Max Coins at Once',
					type: 'max',
					stat: 31,
					form: 'number'
				}, {
					name: 'Coins Gained by Clicking',
					type: 'sum',
					stat: 5,
					form: 'number'
				}, {
					name: 'Coins Gained Automatically',
					type: 'sumdiff',
					stat: [0, 5],
					form: 'number'
				}, {
					name: 'Coins Gained by Assistants',
					type: 'sum',
					stat: 25,
					form: 'number'            
				}, {
					name: 'Coins Spent',
					type: 'sum',
					stat: 26,
					form: 'number'            
				}, {
					name: 'Gems Gained Last Game',
					type: 'plain',
					stat: 30,
					form: 'number',
					levels: [1],
					override: [null, '&ndash;', '&ndash;']         
				}, {
					name: 'Gem Gain on Abdication',
					type: 'plain',
					stat: 'd:gemGain',
					form: 'number',
					override: [null, '&ndash;', '&ndash;']
				}
			]
		}, {
			heading: 'Buildings',
			description: 'Note: the "All reincarnations" parts of all stats on this panel except "Max Buildings" are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
			stats: [
				{
					name: 'Buildings Built',
					type: 'sum',
					stat: ['b:Farm', 'b:Inn', 'b:Blacksmith', 'b:DeepMine', 'b:StonePillars', 'b:AlchemistLab', 'b:Monastery', 'b:Labyrinth', 'b:IronStronghold', 'b:AncientPyramid', 'b:HallOfLegends', 'b:SlavePen', 'b:OrcishArena', 'b:WitchConclave', 'b:DarkTemple', 'b:Necropolis', 'b:EvilFortress', 'b:HellPortal', 'b:WarriorBarracks', 'b:KnightsJoust', 'b:WizardTower', 'b:Cathedral', 'b:Citadel', 'b:RoyalCastle', 'b:HeavensGate'],
					form: 'number'
				}, {
					name: 'Max Buildings',
					type: 'max',
					stat: 12,
					form: 'number'
				}, {
					name: 'Neutral Buildings Built',
					type: 'sum',
					stat: ['b:Farm', 'b:Inn', 'b:Blacksmith', 'b:DeepMine', 'b:StonePillars', 'b:AlchemistLab', 'b:Monastery', 'b:Labyrinth', 'b:IronStronghold', 'b:AncientPyramid', 'b:HallOfLegends'],
					form: 'number'
				}, {
					name: 'Good Buildings Built',
					type: 'sum',
					stat: ['b:WarriorBarracks', 'b:KnightsJoust', 'b:WizardTower', 'b:Cathedral', 'b:Citadel', 'b:RoyalCastle', 'b:HeavensGate'],
					form: 'number'
				}, {
					name: 'Evil Buildings Built',
					type: 'sum',
					stat: ['b:SlavePen', 'b:OrcishArena', 'b:WitchConclave', 'b:DarkTemple', 'b:Necropolis', 'b:EvilFortress', 'b:HellPortal'],
					form: 'number'
				}
				]
				}, {
				layout: 'table',
				heading: 'Neutral Buildings',
				description: 'Note: the "All reincarnations" parts of all stats on this panel are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
				stats: [
				{
					name: 'Farms Built',
					type: 'sum',
					stat: 'b:Farm',
					form: 'number',
				}, {
					name: 'Max Farms',
					type: 'max',
					stat: 'b:Farm',
					form: 'number',
				}, {
					name: 'Inns Built',
					type: 'sum',
					stat: 'b:Inn',
					form: 'number',
				}, {
					name: 'Max Inns',
					type: 'max',
					stat: 'b:Inn',
					form: 'number',
				}, {
					name: 'Blacksmiths Built',
					type: 'sum',
					stat: 'b:Blacksmith',
					form: 'number',
				}, {
					name: 'Max Blacksmiths',
					type: 'max',
					stat: 'b:Blacksmith',
					form: 'number',
				}, {
					name: 'Deep Mines Built',
					type: 'sum',
					stat: 'b:DeepMine',
					form: 'number',
				}, {
					name: 'Max Deep Mines',
					type: 'max',
					stat: 'b:DeepMine',
					form: 'number',
				}, {
					name: 'Stone Pillars Built',
					type: 'sum',
					stat: 'b:StonePillars',
					form: 'number',
				}, {
					name: 'Max Stone Pillars',
					type: 'max',
					stat: 'b:StonePillars',
					form: 'number',
				}, {
					name: 'Alchemist Labs Built',
					type: 'sum',
					stat: 'b:AlchemistLab',
					form: 'number',
				}, {
					name: 'Max Alchemist Labs',
					type: 'max',
					stat: 'b:AlchemistLab',
					form: 'number',
				}, {
					name: 'Monasteries Built',
					type: 'sum',
					stat: 'b:Monastery',
					form: 'number',
				}, {
					name: 'Max Monasteries',
					type: 'max',
					stat: 'b:Monastery',
					form: 'number',
				}, {
					name: 'Labyrinths Built',
					type: 'sum',
					stat: 'b:Labyrinth',
					form: 'number',
				}, {
					name: 'Max Labyrinths',
					type: 'max',
					stat: 'b:Labyrinth',
					form: 'number',
				}, {
					name: 'Iron Strongholds Built',
					type: 'sum',
					stat: 'b:IronStronghold',
					form: 'number',
				}, {
					name: 'Max Iron Strongholds',
					type: 'max',
					stat: 'b:IronStronghold',
					form: 'number',
				}, {
					name: 'Ancient Pyramids Built',
					type: 'sum',
					stat: 'b:AncientPyramid',
					form: 'number',
				}, {
					name: 'Max Ancient Pyramids',
					type: 'max',
					stat: 'b:AncientPyramid',
					form: 'number',
				}, {
					name: 'Halls of Legends Built',
					type: 'sum',
					stat: 'b:HallOfLegends',
					form: 'number',
				}, {
					name: 'Max Halls of Legends',
					type: 'max',
					stat: 'b:HallOfLegends',
					form: 'number',
				},
			]
		}, {
			layout: 'table',
			heading: 'Good Buildings',
			description: 'Note: the "All reincarnations" parts of all stats on this panel are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
			stats: [
				{
					name: 'Warrior Barracks Built',
					type: 'sum',
					stat: 'b:WarriorBarracks',
					form: 'number',
				}, {
					name: 'Max Warrior Barracks',
					type: 'max',
					stat: 'b:WarriorBarracks',
					form: 'number',
				}, {
					name: 'Knights Jousts Built',
					type: 'sum',
					stat: 'b:KnightsJoust',
					form: 'number',
				}, {
					name: 'Max Knights Jousts',
					type: 'max',
					stat: 'b:KnightsJoust',
					form: 'number',
				}, {
					name: 'Wizard Towers Built',
					type: 'sum',
					stat: 'b:WizardTower',
					form: 'number',
				}, {
					name: 'Max Wizard Towers',
					type: 'max',
					stat: 'b:WizardTower',
					form: 'number',
				}, {
					name: 'Cathedrals Built',
					type: 'sum',
					stat: 'b:Cathedral',
					form: 'number',
				}, {
					name: 'Max Cathedrals',
					type: 'max',
					stat: 'b:Cathedral',
					form: 'number',
				}, {
					name: 'Citadels Built',
					type: 'sum',
					stat: 'b:Citadel',
					form: 'number',
				}, {
					name: 'Max Citadels',
					type: 'max',
					stat: 'b:Citadel',
					form: 'number',
				}, {
					name: 'Royal Castles Built',
					type: 'sum',
					stat: 'b:RoyalCastle',
					form: 'number',
				}, {
					name: 'Max Royal Castles',
					type: 'max',
					stat: 'b:RoyalCastle',
					form: 'number',
				}, {
					name: 'Heaven\'s Gates Built',
					type: 'sum',
					stat: 'b:HeavensGate',
					form: 'number',
				}, {
					name: 'Max Heaven\'s Gates',
					type: 'max',
					stat: 'b:HeavensGate',
					form: 'number',
				},
			]
		}, {
			layout: 'table',
			heading: 'Evil Buildings',
			description: 'Note: the "All reincarnations" parts of all stats on this panel are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate.',
			stats: [
				{
					name: 'Slave Pens Built',
					type: 'sum',
					stat: 'b:SlavePen',
					form: 'number',
				}, {
					name: 'Max Slave Pens',
					type: 'max',
					stat: 'b:SlavePen',
					form: 'number',
				}, {
					name: 'Orcish Arenas Built',
					type: 'sum',
					stat: 'b:OrcishArena',
					form: 'number',
				}, {
					name: 'Max Orcish Arenas',
					type: 'max',
					stat: 'b:OrcishArena',
					form: 'number',
				}, {
					name: 'Witch Conclaves Built',
					type: 'sum',
					stat: 'b:WitchConclave',
					form: 'number',
				}, {
					name: 'Max Witch Conclaves',
					type: 'max',
					stat: 'b:WitchConclave',
					form: 'number',
				}, {
					name: 'Dark Temples Built',
					type: 'sum',
					stat: 'b:DarkTemple',
					form: 'number',
				}, {
					name: 'Max Dark Temples',
					type: 'max',
					stat: 'b:DarkTemple',
					form: 'number',
				}, {
					name: 'Necropolises Built',
					type: 'sum',
					stat: 'b:Necropolis',
					form: 'number',
				}, {
					name: 'Max Necropolises',
					type: 'max',
					stat: 'b:Necropolis',
					form: 'number',
				}, {
					name: 'Evil Fortresses Built',
					type: 'sum',
					stat: 'b:EvilFortress',
					form: 'number',
				}, {
					name: 'Max Evil Fortresses',
					type: 'max',
					stat: 'b:EvilFortress',
					form: 'number',
				}, {
					name: 'Hell Portals Built',
					type: 'sum',
					stat: 'b:HellPortal',
					form: 'number',
				}, {
					name: 'Max Hell Portals',
					type: 'max',
					stat: 'b:HellPortal',
					form: 'number',
				},
			]
		}, {
			layout: 'table',
			heading: 'Time',
			stats: [
				{
					name: 'Playtime',
					type: 'sum',
					stat: 1,
					form: 'time'
				}, {
					name: 'Playtime Last Game',
					type: 'plain',
					stat: 29,
					form: 'time',
					levels: [1],
					override: [null, '&ndash;', '&ndash;']
				}, {
					name: 'Neutral Playtime',
					type: 'sumdiff',
					stat: [1, [2, 3]],
					form: 'time'
				}, {
					name: 'Good Playtime',
					type: 'sum',
					stat: 2,
					form: 'time'
				}, {
					name: 'Evil Playtime',
					type: 'sum',
					stat: 3,
					form: 'time'
				}, {
					name: 'Offline Playtime',
					type: 'sum',
					stat: 45,
					form: 'time'
				}, {
					name: 'Max Offline Playtime',
					type: 'sum',
					stat: 46,
					form: 'time'
				}
			]
		}, {
			layout: 'table',
			heading: 'Magic',
			description: 'Note: the "All reincarnations" parts of all "&lt;Spell&gt; Casts" stats on this panel except the "(Alt)" ones are not set to 0 on a hard reset. If you have hard reset, these stats may be inaccurate. "Lightning Strike Casts (Alt)" has existed longer than its normal variant and may be larger and more accurate. Combo Strike Casts (Alt) is not a normal stat and is current game only.',
			stats: [
				{
					name: 'Current Mana',
					type: 'plain',
					stat: 'g:mana',
					form: 'number',
					override: [null, '&ndash;', '&ndash;']
				}, {
					name: 'Mana Produced',
					type: 'sum',
					stat: 16,
					form: 'number'
				}, {
					name: 'Mana Spent',
					type: 'sum',
					stat: 27,
					form: 'number'            
				}, {
					name: 'Spells Cast',
					type: 'sum',
					stat: 15,
					form: 'number'
				}, {
					name: 'Time with Active Spell(s)',
					type: 'sum',
					stat: 97,
					form: 'time'
				}, {
					name: 'Tax Collection Casts',
					type: 'sum',
					stat: 's:TaxCollection',
					form: 'number'
				}, {
					name: 'Call to Arms Casts',
					type: 'sum',
					stat: 's:CallToArms',
					form: 'number'
				}, {
					name: 'Holy Light Casts',
					type: 'sum',
					stat: 's:HolyLight',
					form: 'number'
				}, {
					name: 'Blood Frenzy Casts',
					type: 'sum',
					stat: 's:BloodFrenzy',
					form: 'number'
				}, {
					name: 'Gem Grinder Casts',
					type: 'sum',
					stat: 's:GemGrinder',
					form: 'number'
				}, {
					name: 'Fairy Chanting Casts',
					type: 'sum',
					stat: 's:FairyChanting',
					form: 'number'
				}, {
					name: 'Moon Blessing Casts',
					type: 'sum',
					stat: 's:MoonBlessing',
					form: 'number'
				}, {
					name: 'God\'s Hand Casts',
					type: 'sum',
					stat: 's:GodsHand',
					form: 'number'
				}, {
					name: 'Goblin\'s Greed Casts',
					type: 'sum',
					stat: 's:GoblinsGreed',
					form: 'number'
				}, {
					name: 'Night Time Casts',
					type: 'sum',
					stat: 's:NightTime',
					form: 'number'
				}, {
					name: 'Hellfire Blast Casts',
					type: 'sum',
					stat: 's:HellfireBlast',
					form: 'number'
				}, {
					name: 'Lightning Strike Casts',
					type: 'sum',
					stat: 's:LightningStrike',
					form: 'number'
				}, {
					name: 'Lightning Strike Casts (Alt)',
					type: 'sum',
					stat: 37,
					form: 'number'
				}, {
					name: 'Grand Balance Casts',
					type: 'sum',
					stat: 's:GrandBalance',
					form: 'number'
				}, {
					name: 'Brainwave Casts',
					type: 'sum',
					stat: 's:Brainwave',
					form: 'number'
				}, {
					name: 'Diamond Pickaxe Casts',
					type: 'sum',
					stat: 's:DiamondPickaxe',
					form: 'number'
				}, {
					name: 'Combo Strike Casts',
					type: 'sum',
					stat: 's:ComboStrike',
					form: 'number'
				}, {
					name: 'Combo Strike Casts (Alt)',
					type: 'plain',
					stat: 'g:comboStrike',
					form: 'number',
					override: [null, '&ndash;', '&ndash;']
				}, {
					name: 'Spiritual Surge Casts',
					type: 'sum',
					stat: 's:SpiritualSurge',
					form: 'number'
				}
			]
		}, {
			layout: 'table',
			heading: 'Faction Coins',
			stats: [
				{
					name: 'Exchanges Made',
					type: 'sum',
					stat: 24,
					form: 'number'
				}, {
					name: 'Faction Coins Gained',
					type: 'sum',
					stat: [6, 7, 8, 9, 10, 11, 41, 42],
					form: 'number'
				}, {
					name: 'Max Faction Coins at Once',
					type: 'sum',
					stat: 78,
					form: 'number'
				}, {
					name: 'Diamond Pickaxe Faction Coins',
					type: 'sum',
					stat: 47,
					form: 'number'
				}, {
					name: 'Honor Among Killers Faction Coins',
					type: 'sum',
					stat: 48,
					form: 'number'
				}, {
					name: 'Fairy Coins Gained',
					type: 'sum',
					stat: 6,
					form: 'number'
				}, {
					name: 'Max Fairy Coins Gained',
					type: 'sum',
					stat: 79,
					form: 'number'
				}, {
					name: 'Elf Coins Gained',
					type: 'sum',
					stat: 7,
					form: 'number'
				}, {
					name: 'Max Elf Coins Gained',
					type: 'sum',
					stat: 80,
					form: 'number'
				}, {
					name: 'Angel Coins Gained',
					type: 'sum',
					stat: 8,
					form: 'number'
				}, {
					name: 'Max Angel Coins Gained',
					type: 'sum',
					stat: 81,
					form: 'number'
				}, {
					name: 'Goblin Coins Gained',
					type: 'sum',
					stat: 9,
					form: 'number'
				}, {
					name: 'Max Goblin Coins Gained',
					type: 'sum',
					stat: 82,
					form: 'number'
				}, {
					name: 'Undead Coins Gained',
					type: 'sum',
					stat: 10,
					form: 'number'
				}, {
					name: 'Max Undead Coins Gained',
					type: 'sum',
					stat: 83,
					form: 'number'
				}, {
					name: 'Demon Coins Gained',
					type: 'sum',
					stat: 11,
					form: 'number'
				}, {
					name: 'Max Demon Coins Gained',
					type: 'sum',
					stat: 84,
					form: 'number'
				}, {
					name: 'Dwarf Coins Gained',
					type: 'sum',
					stat: 41,
					form: 'number'
				}, {
					name: 'Max Dwarf Coins Gained',
					type: 'sum',
					stat: 85,
					form: 'number'
				}, {
					name: 'Drow Coins Gained',
					type: 'sum',
					stat: 42,
					form: 'number'
				}, {
					name: 'Max Drow Coins Gained',
					type: 'sum',
					stat: 86,
					form: 'number'
				}
			]
		}, {
			layout: 'table',
			heading: 'Factions',
			stats: [
				{
					name: 'Time Spent Unaffiliated',
					type: 'sum',
					stat: 62,
					form: 'time'            
				}, {
					name: 'Fairy Affiliations',
					type: 'sum',
					stat: 17,
					form: 'number'
				}, {
					name: 'Fairy Playtime',
					type: 'sum',
					stat: 50,
					form: 'time'
				}, {
					name: 'Fairy Upgrades Bought',
					type: 'sum',
					stat: 66,
					form: 'number'
				}, {
					name: 'Elf Affiliations',
					type: 'sum',
					stat: 18,
					form: 'number'
				}, {
					name: 'Elf Playtime',
					type: 'sum',
					stat: 51,
					form: 'time'
				}, {
					name: 'Elf Upgrades Bought',
					type: 'sum',
					stat: 67,
					form: 'number'
				}, {
					name: 'Angel Affiliations',
					type: 'sum',
					stat: 19,
					form: 'number'
				}, {
					name: 'Angel Playtime',
					type: 'sum',
					stat: 52,
					form: 'time'
				}, {
					name: 'Angel Upgrades Bought',
					type: 'sum',
					stat: 68,
					form: 'number'
				}, {
					name: 'Goblin Affiliations',
					type: 'sum',
					stat: 20,
					form: 'number'
				}, {
					name: 'Goblin Playtime',
					type: 'sum',
					stat: 53,
					form: 'time'
				}, {
					name: 'Goblin Upgrades Bought',
					type: 'sum',
					stat: 69,
					form: 'number'
				}, {
					name: 'Undead Affiliations',
					type: 'sum',
					stat: 21,
					form: 'number'
				}, {
					name: 'Undead Playtime',
					type: 'sum',
					stat: 54,
					form: 'time'
				}, {
					name: 'Undead Upgrades Bought',
					type: 'sum',
					stat: 70,
					form: 'number'
				}, {
					name: 'Demon Affiliations',
					type: 'sum',
					stat: 22,
					form: 'number'
				}, {
					name: 'Demon Playtime',
					type: 'sum',
					stat: 55,
					form: 'time'
				}, {
					name: 'Demon Upgrades Bought',
					type: 'sum',
					stat: 71,
					form: 'number'
				}, {
					name: 'Titan Affiliations',
					type: 'sum',
					stat: 32,
					form: 'number'
				}, {
					name: 'Titan Playtime',
					type: 'sum',
					stat: 56,
					form: 'time'
				}, {
					name: 'Titan Upgrades Bought',
					type: 'sum',
					stat: 72,
					form: 'number'
				}, {
					name: 'Druid Affiliations',
					type: 'sum',
					stat: 33,
					form: 'number'
				}, {
					name: 'Druid Playtime',
					type: 'sum',
					stat: 57,
					form: 'time'
				}, {
					name: 'Druid Upgrades Bought',
					type: 'sum',
					stat: 73,
					form: 'number'
				}, {
					name: 'Faceless Affiliations',
					type: 'sum',
					stat: 34,
					form: 'number'
				}, {
					name: 'Faceless Alliances',
					type: 'plain',
					stat: 'g:facelessAlly',
					form: 'number',
					override: ['&ndash;', '&ndash;', null]
				}, {
					name: 'Faceless Playtime',
					type: 'sum',
					stat: 58,
					form: 'time'
				}, {
					name: 'Faceless Upgrades Bought',
					type: 'sum',
					stat: 74,
					form: 'number'
				}, {
					name: 'Dwarf Affiliations',
					type: 'sum',
					stat: 43,
					form: 'number'
				}, {
					name: 'Dwarf Playtime',
					type: 'sum',
					stat: 59,
					form: 'time'
				}, {
					name: 'Dwarf Upgrades Bought',
					type: 'sum',
					stat: 75,
					form: 'number'
				}, {
					name: 'Drow Affiliations',
					type: 'sum',
					stat: 44,
					form: 'number'
				}, {
					name: 'Drow Playtime',
					type: 'sum',
					stat: 60,
					form: 'time'
				}, {
					name: 'Drow Upgrades Bought',
					type: 'sum',
					stat: 76,
					form: 'number'
				}, {
					name: 'Mercenary Affiliations',
					type: 'sum',
					stat: 49,
					form: 'number'
				}, {
					name: 'Mercenary Playtime',
					type: 'sum',
					stat: 61,
					form: 'time'
				}, {
					name: 'Mercenary Upgrades Bought',
					type: 'sum',
					stat: 77,
					form: 'number'
				}
			]
		}, {
			layout: 'table',
			heading: 'Research',
			stats: [
				{
					name: 'Spellcraft Level',
					type: 'sum',
					stat: 90,
					form: 'number'
				}, {
					name: 'Craftsmanship Level',
					type: 'sum',
					stat: 91,
					form: 'number'
				}, {
					name: 'Divine Level',
					type: 'sum',
					stat: 92,
					form: 'number'
				}, {
					name: 'Economics Level',
					type: 'sum',
					stat: 93,
					form: 'number'
				}, {
					name: 'Alchemy Level',
					type: 'sum',
					stat: 94,
					form: 'number'
				}, {
					name: 'Warfare Level',
					type: 'sum',
					stat: 95,
					form: 'number'
				}
			]
		}, {
			layout: 'table',
			heading: 'Miscellaneous',
			description: '<ul><li>Greedyness is used to award Greed Drive, its current game value is the streak of casts of Goblin\'s Greed, and if there is a streak on abdication, it will be moved to the other two columns like any other stat.</li><li>Strike-y-ness is similar, used to award Perfect Combo and is the streak of Combo Strike casts. However, it is not a normal stat, and is current game only.</li><li>Facelessness is used to award Faceless Overmind, and is the number of consecutive Faceless affiliations (buying the trade treaty), the streak is reset by buying any other trade treaty, and if you have a streak when you reincarnate, the value will be added to your all time stat.</li></ul>',
			stats: [
				{
					name: 'Abdications',
					type: 'sum',
					stat: 28,
					form: 'number',
					override: ['&ndash;', null, null]
				}, {
					name: 'Max Base Assistants',
					type: 'max',
					stat: 96,
					form: 'number'
				}, {
					name: 'Assistant Squishes',
					type: 'sum',
					stat: 23,
					form: 'number'
				}, {
					name: 'Max Upgrades Purchased',
					type: 'max',
					stat: 13,
					form: 'number'        
				}, {
					name: 'Excavations',
					type: 'sum',
					stat: 35,
					form: 'number'        
				}, {
					name: 'Excavation Reports (sorta)',
					type: 'sum',
					stat: 36,
					form: 'number'        
				}, {
					name: 'Greedyness',
					type: 'sum',
					stat: 64,
					form: 'number'        
				}, {
					name: 'Facelessness',
					type: 'sum',
					stat: 38,
					form: 'number',
					override: ['&ndash;', null, null]
				}, {
					name: 'Strike-y-ness',
					type: 'plain',
					stat: 'g:comboStrikeCont',
					form: 'number',
					override: [null, '&ndash;', '&ndash;']
				}, {
					name: 'Trophy Counter (No Longer in Use)',
					type: 'sum',
					stat: 14,
					form: 'number'            
				}
			]
		}, {
			heading: 'Technical',
			levels: [0],
			columns: ['Stat', 'Value'],
			stats: [
				{
					name: 'Lightning Strike Tier',
					type: 'plain',
					stat: 'g:strikeTier',
					form: 'f:tier'        
				}, {
					name: 'LS_is_out_to_get_player',
					form: 'c:true'        
				}, {
					name: 'Grand Balance Tier',
					type: 'plain',
					stat: 'g:empoweredTier',
					form: 'f:tier'        
				}, {
					name: 'Grand Balance Multiplier',
					type: 'plain',
					stat: 'g:empoweredBonus',
					form: 'number'        
				}, {
					name: 'Charged Buildings/Clicks Timer',
					type: 'plain',
					stat: 'g:chargedTimer',
					form: 'f:ticks'        
				}, {
					name: 'Scry Production Bonus',
					type: 'plain',
					stat: 'g:oTimer',
					form: 'time'        
				}, {
					name: 'Scry Mana Bonus',
					type: 'plain',
					stat: 'g:oTimer2',
					form: 'time'        
				}, {
					name: 'Time Since Last Mouse Move',
					type: 'plain',
					stat: 'g:mTimer',
					form: 'f:ticks'        
				}, {
					name: 'Time Since Last Mouse Click',
					type: 'plain',
					stat: 'g:cTimer',
					form: 'f:ticks'        
				}, {
					name: 'Time Since Last Keypress',
					type: 'plain',
					stat: 'g:kcTimer',
					form: 'f:ticks'        
				}, {
					name: 'Angel Bloodline Timer',
					type: 'plain',
					stat: 'g:sTimer',
					form: 'f:ticks'        
				}, {
					name: 'Green Fingers Discount Timer',
					type: 'plain',
					stat: 'g:goblinTimer',
					form: 'time'        
				}, {
					name: 'Hellfire Blast Charge',
					type: 'plain',
					stat: 'g:blastCharge',
					form: 'time'        
				}
			]
		}, {
			heading: 'Settings',
			levels: [0],
			columns: ['Setting', 'Value'],
			stats: [
				{
					name: 'Buy Mode',
					type: 'plain',
					stat: 'g:buyMode',
					form: 'f:buymode'        
				}, {
					name: 'Selected Game Tab',
					type: 'plain',
					stat: 'o:tab',
					form: 'f:currtab'        
				}, {
					name: 'Notation',
					type: 'plain',
					stat: 'd:notation',
					form: 'f:notation'        
				}, {
					name: 'Sort Unpurchased Upgrades',
					type: 'plain',
					stat: 'o:sortLocked',
					form: 'f:setting'        
				}, {
					name: 'Sort Purchased Upgrades',
					type: 'plain',
					stat: 'o:sortUnlocked',
					form: 'f:setting'        
				}, {
					name: 'Multibuy Upgrade Series',
					type: 'plain',
					stat: 'o:multiUpgrade',
					form: 'f:setting'        
				}, {
					name: 'Don\'t Consolidate Upgrades',
					type: 'plain',
					stat: 'o:conUpgrade',
					form: 'f:setting'        
				}, {
					name: 'Don\'t Consolidate Trophies',
					type: 'plain',
					stat: 'o:conTrophy',
					form: 'f:setting'        
				}, {
					name: 'Disable Premium Features',
					type: 'plain',
					stat: 'o:disableKred',
					form: 'f:setting'        
				}, {
					name: 'Excavation Warning',
					type: 'plain',
					stat: 'o:warnExcavation',
					form: 'f:setting'        
				}, {
					name: 'Exchange Warning',
					type: 'plain',
					stat: 'o:warnExchange',
					form: 'f:setting'        
				}, {
					name: 'Disable Multibuy Button',
					type: 'plain',
					stat: 'o:buyButton',
					form: 'f:setting'        
				}, {
					name: 'Disable Cloud Warning',
					type: 'plain',
					stat: 'o:skipCloud',
					form: 'f:setting'        
				}, {
					name: 'Hide Upgrades Separator',
					type: 'plain',
					stat: 'o:hideUpgHeader',
					form: 'f:setting'        
				}, {
					name: 'Block Treasure Clicks',
					type: 'plain',
					stat: 'o:blockClick',
					form: 'f:setting'        
				}, {
					name: 'Disable Spell Timer',
					type: 'plain',
					stat: 'o:spellTimer',
					form: 'f:setting'        
				}, {
					name: 'Disable Spell Icon',
					type: 'plain',
					stat: 'o:spellIcon',
					form: 'f:setting'        
				}, {
					name: 'Disable Floating Text',
					type: 'plain',
					stat: 'o:floatingText',
					form: 'f:setting'        
				}, {
					name: 'Disable Building Glow',
					type: 'plain',
					stat: 'o:buildingGlow',
					form: 'f:setting'        
				}, {
					name: 'Disable Mana Bar Glow',
					type: 'plain',
					stat: 'o:manaGlow',
					form: 'f:setting'        
				}, {
					name: 'Disable Treasure Glow',
					type: 'plain',
					stat: 'o:treasureGlow',
					form: 'f:setting'        
				}, {
					name: 'Disable Assistant Icon',
					type: 'plain',
					stat: 'o:assistant',
					form: 'f:setting'        
				}, {
					name: 'Disable Thousands Separator',
					type: 'plain',
					stat: 'o:thousandsSep',
					form: 'f:setting'        
				}, {
					name: 'Disable Trophy Popups',
					type: 'plain',
					stat: 'o:toast',
					form: 'f:setting'        
				}, {
					name: 'Hide Purchased Upgrades',
					type: 'plain',
					stat: 'o:hideUnlocked',
					form: 'f:setting'        
				}
			]
		}, {
			heading: 'Experimental',
			description: 'All stats in this table are non-functional and all parts should be 0.',
			stats: [
				{
					name: 'Pay Upkeep Casts (Unused)',
					type: 'plain',
					stat: 65,
					form: 'plain'            
				}, {
					name: 'Max Playtime (Broken)',
					type: 'plain',
					stat: 39,
					form: 'plain'            
				}, {
					name: 'Max Spells Cast (Broken)',
					type: 'plain',
					stat: 40,
					form: 'plain'            
				}, {
					name: 'Max Treasure Clicks (Broken)',
					type: 'plain',
					stat: 87,
					form: 'plain'            
				}, {
					name: 'Max Assistant Squishes (Broken)',
					type: 'plain',
					stat: 88,
					form: 'plain'            
				}, {
					name: 'Max Automatic Clicks (Broken)',
					type: 'plain',
					stat: 89,
					form: 'plain'            
				}
			]
		}
	];
