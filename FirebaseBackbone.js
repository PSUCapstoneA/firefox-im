'use static';

var FirefoxIM = FirefoxIM || {};


var Message =  Backbone.Model.extend({

});


var MessageList = Backbone.Firebase.Collection.extend({
	model: Message,

	firebase: new Firebase("http://psucapstone-a.firebaseio.com/")

});
/*
var MessageView = Backbone.View.extend({
	tagName: "li",

	template: _.template($('#message-template').html()),

	initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'remove', this.remove);
    },

    render: function(){
    	this.$el.html(this.template(this.model.toJSON()));
    	return this;
    }

});
*/
var message = new Message;
var messages = new MessageList;

FirefoxIM.putMessage = function(message){
	messages.add(message);
	console.log("message added to message list");
}

FirefoxIM.setMessage = function (){
			var name = $('#senderName').val();
    		var text = $('#messageText').val();
			message.set({name: name, text: text});
			this.putMessage(message);
			console.log("message set");
		
	 
}

/*FirefoxIM.displayOneMessage = function(message)
{
	var view = new MessageView({model: message});
	this.$("#message-list").append(view.render().el);
}
FirefoxIM.displayMessages = function (){

    messages.each(this.displayOneMessage, this);
}
*/
