(function() {

'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};
FirefoxIM.Collections = FirefoxIM.Collections || {};

//Chatlist list is the collection of chats backed by 'Firebase' any chat
//that is added to the collection will be automatically synched with the firebase

FirefoxIM.Collections.ChatList = Backbone.Firebase.Collection.extend({
	//Reference to this collection's model.
	model: FirefoxIM.Chat,
	//Save all of the message items in a Firebase.
});

window.FirefoxIM = FirefoxIM;
}())