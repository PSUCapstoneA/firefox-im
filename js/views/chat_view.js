(function() {
'use static';
	var FirefoxIM = window.FirefoxIM || {};
	FirefoxIM.Views = FirefoxIM.Views || {};

	FirefoxIM.Views.ChatView = Backbone.View.extend({

		el: FirefoxIM.Templates.chatView(),

		events: {
			"click #chat-submit-text": "handleMessageInput",
			"click #chat-back-arrow": "loadChatList"
		},

		initialize: function(model, options){
			this.chat = model;
			this.listenTo(this.chat, "change", function(model) {
				this.renderMessage(_.last(model.get("messages")))
			});		
		},

		render: function(name, text, idAttr){
	      $(document.body).append(this.$el);
	      this.renderMessageList();
	      return this;
		},

		renderMessageList: function() {
			var view = this,
				messages = this.chat.get("messages");
			$('#chat-thread-list ul').empty();
			_.each(messages, function(message) { view.renderMessage(message); });
		},

		renderMessage: function(message) {
			$('#chat-thread-list ul').append(FirefoxIM.Templates.chat(message));
		},

		handleMessageInput: function(e) {
			e.preventDefault();
			var text = $("#chat-input-textarea");
			this.chat.addMessage({
				userId: FirefoxIM.user.id,
				text: text.val()
			});
			text.val("");
		},

		loadChatList: function() {
			FirefoxIM.router.navigate("chatList", {trigger: true});
		},

    remove: function() {
      this.stopListening(this.chat);
      Backbone.View.prototype.remove.call(this);
    }

	});
	window.FirefoxIM = FirefoxIM;
}())