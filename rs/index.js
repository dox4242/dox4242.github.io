function statType (stat) {
  if (typeve(stat) === 'number') {
    return 'main';
  }
  else if (typeve(stat) === 'string') {
    var types = {
      b: 'build',
      s: 'spell',
      d: 'derived',
      g: 'global'
    }
    if (stat.substr(1,1) == ':') return types[stat.substr(0,1)];
  }
}

function controller() {
  this.statLists = ['stats', 'statsReset', 'statsRei'];
  this.buildSums = ['q', 't', 'r'];
  this.buildMaxes = ['q', 'm', 'e'];
  this.spellSums = ['c', 'r', 'e'];

  this.sumAtom = function(stat, level) {
    var type = statType(stat);
    if (type === 'main') {
      return this.save[this.statLists[level]][stat];
    }
    else if (type === 'build') {
      return this.save.build[stat][this.buildSums[level]];
    }
    else if (type === 'spell') {
      return this.save.spell[stat][this.spellSums[level]];
    }
    else if (type === 'global') {
      return this.save[stat.substr(2)];
    }
    else if (type === 'derived') {
      stat = stat.substr(2);
      if (typeve(this.derivedStats[stat]) === 'array') {
        return this.derivedStats[stat][level];
      }
      else {
        return this.derivedStats[stat];
      }
    }
  }

  this.sumStat = function(stat, level) {
    var sum = 0;
    for (var i = 0; i <= level; i++) {
      if (level > 0 && i === 0 && statType(stat) === 'build') {
        continue;
      }
      sum += this.sumAtom(stat, i);
    }
    return sum;
  }

  this.maxAtom = function(stat, level) {
    var type = statType(stat);
    if (type === 'main') {
      return this.sumAtom(stat, level);
    }
    else if (type === 'build') {
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

  this.deriveStats = function() {
    this.derivedStats = {
      timestamp: util.render.timeISO(this.save.lastsave),
      timedelta: (Date.now() - this.save.lastsave * 1000) / 1000,
      facelessAlly: [0, 0, this.save.facelessAlly],
      version: this.save.version,
      buyMode: ['1', '10', '100', 'Max'][this.save.buyMode]
    };
    if (this.save.version_rev !== '0') {
      this.derivedStats += '.' + this.save.version_rev;
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
    this.deriveStats();
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

  this.renderData = function(data, form, override) {   
    if (override !== null) {
      var res = override;
      if (data !== 0) {
        res += ' (' + this.renderData(data, form, null) + ')';
      }
      return res
    }
    else if (form === 'plain') {
      return data;
    }
    else if (form === 'time') {
      return util.render.time(data);
    }
    else if (form === 'number') {
      var renderers = ['short', 'sci', 'eng'];
      return util.render[renderers[Controller.save.options.not]](data);
    }
  }

  this.renderCell = function(data, form, override) {
    var res = '<td>';
    res += this.renderData(data, form, override);
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
