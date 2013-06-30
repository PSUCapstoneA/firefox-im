'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};


FirefoxIM.ChatView = Backbone.View.extend({

	initialize: function(){

		var viewObject = this;
		this.options.firebase.on('child_added', function(childSnapshot, prevChildName) {
			var newMessage = childSnapshot.val();
			viewObject.render(newMessage.userID,newMessage.chatText);
		});
	},

	render: function(name, text){
		this.addReceivedMessage(name,text);          
	},	

	addReceivedMessage: function(name, text){
		$('#threads ul').append('<li><p>' + name + '</p><p>' + text + '</p></li>');
	}   

});
//putChat takes a message as an argument and then places the message in the chatList 
//collection 
FirefoxIM.putChat = function(chat){
	
	FirefoxIM.chats.add(chat);
}

FirefoxIM.encodeHTML = function(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/, '&gt;').replace(/ /, '&nbsp;');
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