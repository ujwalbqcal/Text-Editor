var textEditor = new (function () {
  var initialize = this;

  initialize.init = function (args) {

    loadIcons();

    var el = 0;

    var textElements = [
      {
        command: 'bold', type: 'button', innerHTML: '<i class="fas fa-bold"></i>'
      }, {
        command: 'italic', type: 'button', innerHTML: '<i class="fas fa-italic"></i>'
      }, {
        command: 'underline', type: 'button', innerHTML: '<i class="fas fa-underline"></i>'
      }, {
        command: 'strikeThrough', type: 'button', innerHTML: '<i class="fas fa-strikethrough"></i>'
      }, {
        command: 'justifyLeft', type: 'button', innerHTML: '<i class="fas fa-align-left"></i>'
      }, {
        command: 'justifyCenter', type: 'button', innerHTML: '<i class="fas fa-align-center"></i>'
      }, {
        command: 'justifyRight', type: 'button', innerHTML: '<i class="fas fa-align-right"></i>'
      }, {
        command: 'justifyFull', type: 'button', innerHTML: '<i class="fas fa-align-justify"></i>'
      }, {
        command: 'cut', type: 'button', innerHTML: '<i class="fas fa-cut"></i>'
      }, {
        command: 'copy', type: 'button', innerHTML: '<i class="fas fa-copy"></i>'
      }, {
        command: 'indent', type: 'button', innerHTML: '<i class="fas fa-indent"></i>'
      }, {
        command: 'outdent', type: 'button', innerHTML: '<i class="fas fa-outdent"></i>'
      }, {
        command: 'subscript', type: 'button', innerHTML: '<i class="fas fa-subscript"></i>'
      }, {
        command: 'superscript', type: 'button', innerHTML: '<i class="fas fa-superscript"></i>'
      }, {
        command: 'undo', type: 'button', innerHTML: '<i class="fas fa-undo"></i>'
      }, {
        command: 'redo', type: 'button', innerHTML: '<i class="fas fa-redo"></i>'
      }, {
        command: 'createLink', type: 'button', innerHTML: '<i class="fas fa-link"></i>'
      }, {
        command: 'unLink', type: 'button', innerHTML: '<i class="fas fa-unlink"></i>'
      }


    ];

    var textContainer = document.createElement('div');
    textContainer.setAttribute('id', 'textContainer');
    textContainer.appendChildAfter(document.getElementById(args.selector));

    var textIframeEditable = document.createElement('iframe');
    textIframeEditable.setAttribute('id', 'textIframe');
    textIframeEditable.setAttribute('name', 'textIframe');

    textIframeEditable.style.width = '100%';
    textIframeEditable.style.border = 'solid 1px grey ';
    textContainer.appendChild(textIframeEditable);

    document.getElementById(args.selector).style.display = 'none';

    textIframeEditable.contentDocument.designMode = 'on';

    for (el in textElements) {
      var thisElement;

      if (el > 0) {
        thisElement = element;
      }

      var element = document.createElement(textElements[el].type);
      element.setAttribute('title', textElements[el].command);

      if (el > 0) {
        element.appendChildAfter(thisElement);

      }
      else {
        element.appendChildBefore(textIframeEditable);

      }
      element.innerHTML = textElements[el].innerHTML;
      element.style.margin = '4px 2px';

      var textCommand;
      var commandValue = null;

      if (textElements[el].type.indexOf('button') !== -1) {

        var displayCode = false;

        element.onclick = function () {
          textCommand = this.getAttribute('title');

          if (commandValue == null) {
            textIframe.document.execCommand(textCommand, false, commandValue);

          }
        }

      };

    }

  };

  Element.prototype.appendChildBefore = function (element) {

    element.parentNode.insertBefore(this, element);

  }, false;

  Element.prototype.appendChildAfter = function (element) {

    element.parentNode.insertBefore(this, element.nextSibling);

  }, false;

  var loadIcons = function () {

    var stylesheet = document.createElement('link');
    stylesheet.href = 'https://use.fontawesome.com/releases/v5.8.1/css/all.css?integrity=sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf';
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    document.head.appendChild(stylesheet);

  };


});