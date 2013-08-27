(function() {
  'use static';
  // Mimick namespace
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Models = FirefoxIM.Models || {};

  //the chat model.  our model will contain a userName and text to start. 
  FirefoxIM.Models.Chat =  Backbone.Model.extend({
    addMessage: function(message) {
      var messages = _.clone(this.get("messages")) || [];
      messages.push(message);
      this.set("messages", messages);
    },
    getOtherUserName: function(){
	var keys = Object.keys(this.attributes.authUsers);
	var disPlayId = null;
	for (var i=0; i<keys.length;i++){
		if(keys[i] != FirefoxIM.user.id){
			disPlayId = keys[i];
			break;
		}
	}
	var otherUserName = FirefoxIM.userList.findWhere({id: disPlayId}).get("username");
    	return otherUserName;
    },

    encodeHTML: function(s) {
      return s.replace(/&[^(amp;)(lt;)(quot;)(gt;)(nbsp;)]/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br>');
    }  
  }); 

  window.FirefoxIM = FirefoxIM;
}())
