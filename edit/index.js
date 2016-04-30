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
    bloodstreaminput: '',
    bloodstreammsg: '',
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
    currentbuildingsLS: [],
    currentbuildingsM: [],
    LSavail: 'False',
    miracleinput: '',
    miraclemsg: '',
    miracleAvail: 'False',
    offlineinput: '',
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
        this.bloodlineinput = ''
        this.bloodlinemsg = ''
        this.bloodstreaminput = ''
        this.bloodstreammsg = ''
        this.lsmsg = ''
        this.miraclemsg = ''
        this.buildingcount = 0
        this.currentbuildingsLS = []
        this.currentbuildingsM = []
        this.offlineinput = ''
        this.reincinput = ''
        this.rubiesinput = ''
        this.scrymsg = ''

        this.oldsave = SaveHandler.Decode(data)  // decode stuff
        this.newsave = SaveHandler.Decode(data)
        console.log('Decoded save:', SaveHandler.Decode(data))
        this.newdata = 'Save v' + this.oldsave.saveVersion + ' decoded'

        this.checkAngellineUpgrade()     // check state and setup page fields
        this.checkLSavail()
        this.checkMiracleAvail()
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
        if (this.oldsave.upgrades[13] != null) { delete this.newsave.upgrades[13] }
        if (this.oldsave.upgrades[327] != null) { delete this.newsave.upgrades[327] }
        for (var i = 0; i < this.bloodlineIDs.length; i++) {
          if (this.oldsave.upgrades[this.bloodlineIDs[i]] != null) {
            delete this.newsave.upgrades[this.bloodlineIDs[i]]
          }
        }
      } else { 
        for (var i = 0; i < this.bloodlineIDs.length; i++) {
          if (this.oldsave.upgrades[this.bloodlineIDs[i]] != null) {
            delete this.newsave.upgrades[this.bloodlineIDs[i]]
            if (this.bloodlineinput == 'Fairy') { this.newsave.upgrades[194].id = 194 }
            if (this.bloodlineinput == 'Elf') { this.newsave.upgrades[164].id = 164 }
            if (this.bloodlineinput == 'Angel') {
              this.newsave.upgrades[39].id = 39
              this.angellineUpgradeBought = 'True'
            }
            if (this.bloodlineinput == 'Goblin') { this.newsave.upgrades[212].id = 212 }
            if (this.bloodlineinput == 'Undead') { this.newsave.upgrades[396].id = 396 }
            if (this.bloodlineinput == 'Demon') { this.newsave.upgrades[103].id = 103 }
            if (this.bloodlineinput == 'Titan') { this.newsave.upgrades[380].id = 380 }
            if (this.bloodlineinput == 'Druid') { this.newsave.upgrades[136].id = 136 }
            if (this.bloodlineinput == 'Faceless') { this.newsave.upgrades[183].id = 183 }
            if (this.bloodlineinput == 'Dwarf') { this.newsave.upgrades[150].id = 150 }
            if (this.bloodlineinput == 'Drow') { this.newsave.upgrades[120].id = 120 }
          }
        }
      }
      this.newdata = SaveHandler.Encode(this.newsave)
      this.bloodlinemsg = 'Saved'
    },
    bloodstreaminput: function(data) {
      if (this.bloodstreaminput == 'None') {
        this.newsave.bFaction = 255
        delete this.newsave.upgrades[327]
      } else {
        if (this.oldsave.upgrades[327] == null) { this.newsave.upgrades[327].id = 327 }
      }
      if (this.bloodstreaminput == 'Fairy') { this.newsave.bFaction = 0 }
      if (this.bloodstreaminput == 'Elf') { this.newsave.bFaction = 1 }
      if (this.bloodstreaminput == 'Angel') { this.newsave.bFaction = 2 }
      if (this.bloodstreaminput == 'Goblin') { this.newsave.bFaction = 3 }
      if (this.bloodstreaminput == 'Undead') { this.newsave.bFaction = 4 }
      if (this.bloodstreaminput == 'Demon') { this.newsave.bFaction = 5 }
      if (this.bloodstreaminput == 'Titan') { this.newsave.bFaction = 6 }
      if (this.bloodstreaminput == 'Druid') { this.newsave.bFaction = 7 }
      if (this.bloodstreaminput == 'Faceless') { this.newsave.bFaction = 8 }
      if (this.bloodstreaminput == 'Dwarf') { this.newsave.bFaction = 9 }
      if (this.bloodstreaminput == 'Drow') { this.newsave.bFaction = 10 }
      this.newdata = SaveHandler.Encode(this.newsave)
      this.bloodstreammsg = 'Saved'
    },
    lsinput: function(data) {
      selIndex = this.currentbuildingsLS.findIndex(x => x == this.lsinput)
      rodIndex = 11 - this.buildingcount
      hits = this.LightningRod[rodIndex][0][selIndex]
      this.newsave.spells[11].s = this.LightningRod[rodIndex][1][selIndex]
      this.newdata = SaveHandler.Encode(this.newsave)
      this.lsmsg = 'Hit streak = ' + hits
    },
    miracleinput: function(data) {
      selIndex = this.currentbuildingsM.findIndex(x => x == this.miracleinput)
      rodIndex = 11 - this.buildingcount
      hits = this.LightningRod[rodIndex][0][selIndex]
      this.newsave.upgrades[143719].s = this.LightningRod[rodIndex][1][selIndex]
      this.newdata = SaveHandler.Encode(this.newsave)
      this.miraclemsg = 'Hit streak = ' + hits
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
      for (var i = 0; i < this.oldsave.buildings.length; i++) {
        if (this.oldsave.buildings[i].q > 0) {
          this.currentbuildingsLS.push(this.buildingnames[this.oldsave.buildings[i].id-1])
          this.buildingcount += 1
        }
      }
      if (this.buildingcount < 2) { this.LSavail = 'False' }
    },
    checkMiracleAvail: function () {
      if (this.oldsave.upgrades[143719] != null) {
        if (this.oldsave.upgrades[143719].u1 == true) {
            this.miracleAvail = 'True'
        } else {
          this.miracleAvail = 'False'
        }
      }
      this.buildingcount = 0
      for (var i = 0; i < this.oldsave.buildings.length; i++) {
        if (this.oldsave.buildings[i].q > 0) {
          this.currentbuildingsM.push(this.buildingnames[this.oldsave.buildings[i].id-1])
          this.buildingcount += 1
        }
      }
      if (this.buildingcount < 2) { this.miracleAvail = 'False' }
    },
    saveAngelline: function () {
      if (this.angellineinput.trim() == '') { return }
      try {
        if (isNaN(this.angellineinput)) {
          amount = this.readDHMS(this.angellineinput)
          if (isNaN(amount)) {
            this.angellineinput = 'Invalid input'
            return
          } else {
            this.newsave.sTimer = amount*30
          }
        } else {
          this.newsave.sTimer = parseInt(this.angellineinput)*30
        }
        this.newdata = SaveHandler.Encode(this.newsave)
        this.angellineinput = this.newsave.sTimer/30 + ' seconds on Angelline'
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
      if (this.ascensioninput.trim() == '') { return }
      if (isNaN(this.ascensioninput)) {
        this.ascensioninput = 'Invalid input'
      } else {
        this.newsave.ascension = parseInt(this.ascensioninput)
        this.newdata = SaveHandler.Encode(this.newsave)
        this.ascensioninput = 'Saved '+ this.newsave.ascension + ' ascensions'
      }
    },
    saveOffline: function() {
      if (this.offlineinput.trim() == '') { return }
      try {
        if (isNaN(this.offlineinput)) {
          amount = this.readDHMS(this.offlineinput)
          if (isNaN(amount)) {
            this.offlineinput= 'Invalid input'
            return
          } else {
            this.newsave.lastsave -= amount
          }
        } else {
          this.newsave.sTimer = parseInt(this.offlineinput)
        }
        this.newdata = SaveHandler.Encode(this.newsave)
        this.offlineinput = 'Added ' + amount + ' seconds offline'
      } catch(err) {
        this.offlineinput = 'Invalid input'
        console.log(err)
      }
    },
    saveReinc: function() {
      if (this.reincinput.trim() == '') { return }
      if (isNaN(this.reincinput)) {
        this.reincinput = 'Invalid input'
      } else {
        this.newsave.reincarnation = parseInt(this.reincinput)
        this.newdata = SaveHandler.Encode(this.newsave)
        this.reincinput = 'Saved '+ this.newsave.reincarnation + ' reincarnations'
      }
    },
    saveRubies: function() {
      if (this.rubiesinput.trim() == '') { return }
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
    },
    readDHMS: function(amount) {
      days = 0
      hours = 0
      mins = 0
      secs = 0
      if ((amount.indexOf('d') + amount.indexOf('h') + amount.indexOf('m') + amount.indexOf('s')) == -4) {
        return 'Invalid input'
      }
      dIndex = amount.indexOf('d')
      if (dIndex >= 0) {
        days = parseInt(amount.slice(0,dIndex))
        amount = amount.slice(dIndex+1)
        if (isNaN(days)) {
          return 'Invalid input'
        }
      }
      hIndex = amount.indexOf('h')
      if (hIndex >= 0) {
        hours = parseInt(amount.slice(0,hIndex))
        amount = amount.slice(hIndex+1)
        if (isNaN(hours)) {
          return 'Invalid input'
        }
      }
      mIndex = amount.indexOf('m')
      if (mIndex >= 0) {
        mins = parseInt(amount.slice(0,mIndex))
        amount = amount.slice(mIndex+1)
        if (isNaN(mins)) {
          return 'Invalid input'
        }
      }
      sIndex = amount.indexOf('s')
      if (sIndex >= 0) {
        secs = parseInt(amount.slice(0,sIndex))
        amount = amount.slice(sIndex+1)
        if (isNaN(secs)) {
          return 'Invalid input'
        }
      }
      return secs + (mins*60) + (hours*60*60) + (days*60*60*24)
    }
  }
})
