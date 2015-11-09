function isBuildStat(stat) {
  return typeve(stat) == 'string' && stat.substr(0,2) == 'b:';
}

function isSpellStat(stat) {
  return typeve(stat) == 'string' && stat.substr(0,2) == 's:';  
}

function controller() {
  this.statLists = ['stats', 'statsReset', 'statsRei'];
  this.buildSums = ['q', 't', 'r'];
  this.buildMaxes = ['q', 'm', 'e'];
  this.spellSums = ['c', 'r', 'e'];

  this.sumAtom = function(stat, level) {
    if (typeve(stat) === 'number') {
      return this.save[this.statLists[level]][stat];
    }
    else if (isBuildStat(stat)) {
      return this.save.build[stat][this.buildSums[level]];
    }
    else if (isSpellStat(stat)) {
      return this.save.spell[stat][this.spellSums[level]];
    }
  }

  this.sumStat = function(stat, level) {
    var sum = 0;
    for (var i = 0; i <= level; i++) {
      if (level >= 0 && i == 0 && isBuildStat(stat)) {
        continue;
      }
      sum += this.sumAtom(stat, i);
    }
    return sum;
  }

  this.maxAtom = function(stat, level) {
    if (typeve(stat) === 'number') {
      return this.sumAtom(stat, level);
    }
    else if (isBuildStat(stat)) {
      return this.save.build[stat][this.buildMaxes[level]];
    }    
  }

  this.maxStat = function(stat, level) {
    var atoms = [];
    for (var i = 0; i <= level; i++) {
      atoms.push(this.maxAtom());
    }
    return(Math.max.apply(null, atoms));
  }

  this.getStat = function(stat, mode, level) {
    if (mode === 'sum') {
      if (typeve(stat) === 'array') {
        var sum = 0;
        for (var i = 0; i < stat.length; i++) {
          sum += this.sumStat(stat[i], level);
        }
        return sum;
      }
      else {
        return this.sumStat(stat, level);
      }
    }
    else if (mode === 'sumdiff') {
      return this.getStat(stat[0], 'sum', level) - 
             this.getStat(stat[1], 'sum', level);
    }
    else if (mode === 'max') {
      return this.maxStat(stat, level);
    }
  }

  this.getData = function(stat, mode) {
    var data = [];
    for (var i = 0; i <= 2; i++) {
      data.push(this.getStat(stat, mode, i));
    }
    return data
  }

  this.getStats = function() {
    this.stats = [];
    for (var i = 0; i < statTables.length; i++) {
      var table = {
        heading: statTables[i].heading,
        stats: []
      };
      for (var j = 0; j < statTables[i].stats.length; j++) {
        var stat = statTables[i].stats[j];
        table.stats.push({
          name: stat.name,
          form: stat.form,
          data: this.getData(stat.stat, stat.type)
        });
      }
      this.stats.push(table);
    }
  }

  this.loadSave = function(dat) {
    try {
      this.save = decode(dat);
    }
    catch(err) {
      console.log(err);
      return
    }
    this.getStats();
  }

  this.pasteHandler = function(e) {
    var dat;
    // IE
    if (window.clipboardData && window.clipboardData.getData) {
      dat = window.clipboardData.getData('text');
    }
    // chrome/firefox/safari
    else {
      dat = e.originalEvent.clipboardData.getData('text/plain');
    }
    this.loadSave(dat);
  }
}

function view() {
  this.setIntro = function(message) {
      $('#intro-message').html(message);
  }
  this.setTitle = function(message) {
      $('#title').html(message);
  }
  this.setTagline = function(message) {
      $('#tagline').html(message);
  }
}

Controller = new controller();
View = new view();

$(function initialize() {
  Flavor.pageLoaded();
  $('[data-toggle="popover"]').popover();
  $('#save-field').on('paste', function(e) {Controller.pasteHandler(e)});
  test = 0;
});
