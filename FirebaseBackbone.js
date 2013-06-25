'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};

//the message model.  our model will contain a name and text to start. 
var Chat =  Backbone.Model.extend({
	
});

var User = Backbone.Model.extend({
	
});

//Message list is the collection of messages  backed by 'Firebase'
var ChatList = Backbone.Firebase.Collection.extend({

	//Reference to this collection's model.
	model: Chat,
	//Save all of the message items in a Firebase.
	firebase: new Firebase("http://psucapstone-a.firebaseio.com/chats")

});

var UserList = Backbone.Firebase.Collection.extend({
	model: User,

    firebase: new Firebase("http://psucapstone-a.firebaseio.com/users")
});


var user = new User;
var users = new UserList;
var chat = new Chat;
var chats = new ChatList;


//putChat takes a message as an argument and then places the message in the message list 
//collection 
FirefoxIM.putChat = function(chat){
	
	chats.add(chat);
}

//setMessage function takes the value for name and text puts them into the message model and
//then calls the putMessage function to place the message into the message collection
FirefoxIM.setChat = function (){
	var userID = $('#user').val();
	var chatText = $('#chatText').val();
	chat.set({userID: userID, chatText: chatText});
	FirefoxIM.putChat(chat);	
	FirefoxIM.userSet(chat);
}

FirefoxIM.userSet = function(){
	
	FirefoxIM.putUser(user);
}

FirefoxIM.putUser = function(user){

	users.add(user)
}



