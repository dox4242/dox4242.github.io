var bkeys = ["b:Farm", "b:Inn", "b:Blacksmith", "b:DeepMine",
"b:StonePillars", "b:AlchemistLab","b:Monastery", "b:Labyrinth",
"b:IronStronghold", "b:AncientPyramid", "b:HallOfLegends"];

var bnames = ["Farms", "Inns", "Blacksmiths", "Deep Mines",
"Stone Pillars", "Alchemist Labs", "Monasteries", "Labyrinths",
"Iron Strongholds", "Ancient Pyramids", "Halls of Legends"];

function clipboardHandler(e) {
  var dat;
  // IE
  if (window.clipboardData && window.clipboardData.getData) {
    dat = window.clipboardData.getData('text');
  }
  // chrome/firefox/safari
  else {
    dat = e.originalEvent.clipboardData.getData('text/plain');
  }
  processSave(dat);
}

function processSave(dat) {
  document.getElementById("intro").innerHTML = "";
  document.getElementById("buildings").innerHTML = "";
  document.getElementById("forecast").innerHTML = "";
  document.hits = undefined;
  try {
    dat = decode(dat);
    console.log(dat);
  }
  catch(err) {
    console.log(err);
    document.getElementById("intro").innerHTML = "Your save is invalid.";
    document.getElementById("forecast").innerHTML = "Forecast: no lightning.";
    return
  }
  if (dat.alignment != 3) {
    document.getElementById("intro").innerHTML = "You are not aligned neutral.";
    document.getElementById("forecast").innerHTML = "Forecast: no lightning.";
    return
  }
  var ownedBuildings = [];
  for (var i = 0; i < bkeys.length; i++) {
    if (dat.build[bkeys[i]].q > 0) {
      ownedBuildings[ownedBuildings.length] = bnames[i];
    }
  }
  if (!(dat.faction == 6 || dat.msp == "Lightning Strike"
        || dat.msp2 == "Lightning Strike")) {
    document.getElementById("intro").innerHTML = "You don't have lightning strike.";
    document.getElementById("forecast").innerHTML = "Forecast: no lightning.";
    return
  }
  if (ownedBuildings.length == 0) {
    document.getElementById("intro").innerHTML = "You have no buildings.";
    document.getElementById("forecast").innerHTML = "Forecast: no lightning.";
    return
  }
  if (ownedBuildings.length == 1) {
    document.getElementById("intro").innerHTML = "You only have " + ownedBuildings[0] + ".";
    document.getElementById("forecast").innerHTML = "Forecast: the only thing you have, as many times as you like.";
    return
  }
  var state = dat.spell["s:LightningStrike"].s;
  document.getElementById("intro").innerHTML = "Your RNG state is: " + state + ".";
  document.getElementById("buildings").innerHTML = "You have " + listJoin(ownedBuildings) + ".";
  var RNG = new PM_PRNG(state);
  var hits = [];
  for (i = 0; i < 10; i++) {
    hits.push(ownedBuildings[RNG.strikeTier(ownedBuildings.length)]);
  }
  hits[hits.length] = "<a onclick='addMoreHits()' href='javascript:;'>Give me a longer forecast...</a>"
  document.getElementById("forecast").innerHTML = "Forecast: " + olJoin(hits);
  document.hits = hits;
  document.RNG = RNG;
  document.ownedBuildings = ownedBuildings;
}

function addMoreHits() {
  if (!document.hits) {
    return
  }
  var hits = document.hits;
  var RNG = document.RNG;
  var ownedBuildings = document.ownedBuildings;
  hits.splice(hits.length-1, 1);
  for (var i = 0; i < 10; i++) {
    hits.push(ownedBuildings[RNG.strikeTier(ownedBuildings.length)]);
  }
  hits[hits.length] = "<a onclick='addMoreHits()' href='javascript:;'>Give me an even longer forecast...</a>"
  document.getElementById("forecast").innerHTML = "Forecast: " + olJoin(hits);
  document.hits = hits;
  document.RNG = RNG;
  document.ownedBuildings = ownedBuildings;

  return false;
}

$(document).on('paste', clipboardHandler);

$(document).on("mousewheel DOMMouseScroll", function(e) {
  var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));
  if (delta == -1 && ($(window).scrollTop() + $(window).height() == $(document).height())) {
    addMoreHits();
  }
});

$(function initialize() {
  //Flavor.pageLoaded();
  $('.tooltip-fixed').popover();
  //$('#save-field').on('paste', function(e) {Controller.pasteHandler(e)});
});
