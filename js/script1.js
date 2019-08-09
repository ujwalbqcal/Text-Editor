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
    ul.style.bottom = '0';
    ul.style.left = '0';
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

      var typeaheadKeys = Object.keys(classMapping).filter(key => classMapping[key] === 'keyword');
      var editor = document.getElementById('codeEditor');
      var currentWord = '';


      editor.addEventListener('keyup', function (e) {
        generateOutput();
        newLine();

      });


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

          // count rows number           
          // var divHeight = count * 10;
          // console.log(divHeight);

          // var lineHeight = 10;
          // var linee = divHeight / lineHeight;
          // console.log(linee);

          // if (linee <= 1) {
          //   linee = 1;
          // }

          // for (i = 0; i < linee + 1; i++) {
          //   numeri += i + 1;
          //   nmr.push(numeri);
          // }

          // writeContainer.innerHTML = nmr[nmr.length - 2];




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

    });

  }
})
