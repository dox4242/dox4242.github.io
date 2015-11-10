function isBuildStat(stat) {
  return typeve(stat) === 'string' && stat.substr(0,2) === 'b:';
}

function isSpellStat(stat) {
  return typeve(stat) === 'string' && stat.substr(0,2) === 's:';  
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
      if (level > 0 && i === 0 && isBuildStat(stat)) {
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
      atoms.push(this.maxAtom(stat, i));
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
    else if (mode === 'plain') {
      return this.sumAtom(stat, level);
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
        description: statTables[i].description,
        stats: []
      };
      for (var j = 0; j < statTables[i].stats.length; j++) {
        var stat = statTables[i].stats[j];
        table.stats.push({
          name: stat.name,
          form: stat.form,
          data: this.getData(stat.stat, stat.type),
          override: stat.override
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
    View.renderAccordion();
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

  this.renderCell = function(data, form, override) {
    var res = '<td>';
    if (override !== null) {
      res += override;
    }
    else if (form === 'plain') {
      res += data;
    }
    else if (form === 'time') {
      res += renderTime(data);
    }
    else if (form === 'number') {
      res += renderShort(data);
    }
    return res + '</td>';
  }

  this.renderRow = function(row) {
    var res = '<tr><th>' + row.name + '</th>';
    for (var i = 0; i < row.data.length; i++) {
      var override = null;
      if (row.override && row.override[i] !== null) {
        override = row.override[i];
      }
      res += this.renderCell(row.data[i], row.form, override);
    }
    return res + '</tr>';
  }

  this.renderTable = function(table) {
    var res = '<table class="table"><tr><th>Stat</th><th>This Game</th>';
    res += '<th>Total</th><th>All Reincarnations</th></tr>';
    for (var i = 0; i < table.length; i++) {
      res += this.renderRow(table[i]);
    }
    return res + '</table>';
  }

  this.renderPanel = function(panel, id) {
    var res = '<div class="panel panel-default">';
      res += '<div class="panel-heading role="tab" id="heading' + id + '">';
        res += '<span class="panel-title">';
          res += '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + id + '" aria-expanded="false" aria-controls="collapse' + id + '">';
            res += panel.heading;
          res += '</a>';
        res += '</span>';
      res += '</div>';
      res += '<div id="collapse' + id + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + id + '">';
        if (panel.description) {
          res += '<div class="panel-body">';
            res += panel.description;
          res += '</div>';
        }
        res += this.renderTable(panel.stats);
      res += '</div>';
    res += '</div>';
    return res
  }

  this.renderAccordion = function() {
    var res = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
    for (var i = 0; i < Controller.stats.length; i++) {
      res += this.renderPanel(Controller.stats[i], i);
    }
    res += '</div>';
    $('#result-area').html(res);
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
