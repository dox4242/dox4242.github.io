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
    showUpgrades: 'False'
  },
  watch: {
    datainput: function(data){
      this.version = ''
      try {
        this.save = SaveHandler.Decode(this.datainput)
        console.log('Decoded save:', this.save)
        this.editdata = 'Decoded. No edits made'
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
      } else {
        this.showBuildings = 'True'
      }
    },
    toggleUpgrades: function () {
      if (this.showUpgrades == 'True') {
        this.showUpgrades = 'False'
      } else {
        this.showUpgrades = 'True'
      }
    }
  }
})
