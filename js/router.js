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
      "user/:id": "user",
      "settings": "settings",
      "chatList": "chatList",
      "*default": "splashScreen"
    },

    chatList: function(id) {
      FirefoxIM.chatList = FirefoxIM.chatList || new FirefoxIM.Collections.ChatList(undefined, {
        firebase: this.firebaseRef.child('chats')
      }); 
      this.renderParentView(FirefoxIM.Views.ChatListView, FirefoxIM.chatList);
    },

    chat: function(id) {
      this.renderParentView(FirefoxIM.ChatView, {});
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

    renderParentView: function(view, data, options) {
      if (this.currentView) {
        this.currentView.remove();
      }
      this.currentView = new view(data, options);
      this.currentView.render();
    }
  });

  window.FirefoxIM = FirefoxIM
}());