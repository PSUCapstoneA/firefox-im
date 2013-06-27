var ToDoView = Backbone.View.extend({

	initialize: function(){

		var viewObject = this;
		this.options.firebase.on('child_added', function(childSnapshot, prevChildName) {
			var newMessage = childSnapshot.val();

			viewObject.render(newMessage.name,newMessage.text);

		});
	},

	render: function(name, text){
		this.addReceivedMessage(name,text);          
	},	

	addReceivedMessage: function(name, text){
		$('#threads ul').append('<li><p>' + name + '</p><p>' + text + '</p></li>');
	}   

});

			
		
