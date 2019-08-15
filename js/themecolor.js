var ColorSwitcher = new (function () {

  var themeColor = this;

  themeColor.init = function (colorSheets) {
    var codeOutput = document.getElementById('codeOutput');
    var tempCon = document.createDocumentFragment();

    var colorSwitcher = document.createElement("div");
    colorSwitcher.setAttribute('class', "ColorSwitcher");

    var controlBtn = document.createElement("button");
    controlBtn.setAttribute('class', "ColorSwitcher__control");
    controlBtn.setAttribute('title', 'ThemeColor');

    var colorSwitchs = document.createElement("div");
    colorSwitchs.setAttribute('class', "ColorSwitcher__switchs");


    colorSheets.forEach(function (colorSheet, index) {
      var colorSwitchColor;

      if (colorSheet.color && colorSheet.title && colorSheet.href) {
        colorSwitchColor = document.createElement("button");

        colorSwitchColor.setAttribute('class', "ColorSwitcher__switch");
        colorSwitchColor.title = colorSheet.title;
        colorSwitchColor.dataset.index = index;
        colorSwitchColor.style.backgroundColor = colorSheet.color;

        colorSwitchs.appendChild(colorSwitchColor);
      }
    });

    colorSwitchs.addEventListener("click", function (event) {
      var index;

      if (event.target.nodeName !== "BUTTON") {
        return;
      }

      index = event.target.dataset.index;
      codeOutput.style.backgroundColor = colorSheets[index].color;

      return false;
    });

    controlBtn.addEventListener("click", function (event) {
      event.target.parentElement.classList.toggle("ColorSwitcher--open");

      return false;
    });

    colorSwitcher.appendChild(controlBtn);
    colorSwitcher.appendChild(colorSwitchs);
    tempCon.appendChild(colorSwitcher);
    document.body.appendChild(tempCon);
  }


});