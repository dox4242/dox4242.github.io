
	(function(window, document, $, undefined) {
		'use strict';

		// Refactored version of SaveFormat
		window.SaveHandler = new function() {
			
			// Regex to match a save format type, and extract its data
			var formatTypeChecks = {
				'struct': /^\$([0-9]{2})s(.*)\$e$/, 
				'sol': /^\$s0(.*)\$e([0-9]+)$/, 
				'json': /^\$s(.*)\$e$/, 
			};
			
			// Decode a given save string into a JS object using the proper Save Format type
			this.Decode = function(save) {
				// Check if we can match any known save format types and redirect there
				for (var formatType in formatTypeChecks) {
					var formatTypeCheck = formatTypeChecks[formatType].exec(save);
					if (formatTypeCheck)
						return decodeType[formatType].apply(this, formatTypeCheck.slice(1).reverse());
				}
				
				// Apparently we don't know this save format type
				throw new Error('Unrecognised Save Format Type');
				return false;
			};
			
			// Encode a given JS object into a save string using the proper Save Format type
			this.Encode = function(save, formatType, version) {
				// Set default formatType, version arguments
				if (!formatType)
					formatType = Object.keys(formatTypeChecks)[0];
				if (!version)
					version = 0;
				
				// Check if we can match any known save format types and redirect there
				if (formatTypeChecks.hasOwnProperty(formatType))
					return encodeType[formatType].call(this, save, version);
				
				// Apparently we don't know this save format type
				throw new Error('Unrecognised Save Format Type');
				return false;
			};
			
			
			// Easily switch between compression methods
			var compression = {
				'compressor': pako, 
				'inflate': pako.inflate, 
				'deflate': pako.deflate, 
			};
			/*var compression = {
				'compressor': Zlib, 
				'inflate': function(save) { return (new this.compressor.Inflate(save)).decompress(); }, 
				'deflate': function(save) { return (new this.compressor.Deflate(save)).compress(); }, 
			};*/
			
			// Apply the vigenere (de)cipher to the save, with the given key
			var vigenere = function(save, key) {
				for (var i = 0; i < save.length; i++)
					save[i] = save[i] ^ key.charCodeAt(i % key.length);
				return save;
			};
			
			// Custom implementation of the checksum generation
			var makeChecksum = function(save) {
				var converter = [];
				for (var i = 0; i < 256; i++) {
					var bit = i;
					for (var j = 0; j < 8; j++) {
						if (bit & 1 != 0)
							bit = 3988292384 ^ bit >>> 1;
						else
							bit >>>= 1;
					}
					converter[i] = bit;
				}
				
				var checksum = 4294967295;
				for (var i = 0; i < save.length; i++)
					checksum = converter[(checksum ^ save[i]) & 255] ^ checksum >>> 8;
				return 4294967295 - checksum;
			};
			
			
			var decodeType = {
				// Decode the old JSON format
				'json': function decodeJson(save) {
					// Base64 Decode
					save = atob(save);
					
					// Convert to Array of charCodes [ no fancy arrow function! :( ]
					//save = Array.from(save, e => e.charCodeAt(0));
					save = [].map.call(save, function(e) { return e.charCodeAt(0); });
					
					// Inflate compression
					save = compression.inflate(save);
					
					// Convert charCode Array to String
					save = String.fromCharCode.apply(null, save);
					
					// String to JSON
					save = JSON.parse(save);
					
					// Return decoded save
					return save;
				}, 
				// Decode the old .sol format
				'sol': function decodeSol(save, version) {
					// String to JSON
					save = JSON.parse(save);
					
					// Return decoded save
					return save;
				}, 
				// Decode the ByteArray format
				'struct': function decodeBytes(save, version) {
					// Base64 Decode
					save = atob(save);
					
					// Convert to Array of charCodes [ no fancy arrow function! :( ]
					//save = Array.from(save, e => e.charCodeAt(0));
					save = [].map.call(save, function(e) { return e.charCodeAt(0); });
					
					// Inflate compression
					save = compression.inflate(save);
					
					// Vigenere
					save = vigenere(save, 'therealmisalie');
					
					// Create a DataView to interact with
					save = new Uint8Array(save);
					var dataView = new DataView(save.buffer);
					
					// Parse Save Format
					save = Format.parse(dataView);
					
					// Return decoded save
					return save;
				}, 
			};
			
			var encodeType = {
				// Encode the old JSON format
				'json': function encodeJson(save) {
					console.log(save);
					// JSON to String
					save = JSON.stringify(save);
					
					// Deflate compression
					save = compression.deflate(save);
					
					// Convert charCode Array to String
					save = String.fromCharCode.apply(null, save);
					
					// Base64 Encode
					save = btoa(save);
					
					// Unstrip start and end signs
					save = '$s' + save + '$e';
					
					// Return encoded save
					return save;
				}, 
				// Encode the old .sol format
				'sol': function encodeSol(save, version) {
					// JSON to String
					save = JSON.stringify();
					
					// Base64 Encode
					save = btoa(save);
					
					// Unstrip start and end signs, and add save format version (lrc)
					save = '$s' + save + '$e' + ('0000000000' + version).slice(-10);
					
					// Return encoded save
					return save;
				}, 
				// Encode the ByteArray format
				'struct': function encodeBytes(save, version) {
					// Compile Save Format
					var save = Format.compile(save);
					
					// Convert to normal array
					var save = [].slice.call(save);
					
					// Vigenere
					save = vigenere(save, 'therealmisalie');
					
					// Deflate compression
					save = compression.deflate(save);
					
					// Convert charCode Array to String
					save = String.fromCharCode.apply(null, save);
					
					// Base64 Encode
					save = btoa(save);
					
					// Unstrip start and end signs, and add save format version (lrc)
					save = '$' + ('00' + version).slice(-2) + 's' + save + '$e';
					
					// Return encoded save
					return save;
				}, 
			};
			
			
			// A separate part of the Save Handler specifically for Parsing and Compiling ByteArray-based Save Formats
			var Format = new function() {
				
				this.position;
				this.dataView;
				this.save;
				this.stash;
				
				
				// Parse the given key and locate it in the given parent, and return the key itself
				this.parseKey = function(parent, keys) {
					// Handle single-dimension (keys = 'k1') and filepath-notation (keys = 'k1/k2/k3')
					if (typeof keys == 'string')
						keys = keys.split('/');
					
					// Don't actually parse the last key, ..
					for (var i = 0; i < keys.length - 1; i++) {
						var curKey = keys[i];
						// Handle base path
						if (curKey == '_base' || curKey == '')
							parent = this.save;
						// TODO: Handle parent path
						else if (curKey == '_up' || curKey == '..')
							;
						// Handle (default) child path
						else {
							if (!parent.hasOwnProperty(curKey))
								parent[curKey] = {};
							parent = parent[curKey];
						}
					}
					// .. But return it instead, along with the parsed parent to preserve reference and assignability
					return [ parent, keys[keys.length - 1] ];
				};
				
				// Parse the given key and locate it in the given parent, and return the actual value instead
				this.parseKeyValue = function(parent, keys) {
					// Handle fixed number
					if (typeof keys == 'number')
						return keys;
					
					// Otherwise, parse the key..
					var key = this.parseKey(parent, keys);
					// .. Then return the accompanying value, without preserving reference or assignability
					return key[0][key[1]];
				};
				
				
				// Parse the given save bytes into an object according to the Save Format type
				this.parse = function(dataView) {
					// Initialize
					this.position = 0;
					this.dataView = dataView;
					this.save = {};
					
					// Loop through every Format Item, and Parse them one by one from the DataView to the Save
					for (var item in this.format)
						this.parseItem(this.save, this.format[item]);
					
					// Return the decoded save
					return this.save;
				};
				
				// Parse the given format from the given position in the ByteArray, and return the value
				this.parseValue = function(format, position) {
					if (position)
						var value = this.dataView['get' + format](position);
					else {
						var value = this.dataView['get' + format](this.position);
						this.position += format === 'Bool' ? 1 : Number(format.match(/[0-9]+/)) / 8;
					}
					return value;
				};
				
				// Parse a specific piece of data according to the Save Format type
				this.parseItem = function(parent, item) {
					
					// Condition checks
					if (item.cond) {
						var conditions = typeof item.cond == 'string' ? [ item.cond ] : item.cond;
						for (var c in conditions) {
							var condition = conditions[c].split(' ');
							condition[0] = this.parseKeyValue(parent, condition[0]);
							var result = eval(condition.join(' '));
							if (!result)
								return;
						}
					}
					
					// For parsing, we can skip stash cases
					if (item.stash) {
						var val = this.parseValue(item.format);
						return;
					}
					
					// Base case, a simple data value readable by DataView
					if (typeof this.dataView['get' + item.format] === 'function') {
						var key = this.parseKey(parent, item.key);
						key[0][key[1]] = this.parseValue(item.format);
					}
					
					// Boolean case, similar to Base case, but parse the Int value to Boolean
					else if (item.format === 'Bool') {
						var key = this.parseKey(parent, item.key);
						key[0][key[1]] = Boolean(this.parseValue('Int8'));
					}
					
					// Jump case, jump up or down, by or to the given amount of positions
					else if (item.format === 'Jump') {
						var amount = this.parseKeyValue(parent, item.amount) ;
						this.position = item.relative === false ? amount : this.position + amount;
					}
					
					// Array case, read a format multiple times and group the results in an array
					else if (item.format === 'Array') {
						var key = this.parseKey(parent, item.key);
						key[0][key[1]] = [];
						
						var length = this.parseValue(item.length.format);
						for (var i = 0; i < length; i++) {
							item.member.key = [ i ];
							this.parseItem(key[0][key[1]], item.member);
						}
						delete item.member.key;
					}
					
					// Object case, read the object members and group the results in an object
					else if (item.format === 'Object') {
						var key = this.parseKey(parent, item.key);
						key[0][key[1]] = {};
						
						for (var i in item.members)
							this.parseItem(key[0][key[1]], item.members[i]);
					}
					
				};
				
				
				// Compile the given save object into bytes according to the Save Format type
				this.compile = function(save) {
					// Initialize
					this.position = 0;
					var output = new Uint8Array(50000); // Requires fixed length.. sadness..
					this.dataView = new DataView(output.buffer);
					this.save = save;
					this.stash = { '_index': {}, '_len': {} };
					
					// Loop through every Format Item, and Compile them one by one from the Save to the DataView
					for (var item in this.format)
						this.compileItem(this.save, this.format[item]);
					
					// Handle stash cases
					var endPosition = this.position;
					
					// Overwrite the old checksum
					this.dataView.setUint32(this.position, makeChecksum(output.slice(0, this.position)));
					this.position += 4;
					
					// Cut off the unused bytes and return the encoded save
					return output.subarray(0, this.position);
				};
				
				// Compile the given value in the given format to the given position in the ByteArray
				this.compileValue = function(format, value, position) {
					if (position)
						this.dataView['set' + format](position, value);
					else {
						this.dataView['set' + format](this.position, value);
						this.position += format === 'Bool' ? 1 : Number(format.match(/[0-9]+/)) / 8;
					}
				};
				
				// Compile a specific piece of data according to the Save Format type
				this.compileItem = function(parent, item) {
					
					// Condition checks
					if (item.cond) {
						var conditions = typeof item.cond == 'string' ? [ item.cond ] : item.cond;
						for (var c in conditions) {
							var condition = conditions[c].split(' ');
							condition[0] = this.parseKeyValue(parent, condition[0]);
							var result = eval(condition.join(' '));
							if (!result)
								return;
						}
					}
					
					// Handle stash cases
					if (item.key) {
						var key = typeof item.key == 'string' ? item.key : item.key.join('/');
						
						// Stash cases, _index and _len, are processed separately
						if (item.stash) {
							if (item.stash == '_index')
								this.stash['_index'][key] = { 'format': item.format, 'position': this.position };
							this.position += item.format === 'Bool' ? 1 : Number(item.format.match(/[0-9]+/)) / 8;
							return;
						}
						
						// Check if we have to handle any stash case keys
						if (this.stash['_index'][key]) {
							var stashed = this.stash['_index'][key];
							this.compileValue(stashed.format, this.position, stashed.position);
						}
					}
					
					// Base case, a simple data value writeable by DataView
					if (typeof this.dataView['set' + item.format] === 'function') {
						var val = this.parseKeyValue(parent, item.key);
						//var keys = typeof item.key == 'string' ? item.key.split('/') : item.key;
						this.compileValue(item.format, val);
					}
					
					// Boolean case, similar to Base case, but parse the Boolean value to Int
					else if (item.format === 'Bool') {
						var val = Number(this.parseKeyValue(parent, item.key));
						this.compileValue('Int8', val);
					}
					
					// Jump case, jump up or down, by or to the given amount of positions
					else if (item.format === 'Jump') {
						var amount = this.parseKeyValue(parent, item.amount);
						this.position = item.relative === false ? amount : this.position + amount;
					}
					
					// Array case, read a format multiple times and group the results in an array
					else if (item.format === 'Array') {
						//var length = this.parseKeyValue(parent, item.length);
						var values = this.parseKeyValue(parent, item.key);
						
						this.compileValue(item.length.format, values.length);
						for (var i = 0; i < values.length; i++)
							this.compileItem(values[i], item.member);
					}
					
					// Object case, read the object members and group the results in an object
					else if (item.format === 'Object') {
						var key = item.key ? this.parseKeyValue(parent, item.key) : parent;
						for (var i in item.members)
							this.compileItem(key, item.members[i]);
					}
					
				};
				
				
				// The current Save Format (Up-to-date up to version 1.5.45.0)
				{ this.format = [																				// Description
					{ 'format': 'Uint16', 'key': 'saveVersion' },												// The save format version number
					{ 'format': 'Jump', 'amount': 18 },															// Literally written as a loop with writeShort(0), running 9x
					{ 'format': 'Uint32', 'key': 'alignment', 'stash': '_index' },								// Index within the save format where some basic game data is stored (alignment)
					{ 'format': 'Uint32', 'key': 'options', 'stash': '_index' },								// Index within the save format where a save checksum type of value is stored (other21)
					{ 'format': 'Array', 'key': 'buildings',													// The list of Buildings
						'length': { 'format': 'Uint16', 'key': 'buildings', 'stash': '_len' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Uint32', 'key': 'id' },												// Building: id
							{ 'format': 'Uint32', 'key': 'q' },													// Building: Current quantity
							{ 'format': 'Float64', 'key': 't' },												// Building: Total built
							{ 'format': 'Float64', 'key': 'm' },												// Building: Max built
							{ 'format': 'Float64', 'key': 'r' },												// Building: Total all-time
							{ 'format': 'Float64', 'key': 'e' },												// Building: Max all-time
						] },
					},
					{ 'format': 'Array', 'key': 'upgrades',														// The list of Upgrades
						'length': { 'format': 'Uint16', 'key': 'upgrades', 'stash': '_len' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Uint32', 'key': 'id' },												// Upgrade: id
							{ 'format': 'Bool', 'key': 'u1' },													// Upgrade: _loc29_.var_115
							{ 'format': 'Bool', 'key': 'u2', 'cond': '_base/saveVersion >= 1' },				// Upgrade: _loc29_.var_453
							{ 'format': 'Uint32', 'key': 's' },													// Upgrade: RNG state
						] },
					},
					{ 'format': 'Array', 'key': 'trophies',														// The list of Trophies
						'length': { 'format': 'Uint16', 'key': 'trophies', 'stash': '_len' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Uint32', 'key': 'id' },												// Trophy: id
						] },
					},
					{ 'format': 'Uint32', 'key': 'rngState', 'cond': '_base/saveVersion >= 4' }, 				// ??? Some global RNG state?
					{ 'format': 'Array', 'key': 'spells',														// The list of Spells
						'length': { 'format': 'Uint16', 'key': 'spells', 'stash': '_len' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Uint32', 'key': 'id' },												// Spell: id
							{ 'format': 'Int32', 'key': 't' },													// Spell: Timer in # of ticks it's been active (seems to count 30/second)
							{ 'format': 'Bool', 'key': 'a' },													// Spell: Whether the spell is currently on (some form of) autocast, or not
							{ 'format': 'Int32', 'key': 'n' },													// Spell: 0-based Silver autocasting priority
							{ 'format': 'Int32', 'key': 'n2' },													// Spell: 0-based Golden autocasting priority
							{ 'format': 'Int32', 'key': 'n3', 'cond': '_base/saveVersion >= 5' },				// Spell: 0-based Bronze autocasting priority
							{ 'format': 'Float64', 'key': 'c' },												// Spell: Number of casts for this abdication
							{ 'format': 'Float64', 'key': 'r' },												// Spell: Number of casts for all previous abdications in this reincarnation
							{ 'format': 'Float64', 'key': 'e' },												// Spell: Number of casts for all previous reincarnations
							{ 'format': 'Float64', 'key': 'active0' }, // time active this abdication
							{ 'format': 'Float64', 'key': 'active1' }, // time active prior abdications
							{ 'format': 'Float64', 'key': 'active2' }, // time active prior reincarnations
							{ 'format': 'Uint32', 'key': 's' },													// Spell: RNG state
						] },
					},
					{ 'format': 'Int8', 'key': 'alignment' },													// Alignment ID (0: None, 1: Good, 2: Evil, 3: Neutral)
					{ 'format': 'Int8', 'key': 'faction' },														// Faction ID (0-2: Good, 3-5: Evil, 6-8: Neutral, 11: Mercenaries)
					{ 'format': 'Int8', 'key': 'prestigeFaction' },												// Second Faction ID (9: Dwarves, 10: Drow)
					{ 'format': 'Float64', 'key': 'gems' },														// Current gems
					{ 'format': 'Uint16', 'key': 'reincarnation' },												// Current reincarnations
					{ 'format': 'Uint16', 'key': 'ascension' },												// Current ascensions
					{ 'format': 'Uint32', 'key': 'lastsave' },													// From old save format, timestamp of last save (which would function as a last online time)
					{ 'format': 'Float64', 'key': 'mana' },														// Current mana
					{ 'format': 'Float64', 'key': 'coins' },													// Current coins
					{ 'format': 'Float64', 'key': 'rubies', 'cond': '_base/saveVersion >= 4' },						// Current Rubies
					{ 'format': 'Float64', 'key': 'excavations', 'cond': '_base/saveVersion >= 4' },					// ??? Current Excavation count
					{ 'format': 'Array', 'key': 'factionCoins',													// The list of Faction Coin types
						'length': { 'format': 'Uint16', 'key': 'factionCoins' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Float64', 'key': 'factionCoins' },										// FC: The current amount owned of this Faction Coin type
							{ 'format': 'Uint32', 'key': 'royalExchanges' },									// FC: The current amount of Exchanges owned of this Faction Coin type
						] },
					},
					{ 'format': 'Array', 'key': 'unknown/unk3', 'cond': 'saveVersion >= 7',						// ??? The list of unk3s
						'length': { 'format': 'Uint16', 'key': '_len/unknown/unk3' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Float64', 'key': 'unk3' },												// unk3: First one seems to be my current snowball count
						] },
					},
					{ 'format': 'Array', 'key': 'stats',														// The list of stats
						'length': { 'format': 'Uint16', 'key': '_len/stats' },
						'member': { 'format': 'Object', 'members': [
							{ 'format': 'Float64', 'key': 'stats' },											// Stats: The stat value for this abdication (from stats)
							{ 'format': 'Float64', 'key': 'statsReset' },										// Stats: The stat value for all previous abdications in this reincarnation (from statsReset)
							{ 'format': 'Float64', 'key': 'statsRei' },											// Stats: The stat value for all previous reincarnations (from statsRei)
						] },
					},
					{ 'format': 'Bool', 'key': 'contingency' },													// Whether or not the Contingency Arrow is active
					{ 'format': 'Float64', 'key': 'contingencyValue' },											// The current value of the Contingency Arrow
					{ 'format': 'Int8', 'key': 'strikeTier' },													// Lightning Strike target building tier
					{ 'format': 'Int8', 'key': 'empoweredTier', 'cond': '_base/saveVersion < 11' },				// Grand Balance target 1 building tier
					{ 'format': 'Int8', 'key': 'empoweredTier2', 'cond': [ '_base/saveVersion >= 5', '_base/saveVersion < 11' ] }, // Grand Balance target 2 building tier
					{ 'format': 'Float64', 'key': 'empoweredBonus', 'cond': '_base/saveVersion < 11' }, 		// Grand Balance target 1 multiplier
					{ 'format': 'Float64', 'key': 'empoweredBonus2', 'cond': [ '_base/saveVersion >= 5', '_base/saveVersion < 11' ] }, // Grand Balance target 2 multiplier
					//{ 'format': 'Jump', 'amount': 9, 'cond': '_base/saveVersion >= 5' }, 
					//{ 'format': 'Jump', 'amount': 9, 'cond': '_base/saveVersion >= 11' }, 
					{ 'format': 'Int32', 'key': 'miracleTier', 'cond': '_base/saveVersion >= 3' },				// Miracle target building tier
					{ 'format': 'Int32', 'key': 'miracleTimer', 'cond': '_base/saveVersion >= 3' },				// Miracle time left
					{ 'format': 'Int8', 'key': 'snowballScryUses', 'cond': '_base/saveVersion >= 9' },			// The number of times Scried for snowballs
					{ 'format': 'Uint16', 'key': 'snowballSize', 'cond': '_base/saveVersion >= 9' },			// The number of uncollected snowballs
					{ 'format': 'Uint32', 'key': 'lastGiftDate', 'cond': '_base/saveVersion >= 9' },			// Date of most recently earned Gift
					{ 'format': 'Int32', 'key': 'chargedTimer' },												// 
					{ 'format': 'Int32', 'key': 'comboStrike', 'cond': '_base/saveVersion <= 15' },												// 
					{ 'format': 'Int32', 'key': 'comboStrikeCont' },											// ??? Whether comboStrike is in contingency autocast?
					{ 'format': 'Int32', 'key': 'goblinTimer' },												// ??? GFD?
					{ 'format': 'Int32', 'key': 'unknown/unk4', 'cond': '_base/saveVersion >= 11' },			// ???
					{ 'format': 'Uint32', 'key': 'mercSpell1' },												// First mercenary spell choice
					{ 'format': 'Uint32', 'key': 'mercSpell2' },												// Second mercenary spell choice
					{ 'format': 'Int32', 'key': 'cTimer' },														// 
					{ 'format': 'Int32', 'key': 'kcTimer' },													// 
					{ 'format': 'Int32', 'key': 'mTimer' },														// 
					{ 'format': 'Float64', 'key': 'sTimer' },													// 
					{ 'format': 'Float64', 'key': 'oTimer' },													// 
					{ 'format': 'Float64', 'key': 'oTimer2' },													// 
					{ 'format': 'Int8', 'key': 'season', 'cond': '_base/saveVersion >= 2' },					// Season (0: None, 1: Thanksgiving, 2: Christmas)
					{ 'format': 'Int8', 'key': 'bFaction' },													// 
					{ 'format': 'Int8', 'key': 'buyMode' },														// Multibuy button mode (0: Buy 1, 1: Buy 10, 2: Buy 100, 3: Buy All)
					{ 'format': 'Int8', 'key': 'excavBuyMode', 'cond': '_base/saveVersion >= 10' },				// Excavation Multibuy button mode (0: Buy 1, 1: Buy 10, 2: Buy 100, 3: Buy All)
					{ 'format': 'Uint32', 'key': 'other21' },													// import only works if <= some hardcoded value (save length upper limit check)
					{ 'format': 'Int8', 'key': 'saveRevision' },												// 
					{ 'format': 'Object', 'key': 'options', 'members': [										// The list of options
						{ 'format': 'Int8', 'key': 'tab' },														// Option: Currently active tab
						{ 'format': 'Int8', 'key': 'not' },														// Option: Number notation (0: Short Numbers, 1: Scientific Notation, 2: Engineering Notation)
						{ 'format': 'Bool', 'key': 'skipCloud' },												// Option: Disable Cloud Restore Warning at Setup
						{ 'format': 'Bool', 'key': 'floatingText' },											// Option: Disable Floating Text
						{ 'format': 'Bool', 'key': 'buildingGlow' },											// Option: Disable Building Glow
						{ 'format': 'Bool', 'key': 'manaGlow' },												// Option: Disable Manabar Glow
						{ 'format': 'Bool', 'key': 'treasureGlow' },											// Option: Disable Treasure Glow (Holy Light)
						{ 'format': 'Bool', 'key': 'assistant' },												// Option: Disable Assistant Icon
						{ 'format': 'Bool', 'key': 'thousandsSep' },											// Option: Disable Thousand Separator
						{ 'format': 'Bool', 'key': 'toast' },													// Option: Disable Trophy Popups
						{ 'format': 'Bool', 'key': 'sortLocked' },												// Option: Sort Unpurchased Upgrades by Price
						{ 'format': 'Bool', 'key': 'sortUnlocked' },											// Option: Sort Purchased Upgrades by Price
						{ 'format': 'Bool', 'key': 'multiUpgrade' },											// Option: Multibuy Upgrade Series
						{ 'format': 'Bool', 'key': 'conUpgrade' },												// Option: Don't Consolidate Upgrades
						{ 'format': 'Bool', 'key': 'conTrophy' },												// Option: Don't Consolidate Trophies
						{ 'format': 'Bool', 'key': 'disableKred' },												// Option: Disable Premium Features
						{ 'format': 'Bool', 'key': 'warnExcavation' },											// Option: Excavation Warning
						{ 'format': 'Bool', 'key': 'warnExchange' },											// Option: Exchange Warning
						{ 'format': 'Bool', 'key': 'warnRuby', 'cond': '_base/saveVersion >= 6' },				// Option: Ruby Warning
						{ 'format': 'Bool', 'key': 'hideUpgHeader' },											// Option: Hide Locked/Unlocked Upgrades Separator
						{ 'format': 'Bool', 'key': 'blockClick' },												// Option: Block Treasure Clicks
						{ 'format': 'Bool', 'key': 'spellTimer' },												// Option: Disable Spell Timer
						{ 'format': 'Bool', 'key': 'spellIcon' },												// Option: Disable Spell Icon
						{ 'format': 'Bool', 'key': 'buyButton' },												// Option: Disable Multibuy Button (use CTRL/SHIFT)
						{ 'format': 'Bool', 'key': 'hideUnlocked' },											// Option: Whether or not Unlocked upgrades are hidden (via Locked/Unlocked Upgrades Separator)
					] },
				] };
				
			};
			
		} ();
		
	} (window, document, jQuery));
