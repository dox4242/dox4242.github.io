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
function decode(save) {
  var dat = toArray(atob(save.substring(2, save.length-2)));
  var inflate = new Zlib.Inflate(dat);
  dat = String.fromCharCode.apply(null, inflate.decompress());
  return JSON.parse(dat);
}

// get an exported save from an object
function encode(save) {
  var dat = toArray(JSON.stringify(save));
  var deflate = new Zlib.Deflate(dat);
  dat = String.fromCharCode.apply(null, deflate.compress());
  return '$s' + btoa(dat) + '$e';
}
