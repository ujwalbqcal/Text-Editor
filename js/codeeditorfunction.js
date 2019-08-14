var autoBrace = true;

function preventDefaultEvent(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

function newLine() {

  var editor = document.getElementById('codeEditor');
  var numOutput = document.getElementById('columnNumber');

  var inserted = editor.value;

  while (numOutput.firstChild) {
    numOutput.removeChild(numOutput.firstChild);
  }

  if (inserted !== "") {

    var newLines = editor.value.split(/\n/);

    for (var index = 0; index < newLines.length; index++) {

      var tempNewLineNumber = createNewLineNumber(index);
      numOutput.appendChild(tempNewLineNumber);
    }
  }

}

function createNewLineNumber(index) {
  var numNode = document.createElement("div");
  numNode.className = "textarealinenumber";
  numNode.style.height = '18px';
  numNode.textContent = index + 1;
  return numNode;
}

function isPrintableKeycode(keycode) {
  var isPrintable =
    (keycode > 47 && keycode < 58) || // number keys
    keycode == 32 || keycode == 13 || // spacebar & return key(s)
    (keycode > 64 && keycode < 91) || // letter keys
    (keycode > 95 && keycode < 112) || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223);   // [\]' (in order)

  return isPrintable;
}