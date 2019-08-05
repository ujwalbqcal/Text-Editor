var loadIcons = function () {

  var stylesheet = document.createElement('link');
  stylesheet.href = 'https://use.fontawesome.com/releases/v5.8.1/css/all.css?integrity=sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf';
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  document.head.appendChild(stylesheet);

};


Element.prototype.appendChildBefore = function (element) {

  element.parentNode.insertBefore(this, element);

}, false;

Element.prototype.appendChildAfter = function (element) {

  element.parentNode.insertBefore(this, element.nextSibling);

}, false;

function execViewSourceCommand(element, textIframeEditable, displayCode) {

  if (!displayCode) {
    textIframeEditable.contentDocument.getElementsByTagName('body')[0].textContent = textIframeEditable.contentDocument.getElementsByTagName('body')[0].innerHTML;
    displayCode = true;
  } else {
    textIframeEditable.contentDocument.getElementsByTagName('body')[0].innerHTML = textIframeEditable.contentDocument.getElementsByTagName('body')[0].textContent;
    displayCode = false;
  }

  return displayCode;
}


function isThisElement(textElements, val) {
  return textElements.command.indexOf(val) !== -1;

}