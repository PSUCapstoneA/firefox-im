(function() {
  var FirefoxIM = window.FirefoxIM || {};

  FirefoxIM.Router = Backbone.Router.extend({
    
    initialize: function() {
      FirefoxIM.chatList = new FirefoxIM.Collections.ChatList(); 
      Backbone.history.start();
    },

    routes: {
      "chat/:id": "chat",
      "user/:id": "user",
      "settings/:id": "settings",
      "chatList/:id": "chatList",
      "*default": "chatList"
     /* "*default": "splashScreen" Enable this with splashScreen */
    },

    chatList: function(id) {
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
      // TODO get user credentials, install, and initialize firebase
    },

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