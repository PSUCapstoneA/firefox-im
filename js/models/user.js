(function() {
  'use static';
  // Mimick namespace
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Models = FirefoxIM.Models || {};

  FirefoxIM.Models.User =  Backbone.Model.extend({
	encodeHTML: function(s) {
      return s.replace(/&[^(amp;)(lt;)(quot;)(gt;)(nbsp;)]/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br>');
    }   
  });
  window.FirefoxIM = FirefoxIM;
}())
