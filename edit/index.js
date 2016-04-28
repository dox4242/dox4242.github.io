var myViewModel = new Vue({
  el: '#app',
  data: {
    olddata: '',
    oldsave: {},
    newsave: {},
    newdata: 'empty',

    alignmentinput: '',
    alignmentmsg: '',
    angellineinput: '',
    angellineUpgradeBought: 'False',
    artRNGmsg: '',
    ascensioninput: '',
    bloodlineinput: '',
    bloodlineIDs: [194, 196, 39, 212, 396, 103, 380, 136, 183, 150, 120],
    bloodlinemsg: '',
    lsinput: '',
    lsmsg: '',
    LightningRod: [[[9, 9, 8, 8, 10, 8, 10, 8, 8, 9, 9], [1348656067, 2066742637, 724761641, 1139776337, 1832831073, 2874410, 314652574, 29728603, 57855160, 80741010, 798827580]],
                  [[9, 8, 10, 10, 9, 9, 10, 10, 8, 9], [1348656067, 195509834, 1092747531, 1369388690, 124895406, 1889967370, 778094957, 1054736116, 145769791, 798827580]],
                  [[10, 9, 9, 10, 9, 10, 9, 9, 10], [1019766806, 1010581720, 293919951, 1832831073, 274387307, 314652574, 233911564, 571758769, 1127716841]],
                  [[10, 10, 9, 10, 10, 9, 10, 10], [1019766806, 72980725, 44627026, 1267687915, 314652574, 142176518, 965174051, 1127716841]],
                  [[10, 10, 10, 10, 10, 10, 10], [454623648, 54592755, 260059819, 404214639, 462244724, 255012428, 442091522]],
                  [[12, 12, 12, 12, 12, 12], [770473881, 821234634, 250490584, 1896993063, 643171274, 89562065]],
                  [[14, 13, 12, 13, 14], [770473881, 419517449, 527131743, 819876890, 1377009766]],
                  [[15, 15, 15, 15], [1408849714, 355243782, 951868488, 738633933]],
                  [[18, 17, 18], [918066031, 129106684, 1050527706]],
                  [[28, 28], [1202476373, 447787816]]],
    buildingcount: 0,
    buildingnames: ['Alchemist Lab', 'Ancient Pyramid', 'Blacksmith', 'Cathedral', 'Citadel', 'Dark Temple', 'Deep Mine', 'Evil Fortress', 'Farm', 'Hall of Legends', 'Heaven\'s Gate', 'Hell Portal', 'Inn', 'Iron Stronghold', 'Knights Joust', 'Labyrinth', 'Monastery', 'Necropolis', 'Orcish Arena', 'Royal Castle', 'Slave Pen', 'Stone Pillars', 'Warrior Barracks', 'Witch Conclave', 'Wizard Tower'],
    currentbuildings: [],
    LSavail: 'False',
    reincinput: '',
    rubiesinput: '',
    scrymsg: ''
  },
  watch: {
    olddata: function(data) {
      try {
        this.alignmentmsg = ''    // erase possible prior output messages
        this.angellineinput = ''
        this.artRNGmsg = ''
        this.ascensioninput = ''
        this.bloodlinemsg = ''
        this.lsmsg = ''
        this.buildingcount = 0
        this.currentbuildings = []
        this.reincinput = ''
        this.rubiesinput = ''
        this.scrymsg = ''

        this.oldsave = SaveHandler.Decode(data)  // decode stuff
        this.newsave = SaveHandler.Decode(data)
        console.log('Decoded save:', SaveHandler.Decode(data))
        this.newdata = 'Decoded v' + this.oldsave.saveVersion

        this.checkAngellineUpgrade()     // check state and setup page fields
        this.checkLSavail()
      } catch(err) {
          this.newdata = 'Invalid data'
          console.log(err)
      }
    },
    alignmentinput: function(data) {
      if (this.alignmentinput == 'None') {
        this.newsave.alignment = 0
        this.newdata = SaveHandler.Encode(this.newsave)
        this.alignmentmsg = 'Saved'
      }
      if (this.alignmentinput == 'Good') {
        this.newsave.alignment = 1
        this.newdata = SaveHandler.Encode(this.newsave)
        this.alignmentmsg = 'Saved'
      }
      if (this.alignmentinput == 'Evil') {
        this.newsave.alignment = 2
        this.newdata = SaveHandler.Encode(this.newsave)
        this.alignmentmsg = 'Saved'
      }
      if (this.alignmentinput == 'Neutral') {
        this.newsave.alignment = 3
        this.newdata = SaveHandler.Encode(this.newsave)
        this.alignmentmsg = 'Saved'
      }
    },
    bloodlineinput: function(data) {
      if (this.bloodlineinput == 'None') {
        this.newsave.bFaction = 255
        for (var i = 0; i < this.oldsave.upgrades.length; i++) {
          if (this.oldsave.upgrades[i].id == 13) {
            this.newsave.upgrades[i].u1 = 'False'
          }
          if (this.oldsave.upgrades[i].id == 327) {
            this.newsave.upgrades[i].u1 = 'False'
          }
          for (var j = 0; j < this.bloodlineIDs.length; j++) {
            if (this.oldsave.upgrades[i].id == this.bloodlineIDs[j]) {
              if (this.oldsave.upgrades[i].u1 == true) {
                this.newsave.upgrades[i].u1 = false
              }
            }
          }
        }
        this.newdata = SaveHandler.Encode(this.newsave)
        this.bloodlinemsg = 'Saved'
        return
      } else { 
        for (var i = 0; i < this.oldsave.upgrades.length; i++) {
          for (var j = 0; j < this.bloodlineIDs.length; j++) {
            if (this.oldsave.upgrades[i].id == this.bloodlineIDs[j]) {
              if (this.bloodlineinput == 'Fairy') { this.newsave.upgrades[i].id = 194 }
              if (this.bloodlineinput == 'Elf') { this.newsave.upgrades[i].id = 164 }
              if (this.bloodlineinput == 'Angel') {
                this.newsave.upgrades[i].id = 39
                this.angellineUpgradeBought = 'True'
              }
              if (this.bloodlineinput == 'Goblin') { this.newsave.upgrades[i].id = 212 }
              if (this.bloodlineinput == 'Undead') { this.newsave.upgrades[i].id = 396 }
              if (this.bloodlineinput == 'Demon') { this.newsave.upgrades[i].id = 103 }
              if (this.bloodlineinput == 'Titan') { this.newsave.upgrades[i].id = 380 }
              if (this.bloodlineinput == 'Druid') { this.newsave.upgrades[i].id = 136 }
              if (this.bloodlineinput == 'Faceless') { this.newsave.upgrades[i].id = 183 }
              if (this.bloodlineinput == 'Dwarf') { this.newsave.upgrades[i].id = 150 }
              if (this.bloodlineinput == 'Drow') { this.newsave.upgrades[i].id = 120 }
            }
          }
        }
        this.newdata = SaveHandler.Encode(this.newsave)
        this.bloodlinemsg = 'Saved'
        return
      }
    },
    lsinput: function(data) {
      selIndex = this.currentbuildings.findIndex(x => x == this.lsinput)
      rodIndex = 11 - this.buildingcount
      hits = this.LightningRod[rodIndex][0][selIndex]
      this.newsave.spells[11].s = this.LightningRod[rodIndex][1][selIndex]
      this.newdata = SaveHandler.Encode(this.newsave)
      this.lsmsg = 'Hit streak = ' + hits
    }
  },
  methods: {
    checkAngellineUpgrade: function () {
      this.angellineUpgradeBought = 'False'
      for (var i = 0; i < this.oldsave.upgrades.length; i++) {
        if (this.oldsave.upgrades[i].id == 39) {
          if (this.oldsave.upgrades[i].u1 == true) {
            this.angellineUpgradeBought = 'True'
          }
        }
      }
    },
    checkLSavail: function () {
      if (this.oldsave.faction != 6) {
        if (this.oldsave.faction == 11) {
          if (this.oldsave.mercSpell1 == 13 || this.oldsave.mercSpell2 == 13) {
            this.LSavail = 'True'
          }
        }
      } else { this.LSavail = 'True' }
      this.buildingcount = 0
      for (var i = 0; i < this.oldsave.buildings.length; i++) {
        if (this.oldsave.buildings[i].q > 0) {
          this.currentbuildings.push(this.buildingnames[this.oldsave.buildings[i].id-1])
          this.buildingcount += 1
        }
      }
      if (this.buildingcount < 2) { this.LSavail = 'False' }
    },
    saveAngelline: function () {
      if (this.angellineinput == '') { return }
      try {
        if (isNaN(this.angellineinput)) {
          amount = this.angellineinput
          newamount = ''
          days = 0
          hours = 0
          mins = 0
          secs = 0
          if ((amount.indexOf('d') + amount.indexOf('h') + amount.indexOf('m') + amount.indexOf('s')) == -4) {
            this.angellineinput = 'Invalid input'
            return
          }
          dIndex = amount.indexOf('d')
          if (dIndex >= 0) {
            days = parseInt(amount.slice(0,dIndex))
            amount = amount.slice(dIndex+1)
            if (isNaN(days)) {
              this.angellineinput = 'Invalid input'
              return
            }
          }
          hIndex = amount.indexOf('h')
          if (hIndex >= 0) {
            hours = parseInt(amount.slice(0,hIndex))
            amount = amount.slice(hIndex+1)
            if (isNaN(hours)) {
              this.angellineinput = 'Invalid input'
              return
            }
          }
          mIndex = amount.indexOf('m')
          if (mIndex >= 0) {
            mins = parseInt(amount.slice(0,mIndex))
            amount = amount.slice(mIndex+1)
            if (isNaN(mins)) {
              this.angellineinput = 'Invalid input'
              return
            }
          }
          sIndex = amount.indexOf('s')
          if (sIndex >= 0) {
            secs = parseInt(amount.slice(0,sIndex))
            amount = amount.slice(sIndex+1)
            if (isNaN(secs)) {
              this.angellineinput = 'Invalid input'
              return
            }
          }
          this.newsave.sTimer = (secs + (mins*60) + (hours*60*60) + (days*60*60*24)) * 30
          this.newdata = SaveHandler.Encode(this.newsave)
          this.angellineinput = this.newsave.sTimer/30 + ' seconds on Angelline'
        } else {
          this.newsave.sTimer = parseInt(this.angellineinput)*30
          this.newdata = SaveHandler.Encode(this.newsave)
          this.angellineinput = this.newsave.sTimer/30 + ' seconds on Angelline'
        }
      } catch(err) {
        this.angellineinput = 'Invalid input'
        console.log(err)
      }
    },
    artRNGbest: function() {
      this.newsave.artifactRngState = 1407677000
      this.newdata = SaveHandler.Encode(this.newsave)
      this.artRNGmsg = 'RNG saved'
    },
    saveAscension: function() {
      if (this.ascensioninput == '') { return }
      if (isNaN(this.ascensioninput)) {
        this.ascensioninput = 'Invalid input'
      } else {
        this.newsave.ascension = parseInt(this.ascensioninput)
        this.newdata = SaveHandler.Encode(this.newsave)
        this.ascensioninput = 'Saved '+ this.newsave.ascension + ' ascensions'
      }
    },
    saveReinc: function() {
      if (this.reincinput == '') { return }
      if (isNaN(this.reincinput)) {
        this.reincinput = 'Invalid input'
      } else {
        this.newsave.reincarnation = parseInt(this.reincinput)
        this.newdata = SaveHandler.Encode(this.newsave)
        this.reincinput = 'Saved '+ this.newsave.reincarnation + ' reincarnations'
      }
    },
    saveRubies: function() {
      if (this.rubiesinput == '') { return }
      if (isNaN(this.rubiesinput)) {
        this.rubiesinput = 'Invalid input'
      } else {
        this.newsave.rubies += parseInt(this.rubiesinput)
        this.newsave.stats[102].stats += parseInt(this.rubiesinput)
        this.newdata = SaveHandler.Encode(this.newsave)
        this.rubiesinput = 'Added ' + parseInt(this.rubiesinput) + ' rubies'
      }
    },
    maxScry: function() {
      this.newsave.oTimer = 14400
      this.newsave.oTimer2 = 600
      if (this.oldsave.season > 0) {
        this.newsave.oTimer3 = 14400
      }
      this.newdata = SaveHandler.Encode(this.newsave)
      this.scrymsg = 'Timers maxed'
    }
  }
})
