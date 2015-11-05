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
  console.log(e);
}

$("#save-field").on('paste', clipboardHandler);
