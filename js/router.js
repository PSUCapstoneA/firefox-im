(function() {
  var FirefoxIM = window.FirefoxIM || {};

  // TODO: Router is currently stateless. Cache views for faster
  // switching
  FirefoxIM.Router = Backbone.Router.extend({
    
    initialize: function() {
      this.firebaseRef = new Firebase("https://psucapstone-a.firebaseio.com");
    },

    routes: {
      "chat/:id": "chat",
      "chat/newchat/:id"    : "newChat",
      "users/:id/contacts": "userList",
      "user/:id": "user",
      "settings": "settings",
      "chatList": "chatList",
      "*default": "splashScreen"
    },

    chatList: function() { 
      //var userId = FirefoxIM.user.id;
      //this.getUserList().add(new FirefoxIM.Models.User());
      this.renderParentView(FirefoxIM.Views.ChatListView, this.getChatList());
    },

    chat: function(chatId) {
      var chat = this.getChatList().findWhere({id: chatId});
      this.renderParentView(FirefoxIM.Views.ChatView, chat);
    },
    userList: function(id) {
      var userList = this.getUserList();
      this.renderParentView(FirefoxIM.Views.ContactView, userList);
    },

    newChat: function(userId) {
      var name = FirefoxIM.user.id;
      this.getChatList().add(new FirefoxIM.Models.Chat({authUser:[name,userId]}));
      this.renderParentView(FirefoxIM.Views.ChatView, _.last(this.getChatList().models));
    },

    user: function(id) {
      this.renderParentView(FirefoxIM.Views.UserView, {});
    },

    settings: function() {
      this.renderParentView(FirefoxIM.Views.SettingsView, {});
    },

    splashScreen: function() {
      this.renderParentView(FirefoxIM.Views.SplashScreenView, this.firebaseRef)
    },

    // ----------------------------------------------------Helpers
    getChatList: function() {
      FirefoxIM.chatList = FirefoxIM.chatList || new FirefoxIM.Collections.ChatList(undefined, {
        firebase: this.firebaseRef.child('chats')
      }); 
      return FirefoxIM.chatList;
    },

    getUserList: function() {
      FirefoxIM.userList = FirefoxIM.userList || new FirefoxIM.Collections.UserList(undefined, {
        firebase: this.firebaseRef.child('users')
      });
      return FirefoxIM.userList;
    },

    renderParentView: function(view, data, options) {
      if (this.currentView) {
        this.currentView.remove();
      }
      
      if (!FirefoxIM.user) {
        this.navigate("/", {trigger: true});
      }
      
      this.currentView = new view(data, options);
      this.currentView.render();
    }
  });

  window.FirefoxIM = FirefoxIM
}());
