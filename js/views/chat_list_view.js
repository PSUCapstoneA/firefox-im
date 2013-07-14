(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.ChatListView = Backbone.View.extend({

    el: FirefoxIM.Templates.chatListView(),

    events: {
      "click .chat": "loadChatView",
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
        message: chat.get("messages")[0]
      }));
    },

    loadChatView: function(e) {
      var id = $(e.currentTarget).closest('.chat').data("chatID");
      Backbone.router.navigate("chat/" + id, {trigger: true});
    }

  });

  window.FirefoxIM = FirefoxIM;
}())