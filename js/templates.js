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
  };

  FirefoxIM.Templates.installButton = function() {
    return $('<button id="install"><span class="icon icon-menu">Install</span></button>');
  };

  //--------------------------------------------------------------- ChatList
  FirefoxIM.Templates.chatListView = function(chats) {
    var $html = $('<section role="region" id="list-view">'
      + '<header>'
      + '<button id="chatlist-open-menu"><span class="icon icon-menu">menu</span></button>'
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
      return $html;
  };

  FirefoxIM.Templates.chatListChat = function(chat) {
    return $('<li class="chat" data-chat-id="'+ chat.id +'">'+
      '<a href="#">'+
      '<p>'+ chat.message.userId + '<span class="chatlist-timestamp"><span></p>'+
      '<p>'+chat.message.text +'</p>'+
      '</a>'+
      '</li>');
  };

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
  };

  var getClockTime = function(epochTime){
    return moment(epochTime).format("h:mm a");
  };
  
  var getDate = function(epochTime){
    return moment(epochTime).format("MMMM DD YYYY");
  };
  
  var getDateEntry = function(epochTimeForNow,firebaseEpochTime){
    var todayString = getDate(epochTimeForNow);
    var yesterdayString = moment(epochTimeForNow).subtract('days', 1).format("MMMM DD YYYY");
    var firebaseTimeString = getDate(firebaseEpochTime);
    
    if(firebaseTimeString == todayString)
      return "Today";
    else if(firebaseTimeString == yesterdayString)
      return "Yesterday";
    else
      return firebaseTimeString;
  };
  
  var previousDate = null;
  
  var isNewDate = function(dateString){
    if(previousDate == null)
      return true;
    
    if(dateString != previousDate)
      return true;
    else
      return false;
  };

  var messageRead = function(message){
    if(message.userId == FirefoxIM.user.id && message.read === true)
      return true;
    else 
      return false;
  };
  
  var addReadStatusToMessageHTML = function(chatMessage,messageAlreadyRead){
    if(messageAlreadyRead)
      chatMessage = chatMessage + '<p>Read</p>';
    else
      chatMessage = chatMessage + '</li>';
  
    return chatMessage;
  }

  FirefoxIM.Templates.chat = function(chat) {
    return $('<li data-id=' + chat.userId + '><p>' + chat.userId + '</p><p>' + chat.text + '</p></li>');
  };

  //-----------------------------------------------------------------Settings
  FirefoxIM.Templates.settings = function() { return $('<div/>'); }
  
  //-----------------------------------------------------------------User
  FirefoxIM.Templates.user = function() { return $('<div/>'); }

  //----------------------------------------------------------------Drawer

  FirefoxIM.Templates.drawer = function(userid) {
    return $('<section data-type="sidebar">'
    +'<header>'
    +'<menu type="toolbar">'
    +'<a href="#" id="chatlist-close-menu"><span class="icon icon-close">add</span></a>'
    +'</menu>'
    +'<h1>Firefox IM</h1>'
    +'</header>'
    +'<nav>'
    +'<ul>'
    +'<li><a href="#" data-target="user/' + userid + '">User</a></li>'
    +'<li><a href="#" data-target="user/' + userid + '/contacts">Contacts</a></li>'
    +'<li><a href="#" data-target="settings">Settings</a></li>'
    +'</nav>'
    +'</section>');
  };

  var addDateEntryToMessageHTML = function(chatMessage,chatDate,isNewDate){
    if(isNewDate){
      previousDate = chatDate;
      dateEntry = '<li><p>' + getDateEntry(Date.now(), chatDate) + '</p></li>';
      chatMessage = dateEntry + chatMessage;
    }
    
    return chatMessage;
  }

  FirefoxIM.Templates.chat = function(chat) {
    var chatDate = getDate(chat.time);
    var chatMessageHTML = '<li data-id=' + chat.userId + ' id=' + chat.time + '><p>' + chat.userId + '</p><p>' + chat.text + '</p><p>' + getClockTime(chat.time) + '</p>';
    
    chatMessageHTML = addReadStatusToMessageHTML(chatMessageHTML,messageRead(chat))
      
    chatMessageHTML = addDateEntryToMessageHTML(chatMessageHTML,chatDate,isNewDate(chatDate))
    
    return $(chatMessageHTML);
  };

  window.FirefoxIM = FirefoxIM;
}());