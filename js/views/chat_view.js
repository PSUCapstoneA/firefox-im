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
				this.renderMessageList();
			});		
			
			//gets the latest userList
			FirefoxIM.userList  =  FirefoxIM.router.getUserList();
      		this.listenTo(FirefoxIM.userList,"add", function(){});
		},

		render: function(){
	      $(document.body).append(this.$el);
	      this.renderMessageList();
	      return this;
		},

		renderMessageList: function() {
			var view = this;
			var shouldCallTrigger = false;
			this.messages = this.chat.get("messages");
			$('#chat-thread-list ul').empty();
			
			for(var i = 0; i< this.messages.length; i++){ 
				shouldCallTrigger = view.changeReadStatus(this.messages[i],shouldCallTrigger);
				view.renderMessage(this.messages[i],i); 
			};
			
			if(shouldCallTrigger){
				this.chat.trigger("change",this.chat);
			}
		},

		renderMessage: function(message,messageArrayIndex) {
			$('#chat-thread-list ul').append(FirefoxIM.Templates.chat(message,messageArrayIndex));
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
				userId: this.chat.encodeHTML(FirefoxIM.user.id),
				text: this.chat.encodeHTML(text.val()),
				time: Date.now(),
				read: false
			});
			text.val("");
			
		},

		loadChatList: function() {
			if(!this.messages){
				var id = this.chat.get("id");
				var removeRef = new Firebase('https://psucapstone-a.firebaseio.com/chats/' + id ); 
				removeRef.remove();}
			FirefoxIM.router.navigate("chatList", {trigger: true});
		},

    remove: function() {
      this.stopListening(this.chat);
      Backbone.View.prototype.remove.call(this);
    }

	});
	window.FirefoxIM = FirefoxIM;
}());
