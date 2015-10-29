function b64ToBin(dat) {
  var dat = atob(dat);
  var array = new Uint8Array(dat.length);
  for (var i = 0; i < dat.length; i++) {
    array[i] = dat.charCodeAt(i);
  }
  return array;
}

function decode(save) {
  var dat = b64ToBin(save.substring(2, save.length-2));
  var inflate = new Zlib.Inflate(dat);
  dat = String.fromCharCode.apply(null, inflate.decompress());
  dat = JSON.parse(dat);
  return dat;
}
