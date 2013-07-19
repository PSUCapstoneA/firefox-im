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
    return $('<section role="region" id="list-view">'
      + '<header>'
      + '<button><span class="icon icon-menu">menu</span></button>'
      + '<menu type="toolbar">'
      + '  <a href="#" id="chatlist-new-chat"><span class="icon icon-compose">compose</span></a>'
      + '         </menu>'
      + '         <h1>Messages</h1>'
      + '     </header>'   
      + '</header>'
      + '<article id="chats" data-type="list">'
      + '  <ul>'
      + '  </ul>'
      + '</article>'
      + '</section>');
  };

  FirefoxIM.Templates.chatListChat = function(chat) {
    return $('<li class="chat" data-chat-id="'+ chat.id +'">'+
      '<a href="#">'+
      '<p>'+ chat.message.userId + '<span class="chatlist-timestamp"><span></p>'+
      '<p>'+chat.message.text +'</p>'+
      '</a>'+
      '</li>');
  }

  //------------------------------------------------------------------Chat
  FirefoxIM.Templates.chatView = function(chat) {
    return $('<section role="region" id="list-view">'
      + '<header>'
      + '<button id="chat-back-arrow"><span class="icon icon-back">back</span></button>'
      + '<menu type="toolbar">'
      + '  <a href="#" id="chat-add-user"><span class="icon icon-add">add</span></a>'
      + '         </menu>'
      + '         <h1>You and ?</h1>'
      + '     </header>'   
      + '   <div id="chat-thread-box"></div>'   
      + '     <article id="chat-thread-list" data-type="list">'
      + '       <ul>'
      + '       </ul>'
      + '     </article>'
      +  '<form role="search" class="bottom">'
      + '<button type="submit" id="chat-submit-text">Send</button>'
      + '<p>'
      + '<textarea placeholder="Message" required="" id="chat-input-textarea"></textarea>'
      + '</p>'
      + '</form>'
      + '  </section>');
  }

  FirefoxIM.Templates.chat = function(chat) {
    return $('<li data-id=' + chat.userId + '><p>' + chat.userId + '</p><p>' + chat.text + '</p></li>');
  }

  window.FirefoxIM = FirefoxIM;
}());