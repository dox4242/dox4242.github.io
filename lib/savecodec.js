// a codec for exported saves from Realm Grinder [http://www.kongregate.com/games/divinegames/realm-grinder]
// by Divine Games [www.divinegames.it]

// this was two lambdas in python :c

// a thing I didn't need to fuck with in python
function toArray(dat) {
  var array = new Uint8Array(dat.length);
  for (var i = 0; i < dat.length; i++) {
    array[i] = dat.charCodeAt(i);
  }
  return array;
}

// get an object from an exported save
function decodeV1(save) {
  var dat = toArray(atob(save.slice(2, -2)));
  var inflate = new Zlib.Inflate(dat);
  dat = String.fromCharCode.apply(null, inflate.decompress());
  return JSON.parse(dat);
}

var testDataExtract = function(dataView) {
  // First look at the actual values within the save data, in the order as used by the source
  var data = [];
  var loc10, loc19, pos = 0;
  
  /* Function naming conversion:
  readBoolean     getInt8
  readByte      getInt8
  readShort     getInt16
  readInt       getInt32
  readUnsignedByte  getUint8
  readUnsignedShort getUint16
  readUnsignedInt   getUint32
  readDouble      getFloat64
  */
  
  data.push(dataView.getUint16(pos));
  data.push(loc10 = dataView.getUint32(pos + 20));
  data.push(loc19 = dataView.getUint32(pos + 24));
  data.push(dataView.getUint32(loc19 - 5));
  
  // Separator data
  data.push(dataView.getInt8(loc10));
  data.push(dataView.getInt8(loc10 + 1));
  data.push(dataView.getInt8(loc10 + 2));
  
  // Buildings
  var buildingCount;
  data.push(buildingCount = dataView.getUint16(28));
  pos = 30;
  var buildings = [];
  for (var i = 0; i < buildingCount; i++) {
    var building = [];
    var buildingNameID;
    building.push(buildingNameID = dataView.getUint32(pos));
    if (buildingNameID) {
      building.push(dataView.getUint32(pos + 4));
      building.push(dataView.getFloat64(pos + 8));
      building.push(dataView.getFloat64(pos + 16));
      building.push(dataView.getFloat64(pos + 24));
      building.push(dataView.getFloat64(pos + 32));
      buildings.push(building);
    }
    pos += 40;
  }
  data.push(buildings);
  
  // Upgrades
  var upgradeCount;
  data.push(upgradeCount = dataView.getUint16(pos));
  pos += 2;
  var upgrades = [];
  for (var i = 0; i < upgradeCount; i++) {
    var upgrade = [];
    var upgradeNameID;
    upgrade.push(upgradeNameID = dataView.getUint32(pos));
    if (upgradeNameID) {
      upgrade.push(dataView.getInt8(pos + 4));
      upgrade.push(dataView.getInt8(pos + 5));
      upgrade.push(dataView.getUint32(pos + 6));
      upgrades.push(upgrade);
    }
    pos += 10;
  }
  data.push(upgrades);
  
  // Trophies
  var trophyCount;
  data.push(trophyCount = dataView.getUint16(pos));
  pos += 2;
  var trophies = [];
  for (var i = 0; i < trophyCount; i++) {
    trophies.push(dataView.getUint32(pos));
    pos += 4;
  }
  data.push(trophies);
  
  // Spells
  var spellCount;
  data.push(spellCount = dataView.getUint16(pos));
  pos += 2;
  var spells = [];
  for (var i = 0; i < spellCount; i++) {
    var spell = [];
    var spellNameID;
    spellNameID = dataView.getUint32(pos);
    if (spellNameID) {
      spell.push(spellNameID);
      spell.push(dataView.getInt32(pos + 4));
      spell.push(dataView.getInt8(pos + 8));
      spell.push(dataView.getInt32(pos + 9));
      spell.push(dataView.getInt32(pos + 13));
      spell.push(dataView.getFloat64(pos + 17));
      spell.push(dataView.getFloat64(pos + 25));
      spell.push(dataView.getFloat64(pos + 33));
      spell.push(dataView.getUint32(pos + 41));
      spells.push(spell);
    }
    pos += 45;
  }
  data.push(spells);
  
  // Separator data (Looks identical to before buildings, is skipped in source)
  data.push(dataView.getInt8(pos));
  data.push(dataView.getInt8(pos + 1));
  data.push(dataView.getInt8(pos + 2));
  pos += 3;
  
  data.push(dataView.getFloat64(pos)); // Gems
  data.push(dataView.getUint16(pos + 8)); // R#
  data.push(dataView.getUint32(pos + 10)); // Timestamp (perhaps save time?)
  data.push(dataView.getFloat64(pos + 14)); // Current mana?
  data.push(dataView.getFloat64(pos + 22)); // Coins
  pos += 30;
  
  // Faction coins / exchanges
  var fcCount;
  data.push(fcCount = dataView.getUint16(pos));
  pos += 2;
  var fcs = [];
  for (var i = 0; i < fcCount; i++) {
    var fc = [];
    fc.push(dataView.getFloat64(pos)); // Current FC count
    fc.push(dataView.getUint32(pos + 8)); // Current Exchange level
    fcs.push(fc);
    pos += 12;
  }
  data.push(fcs);
  
  // ???
  var smthCount;
  data.push(smthCount = dataView.getUint16(pos));
  pos += 2;
  var smths = [];
  for (var i = 0; i < smthCount; i++) {
    var smth = [];
    smth.push(dataView.getFloat64(pos));
    smth.push(dataView.getFloat64(pos + 8));
    smth.push(dataView.getFloat64(pos + 16));
    smths.push(smth);
    pos += 24;
  }
  data.push(smths);
  
  // 
  data.push(dataView.getInt8(pos));
  data.push(dataView.getFloat64(pos + 1));
  data.push(dataView.getInt8(pos + 9));
  data.push(dataView.getInt8(pos + 10));
  data.push(dataView.getFloat64(pos + 11));
  data.push(dataView.getInt32(pos + 19));
  data.push(dataView.getInt32(pos + 23));
  data.push(dataView.getInt32(pos + 27));
  data.push(dataView.getInt32(pos + 31));
  data.push(dataView.getUint32(pos + 35));
  data.push(dataView.getUint32(pos + 39));
  data.push(dataView.getInt32(pos + 43));
  data.push(dataView.getInt32(pos + 47));
  data.push(dataView.getInt32(pos + 51));
  data.push(dataView.getFloat64(pos + 55));
  data.push(dataView.getFloat64(pos + 63));
  data.push(dataView.getFloat64(pos + 71));
  data.push(dataView.getInt8(pos + 79));
  data.push(dataView.getInt8(pos + 80));
  data.push(dataView.getInt8(pos + 81));
  data.push(dataView.getUint32(pos + 82));
  data.push(dataView.getInt8(pos + 86)); // Skipped in source
  data.push(dataView.getInt8(pos + 87));
  data.push(dataView.getInt8(pos + 88));
  data.push(dataView.getInt8(pos + 89));
  data.push(dataView.getInt8(pos + 90));
  data.push(dataView.getInt8(pos + 91));
  data.push(dataView.getInt8(pos + 92));
  data.push(dataView.getInt8(pos + 93));
  data.push(dataView.getInt8(pos + 94));
  data.push(dataView.getInt8(pos + 95));
  data.push(dataView.getInt8(pos + 96));
  data.push(dataView.getInt8(pos + 97));
  data.push(dataView.getInt8(pos + 98));
  data.push(dataView.getInt8(pos + 99));
  data.push(dataView.getInt8(pos + 100));
  data.push(dataView.getInt8(pos + 101));
  data.push(dataView.getInt8(pos + 102));
  data.push(dataView.getInt8(pos + 103));
  data.push(dataView.getInt8(pos + 104));
  data.push(dataView.getInt8(pos + 105));
  data.push(dataView.getInt8(pos + 106));
  data.push(dataView.getInt8(pos + 107));
  data.push(dataView.getInt8(pos + 108));
  data.push(dataView.getInt8(pos + 109));
  data.push(dataView.getInt8(pos + 110));
  
  return data;
};

