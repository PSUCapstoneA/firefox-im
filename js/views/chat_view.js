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
			this.listenTo(this.chat, "change", this.renderChat)		
		},

		render: function(name, text, idAttr){
	      $(document.body).append(this.$el);
	      return this;
		},

		renderChat: function(chat) {
			$('#chat-thread-list ul').append(FirefoxIM.Templates.chat(
				_.last(chat.get("messages"))
			));
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
		}

	});
	window.FirefoxIM = FirefoxIM;
}())