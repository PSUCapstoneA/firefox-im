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
      this.chatList = collection;
      this.listenTo(this.chatList, "add", this.addChat)
    },

    render: function() {
      $(document.body).append(this.$el);
      this.renderChatList();
      return this;
    },

    renderChatList: function() {
      var view = this;
      $('#chats ul').empty();
      this.chatList.each(this.addChat);
    },

    addChat: function(chat) {
      var id = chat.get("id"),
        message = _.last(chat.get("messages"))
      if (!id || !message) { return; /* Bad or Empty message */ }

      $('#chats ul').append(FirefoxIM.Templates.chatListChat({
        id: id,
        message: message
      }));
    },

    loadChatView: function(e) {
      e.preventDefault();
      var id = $(e.currentTarget).closest('.chat').data("chatId");
      FirefoxIM.router.navigate("chat/" + id, {trigger: true});
    },

    loadNewChatView: function(e) {
      e.preventDefault();
      FirefoxIM.router.navigate("chat", {trigger: true});
    },

    remove: function() {
      this.stopListening(this.chatList);
      Backbone.View.prototype.remove.call(this);
    }

  });

  window.FirefoxIM = FirefoxIM;
}())