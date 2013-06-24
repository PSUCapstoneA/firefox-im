'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};

//the message model.  our model will contain a name and text to start. 
var Message =  Backbone.Model.extend({
	/*defaults: function(){
		return{
		name: "",
		text: "",
		viewed: false
		}
	},

	initialize: function(){
		if (!this.get("name")){
			alert("Error name required to post message!" );
		}, 

	toggle: function() {
			this.set({viewed: !this.get("viewed")});
		}*/

});

//Message list is the collection of messages  backed by 'Firebase'
var MessageList = Backbone.Firebase.Collection.extend({

	//Reference to this collection's model.
	model: Message,

	//Save all of the message items in a Firebase.
	firebase: new Firebase("http://psucapstone-a.firebaseio.com/"),

	/*viewed: function(){
	
	}*/

});
var message = new Message;
var messages = new MessageList;


//putMessage takes a message as an argument and then places the message in the message list 
//collection 
FirefoxIM.putMessage = function(message){
	messages.add(message);
}

//setMessage function takes the value for name and text puts them into the message model and
//then calls the putMessage function to place the message into the message collection
FirefoxIM.setMessage = function (){
	var name = $('#senderName').val();
    var text = $('#messageText').val();
	message.set({name: name, text: text});
	this.putMessage(message);
	
}

//add a single message by creating a view and appending its elemnt to the '<ul>'
FirefoxIM.displayMessage = function(thismessage){
	var name = thismessage.get("name");
	var text = thismessage.get("text");
	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#message-list'));
        $('#message-list')[0].scrollTop = $('#message-list')[0].scrollHeight;
	
}

//add all items in the messages collection at once
FirefoxIM.displayMessages = function(){
   messages.each(this.displayMessage, this);
}

