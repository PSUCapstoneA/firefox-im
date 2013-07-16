(function() {
  // Namespace FirefoxIM.Templates
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Templates = FirefoxIM.Templates || {};

  //---------------------------------------------------------------SplashScreen
  FirefoxIM.Templates.splashScreenView = function() {
    return $('<div style="text-align: center">'
      + '<img src="http://blog.ffextensionguru.com/images/firefox_logo-only_RGB.png" alt="Firefox" width="250" height="228">'
      + '<br>'
      + '<button id="signin">Login Using Persona</button>'
      + '</div>');
  }

  FirefoxIM.Templates.installButton = function() {
    return $('<button id="install"><span class="icon icon-menu">Install</span></button>');
  };

  //--------------------------------------------------------------- ChatList
  FirefoxIM.Templates.chatListView = function(chats) {
    return $('<section role="region" id="list-view">' +
      '<header>'+
      '   <menu type="toolbar">'+
      '      <button><span class="icon icon-menu">menu</span></button>'+
      '  </menu>'+
      '  <form action="#">'+
      '     <input type="text" placeholder="search" required="required">'+
      '     <button type="reset">Remove text</button>'+
      '  </form>'+
      '</header>'+
      '<article id="chats" data-type="list">'+
      '  <ul>'+
      '  </ul>'+
      '</article>'+
      '</section>');
  };

  FirefoxIM.Templates.chatList = function(chats) {
    return _.reduce(chats, function(memo, chat) { 
        return memo + FirefoxIM.Templates.chatListChat(chat);
      }, "");
  }

  FirefoxIM.Templates.chatListChat = function(chat) {
    return $('<li class="chat" data="'+ chat.id +'">'+
      '<a href="#">'+
      '<p>'+ chat.message.name +'<span class="chatlist-timestamp">'+ chat.message.timestamp +'<span></p>'+
      '<p>'+chat.message.text+'</p>'+
      '</a>'+
      '</li>');
  }

  window.FirefoxIM = FirefoxIM;
}());