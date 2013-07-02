'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};

//the chat model.  our model will contain a userName and text to start. 
FirefoxIM.Chat =  Backbone.Model.extend({
	
});

FirefoxIM.chat = new FirefoxIM.Chat();
window.FirefoxIM = FirefoxIM;