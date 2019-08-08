var codeEditor = new (function () {
  var codeInit = this;

  codeInit.init = function () {
    document.getElementById('text').style.display = 'block';
    document.getElementById('buttoncontainer').style.display = 'none';
    // document.getElementById('writeText').style.display = 'block';

    var codeTitle = document.createElement('div');
    codeTitle.setAttribute('id', 'codeTitle');
    codeTitle.style.margin = '100px';
    codeTitle.style.position = 'relative';
    codeTitle.style.display = 'flex';
    document.body.appendChild(codeTitle);

    var editor = document.createElement('textarea');
    editor.setAttribute('id', 'codeEditor');
    editor.style.width = '500px';
    editor.style.height = '400px';
    editor.style.border = '1px solid #34c70e';
    editor.style.marginRight = '45px';
    codeTitle.appendChild(editor);

    var codeOutput = document.createElement('div');
    codeOutput.setAttribute('id', 'codeOutput');
    codeOutput.innerHTML = 'Preview Here';
    codeOutput.style.border = '1px solid #34c70e';
    codeOutput.style.width = '400px';
    codeOutput.style.height = '400px';
    codeTitle.appendChild(codeOutput);

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

      var editor = document.getElementById('codeEditor');
      var currentWord = '';

      editor.addEventListener('keyup', function (e) {
        generateOutput();

      });


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

    });

  }
})
