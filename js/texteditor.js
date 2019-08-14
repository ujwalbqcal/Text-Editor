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
        command: 'insertHorizontalRule', type: 'button', innerHTML: '<b>insertHorizontalRule</b>'
      }, {
        command: 'createLink', type: 'button', innerHTML: '<i class="fas fa-link"></i>'
      }, {
        command: 'unLink', type: 'button', innerHTML: '<i class="fas fa-unlink"></i>'
      }, {
        command: 'insertImage', type: 'button', innerHTML: '<i class="fas fa-file-image"></i>'
      }, {
        command: 'viewSourceCode', type: 'button', innerHTML: '<i class="fas fa-code"></i>'
      }, {
        command: 'foreColor', type: 'input', subtype: 'color', innerHTML: 'Font Color'
      }, {
        command: 'hiliteColor', type: 'input', subtype: 'color', innerHTML: 'Highlight Color'
      }, {
        command: 'fontName', type: 'select', innerHTML: '', options: ['Arial', 'Comic sans MS', 'Times New Roman', 'Georgia', 'Courier', 'Tahoma', 'Verdena']
      }, {
        command: 'fontSize', type: 'select', innerHTML: '', options: [1, 2, 3, 4, 5, 6, 7]
      }


    ];

    var buttonElements = [{
      command: 'save', type: 'button', innerHTML: '<i class="fas fa-save"></i>'
    }];

    document.getElementById('buttoncontainer').style.display = 'none';

    var headLine = document.createElement('div');
    headLine.setAttribute('id', 'headLine');
    headLine.innerHTML = 'Text Editor';
    headLine.style.padding = '0 35% 1% 35%';
    headLine.style.fontSize = '25px';
    headLine.appendChildAfter(document.getElementById(args.selector));

    var textContainer = document.createElement('div');
    textContainer.setAttribute('id', 'textContainer');

    textContainer.style.width = '45%';
    textContainer.style.margin = '0 15%';
    textContainer.appendChildAfter(headLine);

    // var codeContainer = document.createElement('div');
    // codeContainer.setAttribute('id', 'codeContainer');

    // codeContainer.style.width = '45%';
    // // textContainer.style.height = '50%';
    // codeContainer.style.margin = '0 15%';
    // codeContainer.appendChildAfter(headLine);

    var textIframeEditable = document.createElement('iframe');
    textIframeEditable.setAttribute('id', 'textIframe');
    textIframeEditable.setAttribute('name', 'textIframe');

    textIframeEditable.style.width = '100%';
    textIframeEditable.style.height = '400px';
    textIframeEditable.style.border = 'solid 1px grey ';
    textIframeEditable.style.backgroundColor = 'GhostWhite';
    textContainer.appendChild(textIframeEditable);

    var saveContainer = document.createElement('div');
    saveContainer.setAttribute('id', 'saveContainer');
    saveContainer.appendChildAfter(textIframeEditable);

    var input = document.createElement("input");
    input.setAttribute('id', 'inputFile');
    input.setAttribute('type', 'file');
    input.style.margin = '5px 0';
    saveContainer.appendChild(input);


    document.getElementById(args.selector).style.display = 'none';
    // codeContainer.style.display = 'none';
    textIframeEditable.contentDocument.designMode = 'on';

    //upload file in dom
    inputFile.onchange = function () {
      var file = document.getElementById('inputFile').files[0];
      var fileReader = new FileReader();

      if (file.type == 'text/html') {
        fileReader.onload = function (e) {

          var text = e.target.result;
          textIframeEditable.contentDocument.getElementsByTagName('body')[0].innerHTML = text;
        }
        fileReader.readAsText(file, "UTF-8");

      }

      else {
        alert('Please select HTML file !');
      }
    };

    //save file using URL
    for (e in buttonElements) {
      var saveElements = document.createElement(buttonElements[e].type);
      saveElements.setAttribute('title', buttonElements[e].command);
      saveElements.setAttribute('id', buttonElements[e].command);
      saveElements.style.marginLeft = '10px';

      saveContainer.appendChild(saveElements);
      saveElements.innerHTML = buttonElements[e].innerHTML;

      // var command = saveElements.getAttribute('title');

      if (buttonElements[e].type.indexOf('button') !== -1) {

        saveElements.onclick = function () {
          var commandId = this.getAttribute('id');

          if (commandId == 'save') {

            var saveText = textIframeEditable.contentDocument.getElementsByTagName('body')[0].innerHTML;

            var byteArray = new Uint8Array(saveText.length);
            for (var x = 0; x < byteArray.length; x++) {

              byteArray[x] = saveText.charCodeAt(x);
            }
            // saveText = saveText.replace(/\n/g, "\r\n");
            // var blob = new Blob([saveText], { type: "text/html" });

            var blob = new Blob([byteArray], { type: "text/html", endings: "native" });
            var fileName = "Enter FileName";
            var link = document.createElement('a');
            link.download = fileName;
            link.innerHTML = "Download file";

            if (window.URL != null) {
              link.href = window.URL.createObjectURL(blob);

            } else {
              link.href = window.URL.createObjectURL(blob);
              link.onclick = destroy;
              link.style.display = 'none';
              saveElements.appendChild(link);
            }
            link.click();

            function destroy(event) {
              saveElements.removeChild(event.target);
            };
          }


        }

      }

    }


    //create buttons for command
    for (el in textElements) {
      var thisElement;

      if (el > 0) {
        thisElement = element;
      }

      var element = document.createElement(textElements[el].type);
      element.setAttribute('title', textElements[el].command);

      if (textElements[el].type.indexOf('input') !== -1) {
        element.setAttribute('type', textElements[el].subtype);
      }

      if (el > 0) {
        element.appendChildAfter(thisElement);

      }
      else {
        element.appendChildBefore(textIframeEditable);

      }

      element.innerHTML = textElements[el].innerHTML;
      element.style.margin = '5px 2px';

      var textCommand;
      var commandValue = null;

      if (textElements[el].type.indexOf('button') !== -1) {

        var displayCode = false;
        var isPromptDisplay = false;


        element.onclick = function () {
          textCommand = this.getAttribute('title');

          if (textCommand == 'viewSourceCode') {
            displayCode = execViewSourceCommand(element, textIframeEditable, displayCode);

          } else {

            switch (textCommand) {

              case 'insertImage':
                commandValue = prompt('Enter image URL: ');
                isPromptDisplay = true;
                break;

              case 'createLink':
                commandValue = prompt('Enter URL: ');
                isPromptDisplay = true;
                break;

            }

            if ((commandValue !== null && isPromptDisplay) || !isPromptDisplay) {
              textIframe.document.execCommand(textCommand, false, commandValue);
              // console.log(textIframeEditable.contentDocument.getElementsByTagName('body')[0].textContent);


            }
          }
        };

      }
      else {
        if (isThisElement(textElements[el], 'fontName') || isThisElement(textElements[el], 'fontSize')) {

          for (var fontOption = 0 in textElements[el].options) {

            var createOptionTag = document.createElement('option');
            createOptionTag.appendChild(document.createTextNode(textElements[el].options[fontOption]));

            createOptionTag.value = textElements[el].options[fontOption];
            element.appendChild(createOptionTag);

          }
        }

        element.onchange = function () {
          textCommand = this.getAttribute('title');
          textIframe.document.execCommand(textCommand, false, this.value);


        };

      }

    }


  };


});