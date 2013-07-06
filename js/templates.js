(function() {
  // Namespace FirefoxIM.Templates
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Templates = FirefoxIM.Templates || {};

  FirefoxIM.Templates.installButton = function() {
    return $('<button id="install"><span class="icon icon-menu">Install</span></button>');
  };
  
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
       _.reduce(chats, function(memo, chat) { 
        return memo + FirefoxIM.Templates.chatListChat(chat);
      }, "") +
      '  </ul>'+
      '</article>'+
      '</section>');
  };

  FirefoxIM.Templates.chatListChat = function(chat) {
    return $('<li class="chat" data="'+ chat.id +'">'+
      '<a href="#">'+
      '<p>'+ chat.name +'<span class="chatlist-timestamp">'+ chat.timestamp +'<span></p>'+
      '<p id="chat-'+chat.id+'">'+chat.message+'</p>'+
      '</a>'+
      '</li>');
  }

  window.FirefoxIM = FirefoxIM;
}());