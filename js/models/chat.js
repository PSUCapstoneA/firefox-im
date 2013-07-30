(function() {
  'use static';
  // Mimick namespace
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Models = FirefoxIM.Models || {};

  //the chat model.  our model will contain a userName and text to start. 
  FirefoxIM.Models.Chat =  Backbone.Model.extend({
  addMessage: function(message) {
    var messages = _.clone(this.get("messages")) || [];
    message.text = this.encodeHTML(message.text);
    messages.push(message)
    this.set("messages", messages);
  },
  
  encodeHTML: function(s) {
    return s.replace(/&[^(amp;)(lt;)(quot;)(gt;)(nbsp;)]/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/ /, '&nbsp;');
  }
  });

  window.FirefoxIM = FirefoxIM;
}())