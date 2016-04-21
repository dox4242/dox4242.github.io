var myViewModel = new Vue({
  el: '#app',
  data: {
    datainput: '',
    save: {},
    editdata: 'empty',
    showStatsAb: 'False',
    showStatsReinc: 'False',
    showStatsAll: 'False',
    showBuildings: 'False',
    showGoodBuildings: 'False',
    showEvilBuildings: 'False',
    showNeutralBuildings: 'False',
    showHallsBuilding: 'False',
    showUpgrades: 'False',
    showTrophies: 'False',
    showSpells: 'False',
    showFCs: 'False',
    showEventRes: 'False',
    alignment: ''
  },
  watch: {
    datainput: function(data){
      this.version = ''
      try {
        this.save = SaveHandler.Decode(this.datainput)
        save2 = SaveHandler.Decode(this.datainput)
        console.log('Decoded save:', save2)
        this.editdata = 'Decoded. No edits made'
        this.alignment = this.save.alignment
      } catch(err) {
          this.editdata = 'Invalid data'
          console.log(err)
      }
    }
  },
  methods: {
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
        console.log('hide buildings')
        if (this.save.alignment == 1) {
          this.showGoodBuildings = 'False'
          this.showHallsBuilding = 'False'
          console.log('hide good buildings')
        }
        if (this.save.alignment == 2) {
          this.showEvilBuildings = 'False'
          this.showHallsBuilding = 'False'
          console.log('hide evil buildings')
       }
        if (this.save.alignment == 3) {
          this.showNeutralBuildings = 'False'
          this.showHallsBuilding = 'False'
          console.log('hide neutral buildings')
        }
      } else {
        this.showBuildings = 'True'
        console.log('show buildings')
        if (this.save.alignment == 1) {
          this.showGoodBuildings = 'True'
          this.showHallsBuilding = 'True'
          console.log('show good buildings')
        }
        if (this.save.alignment == 2) {
          this.showEvilBuildings = 'True'
          this.showHallsBuilding = 'True'
          console.log('show evil buildings')
        }
        if (this.save.alignment == 3) {
          this.showNeutralBuildings = 'True'
          this.showHallsBuilding = 'True'
          console.log('show neutral buildings')
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
    }
  }
})
