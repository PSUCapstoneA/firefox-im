'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};


FirefoxIM.ChatView = Backbone.View.extend({

	initialize: function(){

		var viewObject = this;
		
		this.options.firebase.on('value', function(dataSnapshot) {
			var messages = dataSnapshot.val();
			if(messages != null){
				for (var property in messages){
						var idAttr = "\"" + property + "\""; 
						var name = messages[property].userID;			
						var text = FirefoxIM.encodeHTML(messages[property].chatText);	
						if(!viewObject.hasMessageAlready(property))
							viewObject.render(name,text,idAttr);
				}	
			}
		});		
	},

	render: function(name, text, idAttr){
		this.addReceivedMessage(name,text,idAttr);          
	},	

	addReceivedMessage: function(name, text, idAttr){
		$('#threads ul').append('<li id=' + idAttr + '><p>' + name + '</p><p>' + text + '</p></li>');
	},   

	hasMessageAlready: function(idAttr){
		if($("#" + idAttr).length > 0)
			return true;
		else
			return false;
	}

});

//putChat takes a message as an argument and then places the message in the chatList 
//collection 
FirefoxIM.putChat = function(chat){
	
	FirefoxIM.chats.add(chat);
}

FirefoxIM.encodeHTML = function(s) {
   return s.replace(/&[^(amp;)(lt;)(quot;)(gt;)(nbsp;)]/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/ /, '&nbsp;');
}

//setChat function takes the value for name and text puts them into the chat model and
//then calls the putChat function to place the chat into the chats collection
FirefoxIM.setChat = function (){
	var userID = FirefoxIM.encodeHTML($('#user').val());
	var chatText = FirefoxIM.encodeHTML($('#chatText').val());
	FirefoxIM.chat.set({userID: userID, chatText: chatText});
	FirefoxIM.putChat(FirefoxIM.chat);	
	
}
window.FirefoxIM = FirefoxIM;