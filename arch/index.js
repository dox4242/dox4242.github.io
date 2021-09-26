(function (window, document, $, undefined) {
    'use strict';

    function artifactCopy(artifact) {
        return {
            name: artifact.name,
            id: artifact.id,
            invertedchance: artifact.invertedchance,
            excav: artifact.excav,
            fixed: artifact.fixed,
            random: artifact.random,
            fail: artifact.fail,
            notry: artifact.notry,
            required: artifact.required,
            display: artifact.display,
            nocache: artifact.nocache,
            precheck: artifact.precheck
        };
    }

    function renderEvent(ev) {
        if (ev[0] == 'find') {
            return 'find ' + ev[1].name;
        } else if (ev[0] == 'improve') {
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
        this.loadSave = function (dat) {
            try {
                this.save = SaveHandler.Decode(dat);
                console.log('Decoded save:', this.save);
                if (this.save.options[0]) {
                    this.save.options = this.save.options[0];
                }
                if (this.save.hasOwnProperty('buyButton')) {
                    this.save.options.buyButton = this.save.buyButton;
                }
            } catch (err) {
                console.log(err);
                return;
            }
            View.result.state = this.save.artifactRngState;
            View.result.excavations = this.save.excavations;

            this.classifyArtifacts();
            View.excavs = [];
            var results = this.forecastArtifacts();
            for (var excav of results.events) {
                View.excavs.push(renderExcav(excav));
            }
            this.small_values = results.smalls;
            this.chart_rendered = false;
            if ($("div.tab-pane.active").attr('id') == 'tab-raw') {
                this.renderChart();
            }
            View.raw.sv = "";
            $('.artifactviewer').show();
            $('.viewer-results').empty().html("Click on a value above to see available artifact requirements for that value.");
            $('#override-reincarnation').val(this.save.reincarnation);

        }

        this.forecastArtifacts = function () {
            var state = this.save.artifactRngState;
            var rng = new PM_PRNG(state);
            var excav = this.save.excavations;
            var remaining = this.eligible.length - this.unobtain.length + this.nonrandom.length;
            var eligible = this.eligible;
            var nonrandom = this.nonrandom;
            var unobtain = {};
            for (var i of this.unobtain)
                unobtain[i] = true;
            var canignore = -this.unobtain.length;
            var events = [];
            var num = 0
            var smalls = [];
            var raw_values = 0;
            var calculatedValues = 10000;
            if (this.save.ascension >= 2) {
                calculatedValues = 100000;
            }
            if (this.save.ascension >= 4) {
                calculatedValues = 1000000;
            }
            var excavLimit = calculatedValues;
            var valueLimit = 100 / excavLimit;
            while (remaining > 0) {
                excav += 1;
                num += 1;
                var excavation = [excav, excav - this.save.excavations];
                for (var i in eligible) {
                    if (excav < eligible[i].excav || eligible[i].finished)
                        continue;
                    if (eligible[i].fail && eligible[i].fail(excav, num)) {
                        eligible[i].finished = true;
                        continue;
                    }
                    var val = rng.nextDouble();
                    if (raw_values < calculatedValues) {
                        raw_values += 1;
                        if (val < valueLimit)
                            smalls.push({
                                x: raw_values,
                                y: val
                            });
                    }
                    if (unobtain[eligible[i].id])
                        continue;
                    var random = eligible[i].nocache ? eligible[i].random(this.save, excav) : eligible[i].random;
                    if (val < random) {
                        excavation.push(['find', eligible[i]]);
                        eligible[i].finished = true;
                        remaining -= 1;
                    } else if (eligible[i].required && !eligible[i].nocache) {
                        var req = eligible[i].required(val, this.save, excav);
                        if (req != NaN && req != Infinity && req >= 0 && (eligible[i].lastreq == null || (eligible[i].invertedchance ? req > eligible[i].lastreq : req < eligible[i].lastreq))) {
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
                if (num > excavLimit || remaining <= canignore) {
                    break;
                }
            }
            while (raw_values < calculatedValues) {
                var val = rng.nextDouble();
                raw_values += 1;
                if (val < valueLimit)
                    smalls.push({
                        x: raw_values,
                        y: val
                    });
            }
            return {
                events: events,
                smalls: smalls
            };
        }
        this.classifyArtifacts = function () {
            View.raw.owned = [];
            View.raw.eligible = [];
            View.raw.unobtain = [];
            View.raw.nonrandom = [];
            View.raw.ineligible = [];
            View.raw.unowned = [];
            var excav = this.save.excavations;
            var num = util.save.stat(this.save, 35);
            var unownede = [];
            var unownedi = [];

            this.eligible = [];
            this.unobtain = [];
            this.nonrandom = [];

            for (var artifact of Artifacts) {
                var fixed = (!artifact.fixed || artifact.fixed(this.save));
                var fail = (!artifact.fail || !artifact.fail(this.save, num + 1));
                var eligible = (artifact.precheck ? artifact.precheck(this.save) : fixed);
                if (util.save.trophy_owned(this.save, artifact.id)) {
                    View.raw.owned.push(artifact.name);
                } else if (eligible && fail) {
                    if (artifact.random) {
                        unownede.push(artifact);
                        artifact = artifactCopy(artifact);
                        if (!artifact.nocache)
                            artifact.random = artifact.random(this.save);
                        this.eligible.push(artifact);
                        var name = artifact.name;
                        if (excav < artifact.excav)
                            name += ' (after ' + artifact.excav + ')';
                        View.raw.eligible.push(name);
                        if (artifact.notry && artifact.notry(this.save)) {
                            View.raw.unobtain.push(artifact.name);
                            this.unobtain.push(artifact.id);
                        }
                    } else {
                        this.nonrandom.push(artifactCopy(artifact));
                        var name = artifact.name;
                        if (excav < artifact.excav)
                            name += ' (at ' + artifact.excav + ')';
                        View.raw.nonrandom.push(name);
                    }
                } else {
                    View.raw.ineligible.push(artifact.name);
                    unownedi.push(artifact);
                }
            }
            View.raw.unowned = unownede.concat(unownedi);
        }

        this.renderChart = function () {
            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = Chart.Line($('#chartcontainer'), {
                    data: {
                        datasets: [{
                                label: 'Value',
                                data: this.small_values,
                                pointBackgroundColor: 'rgba(91, 110, 225, 0.7)',
                                pointStrokeColor: 'rgba(63, 63, 116, 1)'
                            }
                        ]
                    },
                    options: {
                        showLines: false,
                        title: {
                            display: true,
                            text: 'Small RNG Values',
                            fontSize: 16
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                    type: 'linear',
                                    position: 'bottom',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Number of RNG Values Ahead',
                                        fontSize: 14,
                                        fontStyle: 'bold'
                                    }
                                }
                            ],
                            yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'RNG Value',
                                        fontSize: 14,
                                        fontStyle: 'bold'
                                    }
                                }
                            ]
                        },
                        tooltips: {
                            displayColors: false
                        }
                    }
                });
            this.chart.render();
            this.chart_rendered = true;
        }

        this.viewArtifacts = function () {
            if (View.raw.sv) {
                var svs,
                i,
                reinc;
                $(".viewer-results").empty().html("<b>Excavations:</b>  " + (View.raw.eligible.length > 0 ? Math.ceil(View.raw.sv.x / View.raw.eligible.length) + " (If current number of eligible artifacts does not change)" : "Unable to move small values due to 0 eligible artifacts")
                     + "<br><b>Values:</b>  " + View.raw.sv.x + " values ahead " + " with <b>Small Value:</b> " + View.raw.sv.y);
                if (View.raw.unowned.length) {
                    $(".viewer-results").append("<br><br><table><tbody>");
                    svs = View.raw.eligible.length > 1 ? "<th> Small Value Shifts Required <a>(?)</a></th>" : "";
                    $(".viewer-results tbody").append("<tr><th> Artifact </th><th> Requirement </th>" + svs);
                    View.raw.eligible.length > 1 && $(".viewer-results th a").popover({
                        trigger: "hover",
                        html: true,
                        content: 'Every time you excavate, each eligible artifact consumes a small value per excavation. If you have more than one eligible artifact, this means that a good'
                         + ' small value can be consumed by the "wrong" artifact. You can shift the small values your current artifacts will consume by excavating with less (but at least one) eligible artifacts, likely in a different run.'
                         + '	<br \><b>Warning:</b> If an artifact becomes eligible at an even number of excavations such as 2000, that excavation will also cause a small value shift.'
                    });
                }
                reinc = ($("#override-box").is(":checked") && !isNaN(parseInt($('#override-reincarnation').val()))) ? $('#override-reincarnation').val() : this.save.reincarnation;
                for (i = 0; i < View.raw.unowned.length; i++) {
                    var artifact = View.raw.unowned[i];
                    svs = "";
                    i && i == View.raw.eligible.length && $(".viewer-results tbody").append("---");
                    if (!artifact.reincarnation || reinc >= artifact.reincarnation) {
                        var probability = artifact.required ? artifact.display(artifact.required(View.raw.sv.y)) : artifact.random ? View.raw.sv.y <= artifact.random(this.save, View.raw.sv.x) : 0;
                        //change input if required: true = Obtainable, false = Not Obtainable, an actual value is unchanged
                        if (probability = !0 === probability ? "Obtainable" : probability === !1 ? "Not Obtainable" : probability) {
                            if (i < View.raw.eligible.length && View.raw.eligible.length > 1) {
                                svs = View.raw.sv.x % View.raw.eligible.length,
                                svs = (i >= svs ? View.raw.eligible.length : 0) + svs - i - 1;
                                svs = ("<td>" + (svs === 0 ? "Uses Value" : (svs + " Shift" + (svs == 1 ? "" : "s"))) + "</td>");
                            }
                            $(".viewer-results tbody").append("<tr><td>" + artifact.name + "</td><td>" + probability + "</td>" + svs + "</tr>");
                        }
                    }
                }
                //no results = remove a br, for consistent style
                $(".viewer-results tr").length == 1 && $(".viewer-results tbody, .viewer-results br").remove();
            }
        };
    }

    window.Controller = new controller();

    $(function () {

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
                    eligible: function () {
                        return listJoin(this.raw.eligible);
                    },
                    owned: function () {
                        return listJoin(this.raw.owned);
                    },
                    unobtain: function () {
                        return listJoin(this.raw.unobtain);
                    },
                    ineligible: function () {
                        return listJoin(this.raw.ineligible);
                    },
                    nonrandom: function () {
                        return listJoin(this.raw.nonrandom);
                    }
                }
            });
        Vue.config.debug = true;

        // Initialize Flavor texts
        Flavor.pageLoaded(View);

        // Initialize Bootstrap popovers
        $('[data-toggle="popover"]').popover();

        //Dechecks a checkbox
        $('#override-box').prop('checked', false);

        // Bind Save decoding and parsing
        $('#saveInput').on('paste', function (e) {
            // Empty the input right before the paste comes through
            $(this).val('');

            // The timeout ensures we can grab the save right after the paste comes through, without messing with the clipboard
            var self = this;
            setTimeout(function () {
                var saveStr = $(self).val();
                if (saveStr)
                    Controller.loadSave(saveStr);
            }, 1);
        }).trigger('focus');

        // Bind Re-Enter button to refresh the forecast using the current save string
        $('#doReEnter').on('click', function (e) {
            $('#saveInput').trigger('focus');
            var saveStr = $('#saveInput').val();
            if (saveStr)
                Controller.loadSave(saveStr);
        });

        // Bind Copy button to copy the current save string
        $('#doSaveCopy').on('click', function (e) {
            $('#saveInput').trigger('focus');
            var save = $('#saveInput').val();
            window.prompt('Copy to clipboard: Press Ctrl+C, then Enter', save);
        });

        // Bind Clear button to clear the save input field
        $('#doSaveClear').on('click', function (e) {
            $('#saveInput').val('').trigger('focus');
        });

        $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href"); // activated tab
            if (Controller.small_values && !Controller.chart_rendered && target == '#tab-raw') {
                Controller.renderChart();
            }
        });

        $('#chartcontainer').on('click', function (e) {
            var activeElement = Controller.chart.getElementAtEvent(e);
            if (activeElement.length) {
                //clicked dot turns red, all other dots revert to default (blue)
                Controller.chart.data.datasets[0]._meta[Controller.chart.id].data.forEach(function (e) {
                    delete e.custom;
                });
                activeElement[0].custom = {
                    backgroundColor: 'rgba(255, 0, 0, 0.7)'
                };
                View.raw.sv = Controller.chart.data.datasets[0].data[activeElement[0]._index];
                Controller.viewArtifacts();
                Controller.chart.update();

            }
        });

        $('#override-box').change(function () {
            ($(this).is(':checked')) ? $('#artifactform').show() : $('#artifactform').hide()
            Controller.viewArtifacts();
        });

        $('#artifactform').change(function () {
            Controller.viewArtifacts();
        });

    });

}
    (window, document, jQuery));
