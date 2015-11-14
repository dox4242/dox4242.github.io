function statType (stat) {
  if (typeve(stat) === 'number') {
    return 'main';
  }
  else if (typeve(stat) === 'string') {
    var types = {
      b: 'build',
      s: 'spell',
      d: 'derived',
      g: 'global',
      o: 'option'
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
      if (level === 2 && this.save.statsRei == null) return null;
      return this.save[this.statLists[level]][stat];
    }
    else if (type === 'build') {
      if (!this.save.build[stat]) return null;
      return this.save.build[stat][this.buildSums[level]];
    }
    else if (type === 'spell') {
      if (!this.save.spell || !this.save.spell[stat]) return null;
      return this.save.spell[stat][this.spellSums[level]];
    }
    else if (type === 'global') {
      return level === 0 ? this.save[stat.substr(2)] : 0;
    }
    else if (type === 'option') {
      return level === 0 ? this.save.options[stat.substr(2)] : 0;
    }
    else if (type === 'derived') {
      stat = stat.substr(2);
      if (typeve(this.derivedStats[stat]) === 'array') {
        return this.derivedStats[stat][level];
      }
      else {
        return level === 0 ? this.derivedStats[stat] : 0;
      }
    }
  }

  this.sumStat = function(stat, level) {
    var sum = 0;
    for (var i = 0; i <= level; i++) {
      if (level > 0 && i === 0 && statType(stat) === 'build') {
        continue;
      }
      var part = this.sumAtom(stat, i);
      if (part == null) return null;
      sum += part;
    }
    return sum;
  }

  this.maxAtom = function(stat, level) {
    var type = statType(stat);
    if (type === 'main') {
      if (level === 2 && this.save.statsRei == null) return null;
      return this.sumAtom(stat, level);
    }
    else if (type === 'build') {
      if (!this.save.build[stat]) return null;
      return this.save.build[stat][this.buildMaxes[level]];
    }    
  }

  this.maxStat = function(stat, level) {
    if (stat >= Controller.save.stats.length) return null;
    var atoms = [];
    for (var i = 0; i <= level; i++) {
      var part = this.maxAtom(stat, i);
      if (part == null) return null;
      atoms.push(part);
    }
    return(Math.max.apply(null, atoms));
  }

  this.getStat = function(stat, mode, level) {
    if (mode === 'sum') {
      if (typeve(stat) === 'array') {
        var sum = 0;
        var broken = 0;
        for (var i = 0; i < stat.length; i++) {
          var part = this.sumStat(stat[i], level);
          if (part == null) broken += 1;
          sum += part;
        }
        return (broken == stat.length) ? null : sum;
      }
      else {
        return this.sumStat(stat, level);
      }
    }
    else if (mode === 'sumdiff') {
      var p1 = this.getStat(stat[0], 'sum', level);
      var p2 = this.getStat(stat[1], 'sum', level)
      return (p1 == null || p2 == null) ? null : p1 - p2;
    }
    else if (mode === 'max') {
      return this.maxStat(stat, level);
    }
    else if (mode === 'plain') {
      return this.sumAtom(stat, level);
    }
  }

  this.getData = function(stat, levels) {
    var padding = levels ? levels.length : 3;
    if (stat.levels) {
      levels = stat.levels;
    }
    else if (!levels) {
      levels = [0, 1, 2];
    }
    padding -= levels.length;
    var data = [];
    for (var i = 0; i < levels.length; i++) {
      data.push(this.getStat(stat.stat, stat.type, levels[i]));
    }
    for (var i = 0; i < padding; i++) {
      data.push(undefined);
    }
    return data
  }

  this.getTable = function(table, levels) {
    var items = [];
    for (var i = 0; i < table.length; i++) {
      var stat = table[i];
      items.push({
        name: stat.name,
        form: stat.form,
        data: this.getData(stat, levels),
        override: stat.override
      });
    }
    return items;
  }

  this.getStats = function() {
    this.stats = [];
    for (var i = 0; i < statTables.length; i++) {
      var panel = {
        heading: statTables[i].heading,
        levels: statTables[i].levels,
        columns: statTables[i].columns,
        description: statTables[i].description,
        stats: []
      };
      panel.stats = this.getTable(statTables[i].stats, statTables[i].levels);      
      this.stats.push(panel);
    }
  }

  this.deriveStats = function() {
    this.derivedStats = {
      timestamp: util.render.timeISO(this.save.lastsave),
      timedelta: (Date.now() - this.save.lastsave * 1000) / 1000,
      version: this.save.version,
      notation: this.save.options.not != null ? this.save.options.not : (this.save.options.notation ? 1 : 0)
    };
    if (this.save.version_rev !== '0' && this.save.version) {
      this.derivedStats.version += '.' + this.save.version_rev;
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
    View.renderTabs();
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

  this.formatters = {
    faction: function(x) {return ['None', 'Fairy', 'Elf', 'Angel', 'Goblin', 'Undead', 'Demon', 'Titan', 'Druid', 'Faceless', 'Dwarf', 'Drow', 'Mercenary'][x+1]},
    alignment: function(x) {return ['None', 'Neutral', 'Good', 'Evil'][x+1]},
    tier: function(x) {return x > -1 ? 'Tier ' + (x + 1) : 'N/A'},
    ticks: function(x) {return x > -1 ? util.render.time(x/30) : 'N/A'},
    setting: function(x) {return x ? 'On' : 'Off'},
    buymode: function(x) {return ['1', '10', '100', 'Max'][x]},
    notation: function(x) {return ['Short Scale', 'Scientific', 'Engineering'][x]},
    currtab: function(x) {return ['Stats', 'Upgrades', 'Trophies', 'Save', 'Shop'][x]}
  };

  this.renderData = function(data, form, override) {
    if (override !== null) {
      var res = override;
      if (data != 0 && data != undefined) {
        res += ' (' + this.renderData(data, form, null) + ')';
      }
      return res
    }
    else if (data == null || data == NaN) {
      return '&ndash;N/I&ndash;';
    }
    else if (form === 'plain') {
      return data;
    }
    else if (form === 'time') {
      return util.render.time(data);
    }
    else if (form === 'number') {
      var renderers = ['short', 'sci', 'eng'];
      return util.render[renderers[Controller.derivedStats.notation]](data);
    }
    else if (form === 'timedelta') {
      return util.render.timedelta(data);
    }
    else if (form.substr(0,2) === 'f:') {
      return this.formatters[form.substr(2)](data);
    }
    else if (form.substr(0,2) === 'c:') {
      return form.substr(2);
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

  this.defaultColumns = ['Stat', 'This Game', 'Total', 'All Time'];

  this.renderHeader = function(tab) {
    var res = '<tr>';
    var columns = [this.defaultColumns[0]];
    if (tab.columns) {
      columns = tab.columns;
    }
    else if (tab.levels) {
      for (i = 0; i < tab.levels.length; i++) {
        columns.push(this.defaultColumns[i + 1]);
      }
    }
    else {
      columns = this.defaultColumns;
    }
    for (i = 0; i < columns.length; i++) {
      res += '<th>' + columns[i] + '</th>';
    }
    return res + '</tr>';
  }

  this.renderTable = function(tab) {
    var res = '<table class="table">';
    res += this.renderHeader(tab);
    for (var i = 0; i < tab.stats.length; i++) {
      res += this.renderRow(tab.stats[i]);
    }
    return res + '</table>';
  }

  this.renderTab = function(tab) {
    var res = '<div class="panel panel-default">';
      if (tab.description) {
        res += '<div class="panel-body">';
          res += tab.description;
        res += '</div>';
      }
      res += this.renderTable(tab);
    res += '</div>';
    return res
  }

  this.renderTabs = function() {
    var res = '<ul class="nav nav-pills" role="tablist">';
    for (var i = 0; i < Controller.stats.length; i++) {
      var head = Controller.stats[i].heading;
      res += '<li role="presentation"' + (i == 0 ? ' class="active">' : '>');
        res += '<a href="#stattab' + i + '" aria-controls="' + head +
               '" role="tab" data-toggle="pill">' + head + '</a>';
      res += '</li>';
    }
    res += '</ul>';
    res += '<div class="tab-content">';
    for (var i = 0; i < Controller.stats.length; i++) {
      res += '<div role="tabpanel" class="tab-pane fade' + (i == 0 ? ' in active"' : '"') +
             ' id="stattab' + i + '">';
        res += this.renderTab(Controller.stats[i]);
      res += '</div>';
    }
    res += '</div>';
    $('#result-area').html(res);
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
  $('.tooltip-fixed').popover();
  $('#save-field').on('paste', function(e) {Controller.pasteHandler(e)});
});
