(function() {
  // Namespace FirefoxIM.Templates
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Templates = FirefoxIM.Templates || {};

  //---------------------------------------------------------------SplashScreen
  FirefoxIM.Templates.SplashScreenView = function() {
    return $('<body bgcolor="00CCFF">'
      + '<div style="text-align: center">'
      + '<img src="http://blog.ffextensionguru.com/images/firefox_logo-only_RGB.png" alt="Firefox" width="250" height="228">'
      + '<br>'
      + '<button id="signin">Login Using Persona</button>'
      + '</div>');
  }

  FirefoxIM.Templates.installButton = function() {
    return $('<button id="install"><span class="icon icon-menu">Install</span></button>');
  };

  }

  window.FirefoxIM = FirefoxIM;
}());