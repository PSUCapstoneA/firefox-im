(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.ChatListView = Backbone.View.extend({

    el: FirefoxIM.Templates.chatListView(),

    events: {
      "click .chat": "loadChatView",
      "click #chatlist-new-chat": "loadNewChatView"
    },

    initialize: function(collection, options) {
      this.listenTo(collection, "add", this.addChat)
    },

    render: function() {
      $(document.body).append(this.$el);
      return this;
    },

    addChat: function(chat) {
      $('#chats ul').append(FirefoxIM.Templates.chatListChat({
        id: chat.get("id"),
        message: chat.get("messages")
      }));
    },

    loadChatView: function(e) {
      var id = $(e.currentTarget).closest('.chat').data("chatID");
      FirefoxIM.router.navigate("chat/" + id, {trigger: true});
    },

    loadNewChatView: function(e) {
      e.preventDefault();
      FirefoxIM.router.navigate("chat", {trigger: true});
    }

  });

  window.FirefoxIM = FirefoxIM;
}())