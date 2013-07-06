(function() {
'use static';
var FirefoxIM = window.FirefoxIM || {};
FirefoxIM.Views = FirefoxIM.Views || {};

FirefoxIM.Views.ChatListView = Backbone.View.extend({

  el: FirefoxIM.Templates.chatListView(),

  events: {
    "click .chat": "loadChatView",
    "click #search": "loadSearchAndAutocomplete",
    "scroll #chats": "loadMoreChats"
  },

  emptyChat: {
    name: "",
    timestamp: "",
    id: -1,
    message: "You haven't sent any messages yet."
  },

  initialize: function(collection, options) {
    if (collection.length < 1) {
      this.chats = this.emptyChat;
    } else {
      this.chats = collection.filter(function(chat) {
        //TODO this integerates with user
        //return (chat.userID == options.userID);
        return true;
      });
    }
  },

  render: function() {
    $(document.body).append(this.$el);
    $('#chats').append(FirefoxIM.Templates.chatListChat(this.chats));
    return this;
  },

  loadChatView: function(e) {
    var id = $(e.currentTarget).closest('.chat').data("userID");
    Backbone.router.navigate("chat/" + id, {trigger: true});
  },

  loadMoreChats: function () {
    //TODO
  },

  loadSearchAndAutocomplete: function() {
    //TODO
  }

});

window.FirefoxIM = FirefoxIM;
}())