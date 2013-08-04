(function() {
'use static';
	var FirefoxIM = window.FirefoxIM || {};
	FirefoxIM.Views = FirefoxIM.Views || {};

	FirefoxIM.Views.ChatView = Backbone.View.extend({

		el: FirefoxIM.Templates.chatView(),

		events: {
			"click #chat-submit-text": "handleMessageInput",
			"click #chat-back-arrow": "loadChatList",
			"keyup #chat-input-textarea": "resizeInput"
		},

		initialize: function(model, options){
			this.chat = model;
			this.listenTo(this.chat, "change", function(model) {
				this.renderMessageList();
			});		
		},

				render: function(){
	      $(document.body).append(this.$el);
	      $('#chat-input-textarea')[0].style.height = "30px";
	      bottom = $('#chat-input-textarea').closest('form')[0].style.height = "30px"
	      this.renderMessageList();
	      return this;
		},

		renderMessageList: function() {
			var view = this;
			var shouldCallTrigger = false;
			messages = this.chat.get("messages");
			$('#chat-thread-list ul').empty();
			
			for(var i = 0; i< messages.length; i++){ 
				shouldCallTrigger = view.changeReadStatus(messages[i],shouldCallTrigger);
				view.renderMessage(messages[i]); 
			};
			
			if(shouldCallTrigger){
				this.chat.trigger("change",this.chat);
			}
		},

		renderMessage: function(message) {
			$('#chat-thread-list ul').append(FirefoxIM.Templates.chat(message));
		},
	
		changeReadStatus: function(message,shouldCallTrigger){
			if(message.userId != FirefoxIM.user.id && message.read === false){
				message.read = true;
				return true;
			}
		
			if(shouldCallTrigger === true)
				return true;

			return false;
		},

		handleMessageInput: function(e) {
			e.preventDefault();
			var text = $("#chat-input-textarea");
			this.chat.addMessage({
				userId: FirefoxIM.user.id,
				text: text.val(),
				time: Date.now(),
				read: false
			});
			text.val("");
		},

		loadChatList: function() {
			FirefoxIM.router.navigate("chatList", {trigger: true});
		},

    resizeInput: function(e){
    	var input = $('#chat-input-textarea')[0];
    	var bottom = $('#chat-input-textarea').closest('form')[0],
    			heightAdjustment  = (input.scrollHeight >= input.clientHeight) ?
        (input.scrollHeight) :
        (input.clientHeight);
      if (heightAdjustment > 110)  { heightAdjustment = 110 }
      input.style.height = heightAdjustment - 10 + "px";
      bottom.style.height = heightAdjustment + "px";
    }

	});
	window.FirefoxIM = FirefoxIM;
}())