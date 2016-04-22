var myViewModel = new Vue({
  el: '#app',
  data: {
    datainput: '',
    save: {},
    save2: {},
    editdata: 'empty',
    artifactRngState: '',
    alignment: '',
    faction: '',
    prestigeFaction: '',
    bFaction: '',
    excavations: '',
    gems: '',
    coins: '',
    rubies: '',
    rubymsg: '',
    reincarnation: '',
    ascension: '',
    lastsave: '',
    sTimer: '',
    mana: '',
    contingency: '',
    contingencyValue: '',
    strikeTier: '',
    miracleTier: '',
    miracleTimer: '',
    chargedTimer: '',
    comboStrikeCont: '',
    goblinTimer: '',
    wealthStorm: '',
    mercSpell1: '',
    mercSpell2: '',
    cTimer: '',
    kcTimer: '',
    mTimer: '',
    oTimer: '',
    oTimer2: '',
    oTimer3: '',
    season: '',
    snowballScryUses: '',
    snowballSize: '',
    lastGiftDate: '',
    eggRngState: '',
    eggStackSize: '',
    ctaFactionCats: '',
    showStatsAb: 'False',
    showStatsReinc: 'False',
    showStatsAll: 'False',
    showBuildings: 'False',
    showGoodBuildings: 'False',
    showEvilBuildings: 'False',
    showNeutralBuildings: 'False',
    showHallsBuilding: 'False',
    showFarms: 'False',  // for displaying subfields
    showInns: 'False',
    showBlacksmiths: 'False',
    showWarriors: 'False',
    showKnights: 'False',
    showWizards: 'False',
    showCathedral: 'False',
    showCitadels: 'False',
    showCastles: 'False',
    showGates: 'False',
    showSlaves: 'False',
    showOrcs: 'False',
    showWitches: 'False',
    showTemples: 'False',
    showNecros: 'False',
    showForts: 'False',
    showPortals: 'False',
    showMines: 'False',
    showPillars: 'False',
    showLabs: 'False',
    showMonas: 'False',
    showLabys: 'False',
    showIrons: 'False',
    showPyramids: 'False',
    showHalls: 'False',
    showUpgrades: 'False',
    showTrophies: 'False',
    showSpells: 'False',
    showFCs: 'False',
    showEventRes: 'False',
  },
  watch: {
    datainput: function(data) {
      this.version = ''
      try {
        this.save = SaveHandler.Decode(data)
        this.save2 = SaveHandler.Decode(data)
        console.log('Decoded save:', this.save2)
        this.editdata = 'Decoded. No edits made'
        this.alignment = this.save.alignment
      } catch(err) {
          this.editdata = 'Invalid data'
          console.log(err)
      }
    },
    alignment: function(data) {
      if (data == 'None') { this.save2.alignment = 0 }
      if (data == 'Good') { this.save2.alignment = 1 }
      if (data == 'Evil') { this.save2.alignment = 2 }
      if (data == 'Neutral') { this.save2.alignment = 3 }
    }
  },
  methods: {
    encodeData: function () {
      this.editdata = SaveHandler.Encode(this.save2)
    },
    toggleStatsAb: function () {
      if (this.showStatsAb == 'True') {
        this.showStatsAb = 'False'
      } else {
        this.showStatsAb = 'True'
      }
    },
    toggleStatsReinc: function () {
      if (this.showStatsReinc == 'True') {
        this.showStatsReinc = 'False'
      } else {
        this.showStatsReinc = 'True'
      }
    },
    toggleStatsAll: function () {
      if (this.showStatsAll == 'True') {
        this.showStatsAll = 'False'
      } else {
        this.showStatsAll = 'True'
      }
    },
    toggleBuildings: function () {
      if (this.showBuildings == 'True') {
        this.showBuildings = 'False'
        if (this.save.alignment == 1) {
          this.showGoodBuildings = 'False'
          this.showHallsBuilding = 'False'
        }
        if (this.save.alignment == 2) {
          this.showEvilBuildings = 'False'
          this.showHallsBuilding = 'False'
       }
        if (this.save.alignment == 3) {
          this.showNeutralBuildings = 'False'
          this.showHallsBuilding = 'False'
        }
      } else {
        this.showBuildings = 'True'
        if (this.save.alignment == 1) {
          this.showGoodBuildings = 'True'
          this.showHallsBuilding = 'True'
        }
        if (this.save.alignment == 2) {
          this.showEvilBuildings = 'True'
          this.showHallsBuilding = 'True'
        }
        if (this.save.alignment == 3) {
          this.showNeutralBuildings = 'True'
          this.showHallsBuilding = 'True'
        }
      }
    },
    toggleUpgrades: function () {
      if (this.showUpgrades == 'True') {
        this.showUpgrades = 'False'
      } else {
        this.showUpgrades = 'True'
      }
    },
    toggleTrophies: function () {
      if (this.showTrophies == 'True') {
        this.showTrophies = 'False'
      } else {
        this.showTrophies = 'True'
      }
    },
    toggleSpells: function () {
      if (this.showSpells == 'True') {
        this.showSpells = 'False'
      } else {
        this.showSpells = 'True'
      }
    },
    toggleFCs: function () {
      if (this.showFCs == 'True') {
        this.showFCs = 'False'
      } else {
        this.showFCs = 'True'
      }
    },
    toggleEventRes: function () {
      if (this.showEventRes == 'True') {
        this.showEventRes = 'False'
      } else {
        this.showEventRes = 'True'
      }
    },
    toggleFarms: function () {
      if (this.showFarms == 'True') {
        this.showFarms = 'False'
      } else {
        this.showFarms = 'True'
      }
    },
    toggleInns: function () {
      if (this.showInns == 'True') {
        this.showInns = 'False'
      } else {
        this.showInns = 'True'
      }
    },
    toggleBlacksmiths: function () {
      if (this.showBlacksmiths == 'True') {
        this.showBlacksmiths = 'False'
      } else {
        this.showBlacksmiths = 'True'
      }
    },
    toggleWarriors: function () {
      if (this.showWarriors == 'True') {
        this.showWarriors = 'False'
      } else {
        this.showWarriors = 'True'
      }
    },
    toggleKnights: function () {
      if (this.showKnights == 'True') {
        this.showKnights = 'False'
      } else {
        this.showKnights = 'True'
      }
    },
    toggleWizards: function () {
      if (this.showWizards == 'True') {
        this.showWizards = 'False'
      } else {
        this.showWizards = 'True'
      }
    },
    toggleCathedrals: function () {
      if (this.showCathedrals == 'True') {
        this.showCathedrals = 'False'
      } else {
        this.showCathedrals = 'True'
      }
    },
    toggleCitadels: function () {
      if (this.showCitadels == 'True') {
        this.showCitadels = 'False'
      } else {
        this.showCitadels = 'True'
      }
    },
    toggleCastles: function () {
      if (this.showCastles == 'True') {
        this.showCastles = 'False'
      } else {
        this.showCastles = 'True'
      }
    },
    toggleGates: function () {
      if (this.showGates == 'True') {
        this.showGates = 'False'
      } else {
        this.showGates = 'True'
      }
    },
    toggleSlaves: function () {
      if (this.showSlaves == 'True') {
        this.showSlaves = 'False'
      } else {
        this.showSlaves = 'True'
      }
    },
    toggleOrcs: function () {
      if (this.showOrcs == 'True') {
        this.showOrcs = 'False'
      } else {
        this.showOrcs = 'True'
      }
    },
    toggleWitches: function () {
      if (this.showWitches == 'True') {
        this.showWitches = 'False'
      } else {
        this.showWitches = 'True'
      }
    },
    toggleTemples: function () {
      if (this.showTemples == 'True') {
        this.showTemples = 'False'
      } else {
        this.showTemples = 'True'
      }
    },
    toggleNecros: function () {
      if (this.showNecros == 'True') {
        this.showNecros = 'False'
      } else {
        this.showNecros = 'True'
      }
    },
    toggleForts: function () {
      if (this.showForts == 'True') {
        this.showForts = 'False'
      } else {
        this.showForts = 'True'
      }
    },
    togglePortals: function () {
      if (this.showPortals == 'True') {
        this.showPortals = 'False'
      } else {
        this.showPortals = 'True'
      }
    },
    toggleMines: function () {
      if (this.showMines == 'True') {
        this.showMines = 'False'
      } else {
        this.showMines = 'True'
      }
    },
    togglePillars: function () {
      if (this.showPillars == 'True') {
        this.showPillars = 'False'
      } else {
        this.showPillars = 'True'
      }
    },
    toggleLabs: function () {
      if (this.showLabs == 'True') {
        this.showLabs = 'False'
      } else {
        this.showLabs = 'True'
      }
    },
    toggleMonas: function () {
      if (this.showMonas == 'True') {
        this.showMonas = 'False'
      } else {
        this.showMonas = 'True'
      }
    },
    toggleLabys: function () {
      if (this.showLabys == 'True') {
        this.showLabys = 'False'
      } else {
        this.showLabys = 'True'
      }
    },
    toggleIrons: function () {
      if (this.showIrons == 'True') {
        this.showIrons = 'False'
      } else {
        this.showIrons = 'True'
      }
    },
    togglePyramids: function () {
      if (this.showPyramids == 'True') {
        this.showPyramids = 'False'
      } else {
        this.showPyramids = 'True'
      }
    },
    toggleHalls: function () {
      if (this.showHalls == 'True') {
        this.showHalls = 'False'
      } else {
        this.showHalls = 'True'
      }
    },
    addRubies: function(data) {
      if (isNaN(this.rubies)) {
        this.rubymsg = ' Invalid input'
      } else {
         this.save2.rubies += this.rubies
         this.save2.stats[102].stats += parseInt(this.rubies)
         this.rubymsg = ' Added ' + this.rubies + ' rubies'
      }
    }
  }
})
