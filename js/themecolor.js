var ColorSwitcher = new (function () {

  var themeColor = this;

  themeColor.init = function (colorSheets) {
    var codeOutput = document.getElementById('codeOutput');

    if (Object.prototype.toString.call(colorSheets) !== "[object Array]") {
      return;
    }

    var tempCon = document.createDocumentFragment();

    var colorSwitcher = document.createElement("div");
    colorSwitcher.setAttribute('class', "ColorSwitcher");

    var controlBtn = document.createElement("button");
    controlBtn.setAttribute('class', "ColorSwitcher__control");

    var colorSwitchs = document.createElement("div");
    colorSwitchs.setAttribute('class', "ColorSwitcher__switchs");

    var linkHolderHtml = document.createElement("link");
    linkHolderHtml.rel = "stylesheet";
    linkHolderHtml.id = "ColorSwitcherLinkHolder";
    document.head.appendChild(linkHolderHtml);

    // var linkHolder = document.getElementById("ColorSwitcherLinkHolder");

    colorSheets.forEach(function (colorSheet, index) {
      var colorSwitch;

      if (colorSheet.color && colorSheet.title && colorSheet.href) {
        colorSwitch = document.createElement("button");

        colorSwitch.setAttribute('class', "ColorSwitcher__switch");
        colorSwitch.title = colorSheet.title;
        colorSwitch.dataset.index = index;
        colorSwitch.style.backgroundColor = colorSheet.color;

        colorSwitchs.appendChild(colorSwitch);
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