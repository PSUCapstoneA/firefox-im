(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.ChatListView = Backbone.View.extend({

    el: FirefoxIM.Templates.chatListView(),
    drawer: FirefoxIM.Templates.drawer,

    events: {
      "click .chat": "loadChatView",
      "click #chatlist-new-chat": "loadNewChatView",
      "click #chatlist-open-menu": "openMenu",
      "click #chatlist-close-menu": "closeMenu"
    },

    initialize: function(collection, options) {
      this.chatList = collection;
      this.listenTo(this.chatList, "add", this.addChat)
    },

    render: function() {
      $(document.body).append(this.drawer(FirefoxIM.user.id));
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

    openMenu: function(e) {
      e.preventDefault();
      var $sidebar = $('section[data-type="sidebar"]');
      $sidebar.addClass("open-drawer");
      $sidebar.one('click', '#chatlist-close-menu', this.closeMenu)
      $sidebar.one('click', 'li', this.navigate)
    },

    navigate: function(e) {
      e.preventDefault();
      var target = $(e.currentTarget).children('a').data('target');
      FirefoxIM.router.navigate(target, {trigger: true});
    },

    closeMenu: function(e) {
      e.preventDefault();
      $('section[data-type="sidebar"]').removeClass("open-drawer");
    },

    remove: function() {
      $('section[data-type="sidebar"]').remove();
      return Backbone.View.prototype.remove.call(this);
    }
  });

  window.FirefoxIM = FirefoxIM;
}())