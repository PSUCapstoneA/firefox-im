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
      "chat"    : "newChat",
      "user/:id": "user",
      "settings": "settings",
      "chatList": "chatList",
      "*default": "splashScreen"
    },

    chatList: function() {
      this.renderParentView(FirefoxIM.Views.ChatListView, this.getChatList());
    },

    chat: function(chatId) {
      var chat = this.getChatList().findWhere({id: chatId});
      this.renderParentView(FirefoxIM.Views.ChatView, chat);
    },

    newChat: function() {
      this.getChatList().add(new FirefoxIM.Models.Chat());
      this.renderParentView(FirefoxIM.Views.ChatView, _.last(this.getChatList().models));
    },

    user: function(id) {
      this.renderParentView(FirefoxIM.UserView, {});
    },

    settings: function() {
      this.renderParentView(FirefoxIM.SettingsView, {});
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