function decodeV2(save) {
  save = save.slice(4, -2);
  save = toArray(atob(save));
  var inflate = new Zlib.Inflate(save);
  save = inflate.decompress();
  for (var i = 0; i < save.length; i++) {
    save[i] = save[i] ^ 'therealmisalie'.charCodeAt(i % 'therealmisalie'.length);
  }
  save = new Uint8Array(save);
  var view = new DataView(save.buffer);
  var dat = testDataExtract(view);
  console.log(dat);

  var buildingIds = {
    6: 'b:DarkTemple',
    22: 'b:StonePillars',
    19: 'b:OrcishArena',
    20: 'b:RoyalCastle',
    21: 'b:SlavePen',
    14: 'b:IronStronghold',
    12: 'b:HellPortal',
    5: 'b:Citadel',
    13: 'b:Inn',
    17: 'b:Monastery',
    1: 'b:AlchemistLab',
    10: 'b:HallOfLegends',
    8: 'b:EvilFortress',
    23: 'b:WarriorBarracks',
    9: 'b:Farm',
    25: 'b:WizardTower',
    4: 'b:Cathedral',
    11: 'b:HeavensGate',
    7: 'b:DeepMine',
    18: 'b:Necropolis',
    3: 'b:Blacksmith',
    24: 'b:WitchConclave',
    16: 'b:Labyrinth',
    15: 'b:KnightsJoust',
    2: 'b:AncientPyramid'
  };

  var buildingData = {};

  for (var i = 0; i < dat[8].length; i++) {
    buildingData[buildingIds[dat[8][i][0]]] = {
      q: dat[8][i][1]
    };
  }

  for (var i = 0; i < dat[14].length; i++) {
    if (dat[14][i][0] == 13) {
      return {
        spell: {
          's:LightningStrike': {
            s: dat[14][i][8]
          }
        },
        alignment: dat[15],
        faction: 6,
        build: buildingData
      };
    }
  }
}

// get an exported save from an object
function encodeV1(save) {
  var dat = toArray(JSON.stringify(save));
  var deflate = new Zlib.Deflate(dat);
  dat = String.fromCharCode.apply(null, deflate.compress());
  return '$s' + btoa(dat) + '$e';
}

function decode(save) {
  //console.log(save);
  if (save.slice(0,2) == '$s') {
    return decodeV1(save);
  }
  else if (save.slice(0,4) == '$00s') {
    return decodeV2(save);
  }
}
