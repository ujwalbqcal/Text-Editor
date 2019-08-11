var codeEditor = new (function () {
  var codeInit = this;

  codeInit.init = function () {
    document.getElementById('text').style.display = 'block';
    document.getElementById('buttoncontainer').style.display = 'none';
    // document.getElementById('writeText').style.display = 'block';

    var title = document.createElement('p');
    title.innerHTML = 'Code Editor';
    title.style.textAlign = 'center';
    title.style.fontWeight = 'bold';
    title.style.fontSize = '22px';
    document.body.appendChild(title);

    var codeTitle = document.createElement('div');
    codeTitle.setAttribute('id', 'codeTitle');
    codeTitle.style.margin = '10px 0 0 150px';
    codeTitle.style.position = 'relative';
    codeTitle.style.display = 'flex';
    document.body.appendChild(codeTitle);

    var editor = document.createElement('textarea');
    editor.setAttribute('id', 'codeEditor');
    editor.style.width = '500px';
    editor.style.height = '520px';
    editor.style.border = '2px solid #34c70e';
    editor.style.marginRight = '55px';
    codeTitle.appendChild(editor);

    var codeOutput = document.createElement('div');
    codeOutput.setAttribute('id', 'codeOutput');
    codeOutput.innerHTML = 'Preview Here';
    codeOutput.style.border = '2px solid #34c70e';
    codeOutput.style.width = '400px';
    codeOutput.style.height = '520px';
    codeTitle.appendChild(codeOutput);

    var lineNumber = document.createElement('div');
    lineNumber.setAttribute('id', 'columnNumber');
    codeTitle.appendChild(lineNumber);

    var ul = document.createElement('ul');
    ul.setAttribute('id', 'popover');
    ul.setAttribute('class', 'typeahead');
    ul.style.position = 'absolute';
    ul.style.bottom = '30px';
    ul.style.left = '0px';
    codeTitle.appendChild(ul);


    document.addEventListener('click', function () {

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
        'string': 'string',
        'number': 'number'

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
      var editor = document.getElementById('codeEditor');
      var autoBrace = true;
      var currentWord = '';

      editor.addEventListener('keyup', function (e) {
        currentWord = handleKeyPress(currentWord, e);
        var matches = checkTypeAhead(currentWord);
        generateTypeahead(matches);
        generateOutput();
        newLine();
      });


      editor.addEventListener('keypress', function (event) {
        if (event.Handled)
          return;
        filter();
        event.Handled = true;

      });

      function filter() {

        var theCode = event.which || event.keyCode;

        if (theCode == 39 || theCode == 40 && event.which === 0) { return; }

        var _char = String.fromCharCode(theCode);
        var i;

        for (i = 0; i < charSettings.keyMap.length; i++) {

          if (charSettings.keyMap[i].open == _char && autoBrace) {
            getBraces(charSettings.keyMap[i], event);

          }
        }

      }


      function getBraces(_char, e) {
        preventDefaultEvent(e);

        var pos = getCursorPosition();
        var val = valueGet();
        var left = val.substring(0, pos),
          right = val.substring(pos);
        var edited = left + _char.open + _char.close + right;

        editor.value = edited;
      }


      function preventDefaultEvent(e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
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

          for (let word of words) {
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
              } else if (word.indexOf('\'') != -1 || word.indexOf('"') != -1) {
                content.setAttribute('class', classMapping['string']);

              } else if (!isNaN(word)) {
                content.setAttribute('class', classMapping['number']);
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

      // Create the typeahead options in the HTML
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

      function handleKeyPress(currentWord, e) {
        var keycode = e.which || e.keyCode;
        var character = e.key;
        var isPrintable = isPrintableKeycode(keycode);
        var cursorPosition = editor.selectionStart;
        // var cursorPositionLength = editor.selectionEnd - editor.selectionStart;
        switch (keycode) {
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

    });

  }
})
