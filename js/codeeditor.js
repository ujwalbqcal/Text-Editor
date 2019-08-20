var codeEditor = new (function () {
  var codeInit = this;

  codeInit.init = function () {
    document.getElementById('text').style.display = 'block';
    document.getElementById('buttoncontainer').style.display = 'none';
    // document.getElementById('writeText').style.display = 'block';
    var topDiv = document.createElement('div');
    topDiv.setAttribute('id', 'topdiv');
    document.body.appendChild(topDiv);

    var title = document.createElement('p');
    title.setAttribute('class', 'ptag');
    title.innerHTML = 'Code Editor';
    title.style.textAlign = 'center';
    title.style.fontWeight = 'bold';
    title.style.fontSize = '20px';
    topDiv.appendChild(title);

    var input = document.createElement("input");
    input.setAttribute('id', 'inputFile');
    input.setAttribute('type', 'file');
    input.style.marginLeft = ' 34% ';
    topDiv.appendChild(input);

    var save = document.createElement("button");
    save.setAttribute('id', 'saveFile');
    // save.setAttribute('type', 'file');
    save.innerHTML = 'Save'
    save.style.marginLeft = ' 55px';
    topDiv.appendChild(save);

    var codeTitle = document.createElement('div');
    codeTitle.setAttribute('id', 'codeTitle');
    codeTitle.style.margin = '10px 0 0 150px';
    codeTitle.style.position = 'relative';
    codeTitle.style.display = 'flex';
    document.body.appendChild(codeTitle);

    var editor = document.createElement('textarea');
    editor.setAttribute('id', 'codeEditor');
    editor.setAttribute('placeholder', 'Write Here');
    editor.style.width = '500px';
    editor.style.minHeight = '600px';
    editor.style.overflow = 'auto';
    editor.style.border = '2px solid #34c70e';
    editor.style.marginRight = '55px';
    codeTitle.appendChild(editor);

    var codeOutput = document.createElement('div');
    codeOutput.setAttribute('id', 'codeOutput');
    codeOutput.innerHTML = 'Preview Here';
    codeOutput.style.border = '2px solid #34c70e';
    codeOutput.style.width = '500px';
    // codeOutput.style.height = '600px';
    codeOutput.style.overflow = 'auto';
    codeTitle.appendChild(codeOutput);

    var lineNumber = document.createElement('div');
    lineNumber.setAttribute('id', 'columnNumber');
    codeTitle.appendChild(lineNumber);

    var ul = document.createElement('ul');
    ul.setAttribute('id', 'popover');
    ul.setAttribute('class', 'typeahead');
    ul.style.position = 'absolute';
    ul.style.bottom = '130px';
    ul.style.left = '-115px';
    codeTitle.appendChild(ul);

    // var fontcolor = document.createElement('input');
    // fontcolor.setAttribute('id', 'fontcolor');
    // fontcolor.setAttribute('type', 'color');
    // fontcolor.setAttribute('value', '#ff0000');
    // topDiv.appendChild(fontcolor);

    var ulinput = document.createElement('ul');
    ulinput.setAttribute('id', 'listing');
    topDiv.appendChild(ulinput);


    window.addEventListener('click', function () {
      var classMapping = {
        'var': 'keyword',
        'const': 'keyword',
        'let': 'keyword',
        'function': 'keyword',
        'class': 'keyword',
        'if': 'keyword',
        'else': 'keyword',
        'for': 'keyword',
        'while': 'keyword',
        'switch': 'keyword',
        'case': 'keyword',
        'default': 'keyword',
        'break': 'keyword',
        'catch': 'keyword',
        'continue': 'keyword',
        'debugger': 'keyword',
        'delete': 'keyword',
        'do': 'keyword',
        'finally': 'keyword',
        'in': 'keyword',
        'new': 'keyword',
        'return': 'keyword',
        'this': 'keyword',
        'throw': 'keyword',
        'try': 'keyword',
        'typeof': 'keyword',
        'void': 'keyword',
        'charAt': 'keyword',
        'backgroundColor': 'keyword',
        'color': 'keyword',
        'fontSize': 'keyword',
        'text-align': 'keyword',
        'letter-sapcing': 'keyword',
        'word-spacing': 'keyword',
        'string': 'string',
        'number': 'number'

      };

      var operators = {
        '+': 'operator',
        '-': 'operator',
        '*': 'operator',
        '/': 'operator',
        '.': 'operator',
        '%': 'operator',
        '=': 'operator'

      };

      charSettings = {

        keyMap: [
          { open: "\"", close: "\"", canBreak: false },
          { open: "\'", close: "\'", canBreak: false },
          { open: "(", close: ")", canBreak: false },
          { open: "[", close: "]", canBreak: true },
          { open: "{", close: "}", canBreak: true }
        ]

      }

      var typeaheadKeys = Object.keys(classMapping).filter(key => classMapping[key] === 'keyword');
      var typeaheadKeyMethod = Object.keys(classMapping).filter(key => classMapping[key] === 'method');

      var editor = document.getElementById('codeEditor');
      var currentWord = '';
      var colorValue;

      editor.addEventListener('keyup', function (e) {
        if (e.Handled)
          return;

        generateOutput();
        newLine();
        e.Handled = true;
      });

      editor.addEventListener('keypress', function (event) {
        if (event.Handled)
          return;

        filter();
        enterKey(event);
        event.Handled = true;

      });

      editor.addEventListener('keydown', function (event) {
        if (event.Handled)
          return;

        currentWord = handleKeyPress(currentWord, event);
        var matches = checkTypeAhead(currentWord);
        generateTypeahead(matches);
        event.Handled = true;

      });

      //upload file in dom
      inputFile.onchange = function () {

        var file = document.getElementById('inputFile').files[0];
        var fileReader = new FileReader();

        if (file.type == 'text/javascript') {
          fileReader.onload = function (e) {
            editor.value = "";
            var text = e.target.result;
            editor.value = text;
          }
          fileReader.readAsBinaryString(file, "UTF-8");

        }
        else {
          alert('Please select JS file !');
        }
      };

      //save file using URL
      saveFile.onclick = function () {

        var output = document.getElementById('codeOutput');
        var saveText = output.innerText;

        var byteArray = new Uint8Array(saveText.length);
        for (var x = 0; x < byteArray.length; x++) {

          byteArray[x] = saveText.charCodeAt(x);
        }

        var blob = new Blob([byteArray], { type: "text/javascript", endings: "native" });
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
        // }

        function destroy(event) {
          saveElements.removeChild(event.target);
        };

      }

      //show output of textarea 
      function generateOutput() {
        var editor = document.getElementById('codeEditor');
        var output = document.getElementById('codeOutput');

        //split a string into an array of substrings, and returns the new array.
        var textInEditor = editor.value.split(/\n/);
        var endingCharacters = [';', ':', ',', '(', ')'];

        while (output.firstChild) {
          output.removeChild(output.firstChild);
        }

        for (var text of textInEditor) {
          var writeContainer = document.createElement('div');
          writeContainer.setAttribute('id', 'writeContainer');
          writeContainer.style.paddingLeft = '6px';

          // Regex to get words separated by spaces other than those in quotation marks
          var words = text.match(/(\".*?\"|\'.*?\'|[^\s]+)+(?=\s*|\s*$)/g) || [""];

          var background = words[0].split(/\b(backgroundColor:)\b/g);
          var bgColor = background[2];
          output.style.backgroundColor = bgColor;

          var font = words[0].split(/\b(color:)\b/g);
          var fontColor = font[2];
          output.style.color = fontColor;

          var fontSize = words[0].split(/\b(fontSize:)\b/g);
          var textSize = fontSize[2];
          output.style.fontSize = textSize + 'px';

          var fontAlign = words[0].split(/\b(text-align:)\b/g);
          var wordAlign = fontAlign[2];
          output.style.textAlign = wordAlign;

          var fontSpace = words[0].split(/\b(letter-spacing:)\b/g);
          var letterSpace = fontSpace[2];
          output.style.letterSpacing = letterSpace + 'px';

          var wordSpace = words[0].split(/\b(word-spacing:)\b/g);
          var fontSpace = wordSpace[2];
          output.style.wordSpacing = fontSpace + 'px';


          for (var word of words) {

            // var keyColor = words[0].split(/\b(keyColor)\b:/g);
            // var keywordColor = keyColor[2];

            if (word === '' && words.length === 1) {
              var blankLine = document.createElement('br');
              writeContainer.appendChild(blankLine);

            } else {
              var hasEndingCharacter = false;
              var endingCharacter = '';

              if (endingCharacters.includes(word[word.length - 1])) {

                endingCharacter = word[word.length - 1];
                word = word.slice(0, word.length - 1);
                hasEndingCharacter = true;
              }

              var content = document.createElement('span');

              //not to iterate text in output
              var text = (!hasEndingCharacter) ? word + ' ' : word;

              if (classMapping[word]) {
                content.setAttribute('class', classMapping[word]);
                // console.log(keywordColor);

              } else if (word.indexOf('\'') != -1 || word.indexOf('"') != -1) {
                content.setAttribute('class', classMapping['string']);

              } else if (!isNaN(word)) {
                content.setAttribute('class', classMapping['number']);
              } else if (operators[word]) {
                content.setAttribute('class', 'operator');
              }

              content.innerHTML = text;
              writeContainer.appendChild(content);

              if (hasEndingCharacter) {
                content = document.createElement('span');
                content.innerHTML = endingCharacter + ' ';
                writeContainer.appendChild(content);
              }

            }
          }
          output.appendChild(writeContainer);

        }
      }

      function checkTypeAhead(currentWord) {
        if (currentWord === '') return [];
        var matches = typeaheadKeys.filter(key => key.startsWith(currentWord));

        return matches;

      }

      // Create the typeahead options in list in the HTML
      function generateTypeahead(matches) {
        var popover = document.getElementById('popover');
        while (popover.firstChild) {
          popover.removeChild(popover.firstChild);
        }

        if (matches.length == 0) return;

        matches.map(match => {

          var option = document.createElement('li');
          option.style.listStyle = 'none';

          option.addEventListener('click', (e) => {
            var choosen = e.target.innerHTML;
            var remainingText = choosen.slice(currentWord.length);
            var caretPosition = editor.selectionStart;
            var editorText = editor.value;
            editor.value = editorText.substring(0, caretPosition) + remainingText + editorText.substring(caretPosition);
            generateOutput();
            while (popover.firstChild) {
              popover.removeChild(popover.firstChild);
            }

          });

          option.innerHTML = match;
          popover.appendChild(option);
        });
      }

      function filter() {
        var theCode = event.which || event.keyCode;

        if (theCode == 39 || theCode == 40 && event.which === 0) { return; }

        var _char = String.fromCharCode(theCode);

        for (i = 0; i < charSettings.keyMap.length; i++) {
          // if (charSettings.keyMap[i].close == _char) {
          //   var didClose = closedChar(charSettings.keyMap[i], event);

          //   if (!didClose && charSettings.keyMap[i].open == _char && autoBrace) {
          //     getBraces(charSettings.keyMap[i], event);
          //   }
          // } else if (charSettings.keyMap[i].open == _char && autoBrace) {
          //   getBraces(charSettings.keyMap[i], event);
          // }

          if (charSettings.keyMap[i].open == _char && autoBrace) {
            getBraces(charSettings.keyMap[i], event);

          }
        }
      }

      // To autopair braces
      function getBraces(_char, e) {
        preventDefaultEvent(e);

        var pos = getCursorPosition();
        var val = valueGet();
        var left = val.substring(0, pos),
          right = val.substring(pos);
        var edited = left + _char.open + _char.close + right;

        editor.value = edited;
        setCursor(pos + 1);
      }

      function setCursor(start, end) {
        if (!end) {
          end = start;
        }
        if (editor.setSelectionRange) {
          editor.focus();
          editor.setSelectionRange(start, end);
        }

      }

      function getCursorPosition() {

        if (typeof document.createElement('textarea').selectionStart === "number") {
          return editor.selectionStart;

        }
      }

      function valueGet() {
        return editor.value.replace(/\r/g, '');

      }

      //Move one line down when hit enter key between braces
      function enterKey(event) {
        var theCode = event.which || event.keyCode;

        if (theCode == 13) {
          preventDefaultEvent(event);

          var pos = getCursorPosition(),
            val = valueGet(),
            left = val.substring(0, pos),
            right = val.substring(pos),
            leftChar = left.charAt(left.length - 1),
            rightChar = right.charAt(0),
            ourIndent = "",
            closingBreak = "",
            newLine = "\n",
            tab = "\t",
            finalCursorPos,
            i;


          ourIndent = ourIndent;
          finalCursorPos = ourIndent.length + 1;
          for (i = 0; i < charSettings.keyMap.length; i++) {
            if (charSettings.keyMap[i].open == leftChar && charSettings.keyMap[i].close == rightChar) {
              closingBreak = newLine;
            }
          }

          var edited = left + newLine + ourIndent + closingBreak + (ourIndent.substring(0, ourIndent.length - tab.length)) + right;
          editor.value = edited;
          setCursor(pos + finalCursorPos);
        }

      }

      function handleKeyPress(currentWord, e) {
        var keycode = e.which || e.keyCode;
        var character = e.key;
        var isPrintable = isPrintableKeycode(keycode);
        var cursorPosition = editor.selectionStart;
        var cursorEndPosition = editor.selectionEnd;
        var pos = getCursorPosition();
        var cursorPositionLength = editor.selectionEnd - editor.selectionStart;
        switch (keycode) {

          case 9:
            preventDefaultEvent(e);

            var editorText = editor.value;
            editor.value = editorText.substring(0, cursorPosition) + "\t" + editorText.substring(cursorEndPosition);
            setCursor(pos + 1);

          case 13:

          case 32:
            // Space or newline was pressed, reset currentWord
            currentWord = '';
            break;

          case 8:
            // Backspace was pressed so remove the character
            if (cursorPosition === 0) {
              currentWord = '';
              break;
            }

            currentWord = currentWord.slice(0, currentWord.length - 1);
            break;
          default:
            if (isPrintable) {
              currentWord += character;
            }
            break;
        }
        return currentWord;
      }

    });

  }
})
