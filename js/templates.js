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

  //-----------------------------------------------------------New User Info Screen
  FirefoxIM.Templates.newUserInputs = function() {
    return $('<div id="newUserInputs">'
      + "<p> You are brand new user. Input user info.</p>"
      + '<br>'
      + '<label>username</label><input type="text" id="username"><br>'
      + '<label>e-mail</label><input type="text" id="email"><br>'
      + '<label>phone</label><input type="text" id="phone"><br>'
      + '<button id="submit">Submit</button>'
      + '</div>');
  };


  FirefoxIM.Templates.installButton = function() {
    return $('<button id="install"><span class="icon icon-menu">Install</span></button>');
  };

   //---------------------------------------------------------------Contacts

  FirefoxIM.Templates.contactView = function(contacts) {
     return $('<body role="application">' +
        '<section role="region">'+
        '<header>'+
           '<button id="back"><span class="icon icon-back">back</span></button>'+
           '<menu type="toolbar">'+
                '<button id="addUser"><span class="icon icon-add">add</span></button>'+
           '</menu>'+
           '<h1>Contact</h1>'+
        '</header>'+
          '<article id="users" data-type="list">'+
        '<ul>'+
        '</ul>'+
        '</article>'+
        '</section>');
  };

   FirefoxIM.Templates.userList = function(contact) {
      return $('<li class="user" data-user-id="' + contact + '">' +
        '<p>'+ contact + '</p>' +
        '</li>');
   }

   FirefoxIM.Templates.contact = function(users) {
    return _.reduce(users, function(memo,users) {
        return memo + FirefoxIM.Templates.userList(user);
      }, "");
  }

  //--------------------------------------------------------------- ChatList
  FirefoxIM.Templates.chatListView = function(chats) {
    return $('<section role="region" id="list-view">'
      + '<header>'
      + '<button id="chatlist-open-menu"><span class="icon icon-menu">menu</span></button>'
      + '<menu type="toolbar">'
      + '   <button id="contact"><span class="icon icon-user">user</span></button>'
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
      '<p>'+ chat.userId + '<span class="chatlist-timestamp"><span></p>'+
      '<p>'+chat.message.text +'</p>'+
      '</a>'+
      '</li>');
  };

  //-----------------------------------------------------------------User
  FirefoxIM.Templates.user = function() {  
    return $('<section role="region" id="list-view">'
      + '<header id="header-userId">'
      + '<button id="user-back-arrow"><span class="icon icon-back">back</span></button>'
      + '<h1>User Account Info </h1>'
      + '</header>'
      + '<div id="userInfo">'
      + '<label>username</label><input type="text" id="username"><br>'
      + '<label>e-mail</label><input type="text" id="email"><br>'
      + '<label>phone</label><input type="text" id="phone"><br>'
      + '<button id="submit">Submit</button>'
      + '</div>'
      + '</section>');
  }

  //-----------------------------------------------------------------Settings
  FirefoxIM.Templates.settings = function() { return $(
    '<form role="dialog" data-type="edit">'
  +'<section>'
  +'<header>'
  +'<button class="settings-close"><span class="icon icon-close">close</span></button>'
  +'<menu type="toolbar">'
  +'</menu>'
  +'<h1>Firefox IM Settings</h1>'
  +'</header>'
  +'</section>'
  +'<p>'
  +'<input type="text" placeholder="Placeholder" required="">'
  +'<button type="reset">Clear</button>'
  +'</p>'
  +'<p>'
  +'<textarea placeholder="Placeholder in textarea" required=""></textarea>'
  +'</p>'
  +'<p>'
  +'<input type="text" placeholder="Placeholder" value="Some written text" required="">'
  +'<button type="reset">Clear</button>'
  +'</p>'
  +'<menu>'
  +'<button id="settings-save">Save Settings</button>'
  +'<button class="settings-close">Cancel</button>'
  + '</menu>'
  +'</form>'); }
  
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
    +'<li><a href="#" data-target="settings">Settings</a></li>'
    +'<li><a href="#" data-target="logout">Log Out</a></li>'
    +'</nav>'
    +'</section>');
  };

  //------------------------------------------------------------------Chat
  FirefoxIM.Templates.chatView = function(chat) {
    return $('<section role="region" id="list-view">'
      + '<header id="header-userId">'
      + '<button id="chat-back-arrow"><span class="icon icon-back">back</span></button>'
      + '<menu type="toolbar"></menu>'
      + '<h1></h1>'
      + '</header>'   
      + '   <div id="chat-thread-box"></div>'   
      + '   <article id="chat-thread-list" data-type="list">'
      + '       <ul>'
      + '       </ul>'
      + '   </article>'
      + '<form role="search" class="bottom">'
      + '<button type="submit" id="chat-submit-text">Send</button>'
      + '<p>'
      + '<textarea placeholder="Message" required="" id="chat-input-textarea"></textarea>'
      + '</p>'
      + '</form>'
      + '</section>');
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

  var addDateEntryToMessageHTML = function(chatMessage,chatDate,isNewDate){
    if(isNewDate){
      previousDate = chatDate;
      dateEntry = '<li><p>' + getDateEntry(Date.now(), chatDate) + '</p></li>';
      chatMessage = dateEntry + chatMessage;
    }
    
    return chatMessage;
  }

  FirefoxIM.Templates.chat = function(chat,messageArrayIndex) {
    if(messageArrayIndex === 0){
      previousDate = null;
    }
    
    var chatDate = getDate(chat.time);
    var username = "you";
    
    if(chat.userId !== FirefoxIM.user.id){
      var user = FirefoxIM.userList.findWhere({id: chat.userId})
      username = user.get("username");
    }
    
    var chatMessageHTML = '<li data-id=' + chat.userId + ' id=' + chat.time + '><p>' + username + '</p><p>' + chat.text + '</p><p>' + getClockTime(chat.time) + '</p>';
    
    chatMessageHTML = addReadStatusToMessageHTML(chatMessageHTML,messageRead(chat))
      
    chatMessageHTML = addDateEntryToMessageHTML(chatMessageHTML,chatDate,isNewDate(chatDate))
    
    return $(chatMessageHTML);
  };

  window.FirefoxIM = FirefoxIM;
}());
