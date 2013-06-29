'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};

//Chatlist list is the collection of chats backed by 'Firebase' any chat
//that is added to the collection will be automatically synched with the firebase

FirefoxIM.ChatList = Backbone.Firebase.Collection.extend({

	//Reference to this collection's model.
	model: FirefoxIM.Chat,
	//Save all of the message items in a Firebase.
	firebase: new Firebase("http://psucapstone-a.firebaseio.com/chats")

});

FirefoxIM.chats = new FirefoxIM.ChatList();

window.FirefoxIM = FirefoxIM;
