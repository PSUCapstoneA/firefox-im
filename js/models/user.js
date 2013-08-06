(function() {
  'use static';
  // Mimick namespace
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Models = FirefoxIM.Models || {};

  FirefoxIM.Models.User =  Backbone.Model.extend({
  addContact: function(contact) {
    var contacts = _.clone(this.get("contacts")) || [];
    contact.text = this.encodeHTML(contact.text);
    contacts.push(contact)
    this.set("contacts", contacts);
  },
  encodeHTML: function(s) {
    return s.replace(/&[^(amp;)(lt;)(quot;)(gt;)(nbsp;)]/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/ /, '&nbsp;');
  }
  });

  window.FirefoxIM = FirefoxIM;
}())
