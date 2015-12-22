// a codec for exported saves from Realm Grinder [http://www.kongregate.com/games/divinegames/realm-grinder]
// by Divine Games [www.divinegames.it]

(function(window, document, $, undefined) {
  'use strict';
  
  /** TODO
   * - Parse remaining entity IDs into names
   * - Couple the save format with pseudo's old save format
   * - Refactor everything
   */
  
  /*
  Changes between old and new save formats:
    secondaryResources      Grouped with royalExchangeFaction, under fcs
    royalExchangeFaction    Grouped with secondaryResources, under fcs
    stats           Grouped with statsReset and statsRei, under stats
    statsReset          Grouped with stats and statsRei, under stats
    statsRei          Grouped with stats and statsReset, under stats
    blastCharge         Probably outdated and removed
    facelessAlly        Probably outdated and removed
    version           Probably outdated and removed
  
  Data type table:
    Data type JS read function  AS read function  Description
    Int8    getInt8       readByte      
    Int16   getInt16      readShort     
    Int32   getInt32      readInt       
    Uint8   getUint8      readUnsignedByte  
    Uint16    getUint16     readUnsignedShort 
    Uint32    getUint32     readUnsignedInt   
    Float64   getFloat64      readDouble      
    
    Bool    true == getInt8   readBoolean     
    Empty   [Custom]      x         
    Array   [Custom]      x         
    List    [Custom]      x         
  
  Save format notation:
    DataType  Format / Explanation
    Empty   [ 'Empty', , length ]
          A number of positions to skip in parsing the data values
    Single    [ type, key ]
          A single data value of given type (see type table).
    Array   [ 'Array', key, , , itemValues::[ DataType ] ]
          An array of multiple data values (itemValues) to group into a single list
    List    [ 'List', key, count, itemKeyType, itemValues::[ DataType ] ]
          A list of multiple arrays of data values (itemValues) to group into a single list with count items, each containing all of the itemValues.
          If itemKeyType is 'Numbered', incremental 0-based indexing is applied.
          Otherwise, it's assumed that the item key of type itemKeyType precedes the item contents.
          In the latter case, it can be preceded by 'key:', with key representing a key in staticSaveData to use as a conversion table for itemKey values.
  */
  
  // The actual Save Format used to parse the save data into a usable object
  var saveFormat = [                          // Description
    [ 'Uint16', 'save_version' ],                  // The save format version number
    [ 'Empty', , 18 ],                        // Literally written as a loop with writeShort(0), running 9x
    [ 'Uint32', 'loc10' ],                      // Index within the save format where some basic game data is stored (alignment)
    [ 'Uint32', 'loc19' ],                      // Index within the save format where a save checksum type of value is stored (other21) (import only works if <= 18100)
    [ 'Uint16', 'buildingCount' ],                  // The number of Buildings
    [ 'List', 'build', 'buildingCount', 'buildings:Uint32', [  // The list of Buildings
      [ 'Uint32', 'q' ],                      // Current quantity
      [ 'Float64', 't' ],                     // Total built
      [ 'Float64', 'm' ],                     // Max built
      [ 'Float64', 'r' ],                     // Total all-time
      [ 'Float64', 'e' ],                     // Max all-time
    ] ], 
    [ 'Uint16', 'upgradeCount' ],                   // The number of Upgrades
    [ 'List', 'upgrade', 'upgradeCount', 'Uint32', [        // The list of Upgrades
      [ 'Bool', 'u1' ],                       // _loc29_.var_115
      [ 'Bool', 'u2' ],                       // _loc29_.var_453
      [ 'Uint32', 'u3' ],                     // RNG state
    ] ], 
    [ 'Uint16', 'trophyCount' ],                  // The number of Trophies
    [ 'List', 'trophy', 'trophyCount', 'Uint32', [          // The list of Trophies
      
    ] ], 
    [ 'EmptyV10', , 4 ],                    // V10 - possibly checksum of some kind?
    [ 'Uint16', 'spellCount' ],                   // The number of Spells
    [ 'List', 'spell', 'spellCount', 'spell:Uint32', [          // The list of Spells
      [ 'Int32', 't' ],                       // Spell timer (number of ticks it's been active, seems to count 30 ticks per second)
      [ 'Bool', 'a' ],                      // Whether the spell is currently on (some form of) autocast, or not
      [ 'Int32', 'n' ],                       // 0-based Silver autocasting priority
      [ 'Int32', 'n2' ],                      // 0-based Gold autocasting priority
      [ 'EmptyV10', , 4 ],                    // V10 - possibly 0-based Bronze autocasting priority
      [ 'Float64', 'c' ],                     // Number of casts for this abdication
      [ 'Float64', 'r' ],                     // Number of casts for all previous abdications in this reincarnation
      [ 'Float64', 'e' ],                     // Number of casts for all previous reincarnations
      [ 'Uint32', 's' ],                      // RNG state
    ] ], 
    [ 'Int8', 'alignment' ],                    // Alignment ID (0: None, 1: Good, 2: Evil, 3: Neutral)
    [ 'Int8', 'faction' ],                      // Faction ID (0-2: Good, 3-5: Evil, 6-8: Neutral, 11: Mercenaries)
    [ 'Int8', 'activeFaction' ],                  // Second Faction ID (9: Dwarves, 10: Drow)
    [ 'Float64', 'gems' ],                      // Current Gems
    [ 'Uint16', 'rei' ],                      // Current Reincarnations
    [ 'Uint32', 'lastsave' ],                     // From old save format, timestamp of last save (which would function as a last online time)
    [ 'Float64', 'mana' ],                      // Current Mana
    [ 'Float64', 'resource' ],                    // Current Coins
    [ 'EmptyV10', , 16 ],                          // V10 - unknown
    [ 'Uint16', 'fcCount' ],                    // The number of Faction Coin types
    [ 'List', 'fcs', 'fcCount', 'Numbered', [             // The list of Faction Coin types
      [ 'Float64', 'Faction Coins' ],               // The current amount owned of this Faction Coin type
      [ 'Uint32', 'Exchanges' ],                  // The current amount of Exchanges owned of this Faction Coin type
    ] ], 
    [ 'EmptyV10', , 18 ],                          // V10 - unknown
    [ 'Uint16', 'statCount' ],                    // The number of stats
    [ 'List', 'stats', 'statCount', 'Numbered', [           // The list of stats
      [ 'Float64', 'abd' ],                     // The stat value for this abdication (from stats)
      [ 'Float64', 'rei' ],                     // The stat value for all previous abdications in this reincarnation (from statsReset)
      [ 'Float64', 'ttl' ],                     // The stat value for all previous reincarnations (from statsRei)
    ] ], 
    [ 'Bool', 'cont' ],                       // Whether or not the Contingency Arrow is active
    [ 'Float64', 'contv' ],                     // The current value of the Contingency Arrow
    [ 'Int8', 'strikeTier' ],                     // 
    [ 'Int8', 'empoweredTier' ],                  // 
    [ 'Float64', 'empoweredBonus' ],                // From old save format
    [ 'Int32', 'chargedTimer' ],                  // 
    [ 'Int32', 'comboStrike' ],                   // 
    [ 'Int32', 'comboStrikeCont' ],                 // (Whether comboStrike is in contingency autocast?)
    [ 'Int32', 'goblinTimer' ],                   // (GFD?)
    [ 'EmptyV10', , 24 ],                     // V10 - unknown
    [ 'Uint32', 'msp' ],                      // First mercenary spell choice
    [ 'Uint32', 'msp2' ],                       // Second mercenary spell choice
    [ 'Int32', 'cTimer' ],                      // 
    [ 'Int32', 'kcTimer' ],                     // 
    [ 'Int32', 'mTimer' ],                      // 
    [ 'Float64', 'sTimer' ],                    // 
    [ 'Float64', 'oTimer' ],                    // 
    [ 'Float64', 'oTimer2' ],                     // 
    [ 'Int8', 'other18' ],                      // Season? (0: None, 1: Thanksgiving)
    [ 'Int8', 'bFaction' ],                     // 
    [ 'Int8', 'buyMode' ],                      // 
    [ 'Uint32', 'other21' ],                    // (import only works if <= 18100)
    [ 'Empty', , 1 ], 
    [ 'List', 'options', 1, 'Numbered', [               // The list of options
      [ 'Int8', 'tab' ],                      // Currently active tab
      [ 'Int8', 'not' ],                      // Option: Number notation (0: Short Numbers, 1: Scientific Notation, 2: Engineering Notation)
      [ 'Bool', 'skipCloud' ],                  // Option: Disable Cloud Restore Warning at Setup
      [ 'Bool', 'floatingText' ],                 // Option: Disable Floating Text
      [ 'Bool', 'buildingGlow' ],                 // Option: Disable Building Glow
      [ 'Bool', 'manaGlow' ],                   // Option: Disable Manabar Glow
      [ 'Bool', 'treasureGlow' ],                 // Option: Disable Treasure Glow (Holy Light)
      [ 'Bool', 'assistant' ],                  // Option: Disable Assistant Icon
      [ 'Bool', 'thousandsSep' ],                 // Option: Disable Thousand Separator
      [ 'Bool', 'toast' ],                    // Option: Disable Trophy Popups
      [ 'Bool', 'sortLocked' ],                   // Option: Sort Unpurchased Upgrades by Price
      [ 'Bool', 'sortUnlocked' ],                 // Option: Sort Purchased Upgrades by Price
      [ 'Bool', 'multiUpgrade' ],                 // Option: Multibuy Upgrade Series
      [ 'Bool', 'conUpgrade' ],                   // Option: Don't Consolidate Upgrades
      [ 'Bool', 'conTrophy' ],                  // Option: Don't Consolidate Trophies
      [ 'Bool', 'disableKred' ],                  // Option: Disable Premium Features
      [ 'Bool', 'warnExcavation' ],                 // Option: Excavation Warning
      [ 'Bool', 'warnExchange' ],                 // Option: Exchange Warning
      [ 'Bool', 'hideUpgHeader' ],                // Option: Hide Locked/Unlocked Upgrades Separator
      [ 'Bool', 'blockClick' ],                   // Option: Block Treasure Clicks
      [ 'Bool', 'spellTimer' ],                   // Option: Disable Spell Timer
      [ 'Bool', 'spellIcon' ],                  // Option: Disable Spell Icon
      [ 'Bool', 'buyButton' ],                  // Option: Disable Multibuy Button (use CTRL/SHIFT)
      [ 'Bool', 'hideUnlocked' ],                 // Whether or not Unlocked upgrades are hidden (via Locked/Unlocked Upgrades Separator)
    ] ]
  ];
  
  
  // Static data for things like Array key conversion (use var_81)
  window.staticSaveData = {
    buildings: [
      [ 'Key', 'Val' ], 
      [ 1, 'b:AlchemistLab' ], 
      [ 2, 'b:AncientPyramid' ], 
      [ 3, 'b:Blacksmith' ], 
      [ 4, 'b:Cathedral' ], 
      [ 5, 'b:Citadel' ], 
      [ 6, 'b:DarkTemple' ], 
      [ 7, 'b:DeepMine' ], 
      [ 8, 'b:EvilFortress' ], 
      [ 9, 'b:Farm' ], 
      [ 10, 'b:HallOfLegends' ], 
      [ 11, 'b:HeavensGate' ], 
      [ 12, 'b:HellPortal' ], 
      [ 13, 'b:Inn' ], 
      [ 14, 'b:IronStronghold' ], 
      [ 15, 'b:KnightsJoust' ], 
      [ 16, 'b:Labyrinth' ], 
      [ 17, 'b:Monastery' ], 
      [ 18, 'b:Necropolis' ], 
      [ 19, 'b:OrcishArena' ], 
      [ 20, 'b:RoyalCastle' ], 
      [ 21, 'b:SlavePen' ], 
      [ 22, 'b:StonePillars' ], 
      [ 23, 'b:WarriorBarracks' ], 
      [ 24, 'b:WitchConclave' ], 
      [ 25, 'b:WizardTower' ], 
    ],
    spell: [
      ['Key', 'Val'],
      [1, 's:BloodFrenzy'],
      [2, 's:Brainwave'],
      [3, 's:CallToArms'],
      [4, 's:ComboStrike'],
      [5, 's:DiamondPickaxe'],
      [6, 's:FairyChanting'],
      [7, 's:GemGrinder'],
      [8, 's:GoblinsGreed'],
      [9, 's:GodsHand'],
      [10, 's:GrandBalance'],
      [11, 's:HellfireBlast'],
      [12, 's:HolyLight'],
      [13, 's:LightningStrike'],
      [14, 's:MoonBlessing'],
      [15, 's:NightTime'],
      [16, 's:PayUpkeep'],
      [17, 's:SpiritualSurge'],
      [18, 's:TaxCollection']
    ]
  };
  
  // For all keys under staticSaveData, add one extra key for every column, using that column as keys
  for (var key in staticSaveData) {
    var data = staticSaveData[key];
    var columns = data[0];
    for (var column in columns) {
      var dataByColumn = {};
      for (var i = 1; i < data.length; i++)
        //dataByColumn[data[i][column]] = data[i];
        dataByColumn[data[i][column]] = data[i][1 - column];
      staticSaveData[key + 'By' + columns[column]] = dataByColumn;
    }
  }
  
  
  // A static SaveFormat class to parse save data with a given Save Format
  window.SaveFormat = new function(saveFormat) {
    // The actually returned object
    var self = {};
    
    this.saveFormat = saveFormat;
    
    this.position = 0;
    this.dataView;
    this.save;
    
    
    // Parse the given save data with the stored SaveFormat
    var parseSave = function(dataView) {
      this.position = 0;
      this.dataView = dataView;
      this.save = {};
      for (var i in this.saveFormat) {
        var saveFormatItem = this.saveFormat[i];
        var value = parseItem.apply(this, saveFormatItem);
        // Ensure we want to add the returned value (Empty type should not be added)
        if (typeof value !== 'undefined')
          this.save[saveFormatItem[1]] = value;
      }
      return this.save;
    };
    
    // Parse a specific data item according to the Save Format type
    var parseItem = function(type, key, count, keyType, listItemFormat) {
      
      // Base case, a simple data value readable by DataView
      if (typeof this.dataView['get' + type] === 'function') {
        var value = this.dataView['get' + type](this.position);
        this.position += Number(type.match(/[0-9]+/)) / 8;
        return value;
      }
      
      // Boolean case, redirect the call with Int8 type instead, but parse the return as boolean
      if (type == 'Bool')
        return Boolean(parseItem.apply(this, ['Int8'].concat([].slice.call(arguments, 1))));
      
      // Empty case
      if (type == 'Empty') {
        this.position += count;
        return;
      }
      
      // V10+ specifics
      if (type == 'EmptyV10') {
        var saveVersion = this.save.save_version;
        if (saveVersion >= 10)
        {
          this.position += count;
        }
        return;
      }
      // Array case
      if (type == 'Array') {
        var array = {};
        for (var i = 0; i < listItemFormat.length; i++) {
          var listItemFormatItem = listItemFormat[i];
          var value = parseItem.apply(this, listItemFormatItem);
          // Ensure we want to add the returned value (Empty type should not be added)
          if (typeof value !== 'undefined')
            array[listItemFormatItem[1]] = value;
        }
        return array;
      }
      
      // List case
      if (type == 'List') {
        var count = typeof count == 'number' ? count : this.save[count]; // Direct count or reference a save data position containing the count
        var list = {};
        keyType = keyType.split(':');
        for (var i = 0; i < count; i++) {
          // Incremental 0-based indexing
          if (keyType == 'Numbered')
            var listItemKey = i;
          // Indexing based on the next data value of specified type, then converted via staticSaveData if needed
          else {
            var listItemKey = parseItem.call(this, keyType[keyType.length - 1]);
            for (var j = keyType.length - 2; j >= 0; j--)
              listItemKey = staticSaveData[keyType[j] + 'ByKey'][listItemKey];
          }
          list[listItemKey] = parseItem.apply(this, [ 'Array', , , , listItemFormat ]);
        }
        return list;
      }
      
    };
    
    
    // Compile
    var compileSave = function(save) {
      this.position = 0;
      var output = new Uint8Array(20000); // Requires fixed length.. sadness..
      this.dataView = new DataView(output.buffer);
      this.save = save;
      for (var i in this.saveFormat) {
        var saveFormatItem = this.saveFormat[i];
        compileItem.apply(this, saveFormatItem);
      }
      return output.subarray(0, this.position);
    };
    
    // Compile Item
    var compileItem = function(type, key, count, keyType, listItemFormat) {
      
      // Base case, a simple data value readable by DataView
      if (typeof this.dataView['set' + type] === 'function') {
        var val = this.save.hasOwnProperty(key) ? this.save[key] : key; // We either get it from the save, or we assume key is the actual value
        //if (!this.save.hasOwnProperty(key))
          //console.log(type, key, val, this.position, arguments, this.save.hasOwnProperty(key));
        this.dataView['set' + type](this.position, val);
        this.position += Number(type.match(/[0-9]+/)) / 8;
        return;
      }
      
      // Boolean case, redirect the call with Int8 type instead, but parse the return as boolean
      if (type == 'Bool')
        return compileItem.apply(this, ['Int8'].concat([].slice.call(arguments, 1)));
      
      // Empty case
      if (type == 'Empty') {
        this.position += count;
        return;
      }
      
      // V10 - not implemented
      if (type == 'EmptyV10') {
        throw new SyntaxError("Save not implemented");
      }

      // Array case
      if (type == 'Array') {
        for (var i = 0; i < listItemFormat.length; i++) {
          var listItemFormatItem = listItemFormat[i];
          compileItem.apply(this, listItemFormatItem);
        }
        return;
      }
      
      // List case TODO
      if (type == 'List') {
        var count = typeof count == 'number' ? count : this.save[count]; // Direct count or reference a save data position containing the count
        keyType = keyType.split(':');
        for (var listItemKey in this.save[key]) {
          // Incremental 0-based indexing
          if (keyType == 'Numbered')
            ;
          // Indexing based on the next data value of specified type, then converted via staticSaveData if needed
          else {
            var originalKeyValue = listItemKey;
            for (var j = 0; j <= keyType.length - 2; j++)
              originalKeyValue = staticSaveData[keyType[j] + 'ByVal'][originalKeyValue];
            compileItem.call(this, keyType[keyType.length - 1], originalKeyValue);
          }
          for (var i = 0; i < listItemFormat.length; i++)
            compileItem.apply(this, [ listItemFormat[i][0], this.save[key][listItemKey][listItemFormat[i][1]] ]);
        }
        return;
      }
      
    };
    
    
    // Decode the save string into usable save data
    var decodeSave = function(save) {
      // Only handle the latest save format for now
      if (save.substr(0, 4) != '$00s' || save.substr(-2) != '$e')
        throw new SyntaxError('Incorrect Save Format');
      
      // Strip start and end signs
      save = save.slice(4, -2);
      
      // Base64 Decode
      save = atob(save);
      
      // Convert to Array of charCodes [ no fancy arrow function! :( ]
      save = [].map.call(save, function(e) { return e.charCodeAt(0); });
      
      // Decompress with pako, zlib apparently fails
      save = (new Zlib.Inflate(save)).decompress();
      //save = pako.inflate(save);
      
      // Vigenere
      //console.log(String.fromCharCode.apply(null, save));
      for (var i = 0; i < save.length; i++)
        save[i] = save[i] ^ 'therealmisalie'.charCodeAt(i % 'therealmisalie'.length);
      
      // Create a DataView to interact with
      save = new Uint8Array(save);
      var dataView = new DataView(save.buffer);
      
      // Parse Save Format
      return SaveFormat.Parse(dataView);
    };

    
    // (TODO) Encode the save data in a properly formatted save string
    var encodeSave = function(saveData) {
      // Compile Save Format
      var save = SaveFormat.Compile(saveData);
      
      // Overwrite the old checksum
      var dataView = new DataView(save.buffer);
      dataView.setUint32(save.length - 4, method_2(save.slice(0, -4)));
      
      // Convert to normal array
      var save = Array.prototype.slice.call(save);
      
      
      // Vigenere
      for (var i = 0; i < save.length; i++)
        save[i] = save[i] ^ 'therealmisalie'.charCodeAt(i % 'therealmisalie'.length);
      
      // Compress with pako, zlib apparently fails
      var save = (new Zlib.Deflate(save)).compress();
      //save = pako.deflate(save);
      
      // Convert charCode Array to String
      save = String.fromCharCode.apply(null, save);
      
      // Base64 Encode
      save = btoa(save);
      
      // Unstrip start and end signs
      save = '$00s' + save + '$e';
      
      // Return compiled save
      return save;
    };
    
    
    // Checksum stuffs
    var method_2 = function(param1) {
      var _loc5_ = 0;
      var _loc4_ = param1.length;
      var _loc3_ = 4294967295;
      var var_14 = method_4();
      while (--_loc4_ >= 0)
        _loc3_ = var_14[(_loc3_ ^ param1[_loc5_++]) & 255] ^ _loc3_ >>> 8;
      return 4294967295 - _loc3_;
    };
    var method_4 = function() {
      var _loc4_ = 0;
      var _loc1_ = 0;
      var _loc3_ = 0;
      var _loc2_ = new Array(256);
      _loc4_ = 0;
      while (_loc4_ < 256) {
        _loc1_ = _loc4_;
        _loc3_ = 8;
        while (true) {
          _loc3_--;
          if (_loc3_ < 0) {
            break;
          }
          if ((_loc1_ & 1) != 0) {
            _loc1_ = 3988292384 ^ _loc1_ >>> 1;
          } else {
            _loc1_ = _loc1_ >>> 1;
          }
        }
        _loc2_[_loc4_] = _loc1_;
        _loc4_++;
      }
      return _loc2_;
    };
    
    
    // Bind the parser entry point
    self.Parse = parseSave.bind(this);
    
    // Bind the compiler entry point
    self.Compile = compileSave.bind(this);
    
    // Bind the decoder entry point
    self.Decode = decodeSave.bind(this);
    
    // Bind the encoder entry point
    self.Encode = encodeSave.bind(this);
    
    
    // Return our custom object
    return self;
  }(saveFormat);
  
}(window, document, jQuery));

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
// get an exported save from an object
function encodeV1(save) {
  var dat = toArray(JSON.stringify(save));
  var deflate = new Zlib.Deflate(dat);
  dat = String.fromCharCode.apply(null, deflate.compress());
  return '$s' + btoa(dat) + '$e';
}

function decode(save) {
  //console.log(save);
  save = save.trim();
  if (save.slice(0,2) == '$s') {
    return decodeV1(save);
  }
  else if (save.slice(0,4) == '$00s') {
    return window.SaveFormat.Decode(save);
  }
}
