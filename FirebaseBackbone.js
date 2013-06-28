'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};

//the chat model.  our model will contain a userName and text to start. 
var Chat =  Backbone.Model.extend({
	
});
//the user model will contain the chat Id's  for this specific member
var User = Backbone.Model.extend({
	
});

//Chatlist list is the collection of chats backed by 'Firebase' any chat
//that is added to the collection will be automatically synched with the firebase

var ChatList = Backbone.Firebase.Collection.extend({

	//Reference to this collection's model.
	model: Chat,
	//Save all of the message items in a Firebase.
	firebase: new Firebase("http://psucapstone-a.firebaseio.com/chats")

});


//UserList is a colelction of Users  backed by 'Firebase' any user
//that is added to the collection will be automatically synched with the firebase
var ChatView = Backbone.View.extend({

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

//var user = new User;
//var users = new UserList;
var chat = new Chat;
var chats = new ChatList;

//putChat takes a message as an argument and then places the message in the chatList 
//collection 
FirefoxIM.putChat = function(chat){
	
	chats.add(chat);
}

//setChat function takes the value for name and text puts them into the chat model and
//then calls the putChat function to place the chat into the chats collection
FirefoxIM.setChat = function (){
	var userID = $('#user').val();
	var chatText = $('#chatText').val();
	chat.set({userID: userID, chatText: chatText});
	FirefoxIM.putChat(chat);	
	//FirefoxIM.userSet(chat);
}

// the userSet function is responsible for storing the chat id's to the user model for specific user names
// so later they can be displayed later 
/*FirefoxIM.userSet = function(){
	
	FirefoxIM.putUser(user);
}

//put user is responsible for putting the information in the user model into the users collection
FirefoxIM.putUser = function(user){

	users.add(user)
}


FirefoxIM.getChat = function(){
	this.options.firebase.on('child_added', function(childSnapshot, prevChildName){
		 var newchat = childSnapshot.val();
		 chatView.render(newChat.name, newChat.text);
	});
}
*/
