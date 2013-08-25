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
      "logout"  : "logout",
      "newUser" : 'newUserInput',
      "*default": "splashScreen"
    },

    chatList: function() {
      this.renderParentView(FirefoxIM.Views.ChatListView, this.getChatList());
    },

    chat: function(chatId) {
      var chat = this.getChatList().findWhere({id: chatId});
      this.renderParentView(FirefoxIM.Views.ChatView, chat);
    },

    userList: function(id){
    	var userList = this.getUserList();
    	this.renderParentView(FirefoxIM.Views.ContactView, userList);
    },

    newChat: function(id) {
      var authUsers ={};
      authUsers[FirefoxIM.user.id] = true;
      authUsers[id] = true;
      this.getChatList().add(new FirefoxIM.Models.Chat({authUsers:authUsers}));
      this.renderParentView(FirefoxIM.Views.ChatView, _.last(this.getChatList().models));
    },

    user: function(id) {
      var user = FirefoxIM.userList.findWhere({"id": id})
      this.renderParentView(FirefoxIM.Views.UserView, user);
    },

    settings: function(id) {
      this.renderParentView(FirefoxIM.Views.SettingsView, this.getUser(id));
    },

    newUserInput: function(){
      this.renderParentView(FirefoxIM.Views.NewUserInputView, {});
    },

    splashScreen: function() {
      FirefoxIM.userList  =  FirefoxIM.router.getUserList();
      this.listenTo(FirefoxIM.userList,"add", function(){});
      this.renderParentView(FirefoxIM.Views.SplashScreenView, this.firebaseRef, {
        logout: false
      });
    },

    logout: function () {
      this.renderParentView(FirefoxIM.Views.SplashScreenView, this.firebaseRef, {
        logout: true
      });
    },

    // ----------------------------------------------------Helpers
    getUser: function(userId) {
      return this.firebaseRef.child('users/' + userId);
    },

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
