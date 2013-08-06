(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.ContactView = Backbone.View.extend({

    el: FirefoxIM.Templates.contactView(),

    events: {
      "click #back": "goback",
      "click #addUser": "addContact",
      "click .user": "loadNewChatView"
    },

    initialize: function(collection, options) {
	     this.userList = collection;
	     
       this.listenTo(this.userList,"add",this.renderContactsList);
          
    },

    render: function() {
      	$(document.body).append(this.$el);
      	this.renderContactsList();
      	return this;
    },

    renderContactsList: function() {
      	var view = this;
      	$('#users ul').empty();
      	this.userList.each(this.listContacts);
    },

    loadNewChatView: function(e){
      e.preventDefault();
      FirefoxIM.router.navigate("chat",{trigger:true});
    },
    
    addContact: function(e){
        e.preventDefault();
        
        var newContact = window.prompt("Input new user you want to add:", "");
        this.user = this.userList.findWhere({id:FirefoxIM.user.id});
        
        //sets contacts change listener
        this.listenTo(this.user,"change", function(model){
          this.renderContactsList();
        });
        
        var contactsForUser = this.user.get("contacts");
	if(!contactsForUser){
		this.user.set({contacts:[newContact.toLowerCase()]});
	}
	else{
        	contactsForUser.push(newContact.toLowerCase());
	}
        contactsForUser.sort();
        this.user.set("contacts",contactsForUser);
        this.user.trigger("change",this.user);
     },

    listContacts: function(user) {
	  
      var id= user.get("id");
	    if(id === FirefoxIM.user.id){
         var contacts = user.get("contacts");
  	    
        if (!id || !contacts) { return;}

  	     for(var i =0; i < contacts.length; i++){
          $('#users ul').append(FirefoxIM.Templates.userList(contacts[i]));
        } 
      }
    },

    
      remove: function() {
	this.stopListening(this.contact);
	Backbone.View.prototype.remove.call(this);
    },
   
    goback: function() {
	FirefoxIM.router.navigate('chatList',{trigger: true});
    }


  });

  window.FirefoxIM = FirefoxIM;
}())

