//The archmage glares at you. "I told you, I don't know why the scrying orb is cloudy, there's all this wibbly wibbly wobbly magic around that's confusing it. Oh, you're not here about that..."

function controller() {
  this.hiddenTrophies = ['t:ArcheologyFacelessTrophy', 't:ArcheologyTitanTrophy', 't:ArcheologyDruidTrophy', 't:ArcheologyUnderworldTrophy', 't:DwarvenInvitationTrophy', 't:DrowInvitationTrophy', 't:ArcheologyDwarfTrophy', 't:ArcheologyDrowTrophy', 't:MercenaryOathTrophy', 't:ResearchDemonTrophy', 't:ResearchUndeadTrophy', 't:ResearchFairyTrophy', 't:ResearchGoblinTrophy', 't:ResearchAngelTrophy', 't:ResearchElvenTrophy'];

  this.goodBuildings = ['b:RoyalCastle', 'b:KnightsJoust', 'b:Citadel', 'b:WarriorBarracks', 'b:HeavensGate', 'b:Cathedral', 'b:WizardTower']

  this.hasUpgrade = function(id) {
    return this.save.upgrade.hasOwnProperty(id);
  }

  this.buildingCount = function(good) {
    var sum = 0;
    if (good) {
      for (var i = 0; i < this.goodBuildings.length; i++) {
        sum += this.save.build[[this.goodBuildings[i]]].q;    
      }
    }
    else {
      for (var k in this.save.build) {
        if (!this.save.build.hasOwnProperty(k)) continue;
        sum += this.save.build[k].q;
      }
    }
    return sum;
  }

  this.trophyCount = function() {
    var count = 0;
    for (var k in this.save.trophy) {
      if (this.hiddenTrophies.indexOf(k) == -1) count += 1;
    }
    return count;
  }

  this.getMaxMana = function() {
    var maxMana = 1000;

    if (this.hasUpgrade('ur:DruidHeritage')) {
      maxMana += Math.floor(this.buildingCount(false) / 20);
    }
    if (this.hasUpgrade('uf:KindHearts') || this.hasUpgrade('uf:FairyHelpers')) {
      maxMana += Math.floor(this.buildingCount(true) / 12);      
    }
    if (this.hasUpgrade('ur:EarthlyBond')) {
      maxMana += 1.5 * this.build['b:StonePillars'].q;
    }
    // Vacuumancy
    if (this.hasUpgrade('urs:Spellcraft04')) {
      maxMana += Math.floor(25 * this.save.stats[1] / 60 / 60);
    }
    // Rampage
    if (this.hasUpgrade('urs:Warfare06')) {
      maxMana += Math.floor(1.25 * this.trophyCount());
    }
    if (this.hasUpgrade('u:Premeditation')) {
      maxMana += 200;
    }
    if (this.hasUpgrade('u:Reincarnation') && this.save.rei >= 12) {
      maxMana += 25 * this.save.rei;
    }

    console.log(maxMana);
    return maxMana;
  }

  this.loadSave = function(dat) {
    try {
      this.save = decode(dat);
    }
    catch(err) {
      console.log(err);
      View.saveValid(false);
      return
    }
    View.saveValid(true);
    this.maxMana = this.getMaxMana();
    $('#status-message').html('Your save is loaded. You have ' + this.maxMana + ' max mana.');
  }
}

function view() {
  this.saveValid = function(valid) {
    if (valid) {
      $('#status-message').html('Your save is loaded.');
      $('#manabox').prop('class', 'panel panel-success');
      $('#mana-field').prop('disabled', false);
    }
    else {
      $('#status-message').html('Your save is invalid.');
      $('#manabox').prop('class', 'panel panel-danger');
      $('#mana-field').prop('disabled', true);
    }
  }
}

Controller = new controller();
View = new view();

function pasteHandler(e) {
  var dat;
  // IE
  if (window.clipboardData && window.clipboardData.getData) {
    dat = window.clipboardData.getData('text');
  }
  // chrome/firefox/safari
  else {
    dat = e.originalEvent.clipboardData.getData('text/plain');
  }
  Controller.loadSave(dat);
}

$(function initialize() {
  $('#save-field').on('paste', pasteHandler);
});
