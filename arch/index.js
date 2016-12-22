(function(window, document, $, undefined) {
  'use strict';

  function artifactCopy(artifact) {
    return {
      name: artifact.name,
      id: artifact.id,
      excav: artifact.excav,
      fixed: artifact.fixed,
      random: artifact.random,
      fail: artifact.fail,
      notry: artifact.notry,
      required: artifact.required,
      display: artifact.display
    };
  }

  function renderEvent(ev) {
    if (ev[0] == 'find') {
      return 'find ' + ev[1].name;
    }
    else if (ev[0] == 'improve') {
      return 'could find ' + ev[2].name + ' (with ' + ev[2].display(ev[1]) + ')';
    }
  }

  function renderExcav(ex) {
    var msg = 'Excavation ' + ex[0] + ' (' + ex[1] + ' ahead): ';
    var evs = [];
    for (var i = 2; i < ex.length; i++) {
      evs.push(renderEvent(ex[i]));
    }
    return msg + listJoin(evs);
  }

  function controller() {
    this.loadSave = function(dat) {
      try {
        this.save = SaveHandler.Decode(dat);
        console.log('Decoded save:', this.save);
        if (this.save.options[0]) {
          this.save.options = this.save.options[0];
        }
        if (this.save.hasOwnProperty('buyButton')) {
          this.save.options.buyButton = this.save.buyButton;
        }
      } catch(err) {
        console.log(err);
        return;
      }
      View.result.state = this.save.artifactRngState;
      View.result.excavations = this.save.excavations;
      View.result.max_mana = util.save.max_mana(this.save);
      View.result.assistants = util.save.assistants(this.save);
      View.result.re_bonus = util.save.re_bonus(this.save);

      this.classifyArtifacts();
      View.excavs = [];
      var results = this.forecastArtifacts();
      for (var excav of results.events) {
        View.excavs.push(renderExcav(excav));
      }
      this.chart = new CanvasJS.Chart('chartcontainer', {
        title: {text: 'Upcoming Small RNG Values'},
        axisX: {
          title: 'Number of Values Away',
          minimum: 0,
          maximum: 10000
        },
        axisY: {
          title: 'RNG Value',
          minimum: 0,
          maximum: 0.01
        },
        data: [{
          type: 'scatter',
          dataPoints: results.smalls
        }]
      });
      if ($("div.tab-pane.active").attr('id') == 'tab-raw') {
        this.chart.render();
        this.chart_rendered = true;
      }
      else {
        this.chart_rendered = false;
      }
    }
    this.forecastArtifacts = function() {
      var state = this.save.artifactRngState;
      var rng = new PM_PRNG(state);
      var excav = this.save.excavations;
      var remaining = this.eligible.length - this.unobtain.length + this.nonrandom.length;
      var eligible = this.eligible;
      var nonrandom = this.nonrandom;
      var unobtain = {};
      for (var i of this.unobtain) unobtain[i] = true;
      var canignore = -this.unobtain.length;
      var events = [];
      var num = util.save.stat(this.save, 35);
      var smalls = [];
      var raw_values = 0;
      while (remaining > 0) {
        excav += 1;
        num += 1;
        var excavation = [excav, excav - this.save.excavations];
        for (var i in eligible) {
          if (excav < eligible[i].excav || eligible[i].finished) continue;
          if (eligible[i].fail && eligible[i].fail(excav, num)) {
            eligible[i].finished = true;
            continue;
          }
          var val = rng.nextDouble();
          if (raw_values < 10000) {
            raw_values += 1;
            if (val < 0.01) smalls.push({x: raw_values, y: val});
          }
          if (unobtain[eligible[i].id]) continue;
          if (val < eligible[i].random) {
            excavation.push(['find', eligible[i]]);
            eligible[i].finished = true;
            remaining -= 1;
          } else if (eligible[i].required) {
            var req = eligible[i].required(val, this.save);
            if (eligible[i].lastreq == null || req < eligible[i].lastreq) {
              eligible[i].lastreq = req;
              excavation.push(['improve', req, eligible[i]]);
            }
          }

        }
        for (var i in nonrandom) {
          if (excav >= nonrandom[i].excav) {
            excavation.push(['find', nonrandom.splice(i, 1)[0]]);
            remaining -= 1;
          }
        }
        if (excavation.length > 2) {
          events.push(excavation);
        }
        if ((excav + this.save.excavations) > 20000 || remaining <= canignore) {
          break;
        }
      }
      while (raw_values < 10000) {
        raw_values += 1;
        if (val < 0.01) smalls.push({x: raw_values, y: val});
      }
      return {events: events, smalls: smalls};
    }
    this.classifyArtifacts = function() {
      View.raw.owned = [];
      View.raw.eligible = [];
      View.raw.unobtain = [];
      View.raw.nonrandom = [];
      View.raw.ineligible = [];
      var excav = this.save.excavations;

      this.eligible = [];
      this.unobtain = [];
      this.nonrandom = [];

      for (var artifact of Artifacts) {
        if (util.save.trophy_owned(this.save, artifact.id)) {
          View.raw.owned.push(artifact.name);
        }
        else if ((!artifact.fixed || artifact.fixed(this.save)) && (!artifact.fail || !artifact.fail(this.save))) {
          if (artifact.random) {
            artifact = artifactCopy(artifact);
            artifact.random = artifact.random(this.save);
            this.eligible.push(artifact);
            var name = artifact.name;
            if (excav < artifact.excav) name += ' (after ' + artifact.excav + ')';
            View.raw.eligible.push(name);
            if (artifact.notry && artifact.notry(this.save)) {
              View.raw.unobtain.push(artifact.name);
              this.unobtain.push(artifact.id);
            }
          }
          else {
            this.nonrandom.push(artifactCopy(artifact));
            var name = artifact.name;
            if (excav < artifact.excav) name += ' (at ' + artifact.excav + ')';
            View.raw.nonrandom.push(name);
          }
        }
        else {
          View.raw.ineligible.push(artifact.name);
        }
      }
    }
  }

  window.Controller = new controller();
  
  
  $(function() {
    
    // Initalize Vue
    window.View = new Vue({
      el: '#app',
      data: {
        flavor: {
          intro: 'you shouldn\'t be seeing these',
          title: 'something has gone',
          tagline: 'horribly wrong'
        },
        result: {
          state: null,
          excavations: null,
          assistants: null,
          max_mana: null,
          re_bonus: null
        },
        excavs: [],
        raw: {
          eligible: [],
          owned: [],
          unobtain: [],
          ineligible: [],
          nonrandom: []
        }
      },
      computed: {
        eligible: function() {
          return listJoin(this.raw.eligible);
        },
        owned: function() {
          return listJoin(this.raw.owned);
        },
        unobtain: function() {
          return listJoin(this.raw.unobtain);
        },
        ineligible: function() {
          return listJoin(this.raw.ineligible);
        },
        nonrandom: function() {
          return listJoin(this.raw.nonrandom);
        }
      }
    });
    Vue.config.debug = true;

    // Initialize Flavor texts
    Flavor.pageLoaded(View);
    
    // Initialize Bootstrap popovers
    $('[data-toggle="popover"]').popover();

    // Bind Save decoding and parsing
    $('#saveInput').on('paste', function(e) {
      // Empty the input right before the paste comes through
      $(this).val('');
      
      // The timeout ensures we can grab the save right after the paste comes through, without messing with the clipboard
      var self = this;
      setTimeout(function() {
        var saveStr = $(self).val();
        if (saveStr)
          Controller.loadSave(saveStr);
      }, 1);
    }).trigger('focus');
    
    // Bind Re-Enter button to refresh the forecast using the current save string
    $('#doReEnter').on('click', function(e) {
      $('#saveInput').trigger('focus');
      var saveStr = $('#saveInput').val();
      if (saveStr)
        Controller.loadSave(saveStr);
    });
    
    // Bind Copy button to copy the current save string
    $('#doSaveCopy').on('click', function(e) {
      $('#saveInput').trigger('focus');
      var save = $('#saveInput').val();
      window.prompt('Copy to clipboard: Press Ctrl+C, then Enter', save);
    });
    
    // Bind Clear button to clear the save input field
    $('#doSaveClear').on('click', function(e) {
      $('#saveInput').val('').trigger('focus');
    });

    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href"); // activated tab
      if (Controller.chart && !Controller.chart_rendered) {
        Controller.chart.render();
        Controller.chart_rendered = true;
      }
    });
  });
  
} (window, document, jQuery));
