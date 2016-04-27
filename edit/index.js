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
    reincinput: '',
    rubiesinput: '',
    scrymsg: ''
  },
  watch: {
    olddata: function(data) {
      try {
        this.oldsave = SaveHandler.Decode(data)
        this.newsave = SaveHandler.Decode(data)
        console.log('Decoded save:', SaveHandler.Decode(data))
        this.newdata = 'Decoded v' + this.oldsave.saveVersion
        for (var i = 0; i < this.oldsave.upgrades.length; i++) {
          if (this.oldsave.upgrades[i].id == 39) {
            if (this.oldsave.upgrades[i].u1 == true) {
              this.angellineUpgradeBought = 'True'
            }
          }
        }
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
      }
      else { 
        for (var i = 0; i < this.oldsave.upgrades.length; i++) {
          for (var j = 0; j < this.bloodlineIDs.length; j++) {
            if (this.oldsave.upgrades[i].id == this.bloodlineIDs[j]) {
              if (this.bloodlineinput == 'Fairy') { this.newsave.upgrades[i].id = 194 }
              if (this.bloodlineinput == 'Elf') { this.newsave.upgrades[i].id = 164 }
              if (this.bloodlineinput == 'Angel') { this.newsave.upgrades[i].id = 39 }
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
    }
  },
  methods: {
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
